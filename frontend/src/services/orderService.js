import api from "./api";

const orderService = {
  /**
   * Get user's orders
   */
  async getOrders(params = {}) {
    const response = await api.get("/orders", { params });
    return response.data.data;
  },

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data.order;
  },

  /**
   * Track order (guest)
   */
  async trackOrder(orderNumber, email) {
    const response = await api.get(`/orders/track/${orderNumber}`, {
      params: { email },
    });
    return response.data.data.order;
  },

  /**
   * Cancel order
   */
  async cancelOrder(orderId, reason) {
    const response = await api.post(`/orders/${orderId}/cancel`, { reason });
    return response.data.data.order;
  },

  /**
   * Request return
   */
  async requestReturn(orderId, returnData) {
    const response = await api.post(`/orders/${orderId}/return`, returnData);
    return response.data.data;
  },

  /**
   * Get order invoice
   */
  async getInvoice(orderId) {
    const response = await api.get(`/orders/${orderId}/invoice`);
    return response.data.data.invoice;
  },
};

export default orderService;