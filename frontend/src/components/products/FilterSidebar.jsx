import { useState, useEffect } from "react";
import { useCategories } from "../../hooks";
import styles from "../../styles/components/FilterSidebar.module.css";

export default function FilterSidebar({
  filters,
  updateFilters,
  toggleFilter,
  clearFilters,
  hasActiveFilters,
  className = "",
}) {
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || "",
    max: filters.maxPrice || "",
  });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sizes: true,
    colors: true,
  });

  // Sync priceRange when filters change externally (e.g., from URL or clear)
  useEffect(() => {
    setPriceRange({
      min: filters.minPrice || "",
      max: filters.maxPrice || "",
    });
  }, [filters.minPrice, filters.maxPrice]);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Black", value: "black", hex: "#000000" },
    { name: "White", value: "white", hex: "#FFFFFF" },
    { name: "Red", value: "red", hex: "#EF4444" },
    { name: "Blue", value: "blue", hex: "#3B82F6" },
    { name: "Green", value: "green", hex: "#22C55E" },
    { name: "Pink", value: "pink", hex: "#EC4899" },
    { name: "Navy", value: "navy", hex: "#1E3A5F" },
    { name: "Beige", value: "beige", hex: "#D4C4B0" },
    { name: "Gray", value: "gray", hex: "#6B7280" },
    { name: "Brown", value: "brown", hex: "#92400E" },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    updateFilters({
      minPrice: priceRange.min || undefined,
      maxPrice: priceRange.max || undefined,
      page: 1,
    });
  };

  const handleCategoryClick = (categorySlug) => {
    // Khi click category, giữ nguyên search query (nếu có) để kết hợp search + filter
    updateFilters({
      category: filters.category === categorySlug ? "" : categorySlug,
      page: 1,
      // Giữ nguyên search param
    });
  };

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      {/* Header with Clear Button */}
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        {hasActiveFilters && (
          <button className={styles.clearBtn} onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Categories Section */}
      <FilterSection
        title="Categories"
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        {categoriesLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <ul className={styles.filterList}>
            {categories.map((category) => (
              <li key={category.slug}>
                <button
                  className={`${styles.filterOption} ${
                    filters.category === category.slug ? styles.active : ""
                  }`}
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <span>{category.name}</span>
                  <span className={styles.count}>({category.count})</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </FilterSection>

      {/* Price Range Section */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <form onSubmit={handlePriceSubmit} className={styles.priceForm}>
          <div className={styles.priceInputs}>
            <div className={styles.priceInputWrapper}>
              <span className={styles.currency}>$</span>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: e.target.value,
                  }))
                }
                className={styles.priceInput}
                min="0"
              />
            </div>
            <span className={styles.priceSeparator}>to</span>
            <div className={styles.priceInputWrapper}>
              <span className={styles.currency}>$</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: e.target.value,
                  }))
                }
                className={styles.priceInput}
                min="0"
              />
            </div>
          </div>
          <button type="submit" className={styles.applyBtn}>
            Apply
          </button>
        </form>
      </FilterSection>

      {/* On Sale Toggle */}
      <div className={styles.toggleSection}>
        <label className={styles.toggleLabel}>
          <span>On Sale Only</span>
          <input
            type="checkbox"
            checked={filters.onSale || false}
            onChange={(e) => updateFilters({ onSale: e.target.checked, page: 1 })}
            className={styles.toggleInput}
          />
          <span className={styles.toggleSwitch} />
        </label>
      </div>

      {/* In Stock Toggle */}
      <div className={styles.toggleSection}>
        <label className={styles.toggleLabel}>
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => updateFilters({ inStock: e.target.checked, page: 1 })}
            className={styles.toggleInput}
          />
          <span className={styles.toggleSwitch} />
        </label>
      </div>
    </aside>
  );
}

// Collapsible Filter Section Component
function FilterSection({ title, isExpanded, onToggle, children }) {
  return (
    <div className={styles.filterGroup}>
      <button className={styles.filterHeader} onClick={onToggle} aria-expanded={isExpanded}>
        <h3 className={styles.filterTitle}>{title}</h3>
        <svg
          className={`${styles.chevron} ${isExpanded ? styles.expanded : ""}`}
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      {isExpanded && <div className={styles.filterContent}>{children}</div>}
    </div>
  );
}
