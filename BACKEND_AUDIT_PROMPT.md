# PROMPT KIỂM TRA TOÀN BỘ BACKEND - Fashion Store

## Thông tin dự án

**Backend**: Node.js + Express 5 + MongoDB (Mongoose 9) + ESM modules
**Server**: VPS tại `103.82.24.135`, đường dẫn `/var/www/fashion-website-backend/`
**MongoDB Atlas**: `mongodb+srv://kingame195_db_user:1NW4DbvqgJhQDPb3@cluster0.itiojgh.mongodb.net/fashionhbk`
**Domain**: `fashionhbk.shop` (nginx reverse proxy → port 5000)
**SSH**: `root` / `1CAgUAuZhN8D0C7g`

### Cấu trúc backend:

```
src/
├── server.js
├── config/
│   ├── cors.js
│   ├── database.js
│   └── security.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── cartController.js
│   ├── checkoutController.js
│   ├── couponController.js
│   ├── inventoryController.js
│   ├── orderController.js
│   ├── paymentController.js
│   ├── productController.js
│   ├── reviewController.js
│   └── wishlistController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── productValidation.js
│   └── validate.js
├── models/
│   ├── Cart.js
│   ├── Coupon.js
│   ├── Order.js
│   ├── Product.js
│   ├── Review.js
│   └── User.js
├── routes/
│   ├── index.js
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── checkoutRoutes.js
│   ├── couponRoutes.js
│   ├── inventoryRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── productRoutes.js
│   ├── profileRoutes.js
│   ├── reviewRoutes.js
│   └── wishlistRoutes.js
├── services/
│   └── tokenService.js
└── utils/
    ├── emailService.js
    └── securityLogger.js
```

### Biến môi trường (.env):

```
NODE_ENV, PORT, MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET,
JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY, CLIENT_URL, CLIENT_URL_2,
RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS, ENCRYPTION_KEY,
HSTS_MAX_AGE, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL
```

### Dependencies:

```json
{
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "express-rate-limit": "^8.2.1",
  "express-validator": "^7.3.1",
  "helmet": "^8.1.0",
  "hpp": "^0.2.3",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.0.2",
  "nodemailer": "^7.0.12",
  "slugify": "^1.6.6",
  "validator": "^13.15.26"
}
```

---

## YÊU CẦU KIỂM TRA

Hãy đọc **TẤT CẢ** file trong `/var/www/fashion-website-backend/src/` và kiểm tra các mục sau:

### 1. KIỂM TRA API ENDPOINTS (Frontend ↔ Backend matching)

Frontend gọi tổng cộng **60 endpoints**. Kiểm tra backend có đủ tất cả không:

#### Auth (8 endpoints):

| #   | Method | Path                              | Mô tả                                                         |
| --- | ------ | --------------------------------- | ------------------------------------------------------------- |
| 1   | POST   | `/api/auth/register`              | Đăng ký → trả `{ data: { accessToken, user } }`               |
| 2   | POST   | `/api/auth/login`                 | Đăng nhập → trả `{ data: { accessToken, user } }`             |
| 3   | POST   | `/api/auth/logout`                | Đăng xuất (xóa httpOnly cookie)                               |
| 4   | GET    | `/api/auth/me`                    | Lấy user hiện tại (Bearer token) → `{ data: { user } }`       |
| 5   | POST   | `/api/auth/refresh`               | Refresh token (httpOnly cookie) → `{ data: { accessToken } }` |
| 6   | POST   | `/api/auth/forgot-password`       | Gửi email reset → `{ success, message }`                      |
| 7   | POST   | `/api/auth/reset-password/:token` | Reset password với token                                      |
| 8   | GET    | `/api/auth/verify-email/:token`   | Xác thực email                                                |

#### Products (6 endpoints):

