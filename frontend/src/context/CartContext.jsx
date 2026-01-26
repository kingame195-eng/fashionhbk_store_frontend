/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { cartService } from "../services";
import { CART_STATUS } from "./constants";

// ============================================
// CONSTANTS
// ============================================

const TAX_RATE = 0.1; // 10% tax
const FREE_SHIPPING_THRESHOLD = 100; // Free shipping above $100
const SHIPPING_COST = 7.99;

// ============================================
// ACTION TYPES
// ============================================

const CART_ACTIONS = {
  CART_START: "CART_START",
  CART_SUCCESS: "CART_SUCCESS",
  CART_FAILURE: "CART_FAILURE",
  CLEAR_CART: "CLEAR_CART",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  OPTIMISTIC_UPDATE: "OPTIMISTIC_UPDATE",
  OPEN_CART: "OPEN_CART",
  CLOSE_CART: "CLOSE_CART",
  TOGGLE_CART: "TOGGLE_CART",
};

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  coupon: null,
  itemCount: 0,
  status: CART_STATUS.IDLE,
  error: null,
  isLoading: true,
  // Cart drawer UI state
  isOpen: false,
};

// ============================================
// REDUCER
// ============================================

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.CART_START:
      return {
        ...state,
        status: CART_STATUS.LOADING,
        isLoading: true,
        error: null,
      };

    case CART_ACTIONS.CART_SUCCESS: {
      const cart = action.payload.cart;
      return {
        ...state,
        items: cart.items || [],
        subtotal: cart.subtotal || 0,
        total: cart.total || 0,
        discount: cart.discount || 0,
        coupon: cart.coupon || null,
        itemCount: cart.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
        status: CART_STATUS.SUCCESS,
        isLoading: false,
        error: null,
      };
    }

    case CART_ACTIONS.CART_FAILURE:
      return {
        ...state,
        status: CART_STATUS.ERROR,
        isLoading: false,
        error: action.payload.error,
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...initialState,
        isLoading: false,
        status: CART_STATUS.SUCCESS,
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // Optimistic update - update UI immediately without loading
    case CART_ACTIONS.OPTIMISTIC_UPDATE: {
      const { items } = action.payload;
      const subtotal = items.reduce((sum, item) => {
        const price = item.variant?.price ?? item.product?.price ?? item.price ?? 0;
        return sum + price * item.quantity;
      }, 0);
      const shipping = subtotal > 0 ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST) : 0;
      const tax = Number((subtotal * TAX_RATE).toFixed(2));
      const total = Number((subtotal + shipping + tax - (state.discount || 0)).toFixed(2));

      return {
        ...state,
        items,
        subtotal,
        total,
        itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
        // Don't change loading/status - this is optimistic
      };
    }

    // Cart drawer UI controls
    case CART_ACTIONS.OPEN_CART:
      return { ...state, isOpen: true };

    case CART_ACTIONS.CLOSE_CART:
      return { ...state, isOpen: false };

    case CART_ACTIONS.TOGGLE_CART:
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

// ============================================
// CONTEXT CREATION
// ============================================

const CartContext = createContext(null);

