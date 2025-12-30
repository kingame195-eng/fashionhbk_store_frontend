import styles from "@styles/components/Radio.module.css";

function Radio({ label, name, value, checked, onChange, ...props }) {
  return (
    <label className={styles.radioWrapper}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radio}
        {...props}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Radio;
