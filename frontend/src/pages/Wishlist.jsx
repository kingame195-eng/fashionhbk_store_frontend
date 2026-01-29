import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/products/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, isLoading, error, clearWishlist, wishlistCount } = useWishlist();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearWishlist = async () => {
    if (!window.confirm("Are you sure you want to clear your entire wishlist?")) {
      return;
    }

    setIsClearing(true);
    await clearWishlist();
    setIsClearing(false);
  };

  // Get full product data from wishlist items
  const products = wishlist
    .map((item) => {
      if (item.product && typeof item.product === "object") {
        return item.product;
      }
      return null;
    })
    .filter(Boolean);

  if (!isAuthenticated) {
    return (
      <div className={styles.wishlist}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔐</span>
            <h2 className={styles.emptyTitle}>Please Log In</h2>
            <p className={styles.emptyText}>You need to be logged in to view your wishlist.</p>
            <Link to="/login" className={styles.loginButton}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.wishlist}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <LoadingSpinner size="large" />
            <p>Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wishlist}>
        <div className={styles.container}>
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wishlist}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>My Wishlist</h1>
            <p className={styles.count}>
              {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
            </p>
          </div>
          {wishlistCount > 0 && (
            <button
              className={styles.clearButton}
              onClick={handleClearWishlist}
              disabled={isClearing}
            >
              {isClearing ? "Clearing..." : "Clear Wishlist"}
            </button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlistCount === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>💝</span>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyText}>
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link to="/products" className={styles.browseButton}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.productGrid}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} showWishlistButton={true} />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className={styles.footer}>
              <Link to="/products" className={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
