import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const featuredProducts = [
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

  return (
    <div className={styles.home}>
      {/* Hero Banner Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Fashion Store</h1>
          <p className={styles.heroSubtitle}>
            Discover the latest trends in fashion. Quality clothing and accessories for the modern
            lifestyle.
          </p>
          <Link to="/products" className={styles.ctaButton}>
            Shop Now
          </Link>
        </div>
        <div className={styles.heroAccent}></div>
      </section>

      {/* Featured Collections Section */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Collections</h2>
          <p className={styles.sectionSubtitle}>Explore our curated selection of premium items</p>

          <div className={styles.grid}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.cardImage}>{product.image}</div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{product.category}</span>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <p className={styles.cardDescription}>{product.description}</p>
                  <Link
                    to={`/products?category=${product.category.toLowerCase()}`}
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
          <h2>Elevate Your Style</h2>
          <p>
            Browse our complete collection and find pieces that perfectly express your personal
            style.
          </p>
          <Link to="/products" className={styles.secondaryCta}>
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
