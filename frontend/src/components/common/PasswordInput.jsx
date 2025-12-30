import { useState, forwardRef } from "react";
import styles from "@styles/components/PasswordInput.module.css";

/**
 * PasswordInput Component
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.name - Input name attribute
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Change handler
 */

const PasswordInput = forwardRef(
  ({ label, placeholder, error, required = false, name, value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            id={name}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            {...props}
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
