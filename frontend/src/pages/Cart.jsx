/**
 * Cart Page Component
 *
 * Trang giỏ hàng đầy đủ chức năng với các tính năng:
 * - Hiển thị danh sách sản phẩm trong giỏ hàng
 * - Thay đổi số lượng sản phẩm
 * - Xóa sản phẩm khỏi giỏ hàng
 * - Áp dụng mã giảm giá/voucher
 * - Tính phí vận chuyển
 * - Hiển thị sản phẩm đề xuất
 * - Responsive design cho mobile và desktop
 *
 * @module pages/Cart
 */

import { useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { LoadingSpinner, Button } from "../components/common";
import { ShippingCalculator } from "../components/cart";
import styles from "./Cart.module.css";

// Icons components
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const TagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/**
 * Format giá tiền sang định dạng USD
 */
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0);
};

/**
 * Component displays a product in the cart
 */
function CartItem({ item, onUpdateQuantity, onRemove, isUpdating }) {
  // Get product information from item
  const product = item.product || {};
  const variant = item.variant || {};
  const name = product.name || item.name || "Product";
  const image = product.images?.[0] || variant.image || item.image || "/images/placeholder.jpg";
  const price = variant.price ?? product.price ?? item.price ?? 0;
  const originalPrice = product.originalPrice || product.compareAtPrice;
  const quantity = item.quantity || 1;
  const subtotal = price * quantity;
  const size = variant.size || item.size;
  const color = variant.color || item.color;
  const maxStock = product.stock ?? item.stock ?? 99;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      onUpdateQuantity(item._id, newQuantity);
    }
  };

  return (
    <div className={styles.cartItem}>
      {/* Product Image */}
      <Link to={`/products/${product.slug || product._id}`} className={styles.itemImage}>
        <img src={image} alt={name} loading="lazy" />
        {originalPrice && originalPrice > price && <span className={styles.saleBadge}>Sale</span>}
      </Link>

      {/* Product Info */}
      <div className={styles.itemInfo}>
        <Link to={`/products/${product.slug || product._id}`} className={styles.itemName}>
          {name}
        </Link>

        {/* Variant details */}
        <div className={styles.itemVariant}>
          {size && <span>Size: {size}</span>}
          {color && (
            <span className={styles.colorOption}>
              Màu: {color}
              <span className={styles.colorDot} style={{ backgroundColor: color.toLowerCase() }} />
            </span>
          )}
        </div>

        {/* Price */}
        <div className={styles.itemPrice}>
          <span className={styles.currentPrice}>{formatPrice(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* Mobile: Quantity and Actions */}
        <div className={styles.itemActionsMobile}>
          <div className={styles.quantityControl}>
            <button
              className={styles.quantityBtn}
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdating}
              aria-label="Decrease quantity"
            >
              <MinusIcon />
            </button>
            <span className={styles.quantityValue}>{quantity}</span>
            <button
              className={styles.quantityBtn}
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxStock || isUpdating}
              aria-label="Increase quantity"
            >
              <PlusIcon />
            </button>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => onRemove(item._id)}
            disabled={isUpdating}
            aria-label="Remove product"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Desktop: Quantity */}
      <div className={styles.itemQuantity}>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityBtn}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || isUpdating}
            aria-label="Giảm số lượng"
          >
            <MinusIcon />
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityBtn}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxStock || isUpdating}
            aria-label="Tăng số lượng"
          >
            <PlusIcon />
          </button>
        </div>
        {quantity >= maxStock && <span className={styles.stockWarning}>Tối đa: {maxStock}</span>}
      </div>

      {/* Desktop: Subtotal */}
      <div className={styles.itemSubtotal}>
        <span className={styles.subtotalPrice}>{formatPrice(subtotal)}</span>
      </div>

      {/* Desktop: Remove Button */}
      <div className={styles.itemRemove}>
        <button
          className={styles.removeBtn}
          onClick={() => onRemove(item._id)}
          disabled={isUpdating}
          aria-label="Xóa sản phẩm"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

