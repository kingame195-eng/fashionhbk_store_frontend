import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "👩‍💼",
      bio: "Fashion enthusiast with 15+ years of industry experience.",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image: "👨‍🎨",
      bio: "Award-winning designer passionate about sustainable fashion.",
    },
    {
      name: "Emma Williams",
      role: "Head of Operations",
      image: "👩‍💻",
      bio: "Supply chain expert ensuring quality and timely delivery.",
    },
    {
      name: "David Park",
      role: "Customer Experience Lead",
      image: "👨‍💼",
      bio: "Dedicated to creating exceptional shopping experiences.",
    },
  ];

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description: "We're committed to eco-friendly practices and sustainable sourcing.",
    },
    {
      icon: "✨",
      title: "Quality",
      description: "Every piece is crafted with attention to detail and premium materials.",
    },
    {
      icon: "🤝",
      title: "Inclusivity",
      description: "Fashion for everyone, celebrating diversity in all its forms.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Constantly evolving to bring you the latest trends and styles.",
    },
  ];

  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>About Fashion Store</h1>
          <p className={styles.heroSubtitle}>Redefining fashion, one style at a time</p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyContent}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.storyText}>
              Founded in 2020, Fashion Store began with a simple vision: to make high-quality,
              stylish clothing accessible to everyone. What started as a small online boutique has
              grown into a beloved destination for fashion enthusiasts worldwide.
            </p>
            <p className={styles.storyText}>
              We believe that fashion is more than just clothing—it's a form of self-expression. Our
              carefully curated collections blend timeless elegance with contemporary trends,
              ensuring you always find pieces that resonate with your personal style.
            </p>
            <p className={styles.storyText}>
              Today, we're proud to serve thousands of happy customers, and we remain committed to
              our founding principles: quality, sustainability, and exceptional customer service.
            </p>
          </div>
          <div className={styles.storyImage}>
            <div className={styles.imageWrapper}>
              <span className={styles.imagePlaceholder}>🏪</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <span className={styles.valueIcon}>{value.icon}</span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.teamSubtitle}>The passionate people behind Fashion Store</p>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImage}>
                  <span className={styles.teamEmoji}>{member.image}</span>
                </div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Countries</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>Customer Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Join Our Fashion Journey</h2>
          <p>Discover your style with our latest collections</p>
          <Link to="/products" className={styles.ctaButton}>
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
