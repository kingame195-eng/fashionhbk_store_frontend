import styles from "@styles/components/LoadingSpinner.module.css";

/**
 * Loading Spinner Component
 *
 * @param {Object} props
 * @param {string} props.size - Size of the spinner (small, medium, large)
 * @param {string} props.color - Color of the spinner
 * @param {string} props.className - Additional class names
 */
function LoadingSpinner({
  size = "medium",
  color = "var(--color-primary)",
  className = "",
  ...props
}) {
  const spinnerClasses = [styles.spinner, styles[size], className].filter(Boolean).join(" ");

  return (
    <div
      className={spinnerClasses}
      style={{ borderColor: color }}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}

export default LoadingSpinner;
