import api from "./api";

const checkoutService = {
  /**
   * Initialize checkout
   */
  async initialize() {
    const response = await api.post("/checkout/initialize");
    return response.data.data;
  },

  /**
   * Get shipping rates
   */
  async getShippingRates(shippingAddress, subtotal) {
    const response = await api.post("/checkout/shipping-rates", {
      shippingAddress,
      subtotal,
    });
    return response.data.data;
  },

  /**
   * Calculate tax
   */
  async calculateTax(subtotal) {
    const response = await api.post("/checkout/calculate-tax", {
      subtotal,
    });
    return response.data.data;
  },

  /**
   * Validate coupon
   */
  async validateCoupon(code, subtotal) {
    const response = await api.post("/checkout/validate-coupon", {
      code,
      subtotal,
    });
    return response.data.data;
  },

  /**
   * Complete order
   */
  async completeOrder(orderData) {
    const response = await api.post("/checkout/complete", orderData);
    return response.data.data;
  },

  /**
   * Get order confirmation
   */
  async getOrderConfirmation(orderNumber, email) {
    const response = await api.get(`/checkout/order/${orderNumber}`, {
      params: email ? { email } : {},
    });
    return response.data.data.order;
  },
};

export default checkoutService;
