import styles from "@styles/components/Card.module.css";

/**
 * Card Component
 *
 * @param {Object} props
 * @param {string} props.variant - Card style variant (default, outlined, shadowed)
 * @param {React.ReactNode} props.header - Header content
 * @param {React.ReactNode} props.body - Body content
 * @param {React.ReactNode} props.footer - Footer content
 * @param {string} props.className - Additional class names
 */
function Card({ variant = "default", header, body, footer, className = "", ...props }) {
  const cardClasses = [styles.card, styles[variant], className].filter(Boolean).join(" ");

  return (
    <div className={cardClasses} {...props}>
      {header && <div className={styles.header}>{header}</div>}
      {body && <div className={styles.body}>{body}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

export default Card;
