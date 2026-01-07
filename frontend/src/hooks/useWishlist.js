import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Custom hook for managing wishlist functionality
 * @returns {Object} Wishlist state and actions
 */
export function useWishlist() {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  /**
   * Check if a product is in the wishlist
   * @param {string} productId - Product ID to check
   * @returns {boolean} Whether the product is in wishlist
   */
  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some((item) => item._id === productId || item.product === productId);
    },
    [wishlist]
  );

  /**
   * Toggle a product in the wishlist
   * @param {string} productId - Product ID to toggle
   */
  const toggleWishlist = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        console.warn("User must be authenticated to use wishlist");
        return { success: false, error: "Authentication required" };
      }

      setIsToggling(true);

      try {
        if (isInWishlist(productId)) {
          // Remove from wishlist
          setWishlist((prev) =>
            prev.filter((item) => item._id !== productId && item.product !== productId)
          );
        } else {
          // Add to wishlist
          setWishlist((prev) => [...prev, { _id: productId, product: productId }]);
        }
        return { success: true };
      } catch (error) {
        console.error("Failed to toggle wishlist:", error);
        return { success: false, error: error.message };
      } finally {
        setIsToggling(false);
      }
    },
    [isAuthenticated, isInWishlist]
  );

  /**
   * Add a product to the wishlist
   * @param {string} productId - Product ID to add
   */
  const addToWishlist = useCallback(
    async (productId) => {
      if (isInWishlist(productId)) return { success: true };
      return toggleWishlist(productId);
    },
    [isInWishlist, toggleWishlist]
  );

  /**
   * Remove a product from the wishlist
   * @param {string} productId - Product ID to remove
   */
  const removeFromWishlist = useCallback(
    async (productId) => {
      if (!isInWishlist(productId)) return { success: true };
      return toggleWishlist(productId);
    },
    [isInWishlist, toggleWishlist]
  );

  /**
   * Clear the entire wishlist
   */
  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  return {
    wishlist,
    isLoading,
    isToggling,
    isInWishlist,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
}