/**
 * Component nhập mã giảm giá
 */
function CouponInput({ onApply, appliedCoupon, onRemove, isLoading }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter a discount code");
      return;
    }
    setError("");
    const result = await onApply(code.trim());
    if (!result.success) {
      setError(result.error || "Mã giảm giá không hợp lệ");
    } else {
      setCode("");
    }
  };

  if (appliedCoupon) {
    return (
      <div className={styles.appliedCoupon}>
        <div className={styles.couponInfo}>
          <TagIcon />
          <span className={styles.couponCode}>{appliedCoupon.code}</span>
          <span className={styles.couponDiscount}>-{appliedCoupon.discountPercent}%</span>
        </div>
        <button className={styles.removeCouponBtn} onClick={onRemove} disabled={isLoading}>
          Xóa
        </button>
      </div>
    );
  }

  return (
    <form className={styles.couponForm} onSubmit={handleSubmit}>
      <div className={styles.couponInputWrapper}>
        <TagIcon />
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError("");
          }}
          placeholder="Nhập mã giảm giá"
          className={styles.couponInput}
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        isLoading={isLoading}
        disabled={isLoading || !code.trim()}
      >
        Áp dụng
      </Button>
      {error && <span className={styles.couponError}>{error}</span>}
    </form>
  );
}

/**
 * Component hiển thị tiến độ miễn phí vận chuyển
 */
function FreeShippingProgress({ progress, amountNeeded, threshold }) {
  const isFreeShipping = progress >= 100;

  return (
    <div className={styles.freeShippingBanner}>
      {isFreeShipping ? (
        <div className={styles.freeShippingSuccess}>
          <CheckCircleIcon />
          <span>Chúc mừng! Bạn được miễn phí vận chuyển!</span>
        </div>
      ) : (
        <>
          <div className={styles.freeShippingText}>
            <TruckIcon />
            <span>
              Mua thêm <strong>{formatPrice(amountNeeded)}</strong> để được{" "}
              <strong>miễn phí vận chuyển</strong>
            </span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressText}>
            {formatPrice(threshold - amountNeeded)} / {formatPrice(threshold)}
          </span>
        </>
      )}
    </div>
  );
}

/**
 * Component tóm tắt đơn hàng
 */
