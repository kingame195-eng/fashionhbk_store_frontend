import { useState, useRef, useEffect } from "react";
import styles from "../../styles/components/SortDropdown.module.css";

const sortOptions = [
  { label: "Newest", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Price: Low to High", sortBy: "price", sortOrder: "asc" },
  { label: "Price: High to Low", sortBy: "price", sortOrder: "desc" },
  { label: "Name: A-Z", sortBy: "name", sortOrder: "asc" },
  { label: "Name: Z-A", sortBy: "name", sortOrder: "desc" },
  { label: "Best Selling", sortBy: "soldCount", sortOrder: "desc" },
  { label: "Top Rated", sortBy: "rating", sortOrder: "desc" },
];

export default function SortDropdown({ currentSort, onSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption =
    sortOptions.find(
      (opt) => opt.sortBy === currentSort.sortBy && opt.sortOrder === currentSort.sortOrder
    ) || sortOptions[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSelect = (option) => {
    onSort(option.sortBy, option.sortOrder);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.label}>Sort by:</span>
        <span className={styles.value}>{currentOption.label}</span>
        <svg
          viewBox="0 0 24 24"
          className={`${styles.icon} ${isOpen ? styles.open : ""}`}
          fill="none"
          stroke="currentColor"
        >
          <path d="m6 9 6 6 6-6" strokeWidth="2" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {sortOptions.map((option) => (
            <li key={`${option.sortBy}-${option.sortOrder}`}>
              <button
                className={`${styles.option} ${
                  option.sortBy === currentOption.sortBy &&
                  option.sortOrder === currentOption.sortOrder
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={
                  option.sortBy === currentOption.sortBy &&
                  option.sortOrder === currentOption.sortOrder
                }
              >
                {option.label}
                {option.sortBy === currentOption.sortBy &&
                  option.sortOrder === currentOption.sortOrder && (
                    <svg viewBox="0 0 24 24" className={styles.checkIcon}>
                      <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
