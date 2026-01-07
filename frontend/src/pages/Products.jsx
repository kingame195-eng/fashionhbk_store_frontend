import { useState, useEffect } from "react";
import { useProducts, useDebounce } from "../hooks";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/common";
import styles from "./Products.module.css";

const Products = () => {
  const {
    products = [],
    pagination = { page: 1, pages: 0, total: 0 },
    filters,
    isLoading,
    error,
    hasActiveFilters,
    setPage,
    setSort,
    setSearch,
    clearFilters,
  } = useProducts();

  // Local search state for debouncing
  const [searchInput, setSearchInput] = useState(filters.search);
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
        <h1>Our Products</h1>
        <p>Discover our latest collection</p>
      </div>

      {/* Search and Sort Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
        </div>

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

        {hasActiveFilters && (
          <button onClick={clearFilters} className={styles.clearBtn}>
            Clear Filters
          </button>
        )}
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
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} />
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

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setPage(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className={styles.pageBtn}
              >
                Previous
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPage(page)}
                    className={`${styles.pageBtn} ${pagination.page === page ? styles.active : ""}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className={styles.pageBtn}
              >
                Next
              </button>
            </div>
          )}

          {/* Results Info */}
          <div className={styles.resultsInfo}>
            Showing {products.length} of {pagination.total} products
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
