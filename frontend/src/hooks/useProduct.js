import { useState, useEffect } from "react";
import { productService } from "../services";

/**
 * Custom hook for fetching a single product with related products
 * @param {string} slug - Product slug or ID
 * @returns {Object} Product data and loading states
 */

// Custom hook for fetching a single product
export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch product details
        const responseData = await productService.getProductBySlug(slug);
        console.log("API Response:", responseData);
        // Handle both response formats: { product: {...} } or direct product object
        const productData = responseData?.product || responseData;
        console.log("Product Data:", productData);
        setProduct(productData);

        // Fetch related products (same category, excluding current)
        if (productData?.category) {
          try {
            const related = await productService.getProducts({
              category: productData.category._id || productData.category,
              limit: 8,
              exclude: productData._id,
            });
            setRelatedProducts(related?.products || []);
          } catch (relatedErr) {
            console.error("Failed to fetch related products:", relatedErr);
            // Don't fail the whole page just for related products
          }
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(err.response?.data?.message || err.message || "Failed to load product");
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const refetch = async () => {
    if (!slug) return;

    setIsLoading(true);
    try {
      const responseData = await productService.getProductBySlug(slug);
      // Handle both response formats: { product: {...} } or direct product object
      const productData = responseData?.product || responseData;
      setProduct(productData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to refresh product");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    product,
    relatedProducts,
    isLoading,
    error,
    refetch,
  };
}
