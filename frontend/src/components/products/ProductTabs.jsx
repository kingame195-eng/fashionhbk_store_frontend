import { useState } from "react";
import styles from "../../styles/components/ProductTabs.module.css";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: `Reviews (${product.reviewCount || 0})` },
    { id: "shipping", label: "Shipping & Returns" },
    { id: "sizeGuide", label: "Size Guide" },
  ];

  return (
    <div className={styles.tabs}>
      {/* Tab Headers */}
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className={styles.tabPanels}>
        {/* Description Panel */}
        <div
          id="panel-description"
          role="tabpanel"
          aria-labelledby="tab-description"
          className={`${styles.panel} ${activeTab === "description" ? styles.active : ""}`}
          hidden={activeTab !== "description"}
        >
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Product Details */}
          {product.details && (
            <div className={styles.details}>
              <h3>Product Details</h3>
              <ul>
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Materials */}
          {product.materials && (
            <div className={styles.materials}>
              <h3>Materials & Care</h3>
              <p>{product.materials}</p>
            </div>
          )}
        </div>

        {/* Reviews Panel */}
        <div
          id="panel-reviews"
          role="tabpanel"
          aria-labelledby="tab-reviews"
          className={`${styles.panel} ${activeTab === "reviews" ? styles.active : ""}`}
          hidden={activeTab !== "reviews"}
        >
          <ReviewsSection
            productId={product._id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Shipping Panel */}
        <div
          id="panel-shipping"
          role="tabpanel"
          aria-labelledby="tab-shipping"
          className={`${styles.panel} ${activeTab === "shipping" ? styles.active : ""}`}
          hidden={activeTab !== "shipping"}
        >
          <div className={styles.shippingInfo}>
            <div className={styles.infoBlock}>
              <h3>Shipping</h3>
              <ul>
                <li>Free standard shipping on orders over $100</li>
                <li>Standard shipping (5-7 business days): $7.99</li>
                <li>Express shipping (2-3 business days): $14.99</li>
                <li>Next day delivery (order before 2pm): $24.99</li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <h3>Returns</h3>
              <ul>
                <li>Free returns within 30 days of delivery</li>
                <li>Items must be unworn with original tags</li>
                <li>Refund processed within 5-7 business days</li>
                <li>Exchange available for different size/color</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Size Guide Panel */}
        <div
          id="panel-sizeGuide"
          role="tabpanel"
          aria-labelledby="tab-sizeGuide"
          className={`${styles.panel} ${activeTab === "sizeGuide" ? styles.active : ""}`}
          hidden={activeTab !== "sizeGuide"}
        >
          <SizeGuide category={product.category?.slug} />
        </div>
      </div>
    </div>
  );
}

// Reviews Section Sub-component
function ReviewsSection({ rating, reviewCount }) {
  // Placeholder reviews for demo
  const demoReviews = [
    {
      _id: "1",
      user: { name: "Sarah M." },
      rating: 5,
      title: "Perfect fit!",
      content:
        "Love this piece! The quality is amazing and it fits perfectly. Will definitely be ordering more.",
      createdAt: "2025-12-15",
      verified: true,
    },
    {
      _id: "2",
      user: { name: "John D." },
      rating: 4,
      title: "Great quality",
      content:
        "Very happy with my purchase. The material feels premium and the color is exactly as shown.",
      createdAt: "2025-12-10",
      verified: true,
    },
    {
      _id: "3",
      user: { name: "Emily R." },
      rating: 5,
      title: "Exceeded expectations",
      content: "This is now my favorite item in my closet. The attention to detail is impressive.",
      createdAt: "2025-12-05",
      verified: false,
    },
  ];

  const renderStars = (rating) => (
    <div className={styles.reviewStars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={star <= rating ? styles.filled : ""} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className={styles.reviewsSection}>
      {/* Rating Summary */}
      <div className={styles.ratingSummary}>
        <div className={styles.ratingBig}>
          <span className={styles.ratingNumber}>{rating?.toFixed(1) || "0.0"}</span>
          {renderStars(Math.round(rating || 0))}
          <span className={styles.totalReviews}>{reviewCount || 0} reviews</span>
        </div>

        <button className={styles.writeReviewBtn}>Write a Review</button>
      </div>

      {/* Reviews List */}
      <div className={styles.reviewsList}>
        {demoReviews.map((review) => (
          <div key={review._id} className={styles.review}>
            <div className={styles.reviewHeader}>
              {renderStars(review.rating)}
              {review.verified && (
                <span className={styles.verified}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Verified Purchase
                </span>
              )}
            </div>
            <h4 className={styles.reviewTitle}>{review.title}</h4>
            <p className={styles.reviewContent}>{review.content}</p>
            <div className={styles.reviewMeta}>
              <span>{review.user.name}</span>
              <span>•</span>
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Size Guide Sub-component
function SizeGuide({ category }) {
  const sizeChart = {
    tops: [
      { size: "XS", chest: "32-34", waist: "24-26", hips: "34-36" },
      { size: "S", chest: "34-36", waist: "26-28", hips: "36-38" },
      { size: "M", chest: "36-38", waist: "28-30", hips: "38-40" },
      { size: "L", chest: "38-40", waist: "30-32", hips: "40-42" },
      { size: "XL", chest: "40-42", waist: "32-34", hips: "42-44" },
    ],
    bottoms: [
      { size: "XS", waist: "24-26", hips: "34-36", inseam: "30" },
      { size: "S", waist: "26-28", hips: "36-38", inseam: "30" },
      { size: "M", waist: "28-30", hips: "38-40", inseam: "31" },
      { size: "L", waist: "30-32", hips: "40-42", inseam: "31" },
      { size: "XL", waist: "32-34", hips: "42-44", inseam: "32" },
    ],
  };

  const chart = sizeChart[category] || sizeChart.tops;
  const headers = Object.keys(chart[0]);

  return (
    <div className={styles.sizeGuide}>
      <p className={styles.sizeGuideIntro}>
        All measurements are in inches. For the best fit, measure yourself and compare to the size
        chart below.
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.sizeTable}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.map((row) => (
              <tr key={row.size}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.measureTips}>
        <h4>How to Measure</h4>
        <ul>
          <li>
            <strong>Chest:</strong> Measure around the fullest part of your chest
          </li>
          <li>
            <strong>Waist:</strong> Measure around your natural waistline
          </li>
          <li>
            <strong>Hips:</strong> Measure around the fullest part of your hips
          </li>
          <li>
            <strong>Inseam:</strong> Measure from crotch to hem
          </li>
        </ul>
      </div>
    </div>
  );
}