| #   | Method | Path                               | Mô tả                                                                                                                                                         |
| --- | ------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9   | GET    | `/api/products`                    | Danh sách sản phẩm với filter: `category, brand, size, color, minPrice, maxPrice, search, featured, onSale, inStock, sortBy, sortOrder, page, limit, exclude` |
| 10  | GET    | `/api/products/:slugOrId`          | Chi tiết sản phẩm theo slug hoặc ID                                                                                                                           |
| 11  | GET    | `/api/products/id/:id`             | Chi tiết sản phẩm theo ID                                                                                                                                     |
| 12  | GET    | `/api/products/categories`         | Danh sách categories với count                                                                                                                                |
| 13  | GET    | `/api/products/brands`             | Danh sách brands                                                                                                                                              |
| 14  | GET    | `/api/products/:productId/related` | Sản phẩm liên quan                                                                                                                                            |

#### Cart (10 endpoints):

| #   | Method | Path                      | Mô tả                                            |
| --- | ------ | ------------------------- | ------------------------------------------------ |
| 15  | GET    | `/api/cart`               | Lấy giỏ hàng (header `X-Cart-Session` cho guest) |
| 16  | POST   | `/api/cart/items`         | Thêm sản phẩm vào giỏ                            |
| 17  | PATCH  | `/api/cart/items/:itemId` | Cập nhật số lượng                                |
| 18  | DELETE | `/api/cart/items/:itemId` | Xóa sản phẩm khỏi giỏ                            |
| 19  | DELETE | `/api/cart`               | Xóa toàn bộ giỏ hàng                             |
| 20  | POST   | `/api/cart/coupon`        | Áp dụng mã giảm giá                              |
| 21  | DELETE | `/api/cart/coupon`        | Xóa mã giảm giá                                  |
| 22  | POST   | `/api/cart/validate`      | Kiểm tra giỏ hàng hợp lệ                         |
| 23  | POST   | `/api/cart/merge`         | Gộp giỏ hàng guest → user                        |
| 24  | POST   | `/api/cart/sync`          | Đồng bộ giỏ hàng                                 |

#### Checkout (6 endpoints):

| #   | Method | Path                               | Mô tả                  |
| --- | ------ | ---------------------------------- | ---------------------- |
| 25  | POST   | `/api/checkout/initialize`         | Khởi tạo checkout      |
| 26  | POST   | `/api/checkout/shipping-rates`     | Tính phí ship          |
| 27  | POST   | `/api/checkout/calculate-tax`      | Tính thuế              |
| 28  | POST   | `/api/checkout/validate-coupon`    | Kiểm tra mã giảm giá   |
| 29  | POST   | `/api/checkout/complete`           | Hoàn tất đơn hàng      |
| 30  | GET    | `/api/checkout/order/:orderNumber` | Lấy thông tin đơn hàng |

#### Orders (6 endpoints):

| #   | Method | Path                             | Mô tả                           |
| --- | ------ | -------------------------------- | ------------------------------- |
| 31  | GET    | `/api/orders`                    | Danh sách đơn hàng              |
| 32  | GET    | `/api/orders/:orderId`           | Chi tiết đơn hàng               |
| 33  | GET    | `/api/orders/track/:orderNumber` | Tra cứu đơn hàng (query: email) |
| 34  | POST   | `/api/orders/:orderId/cancel`    | Hủy đơn hàng                    |
| 35  | POST   | `/api/orders/:orderId/return`    | Yêu cầu trả hàng                |
| 36  | GET    | `/api/orders/:orderId/invoice`   | Lấy hóa đơn                     |

#### Profile (18 endpoints):

