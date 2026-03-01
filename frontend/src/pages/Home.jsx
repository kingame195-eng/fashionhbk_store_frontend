import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services";
import ProductCard from "../components/products/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import styles from "./Home.module.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Featured collection categories (fallback if no products)
  const collections = [
    {
      id: 1,
      name: "Summer Collection",
      description: "Fresh and vibrant styles for the season",
      category: "Women",
      image: "🌸",
    },
    {
      id: 2,
      name: "Classic Essentials",
      description: "Timeless pieces for every wardrobe",
      category: "Men",
      image: "🎩",
    },
    {
      id: 3,
      name: "Luxury Accessories",
      description: "Statement pieces to elevate your look",
      category: "Accessories",
      image: "✨",
    },
    {
      id: 4,
      name: "Seasonal Trends",
      description: "Stay ahead with our latest arrivals",
      category: "All",
      image: "👗",
    },
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch featured/popular products
        // productService.getProducts returns response.data.data directly (not the full response)
        const [featuredResponse, newArrivalsResponse] = await Promise.all([
          productService.getProducts({
            limit: 4,
            sortBy: "sold",
            sortOrder: "desc",
          }),
          productService.getProducts({
            limit: 4,
            sortBy: "createdAt",
            sortOrder: "desc",
          }),
        ]);

        // Only update state if component is still mounted
        if (isMounted) {
          // Service returns { products: [], pagination: {} } directly
          setFeaturedProducts(featuredResponse?.products || []);
          setNewArrivals(newArrivalsResponse?.products || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch products:", err);
          setError("Failed to load products");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.home}>
      {/* Hero Banner Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Your <span>Style</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Curated fashion pieces crafted for the modern lifestyle. Elevate your wardrobe with
            timeless elegance.
          </p>
          <Link to="/products" className={styles.ctaButton}>
            Explore Collection
          </Link>
        </div>
        <div className={styles.heroAccent}></div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className={styles.products}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Best Sellers</h2>
            <p className={styles.sectionSubtitle}>Our most popular items loved by customers</p>

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <LoadingSpinner size="large" />
              </div>
            ) : error ? (
              <div className={styles.errorMessage}>{error}</div>
            ) : (
              <div className={styles.productGrid}>
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            <div className={styles.viewAllContainer}>
              <Link to="/products?sortBy=sold&sortOrder=desc" className={styles.viewAllLink}>
                View All Best Sellers →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className={styles.products}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>New Arrivals</h2>
            <p className={styles.sectionSubtitle}>Fresh additions to our collection</p>

            <div className={styles.productGrid}>
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className={styles.viewAllContainer}>
              <Link to="/products?sortBy=createdAt&sortOrder=desc" className={styles.viewAllLink}>
                View All New Arrivals →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Collections Section */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Collections</h2>
          <p className={styles.sectionSubtitle}>Explore our curated selection of premium items</p>

          <div className={styles.grid}>
            {collections.map((collection) => (
              <div key={collection.id} className={styles.card}>
                <div className={styles.cardImage}>{collection.image}</div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{collection.category}</span>
                  <h3 className={styles.cardTitle}>{collection.name}</h3>
                  <p className={styles.cardDescription}>{collection.description}</p>
                  <Link
                    to={`/products?category=${collection.category.toLowerCase()}`}
                    className={styles.cardLink}
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Elevate Your Wardrobe</h2>
          <p>
            Explore our complete collection of premium fashion pieces designed to express your
            unique style.
          </p>
          <Link to="/products" className={styles.secondaryCta}>
            Shop All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
