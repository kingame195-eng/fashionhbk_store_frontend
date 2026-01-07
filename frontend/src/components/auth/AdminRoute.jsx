import ProtectedRoute from "./ProtectedRoute";

/**
 * AdminRoute - Shorthand for admin-only routes
 */
export default function AdminRoute({ children }) {
  return (
    <ProtectedRoute roles={["admin"]} redirectTo="/login">
      {children}
    </ProtectedRoute>
  );
}
