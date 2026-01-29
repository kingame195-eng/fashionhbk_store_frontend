/**
 * Product Seeder Script
 * Run this script to add 10 sample products to MongoDB
 *
 * Usage: node scripts/seedProducts.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection string with authentication
// Credentials from docker inspect: admin / 123456
// NOTE: Database name is "fashion-store" (with hyphen, not underscore)
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://admin:123456@localhost:27017/fashion-store?authSource=admin";

// Product Schema (simplified for seeding)
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

// Sample fashion products data
const products = [
  {
    name: "Elegant Silk Blouse",
    slug: "elegant-silk-blouse",
    description:
      "A luxurious silk blouse featuring a relaxed fit and elegant drape. Perfect for both office wear and evening occasions. Made from 100% pure mulberry silk with mother-of-pearl buttons.",
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
      {
        url: "https://images.unsplash.com/photo-1564246544814-647abf5e0bf5?w=800",
        alt: "Elegant Silk Blouse Back",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "women",
    subcategory: "tops",
    tags: ["silk", "blouse", "elegant", "office wear", "formal"],
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.8, count: 124 },
    careInstructions: ["Dry clean only", "Iron on low heat", "Store on padded hanger"],
    features: ["100% Mulberry Silk", "Mother-of-pearl buttons", "Relaxed fit"],
  },
  {
    name: "Classic Wool Blazer",
    slug: "classic-wool-blazer",
    description:
      "A timeless wool blazer crafted from premium Italian wool. Features a single-breasted design with horn buttons and fully lined interior. Perfect for professional settings.",
    shortDescription: "Premium Italian wool blazer with classic design",
    brand: "Milano Couture",
    price: 299.99,
    compareAtPrice: 399.99,
    stock: 35,
    sku: "WOL-BLZ-002",
    sizes: [
      { name: "S", stock: 7 },
      { name: "M", stock: 12 },
      { name: "L", stock: 10 },
      { name: "XL", stock: 6 },
    ],
    colors: [
      { name: "Charcoal", hexCode: "#36454F", stock: 15 },
      { name: "Camel", hexCode: "#C19A6B", stock: 12 },
      { name: "Black", hexCode: "#000000", stock: 8 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        alt: "Classic Wool Blazer Front",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
        alt: "Classic Wool Blazer Styled",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "women",
    subcategory: "outerwear",
    tags: ["blazer", "wool", "professional", "italian", "classic"],
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.9, count: 89 },
    careInstructions: ["Dry clean only", "Store in garment bag", "Steam to remove wrinkles"],
    features: ["Italian wool blend", "Horn buttons", "Fully lined", "Two front pockets"],
  },
  {
    name: "Cashmere Turtleneck Sweater",
    slug: "cashmere-turtleneck-sweater",
    description:
      "Indulge in pure luxury with this 100% cashmere turtleneck sweater. Incredibly soft and warm, featuring a relaxed fit and ribbed cuffs and hem.",
    shortDescription: "Ultra-soft 100% cashmere turtleneck",
    brand: "Luxe Fashion",
    price: 249.99,
    compareAtPrice: null,
    stock: 40,
    sku: "CSH-TRT-003",
    sizes: [
      { name: "XS", stock: 6 },
      { name: "S", stock: 10 },
      { name: "M", stock: 12 },
      { name: "L", stock: 8 },
      { name: "XL", stock: 4 },
    ],
    colors: [
      { name: "Cream", hexCode: "#FFFDD0", stock: 15 },
      { name: "Heather Gray", hexCode: "#9AA297", stock: 15 },
      { name: "Burgundy", hexCode: "#800020", stock: 10 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
        alt: "Cashmere Turtleneck Front",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
        alt: "Cashmere Turtleneck Detail",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "women",
    subcategory: "sweaters",
    tags: ["cashmere", "sweater", "turtleneck", "luxury", "winter"],
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    ratings: { average: 4.7, count: 67 },
    careInstructions: ["Hand wash cold", "Lay flat to dry", "Store folded"],
    features: ["100% Mongolian Cashmere", "Ribbed cuffs and hem", "Relaxed fit"],
  },
  {
    name: "Slim Fit Chino Pants",
    slug: "slim-fit-chino-pants",
    description:
      "Versatile slim fit chinos crafted from premium stretch cotton. Features a comfortable mid-rise waist and tapered leg. Perfect for casual and smart-casual occasions.",
    shortDescription: "Premium stretch cotton slim fit chinos",
    brand: "Urban Style",
    price: 79.99,
    compareAtPrice: 99.99,
    stock: 80,
    sku: "CHN-PNT-004",
    sizes: [
      { name: "S", stock: 15 },
      { name: "M", stock: 25 },
      { name: "L", stock: 25 },
      { name: "XL", stock: 15 },
    ],
    colors: [
      { name: "Khaki", hexCode: "#C3B091", stock: 30 },
      { name: "Navy", hexCode: "#000080", stock: 25 },
      { name: "Olive", hexCode: "#808000", stock: 25 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
        alt: "Slim Fit Chinos Front",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
        alt: "Slim Fit Chinos Styled",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "men",
    subcategory: "pants",
    tags: ["chinos", "slim fit", "casual", "stretch", "cotton"],
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.5, count: 203 },
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron medium heat"],
    features: ["98% Cotton, 2% Elastane", "Mid-rise waist", "Tapered leg", "Side and back pockets"],
  },
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    description:
      "A sophisticated leather crossbody bag handcrafted from full-grain Italian leather. Features an adjustable strap, magnetic closure, and multiple interior compartments.",
    shortDescription: "Handcrafted Italian leather crossbody bag",
    brand: "Artisan Leather",
    price: 189.99,
    compareAtPrice: 249.99,
    stock: 25,
    sku: "LTH-BAG-005",
    sizes: [{ name: "One Size", stock: 25 }],
    colors: [
      { name: "Cognac", hexCode: "#9A463D", stock: 10 },
      { name: "Black", hexCode: "#000000", stock: 10 },
      { name: "Tan", hexCode: "#D2B48C", stock: 5 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
        alt: "Leather Crossbody Bag Front",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
        alt: "Leather Crossbody Bag Detail",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "accessories",
    subcategory: "bags",
    tags: ["leather", "crossbody", "italian", "handcrafted", "designer"],
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.9, count: 156 },
    careInstructions: [
      "Wipe with soft cloth",
      "Apply leather conditioner monthly",
      "Store in dust bag",
    ],
    features: [
      "Full-grain Italian leather",
      "Adjustable strap",
      "Magnetic closure",
      "Interior zip pocket",
    ],
  },
  {
    name: "Oxford Dress Shirt",
    slug: "oxford-dress-shirt",
    description:
      "A crisp Oxford dress shirt made from premium Egyptian cotton. Features a button-down collar, barrel cuffs, and a tailored fit. Essential for any gentleman's wardrobe.",
    shortDescription: "Premium Egyptian cotton Oxford shirt",
    brand: "Gentleman's Club",
    price: 89.99,
    compareAtPrice: null,
    stock: 60,
    sku: "OXF-SHT-006",
    sizes: [
      { name: "S", stock: 12 },
      { name: "M", stock: 18 },
      { name: "L", stock: 18 },
      { name: "XL", stock: 12 },
    ],
    colors: [
      { name: "White", hexCode: "#FFFFFF", stock: 25 },
      { name: "Light Blue", hexCode: "#ADD8E6", stock: 20 },
      { name: "Pink", hexCode: "#FFC0CB", stock: 15 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
        alt: "Oxford Dress Shirt Front",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
        alt: "Oxford Dress Shirt Detail",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "men",
    subcategory: "shirts",
    tags: ["oxford", "dress shirt", "cotton", "formal", "business"],
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    ratings: { average: 4.6, count: 178 },
    careInstructions: ["Machine wash warm", "Tumble dry medium", "Iron while damp"],
    features: ["100% Egyptian Cotton", "Button-down collar", "Barrel cuffs", "Tailored fit"],
  },
  {
    name: "Floral Midi Dress",
    slug: "floral-midi-dress",
    description:
      "A stunning floral midi dress featuring a flattering wrap silhouette and flowing skirt. Made from lightweight viscose fabric, perfect for spring and summer occasions.",
    shortDescription: "Beautiful floral wrap midi dress",
    brand: "Bloom Collection",
    price: 149.99,
    compareAtPrice: 199.99,
    stock: 45,
    sku: "FLR-DRS-007",
    sizes: [
      { name: "XS", stock: 8 },
      { name: "S", stock: 12 },
      { name: "M", stock: 13 },
      { name: "L", stock: 8 },
      { name: "XL", stock: 4 },
    ],
    colors: [
      { name: "Blue Floral", hexCode: "#6495ED", stock: 20 },
      { name: "Rose Floral", hexCode: "#FF007F", stock: 15 },
      { name: "Green Floral", hexCode: "#228B22", stock: 10 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
        alt: "Floral Midi Dress Front",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
        alt: "Floral Midi Dress Styled",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "women",
    subcategory: "dresses",
    tags: ["floral", "midi", "wrap dress", "summer", "elegant"],
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.8, count: 92 },
    careInstructions: ["Hand wash cold", "Line dry", "Iron low heat"],
    features: ["100% Viscose", "Wrap silhouette", "Side tie closure", "Midi length"],
  },
  {
    name: "Premium Leather Belt",
    slug: "premium-leather-belt",
    description:
      "A classic leather belt crafted from full-grain calfskin leather. Features a polished silver buckle and hand-stitched edges. A timeless accessory for any outfit.",
    shortDescription: "Full-grain calfskin leather belt",
    brand: "Artisan Leather",
    price: 69.99,
    compareAtPrice: null,
    stock: 55,
    sku: "LTH-BLT-008",
    sizes: [
      { name: "S", stock: 12 },
      { name: "M", stock: 18 },
      { name: "L", stock: 15 },
      { name: "XL", stock: 10 },
    ],
    colors: [
      { name: "Brown", hexCode: "#8B4513", stock: 25 },
      { name: "Black", hexCode: "#000000", stock: 20 },
      { name: "Tan", hexCode: "#D2B48C", stock: 10 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        alt: "Premium Leather Belt",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800",
        alt: "Leather Belt Detail",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "accessories",
    subcategory: "belts",
    tags: ["leather", "belt", "classic", "calfskin", "accessory"],
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    ratings: { average: 4.7, count: 134 },
    careInstructions: ["Wipe clean with damp cloth", "Apply leather conditioner", "Store flat"],
    features: [
      "Full-grain calfskin",
      "Polished silver buckle",
      "Hand-stitched edges",
      "35mm width",
    ],
  },
  {
    name: "Denim Jacket",
    slug: "classic-denim-jacket",
    description:
      "A classic denim jacket made from premium Japanese selvedge denim. Features a relaxed fit, chest pockets, and authentic copper rivets. Perfect for layering year-round.",
    shortDescription: "Premium Japanese selvedge denim jacket",
    brand: "Urban Style",
    price: 159.99,
    compareAtPrice: 199.99,
    stock: 30,
    sku: "DNM-JKT-009",
    sizes: [
      { name: "S", stock: 6 },
      { name: "M", stock: 10 },
      { name: "L", stock: 8 },
      { name: "XL", stock: 6 },
    ],
    colors: [
      { name: "Indigo", hexCode: "#4B0082", stock: 15 },
      { name: "Light Wash", hexCode: "#B0C4DE", stock: 10 },
      { name: "Black", hexCode: "#000000", stock: 5 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800",
        alt: "Denim Jacket Front",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800",
        alt: "Denim Jacket Back",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "men",
    subcategory: "outerwear",
    tags: ["denim", "jacket", "selvedge", "japanese", "casual"],
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    ratings: { average: 4.6, count: 87 },
    careInstructions: ["Machine wash cold", "Hang dry", "Do not bleach"],
    features: ["Japanese selvedge denim", "Copper rivets", "Chest pockets", "Relaxed fit"],
  },
  {
    name: "Suede Ankle Boots",
    slug: "suede-ankle-boots",
    description:
      "Elegant suede ankle boots featuring a block heel and side zip closure. Crafted from premium Italian suede with a cushioned insole for all-day comfort.",
    shortDescription: "Premium Italian suede ankle boots",
    brand: "Milano Couture",
    price: 219.99,
    compareAtPrice: 279.99,
    stock: 28,
    sku: "SDE-BOT-010",
    sizes: [
      { name: "S", stock: 6 },
      { name: "M", stock: 10 },
      { name: "L", stock: 8 },
      { name: "XL", stock: 4 },
    ],
    colors: [
      { name: "Taupe", hexCode: "#483C32", stock: 12 },
      { name: "Black", hexCode: "#000000", stock: 10 },
      { name: "Cognac", hexCode: "#9A463D", stock: 6 },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
        alt: "Suede Ankle Boots",
        isPrimary: true,
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800",
        alt: "Suede Boots Detail",
        isPrimary: false,
        order: 1,
      },
    ],
    category: "shoes",
    subcategory: "boots",
    tags: ["suede", "ankle boots", "italian", "heeled", "elegant"],
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: true,
    ratings: { average: 4.8, count: 64 },
    careInstructions: ["Use suede brush", "Apply waterproof spray", "Store with shoe trees"],
    features: ["Italian suede", 'Block heel (2.5")', "Side zip closure", "Cushioned insole"],
  },
];

async function seedProducts() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing products (optional - comment out if you want to keep existing)
    console.log("🗑️  Clearing existing products...");
    await Product.deleteMany({});
    console.log("✅ Cleared existing products");

    // Insert new products
    console.log("📦 Inserting 10 products...");
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully inserted ${insertedProducts.length} products!`);

    // Display inserted products
    console.log("\n📋 Inserted Products:");
    console.log("─".repeat(50));
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} (${product.category})`);
    });
    console.log("─".repeat(50));

    console.log("\n🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("👋 Database connection closed");
    process.exit(0);
  }
}

// Run the seeder
seedProducts();
