import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import styles from "../../styles/components/ProductGrid.module.css";

export default function ProductGrid({
  products,
  isLoading,
  columns = 4,
  emptyMessage = "No products found",
}) {
  // Show skeletons while loading
  if (isLoading) {
    return (
      <div
        className={styles.grid}
        style={{ "--columns": columns }}
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // No products found
  if (!products || products.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M8 11h6" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>No products found</h3>
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.grid} style={{ "--columns": columns }}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}