/**
 * Seed Products to MongoDB Atlas
 *
 * Usage:
 *   node scripts/seedToAtlas.js
 *
 * This script will seed products directly to MongoDB Atlas
 */

import mongoose from "mongoose";

// ⚠️ MongoDB Atlas Connection String - TÊN DATABASE: fashion-store (có dấu gạch ngang)
const MONGODB_ATLAS_URI =
  "mongodb+srv://kingame195_db_user:1NW4DbvqgJhQDPb3@cluster0.itiojgh.mongodb.net/fashion-store?retryWrites=true&w=majority";

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    shortDescription: String,
    brand: String,
    price: Number,
    compareAtPrice: Number,
    stock: Number,
    sku: String,
    sizes: [
      {
        name: String,
        stock: Number,
      },
    ],
    colors: [
      {
        name: String,
        hexCode: String,
        stock: Number,
      },
    ],
    images: [
      {
        url: String,
        alt: String,
        isPrimary: Boolean,
        order: Number,
      },
    ],
    category: String,
    subcategory: String,
    tags: [String],
    isActive: Boolean,
    isFeatured: Boolean,
    isNewArrival: Boolean,
    isOnSale: Boolean,
    ratings: {
      average: Number,
      count: Number,
    },
    careInstructions: [String],
    features: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    isActive: { type: Boolean, default: true },
    phone: String,
    avatar: String,
    addresses: [
      {
        type: { type: String },
        fullName: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        isDefault: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Sample Products Data
const products = [
  {
    name: "Elegant Silk Blouse",
    slug: "elegant-silk-blouse",
    description:
      "A luxurious silk blouse featuring a relaxed fit and elegant drape. Perfect for both office wear and evening occasions.",
    shortDescription: "Luxurious silk blouse with elegant drape",
    brand: "Luxe Fashion",
    price: 129.99,
    compareAtPrice: 179.99,
    stock: 50,
    sku: "SLK-BLS-001",
    sizes: [
      { name: "XS", stock: 8 },
      { name: "S", stock: 12 },
      { name: "M", stock: 15 },
      { name: "L", stock: 10 },
      { name: "XL", stock: 5 },
    ],
    colors: [
      { name: "Ivory", hexCode: "#FFFFF0", stock: 20 },
      { name: "Blush Pink", hexCode: "#FFB6C1", stock: 15 },
      { name: "Navy", hexCode: "#000080", stock: 15 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800",
        alt: "Elegant Silk Blouse Front",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "women",
    subcategory: "tops",
    tags: ["silk", "blouse", "elegant", "office wear"],
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.5, count: 128 },
    careInstructions: ["Dry clean only", "Iron on low heat"],
    features: ["100% Mulberry Silk", "Mother-of-pearl buttons"],
  },
  {
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    description:
      "Timeless denim jacket with a modern fit. Features classic button closure and multiple pockets.",
    shortDescription: "Timeless denim jacket with modern fit",
    brand: "Urban Style",
    price: 89.99,
    compareAtPrice: 120.0,
    stock: 75,
    sku: "DNM-JKT-002",
    sizes: [
      { name: "S", stock: 15 },
      { name: "M", stock: 25 },
      { name: "L", stock: 20 },
      { name: "XL", stock: 15 },
    ],
    colors: [
      { name: "Light Blue", hexCode: "#ADD8E6", stock: 40 },
      { name: "Dark Blue", hexCode: "#00008B", stock: 35 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800",
        alt: "Classic Denim Jacket",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "women",
    subcategory: "jackets",
    tags: ["denim", "jacket", "casual", "classic"],
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.7, count: 256 },
    careInstructions: ["Machine wash cold", "Tumble dry low"],
    features: ["100% Cotton Denim", "Classic fit"],
  },
  {
    name: "Slim Fit Chino Pants",
    slug: "slim-fit-chino-pants",
    description: "Versatile slim fit chino pants perfect for casual and semi-formal occasions.",
    shortDescription: "Versatile slim fit chinos",
    brand: "Modern Basics",
    price: 59.99,
    compareAtPrice: 79.99,
    stock: 100,
    sku: "CHN-PNT-003",
    sizes: [
      { name: "28", stock: 15 },
      { name: "30", stock: 25 },
      { name: "32", stock: 30 },
      { name: "34", stock: 20 },
      { name: "36", stock: 10 },
    ],
    colors: [
      { name: "Khaki", hexCode: "#C3B091", stock: 35 },
      { name: "Navy", hexCode: "#000080", stock: 35 },
      { name: "Black", hexCode: "#000000", stock: 30 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
        alt: "Slim Fit Chino Pants",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "men",
    subcategory: "pants",
    tags: ["chinos", "pants", "slim fit", "casual"],
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.3, count: 89 },
    careInstructions: ["Machine wash warm", "Iron medium heat"],
    features: ["98% Cotton, 2% Elastane", "Slim fit"],
  },
  {
    name: "Floral Summer Dress",
    slug: "floral-summer-dress",
    description:
      "Beautiful floral print summer dress with flowing silhouette. Perfect for warm weather occasions.",
    shortDescription: "Beautiful floral summer dress",
    brand: "Bloom Collection",
    price: 79.99,
    compareAtPrice: 99.99,
    stock: 60,
    sku: "FLR-DRS-004",
    sizes: [
      { name: "XS", stock: 10 },
      { name: "S", stock: 15 },
      { name: "M", stock: 20 },
      { name: "L", stock: 10 },
      { name: "XL", stock: 5 },
    ],
    colors: [
      { name: "Blue Floral", hexCode: "#6495ED", stock: 30 },
      { name: "Pink Floral", hexCode: "#FFB6C1", stock: 30 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
        alt: "Floral Summer Dress",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "women",
    subcategory: "dresses",
    tags: ["dress", "floral", "summer", "casual"],
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.8, count: 175 },
    careInstructions: ["Hand wash cold", "Hang dry"],
    features: ["100% Rayon", "Flowing silhouette"],
  },
  {
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    description:
      "Essential premium cotton t-shirt with perfect fit. A wardrobe staple for everyday wear.",
    shortDescription: "Premium cotton essential tee",
    brand: "Essentials",
    price: 29.99,
    compareAtPrice: 39.99,
    stock: 200,
    sku: "CTN-TSH-005",
    sizes: [
      { name: "XS", stock: 30 },
      { name: "S", stock: 45 },
      { name: "M", stock: 50 },
      { name: "L", stock: 45 },
      { name: "XL", stock: 30 },
    ],
    colors: [
      { name: "White", hexCode: "#FFFFFF", stock: 70 },
      { name: "Black", hexCode: "#000000", stock: 70 },
      { name: "Grey", hexCode: "#808080", stock: 60 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        alt: "Premium Cotton T-Shirt",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "men",
    subcategory: "t-shirts",
    tags: ["t-shirt", "cotton", "basic", "essential"],
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.6, count: 432 },
    careInstructions: ["Machine wash cold", "Tumble dry low"],
    features: ["100% Organic Cotton", "Pre-shrunk"],
  },
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    description:
      "Elegant leather crossbody bag with adjustable strap. Perfect size for essentials.",
    shortDescription: "Elegant leather crossbody",
    brand: "Luxe Accessories",
    price: 149.99,
    compareAtPrice: 199.99,
    stock: 40,
    sku: "LTH-BAG-006",
    sizes: [{ name: "One Size", stock: 40 }],
    colors: [
      { name: "Tan", hexCode: "#D2B48C", stock: 15 },
      { name: "Black", hexCode: "#000000", stock: 15 },
      { name: "Burgundy", hexCode: "#800020", stock: 10 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
        alt: "Leather Crossbody Bag",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "accessories",
    subcategory: "bags",
    tags: ["bag", "leather", "crossbody", "accessories"],
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.9, count: 87 },
    careInstructions: ["Wipe with dry cloth", "Store in dust bag"],
    features: ["Genuine Leather", "Adjustable strap"],
  },
  {
    name: "Wool Blend Overcoat",
    slug: "wool-blend-overcoat",
    description:
      "Classic wool blend overcoat for cold weather. Timeless style meets modern comfort.",
    shortDescription: "Classic wool blend overcoat",
    brand: "Winter Collection",
    price: 249.99,
    compareAtPrice: 329.99,
    stock: 35,
    sku: "WOL-COT-007",
    sizes: [
      { name: "S", stock: 8 },
      { name: "M", stock: 12 },
      { name: "L", stock: 10 },
      { name: "XL", stock: 5 },
    ],
    colors: [
      { name: "Camel", hexCode: "#C19A6B", stock: 15 },
      { name: "Charcoal", hexCode: "#36454F", stock: 20 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
        alt: "Wool Blend Overcoat",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "men",
    subcategory: "coats",
    tags: ["coat", "wool", "winter", "overcoat"],
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.7, count: 64 },
    careInstructions: ["Dry clean only", "Store on hanger"],
    features: ["70% Wool, 30% Polyester", "Fully lined"],
  },
  {
    name: "Athletic Running Shoes",
    slug: "athletic-running-shoes",
    description:
      "High-performance running shoes with advanced cushioning technology. Built for comfort and speed.",
    shortDescription: "High-performance running shoes",
    brand: "Sport Pro",
    price: 119.99,
    compareAtPrice: 149.99,
    stock: 80,
    sku: "ATH-SHO-008",
    sizes: [
      { name: "7", stock: 10 },
      { name: "8", stock: 15 },
      { name: "9", stock: 20 },
      { name: "10", stock: 20 },
      { name: "11", stock: 10 },
      { name: "12", stock: 5 },
    ],
    colors: [
      { name: "Black/White", hexCode: "#000000", stock: 40 },
      { name: "Navy/Orange", hexCode: "#000080", stock: 40 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        alt: "Athletic Running Shoes",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "footwear",
    subcategory: "sneakers",
    tags: ["shoes", "running", "athletic", "sports"],
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.5, count: 312 },
    careInstructions: ["Wipe clean", "Air dry"],
    features: ["Breathable mesh upper", "Advanced cushioning"],
  },
  {
    name: "Cashmere Scarf",
    slug: "cashmere-scarf",
    description: "Luxurious 100% cashmere scarf. Incredibly soft and warm for cold weather.",
    shortDescription: "Luxurious cashmere scarf",
    brand: "Luxe Accessories",
    price: 89.99,
    compareAtPrice: 129.99,
    stock: 45,
    sku: "CSH-SCF-009",
    sizes: [{ name: "One Size", stock: 45 }],
    colors: [
      { name: "Grey", hexCode: "#808080", stock: 15 },
      { name: "Camel", hexCode: "#C19A6B", stock: 15 },
      { name: "Burgundy", hexCode: "#800020", stock: 15 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
        alt: "Cashmere Scarf",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "accessories",
    subcategory: "scarves",
    tags: ["scarf", "cashmere", "winter", "accessories"],
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.8, count: 156 },
    careInstructions: ["Dry clean recommended", "Store folded"],
    features: ["100% Cashmere", "Generous size"],
  },
  {
    name: "High-Waist Yoga Leggings",
    slug: "high-waist-yoga-leggings",
    description:
      "Premium high-waist yoga leggings with four-way stretch. Perfect for yoga, gym, or everyday wear.",
    shortDescription: "Premium high-waist leggings",
    brand: "Active Life",
    price: 69.99,
    compareAtPrice: 89.99,
    stock: 90,
    sku: "YGA-LEG-010",
    sizes: [
      { name: "XS", stock: 15 },
      { name: "S", stock: 25 },
      { name: "M", stock: 25 },
      { name: "L", stock: 15 },
      { name: "XL", stock: 10 },
    ],
    colors: [
      { name: "Black", hexCode: "#000000", stock: 40 },
      { name: "Navy", hexCode: "#000080", stock: 30 },
      { name: "Burgundy", hexCode: "#800020", stock: 20 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
        alt: "High-Waist Yoga Leggings",
        isPrimary: true,
        order: 0,
      },
    ],
    category: "women",
    subcategory: "activewear",
    tags: ["leggings", "yoga", "activewear", "gym"],
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.7, count: 289 },
    careInstructions: ["Machine wash cold", "Do not bleach"],
    features: ["Four-way stretch", "Moisture-wicking"],
  },
];

// Sample Users Data
const users = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "$2a$10$YourHashedPasswordHere", // You'll need to hash this properly
    role: "admin",
    isActive: true,
  },
  {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    password: "$2a$10$YourHashedPasswordHere",
    role: "user",
    isActive: true,
  },
];

// Main seed function
async function seedToAtlas() {
  console.log("🚀 Starting MongoDB Atlas Seeding...\n");

  try {
    // Connect to MongoDB Atlas
    console.log("📡 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_ATLAS_URI);
    console.log("✅ Connected to MongoDB Atlas successfully!\n");

    // Get database name from connection
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📁 Database name: ${dbName}\n`);

    // Seed Products
    console.log("📦 Seeding Products...");

    // Option 1: Clear existing and insert new (CAREFUL - this deletes existing data)
    // await Product.deleteMany({});
    // console.log("   🗑️  Cleared existing products");

    // Option 2: Upsert - update if exists, insert if not (SAFER)
    for (const product of products) {
      await Product.findOneAndUpdate({ slug: product.slug }, product, { upsert: true, new: true });
    }
    console.log(`   ✅ Seeded ${products.length} products\n`);

    // Display products
    const productCount = await Product.countDocuments();
    console.log(`📊 Total products in database: ${productCount}`);

    const productList = await Product.find().select("name price category").lean();
    console.log("\n📋 Products in Atlas:");
    console.log("─".repeat(60));
    productList.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name} - $${p.price} (${p.category})`);
    });
    console.log("─".repeat(60));

    console.log("\n🎉 Seeding completed successfully!");
    console.log("\n📝 Notes:");
    console.log("   - Products have been seeded to MongoDB Atlas");
    console.log("   - Users were NOT seeded (passwords need proper hashing)");
    console.log("   - Run the backend seedUsers.js with Atlas connection for users");
  } catch (error) {
    console.error("❌ Error:", error.message);

    if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.log("\n💡 Tip: Check your internet connection");
    }
    if (error.message.includes("authentication failed")) {
      console.log("\n💡 Tip: Check your username/password in connection string");
    }
    if (error.message.includes("IP")) {
      console.log("\n💡 Tip: Make sure your IP is whitelisted in MongoDB Atlas");
      console.log("   Go to: Atlas → Network Access → Add IP Address → Add Current IP");
    }
  } finally {
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
    process.exit(0);
  }
}

// Run
seedToAtlas();
