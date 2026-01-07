import styles from "../../styles/components/VariantSelector.module.css";

export default function VariantSelector({ variants = [], selectedOptions = {}, onOptionChange }) {
  // Group variants by option name (e.g., 'Color', 'Size')
  const optionGroups = variants.reduce((acc, variant) => {
    variant.options?.forEach((option) => {
      if (!acc[option.name]) {
        acc[option.name] = new Set();
      }
      acc[option.name].add(option.value);
    });
    return acc;
  }, {});

  // Convert Sets to Arrays
  const options = Object.entries(optionGroups).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));

  // Check if a specific option combination is available
  const isOptionAvailable = (optionName, optionValue) => {
    const testOptions = { ...selectedOptions, [optionName]: optionValue };

    return variants.some((variant) => {
      const matchesOptions = variants.options?.every(
        (opt) => testOptions[opt.name] === opt.value || !testOptions[opt.name]
      );
      return matchesOptions && variant.inventory > 0;
    });
  };

  // Get the current selected variant
  const getSelectedVariant = () => {
    return variants.find((variant) =>
      variant.options?.every((opt) => selectedOptions[opt.name] === opt.value)
    );
  };

  const selectedVariant = getSelectedVariant();

  return (
    <div className={styles.selector}>
      {options.map((option) => (
        <div key={option.name} className={styles.optionGroup}>
          <div className={styles.optionHeader}>
            <span className={styles.optionName}>{option.name}:</span>
            <span className={styles.optionValue}>{selectedOptions[option.name] || "Select"}</span>
          </div>

          <div className={styles.optionValues}>
            {option.name.toLowerCase() === "color" ? (
              // Color swatches
              <div className={styles.colorSwatches}>
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  const isAvailable = isOptionAvailable(option.name, value);

                  return (
                    <button
                      key={value}
                      className={`${styles.colorSwatch} ${isSelected ? styles.selected : ""} ${
                        !isAvailable ? styles.unavailable : ""
                      }`}
                      onClick={() => onOptionChange(option.name, value)}
                      disabled={!isAvailable}
                      title={value}
                      aria-label={`${value}${!isAvailable ? " (unavailable)" : ""}`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={styles.swatchColor}
                        style={{ backgroundColor: getColorCode(value) }}
                      />
                      {isSelected && (
                        <svg className={styles.checkIcon} viewBox="0 0 24 24">
                          <path
                            d="M20 6 9 17l-5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              // Size/other option buttons
              <div className={styles.optionButtons}>
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  const isAvailable = isOptionAvailable(option.name, value);

                  return (
                    <button
                      key={value}
                      className={`${styles.optionBtn} ${isSelected ? styles.selected : ""} ${
                        !isAvailable ? styles.unavailable : ""
                      }`}
                      onClick={() => onOptionChange(option.name, value)}
                      disabled={!isAvailable}
                      aria-pressed={isSelected}
                    >
                      {value}
                      {!isAvailable && <span className={styles.strikethrough} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Stock Status */}
      {selectedVariant && (
        <div className={styles.stockStatus}>
          {selectedVariant.inventory > 0 ? (
            selectedVariant.inventory <= 5 ? (
              <span className={styles.lowStock}>
                Only {selectedVariant.inventory} left in stock
              </span>
            ) : (
              <span className={styles.inStock}>In Stock</span>
            )
          ) : (
            <span className={styles.outOfStock}>Out of Stock</span>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to map color names to hex codes
function getColorCode(colorName) {
  const colorMap = {
    black: "#000000",
    white: "#FFFFFF",
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#22C55E",
    yellow: "#EAB308",
    pink: "#EC4899",
    purple: "#8B5CF6",
    orange: "#F97316",
    navy: "#1E3A5F",
    beige: "#D4C4B0",
    gray: "#6B7280",
    grey: "#6B7280",
    brown: "#92400E",
    cream: "#FFFDD0",
    gold: "#FFD700",
    silver: "#C0C0C0",
  };

  return colorMap[colorName.toLowerCase()] || colorName;
}