| #   | Method | Path                                            | Mô tả                               |
| --- | ------ | ----------------------------------------------- | ----------------------------------- |
| 37  | GET    | `/api/profile`                                  | Lấy thông tin profile               |
| 38  | PATCH  | `/api/profile`                                  | Cập nhật profile                    |
| 39  | DELETE | `/api/profile`                                  | Xóa tài khoản                       |
| 40  | PATCH  | `/api/profile/email`                            | Đổi email                           |
| 41  | PATCH  | `/api/profile/password`                         | Đổi mật khẩu                        |
| 42  | PATCH  | `/api/profile/preferences`                      | Cập nhật preferences                |
| 43  | POST   | `/api/profile/avatar`                           | Upload avatar (multipart/form-data) |
| 44  | DELETE | `/api/profile/avatar`                           | Xóa avatar                          |
| 45  | GET    | `/api/profile/addresses`                        | Danh sách địa chỉ                   |
| 46  | POST   | `/api/profile/addresses`                        | Thêm địa chỉ                        |
| 47  | PATCH  | `/api/profile/addresses/:addressId`             | Sửa địa chỉ                         |
| 48  | DELETE | `/api/profile/addresses/:addressId`             | Xóa địa chỉ                         |
| 49  | PATCH  | `/api/profile/addresses/:addressId/default`     | Đặt địa chỉ mặc định                |
| 50  | GET    | `/api/profile/wishlist`                         | Lấy wishlist                        |
| 51  | POST   | `/api/profile/wishlist`                         | Thêm vào wishlist                   |
| 52  | DELETE | `/api/profile/wishlist/:productId`              | Xóa khỏi wishlist                   |
| 53  | GET    | `/api/profile/wishlist/check/:productId`        | Kiểm tra trong wishlist             |
| 54  | POST   | `/api/profile/wishlist/:productId/move-to-cart` | Chuyển sang giỏ hàng                |

#### Wishlist standalone (6 endpoints):

| #   | Method | Path                              | Mô tả                   |
| --- | ------ | --------------------------------- | ----------------------- |
| 55  | GET    | `/api/wishlist`                   | Lấy wishlist            |
| 56  | POST   | `/api/wishlist/:productId`        | Thêm vào wishlist       |
| 57  | DELETE | `/api/wishlist/:productId`        | Xóa khỏi wishlist       |
| 58  | POST   | `/api/wishlist/:productId/toggle` | Toggle wishlist         |
| 59  | GET    | `/api/wishlist/check/:productId`  | Kiểm tra trong wishlist |
| 60  | DELETE | `/api/wishlist`                   | Xóa toàn bộ wishlist    |

### 2. KIỂM TRA BẢO MẬT

- [ ] JWT token: access + refresh token flow, httpOnly cookie cho refresh
- [ ] Password hashing: bcrypt với salt rounds phù hợp
- [ ] Rate limiting: cấu hình đúng cho auth routes (login, register, forgot-password)
- [ ] CORS: chỉ cho phép CLIENT_URL, CLIENT_URL_2
- [ ] Helmet: security headers
- [ ] HPP: HTTP parameter pollution protection
- [ ] Input validation: express-validator trên tất cả routes nhận user input
- [ ] MongoDB injection: kiểm tra có sanitize input không
- [ ] XSS: kiểm tra có escape output không
- [ ] Password reset token: hash bằng SHA-256, có expiry time
- [ ] Authorization: routes cần auth có middleware `authenticate` không?
- [ ] Admin routes: có kiểm tra role admin không?

### 3. KIỂM TRA LOGIC NGHIỆP VỤ

- [ ] **Auth flow**: Register → set accessToken + httpOnly refresh cookie → return user
- [ ] **Token refresh**: Cookie → verify → new accessToken
- [ ] **Forgot password**: email → generate token → hash SHA-256 → save to user → send email với URL format `/reset-password/{raw_token}` (KHÔNG phải `?token=`)
- [ ] **Reset password**: nhận raw token từ URL path → hash SHA-256 → so sánh DB → đổi password → xóa token
- [ ] **Product filters**: `onSale`, `inStock`, `featured` filter hoạt động đúng (onSale check `isOnSale === true`, inStock check `totalStock > 0` hoặc `variants.some(v => v.stock > 0)`)
- [ ] **Cart**: Guest cart (session ID) vs User cart (user ID), merge khi login
- [ ] **Checkout**: validate stock trước khi tạo order, giảm stock sau khi order
- [ ] **Order**: tạo orderNumber unique, cập nhật trạng thái đúng flow
- [ ] **Email**: `sendPasswordResetEmail` gọi đúng khi forgot-password, email template có URL đúng

