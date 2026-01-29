import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import wishlistService from "../services/wishlistService";

/**
 * Custom hook for managing wishlist functionality with API integration
 * @returns {Object} Wishlist state and actions
 */
export function useWishlist() {
  const { isAuthenticated, user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch wishlist from API when user is authenticated
   */
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await wishlistService.getWishlist();
      if (response.success) {
        // Backend returns data.wishlist, not data.items
        setWishlist(response.data.wishlist || response.data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setError(err.response?.data?.message || "Failed to load wishlist");
      setWishlist([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch wishlist on mount and when auth state changes
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist, user]);

  /**
   * Check if a product is in the wishlist
   * @param {string} productId - Product ID to check
   * @returns {boolean} Whether the product is in wishlist
   */
  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some((item) => {
        const itemProductId = item.product?._id || item.product || item._id;
        return itemProductId === productId;
      });
    },
    [wishlist]
  );

  /**
   * Toggle a product in the wishlist
   * @param {string} productId - Product ID to toggle
   * @returns {Promise<Object>} Result of the operation
   */
  const toggleWishlist = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        console.warn("User must be authenticated to use wishlist");
        return { success: false, error: "Authentication required" };
      }

      setIsToggling(true);
      setError(null);

      // Optimistic update
      const wasInWishlist = isInWishlist(productId);
      if (wasInWishlist) {
        setWishlist((prev) =>
          prev.filter((item) => {
            const itemProductId = item.product?._id || item.product || item._id;
            return itemProductId !== productId;
          })
        );
      } else {
        setWishlist((prev) => [...prev, { product: productId, addedAt: new Date() }]);
      }

      try {
        const response = await wishlistService.toggleWishlist(productId);
        if (response.success) {
          // Backend returns productId, isInWishlist, count - no full items list
          // The optimistic update already handled the UI, so we're done
          return { success: true, action: response.data.isInWishlist ? "added" : "removed" };
        }
        return { success: false, error: response.message };
      } catch (err) {
        // Revert optimistic update on error
        if (wasInWishlist) {
          setWishlist((prev) => [...prev, { product: productId, addedAt: new Date() }]);
        } else {
          setWishlist((prev) =>
            prev.filter((item) => {
              const itemProductId = item.product?._id || item.product || item._id;
              return itemProductId !== productId;
            })
          );
        }
        console.error("Failed to toggle wishlist:", err);
        const errorMessage = err.response?.data?.message || "Failed to update wishlist";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsToggling(false);
      }
    },
    [isAuthenticated, isInWishlist]
  );

  /**
   * Add a product to the wishlist
   * @param {string} productId - Product ID to add
   * @returns {Promise<Object>} Result of the operation
   */
  const addToWishlist = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        return { success: false, error: "Authentication required" };
      }

      if (isInWishlist(productId)) {
        return { success: true, message: "Product already in wishlist" };
      }

      setIsToggling(true);
      setError(null);

      // Optimistic update
      setWishlist((prev) => [...prev, { product: productId, addedAt: new Date() }]);

      try {
        const response = await wishlistService.addToWishlist(productId);
        if (response.success) {
          // Backend only returns productId and count, optimistic update already applied
          return { success: true };
        }
        return { success: false, error: response.message };
      } catch (err) {
        // Revert optimistic update
        setWishlist((prev) =>
          prev.filter((item) => {
            const itemProductId = item.product?._id || item.product || item._id;
            return itemProductId !== productId;
          })
        );
        console.error("Failed to add to wishlist:", err);
        const errorMessage = err.response?.data?.message || "Failed to add to wishlist";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsToggling(false);
      }
    },
    [isAuthenticated, isInWishlist]
  );

  /**
   * Remove a product from the wishlist
   * @param {string} productId - Product ID to remove
   * @returns {Promise<Object>} Result of the operation
   */
  const removeFromWishlist = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        return { success: false, error: "Authentication required" };
      }

      if (!isInWishlist(productId)) {
        return { success: true, message: "Product not in wishlist" };
      }

      setIsToggling(true);
      setError(null);

      // Store for potential rollback
      const previousWishlist = [...wishlist];

      // Optimistic update
      setWishlist((prev) =>
        prev.filter((item) => {
          const itemProductId = item.product?._id || item.product || item._id;
          return itemProductId !== productId;
        })
      );

      try {
        const response = await wishlistService.removeFromWishlist(productId);
        if (response.success) {
          if (response.data?.items) {
            setWishlist(response.data.items);
          }
          return { success: true };
        }
        return { success: false, error: response.message };
      } catch (err) {
        // Revert optimistic update
        setWishlist(previousWishlist);
        console.error("Failed to remove from wishlist:", err);
        const errorMessage = err.response?.data?.message || "Failed to remove from wishlist";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsToggling(false);
      }
    },
    [isAuthenticated, isInWishlist, wishlist]
  );

  /**
   * Clear the entire wishlist
   * @returns {Promise<Object>} Result of the operation
   */
  const clearWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      return { success: false, error: "Authentication required" };
    }

    setIsToggling(true);
    setError(null);

    // Store for potential rollback
    const previousWishlist = [...wishlist];

    // Optimistic update
    setWishlist([]);

    try {
      const response = await wishlistService.clearWishlist();
      if (response.success) {
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      // Revert optimistic update
      setWishlist(previousWishlist);
      console.error("Failed to clear wishlist:", err);
      const errorMessage = err.response?.data?.message || "Failed to clear wishlist";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsToggling(false);
    }
  }, [isAuthenticated, wishlist]);

  /**
   * Get wishlist count
   */
  const wishlistCount = wishlist.length;

  return {
    wishlist,
    wishlistCount,
    isLoading,
    isToggling,
    error,
    isInWishlist,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    refetch: fetchWishlist,
  };
}
