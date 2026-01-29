/**
 * Script cập nhật compareAtPrice cho tất cả sản phẩm
 * Để hiển thị giá sale
 */
import mongoose from "mongoose";

async function updatePrices() {
  try {
    await mongoose.connect("mongodb://admin:123456@localhost:27017/fashion_store?authSource=admin");
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const products = db.collection("products");

    // Lấy tất cả products
    const allProducts = await products.find({}).toArray();
    console.log("Total products:", allProducts.length);

    let updated = 0;
    let alreadyHasSale = 0;

    // Cập nhật compareAtPrice cho các sản phẩm
    for (const product of allProducts) {
      if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
        // Thêm compareAtPrice cao hơn price 20-40%
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
