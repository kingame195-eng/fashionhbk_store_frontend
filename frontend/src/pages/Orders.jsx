import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services";
import LoadingSpinner from "../components/common/LoadingSpinner";
import styles from "./Orders.module.css";

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await orderService.getOrders();
        // orderService returns { orders, pagination } directly
        setOrders(response?.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const filteredOrders =
    statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter);

  const getStatusColor = (status) => {
    const colors = {
      pending: styles.statusPending,
      confirmed: styles.statusConfirmed,
      processing: styles.statusProcessing,
      shipped: styles.statusShipped,
      delivered: styles.statusDelivered,
      cancelled: styles.statusCancelled,
      refunded: styles.statusRefunded,
    };
    return colors[status] || styles.statusDefault;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.orders}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔐</span>
            <h2 className={styles.emptyTitle}>Please Log In</h2>
            <p className={styles.emptyText}>You need to be logged in to view your orders.</p>
            <Link to="/login" className={styles.loginButton}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.orders}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <LoadingSpinner size="large" />
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.orders}>
        <div className={styles.container}>
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>My Orders</h1>
          <p className={styles.count}>
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        {/* Filters */}
        {orders.length > 0 && (
          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${statusFilter === "all" ? styles.active : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={`${styles.filterButton} ${statusFilter === "pending" ? styles.active : ""}`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`${styles.filterButton} ${statusFilter === "processing" ? styles.active : ""}`}
              onClick={() => setStatusFilter("processing")}
            >
              Processing
            </button>
            <button
              className={`${styles.filterButton} ${statusFilter === "shipped" ? styles.active : ""}`}
              onClick={() => setStatusFilter("shipped")}
            >
              Shipped
            </button>
            <button
              className={`${styles.filterButton} ${statusFilter === "delivered" ? styles.active : ""}`}
              onClick={() => setStatusFilter("delivered")}
            >
              Delivered
            </button>
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📦</span>
            <h2 className={styles.emptyTitle}>
              {statusFilter === "all" ? "No orders yet" : `No ${statusFilter} orders`}
            </h2>
            <p className={styles.emptyText}>
              {statusFilter === "all"
                ? "Start shopping to see your orders here!"
                : "Try selecting a different filter."}
            </p>
            {statusFilter === "all" && (
              <Link to="/products" className={styles.browseButton}>
                Browse Products
              </Link>
            )}
          </div>
        ) : (
          <div className={styles.ordersList}>
            {filteredOrders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderInfo}>
                    <span className={styles.orderNumber}>Order #{order.orderNumber}</span>
                    <span className={styles.orderDate}>{formatDate(order.createdAt)}</span>
                  </div>
                  <span className={`${styles.status} ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className={styles.orderItems}>
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        {item.product?.images?.[0] ? (
                          <img
                            src={
                              typeof item.product.images[0] === "object"
                                ? item.product.images[0].url
                                : item.product.images[0]
                            }
                            alt={item.product?.name || "Product"}
                          />
                        ) : (
                          <span className={styles.imagePlaceholder}>📦</span>
                        )}
                      </div>
                      <div className={styles.itemDetails}>
                        <span className={styles.itemName}>
                          {item.product?.name || item.name || "Product"}
                        </span>
                        <span className={styles.itemMeta}>
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className={styles.moreItems}>+{order.items.length - 3} more items</div>
                  )}
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.orderTotal}>
                    <span>Total:</span>
                    <strong>{formatPrice(order.pricing?.total || 0)}</strong>
                  </div>
                  <Link
                    to={`/order-confirmation/${order.orderNumber}`}
                    className={styles.viewButton}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {orders.length > 0 && (
          <div className={styles.footer}>
            <Link to="/products" className={styles.continueLink}>
              ← Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
