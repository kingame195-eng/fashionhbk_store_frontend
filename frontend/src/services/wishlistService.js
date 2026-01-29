import api from "./api";

/**
 * Wishlist Service - Handles all wishlist-related API calls
 */
const wishlistService = {
  /**
   * Get user's wishlist
   * @returns {Promise<Object>} Wishlist data with items
   */
  async getWishlist() {
    const response = await api.get("/wishlist");
    return response.data;
  },

  /**
   * Add a product to wishlist
   * @param {string} productId - Product ID to add
   * @returns {Promise<Object>} Updated wishlist
   */
  async addToWishlist(productId) {
    const response = await api.post(`/wishlist/${productId}`);
    return response.data;
  },

  /**
   * Remove a product from wishlist
   * @param {string} productId - Product ID to remove
   * @returns {Promise<Object>} Updated wishlist
   */
  async removeFromWishlist(productId) {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  },

  /**
   * Toggle product in wishlist (add if not exists, remove if exists)
   * @param {string} productId - Product ID to toggle
   * @returns {Promise<Object>} Action result with added/removed status
   */
  async toggleWishlist(productId) {
    const response = await api.post(`/wishlist/${productId}/toggle`);
    return response.data;
  },

  /**
   * Check if a product is in wishlist
   * @param {string} productId - Product ID to check
   * @returns {Promise<Object>} Object with inWishlist boolean
   */
  async checkWishlist(productId) {
    const response = await api.get(`/wishlist/check/${productId}`);
    return response.data;
  },

  /**
   * Clear entire wishlist
   * @returns {Promise<Object>} Confirmation message
   */
  async clearWishlist() {
    const response = await api.delete("/wishlist");
    return response.data;
  },
};

export default wishlistService;
