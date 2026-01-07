import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";
import Button from "../common/Button";
import styles from "../../styles/components/ProductInfo.module.css";

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Get selected variant based on options
  const getSelectedVariant = () => {
    if (!product.variants?.length) return null;

    return product.variants.find((variant) =>
      variant.options?.every((opt) => selectedOptions[opt.name] === opt.value)
    );
  };

  const selectedVariant = getSelectedVariant();

  // Calculate current price (variant price or product price)
  const currentPrice = selectedVariant?.price || product.price;
  const originalPrice = selectedVariant?.compareAtPrice || product.compareAtPrice;
  const hasDiscount = originalPrice && originalPrice > currentPrice;
  const discountPercent = hasDiscount ? Math.round((1 - currentPrice / originalPrice) * 100) : 0;

  // Check stock availability
  const maxQuantity = selectedVariant?.inventory || product.inventory || 99;
  const isOutOfStock = maxQuantity <= 0;

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/products/${product.slug}` } });
      return;
    }

    if (product.variants?.length && !selectedVariant) {
      alert("Please select all options");
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart({
        productId: product._id,
        variantId: selectedVariant?._id,
        quantity,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist API call
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}`,
          url,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  // Generate star rating
  const renderStars = (rating) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${styles.star} ${star <= rating ? styles.filled : ""}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.productInfo}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span className={styles.separator}>/</span>
        {product.category && (
          <>
            <a href={`/products?category=${product.category.slug}`}>{product.category.name}</a>
            <span className={styles.separator}>/</span>
          </>
        )}
        <span className={styles.current}>{product.name}</span>
      </nav>

      {/* Brand */}
      {product.brand && <p className={styles.brand}>{product.brand}</p>}

      {/* Product Name */}
      <h1 className={styles.name}>{product.name}</h1>

      {/* Rating */}
      {product.rating && (
        <div className={styles.rating}>
          {renderStars(Math.round(product.rating))}
          <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
          <a href="#reviews" className={styles.reviewCount}>
            ({product.reviewCount || 0} reviews)
          </a>
        </div>
      )}

      {/* Price */}
      <div className={styles.priceSection}>
        <span className={styles.price}>${currentPrice.toFixed(2)}</span>
        {hasDiscount && (
          <>
            <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
            <span className={styles.discount}>-{discountPercent}%</span>
          </>
        )}
      </div>

      {/* Short Description */}
      {product.shortDescription && (
        <p className={styles.shortDescription}>{product.shortDescription}</p>
      )}

      <div className={styles.divider} />

      {/* Variant Selector */}
      {product.variants?.length > 0 && (
        <VariantSelector
          variants={product.variants}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />
      )}

      {/* Quantity */}
      <div className={styles.quantitySection}>
        <label className={styles.quantityLabel}>Quantity:</label>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={maxQuantity}
          disabled={isOutOfStock}
        />
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleAddToCart}
          disabled={isOutOfStock || addingToCart}
          loading={addingToCart}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>

        <Button
          variant="secondary"
          size="large"
          fullWidth
          onClick={handleBuyNow}
          disabled={isOutOfStock || addingToCart}
        >
          Buy Now
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className={styles.secondaryActions}>
        <button
          className={`${styles.actionBtn} ${isWishlisted ? styles.wishlisted : ""}`}
          onClick={handleWishlistToggle}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
        </button>

        <button className={styles.actionBtn} onClick={handleShare}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
          </svg>
          <span>{showCopied ? "Link Copied!" : "Share"}</span>
        </button>
      </div>

      {/* Product Features */}
      <div className={styles.features}>
        <div className={styles.feature}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" />
            <path d="m16 8 4 0 3 3 0 5 -4 0" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span>Free shipping over $100</span>
        </div>
        <div className={styles.feature}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
          <span>30-day returns</span>
        </div>
        <div className={styles.feature}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>Secure checkout</span>
        </div>
      </div>
    </div>
  );
}
