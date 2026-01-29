import { useState, useEffect } from "react";
import { useProducts, useDebounce } from "../hooks";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/common";
import { FilterSidebar } from "../components/products";
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
    updateFilters,
    toggleFilter,
    setSort,
    setSearch,
    clearFilters,
    loadMore,
  } = useProducts();

  // State cho mobile filter sidebar
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
          {filters.search && filters.category
            ? `"${filters.search}" in ${
                filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
              }`
            : filters.search
              ? `Search Results for "${filters.search}"`
              : filters.category
                ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`
                : "Our Products"}
        </h1>
        <p>
          {filters.search && filters.category
            ? `Showing results filtered by category`
            : filters.search
              ? "Showing results from all categories. Use filters to narrow down."
              : "Discover our latest collection"}
        </p>
      </div>

      {/* Search Info Banner - hiển thị khi có từ khóa tìm kiếm */}
      {filters.search && (
        <div className={styles.searchBanner}>
          <span>
            🔍 Searching for "<strong>{filters.search}</strong>"
            {filters.category
              ? ` in ${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`
              : " across all products"}
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
        {/* Filter Toggle Button (Mobile) */}
        <button className={styles.filterToggleBtn} onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          Filters
          {hasActiveFilters && <span className={styles.filterBadge}>●</span>}
        </button>

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

      {/* Main Content with Sidebar */}
      <div className={styles.mainContent}>
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          updateFilters={updateFilters}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          className={`${styles.filterSidebar} ${isFilterOpen ? styles.filterOpen : ""}`}
        />

        {/* Overlay for mobile filter */}
        {isFilterOpen && (
          <div className={styles.filterOverlay} onClick={() => setIsFilterOpen(false)} />
        )}

        {/* Products Area */}
        <div className={styles.productsArea}>
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
                          {product.compareAtPrice && product.compareAtPrice > product.price ? (
                            <>
                              <span className={styles.salePrice}>${product.price.toFixed(2)}</span>
                              <span className={styles.originalPrice}>
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
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
                  <button
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className={styles.loadMoreBtn}
                  >
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
      </div>
    </div>
  );
};

export default Products;
