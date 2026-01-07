import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import styles from "../../styles/components/RelatedProducts.module.css";

export default function RelatedProducts({
  products = [],
  title = "You May Also Like",
  loading = false,
}) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [products]);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const cardWidth = 280; // Approximate card width + gap
    const scrollAmount = cardWidth * 2;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!loading && products.length === 0) {
    return null;
  }

  // Loading skeleton
  if (loading) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.carousel}>
          <div className={styles.scrollContainer}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.cardWrapper}>
                <div className={styles.skeleton}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonText} />
                  <div className={styles.skeletonPrice} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link to="/products" className={styles.viewAll}>
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>

      <div className={styles.carousel}>
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            className={`${styles.scrollBtn} ${styles.scrollLeft}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Products Scroll Container */}
        <div
          ref={scrollContainerRef}
          className={styles.scrollContainer}
          onScroll={updateScrollButtons}
        >
          {products.map((product) => (
            <div key={product._id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            className={`${styles.scrollBtn} ${styles.scrollRight}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
