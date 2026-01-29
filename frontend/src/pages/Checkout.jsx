/**
 * Checkout Page Component
 *
 * Multi-step checkout flow with:
 * - Shipping information form
 * - Shipping method selection
 * - Payment method selection
 * - Order review and confirmation
 */

import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { checkoutService } from "../services";
import { Button, LoadingSpinner } from "../components/common";
import styles from "./Checkout.module.css";

// Icons
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0);
};

// Checkout steps
const STEPS = {
  SHIPPING: 0,
  PAYMENT: 1,
  REVIEW: 2,
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(STEPS.SHIPPING);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Vietnam",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [customerNote, setCustomerNote] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Shipping options
  const shippingOptions = useMemo(
    () => [
      {
        id: "standard",
        name: "Standard Shipping",
        price: subtotal >= 100 ? 0 : 5.99,
        days: "5-7 business days",
      },
      { id: "express", name: "Express Shipping", price: 14.99, days: "2-3 business days" },
      { id: "overnight", name: "Overnight Shipping", price: 29.99, days: "1 business day" },
    ],
    [subtotal]
  );

  // Payment options
  const paymentOptions = [
    { id: "cod", name: "Cash on Delivery", description: "Pay when you receive" },
    { id: "card", name: "Credit/Debit Card", description: "Visa, Mastercard, etc." },
    { id: "bank_transfer", name: "Bank Transfer", description: "Direct bank transfer" },
  ];

  // Calculate totals
  const calculations = useMemo(() => {
    const selectedShipping = shippingOptions.find((s) => s.id === shippingMethod);
    const shippingCost = selectedShipping?.price || 0;
    const tax = Number((subtotal * 0.1).toFixed(2));
    const discount = appliedCoupon?.discount || 0;
    const total = Number((subtotal + shippingCost + tax - discount).toFixed(2));

    return { shippingCost, tax, discount, total };
  }, [subtotal, shippingMethod, appliedCoupon, shippingOptions]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  // Prefill user info
  useEffect(() => {
    if (user) {
      setShippingAddress((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Validate shipping form
  const validateShipping = () => {
    const required = ["firstName", "lastName", "phone", "address", "city", "postalCode"];
    if (!isAuthenticated) required.push("email");

    for (const field of required) {
      if (!shippingAddress[field]?.trim()) {
        showToast(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`, "error");
        return false;
      }
    }
    return true;
  };

  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const result = await checkoutService.validateCoupon?.(couponCode, subtotal);
      if (result) {
        setAppliedCoupon(result);
        showToast(result.message || "Coupon applied!", "success");
      }
    } catch (error) {
      showToast(error.message || "Invalid coupon code", "error");
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    showToast("Coupon removed", "info");
  };

  // Navigate steps
  const goToStep = (step) => {
    if (step === STEPS.PAYMENT && !validateShipping()) return;
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  // Submit order
  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    try {
      const orderData = {
        shippingAddress,
        billingAddress: shippingAddress,
        sameAsShipping: true,
        paymentMethod,
        shippingMethod,
        customerNote,
        couponCode: appliedCoupon?.code,
        guestEmail: !isAuthenticated ? shippingAddress.email : undefined,
      };

      const result = await checkoutService.completeOrder(orderData);

      if (result?.order) {
        showToast("Order placed successfully!", "success");
        navigate(`/order-confirmation/${result.order.orderNumber}`);
      }
    } catch (error) {
      showToast(error.message || "Failed to place order", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCheckout}>
        <LoadingSpinner />
        <p>Redirecting to cart...</p>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      {/* Progress Steps */}
      <div className={styles.progressBar}>
        <div className={styles.container}>
          {["Shipping", "Payment", "Review"].map((label, index) => (
            <div
              key={label}
              className={`${styles.step} ${currentStep >= index ? styles.active : ""} ${
                currentStep > index ? styles.completed : ""
              }`}
            >
              <div className={styles.stepNumber}>
                {currentStep > index ? <CheckIcon /> : index + 1}
              </div>
              <span className={styles.stepLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.checkoutGrid}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Back Link */}
            <Link to="/cart" className={styles.backLink}>
              <ChevronLeftIcon />
              Back to Cart
            </Link>

            {/* Step 1: Shipping */}
            {currentStep === STEPS.SHIPPING && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Shipping Information</h2>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingAddress.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingAddress.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {!isAuthenticated && (
                    <div className={styles.formGroupFull}>
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingAddress.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}
                  <div className={styles.formGroupFull}>
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label>Apartment, suite, etc.</label>
                    <input
                      type="text"
                      name="apartment"
                      value={shippingAddress.apartment}
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>State / Province</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Country</label>
                    <select
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                    >
                      <option value="Vietnam">Vietnam</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                <h3 className={styles.subsectionTitle}>Shipping Method</h3>
                <div className={styles.shippingOptions}>
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`${styles.shippingOption} ${
                        shippingMethod === option.id ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div className={styles.optionInfo}>
                        <span className={styles.optionName}>{option.name}</span>
                        <span className={styles.optionDays}>{option.days}</span>
                      </div>
                      <span className={styles.optionPrice}>
                        {option.price === 0 ? "FREE" : formatPrice(option.price)}
                      </span>
                    </label>
                  ))}
                </div>

                <div className={styles.stepActions}>
                  <Button variant="primary" onClick={() => goToStep(STEPS.PAYMENT)}>
                    Continue to Payment
                  </Button>
                </div>
              </section>
            )}

            {/* Step 2: Payment */}
            {currentStep === STEPS.PAYMENT && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment Method</h2>

                <div className={styles.paymentOptions}>
                  {paymentOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`${styles.paymentOption} ${
                        paymentMethod === option.id ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        checked={paymentMethod === option.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className={styles.optionInfo}>
                        <span className={styles.optionName}>{option.name}</span>
                        <span className={styles.optionDescription}>{option.description}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Coupon Code */}
                <div className={styles.couponSection}>
                  <h3 className={styles.subsectionTitle}>Have a Coupon?</h3>
                  {appliedCoupon ? (
                    <div className={styles.appliedCoupon}>
                      <span>
                        <strong>{appliedCoupon.code}</strong> - {appliedCoupon.message}
                      </span>
                      <button onClick={handleRemoveCoupon} className={styles.removeCoupon}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className={styles.couponInput}>
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      />
                      <Button variant="outline" size="small" onClick={handleApplyCoupon}>
                        Apply
                      </Button>
                    </div>
                  )}
                </div>

                {/* Order Notes */}
                <div className={styles.notesSection}>
                  <h3 className={styles.subsectionTitle}>Order Notes (Optional)</h3>
                  <textarea
                    placeholder="Add any special instructions for your order..."
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className={styles.stepActions}>
                  <Button variant="outline" onClick={() => goToStep(STEPS.SHIPPING)}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => goToStep(STEPS.REVIEW)}>
                    Review Order
                  </Button>
                </div>
              </section>
            )}

            {/* Step 3: Review */}
            {currentStep === STEPS.REVIEW && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Review Your Order</h2>

                {/* Shipping Summary */}
                <div className={styles.reviewSection}>
                  <div className={styles.reviewHeader}>
                    <h3>Shipping Address</h3>
                    <button onClick={() => setCurrentStep(STEPS.SHIPPING)}>Edit</button>
                  </div>
                  <p>
                    {shippingAddress.firstName} {shippingAddress.lastName}
                    <br />
                    {shippingAddress.address}
                    {shippingAddress.apartment && `, ${shippingAddress.apartment}`}
                    <br />
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                    <br />
                    {shippingAddress.country}
                    <br />
                    Phone: {shippingAddress.phone}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className={styles.reviewSection}>
                  <div className={styles.reviewHeader}>
                    <h3>Payment Method</h3>
                    <button onClick={() => setCurrentStep(STEPS.PAYMENT)}>Edit</button>
                  </div>
                  <p>{paymentOptions.find((p) => p.id === paymentMethod)?.name}</p>
                </div>

                {/* Items Summary */}
                <div className={styles.reviewSection}>
                  <h3>Items ({items.length})</h3>
                  <div className={styles.reviewItems}>
                    {items.map((item) => (
                      <div key={item._id} className={styles.reviewItem}>
                        <img
                          src={item.product?.images?.[0] || "/images/placeholder.jpg"}
                          alt={item.product?.name}
                        />
                        <div className={styles.reviewItemInfo}>
                          <span className={styles.itemName}>{item.product?.name}</span>
                          <span className={styles.itemMeta}>
                            {item.size && `Size: ${item.size}`}
                            {item.color && ` | Color: ${item.color}`}
                          </span>
                          <span className={styles.itemQty}>Qty: {item.quantity}</span>
                        </div>
                        <span className={styles.itemPrice}>
                          {formatPrice(
                            (item.variant?.price || item.product?.price) * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.stepActions}>
                  <Button variant="outline" onClick={() => goToStep(STEPS.PAYMENT)}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className={styles.placeOrderBtn}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="small" />
                    ) : (
                      <>
                        <LockIcon />
                        Place Order - {formatPrice(calculations.total)}
                      </>
                    )}
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <aside className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <div className={styles.summaryItems}>
              {items.slice(0, 3).map((item) => (
                <div key={item._id} className={styles.summaryItem}>
                  <div className={styles.summaryItemImage}>
                    <img
                      src={item.product?.images?.[0] || "/images/placeholder.jpg"}
                      alt={item.product?.name}
                    />
                    <span className={styles.itemQtyBadge}>{item.quantity}</span>
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <span>{item.product?.name}</span>
                    <span className={styles.summaryItemPrice}>
                      {formatPrice(item.variant?.price || item.product?.price)}
                    </span>
                  </div>
                </div>
              ))}
              {items.length > 3 && (
                <p className={styles.moreItems}>+{items.length - 3} more items</p>
              )}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>
                  {calculations.shippingCost === 0
                    ? "FREE"
                    : formatPrice(calculations.shippingCost)}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax (10%)</span>
                <span>{formatPrice(calculations.tax)}</span>
              </div>
              {calculations.discount > 0 && (
                <div className={`${styles.summaryRow} ${styles.discount}`}>
                  <span>Discount</span>
                  <span>-{formatPrice(calculations.discount)}</span>
                </div>
              )}
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>{formatPrice(calculations.total)}</span>
              </div>
            </div>

            {subtotal < 100 && (
              <p className={styles.freeShippingNote}>
                Add {formatPrice(100 - subtotal)} more for free shipping!
              </p>
            )}

            <div className={styles.secureNote}>
              <LockIcon />
              <span>Secure checkout</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
