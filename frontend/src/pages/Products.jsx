import { useState, useEffect } from "react";
import { useProducts, useDebounce } from "../hooks";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/common";
import styles from "./Products.module.css";

const Products = () => {
  const {
    products = [],
    pagination,
    filters,
    isLoading,
    isLoadingMore,
    error,
    hasActiveFilters,
    hasMore,
    remainingProducts,
    setSort,
    setSearch,
    clearFilters,
    loadMore,
  } = useProducts();

  // Local search state for debouncing
  const [searchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  // Update URL only after debounce
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, setSearch, filters.search]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error Loading Products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryBtn}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.productsPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1>
          {filters.search
            ? `Search Results for "${filters.search}"`
            : filters.category
            ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`
            : "Our Products"}
        </h1>
        <p>
          {filters.search
            ? "Showing results from all categories"
            : "Discover our latest collection"}
        </p>
      </div>

      {/* Search Info Banner - hiển thị khi có từ khóa tìm kiếm */}
      {filters.search && (
        <div className={styles.searchBanner}>
          <span>
            🔍 Searching for "<strong>{filters.search}</strong>" across all products
          </span>
          <button
            onClick={() => setSearch("")}
            className={styles.clearSearchBtn}
            aria-label="Clear search"
          >
            ✕ Clear search
          </button>
        </div>
      )}

      {/* Search and Sort Controls */}
      <div className={styles.controls}>
        <div className={styles.sortBox}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split("-");
              setSort(sortBy, sortOrder);
            }}
            className={styles.sortSelect}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" />
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          {products.length > 0 ? (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <Link
                  to={`/products/${product.slug || product._id}`}
                  key={product._id}
                  className={styles.productCard}
                >
                  <div className={styles.productImage}>
                    {(product.images && product.images.length > 0) ||
                    product.thumbnail ||
                    product.image ? (
                      <img
                        src={
                          typeof product.images?.[0] === "string"
                            ? product.images[0]
                            : product.images?.[0]?.url || product.thumbnail || product.image
                        }
                        alt={product.name}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>No Image</div>
                    )}
                    {product.onSale && <span className={styles.saleBadge}>Sale</span>}
                    {product.featured && <span className={styles.featuredBadge}>Featured</span>}
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productCategory}>{product.category}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <div className={styles.productPrice}>
                      {product.salePrice ? (
                        <>
                          <span className={styles.salePrice}>${product.salePrice.toFixed(2)}</span>
                          <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>${product.price?.toFixed(2) || "N/A"}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No Products Found</h3>
              <p>Try adjusting your search or filters</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className={styles.clearBtn}>
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button onClick={loadMore} disabled={isLoadingMore} className={styles.loadMoreBtn}>
                {isLoadingMore ? (
                  <>
                    <span className={styles.loadMoreSpinner}></span>
                    Loading...
                  </>
                ) : (
                  <>
                    View {remainingProducts} more products
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results Info */}
          <div className={styles.resultsInfo}>
            Showing {products.length} of {pagination?.totalProducts || 0} products
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
