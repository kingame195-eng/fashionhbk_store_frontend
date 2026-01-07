import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks";
import { LoadingSpinner } from "../components/common";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { slug } = useParams();
  const { product, relatedProducts, isLoading, error } = useProduct(slug);

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
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} />
            ) : (
              <div className={styles.placeholderImage}>No Image Available</div>
            )}
            {product.onSale && <span className={styles.saleBadge}>Sale</span>}
          </div>
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button key={index} className={styles.thumbnail}>
                  <img src={image} alt={`${product.name} - ${index + 1}`} />
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
            {product.salePrice ? (
              <>
                <span className={styles.salePrice}>${product.salePrice.toFixed(2)}</span>
                <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
                <span className={styles.discount}>
                  {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
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
                {product.sizes.map((size) => (
                  <button key={size} className={styles.sizeBtn}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className={styles.options}>
              <h3>Color</h3>
              <div className={styles.colorButtons}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={styles.colorBtn}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
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
          <button className={styles.addToCartBtn} disabled={product.stock <= 0}>
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
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
                  {relatedProduct.images && relatedProduct.images.length > 0 ? (
                    <img src={relatedProduct.images[0]} alt={relatedProduct.name} />
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
