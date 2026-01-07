/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { authService, cartService, clearAccessToken } from "../services";
import { AUTH_STATUS } from "./constants";

// ============================================
// ACTION TYPES
// ============================================

const AUTH_ACTIONS = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAILURE: "AUTH_FAILURE",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  user: null,
  status: AUTH_STATUS.IDLE,
  error: null,
  isAuthenticated: false,
  isLoading: true,
};

// ============================================
// REDUCER
// ============================================

function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_START:
      return {
        ...state,
        status: AUTH_STATUS.LOADING,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        status: AUTH_STATUS.AUTHENTICATED,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        status: AUTH_STATUS.UNAUTHENTICATED,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        status: AUTH_STATUS.UNAUTHENTICATED,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
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

const AuthContext = createContext(null);

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // -----------------------------------------
  // Initialize Auth on Mount
  // -----------------------------------------
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      dispatch({ type: AUTH_ACTIONS.AUTH_START });

      try {
        // Attempt to refresh token (uses httpOnly cookie)
        const token = await authService.refreshToken();

        if (!isMounted) return;

        if (token) {
          // Get user profile with new token
          const user = await authService.getCurrentUser();

          if (!isMounted) return;

          // Merge guest cart if exists
          await cartService.mergeCarts().catch(() => {});

          dispatch({
            type: AUTH_ACTIONS.AUTH_SUCCESS,
            payload: { user },
          });
        } else {
          dispatch({
            type: AUTH_ACTIONS.AUTH_FAILURE,
            payload: { error: null },
          });
        }
      } catch {
        if (!isMounted) return;
        // No valid session - user is guest
        dispatch({
          type: AUTH_ACTIONS.AUTH_FAILURE,
          payload: { error: null }, // Don't show error for initial check
        });
      }
    };

    initializeAuth();

    // Listen for logout events (from axios interceptor)
    const handleLogoutEvent = () => {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    window.addEventListener("auth:logout", handleLogoutEvent);
    return () => {
      isMounted = false;
      window.removeEventListener("auth:logout", handleLogoutEvent);
    };
  }, []);

  // -----------------------------------------
  // Register
  // -----------------------------------------
  const register = useCallback(async (userData) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });

    try {
      const { user } = await authService.register(userData);

      // Merge guest cart
      await cartService.mergeCarts().catch(() => {});

      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: { user },
      });

      return { success: true, user };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, []);

  // -----------------------------------------
  // Login
  // -----------------------------------------
  const login = useCallback(async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });

    try {
      const { user } = await authService.login(credentials);

      // Merge guest cart after login
      await cartService.mergeCarts().catch(() => {});

      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: { user },
      });

      return { success: true, user };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, []);

  // -----------------------------------------
  // Logout
  // -----------------------------------------
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAccessToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // -----------------------------------------
  // Update User
  // -----------------------------------------
  const updateUser = useCallback((userData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: { user: userData },
    });
  }, []);

  // -----------------------------------------
  // Refresh User Data
  // -----------------------------------------
  const refreshUser = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: { user },
      });
      return user;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      return null;
    }
  }, []);

  // -----------------------------------------
  // Clear Error
  // -----------------------------------------
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  // -----------------------------------------
  // Check Permissions
  // -----------------------------------------
  const hasPermission = useCallback(
    (permission) => {
      if (!state.user) return false;
      if (state.user.role === "admin") return true;
      return state.user.permissions?.includes(permission) ?? false;
    },
    [state.user]
  );

  const hasRole = useCallback(
    (roles) => {
      if (!state.user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(state.user.role);
    },
    [state.user]
  );

  // -----------------------------------------
  // Memoized Context Value
  // -----------------------------------------
  const value = useMemo(
    () => ({
      // State
      user: state.user,
      status: state.status,
      error: state.error,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,

      // Actions
      register,
      login,
      logout,
      updateUser,
      refreshUser,
      clearError,

      // Helpers
      hasPermission,
      hasRole,
    }),
    [state, register, login, logout, updateUser, refreshUser, clearError, hasPermission, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
