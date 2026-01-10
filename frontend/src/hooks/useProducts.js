import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../services";

export function useProducts(initialFilters = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 18,
    total: 0,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
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
      limit: params.limit ? Number(params.limit) : 12,
      search: params.search || "",
      featured: params.featured === "true",
      onSale: params.onSale === "true",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsString]);

  // Fetch products - only depends on searchParamsString
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = Object.fromEntries(searchParams);

        // Build API params
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
        apiParams.page = params.page ? Number(params.page) : 1;
        apiParams.limit = params.limit ? Number(params.limit) : 12;

        const data = await productService.getProducts(apiParams);

        if (isMounted) {
          setProducts(data.products || []);
          setPagination(data.pagination || { page: 1, limit: 12, total: 0, pages: 0 });
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load products");
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
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

  const setSort = useCallback(
    (sortBy, sortOrder = "asc") => updateFilters({ sortBy, sortOrder, page: 1 }),
    [updateFilters]
  );

  const setSearch = useCallback((search) => updateFilters({ search, page: 1 }), [updateFilters]);

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
    error,
    hasActiveFilters,
    updateFilters,
    setPage,
    setSort,
    setSearch,
    toggleFilter,
    clearFilters,
    refetch,
  };
}
