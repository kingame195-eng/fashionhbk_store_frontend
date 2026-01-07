import styles from "../../styles/components/Pagination.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
}) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis
  const generatePages = () => {
    const pages = [];
    const showEllipsisStart = currentPage > siblingCount + 2;
    const showEllipsisEnd = currentPage < totalPages - siblingCount - 1;

    // Always show first page
    pages.push(1);

    // Start ellipsis
    if (showEllipsisStart) {
      pages.push("start-ellipsis");
    }

    // Middle pages
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // End ellipsis
    if (showEllipsisEnd) {
      pages.push("end-ellipsis");
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  const handlePageClick = (page) => {
    if (page !== currentPage && typeof page === "number") {
      onPageChange(page);
      // Scroll to top of product grid
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {/* First Page Button */}
      {showFirstLast && (
        <button
          className={`${styles.pageBtn} ${styles.navBtn}`}
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m11 17-5-5 5-5M18 17l-5-5 5-5" strokeWidth="2" />
          </svg>
        </button>
      )}

      {/* Previous Button */}
      <button
        className={`${styles.pageBtn} ${styles.navBtn}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m15 18-6-6 6-6" strokeWidth="2" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className={styles.pages}>
        {pages.map((page) =>
          typeof page === "string" ? (
            <span key={page} className={styles.ellipsis}>
              •••
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.pageBtn} ${styles.pageNumber} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => handlePageClick(page)}
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className={`${styles.pageBtn} ${styles.navBtn}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m9 18 6-6-6-6" strokeWidth="2" />
        </svg>
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          className={`${styles.pageBtn} ${styles.navBtn}`}
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m13 17 5-5-5-5M6 17l5-5-5-5" strokeWidth="2" />
          </svg>
        </button>
      )}
    </nav>
  );
}
