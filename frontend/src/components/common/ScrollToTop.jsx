import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component
 * Automatically scrolls to top when:
 * - Route (pathname) changes
 * - Category filter changes
 * - Search query changes
 * Does NOT scroll when: page number changes (for load more), sort changes
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  const prevPathRef = useRef(pathname);
  const prevCategoryRef = useRef(null);
  const prevSearchRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const category = params.get("category");
    const searchQuery = params.get("search");

    // Determine if we should scroll to top
    const pathChanged = prevPathRef.current !== pathname;
    const categoryChanged = prevCategoryRef.current !== category;
    const searchChanged = prevSearchRef.current !== searchQuery;

    // Scroll to top if path, category, or search query changed
    if (pathChanged || categoryChanged || searchChanged) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

    // Update refs
    prevPathRef.current = pathname;
    prevCategoryRef.current = category;
    prevSearchRef.current = searchQuery;
  }, [pathname, search]);

  return null;
}
