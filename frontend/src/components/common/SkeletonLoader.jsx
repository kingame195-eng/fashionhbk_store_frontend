import styles from "@styles/components/SkeletonLoader.module.css";

/**
 * Skeleton Loader Component
 *
 * @param {Object} props
 * @param {string} props.width - Width of the skeleton
 * @param {string} props.height - Height of the skeleton
 * @param {string} props.className - Additional class names
 */
function SkeletonLoader({ width = "100%", height = "1rem", className = "", ...props }) {
  const skeletonClasses = [styles.skeleton, className].filter(Boolean).join(" ");

  return (
    <div className={skeletonClasses} style={{ width, height }} aria-hidden="true" {...props} />
  );
}

export default SkeletonLoader;
