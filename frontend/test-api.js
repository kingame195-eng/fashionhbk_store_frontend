/**
 * API Test Script
 * Test all API endpoints for the Fashion Store Frontend
 *
 * Usage: node test-api.js
 */

const API_BASE_URL = process.env.API_URL || "http://localhost:5000/api";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

// Test results storage
const results = {
  passed: [],
  failed: [],
  skipped: [],
};

/**
 * Make HTTP request
 */
async function makeRequest(method, endpoint, data = null, headers = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (data && (method === "POST" || method === "PATCH" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseData = await response.text();

  let json = null;
  try {
    json = JSON.parse(responseData);
  } catch {
    // Response is not JSON
  }

  return {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    data: json,
    raw: responseData,
  };
}

/**
 * Test a single endpoint
 */
async function testEndpoint(
  name,
  method,
  endpoint,
  {
    expectedStatus = [200, 201],
    data = null,
    headers = {},
    authRequired = false,
    description = "",
  } = {}
) {
  const statusArray = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];

  try {
    console.log(`${colors.cyan}Testing:${colors.reset} ${method} ${endpoint}`);
    if (description) {
      console.log(`  ${colors.dim}${description}${colors.reset}`);
    }

    const startTime = Date.now();
    const response = await makeRequest(method, endpoint, data, headers);
    const duration = Date.now() - startTime;

    // Check if auth is required and we got 401
    if (authRequired && response.status === 401) {
      results.skipped.push({ name, method, endpoint, reason: "Auth required" });
      console.log(`  ${colors.yellow}⏭ SKIPPED${colors.reset} - Auth required (${duration}ms)\n`);
      return { success: false, skipped: true };
    }

    // Check status
    if (statusArray.includes(response.status)) {
      results.passed.push({ name, method, endpoint, status: response.status, duration });
      console.log(
        `  ${colors.green}✓ PASSED${colors.reset} - Status: ${response.status} (${duration}ms)\n`
      );
      return { success: true, response };
    } else {
      results.failed.push({
        name,
        method,
        endpoint,
        expected: statusArray.join(" or "),
        actual: response.status,
        error: response.data?.message || response.statusText,
      });
      console.log(
        `  ${colors.red}✗ FAILED${colors.reset} - Expected: ${statusArray.join(" or ")}, Got: ${response.status}`
      );
      console.log(
        `  ${colors.dim}Error: ${response.data?.message || response.statusText}${colors.reset}\n`
      );
      return { success: false, response };
    }
  } catch (error) {
    results.failed.push({
      name,
      method,
      endpoint,
      error: error.message,
    });
    console.log(`  ${colors.red}✗ ERROR${colors.reset} - ${error.message}\n`);
    return { success: false, error };
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log(
    `\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`
  );
  console.log(`${colors.cyan}  Fashion Store API Test Suite${colors.reset}`);
  console.log(`${colors.cyan}  API Base URL: ${API_BASE_URL}${colors.reset}`);
  console.log(
    `${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`
  );

  // ============ PRODUCTS API ============
  console.log(`\n${colors.yellow}─────── PRODUCTS API ───────${colors.reset}\n`);

  await testEndpoint("Get All Products", "GET", "/products", {
    description: "Fetch all products with default pagination",
  });

  await testEndpoint("Get Products with Filters", "GET", "/products?category=men&page=1&limit=10", {
    description: "Fetch products with category filter and pagination",
  });

  await testEndpoint("Search Products", "GET", "/products?search=shirt", {
    description: "Search products by keyword",
  });

  await testEndpoint("Get Categories", "GET", "/products/categories", {
    description: "Get all product categories",
  });

  await testEndpoint("Get Brands", "GET", "/products/brands", {
    description: "Get all product brands",
  });

  await testEndpoint("Get Featured Products", "GET", "/products?featured=true&limit=8", {
    description: "Fetch featured products",
  });

  await testEndpoint("Get Product by Invalid Slug", "GET", "/products/invalid-product-slug-12345", {
    expectedStatus: [404, 400],
    description: "Should return 404 for non-existent product",
  });

  // ============ AUTH API ============
  console.log(`\n${colors.yellow}─────── AUTH API ───────${colors.reset}\n`);

  await testEndpoint("Get Current User (No Auth)", "GET", "/auth/me", {
    expectedStatus: [401],
    description: "Should return 401 when not authenticated",
  });

  await testEndpoint("Login with Invalid Credentials", "POST", "/auth/login", {
    data: { email: "invalid@example.com", password: "wrongpassword" },
    expectedStatus: [401, 400],
    description: "Should reject invalid credentials",
  });

  await testEndpoint("Login with Missing Fields", "POST", "/auth/login", {
    data: { email: "" },
    expectedStatus: [400],
    description: "Should return 400 for missing required fields",
  });

  await testEndpoint("Register with Invalid Data", "POST", "/auth/register", {
    data: { email: "invalid-email" },
    expectedStatus: [400],
    description: "Should return 400 for invalid registration data",
  });

  await testEndpoint("Forgot Password Invalid Email", "POST", "/auth/forgot-password", {
    data: { email: "nonexistent@example.com" },
    expectedStatus: [200, 400, 404],
    description: "Forgot password with non-existent email",
  });

  await testEndpoint("Refresh Token (No Session)", "POST", "/auth/refresh", {
    expectedStatus: [401],
    description: "Should return 401 when no valid session exists",
  });

  // ============ CART API ============
  console.log(`\n${colors.yellow}─────── CART API ───────${colors.reset}\n`);

  await testEndpoint("Get Cart (Guest)", "GET", "/cart", {
    expectedStatus: [200, 401, 404],
    description: "Get cart for guest user",
  });

  await testEndpoint("Add Invalid Item to Cart", "POST", "/cart/items", {
    data: { productId: "invalid-product-id", quantity: 1 },
    expectedStatus: [400, 401, 404],
    description: "Should reject invalid product ID",
  });

  await testEndpoint("Apply Invalid Coupon", "POST", "/cart/coupon", {
    data: { code: "INVALID_COUPON_CODE_12345" },
    expectedStatus: [400, 401, 404],
    description: "Should reject invalid coupon code",
  });

  await testEndpoint("Validate Cart", "POST", "/cart/validate", {
    expectedStatus: [200, 401, 404],
    description: "Validate current cart",
  });

  // ============ CHECKOUT API ============
  console.log(`\n${colors.yellow}─────── CHECKOUT API ───────${colors.reset}\n`);

  await testEndpoint("Initialize Checkout", "POST", "/checkout/initialize", {
    expectedStatus: [200, 400, 401],
    description: "Initialize checkout session",
  });

  await testEndpoint("Get Shipping Rates", "POST", "/checkout/shipping-rates", {
    data: {
      shippingAddress: {
        city: "Hanoi",
        district: "Cau Giay",
        country: "Vietnam",
      },
      subtotal: 100000,
    },
    expectedStatus: [200, 400, 401],
    description: "Calculate shipping rates",
  });

  await testEndpoint("Calculate Tax", "POST", "/checkout/calculate-tax", {
    data: { subtotal: 100000 },
    expectedStatus: [200, 400, 401],
    description: "Calculate tax for order",
  });

  await testEndpoint("Validate Coupon", "POST", "/checkout/validate-coupon", {
    data: { code: "TEST_COUPON", subtotal: 100000 },
    expectedStatus: [200, 400, 401, 404],
    description: "Validate coupon code",
  });

  // ============ ORDERS API ============
  console.log(`\n${colors.yellow}─────── ORDERS API ───────${colors.reset}\n`);

  await testEndpoint("Get Orders (No Auth)", "GET", "/orders", {
    expectedStatus: [401],
    authRequired: true,
    description: "Should require authentication",
  });

  await testEndpoint("Track Order Invalid", "GET", "/orders/track/INVALID-ORDER-12345", {
    expectedStatus: [400, 404],
    description: "Should return 404 for invalid order number",
  });

  // ============ PROFILE API ============
  console.log(`\n${colors.yellow}─────── PROFILE API ───────${colors.reset}\n`);

  await testEndpoint("Get Profile (No Auth)", "GET", "/profile", {
    expectedStatus: [401],
    authRequired: true,
    description: "Should require authentication",
  });

  await testEndpoint("Get Addresses (No Auth)", "GET", "/profile/addresses", {
    expectedStatus: [401],
    authRequired: true,
    description: "Should require authentication",
  });

  // ============ WISHLIST API ============
  console.log(`\n${colors.yellow}─────── WISHLIST API ───────${colors.reset}\n`);

  await testEndpoint("Get Wishlist (No Auth)", "GET", "/wishlist", {
    expectedStatus: [401],
    authRequired: true,
    description: "Should require authentication",
  });

  await testEndpoint("Add to Wishlist (No Auth)", "POST", "/wishlist/invalid-product-id", {
    expectedStatus: [401],
    authRequired: true,
    description: "Should require authentication",
  });

  // ============ PRINT SUMMARY ============
  printSummary();
}

/**
 * Print test summary
 */
function printSummary() {
  console.log(
    `\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`
  );
  console.log(`${colors.cyan}  TEST SUMMARY${colors.reset}`);
  console.log(
    `${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`
  );

  const total = results.passed.length + results.failed.length + results.skipped.length;

  console.log(`  Total Tests: ${total}`);
  console.log(`  ${colors.green}Passed: ${results.passed.length}${colors.reset}`);
  console.log(`  ${colors.red}Failed: ${results.failed.length}${colors.reset}`);
  console.log(`  ${colors.yellow}Skipped: ${results.skipped.length}${colors.reset}`);

  if (results.failed.length > 0) {
    console.log(`\n${colors.red}─────── FAILED TESTS ───────${colors.reset}\n`);
    results.failed.forEach((test) => {
      console.log(`  ${colors.red}✗${colors.reset} ${test.name}`);
      console.log(`    ${colors.dim}${test.method} ${test.endpoint}${colors.reset}`);
      if (test.expected) {
        console.log(`    Expected: ${test.expected}, Got: ${test.actual}`);
      }
      console.log(`    Error: ${test.error || "Unknown error"}`);
      console.log();
    });
  }

  if (results.skipped.length > 0) {
    console.log(`\n${colors.yellow}─────── SKIPPED TESTS ───────${colors.reset}\n`);
    results.skipped.forEach((test) => {
      console.log(`  ${colors.yellow}⏭${colors.reset} ${test.name} - ${test.reason}`);
    });
  }

  console.log(
    `\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`
  );

  // Exit with error code if any tests failed
  if (results.failed.length > 0) {
    console.log(`${colors.red}Some tests failed. Please check the errors above.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}All tests passed successfully!${colors.reset}\n`);
    process.exit(0);
  }
}

// Run tests
runTests().catch((error) => {
  console.error(`${colors.red}Fatal error running tests:${colors.reset}`, error);
  process.exit(1);
});
