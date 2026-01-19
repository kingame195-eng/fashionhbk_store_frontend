import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../services";

export function useProducts(initialFilters = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Use ref to track if initial fetch is done
  const initialFetchDone = useRef(false);

  // Parse filters from URL - memoize the string to prevent unnecessary re-renders
  const searchParamsString = searchParams.toString();

  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams);
    return {
      category: params.category || initialFilters.category || "",
      brand: params.brand ? params.brand.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      color: params.color ? params.color.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      sortBy: params.sortBy || "createdAt",
      sortOrder: params.sortOrder || "desc",
      page: params.page ? Number(params.page) : 1,
      search: params.search || "",
      featured: params.featured === "true",
      onSale: params.onSale === "true",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsString]);

  // Track previous filters to detect if we should reset or append products
  const prevFiltersRef = useRef(null);

  // Fetch products - only depends on searchParamsString
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      const params = Object.fromEntries(searchParams);
      const currentPage = params.page ? Number(params.page) : 1;

      // Check if only page changed (for load more) or other filters changed (reset)
      const currentFiltersKey = JSON.stringify({
        category: params.category,
        brand: params.brand,
        size: params.size,
        color: params.color,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        search: params.search,
        featured: params.featured,
        onSale: params.onSale,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      });

      const isLoadMore = prevFiltersRef.current === currentFiltersKey && currentPage > 1;
      prevFiltersRef.current = currentFiltersKey;

      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setProducts([]);
      }
      setError(null);

      try {
        // Build API params - limit sẽ được backend quyết định
        const apiParams = {};

        if (params.category) apiParams.category = params.category;
        if (params.brand) apiParams.brand = params.brand;
        if (params.size) apiParams.size = params.size;
        if (params.color) apiParams.color = params.color;
        if (params.minPrice) apiParams.minPrice = Number(params.minPrice);
        if (params.maxPrice) apiParams.maxPrice = Number(params.maxPrice);
        if (params.search) apiParams.search = params.search;
        if (params.featured === "true") apiParams.featured = true;
        if (params.onSale === "true") apiParams.onSale = true;

        apiParams.sortBy = params.sortBy || "createdAt";
        apiParams.sortOrder = params.sortOrder || "desc";
        apiParams.page = currentPage;

        const data = await productService.getProducts(apiParams);

        if (isMounted) {
          if (isLoadMore) {
            // Append new products to existing ones
            setProducts((prev) => [...prev, ...(data.products || [])]);
          } else {
            // Replace products (first load or filter change)
            setProducts(data.products || []);
          }
          setPagination(data.pagination || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load products");
          if (!isLoadMore) {
            setProducts([]);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsLoadingMore(false);
          initialFetchDone.current = true;
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [searchParamsString, searchParams]);

  // Update filters (updates URL)
  const updateFilters = useCallback(
    (newFilters) => {
      const currentParams = Object.fromEntries(searchParams);
      const merged = { ...currentParams };

      // Apply new filters
      Object.entries(newFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            merged[key] = value.join(",");
          } else {
            delete merged[key];
          }
        } else if (value !== undefined && value !== null && value !== "" && value !== false) {
          merged[key] = String(value);
        } else {
          delete merged[key];
        }
      });

      // Remove default values
      if (merged.sortBy === "createdAt") delete merged.sortBy;
      if (merged.sortOrder === "desc") delete merged.sortOrder;
      if (merged.page === "1") delete merged.page;

      setSearchParams(merged, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Convenience methods
  const setPage = useCallback((page) => updateFilters({ page }), [updateFilters]);

  // Load more products
  const loadMore = useCallback(() => {
    if (pagination && pagination.hasNextPage && !isLoadingMore) {
      updateFilters({ page: pagination.currentPage + 1 });
    }
  }, [pagination, isLoadingMore, updateFilters]);

  // Check if can load more
  const hasMore = useMemo(() => {
    return pagination && pagination.hasNextPage;
  }, [pagination]);

  // Calculate remaining products
  const remainingProducts = useMemo(() => {
    if (!pagination) return 0;
    const loaded = products.length;
    return Math.max(0, pagination.totalProducts - loaded);
  }, [pagination, products.length]);

  const setSort = useCallback(
    (sortBy, sortOrder = "asc") => updateFilters({ sortBy, sortOrder, page: 1 }),
    [updateFilters]
  );

  // Tìm kiếm sản phẩm - giữ nguyên các filter khác để user có thể kết hợp search + filter
  const setSearch = useCallback(
    (search, clearCategory = false) => {
      if (search && search.trim()) {
        // Có từ khóa tìm kiếm
        if (clearCategory) {
          // Khi search từ Header hoặc muốn search toàn site -> xóa category
          updateFilters({
            search,
            category: "",
            page: 1,
          });
        } else {
          // Search trong context hiện tại (giữ category nếu có)
          updateFilters({ search, page: 1 });
        }
      } else {
        // Xóa từ khóa tìm kiếm -> giữ nguyên các filter khác
        updateFilters({ search: "", page: 1 });
      }
    },
    [updateFilters]
  );

  const toggleFilter = useCallback(
    (filterType, value) => {
      const current = filters[filterType] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateFilters({ [filterType]: updated, page: 1 });
    },
    [filters, updateFilters]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.category ||
      filters.brand.length > 0 ||
      filters.size.length > 0 ||
      filters.color.length > 0 ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.search ||
      filters.featured ||
      filters.onSale
    );
  }, [filters]);

  // Manual refetch
  const refetch = useCallback(() => {
    // Trigger refetch by updating a dummy param
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams({ ...currentParams }, { replace: true });
  }, [searchParams, setSearchParams]);

  return {
    products,
    pagination,
    filters,
    isLoading,
    isLoadingMore,
    error,
    hasActiveFilters,
    hasMore,
    remainingProducts,
    updateFilters,
    setPage,
    setSort,
    setSearch,
    toggleFilter,
    clearFilters,
    loadMore,
    refetch,
  };
}
