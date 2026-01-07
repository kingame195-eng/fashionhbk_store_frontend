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
  async getShippingRates(shippingAddress) {
    const response = await api.post("/checkout/shipping-rates", {
      shippingAddress,
    });
    return response.data.data;
  },

  /**
   * Calculate tax
   */
  async calculateTax(shippingAddress) {
    const response = await api.post("/checkout/calculate-tax", {
      shippingAddress,
    });
    return response.data.data;
  },

  /**
   * Create payment intent
   */
  async createPaymentIntent(checkoutData) {
    const response = await api.post("/checkout/create-payment-intent", checkoutData);
    return response.data.data;
  },

  /**
   * Update payment intent
   */
  async updatePaymentIntent(paymentIntentId, updates) {
    const response = await api.patch(`/checkout/payment-intent/${paymentIntentId}`, updates);
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
