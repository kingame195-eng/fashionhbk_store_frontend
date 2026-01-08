import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ImageGallery from "../components/products/ImageGallery";
import ProductInfo from "../components/products/ProductInfo";
import ProductTabs from "../components/products/ProductTabs";
import RelatedProducts from "../components/products/RelatedProducts";
import LoadingSpinner from "../components/common/LoadingSpinner";
import styles from "../styles/pages/ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, relatedProducts, loading, error } = useProduct(slug);

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <p>Loading product...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6M9 9l6 6" />
          </svg>
          <h2>Product Not Found</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/products")}>Browse Products</button>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/products")}>Browse Products</button>
        </div>
      </div>
    );
  }

  // Normalize images to always be array of objects {url, alt}
  const normalizeImages = (images, thumbnail, image) => {
    if (images && images.length > 0) {
      return images.map((img, index) => {
        if (typeof img === "string") {
          return { url: img, alt: `${product.name} - Image ${index + 1}` };
        }
        return img;
      });
    }
    // Fallback to thumbnail or image field
    if (thumbnail) {
      return [{ url: thumbnail, alt: product.name }];
    }
    if (image) {
      return [{ url: image, alt: product.name }];
    }
    return [];
  };

  const normalizedImages = normalizeImages(product.images, product.thumbnail, product.image);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Main Product Section */}
        <div className={styles.productSection}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <ImageGallery images={normalizedImages} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} title="You May Also Like" />
      </div>
    </div>
  );
}
