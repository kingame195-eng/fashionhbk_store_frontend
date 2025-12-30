import styles from "@styles/components/FormGroup.module.css";

function FormGroup({ label, children, error }) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormGroup;