### 4. KIỂM TRA MODELS (Mongoose Schemas)

- [ ] **User**: fields đúng (firstName, lastName, email, password, role, passwordResetToken, passwordResetExpires, emailVerified, address, wishlist, preferences, avatar)
- [ ] **Product**: fields đúng (name, slug, price, compareAtPrice, isOnSale, category, brand, variants với stock, images, featured, sold, totalStock, ratings)
- [ ] **Cart**: items array với productId reference, session handling
- [ ] **Order**: orderNumber, items, shippingAddress, payment, status flow
- [ ] **Coupon**: code, discount type/value, conditions, expiry
- [ ] **Review**: productId, userId, rating, comment

### 5. KIỂM TRA ERROR HANDLING

- [ ] Middleware `errorHandler.js` xử lý đúng: ValidationError, CastError, 11000 (duplicate), JWT errors
- [ ] Tất cả controller đều có try-catch hoặc async error wrapper
- [ ] Response format nhất quán: `{ success: true/false, data/error, message }`
- [ ] HTTP status codes đúng: 200, 201, 400, 401, 403, 404, 409, 429, 500

### 6. KIỂM TRA HIỆU NĂNG & BEST PRACTICES

- [ ] Database indexes: email (unique), slug (unique), orderNumber (unique), product filters
- [ ] Mongoose populate: không N+1 queries
- [ ] Pagination: tất cả list endpoints có pagination
- [ ] Query timeout: có set maxTimeMS không?
- [ ] Memory leaks: event listeners, unclosed connections
- [ ] Environment variables: tất cả secrets từ .env, không hardcode

### 7. CÁC VẤN ĐỀ ĐÃ BIẾT CẦN KIỂM TRA

1. **Duplicate schema index warning**: Mongoose khởi động log `Duplicate schema index on {"orderNumber":1}` và `{"code":1}` — kiểm tra Order.js và Coupon.js có khai báo index trùng không
2. **Wishlist routes trùng**: có cả `/wishlist` (wishlistRoutes) và `/profile/wishlist` (profileRoutes) — xác nhận cả 2 hoạt động
3. **Express 5 compatibility**: Express 5.x có breaking changes (no `app.del()`, `req.query` immutable, etc.) — kiểm tra code compatible
4. **`JWT_REFRESH_SECRET`** đang là `your_super_secret_refresh_key_here_also_long_and_random` — CẦN ĐỔI
5. **verify-email**: authRoutes có route không? User model có field `emailVerified` không?
6. **Welcome email**: `emailService.js` có `sendWelcomeEmail()` nhưng register controller có gọi không?
7. **Email template**: dùng màu `#c9a962` cũ, frontend đã đổi sang `#D0B674`

---

## OUTPUT MONG MUỐN

Sau khi kiểm tra, trả về báo cáo chi tiết:

1. **Endpoints thiếu**: Liệt kê endpoints frontend gọi nhưng backend CHƯA CÓ
2. **Endpoints thừa**: Liệt kê endpoints backend có nhưng frontend KHÔNG GỌI
3. **Response format sai**: Endpoints trả response format khác với frontend expect
4. **Lỗi bảo mật**: Xếp hạng CRITICAL / WARNING / INFO
5. **Lỗi logic**: Bug trong business logic
6. **Lỗi code**: Syntax, import, dependency issues
7. **Đề xuất cải thiện**: Performance, code quality, best practices

Mỗi vấn đề cần ghi rõ: **file**, **dòng**, **mô tả lỗi**, **cách fix đề xuất**.
