import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>

        {isAuthenticated ? (
          <div className="user-menu">
            <span>Welcome, {user.firstName}!</span>
            <Link to="/account">My Account</Link>
            <Link to="/account/orders">Orders</Link>
            <Link to="/account/wishlist">Wishlist</Link>

            {hasRole("admin") && <Link to="/admin">Admin Dashboard</Link>}

            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
