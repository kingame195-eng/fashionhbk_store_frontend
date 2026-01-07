import styles from "../../styles/components/ProductCard.module.css";

export default function ProductCardSkeleton() {
  return (
    <article className={`${styles.card} ${styles.skeleton}`} aria-hidden="true">
      <div className={styles.link}>
        {/* Image Skeleton */}
        <div className={styles.imageContainer}>
          <div className={styles.imageSkeleton} />
        </div>

        {/* Info Skeleton */}
        <div className={styles.info}>
          <div className={styles.categorySkeleton} />
          <div className={styles.nameSkeleton} />
          <div className={styles.priceSkeleton} />
        </div>
      </div>
    </article>
  );
}
