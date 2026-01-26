/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { TOAST_TYPES } from "./constants";

// ============================================
// ACTION TYPES
// ============================================

const TOAST_ACTIONS = {
  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
  CLEAR_ALL: "CLEAR_ALL",
};

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  toasts: [],
};

// ============================================
// REDUCER
// ============================================

function toastReducer(state, action) {
  switch (action.type) {
    case TOAST_ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    case TOAST_ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };

    case TOAST_ACTIONS.CLEAR_ALL:
      return {
        ...state,
        toasts: [],
      };

    default:
      return state;
  }
}

// ============================================
// CONTEXT CREATION
// ============================================

const ToastContext = createContext(null);

// ============================================
// TOAST PROVIDER COMPONENT
// ============================================

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  // Track timeouts to clean them up on unmount or manual removal
  const timeoutsRef = useRef(new Map());

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutsRef.current.clear();
    };
  }, []);

  // Generate unique ID for each toast
  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // -----------------------------------------
  // Add Toast
  // -----------------------------------------
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = generateId();

    dispatch({
      type: TOAST_ACTIONS.ADD_TOAST,
      payload: {
        id,
        message,
        type,
        duration,
      },
    });

    // Auto-remove toast after duration
    if (duration > 0) {
      const timeoutId = setTimeout(() => {
        dispatch({
          type: TOAST_ACTIONS.REMOVE_TOAST,
          payload: id,
        });
        timeoutsRef.current.delete(id);
      }, duration);

      // Store timeout for cleanup
      timeoutsRef.current.set(id, timeoutId);
    }

    return id;
  }, []);

  // -----------------------------------------
  // Remove Toast
  // -----------------------------------------
  const removeToast = useCallback((id) => {
    // Clear timeout when manually removing
    if (timeoutsRef.current.has(id)) {
      clearTimeout(timeoutsRef.current.get(id));
      timeoutsRef.current.delete(id);
    }
    dispatch({
      type: TOAST_ACTIONS.REMOVE_TOAST,
      payload: id,
    });
  }, []);

  // -----------------------------------------
  // Clear All Toasts
  // -----------------------------------------
  const clearAllToasts = useCallback(() => {
    // Clear all pending timeouts
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current.clear();
    dispatch({ type: TOAST_ACTIONS.CLEAR_ALL });
  }, []);

  // -----------------------------------------
  // Convenience Methods
  // -----------------------------------------
  const showSuccess = useCallback(
    (message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration),
    [addToast]
  );

  const showError = useCallback(
    (message, duration) => addToast(message, TOAST_TYPES.ERROR, duration),
    [addToast]
  );

  const showWarning = useCallback(
    (message, duration) => addToast(message, TOAST_TYPES.WARNING, duration),
    [addToast]
  );

  const showInfo = useCallback(
    (message, duration) => addToast(message, TOAST_TYPES.INFO, duration),
    [addToast]
  );

  // -----------------------------------------
  // Generic showToast method (commonly used)
  // -----------------------------------------
  const showToast = useCallback(
    (message, type = TOAST_TYPES.INFO, duration) => addToast(message, type, duration),
    [addToast]
  );

  // -----------------------------------------
  // Memoized Context Value
  // -----------------------------------------
  const value = useMemo(
    () => ({
      // State
      toasts: state.toasts,

      // Actions
      addToast,
      removeToast,
      clearAllToasts,

      // Generic method
      showToast,

      // Convenience methods
      showSuccess,
      showError,
      showWarning,
      showInfo,
    }),
    [
      state.toasts,
      addToast,
      removeToast,
      clearAllToasts,
      showToast,
      showSuccess,
      showError,
      showWarning,
      showInfo,
    ]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      {state.toasts.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "400px",
          }}
        >
          {state.toasts.map((toast) => (
            <div
              key={toast.id}
              style={{
                padding: "1rem 1.5rem",
                borderRadius: "8px",
                backgroundColor: getToastColor(toast.type),
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                animation: "slideIn 0.3s ease-out",
              }}
            >
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  opacity: 0.8,
                }}
                aria-label="Close toast"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </ToastContext.Provider>
  );
}

// Helper function for toast colors
function getToastColor(type) {
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      return "#10b981";
    case TOAST_TYPES.ERROR:
      return "#ef4444";
    case TOAST_TYPES.WARNING:
      return "#f59e0b";
    case TOAST_TYPES.INFO:
    default:
      return "#3b82f6";
  }
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
