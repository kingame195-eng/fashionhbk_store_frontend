/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { cartService } from "../services";
import { CART_STATUS } from "./constants";

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

    return () => {
      isMounted = false;
    };
  }, []);

  // -----------------------------------------
  // Add Item to Cart
  // -----------------------------------------
  const addItem = useCallback(async (productId, quantity = 1, options = {}) => {
    dispatch({ type: CART_ACTIONS.CART_START });

    try {
      const cart = await cartService.addItem(productId, quantity, options);
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
  // Update Item Quantity
  // -----------------------------------------
  const updateItem = useCallback(async (itemId, quantity) => {
    dispatch({ type: CART_ACTIONS.CART_START });

    try {
      const cart = await cartService.updateItem(itemId, quantity);
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
  // Remove Item from Cart
  // -----------------------------------------
  const removeItem = useCallback(async (itemId) => {
    dispatch({ type: CART_ACTIONS.CART_START });

    try {
      const cart = await cartService.removeItem(itemId);
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
  // Clear Cart
  // -----------------------------------------
  const clearCart = useCallback(async () => {
    dispatch({ type: CART_ACTIONS.CART_START });

    try {
      await cartService.clearCart();
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      return { success: true };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.CART_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, []);

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

      // Computed
      isEmpty: state.items.length === 0,

      // Actions
      addItem,
      updateItem,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      refreshCart,
      clearError,
    }),
    [
      state,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      refreshCart,
      clearError,
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
