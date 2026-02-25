/**
 * Script to update compareAtPrice for all products
 * To display sale prices
 */
import mongoose from "mongoose";

async function updatePrices() {
  try {
    // NOTE: Database name is "fashion-store" (with hyphen, not underscore)
    await mongoose.connect("mongodb://admin:123456@localhost:27017/fashion-store?authSource=admin");
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const products = db.collection("products");

    // Get all products
    const allProducts = await products.find({}).toArray();
    console.log("Total products:", allProducts.length);

    let updated = 0;
    let alreadyHasSale = 0;

    // Update compareAtPrice for products
    for (const product of allProducts) {
      if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
        // Add compareAtPrice 20-40% higher than price
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
        console.log("✅ Updated:", product.name);
        console.log("   Price: $" + product.price + " -> CompareAt: $" + compareAtPrice);
        console.log("   Discount: " + Math.round(discountPercent * 100) + "%");
        updated++;
      } else {
        console.log(
          "✓ Already has sale:",
          product.name,
          "- Price: $" + product.price,
          "CompareAt: $" + product.compareAtPrice
        );
        alreadyHasSale++;
      }
    }

    console.log("\n========================================");
    console.log("DONE!");
    console.log("Updated:", updated, "products");
    console.log("Already had sale:", alreadyHasSale, "products");
    console.log("Total:", allProducts.length, "products");
    console.log("========================================");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

updatePrices();
