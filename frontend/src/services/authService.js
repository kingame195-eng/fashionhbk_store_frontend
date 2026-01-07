import api, { setAccessToken, clearAccessToken } from "./api";

const authService = {
  /**
   * Register a new user
   */
  async register(userData) {
    const response = await api.post("/auth/register", userData);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    return { user, accessToken };
  },

  /**
   * Login user
   */
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    return { user, accessToken };
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAccessToken();
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data.data.user;
  },

  /**
   * Refresh access token
   * Returns null if no valid session or server error
   */
  async refreshToken() {
    try {
      const response = await api.post("/auth/refresh");
      const { accessToken } = response.data.data;
      setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      // 401 means no valid session - user is guest (expected)
      // 429 means rate limited - treat as not authenticated for now
      // 500 means server error - treat as not authenticated
      const status = error.status || error.response?.status;
      if (status === 401 || status === 429 || status === 500) {
        return null;
      }
      // Network errors or other issues - treat as not authenticated
      if (!error.status && !error.response) {
        return null;
      }
      // For any other error, just return null to avoid breaking the app
      return null;
    }
  },

  /**
   * Request password reset
   */
  async forgotPassword(email) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  /**
   * Reset password with token
   */
  async resetPassword(token, password, confirmPassword) {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
    return response.data;
  },

  /**
   * Verify email
   */
  async verifyEmail(token) {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },
};

export default authService;