function OrderSummary({
  subtotal,
  shipping,
  tax,
  discount,
  // eslint-disable-next-line no-unused-vars
  total,
  itemCount,
  onCheckout,
  isLoading,
  isAuthenticated,
  freeShippingThreshold,
}) {
  const navigate = useNavigate();
  const [calculatedShipping, setCalculatedShipping] = useState(null);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate("/login?redirect=/checkout");
    } else {
      onCheckout();
    }
  };

  // Xử lý thay đổi phí vận chuyển từ calculator
  const handleShippingChange = (shippingData) => {
    setCalculatedShipping(shippingData);
  };

  // Tính tổng tiền cuối cùng với phí ship mới
  const finalShipping = calculatedShipping?.fee ?? shipping;
  const finalTotal = subtotal + finalShipping + tax - discount;

  return (
    <div className={styles.orderSummary}>
      <h2 className={styles.summaryTitle}>Order Summary</h2>

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span>Subtotal ({itemCount} products)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Phí vận chuyển</span>
          <span className={finalShipping === 0 ? styles.freeShipping : ""}>
            {finalShipping === 0 ? "Miễn phí" : formatPrice(finalShipping)}
          </span>
        </div>

        <div className={styles.summaryRow}>
          <span>Thuế (10%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        {discount > 0 && (
          <div className={`${styles.summaryRow} ${styles.discountRow}`}>
            <span>Giảm giá</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className={styles.summaryDivider} />

        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span>Tổng cộng</span>
          <span className={styles.totalPrice}>{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {/* Shipping Calculator */}
      <ShippingCalculator
        subtotal={subtotal}
        freeShippingThreshold={freeShippingThreshold}
        onShippingChange={handleShippingChange}
      />

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleCheckout}
        isLoading={isLoading}
        leftIcon={<LockIcon />}
      >
        {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
      </Button>

      <div className={styles.secureCheckout}>
        <LockIcon />
        <span>Secure checkout with SSL 256-bit</span>
      </div>

      {/* Payment methods */}
      <div className={styles.paymentMethods}>
        <span>Chấp nhận:</span>
        <div className={styles.paymentIcons}>
          <span className={styles.paymentIcon}>💳 Visa</span>
          <span className={styles.paymentIcon}>💳 Mastercard</span>
          <span className={styles.paymentIcon}>📱 MoMo</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Empty cart component
 */
function EmptyCart() {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.emptyCartIcon}>
        <ShoppingBagIcon />
      </div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added any products to your cart yet.</p>
      <Link to="/products">
        <Button variant="primary" size="lg" leftIcon={<ArrowLeftIcon />}>
          Tiếp tục mua sắm
        </Button>
      </Link>
    </div>
  );
}

/**
 * Suggested products component
 */
function RecommendedProducts({ currentItems }) {
  // Mock recommended products - trong thực tế sẽ fetch từ API
  const recommendedProducts = useMemo(
    () => [
      {
        _id: "rec1",
        name: "Áo sơ mi linen cao cấp",
        price: 89.99,
        originalPrice: 129.99,
        image: "/images/products/shirt-1.jpg",
        slug: "ao-so-mi-linen",
      },
      {
        _id: "rec2",
        name: "Quần jeans slim fit",
        price: 79.99,
        image: "/images/products/jeans-1.jpg",
        slug: "quan-jeans-slim",
      },
      {
        _id: "rec3",
        name: "Áo khoác bomber",
        price: 149.99,
        originalPrice: 199.99,
        image: "/images/products/jacket-1.jpg",
        slug: "ao-khoac-bomber",
      },
      {
        _id: "rec4",
        name: "Giày sneaker trắng",
        price: 119.99,
        image: "/images/products/sneaker-1.jpg",
        slug: "giay-sneaker-trang",
      },
    ],
    []
  );

  // Lọc bỏ các sản phẩm đã có trong giỏ hàng
  const filteredProducts = recommendedProducts.filter(
    (product) =>
      !currentItems.some(
        (item) => item.product?._id === product._id || item.productId === product._id
      )
  );

  if (filteredProducts.length === 0) return null;

  return (
    <div className={styles.recommendedSection}>
      <h3 className={styles.recommendedTitle}>Có thể bạn cũng thích</h3>
      <div className={styles.recommendedGrid}>
        {filteredProducts.slice(0, 4).map((product) => (
          <Link
            key={product._id}
            to={`/products/${product.slug}`}
            className={styles.recommendedCard}
          >
            <div className={styles.recommendedImage}>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/images/placeholder.jpg";
                }}
              />
              {product.originalPrice && <span className={styles.saleBadge}>Sale</span>}
            </div>
            <div className={styles.recommendedInfo}>
              <h4>{product.name}</h4>
              <div className={styles.recommendedPrice}>
                <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Main Cart Page Component
 */
export default function Cart() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { isAuthenticated } = useAuth();

  // Cart state from context
  const {
    items,
    subtotal,
    total,
    discount,
    coupon,
    itemCount,
    shipping,
    tax,
    freeShippingProgress,
    amountToFreeShipping,
    freeShippingThreshold,
    isLoading,
    error,
    updateItem,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    clearError,
  } = useCart();

  // Local state for updating items
  const [updatingItems, setUpdatingItems] = useState(new Set());

  /**
   * Xử lý thay đổi số lượng sản phẩm
   */
  const handleUpdateQuantity = useCallback(
    async (itemId, quantity) => {
      setUpdatingItems((prev) => new Set(prev).add(itemId));

      const result = await updateItem(itemId, quantity);

      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });

      if (!result.success) {
        showError(result.error || "Unable to update quantity");
      }
    },
    [updateItem, showError]
  );

  /**
   * Xử lý xóa sản phẩm
   */
  const handleRemoveItem = useCallback(
    async (itemId) => {
      setUpdatingItems((prev) => new Set(prev).add(itemId));

      const result = await removeItem(itemId);

      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });

      if (result.success) {
        showSuccess("Product removed from cart");
      } else {
        showError(result.error || "Unable to remove product");
      }
    },
    [removeItem, showSuccess, showError]
  );

  /**
   * Xử lý xóa tất cả sản phẩm
   */
  const handleClearCart = useCallback(async () => {
    if (window.confirm("Are you sure you want to remove all products from cart?")) {
      const result = await clearCart();
      if (result.success) {
        showSuccess("All products removed from cart");
      } else {
        showError(result.error || "Unable to clear cart");
      }
    }
  }, [clearCart, showSuccess, showError]);

  /**
   * Xử lý áp dụng mã giảm giá
   */
  const handleApplyCoupon = useCallback(
    async (code) => {
      const result = await applyCoupon(code);
      if (result.success) {
        showSuccess("Discount code applied successfully!");
      }
      return result;
    },
    [applyCoupon, showSuccess]
  );

  /**
   * Xử lý xóa mã giảm giá
   */
  const handleRemoveCoupon = useCallback(async () => {
    const result = await removeCoupon();
    if (result.success) {
      showSuccess("Discount code removed");
    } else {
      showError(result.error || "Unable to remove discount code");
    }
  }, [removeCoupon, showSuccess, showError]);

  /**
   * Xử lý chuyển đến trang thanh toán
   */
  const handleCheckout = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  // Clear error on mount
  useCallback(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  // Show loading state
  if (isLoading && items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" />
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  // Show empty cart
  if (!isLoading && items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.container}>
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Your Cart</h1>
          <p className={styles.pageSubtitle}>{itemCount} products in cart</p>
        </div>

        {/* Free Shipping Progress */}
        <FreeShippingProgress
          progress={freeShippingProgress}
          amountNeeded={amountToFreeShipping}
          threshold={freeShippingThreshold}
        />

        {/* Error Banner */}
        {error && (
          <div className={styles.errorBanner}>
            <span>{error}</span>
            <button onClick={clearError}>×</button>
          </div>
        )}

        <div className={styles.cartContent}>
          {/* Cart Items Section */}
          <div className={styles.cartItemsSection}>
            {/* Table Header (Desktop) */}
            <div className={styles.cartHeader}>
              <span className={styles.headerProduct}>Sản phẩm</span>
              <span className={styles.headerQuantity}>Số lượng</span>
              <span className={styles.headerSubtotal}>Thành tiền</span>
              <span className={styles.headerAction}></span>
            </div>

            {/* Cart Items */}
            <div className={styles.cartItems}>
              {items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  isUpdating={updatingItems.has(item._id)}
                />
              ))}
            </div>

            {/* Cart Actions */}
            <div className={styles.cartActions}>
              <Link to="/products" className={styles.continueShoppingLink}>
                <ArrowLeftIcon />
                <span>Tiếp tục mua sắm</span>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleClearCart} disabled={isLoading}>
                Xóa tất cả
              </Button>
            </div>

            {/* Coupon Section */}
            <div className={styles.couponSection}>
              <h3>Mã giảm giá</h3>
              <CouponInput
                onApply={handleApplyCoupon}
                appliedCoupon={coupon}
                onRemove={handleRemoveCoupon}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Order Summary Section */}
          <div className={styles.summarySection}>
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
              itemCount={itemCount}
              onCheckout={handleCheckout}
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
              freeShippingThreshold={freeShippingThreshold}
            />
          </div>
        </div>

        {/* Recommended Products */}
        <RecommendedProducts currentItems={items} />
      </div>
    </div>
  );
}
