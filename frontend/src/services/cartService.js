import api from "./api";

// Storage key for local cart (guests)
const CART_STORAGE_KEY = "fashion_cart";
const CART_SESSION_KEY = "cartSession";

// Empty cart object to return when no cart exists
const EMPTY_CART = { items: [], subtotal: 0, total: 0, discount: 0 };

/**
 * Generate a unique session ID for guest cart
 */
const generateSessionId = () => {
  return `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

/**
 * Get or create cart session ID for guests
 */
const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem(CART_SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(CART_SESSION_KEY, sessionId);
  }
  return sessionId;
};

const cartService = {
  // ============ Server Methods (for all users) ============

  /**
   * Get current cart
   * Returns empty cart if no cart exists (404)
   */
  async getCart() {
    try {
      const response = await api.get("/cart");
      return response.data.data.cart;
    } catch (error) {
      // 404 means no cart exists yet - return empty cart (expected for guests)
      if (error.status === 404 || error.response?.status === 404) {
        return EMPTY_CART;
      }
      // 401 means user is not authenticated - return empty cart
      if (error.status === 401 || error.response?.status === 401) {
        return EMPTY_CART;
      }
      throw error;
    }
  },

  /**
   * Add item to cart
   */
  async addItem(productId, quantity = 1, options = {}) {
    // Ensure we have a session ID for guest users
    getOrCreateSessionId();

    const response = await api.post("/cart/items", {
      productId,
      quantity,
      ...options,
    });

    return response.data.data.cart;
  },

  /**
   * Update item quantity
   */
  async updateItem(itemId, quantity) {
    const response = await api.patch(`/cart/items/${itemId}`, { quantity });
    return response.data.data.cart;
  },

  /**
   * Remove item from cart
   */
  async removeItem(itemId) {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data.data.cart;
  },

  /**
   * Clear cart
   */
  async clearCart() {
    const response = await api.delete("/cart");
    return response.data.data.cart;
  },

  /**
   * Apply coupon
   */
  async applyCoupon(code) {
    const response = await api.post("/cart/coupon", { code });
    return response.data.data.cart;
  },

  /**
   * Remove coupon
   */
  async removeCoupon() {
    const response = await api.delete("/cart/coupon");
    return response.data.data.cart;
  },

  /**
   * Validate cart (check stock, prices, etc.)
   */
  async validateCart() {
    const response = await api.post("/cart/validate");
    return response.data.data;
  },

  /**
   * Merge guest cart after login
   * Sends both guestSessionId and local cart items for maximum flexibility
   */
  async mergeCarts() {
    const guestSessionId = localStorage.getItem(CART_SESSION_KEY);
    const localCart = this.getLocalCart();

    // Only proceed if there's a guest session or local cart items
    if (!guestSessionId && (!localCart.items || localCart.items.length === 0)) {
      return null;
    }

    const response = await api.post("/cart/merge", {
      guestSessionId,
      items: localCart.items || [],
    });

    // Clean up after successful merge
    localStorage.removeItem(CART_SESSION_KEY);
    this.clearLocalCart();

    return response.data.data.cart;
  },

  // ============ Local Storage Methods (backup for offline/guest) ============

  /**
   * Get cart from local storage
   */
  getLocalCart() {
    try {
      const cart = localStorage.getItem(CART_STORAGE_KEY);
      return cart ? JSON.parse(cart) : { items: [], subtotal: 0, total: 0 };
    } catch {
      return { items: [], subtotal: 0, total: 0 };
    }
  },

  /**
   * Save cart to local storage
   */
  saveLocalCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  },

  /**
   * Clear local cart
   */
  clearLocalCart() {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear local cart:", error);
    }
  },

  /**
   * Add item to local cart
   */
  addToLocalCart(item) {
    const cart = this.getLocalCart();

    // Check if item already exists (same product and variant)
    const existingIndex = cart.items.findIndex(
      (i) => i.productId === item.productId && i.variantId === item.variantId
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      cart.items.push({
        ...item,
        _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      });
    }

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum, i) => {
      const price = i.variant?.price ?? i.product?.price ?? i.price ?? 0;
      return sum + price * i.quantity;
    }, 0);
    cart.total = cart.subtotal;

    this.saveLocalCart(cart);
    return cart;
  },

  /**
   * Update local cart item quantity
   */
  updateLocalCartItem(itemId, quantity) {
    const cart = this.getLocalCart();
    const itemIndex = cart.items.findIndex((i) => i._id === itemId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum, i) => {
      const price = i.variant?.price ?? i.product?.price ?? i.price ?? 0;
      return sum + price * i.quantity;
    }, 0);
    cart.total = cart.subtotal;

    this.saveLocalCart(cart);
    return cart;
  },

  /**
   * Remove item from local cart
   */
  removeFromLocalCart(itemId) {
    const cart = this.getLocalCart();
    cart.items = cart.items.filter((i) => i._id !== itemId);

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum, i) => {
      const price = i.variant?.price ?? i.product?.price ?? i.price ?? 0;
      return sum + price * i.quantity;
    }, 0);
    cart.total = cart.subtotal;

    this.saveLocalCart(cart);
    return cart;
  },

  /**
   * Sync local cart items to server (after login)
   */
  async syncCart(items) {
    if (!items || items.length === 0) return null;
    const response = await api.post("/cart/sync", { items });
    return response.data.data || response.data;
  },
};

export default cartService;
