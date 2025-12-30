import { forwardRef } from "react";
import styles from "@styles/components/TextInput.module.css";

/**
 * TextInput Component
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.type - Input type (e.g., text, email)
 * @param {string} props.name - Input name attribute
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Change handler
 */
const TextInput = forwardRef(
  (
    { label, placeholder, error, required = false, type = "text", name, value, onChange, ...props },
    ref
  ) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
