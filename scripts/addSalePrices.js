/**
 * Script to update compareAtPrice and isOnSale for all products
 * - Products without compareAtPrice: adds compareAtPrice (20-40% higher) + isOnSale: true
 * - Products with compareAtPrice > price but isOnSale !== true: sets isOnSale: true
 * This ensures the "On Sale Only" filter matches all products showing sale prices
 */
import mongoose from "mongoose";

async function updatePrices() {
  try {
    // NOTE: Database name is "fashion-store" (with hyphen, not underscore)
    // Set MONGODB_URI environment variable or update this connection string
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/fashion-store";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const products = db.collection("products");

    // Get all products
    const allProducts = await products.find({}).toArray();
    console.log("Total products:", allProducts.length);

    let addedSale = 0;
    let fixedOnSale = 0;
    let alreadyCorrect = 0;

    for (const product of allProducts) {
      if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
        // Case 1: No compareAtPrice or invalid → add sale price + mark isOnSale
        const discountPercent = 0.2 + Math.random() * 0.2; // 20-40%
        const compareAtPrice = Math.round((product.price / (1 - discountPercent)) * 100) / 100;

        await products.updateOne(
          { _id: product._id },
          {
            $set: {
              compareAtPrice: compareAtPrice,
              isOnSale: true,
            },
          }
        );
        console.log("✅ Added sale:", product.name);
        console.log("   Price: $" + product.price + " -> CompareAt: $" + compareAtPrice);
        console.log("   Discount: " + Math.round(discountPercent * 100) + "%");
        addedSale++;
      } else if (product.compareAtPrice > product.price && product.isOnSale !== true) {
        // Case 2: Has compareAtPrice but isOnSale is false/missing → fix isOnSale
        // BUG FIX: These products show sale prices in UI but were excluded from "On Sale Only" filter
        await products.updateOne(
          { _id: product._id },
          {
            $set: { isOnSale: true },
          }
        );
        console.log("🔧 Fixed isOnSale:", product.name);
        console.log(
          "   Price: $" + product.price,
          "CompareAt: $" + product.compareAtPrice,
          "(was isOnSale=" + product.isOnSale + ")"
        );
        fixedOnSale++;
      } else {
        console.log(
          "✓ Already correct:",
          product.name,
          "- Price: $" + product.price,
          "CompareAt: $" + product.compareAtPrice,
          "isOnSale: true"
        );
        alreadyCorrect++;
      }
    }

    console.log("\n========================================");
    console.log("DONE!");
    console.log("Added sale price:", addedSale, "products");
    console.log("Fixed isOnSale flag:", fixedOnSale, "products");
    console.log("Already correct:", alreadyCorrect, "products");
    console.log("Total:", allProducts.length, "products");
    console.log("========================================");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

updatePrices();
