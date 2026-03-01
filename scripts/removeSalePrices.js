/**
 * Script to remove sale prices from all products EXCEPT specified ones
 * - Removes compareAtPrice and sets isOnSale: false for most products
 * - Keeps only the specified products on sale
 */
import mongoose from "mongoose";

const KEEP_ON_SALE = ["Elegant Silk Blouse", "Denim Jacket"];

async function removeSales() {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb://admin:123456@localhost:27017/fashion-store?authSource=admin";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const products = db.collection("products");

    // 1. Remove sale from all products EXCEPT the ones we want to keep
    const removeResult = await products.updateMany(
      { name: { $nin: KEEP_ON_SALE } },
      {
        $set: { isOnSale: false },
        $unset: { compareAtPrice: "" },
      }
    );
    console.log(`\n❌ Removed sale from ${removeResult.modifiedCount} products`);

    // 2. Ensure the kept products have isOnSale: true
    const keepResult = await products.updateMany(
      { name: { $in: KEEP_ON_SALE } },
      { $set: { isOnSale: true } }
    );
    console.log(`✅ Kept sale on ${keepResult.modifiedCount} products: ${KEEP_ON_SALE.join(", ")}`);

    // 3. Verify
    const allProducts = await products
      .find({}, { projection: { name: 1, price: 1, compareAtPrice: 1, isOnSale: 1 } })
      .toArray();

    console.log("\n========== RESULT ==========");
    for (const p of allProducts) {
      const saleTag = p.isOnSale ? "🔥 SALE" : "   ---";
      const compare = p.compareAtPrice ? `(was $${p.compareAtPrice})` : "";
      console.log(`${saleTag}  $${p.price} ${compare}  ${p.name}`);
    }

    const saleCount = allProducts.filter((p) => p.isOnSale).length;
    console.log(`\nTotal: ${allProducts.length} products, ${saleCount} on sale`);
    console.log("============================");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

removeSales();
