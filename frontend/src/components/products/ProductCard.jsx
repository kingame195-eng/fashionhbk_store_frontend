import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../hooks/useWishlist";
import styles from "../../styles/components/ProductCard.module.css";

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { addItem, isAdding } = useCart();
  const { isInWishlist, toggleWishlist, isToggling } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    _id,
    name,
    slug,
    images,
    price,
    compareAtPrice,
    category,
    isNew,
    isFeatured,
    inventory,
    rating,
    reviewCount,
  } = product;

  // Calculate discount percentage
  const discount = compareAtPrice ? Math.round((1 - price / compareAtPrice) * 100) : 0;

  const isOutOfStock = inventory?.totalQuantity === 0;
  const primaryImage = images?.[0]?.url || "/images/placeholder-product.jpg";
  const hoverImage = images?.[1]?.url;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || isAdding) return;

    await addItem(_id, 1);
  };

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Could redirect to login or show a toast
      return;
    }

    await toggleWishlist(_id);
  };

  return (
    <article className={styles.card}>
      <Link to={`/products/${slug}`} className={styles.link}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={images?.[0]?.alt || name}
            className={`${styles.image} ${imageLoaded ? styles.loaded : ""}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Secondary Image (shown on hover) */}
          {hoverImage && (
            <img
              src={hoverImage}
              alt={images[1]?.alt || `${name} - alternate view`}
              className={styles.imageHover}
              loading="lazy"
            />
          )}

          {/* Badges */}
          <div className={styles.badges}>
            {isNew && <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>}
            {discount > 0 && (
              <span className={`${styles.badge} ${styles.badgeSale}`}>-{discount}%</span>
            )}
            {isFeatured && !isNew && !discount && (
              <span className={`${styles.badge} ${styles.badgeFeatured}`}>Featured</span>
            )}
            {isOutOfStock && (
              <span className={`${styles.badge} ${styles.badgeOutOfStock}`}>Out of Stock</span>
            )}
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            {/* Wishlist Button */}
            <button
              className={`${styles.actionBtn} ${styles.wishlistBtn} ${
                isInWishlist(_id) ? styles.active : ""
              }`}
              onClick={handleWishlistClick}
              disabled={isToggling}
              aria-label={isInWishlist(_id) ? "Remove from wishlist" : "Add to wishlist"}
              title={isInWishlist(_id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg
                viewBox="0 0 24 24"
                fill={isInWishlist(_id) ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Quick View Button */}
            <button
              className={`${styles.actionBtn} ${styles.quickViewBtn}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Could open a modal with product quick view
              }}
              aria-label="Quick view"
              title="Quick view"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            {/* Add to Cart Button */}
            <button
              className={`${styles.actionBtn} ${styles.cartBtn}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding}
              aria-label="Add to cart"
              title={isOutOfStock ? "Out of stock" : "Add to cart"}
            >
              {isAdding ? (
                <span className={styles.spinner} />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          {/* Category */}
          <p className={styles.category}>{category?.name}</p>

          {/* Product Name */}
          <h3 className={styles.name}>{name}</h3>

          {/* Rating */}
          {rating > 0 && (
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    className={`${styles.star} ${star <= Math.round(rating) ? styles.filled : ""}`}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className={styles.reviewCount}>({reviewCount})</span>
            </div>
          )}

          {/* Pricing */}
          <div className={styles.pricing}>
            <span className={styles.price}>${price.toFixed(2)}</span>
            {compareAtPrice && compareAtPrice > price && (
              <span className={styles.comparePrice}>${compareAtPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
