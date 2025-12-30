import { forwardRef } from "react";
import styles from "@styles/components/Select.module.css";

/**
 * Select Component
 *
 * @param {Object} props
 * @param {string} props.label - Select label
 * @param {Array} props.options - Array of options { value, label }
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether the select is required
 * @param {string} props.name - Select name attribute
 * @param {string} props.value - Controlled select value
 * @param {function} props.onChange - Change handler
 */
const Select = forwardRef(
  ({ label, options, error, required = false, name, value, onChange, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${styles.select} ${error ? styles.errorSelect : ""}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;