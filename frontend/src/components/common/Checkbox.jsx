import styles from "@styles/components/Checkbox.module.css";

function Checkbox({ label, name, checked, onChange, ...props }) {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        {...props}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Checkbox;
