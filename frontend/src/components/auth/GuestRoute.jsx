import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * GuestRoute - Guards routes that should only be accessible to guests
 * (e.g., login, register pages - logged in users shouldn't see these)
 *
 * @param {ReactNode} children - The guest-only component(s)
 * @param {string} redirectTo - Where to redirect authenticated users
 */

export default function GuestRoute({ children, redirectTo = "/" }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Already authenticated - redirect
  if (isAuthenticated) {
    // Redirect to intended destination or default
    const destination = location.state?.from?.pathname || redirectTo;
    return <Navigate to={destination} replace />;
  }

  // Guest user - render children
  return children;
}
