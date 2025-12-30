import { forwardRef } from "react";
import styles from "@styles/components/IconButton.module.css";

/**
 * IconButton Component - For icon-only buttons
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {'default'|'primary'|'danger'} props.variant - Button variant
 * @param {string} props.label - Accessible label (required for a11y)
 * @param {React.ReactNode} props.children - Icon element
 */

const IconButton = forwardRef(
  ({ size = "md", variant = "default", label, className = "", children, ...props }, ref) => {
    const buttonClasses = [styles.iconButton, styles[size], styles[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type="button" className={buttonClasses} aria-label={label} {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
