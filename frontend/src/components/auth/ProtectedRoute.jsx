import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * ProtectedRoute - Guards routes that require authentication
 *
 * @param {ReactNode} children - The protected component(s)
 * @param {string[]} roles - Required roles (optional)
 * @param {string[]} permissions - Required permissions (optional)
 * @param {boolean} requireVerified - Require email verification (optional)
 * @param {string} redirectTo - Custom redirect path (default: /login)
 */

export default function ProtectedRoute({
  children,
  roles,
  permissions,
  requireVerified = false,
  redirectTo = "/login",
}) {
  const { user, isAuthenticated, isLoading, hasRole, hasPermission } = useAuth();

  const location = useLocation();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location, message: "Please login to continue" }}
        replace
      />
    );
  }

  // Check role requirements
  if (roles && roles.length > 0 && !hasRole(roles)) {
    return (
      <Navigate to="/unauthorized" state={{ required: "role", from: location.pathname }} replace />
    );
  }

  // Check permission requirements
  if (permissions && permissions.length > 0) {
    const hasAllPermissions = permissions.every((p) => hasPermission(p));
    if (!hasAllPermissions) {
      return (
        <Navigate
          to="/unauthorized"
          state={{ required: "permission", from: location.pathname }}
          replace
        />
      );
    }
  }

  // Check email verification
  if (requireVerified && !user.emailVerified) {
    return <Navigate to="/verify-email" state={{ from: location.pathname }} replace />;
  }

  // All checks passed - render children
  return children;
}
