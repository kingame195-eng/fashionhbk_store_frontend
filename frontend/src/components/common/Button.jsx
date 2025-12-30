import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "@styles/components/Button.module.css";

// Loading Spinner for Button
const ButtonSpinner = () => (
  <svg
    className={styles.spinner}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className={styles.spinnerTrack}
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className={styles.spinnerHead}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button Component
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {boolean} props.fullWidth - Whether button takes full width
 * @param {boolean} props.isLoading - Show loading spinner
 * @param {boolean} props.disabled - Disable the button
 * @param {React.ReactNode} props.leftIcon - Icon to show on left
 * @param {React.ReactNode} props.rightIcon - Icon to show on right
 * @param {string} props.href - External link URL (renders as <a>)
 * @param {string} props.to - React Router link path (renders as <Link>)
 * @param {React.ReactNode} props.children - Button content
 */

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      href,
      to,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Build class names
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      isLoading && styles.loading,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Button content
    const content = (
      <>
        {isLoading && <ButtonSpinner />}
        {!isLoading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <span className={styles.text}>{children}</span>
        {!isLoading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </>
    );

    // Render as external link
    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      );
    }

    // Render as React Router Link
    if (to) {
      return (
        <Link ref={ref} to={to} className={buttonClasses} {...props}>
          {content}
        </Link>
      );
    }

    // Render as button
    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
