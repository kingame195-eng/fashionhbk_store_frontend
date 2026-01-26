import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

// Token storage (in memory for security)
let accessToken = null;

// Track refresh token state to prevent loops
let isRefreshing = false;
let refreshSubscribers = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Notify all subscribers when token is refreshed
const onTokenRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Notify all subscribers when refresh fails
const onRefreshFailed = (error) => {
  refreshSubscribers.forEach((callback) => callback(null, error));
  refreshSubscribers = [];
};

/**
 * Set the access token
 */
export const setAccessToken = (token) => {
  accessToken = token;
};

/**
 * Get the access token
 */
export const getAccessToken = () => accessToken;

/**
 * Clear the access token
 */
export const clearAccessToken = () => {
  accessToken = null;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add cart session ID for guests
    const cartSession = localStorage.getItem("cartSession");
    if (cartSession) {
      config.headers["X-Cart-Session"] = cartSession;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 429 Too Many Requests - don't retry, fail gracefully
    // Retrying causes cascading requests that make things worse
    if (error.response?.status === 429) {
      console.warn("Rate limited - please wait a moment and try again");
      const errorResponse = {
        message: "Too many requests. Please wait a moment and try again.",
        status: 429,
        isRateLimited: true,
      };
      return Promise.reject(errorResponse);
    }

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't retry refresh token requests
      if (originalRequest.url?.includes("/auth/refresh")) {
        clearAccessToken();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token, err) => {
            if (err) {
              reject(err);
              return;
            }
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken: newToken } = response.data.data;
        setAccessToken(newToken);
        isRefreshing = false;
        onTokenRefreshed(newToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - save auth state before clearing
        const wasAuthenticated = !!accessToken;
        isRefreshing = false;
        onRefreshFailed(refreshError);
        clearAccessToken();

        // Only dispatch logout event if user was previously authenticated
        // (not just an expected 401 for guests)
        if (wasAuthenticated) {
          window.dispatchEvent(new CustomEvent("auth:logout"));
        }
        return Promise.reject(refreshError);
      }
    }

    // Format error response
    const errorResponse = {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(errorResponse);
  }
);

export default api;
