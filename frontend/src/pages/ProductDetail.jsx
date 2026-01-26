import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { LoadingSpinner } from "../components/common";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { slug } = useParams();
  const { product, relatedProducts, isLoading, error } = useProduct(slug);
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { showSuccess, showError } = useToast();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!product) return;

    // Check if variants exist and require selection
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasColors = product.colors && product.colors.length > 0;

    if (hasSizes && !selectedSize) {
      showError("Please select a size");
      return;
    }

    if (hasColors && !selectedColor) {
      showError("Please select a color");
      return;
    }

    try {
      await addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
      showSuccess(`${product.name} added to cart!`);
    } catch (err) {
      showError(err.message || "Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Product Not Found</h2>
        <p>{error}</p>
        <Link to="/products" className={styles.backLink}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className={styles.productDetail}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className={styles.productContent}>
        {/* Product Images */}
        <div className={styles.productImages}>
          <div className={styles.mainImage}>
            {(product.images && product.images.length > 0) || product.thumbnail || product.image ? (
              <img
                src={
                  typeof product.images?.[0] === "string"
                    ? product.images[0]
                    : product.images?.[0]?.url || product.thumbnail || product.image
                }
                alt={product.name}
              />
            ) : (
              <div className={styles.placeholderImage}>No Image Available</div>
            )}
            {product.onSale && <span className={styles.saleBadge}>Sale</span>}
          </div>
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button key={index} className={styles.thumbnail}>
                  <img
                    src={typeof image === "string" ? image : image?.url}
                    alt={`${product.name} - ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.productName}>{product.name}</h1>

          {product.brand && <p className={styles.brand}>Brand: {product.brand}</p>}

          <div className={styles.price}>
            {product.compareAtPrice && product.compareAtPrice > product.price ? (
              <>
                <span className={styles.salePrice}>${product.price?.toFixed(2)}</span>
                <span className={styles.originalPrice}>${product.compareAtPrice.toFixed(2)}</span>
                <span className={styles.discount}>
                  {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className={styles.currentPrice}>${product.price?.toFixed(2) || "N/A"}</span>
            )}
          </div>

          {product.description && (
            <div className={styles.description}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {/* Size Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.options}>
              <h3>Size</h3>
              <div className={styles.sizeButtons}>
                {product.sizes.map((size, index) => {
                  const sizeName = size.name || size;
                  const sizeId = size._id || size.name || index;
                  const isSelected = selectedSize === sizeName;
                  return (
                    <button
                      key={sizeId}
                      className={`${styles.sizeBtn} ${isSelected ? styles.selected : ""}`}
                      onClick={() => setSelectedSize(sizeName)}
                    >
                      {sizeName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className={styles.options}>
              <h3>Color</h3>
              <div className={styles.colorButtons}>
                {product.colors.map((color, index) => {
                  const colorName = color.name || color;
                  const colorId = color._id || color.name || index;
                  const colorHex = color.hexCode || color.name?.toLowerCase() || color;
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorId}
                      className={`${styles.colorBtn} ${isSelected ? styles.selectedColor : ""}`}
                      style={{ backgroundColor: colorHex }}
                      onClick={() => setSelectedColor(colorName)}
                      title={colorName}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className={styles.stockStatus}>
            {product.stock > 0 ? (
              <span className={styles.inStock}>✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className={styles.outOfStock}>✗ Out of Stock</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className={styles.addToCartBtn}
            disabled={product.stock <= 0 || isCartLoading}
            onClick={handleAddToCart}
          >
            {isCartLoading ? "Adding..." : product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <h2>Related Products</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((relatedProduct) => (
              <Link
                to={`/products/${relatedProduct.slug || relatedProduct._id}`}
                key={relatedProduct._id}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImage}>
                  {(relatedProduct.images && relatedProduct.images.length > 0) ||
                  relatedProduct.thumbnail ||
                  relatedProduct.image ? (
                    <img
                      src={
                        typeof relatedProduct.images?.[0] === "string"
                          ? relatedProduct.images[0]
                          : relatedProduct.images?.[0]?.url ||
                            relatedProduct.thumbnail ||
                            relatedProduct.image
                      }
                      alt={relatedProduct.name}
                    />
                  ) : (
                    <div className={styles.placeholderImage}>No Image</div>
                  )}
                </div>
                <div className={styles.relatedInfo}>
                  <h3>{relatedProduct.name}</h3>
                  <span>${relatedProduct.price?.toFixed(2) || "N/A"}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
