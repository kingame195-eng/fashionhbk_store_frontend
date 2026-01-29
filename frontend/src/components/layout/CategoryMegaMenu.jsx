/**
 * CategoryMegaMenu Component
 * Hiển thị dropdown mega menu với sản phẩm của từng category
 * Bao gồm giá gốc và giá đã sale
 */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services";
import styles from "../../styles/components/CategoryMegaMenu.module.css";

export default function CategoryMegaMenu({ category, isOpen, onClose }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products khi menu mở
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getProducts({
          category: category,
          limit: 4,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        setProducts(data?.products || []);
      } catch (error) {
        console.error("Failed to fetch category products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && category) {
      fetchCategoryProducts();
    }
  }, [isOpen, category]);

  // Lấy URL hình ảnh sản phẩm
  const getImageUrl = (product) => {
    if (product.images?.[0]?.url) return product.images[0].url;
    if (product.thumbnail) return product.thumbnail;
    if (product.image) return product.image;
    return "/images/placeholder-product.jpg";
  };

  // Tính phần trăm giảm giá
  const getDiscountPercent = (price, compareAtPrice) => {
    if (!compareAtPrice || compareAtPrice <= price) return 0;
    return Math.round((1 - price / compareAtPrice) * 100);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.megaMenu} onMouseLeave={onClose}>
      <div className={styles.menuContent}>
        {/* Header */}
        <div className={styles.menuHeader}>
          <h3 className={styles.menuTitle}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          <Link
            to={`/products?category=${category}`}
            className={styles.viewAllLink}
            onClick={onClose}
          >
            View All →
          </Link>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {isLoading ? (
            // Loading skeleton
            [...Array(4)].map((_, i) => (
              <div key={i} className={styles.productSkeleton}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonPrice} />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => {
              const discount = getDiscountPercent(product.price, product.compareAtPrice);

              return (
                <Link
                  key={product._id}
                  to={`/products/${product.slug}`}
                  className={styles.productCard}
                  onClick={onClose}
                >
                  {/* Product Image */}
                  <div className={styles.imageWrapper}>
                    <img
                      src={getImageUrl(product)}
                      alt={product.name}
                      className={styles.productImage}
                      loading="lazy"
                    />
                    {/* Sale Badge */}
                    {discount > 0 && <span className={styles.saleBadge}>-{discount}%</span>}
                  </div>

                  {/* Product Info */}
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>{product.name}</h4>

                    {/* 
                      PHẦN HIỂN THỊ GIÁ - CÓ GIÁ GỐC VÀ GIÁ SALE
                      - Nếu có compareAtPrice (giá gốc) > price (giá hiện tại) → Hiển thị cả 2 giá
                      - Giá sale (price) màu đỏ, nổi bật
                      - Giá gốc (compareAtPrice) gạch ngang, màu xám
                    */}
                    <div className={styles.priceWrapper}>
                      {product.compareAtPrice && product.compareAtPrice > product.price ? (
                        <>
                          {/* Giá đã giảm - Nổi bật màu đỏ */}
                          <span className={styles.salePrice}>${product.price.toFixed(2)}</span>
                          {/* Giá gốc - Gạch ngang */}
                          <span className={styles.originalPrice}>
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        /* Giá bình thường (không có sale) */
                        <span className={styles.regularPrice}>${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className={styles.emptyMessage}>No products found in this category</div>
          )}
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <Link to={`/products?category=${category}&onSale=true`} onClick={onClose}>
            🔥 On Sale
          </Link>
          <Link
            to={`/products?category=${category}&sortBy=createdAt&sortOrder=desc`}
            onClick={onClose}
          >
            ✨ New Arrivals
          </Link>
          <Link to={`/products?category=${category}&featured=true`} onClick={onClose}>
            ⭐ Best Sellers
          </Link>
        </div>
      </div>
    </div>
  );
}
