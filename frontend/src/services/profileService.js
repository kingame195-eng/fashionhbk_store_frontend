import api from "./api";

const profileService = {
  /**
   * Get user profile
   */
  async getProfile() {
    const response = await api.get("/profile");
    return response.data.data.user;
  },

  /**
   * Update profile
   */
  async updateProfile(data) {
    const response = await api.patch("/profile", data);
    return response.data.data.user;
  },

  /**
   * Update email
   */
  async updateEmail(email, password) {
    const response = await api.patch("/profile/email", { email, password });
    return response.data.data;
  },

  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword, confirmPassword) {
    const response = await api.patch("/profile/password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  /**
   * Update preferences
   */
  async updatePreferences(preferences) {
    const response = await api.patch("/profile/preferences", preferences);
    return response.data.data.preferences;
  },

  /**
   * Upload avatar
   */
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data.avatar;
  },

  /**
   * Delete avatar
   */
  async deleteAvatar() {
    const response = await api.delete("/profile/avatar");
    return response.data;
  },

  /**
   * Delete account
   */
  async deleteAccount(password, confirmation) {
    const response = await api.delete("/profile", {
      data: { password, confirmation },
    });
    return response.data;
  },

  // Address methods
  async getAddresses() {
    const response = await api.get("/profile/addresses");
    return response.data.data;
  },

  async addAddress(address) {
    const response = await api.post("/profile/addresses", address);
    return response.data.data;
  },

  async updateAddress(addressId, address) {
    const response = await api.patch(`/profile/addresses/${addressId}`, address);
    return response.data.data.address;
  },

  async deleteAddress(addressId) {
    const response = await api.delete(`/profile/addresses/${addressId}`);
    return response.data.data;
  },

  async setDefaultAddress(addressId) {
    const response = await api.patch(`/profile/addresses/${addressId}/default`);
    return response.data.data;
  },

  // Wishlist methods
  async getWishlist() {
    const response = await api.get("/profile/wishlist");
    return response.data.data;
  },

  async addToWishlist(productId) {
    const response = await api.post("/profile/wishlist", { productId });
    return response.data.data;
  },

  async removeFromWishlist(productId) {
    const response = await api.delete(`/profile/wishlist/${productId}`);
    return response.data.data;
  },

  async checkWishlist(productId) {
    const response = await api.get(`/profile/wishlist/check/${productId}`);
    return response.data.data.inWishlist;
  },

  async moveToCart(productId, options = {}) {
    const response = await api.post(`/profile/wishlist/${productId}/move-to-cart`, options);
    return response.data;
  },
};

export default profileService;
