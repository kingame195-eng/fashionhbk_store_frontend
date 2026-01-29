/**
 * Order Confirmation Page
 * Shown after successful checkout
 */

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { checkoutService } from "../services";
import { LoadingSpinner } from "../components/common";
import styles from "./OrderConfirmation.module.css";

// Icons
const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PackageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function OrderConfirmation() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await checkoutService.getOrderConfirmation(orderNumber);
        setOrder(data);
      } catch (err) {
        setError(err.message || "Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner size="large" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Order Not Found</h2>
        <p>{error}</p>
        <Link to="/" className={styles.homeLink}>
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.confirmationPage}>
      <div className={styles.container}>
        {/* Success Header */}
        <div className={styles.successHeader}>
          <div className={styles.successIcon}>
            <CheckCircleIcon />
          </div>
          <h1>Thank you for your order!</h1>
          <p>Your order has been confirmed and will be shipped soon.</p>
        </div>

        {/* Order Info */}
        <div className={styles.orderInfo}>
          <div className={styles.orderNumber}>
            <span>Order Number</span>
            <strong>{order?.orderNumber}</strong>
          </div>
          <div className={styles.orderDate}>
            <span>Order Date</span>
            <strong>{formatDate(order?.createdAt)}</strong>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Shipping Info */}
          <div className={styles.detailCard}>
            <div className={styles.cardHeader}>
              <TruckIcon />
              <h3>Shipping Details</h3>
            </div>
            <div className={styles.cardContent}>
              <p>
                <strong>
                  {order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}
                </strong>
                <br />
                {order?.shippingAddress?.address}
                {order?.shippingAddress?.apartment && `, ${order?.shippingAddress?.apartment}`}
                <br />
                {order?.shippingAddress?.city}, {order?.shippingAddress?.state}{" "}
                {order?.shippingAddress?.postalCode}
                <br />
                {order?.shippingAddress?.country}
              </p>
              <div className={styles.deliveryInfo}>
                <span className={styles.shippingMethod}>
                  {order?.shippingMethod === "express"
                    ? "Express Shipping"
                    : order?.shippingMethod === "overnight"
                      ? "Overnight Shipping"
                      : "Standard Shipping"}
                </span>
                {order?.estimatedDelivery && (
                  <span className={styles.estimatedDelivery}>
                    Estimated delivery: {formatDate(order.estimatedDelivery)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className={styles.detailCard}>
            <div className={styles.cardHeader}>
              <PackageIcon />
              <h3>Payment Details</h3>
            </div>
            <div className={styles.cardContent}>
              <p>
                <strong>Payment Method:</strong>{" "}
                {order?.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order?.paymentMethod === "card"
                    ? "Credit/Debit Card"
                    : "Bank Transfer"}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                <span
                  className={`${styles.status} ${
                    order?.paymentStatus === "paid" ? styles.paid : styles.pending
                  }`}
                >
                  {order?.paymentStatus === "paid" ? "Paid" : "Pending"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className={styles.orderItems}>
          <h3>Order Items</h3>
          <div className={styles.itemsList}>
            {order?.items?.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemImage}>
                  <img src={item.image || "/images/placeholder.jpg"} alt={item.name} />
                  <span className={styles.quantity}>{item.quantity}</span>
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemMeta}>
                    {item.size && `Size: ${item.size}`}
                    {item.color && ` | Color: ${item.color}`}
                  </span>
                </div>
                <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatPrice(order?.subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{order?.shippingCost === 0 ? "FREE" : formatPrice(order?.shippingCost)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax</span>
            <span>{formatPrice(order?.tax)}</span>
          </div>
          {order?.discount > 0 && (
            <div className={`${styles.summaryRow} ${styles.discount}`}>
              <span>Discount</span>
              <span>-{formatPrice(order?.discount)}</span>
            </div>
          )}
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>{formatPrice(order?.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link to="/products" className={styles.continueBtn}>
            Continue Shopping
          </Link>
          <Link to="/profile" className={styles.ordersBtn}>
            View My Orders
          </Link>
        </div>

        {/* Support Note */}
        <div className={styles.supportNote}>
          <p>
            Questions about your order? <Link to="/help">Contact our support team</Link> or email us
            at <a href="mailto:support@fashionstore.com">support@fashionstore.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
