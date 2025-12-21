import styles from "@styles/components/ExampleComponent.module.css";

function ExampleComponent({ title, description }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default ExampleComponent;