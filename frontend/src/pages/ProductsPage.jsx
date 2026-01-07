import { useState, useEffect } from "react";
import { useProducts } from "../hooks";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductGrid from "../components/products/ProductGrid";
import SortDropdown from "../components/products/SortDropdown";
import Pagination from "../components/common/Pagination";
import SearchBar from "../components/common/SearchBar";
import styles from "../styles/pages/ProductsPage.module.css";

export default function ProductsPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    products,
    pagination,
    filters,
    isLoading,
    error,
    hasActiveFilters,
    updateFilters,
    setPage,
    setSort,
    setSearch,
    toggleFilter,
    clearFilters,
  } = useProducts();

  // Lock body scroll when mobile filters are open
  useEffect(() => {
    if (showMobileFilters) {
      // Get scrollbar width before hiding
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showMobileFilters]);

  // Format category name for display
  const formatCategoryName = (slug) => {
    if (!slug) return "All Products";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{formatCategoryName(filters.category)}</h1>
          <p className={styles.count}>
            {isLoading
              ? "Loading..."
              : `${pagination.total} ${pagination.total === 1 ? "product" : "products"}`}
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <SearchBar
            value={filters.search || ""}
            onChange={setSearch}
            placeholder="Search products..."
          />
        </div>
      </header>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        {/* Mobile Filter Toggle */}
        <button
          className={styles.filterToggle}
          onClick={() => setShowMobileFilters(true)}
          aria-label="Open filters"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <span>Filters</span>
          {hasActiveFilters && <span className={styles.filterBadge} />}
        </button>

        {/* Active Filters Count */}
        {hasActiveFilters && (
          <button className={styles.clearFiltersBtn} onClick={clearFilters}>
            Clear filters
          </button>
        )}

        {/* Sort Dropdown */}
        <div className={styles.sortWrapper}>
          <SortDropdown
            currentSort={{
              sortBy: filters.sortBy || "createdAt",
              sortOrder: filters.sortOrder || "desc",
            }}
            onSort={setSort}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Filter Sidebar - Desktop */}
        <FilterSidebar
          filters={filters}
          updateFilters={updateFilters}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          className={styles.sidebar}
        />

        {/* Mobile Filter Sidebar */}
        {showMobileFilters && (
          <>
            <div
              className={styles.overlay}
              onClick={() => setShowMobileFilters(false)}
              aria-hidden="true"
            />
            <div className={styles.mobileFilters}>
              <div className={styles.mobileFiltersHeader}>
                <h2>Filters</h2>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Close filters"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                updateFilters={updateFilters}
                toggleFilter={toggleFilter}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                className={styles.mobileFiltersSidebar}
              />
            </div>
          </>
        )}

        {/* Products Section */}
        <main className={styles.main}>
          {error ? (
            <div className={styles.error}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button className={styles.retryBtn} onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : (
            <>
              <ProductGrid
                products={products}
                isLoading={isLoading}
                columns={3}
                emptyMessage="Try adjusting your filters or search term to find what you're looking for."
              />

              {/* Pagination */}
              {!isLoading && pagination.pages > 1 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
