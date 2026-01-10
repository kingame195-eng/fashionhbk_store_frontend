import api from "./api";

const productService = {
  /**
   * Get all products with filters
   */
  async getProducts(params = {}) {
    const response = await api.get("/products", { params });
    return response.data.data;
  },

  /**
   * Get single product by slug or ID
   */
  async getProductBySlug(slugOrId) {
    const response = await api.get(`/products/${slugOrId}`);
    return response.data.data?.product || response.data.data || response.data;
  },

  /**
   * Get product by ID
   */
  async getProductById(id) {
    const response = await api.get(`/products/id/${id}`);
    return response.data.data.product;
  },

  /**
   * Get all categories
   */
  async getCategories() {
    const response = await api.get("/products/categories");
    return response.data.data.categories;
  },

  /**
   * Get all brands
   */
  async getBrands() {
    const response = await api.get("/products/brands");
    return response.data.data.brands;
  },

  /**
   * Search products
   */
  async searchProducts(query, params = {}) {
    const response = await api.get("/products", {
      params: { search: query, ...params },
    });
    return response.data.data;
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 8) {
    const response = await api.get("/products", {
      params: { featured: true, limit },
    });
    return response.data.data.products;
  },

  /**
   * Get new arrivals
   */
  async getNewArrivals(limit = 8) {
    const response = await api.get("/products", {
      params: { sortBy: "createdAt", sortOrder: "desc", limit },
    });
    return response.data.data.products;
  },

  /**
   * Get related products
   */
  async getRelatedProducts(productId, limit = 4) {
    const response = await api.get(`/products/${productId}/related`, {
      params: { limit },
    });
    return response.data.data.products;
  },
};

/**
 * Get a single product by slug or ID
 * @param {string} slugOrId - Product slug or ID
 * @returns {Promise<Object>} Product details
 */

export const getProductBySlug = async (slugOrId) => {
  const response = await api.get(`/products/${slugOrId}`);
  return response.data.data?.product || response.data.data || response.data;
};

// If your backend uses ID instead of slug:
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data?.product || response.data.data || response.data;
};

export default productService;