// ============================================
// CART PROVIDER COMPONENT
// ============================================

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // -----------------------------------------
  // Initialize Cart on Mount
  // -----------------------------------------
  useEffect(() => {
    let isMounted = true;

    const initializeCart = async () => {
      dispatch({ type: CART_ACTIONS.CART_START });

      try {
        const cart = await cartService.getCart();
        if (isMounted) {
          dispatch({
            type: CART_ACTIONS.CART_SUCCESS,
            payload: { cart },
          });
        }
      } catch {
        // Cart might not exist yet for guests - that's OK
        if (isMounted) {
          dispatch({
            type: CART_ACTIONS.CART_SUCCESS,
            payload: { cart: { items: [], subtotal: 0, total: 0 } },
          });
        }
      }
    };

    initializeCart();

    // Listen for auth changes to refresh cart
    const handleAuthChange = () => {
      initializeCart();
    };

    window.addEventListener("auth:login", handleAuthChange);
    window.addEventListener("auth:logout", handleAuthChange);

    return () => {
      isMounted = false;
      window.removeEventListener("auth:login", handleAuthChange);
      window.removeEventListener("auth:logout", handleAuthChange);
    };
  }, []);

  // -----------------------------------------
  // Add Item to Cart (with optimistic UI update)
  // -----------------------------------------
  const addItem = useCallback(
    async (productId, quantity = 1, options = {}) => {
      // Keep previous items for rollback
      const previousItems = [...state.items];

      // Optimistic update: add item immediately to UI
      const tempItem = {
        _id: `temp_${Date.now()}`,
        productId,
        quantity,
        ...options,
        // Estimate price if product info is passed
        price: options.price ?? 0,
      };
      dispatch({
        type: CART_ACTIONS.OPTIMISTIC_UPDATE,
        payload: { items: [...state.items, tempItem] },
      });

      // Open cart drawer to show added item
      dispatch({ type: CART_ACTIONS.OPEN_CART });

      try {
        const cart = await cartService.addItem(productId, quantity, options);
        dispatch({
          type: CART_ACTIONS.CART_SUCCESS,
          payload: { cart },
        });
        return { success: true, cart };
      } catch (error) {
        // Rollback on error
        dispatch({
          type: CART_ACTIONS.OPTIMISTIC_UPDATE,
          payload: { items: previousItems },
        });
        dispatch({
          type: CART_ACTIONS.SET_ERROR,
          payload: { error: error.message },
        });
        return { success: false, error: error.message };
      }
    },
    [state.items]
  );

  // -----------------------------------------
  // Update Item Quantity (with optimistic update)
  // -----------------------------------------
  const updateItem = useCallback(
    async (itemId, quantity) => {
      // Validate quantity
      const newQuantity = Number(quantity);
      if (Number.isNaN(newQuantity) || newQuantity < 1) {
        return { success: false, error: "Quantity must be at least 1" };
      }

      // Keep previous items for rollback
      const previousItems = [...state.items];

      // Optimistic update: update quantity immediately
      const updatedItems = state.items.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      dispatch({
        type: CART_ACTIONS.OPTIMISTIC_UPDATE,
        payload: { items: updatedItems },
      });

      try {
        const cart = await cartService.updateItem(itemId, newQuantity);
        dispatch({
          type: CART_ACTIONS.CART_SUCCESS,
          payload: { cart },
        });
        return { success: true, cart };
      } catch (error) {
        // Rollback on error
        dispatch({
          type: CART_ACTIONS.OPTIMISTIC_UPDATE,
          payload: { items: previousItems },
        });
        dispatch({
          type: CART_ACTIONS.SET_ERROR,
          payload: { error: error.message },
        });
        return { success: false, error: error.message };
      }
    },
    [state.items]
  );

  // -----------------------------------------
  // Remove Item from Cart (with optimistic update)
  // -----------------------------------------
  const removeItem = useCallback(
    async (itemId) => {
      // Keep previous items for rollback
      const previousItems = [...state.items];

      // Optimistic update: remove item immediately
      const filteredItems = state.items.filter((item) => item._id !== itemId);
      dispatch({
        type: CART_ACTIONS.OPTIMISTIC_UPDATE,
        payload: { items: filteredItems },
      });

      try {
        const cart = await cartService.removeItem(itemId);
        dispatch({
          type: CART_ACTIONS.CART_SUCCESS,
          payload: { cart },
        });
        return { success: true, cart };
      } catch (error) {
        // Rollback on error
        dispatch({
          type: CART_ACTIONS.OPTIMISTIC_UPDATE,
          payload: { items: previousItems },
        });
        dispatch({
          type: CART_ACTIONS.SET_ERROR,
          payload: { error: error.message },
        });
        return { success: false, error: error.message };
      }
    },
    [state.items]
  );

  // -----------------------------------------
  // Clear Cart (with optimistic update)
  // -----------------------------------------
  const clearCart = useCallback(async () => {
    // Keep previous items for rollback
    const previousItems = [...state.items];

    // Optimistic update: clear immediately
    dispatch({
      type: CART_ACTIONS.OPTIMISTIC_UPDATE,
      payload: { items: [] },
    });

    try {
      await cartService.clearCart();
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      return { success: true };
    } catch (error) {
      // Rollback on error
      dispatch({
        type: CART_ACTIONS.OPTIMISTIC_UPDATE,
        payload: { items: previousItems },
      });
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, [state.items]);

  // -----------------------------------------
  // Apply Coupon
  // -----------------------------------------
  const applyCoupon = useCallback(async (code) => {
    dispatch({ type: CART_ACTIONS.CART_START });

    try {
      const cart = await cartService.applyCoupon(code);
      dispatch({
        type: CART_ACTIONS.CART_SUCCESS,
        payload: { cart },
      });
      return { success: true, cart };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.CART_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, []);

  // -----------------------------------------
  // Remove Coupon
  // -----------------------------------------
  const removeCoupon = useCallback(async () => {
    dispatch({ type: CART_ACTIONS.CART_START });

    try {
      const cart = await cartService.removeCoupon();
      dispatch({
        type: CART_ACTIONS.CART_SUCCESS,
        payload: { cart },
      });
      return { success: true, cart };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.CART_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, []);

  // -----------------------------------------
  // Refresh Cart
  // -----------------------------------------
  const refreshCart = useCallback(async () => {
    dispatch({ type: CART_ACTIONS.CART_START });

    try {
      const cart = await cartService.getCart();
      dispatch({
        type: CART_ACTIONS.CART_SUCCESS,
        payload: { cart },
      });
      return cart;
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.CART_FAILURE,
        payload: { error: error.message },
      });
      return null;
    }
  }, []);

  // -----------------------------------------
  // Clear Error
  // -----------------------------------------
  const clearError = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR });
  }, []);

  // -----------------------------------------
  // Cart Drawer Controls
  // -----------------------------------------
  const openCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.OPEN_CART });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLOSE_CART });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  }, []);

  // -----------------------------------------
  // Computed Values
  // -----------------------------------------
  const shipping = useMemo(() => {
    if (state.subtotal <= 0) return 0;
    return state.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [state.subtotal]);

  const tax = useMemo(() => {
    return Number((state.subtotal * TAX_RATE).toFixed(2));
  }, [state.subtotal]);

  const freeShippingProgress = useMemo(() => {
    return Math.min((state.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  }, [state.subtotal]);

  const amountToFreeShipping = useMemo(() => {
    return Math.max(FREE_SHIPPING_THRESHOLD - state.subtotal, 0);
  }, [state.subtotal]);

  // -----------------------------------------
  // Memoized Context Value
  // -----------------------------------------
  const value = useMemo(
    () => ({
      // State
      items: state.items,
      subtotal: state.subtotal,
      total: state.total,
      discount: state.discount,
      coupon: state.coupon,
      itemCount: state.itemCount,
      status: state.status,
      error: state.error,
      isLoading: state.isLoading,
      isOpen: state.isOpen,

      // Computed values
      isEmpty: state.items.length === 0,
      shipping,
      tax,
      freeShippingProgress,
      amountToFreeShipping,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,

      // Cart Actions
      addItem,
      updateItem,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      refreshCart,
      clearError,

      // Cart Drawer Controls
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      state,
      shipping,
      tax,
      freeShippingProgress,
      amountToFreeShipping,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      refreshCart,
      clearError,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
