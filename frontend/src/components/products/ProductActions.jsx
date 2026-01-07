import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProductActions({ product }) {
  const { isAuthenticated, hasRole, hasPermission } = useAuth();

  return (
    <div className="product-actions">
      <button>Add to Cart</button>

      {isAuthenticated && <button>Add to Wishlist</button>}

      {hasRole("admin") && <Link to={`/admin/products/edit/${product._id}`}>Edit Product</Link>}

      {hasPermission("products:delete") && <button className="delete-btn">Delete</button>}
    </div>
  );
}
