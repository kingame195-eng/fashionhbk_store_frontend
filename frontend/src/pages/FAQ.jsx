import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openQuestions, setOpenQuestions] = useState(new Set());

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "orders", name: "Orders" },
    { id: "shipping", name: "Shipping" },
    { id: "returns", name: "Returns" },
    { id: "payment", name: "Payment" },
    { id: "account", name: "Account" },
    { id: "products", name: "Products" },
  ];

  const faqs = [
    // Orders
    {
      id: 1,
      category: "orders",
      question: "How do I place an order?",
      answer:
        "Simply browse our collection, add items to your cart, and proceed to checkout. You'll need to provide your shipping information and payment details to complete your order. You'll receive a confirmation email once your order is placed.",
    },
    {
      id: 2,
      category: "orders",
      question: "Can I modify or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After that, orders enter our processing queue and cannot be changed. Please contact our customer support team immediately if you need assistance.",
    },
    {
      id: 3,
      category: "orders",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive an email with a tracking number. You can also log into your account and view your order status under 'My Orders'. Click on any order to see detailed tracking information.",
    },
    // Shipping
    {
      id: 4,
      category: "shipping",
      question: "What shipping options do you offer?",
      answer:
        "We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Next-Day Delivery in select areas. Shipping costs vary based on your location and the option selected.",
    },
    {
      id: 5,
      category: "shipping",
      question: "Do you ship internationally?",
      answer:
        "Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Import duties and taxes may apply and are the responsibility of the customer.",
    },
    {
      id: 6,
      category: "shipping",
      question: "Is free shipping available?",
      answer:
        "We offer free standard shipping on orders over $100 within the continental US. Use code FREESHIP at checkout for free shipping on orders over $50.",
    },
    // Returns
    {
      id: 7,
      category: "returns",
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of delivery for unworn items with original tags attached. Items must be in their original condition. Final sale items cannot be returned.",
    },
    {
      id: 8,
      category: "returns",
      question: "How do I start a return?",
      answer:
        "Log into your account, go to 'My Orders', and click 'Request Return' on the item you wish to return. You'll receive a prepaid shipping label via email. Pack the item securely and drop it off at any authorized shipping location.",
    },
    {
      id: 9,
      category: "returns",
      question: "When will I receive my refund?",
      answer:
        "Once we receive and inspect your return, we'll process your refund within 3-5 business days. Refunds are issued to your original payment method and may take additional time to appear depending on your bank.",
    },
    {
      id: 10,
      category: "returns",
      question: "Can I exchange an item?",
      answer:
        "We don't offer direct exchanges. Please return the original item for a refund and place a new order for the item you want. This ensures you get the correct item quickly.",
    },
    // Payment
    {
      id: 11,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are encrypted and secure.",
    },
    {
      id: 12,
      category: "payment",
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use industry-standard SSL encryption to protect your data. We never store your full credit card information on our servers. All payments are processed through PCI-compliant payment processors.",
    },
    {
      id: 13,
      category: "payment",
      question: "Do you offer payment plans?",
      answer:
        "Yes! We partner with Klarna and Afterpay to offer buy-now-pay-later options. You can split your purchase into 4 interest-free payments at checkout.",
    },
    // Account
    {
      id: 14,
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click 'Sign Up' in the top right corner of any page. Enter your email address, create a password, and provide your basic information. You'll receive a confirmation email to verify your account.",
    },
    {
      id: 15,
      category: "account",
      question: "I forgot my password. What do I do?",
      answer:
        "Click 'Login' and then 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. The link expires after 24 hours for security purposes.",
    },
    {
      id: 16,
      category: "account",
      question: "How do I update my account information?",
      answer:
        "Log into your account and click on 'Profile' or 'Account Settings'. From there, you can update your personal information, shipping addresses, payment methods, and communication preferences.",
    },
    // Products
    {
      id: 17,
      category: "products",
      question: "How do I find my size?",
      answer:
        "Each product page includes a size guide specific to that item. Click 'Size Guide' near the size options to view detailed measurements. When in doubt, we recommend sizing up for a more comfortable fit.",
    },
    {
      id: 18,
      category: "products",
      question: "Are your products sustainable?",
      answer:
        "Sustainability is important to us. We use eco-friendly materials where possible, partner with ethical manufacturers, and are working to reduce our carbon footprint. Look for our 'Eco-Friendly' tag on sustainable items.",
    },
    {
      id: 19,
      category: "products",
      question: "How should I care for my items?",
      answer:
        "Care instructions are included on the label of each item and are listed on the product page. Generally, we recommend washing in cold water, laying flat to dry, and avoiding bleach to extend the life of your garments.",
    },
    {
      id: 20,
      category: "products",
      question: "Will items come back in stock?",
      answer:
        "Popular items often get restocked. Sign up for 'Back in Stock' notifications on the product page to be alerted when an item becomes available again. You can also contact customer service for estimated restock dates.",
    },
  ];

  const filteredFaqs =
    activeCategory === "all" ? faqs : faqs.filter((faq) => faq.category === activeCategory);

  const toggleQuestion = (id) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.faq}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroSubtitle}>
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.main}>
        <div className={styles.container}>
          {/* Category Filter */}
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${
                  activeCategory === category.id ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className={styles.faqList}>
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className={`${styles.faqItem} ${openQuestions.has(faq.id) ? styles.open : ""}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleQuestion(faq.id)}
                  aria-expanded={openQuestions.has(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqIcon}>{openQuestions.has(faq.id) ? "−" : "+"}</span>
                </button>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFaqs.length === 0 && (
            <div className={styles.noResults}>
              <p>No questions found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? Our team is here to help.</p>
          <Link to="/contact" className={styles.ctaButton}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
