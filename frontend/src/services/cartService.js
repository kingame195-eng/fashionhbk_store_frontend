import api from "./api";

// Empty cart object to return when no cart exists
const EMPTY_CART = { items: [], subtotal: 0, total: 0, discount: 0 };

const cartService = {
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
    const response = await api.post("/cart/items", {
      productId,
      quantity,
      ...options,
    });

    // Store cart session for guests
    if (response.headers["x-cart-session"]) {
      localStorage.setItem("cartSession", response.headers["x-cart-session"]);
    }

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
   * Validate cart
   */
  async validateCart() {
    const response = await api.post("/cart/validate");
    return response.data.data;
  },

  /**
   * Merge guest cart after login
   */
  async mergeCarts() {
    const guestSessionId = localStorage.getItem("cartSession");
    if (!guestSessionId) return null;

    const response = await api.post("/cart/merge", { guestSessionId });
    localStorage.removeItem("cartSession");
    return response.data.data.cart;
  },
};

export default cartService;
