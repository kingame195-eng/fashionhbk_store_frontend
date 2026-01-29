# 🛍️ Complete Fullstack Fashion Website Guide

## Using Vite + React, Node.js/Express, Docker, Ubuntu Cloud Server & Termius

> **Giáo án hoàn chỉnh, production-ready** cho xây dựng website thời trang e-commerce chuyên nghiệp.  
> Phù hợp cho **tự học**, **portfolio** và **phỏng vấn**.

---

## 🎯 Mục tiêu của giáo án

### Tại sao cần giáo án này?

1. **Học thực tế** - Không chỉ lý thuyết, bạn sẽ code thực sự một website hoàn chỉnh
2. **Hiểu sâu** - Mỗi bước đều có giải thích _tại sao_ làm như vậy
3. **Production-ready** - Kiến thức áp dụng được ngay vào công việc thực tế
4. **Portfolio** - Có sản phẩm để show trong CV và phỏng vấn

### Bạn sẽ học được gì?

| Kỹ năng                  | Mô tả                                                          |
| ------------------------ | -------------------------------------------------------------- |
| **Backend Development**  | Xây dựng REST API với Node.js/Express, xác thực JWT, bảo mật   |
| **Frontend Development** | React components, state management, routing, API integration   |
| **Database Design**      | MongoDB schema design, queries, indexing                       |
| **Security**             | Authentication, authorization, input validation, rate limiting |
| **DevOps**               | Docker, CI/CD, Nginx, SSL, deployment                          |
| **Best Practices**       | Clean code, error handling, logging, testing                   |

---

# 📋 Mục lục Tổng quan

> 📌 **Lưu ý về thứ tự học:**
>
> - Giáo án được sắp xếp theo **workflow thực tế** của dự án
> - **Backend trước** vì Frontend cần API để test
> - Mỗi Part đều có giải thích "tại sao" làm như vậy

## Phần A: Nền tảng & Khởi tạo

- [Part 1: Overview & Environment Preparation](#part-1-overview--environment-preparation)
  - Giới thiệu dự án, kiến trúc hệ thống
  - Cài đặt môi trường (Node.js, MongoDB, Git)
  - Tại sao cần học phần này?

## Phần B: Backend Development (Làm trước)

> 💡 **Tại sao Backend trước?**
>
> - Frontend cần API endpoints để gọi
> - Test API bằng Postman trước khi viết UI
> - Database schema quyết định data flow

- [Part 2: Backend Development with Node.js + Express](#part-2-backend-development-with-nodejs--express)
  - Khởi tạo project, cấu trúc MVC
  - Database models (User, Product, Cart)
  - API routes & Controllers
  - Authentication (JWT), Security middleware

## Phần C: Frontend Development (Làm sau Backend)

> 💡 **Tại sao Frontend sau?**
>
> - Có API sẵn để integrate
> - Biết data structure từ backend
> - Test real API thay vì mock data

- [Part 3: Frontend Development with Vite + React](#part-3-frontend-development-with-vite--react)
  - Khởi tạo project với Vite
  - Components, Pages, Routing
  - State management với Context API
  - API Integration với Axios

## Phần D: Kết nối & Tích hợp

- [Part 4: Frontend-Backend Integration](#part-4-frontend-backend-integration)
  - Kết nối Frontend với Backend API
  - Xử lý CORS, Cookies, Auth flow
  - Debug connection issues

- [Part 5: Common Issues & Solutions](#part-5-common-issues--solutions)
  - Các lỗi thường gặp và cách fix
  - Debug tips

## Phần E: Testing & Quality Assurance

- [Part 6: Testing](#part-6-testing)
  - 6.1 Manual Testing Checklist
  - 6.2 ⭐ **Automated API Testing (65 test cases)** - MỚI
  - 6.3 Test Report & Results

## Phần F: Deployment

> 💡 **Tại sao Deployment trước Advanced Features?**
>
> - Deploy bản MVP trước, thêm features sau
> - Học DevOps sớm, tích hợp CI/CD
> - Real-world workflow: ship early, iterate

- [Part 7: Deployment](#part-7-deployment)
  - Docker & Docker Compose
  - Nginx configuration
  - SSL/HTTPS setup
  - CI/CD với GitHub Actions

## Phần G: Tính năng Nâng cao (Sau khi deploy MVP)

- [Part 8: Advanced Features](#part-8-advanced-features)
  - Order System, Checkout Flow
  - Admin Dashboard
  - Payment Integration
  - Email notifications

## Phần H: Lý thuyết & Best Practices

> 💡 **Tại sao Lý thuyết ở cuối?**
>
> - Học qua thực hành trước, hiểu lý thuyết sau
> - Có context từ project thực tế
> - Dễ áp dụng vào code đã viết

- [Part 9: Lý thuyết Nền tảng](#part-9-lý-thuyết-nền-tảng-foundational-theory)
- [Part 10: Nguyên tắc Clean Code](#part-10-nguyên-tắc-clean-code--best-practices)
- [Part 11: Kỹ năng Thực tế](#part-11-kỹ-năng-thực-tế-practical-skills)

## Phần I: Thực hành & Phỏng vấn

- [Part 12: Bài tập Thực hành](#part-12-bài-tập-thực-hành--tình-huống-phỏng-vấn)
- [Part 13: Tài liệu Tham khảo](#part-13-tài-liệu-tham-khảo--học-thêm)
- [Part 14: Định hướng Nghề nghiệp](#part-14-định-hướng-nghề-nghiệp)

## Phần J: Phụ lục Quan trọng ⭐

- [Phụ lục A: Security Checklist](#phụ-lục-a-security-checklist--best-practices)
  - Backend & Frontend Security Checklists
  - Automated Security Audit Script
- [Phụ lục B: Backup & Recovery Guide](#phụ-lục-b-backup--recovery-guide)
  - Backup Strategy (3-2-1 Rule)
  - MongoDB Backup/Restore Scripts
- [Phụ lục C: Debugging & Troubleshooting](#phụ-lục-c-debugging--troubleshooting-guide)
  - Common Errors & Solutions
  - Debug Checklist & Logging
- [Phụ lục D: Quick Reference Cheatsheet](#phụ-lục-d-quick-reference-cheatsheet)
  - Git, npm, MongoDB, Linux commands
- [Phụ lục E: Code Changes Log](#phụ-lục-e-code-changes-log-bổ-sung-mới-) ⭐ **MỚI**
  - API Design Observations
  - Test Suite Files
  - Danh sách 65 API Endpoints đã test
- [Phụ lục F: Các Tính Năng Nâng Cao Đã Implement](#phụ-lục-f-các-tính-năng-nâng-cao-đã-implement--mới) ⭐ **MỚI**
  - Reviews & Ratings System
  - Coupon System
  - Payment Integration (COD, Bank Transfer, Stripe, VNPay)
  - Admin Dashboard
  - Inventory Management
  - Email Notifications

---

# Part 1: Overview & Environment Preparation

## 🎯 Mục tiêu của Part này

> **Tại sao cần phần này?**  
> Trước khi viết code, bạn cần hiểu rõ:
>
> - Dự án sẽ làm gì? (scope)
> - Dùng công nghệ gì? (tech stack)
> - Cấu trúc như thế nào? (architecture)
> - Cài đặt những gì? (environment)
>
> Nếu bỏ qua phần này, bạn sẽ gặp khó khăn khi mở rộng hoặc debug sau này.

---

## 1.1 Project Overview

### What We're Building

Một **website thời trang e-commerce chuyên nghiệp** với các tính năng:

| Feature                      | Description                                        | Tại sao cần?                         |
| ---------------------------- | -------------------------------------------------- | ------------------------------------ |
| 🏠 **Homepage**              | Hero banner, featured products, categories         | First impression, thu hút khách hàng |
| 👗 **Product Catalog**       | Browse products với filters & pagination           | Giúp user tìm sản phẩm nhanh chóng   |
| 🔍 **Product Details**       | Individual product pages với images, sizes, colors | Thông tin chi tiết trước khi mua     |
| 🛒 **Shopping Cart**         | Add/remove items, quantity management, guest cart  | Core của e-commerce                  |
| 🔐 **Authentication**        | Secure login/register với JWT + httpOnly cookies   | Bảo mật user data                    |
| 🔑 **Forgot/Reset Password** | Password recovery flow                             | UX tốt, giảm support tickets         |
| 👤 **User Profile**          | View/update profile, change password               | Quản lý thông tin cá nhân            |
| 📱 **Responsive Design**     | Mobile-first CSS approach                          | 60%+ traffic từ mobile               |

### Architecture Overview

**Tại sao cần kiến trúc này?**

```
┌──────────────────────┐
│   Ubuntu Cloud       │  ← Cloud server: chạy 24/7, có IP public
│      Server          │
│  ┌────────────────┐  │
│  │     Nginx      │  │  ← Reverse proxy: SSL, load balancing, static files
│  │  (Port 80/443) │  │
│  └───────┬────────┘  │
│          │           │
│    ┌─────┴─────┐     │
│    ▼           ▼     │
│ ┌─────┐    ┌─────┐   │
│ │ FE  │    │ BE  │   │  ← Tách biệt: dễ scale, dễ maintain
│ │React│    │Node │   │
│ │:3000│    │:5000│   │
│ └─────┘    └──┬──┘   │
│               │      │
│          ┌────▼────┐ │
│          │ MongoDB │ │  ← NoSQL: flexible schema cho fashion products
│          │ :27017  │ │
│          └─────────┘ │
│                      │
│   Docker Network     │  ← Container: isolated, reproducible
└──────────────────────┘
```

**Giải thích từng thành phần:**

| Thành phần          | Vai trò                                            | Lý do chọn                                              |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------- |
| **Nginx**           | Reverse proxy, serve static files, SSL termination | Performance cao, config linh hoạt                       |
| **React (Vite)**    | Frontend SPA                                       | Fast HMR, modern tooling, component-based               |
| **Node.js/Express** | Backend API                                        | JavaScript fullstack, async I/O tốt                     |
| **MongoDB**         | Database                                           | Schema linh hoạt cho products (sizes, colors, variants) |
| **Docker**          | Containerization                                   | Đảm bảo "works on my machine" → "works everywhere"      |

---

## 1.2 Technology Stack

### Frontend

| Technology       | Version | Purpose                         | Tại sao chọn?                   |
| ---------------- | ------- | ------------------------------- | ------------------------------- |
| **Vite**         | 7.x     | Build tool - Lightning fast HMR | Nhanh hơn CRA 10-100x           |
| **React**        | 19.x    | UI library                      | Component-based, huge ecosystem |
| **React Router** | 7.x     | Client-side routing             | De-facto standard cho React     |
| **Axios**        | 1.x     | HTTP client with interceptors   | Interceptors cho auth, error    |
| **CSS Modules**  | -       | Scoped styling                  | Tránh CSS conflicts             |

### Backend

| Technology   | Version  | Purpose               | Tại sao chọn?                    |
| ------------ | -------- | --------------------- | -------------------------------- |
| **Node.js**  | 20.x LTS | Runtime environment   | JavaScript fullstack, async I/O  |
| **Express**  | 5.x      | Web framework         | Minimal, flexible, mature        |
| **MongoDB**  | 7.x      | NoSQL database        | Schema linh hoạt cho products    |
| **Mongoose** | 9.x      | MongoDB ODM           | Validation, middleware, populate |
| **JWT**      | 9.x      | Authentication tokens | Stateless, scalable              |
| **bcrypt**   | 6.x      | Password hashing      | Industry standard, salt included |

### Security Packages

| Package                | Purpose                             |
| ---------------------- | ----------------------------------- |
| **helmet**             | Set security HTTP headers           |
| **express-rate-limit** | Prevent brute force attacks         |
| **hpp**                | HTTP Parameter Pollution protection |
| **express-validator**  | Input validation                    |

---

## 1.3 Project Structure Overview

### Cấu trúc thư mục hoàn chỉnh

```
fashion-website-frontend/
│
├── frontend/                    # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, fonts
│   │   │   ├── fonts/
│   │   │   └── images/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── auth/           # Auth components (ProtectedRoute, GuestRoute, etc.)
│   │   │   ├── common/         # Buttons, Inputs, Cards
│   │   │   ├── layout/         # Header, Footer, Layout
│   │   │   └── products/       # Product-specific components
│   │   ├── context/            # React Context (Auth, Cart, Toast)
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── ToastContext.jsx
│   │   │   └── constants.js
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useCategories.js
│   │   │   ├── useDebounce.js
│   │   │   ├── useProduct.js
│   │   │   ├── useProducts.js
│   │   │   └── useWishlist.js
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── router/             # Router configuration
│   │   ├── services/           # API calls
│   │   │   ├── api.js          # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── cartService.js
│   │   │   ├── productService.js
│   │   │   └── profileService.js
│   │   ├── styles/             # CSS files
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── fashion-website-backend/     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── cors.js
│   │   │   ├── database.js
│   │   │   └── security.js
│   │   ├── controllers/        # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   └── productController.js
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── auth.js         # JWT verification
│   │   │   ├── errorHandler.js
│   │   │   ├── productValidation.js
│   │   │   └── validate.js
│   │   ├── models/             # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Cart.js
│   │   ├── routes/             # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── profileRoutes.js
│   │   │   └── index.js
│   │   ├── services/           # Business logic
│   │   │   └── tokenService.js
│   │   ├── utils/              # Utilities
│   │   │   ├── emailService.js
│   │   │   └── securityLogger.js
│   │   └── server.js           # Entry point
│   └── package.json
│
├── nginx/                       # Nginx Configuration
│   └── fashionhbk.shop.conf
│
└── scripts/                     # Utility scripts
    └── seedProducts.js
```

---

# Part 2: Frontend Development with Vite + React

> ⚠️ **Lưu ý về thứ tự học:**
>
> - Nếu bạn theo workflow thực tế, **hãy làm Part 3 (Backend) trước**
> - Backend cung cấp API endpoints để Frontend gọi
> - Hoặc: Làm Frontend với mock data, sau đó integrate với Backend thực
>
> 📌 **Phần này dạy:** Khởi tạo React project, components, routing, state management

## 2.1 Project Initialization

### Step 1: Create Vite + React Project

```bash
# Navigate to your project root
cd fashion-website-frontend

# Create Vite project with React template
npm create vite@latest frontend -- --template react

cd frontend
npm install
```

### Step 2: Install Required Dependencies

```bash
# Core dependencies
npm install react-router-dom axios

# Development dependencies
npm install -D @types/node
```

### Step 3: Configure Vite (`vite.config.js`)

```javascript
// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Build configuration
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          axios: ["axios"],
        },
      },
    },
  },

  envPrefix: "VITE_",
});
```

### Step 4: Create Environment Files

**`.env.development`**:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Fashion Store (Dev)
```

**`.env.production`**:

```env
VITE_API_URL=/api
VITE_APP_NAME=Fashion Store
```

### Step 5: Create jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@context/*": ["src/context/*"],
      "@assets/*": ["src/assets/*"],
      "@styles/*": ["src/styles/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 2.2 CSS Architecture

### CSS Variables (`styles/variables.css`)

```css
/* frontend/src/styles/variables.css */
:root {
  /* Color Palette */
  --color-primary: #1a1a1a;
  --color-primary-light: #2d2d2d;
  --color-primary-dark: #000000;

  --color-accent: #c9a962;
  --color-accent-light: #d4bc7e;
  --color-accent-dark: #b8944d;

  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Typography */
  --font-primary: "Playfair Display", Georgia, serif;
  --font-secondary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Layout */
  --container-xl: 1280px;
  --header-height: 80px;

  /* Borders & Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-Index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal: 500;
  --z-toast: 800;
}
```

### Global Styles (`styles/global.css`)

```css
/* frontend/src/styles/global.css */
@import "./variables.css";
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--color-gray-900);
  background-color: var(--color-white);
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-primary);
  font-weight: 600;
  line-height: 1.25;
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent-dark);
}

img {
  display: block;
  max-width: 100%;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
}

.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  margin-top: var(--header-height);
}
```

---

## 2.3 Core Services Setup

### API Service (`services/api.js`)

```javascript
// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

// Token storage (in memory for security)
let accessToken = null;
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const onRefreshFailed = (error) => {
  refreshSubscribers.forEach((callback) => callback(null, error));
  refreshSubscribers = [];
};

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add cart session ID for guests
    const cartSession = localStorage.getItem("cartSession");
    if (cartSession) {
      config.headers["X-Cart-Session"] = cartSession;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 429 Too Many Requests
    if (error.response?.status === 429) {
      return Promise.reject({
        message: "Too many requests. Please wait a moment.",
        status: 429,
        isRateLimited: true,
      });
    }

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes("/auth/refresh")) {
        clearAccessToken();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token, err) => {
            if (err) return reject(err);
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken: newToken } = response.data.data;
        setAccessToken(newToken);
        isRefreshing = false;
        onTokenRefreshed(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        onRefreshFailed(refreshError);
        clearAccessToken();

        if (accessToken) {
          window.dispatchEvent(new CustomEvent("auth:logout"));
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject({
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status,
      errors: error.response?.data?.errors,
    });
  }
);

export default api;
```

### Auth Service (`services/authService.js`)

```javascript
// frontend/src/services/authService.js
import api, { setAccessToken, clearAccessToken } from "./api";

const authService = {
  async register(userData) {
    const response = await api.post("/auth/register", userData);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    return { user, accessToken };
  },

  async login(credentials) {
    const response = await api.post("/auth/login", credentials);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    return { user, accessToken };
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAccessToken();
    }
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data.data.user;
  },

  async refreshToken() {
    try {
      const response = await api.post("/auth/refresh");
      const { accessToken } = response.data.data;
      setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      return null;
    }
  },

  async forgotPassword(email) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  async resetPassword(token, password, confirmPassword) {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
    return response.data;
  },
};

export default authService;
```

### Cart Service (`services/cartService.js`)

```javascript
// frontend/src/services/cartService.js
import api from "./api";

const CART_SESSION_KEY = "cartSession";
const EMPTY_CART = { items: [], subtotal: 0, total: 0, discount: 0 };

const generateSessionId = () => {
  return `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem(CART_SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(CART_SESSION_KEY, sessionId);
  }
  return sessionId;
};

const cartService = {
  async getCart() {
    try {
      const response = await api.get("/cart");
      return response.data.data.cart;
    } catch (error) {
      if (error.status === 404 || error.status === 401) {
        return EMPTY_CART;
      }
      throw error;
    }
  },

  async addItem(productId, quantity = 1, options = {}) {
    getOrCreateSessionId();
    const response = await api.post("/cart/items", {
      productId,
      quantity,
      ...options,
    });
    return response.data.data.cart;
  },

  async updateItem(itemId, quantity) {
    const response = await api.patch(`/cart/items/${itemId}`, { quantity });
    return response.data.data.cart;
  },

  async removeItem(itemId) {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data.data.cart;
  },

  async clearCart() {
    const response = await api.delete("/cart");
    return response.data.data.cart;
  },

  async applyCoupon(code) {
    const response = await api.post("/cart/coupon", { code });
    return response.data.data.cart;
  },

  async removeCoupon() {
    const response = await api.delete("/cart/coupon");
    return response.data.data.cart;
  },

  async mergeCarts() {
    const guestSessionId = localStorage.getItem(CART_SESSION_KEY);

    if (!guestSessionId) return null;

    const response = await api.post("/cart/merge", {
      guestSessionId,
    });

    localStorage.removeItem(CART_SESSION_KEY);
    return response.data.data.cart;
  },
};

export default cartService;
```

### Profile Service (`services/profileService.js`)

```javascript
// frontend/src/services/profileService.js
import api from "./api";

const profileService = {
  async getProfile() {
    const response = await api.get("/profile");
    return response.data.data.user;
  },

  async updateProfile(data) {
    const response = await api.patch("/profile", data);
    return response.data.data.user;
  },

  async changePassword(currentPassword, newPassword, confirmPassword) {
    const response = await api.patch("/profile/password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },
};

export default profileService;
```

### Services Index (`services/index.js`)

```javascript
// frontend/src/services/index.js
export { default as api, setAccessToken, clearAccessToken, getAccessToken } from "./api";
export { default as authService } from "./authService";
export { default as cartService } from "./cartService";
export { default as productService } from "./productService";
export { default as profileService } from "./profileService";
```

---

## 2.4 Context Providers

### Auth Context (`context/AuthContext.jsx`)

```jsx
// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { authService, cartService, clearAccessToken } from "../services";
import { AUTH_STATUS } from "./constants";

const AUTH_ACTIONS = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAILURE: "AUTH_FAILURE",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  CLEAR_ERROR: "CLEAR_ERROR",
};

const initialState = {
  user: null,
  status: AUTH_STATUS.IDLE,
  error: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_START:
      return { ...state, status: AUTH_STATUS.LOADING, isLoading: true, error: null };
    case AUTH_ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        status: AUTH_STATUS.AUTHENTICATED,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        status: AUTH_STATUS.UNAUTHENTICATED,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        status: AUTH_STATUS.UNAUTHENTICATED,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload.user } };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize Auth on Mount
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      dispatch({ type: AUTH_ACTIONS.AUTH_START });

      try {
        const token = await authService.refreshToken();

        if (!isMounted) return;

        if (token) {
          const user = await authService.getCurrentUser();
          if (!isMounted) return;

          // Merge guest cart if exists
          await cartService.mergeCarts().catch(() => {});

          dispatch({ type: AUTH_ACTIONS.AUTH_SUCCESS, payload: { user } });
        } else {
          dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: { error: null } });
        }
      } catch {
        if (!isMounted) return;
        dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: { error: null } });
      }
    };

    initializeAuth();

    const handleLogoutEvent = () => dispatch({ type: AUTH_ACTIONS.LOGOUT });
    window.addEventListener("auth:logout", handleLogoutEvent);

    return () => {
      isMounted = false;
      window.removeEventListener("auth:logout", handleLogoutEvent);
    };
  }, []);

  const register = useCallback(async (userData) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });
    try {
      const { user } = await authService.register(userData);
      await cartService.mergeCarts().catch(() => {});
      dispatch({ type: AUTH_ACTIONS.AUTH_SUCCESS, payload: { user } });
      window.dispatchEvent(new CustomEvent("auth:login"));
      return { success: true, user };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: { error: error.message } });
      return { success: false, error: error.message };
    }
  }, []);

  const login = useCallback(async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });
    try {
      const { user } = await authService.login(credentials);
      await cartService.mergeCarts().catch(() => {});
      dispatch({ type: AUTH_ACTIONS.AUTH_SUCCESS, payload: { user } });
      window.dispatchEvent(new CustomEvent("auth:login"));
      return { success: true, user };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: { error: error.message } });
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAccessToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
  }, []);

  const updateUser = useCallback((userData) => {
    dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: { user: userData } });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: { user } });
      return user;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  const hasRole = useCallback(
    (roles) => {
      if (!state.user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(state.user.role);
    },
    [state.user]
  );

  const value = useMemo(
    () => ({
      user: state.user,
      status: state.status,
      error: state.error,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      register,
      login,
      logout,
      updateUser,
      refreshUser,
      clearError,
      hasRole,
    }),
    [state, register, login, logout, updateUser, refreshUser, clearError, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

### Constants (`context/constants.js`)

```javascript
// frontend/src/context/constants.js
export const AUTH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

export const CART_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
```

---

## 2.5 Auth Components

### Protected Route (`components/auth/ProtectedRoute.jsx`)

```jsx
// frontend/src/components/auth/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

### Guest Route (`components/auth/GuestRoute.jsx`)

```jsx
// frontend/src/components/auth/GuestRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
}
```

### Admin Route (`components/auth/AdminRoute.jsx`)

```jsx
// frontend/src/components/auth/AdminRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole("admin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
```

### Auth Components Index (`components/auth/index.js`)

```javascript
// frontend/src/components/auth/index.js
export { default as ProtectedRoute } from "./ProtectedRoute";
export { default as GuestRoute } from "./GuestRoute";
export { default as AdminRoute } from "./AdminRoute";
```

---

## 2.6 App Router Setup

### App Component (`App.jsx`)

```jsx
// frontend/src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@components/layout";
import Home from "@pages/Home";
import Products from "@pages/Products";
import ProductDetail from "@pages/ProductDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Profile from "@pages/Profile";
import ForgotPassword from "@pages/ForgotPassword";
import ResetPassword from "@pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { ProtectedRoute, GuestRoute } from "@components/auth";

const Cart = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Shopping Cart</h1>
    <p>Cart page coming soon...</p>
  </div>
);

const NotFound = () => (
  <div style={{ padding: "4rem", textAlign: "center" }}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route
                  path="login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route
                  path="register"
                  element={
                    <GuestRoute>
                      <Register />
                    </GuestRoute>
                  }
                />
                <Route
                  path="forgot-password"
                  element={
                    <GuestRoute>
                      <ForgotPassword />
                    </GuestRoute>
                  }
                />
                <Route
                  path="reset-password/:token"
                  element={
                    <GuestRoute>
                      <ResetPassword />
                    </GuestRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
```

---

# Part 3: Backend Development with Node.js + Express

> ✅ **Đây là phần nên làm TRƯỚC nếu theo workflow thực tế:**
>
> - Tạo API endpoints trước
> - Test API bằng Postman
> - Sau đó Frontend sẽ integrate
>
> 📌 **Phần này dạy:** Express server, MongoDB models, REST API, JWT authentication, Security

## 3.1 Project Initialization

### Step 1: Initialize Backend Project

```bash
mkdir fashion-website-backend
cd fashion-website-backend

npm init -y

# Install production dependencies
npm install express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken slugify validator express-validator helmet express-rate-limit hpp

# Install dev dependencies
npm install -D nodemon eslint
```

### Step 2: Configure package.json

```json
{
  "name": "fashion-website-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "lint": "eslint . --ext .js,.jsx"
  },
  "dependencies": {
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
    "slugify": "^1.6.6",
    "validator": "^13.15.26"
  },
  "devDependencies": {
    "eslint": "^9.39.2",
    "nodemon": "^3.1.11"
  }
}
```

### Step 3: Create Environment File (.env)

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/fashion-store

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_also_long_and_random

# Server
PORT=5000
HOST=0.0.0.0
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Email (optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@fashionstore.com
```

---

## 3.2 Server Entry Point

### Server Setup (`src/server.js`)

```javascript
// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import routes from "./routes/index.js";
import { corsOptions } from "./config/cors.js";
import { helmetConfig, mongoSanitizeConfig, xssCleanConfig, hppConfig } from "./config/security.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import { securityAuditMiddleware } from "./utils/securityLogger.js";

// Load environment variables
dotenv.config();

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Initialize Express app
const app = express();

// Trust proxy (required for rate limiting behind reverse proxy)
app.set("trust proxy", 1);

// SECURITY MIDDLEWARE
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitizeConfig);
app.use(xssCleanConfig);
app.use(hppConfig);
app.use(securityAuditMiddleware);

// DATABASE CONNECTION
connectDB();

// Root route (health check)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API ROUTES
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(globalErrorHandler);

// SERVER
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
const server = app.listen(PORT, HOST, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on http://${HOST}:${PORT}`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
```

---

## 3.3 Configuration Files

### Database Configuration (`config/database.js`)

```javascript
// backend/src/config/database.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### CORS Configuration (`config/cors.js`)

```javascript
// backend/src/config/cors.js
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  process.env.CLIENT_URL_2,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (process.env.NODE_ENV !== "production") {
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "X-CSRF-Token",
    "X-Cart-Session",
  ],
  exposedHeaders: ["X-Total-Count", "X-Page-Count"],
  maxAge: 86400,
  optionsSuccessStatus: 200,
};
```

### Security Configuration (`config/security.js`)

```javascript
// backend/src/config/security.js
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10000,
  message: {
    success: false,
    message: "Too many login attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Custom MongoDB sanitization middleware
const sanitizeObject = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key.includes("$") || key.includes(".")) {
        const sanitizedKey = key.replace(/\$|\./g, "_");
        obj[sanitizedKey] = obj[key];
        delete obj[key];
      }
      if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  }
  return obj;
};

export const mongoSanitizeConfig = (req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);
  next();
};

export const xssCleanConfig = (req, res, next) => next();
export const hppConfig = hpp();
```

---

## 3.4 Models

### User Model (`models/User.js`)

```javascript
// backend/src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
      default: null,
    },
    addresses: [
      {
        type: { type: String, enum: ["shipping", "billing"], default: "shipping" },
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
    refreshToken: {
      type: String,
      select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.__v;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  return user;
};

const User = mongoose.model("User", userSchema);
export default User;
```

### Cart Model (`models/Cart.js`)

```javascript
// backend/src/models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    default: 1,
  },
  size: { type: String, default: null },
  color: { type: String, default: null },
  price: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sessionId: {
      type: String,
      default: null,
      index: true,
    },
    items: [cartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    coupon: { type: String, default: null },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Ensure either user or sessionId is present
cartSchema.pre("validate", function (next) {
  if (!this.user && !this.sessionId) {
    next(new Error("Cart must have either a user or sessionId"));
  } else {
    next();
  }
});

// Calculate totals before saving
cartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
```

---

## 3.5 Services

### Token Service (`services/tokenService.js`)

```javascript
// backend/src/services/tokenService.js
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

export const generateTokenPair = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
```

---

## 3.6 Middleware

### Error Handler (`middleware/errorHandler.js`)

```javascript
// backend/src/middleware/errorHandler.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleCastErrorDB = (err) => new AppError(`Invalid ${err.path}: ${err.value}`, 400);
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(`${field} already exists. Please use another value.`, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data: ${errors.join(". ")}`, 400);
};
const handleJWTError = () => new AppError("Invalid token. Please log in again.", 401);
const handleJWTExpiredError = () =>
  new AppError("Your session has expired. Please log in again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    console.error("ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

### Auth Middleware (`middleware/auth.js`)

```javascript
// backend/src/middleware/auth.js
import { verifyAccessToken } from "../services/tokenService.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - No token provided",
      });
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized - Invalid token",
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    next();
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized`,
      });
    }
    next();
  };
};
```

### Validation Middleware (`middleware/validate.js`)

```javascript
// backend/src/middleware/validate.js
import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return res.status(400).json({
      success: false,
      message: firstError.msg,
      code: "VALIDATION_ERROR",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

export const validateRegistration = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Please enter your first name")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters")
    .matches(/^[a-zA-ZÀ-ỹ\s-]+$/)
    .withMessage("First name can only contain letters, spaces, and hyphens"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Please enter your last name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters")
    .matches(/^[a-zA-ZÀ-ỹ\s-]+$/)
    .withMessage("Last name can only contain letters, spaces, and hyphens"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter your email address")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage("Email address is too long"),

  body("password")
    .notEmpty()
    .withMessage("Please create a password")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must include uppercase, lowercase, and number"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  (req, res, next) => handleValidationErrors(req, res, next),
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter your email address")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Please enter your password"),

  (req, res, next) => handleValidationErrors(req, res, next),
];
```

---

## 3.7 Controllers

### Auth Controller (`controllers/authController.js`)

```javascript
// backend/src/controllers/authController.js
import User from "../models/User.js";
import { generateTokenPair, verifyRefreshToken } from "../services/tokenService.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import crypto from "crypto";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Register
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "This email address is already registered.",
      code: "EMAIL_EXISTS",
    });
  }

  const user = await User.create({ firstName, lastName, email, password });
  const { accessToken, refreshToken } = generateTokenPair(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: { user: user.toJSON(), accessToken },
  });
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
      code: "INVALID_CREDENTIALS",
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: "Your account has been suspended.",
      code: "ACCOUNT_SUSPENDED",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
      code: "INVALID_CREDENTIALS",
    });
  }

  const { accessToken, refreshToken } = generateTokenPair(user);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: { user: user.toJSON(), accessToken },
  });
});

// Logout
export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

// Refresh Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please sign in again.",
      code: "SESSION_EXPIRED",
    });
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please sign in again.",
      code: "TOKEN_EXPIRED",
    });
  }

  const user = await User.findOne({
    _id: decoded.id,
    refreshToken,
  }).select("+refreshToken");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid session. Please sign in again.",
      code: "INVALID_SESSION",
    });
  }

  const tokens = generateTokenPair(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    data: { accessToken: tokens.accessToken },
  });
});

// Get Current User
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
      code: "USER_NOT_FOUND",
    });
  }

  res.status(200).json({
    success: true,
    data: { user },
  });
});

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Always return success to prevent email enumeration
  if (!user) {
    return res.status(200).json({
      success: true,
      message: "If your email exists in our system, you will receive a password reset link.",
    });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour

  await user.save();

  // TODO: Send email with reset link
  // const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  // await sendPasswordResetEmail(user.email, resetUrl);

  res.status(200).json({
    success: true,
    message: "If your email exists in our system, you will receive a password reset link.",
  });
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match.",
    });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Token is invalid or has expired.",
    });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.refreshToken = null; // Invalidate all sessions

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully. Please log in with your new password.",
  });
});
```

---

## 3.8 Routes

### Auth Routes (`routes/authRoutes.js`)

```javascript
// backend/src/routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  getMe,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validateRegistration, validateLogin } from "../middleware/validate.js";

const router = express.Router();

// Public routes
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.get("/me", protect, getMe);

export default router;
```

### Cart Routes (`routes/cartRoutes.js`)

```javascript
// backend/src/routes/cartRoutes.js
import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  mergeGuestCart,
  validateCart,
} from "../controllers/cartController.js";
import { protect, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Cart operations - support both authenticated and guest users
router.get("/", optionalAuth, getCart);
router.post("/items", optionalAuth, addToCart);
router.put("/items/:itemId", optionalAuth, updateCartItem);
router.patch("/items/:itemId", optionalAuth, updateCartItem);
router.delete("/items/:itemId", optionalAuth, removeFromCart);
router.delete("/", optionalAuth, clearCart);

// Coupon routes
router.post("/coupon", optionalAuth, applyCoupon);
router.delete("/coupon", optionalAuth, removeCoupon);

// Merge guest cart after login
router.post("/merge", protect, mergeGuestCart);

// Validate cart
router.post("/validate", optionalAuth, validateCart);

export default router;
```

### Profile Routes (`routes/profileRoutes.js`)

```javascript
// backend/src/routes/profileRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Get profile
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({ success: true, data: { user } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Update profile
router.patch("/", protect, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName.trim();
    if (lastName !== undefined) updateData.lastName = lastName.trim();
    if (phone !== undefined) updateData.phone = phone.trim();

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
});

// Change password
router.patch("/password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
});

export default router;
```

### Routes Index (`routes/index.js`)

```javascript
// backend/src/routes/index.js
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import profileRoutes from "./profileRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/profile", profileRoutes);

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
```

---

## 3.9 API Endpoints Summary

### Authentication Endpoints

| Method | Endpoint                          | Description            | Auth      |
| ------ | --------------------------------- | ---------------------- | --------- |
| POST   | `/api/auth/register`              | Register new user      | Public    |
| POST   | `/api/auth/login`                 | Login user             | Public    |
| POST   | `/api/auth/logout`                | Logout user            | Public    |
| POST   | `/api/auth/refresh`               | Refresh access token   | Public    |
| POST   | `/api/auth/forgot-password`       | Request password reset | Public    |
| POST   | `/api/auth/reset-password/:token` | Reset password         | Public    |
| GET    | `/api/auth/me`                    | Get current user       | Protected |

### Profile Endpoints

| Method | Endpoint                | Description      | Auth      |
| ------ | ----------------------- | ---------------- | --------- |
| GET    | `/api/profile`          | Get user profile | Protected |
| PATCH  | `/api/profile`          | Update profile   | Protected |
| PATCH  | `/api/profile/password` | Change password  | Protected |

### Cart Endpoints

| Method | Endpoint                  | Description          | Auth      |
| ------ | ------------------------- | -------------------- | --------- |
| GET    | `/api/cart`               | Get cart             | Optional  |
| POST   | `/api/cart/items`         | Add item to cart     | Optional  |
| PATCH  | `/api/cart/items/:itemId` | Update item quantity | Optional  |
| DELETE | `/api/cart/items/:itemId` | Remove item          | Optional  |
| DELETE | `/api/cart`               | Clear cart           | Optional  |
| POST   | `/api/cart/coupon`        | Apply coupon         | Optional  |
| DELETE | `/api/cart/coupon`        | Remove coupon        | Optional  |
| POST   | `/api/cart/merge`         | Merge guest cart     | Protected |

### Product Endpoints

| Method | Endpoint                     | Description           | Auth   |
| ------ | ---------------------------- | --------------------- | ------ |
| GET    | `/api/products`              | Get all products      | Public |
| GET    | `/api/products/:identifier`  | Get single product    | Public |
| GET    | `/api/products/featured`     | Get featured products | Public |
| GET    | `/api/products/new-arrivals` | Get new arrivals      | Public |
| GET    | `/api/products/sale`         | Get sale products     | Public |

---

# Part 4: Frontend-Backend Integration

> 🎯 **Mục tiêu Part này:**
>
> - Kết nối Frontend React với Backend Express
> - Hiểu flow của dữ liệu từ UI → API → Database
> - Setup authentication flow hoàn chỉnh
> - Handle errors và loading states

---

## 4.1 Integration Overview

### Luồng dữ liệu trong ứng dụng

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        DATA FLOW DIAGRAM                                   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────┐    ┌─────────────┐    ┌──────────┐    ┌──────────────────┐  │
│  │  User    │───▶│   React     │───▶│  Axios   │───▶│  Express API     │  │
│  │  Action  │    │  Component  │    │  Service │    │  (Backend)       │  │
│  └──────────┘    └─────────────┘    └──────────┘    └────────┬─────────┘  │
│                                                               │            │
│                                                               ▼            │
│  ┌──────────┐    ┌─────────────┐    ┌──────────┐    ┌──────────────────┐  │
│  │  UI      │◀───│   State     │◀───│  JSON    │◀───│  MongoDB         │  │
│  │  Update  │    │   Update    │    │  Response│    │  (Database)      │  │
│  └──────────┘    └─────────────┘    └──────────┘    └──────────────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Checklist trước khi integrate

```markdown
✅ Backend đã chạy được ở http://localhost:5000
✅ API endpoints đã test với Postman
✅ Frontend đã có Axios instance configured
✅ CORS đã enable ở backend
✅ Environment variables đã set
```

---

## 4.2 Axios Configuration

### Tạo Axios Instance với Interceptors

```javascript
// frontend/src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Token storage (in-memory cho security)
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ⚠️ QUAN TRỌNG: Để gửi cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Thêm token vào mỗi request
api.interceptors.request.use(
  (config) => {
    // Thêm access token nếu có
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Thêm cart session cho guest
    const cartSession = localStorage.getItem("cartSession");
    if (cartSession) {
      config.headers["X-Cart-Session"] = cartSession;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Không retry cho refresh endpoint (tránh infinite loop)
      if (originalRequest.url?.includes("/auth/refresh")) {
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Gọi refresh token
        const { data } = await api.post("/auth/refresh");
        setAccessToken(data.accessToken);

        // Retry request gốc với token mới
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

## 4.3 Service Layer Pattern

### Tại sao cần Service Layer?

```
❌ KHÔNG NÊN: Component gọi API trực tiếp
   → Duplicate code, khó test, khó maintain

✅ NÊN: Component → Service → API
   → Centralized, reusable, testable
```

### Ví dụ Auth Service

```javascript
// frontend/src/services/authService.js
import api, { setAccessToken, clearAccessToken } from "./api";

export const authService = {
  // Đăng nhập
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    setAccessToken(data.accessToken);
    return data.user;
  },

  // Đăng ký
  async register(userData) {
    const { data } = await api.post("/auth/register", userData);
    setAccessToken(data.accessToken);
    return data.user;
  },

  // Đăng xuất
  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAccessToken();
    }
  },

  // Kiểm tra auth status
  async checkAuth() {
    const { data } = await api.get("/auth/me");
    setAccessToken(data.accessToken);
    return data.user;
  },
};
```

---

## 4.4 Component Integration Example

### Login Form với API Integration

```jsx
// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useToast } from "@context/ToastContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      showToast("Login successful!", "success");
      navigate("/"); // Redirect về home
    } catch (error) {
      // Handle different error types
      if (error.response?.status === 401) {
        setErrors({ general: "Invalid email or password" });
      } else if (error.response?.data?.errors) {
        // Validation errors from backend
        const fieldErrors = {};
        error.response.data.errors.forEach((err) => {
          fieldErrors[err.path] = err.msg;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <div className="error">{errors.general}</div>}

      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

---

## 4.5 Testing Integration

### Checklist kiểm tra integration

```markdown
## Authentication

- [ ] Login thành công → Redirect về home
- [ ] Login sai password → Hiện error message
- [ ] Register thành công → Auto login
- [ ] Logout → Clear session, redirect login
- [ ] Refresh page → Vẫn logged in (refresh token)

## API Calls

- [ ] GET products → Hiển thị danh sách
- [ ] Add to cart → Cart count tăng
- [ ] Update profile → Data được lưu

## Error Handling

- [ ] Network error → Hiện thông báo
- [ ] 401 Unauthorized → Redirect login
- [ ] 500 Server error → Hiện error page
```

---

# Part 5: Common Issues & Solutions

> 🎯 **Phần này tổng hợp các lỗi thường gặp khi develop và cách fix**

## 5.1 CORS Errors

### Problem

```
Access to XMLHttpRequest at 'http://localhost:5000/api' from origin
'http://localhost:3000' has been blocked by CORS policy
```

### Solution

Ensure CORS is properly configured in `config/cors.js`:

```javascript
export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    // Allow localhost in development
    if (process.env.NODE_ENV !== "production") {
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
    }
    callback(null, true);
  },
  credentials: true, // CRITICAL for cookies
};
```

## 5.2 Cookie Not Being Set

### Problem

Refresh token cookie không được set ở browser.

### Solution

1. Ensure `withCredentials: true` in Axios:

```javascript
const api = axios.create({
  withCredentials: true, // Required for cookies
});
```

2. Ensure cookie options are correct:

```javascript
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // false for localhost
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
```

## 5.3 Token Refresh Loop

### Problem

App continuously tries to refresh token, causing infinite loop.

### Solution

Add flag to prevent retry on refresh endpoint:

```javascript
if (originalRequest.url?.includes("/auth/refresh")) {
  clearAccessToken();
  return Promise.reject(error);
}
```

## 5.4 Guest Cart Not Persisting

### Problem

Guest cart items disappear after refresh.

### Solution

Ensure cart session ID is stored and sent with requests:

```javascript
// In api.js request interceptor
const cartSession = localStorage.getItem("cartSession");
if (cartSession) {
  config.headers["X-Cart-Session"] = cartSession;
}
```

## 5.5 Password Validation Error

### Problem

Registration fails with password validation error.

### Solution

Password must meet all requirements:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

```javascript
// Validation regex
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
```

---

# Part 6: Testing

> 🎯 **Mục tiêu Part này:**
>
> - Setup automated testing với Jest (Backend) và Vitest (Frontend)
> - Viết unit tests cho các functions quan trọng
> - Có manual testing checklist đầy đủ

---

## 6.1 Manual Testing Checklist

### Authentication Flow

- [ ] Register with valid data
- [ ] Register with existing email (should fail)
- [ ] Login with valid credentials
- [ ] Login with wrong password (should fail)
- [ ] Logout clears session
- [ ] Token refresh works automatically
- [ ] Protected routes redirect to login
- [ ] Guest routes redirect authenticated users

### Cart Flow

- [ ] Guest can add items to cart
- [ ] Guest cart persists on refresh
- [ ] Logged in user cart syncs with server
- [ ] Cart merges after login
- [ ] Update quantity works
- [ ] Remove item works
- [ ] Clear cart works

### Profile Flow

- [ ] View profile information
- [ ] Update profile (name, phone)
- [ ] Change password with correct current password
- [ ] Change password with wrong current password (should fail)

### Password Reset Flow

- [ ] Request password reset
- [ ] Reset password with valid token
- [ ] Reset password with expired token (should fail)

### Order Flow

- [ ] Checkout from cart
- [ ] Guest checkout works
- [ ] Order confirmation email sent
- [ ] View order history
- [ ] Track order status
- [ ] Cancel order (if allowed)

### Admin Flow

- [ ] Admin can view all orders
- [ ] Admin can update order status
- [ ] Admin can create/edit/delete products
- [ ] Admin can view user list
- [ ] Admin dashboard shows statistics

---

## 6.2 Automated API Testing (BỔ SUNG MỚI) ⭐

> 🎯 **Mục đích:**
>
> - Tự động kiểm thử tất cả API endpoints
> - Đảm bảo tính nhất quán khi thay đổi code
> - Phát hiện lỗi sớm trước khi deploy
>
> 📅 **Ngày bổ sung:** 2025-01-10
> 📁 **File mới tạo:** `backend/tests/api-test.js`

### 6.2.1 Tạo Automated Test Suite

**📁 Vị trí file:** `fashion-website-backend/tests/api-test.js`

**🔧 Mục đích:**

- Kiểm thử tự động 65 API endpoints
- Chạy test bằng một lệnh duy nhất
- Xuất báo cáo JSON và console

```javascript
/**
 * Fashion Website API Test Suite
 * Kiểm thử tự động tất cả các API endpoints
 *
 * Cách chạy: node tests/api-test.js
 * Yêu cầu: Server đang chạy tại localhost:5000
 */

const BASE_URL = process.env.API_URL || "http://localhost:5000/api";

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: [],
};

// Stored data for chained tests
let accessToken = "";
let refreshToken = "";
let testProductId = "";
let cartItemId = "";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * HTTP Request Helper
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint
 * @param {object} body - Request body (optional)
 * @param {object} headers - Custom headers (optional)
 */
async function request(method, endpoint, body = null, headers = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));
    return {
      status: response.status,
      data,
      headers: Object.fromEntries(response.headers.entries()),
    };
  } catch (error) {
    return {
      status: 0,
      error: error.message,
      data: null,
    };
  }
}

/**
 * Test Runner - Chạy một test case và ghi kết quả
 */
async function runTest(testName, testFn) {
  testResults.total++;
  const startTime = Date.now();

  try {
    const result = await testFn();
    const duration = Date.now() - startTime;

    if (result.passed) {
      testResults.passed++;
      console.log(`${colors.green}✓${colors.reset} ${testName} (${duration}ms)`);
    } else {
      testResults.failed++;
      console.log(`${colors.red}✗${colors.reset} ${testName} (${duration}ms)`);
      console.log(`  Expected: ${result.expected}`);
      console.log(`  Actual: ${result.actual}`);
    }

    testResults.details.push({
      name: testName,
      passed: result.passed,
      duration,
      expected: result.expected,
      actual: result.actual,
    });
  } catch (error) {
    testResults.failed++;
    console.log(`${colors.red}✗${colors.reset} ${testName} - Error: ${error.message}`);
  }
}

// ============================================================
// TEST MODULES - Mỗi module kiểm thử một nhóm API
// ============================================================

// Chi tiết các test modules xem trong file đầy đủ
// Tests bao gồm: Health Check, Authentication, Products, Cart,
// Wishlist, Checkout, Orders, Profile
```

### 6.2.2 Ví dụ Test Cases

**🔐 Authentication Tests:**

```javascript
// Test đăng ký với dữ liệu hợp lệ
await runTest("Register - New user success (201)", async () => {
  const res = await request("POST", "/auth/register", {
    firstName: "Test",
    lastName: "User",
    email: `test_${Date.now()}@example.com`,
    password: "TestPassword123!",
    confirmPassword: "TestPassword123!",
  });
  return {
    passed: res.status === 201 && res.data.success === true,
    expected: "Status 201, success: true",
    actual: `Status ${res.status}, success: ${res.data?.success}`,
  };
});

// Test đăng nhập thành công
await runTest("Login - Valid credentials (200)", async () => {
  const res = await request("POST", "/auth/login", {
    email: "admin@example.com",
    password: "password123",
  });

  if (res.status === 200 && res.data.data?.accessToken) {
    accessToken = res.data.data.accessToken; // Lưu token cho các test sau
  }

  return {
    passed: res.status === 200 && res.data.success === true,
    expected: "Status 200, success: true",
    actual: `Status ${res.status}`,
  };
});
```

**📦 Product Tests:**

```javascript
// Test lọc sản phẩm theo giá
await runTest("Get Products - Price range filter (200)", async () => {
  const res = await request("GET", "/products?minPrice=50&maxPrice=200");
  return {
    passed: res.status === 200 && res.data.success === true,
    expected: "Status 200, success: true",
    actual: `Status ${res.status}`,
  };
});

// Test sắp xếp sản phẩm
// ⚠️ LƯU Ý: Sort parameter dùng format hyphenated: price-asc, price-desc, newest
await runTest("Get Products - Sort by price ascending (200)", async () => {
  const res = await request("GET", "/products?sort=price-asc");
  return {
    passed: res.status === 200 && res.data.success === true,
    expected: "Status 200, success: true",
    actual: `Status ${res.status}`,
  };
});
```

**🛒 Cart Tests:**

```javascript
// Test thêm sản phẩm vào giỏ hàng
await runTest("Add to Cart - Valid product (200)", async () => {
  const res = await request(
    "POST",
    "/cart/items",
    {
      productId: testProductId,
      quantity: 1,
    },
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );
  return {
    passed: [200, 201].includes(res.status) && res.data.success === true,
    expected: "Status 200 or 201, success: true",
    actual: `Status ${res.status}`,
  };
});
```

### 6.2.3 Cách chạy Test Suite

```bash
# Đảm bảo server đang chạy
cd fashion-website-backend
npm run dev

# Mở terminal mới và chạy test
node tests/api-test.js
```

### 6.2.4 Kết quả Test (65 Test Cases)

| Module            | Tests  | Pass Rate |
| ----------------- | ------ | --------- |
| 🏥 Health Check   | 3      | 100%      |
| 🔐 Authentication | 14     | 100%      |
| 📦 Products       | 14     | 100%      |
| 🛒 Cart           | 8      | 100%      |
| ❤️ Wishlist       | 7      | 100%      |
| 💳 Checkout       | 6      | 100%      |
| 📋 Orders         | 5      | 100%      |
| 👤 Profile        | 7      | 100%      |
| **TOTAL**         | **65** | **100%**  |

### 6.2.5 Các lưu ý quan trọng khi viết test

> ⚠️ **Những điểm cần chú ý (đã phát hiện trong quá trình test):**

| Vấn đề                | Giải pháp                                                                    |
| --------------------- | ---------------------------------------------------------------------------- |
| Sort parameter format | Dùng `price-asc`, `price-desc`, `newest` (không phải `sort=price&order=asc`) |
| Product sizes         | Array of objects: `[{ name: "M", stock: 40 }]` với name là enum              |
| Product colors        | Array of objects: `[{ name: "Black", hexCode: "#000000", stock: 50 }]`       |
| Rate limiting         | Auth endpoints có rate limit, có thể trả về 429                              |
| Guest cart            | Cần header `x-cart-session` cho guest users                                  |

---

## 6.3 Test Report (BỔ SUNG MỚI)

**📁 File báo cáo:** `fashion-website-backend/tests/API_TEST_REPORT.md`

File này được tự động tạo sau khi chạy test suite, bao gồm:

- Tổng quan kết quả (passed/failed/total)
- Chi tiết từng test case
- Thời gian thực thi
- Response data (để debug nếu fail)

---

# Part 7: Deployment

> 🎯 **Mục tiêu Part này:**
>
> - Containerize ứng dụng với Docker
> - Deploy lên cloud server (Ubuntu VPS)
> - Setup SSL/HTTPS với Nginx + Let's Encrypt
> - Configure CI/CD với GitHub Actions

(Xem nội dung chi tiết ở phần Part 7: Deployment Notes bên dưới)

---

# Part 8: Advanced Features (Cần bổ sung vào Codebase)

> ⚠️ **Lưu ý quan trọng**: Phần này mô tả các chức năng **CẦN BỔ SUNG** để hệ thống e-commerce hoàn chỉnh. Frontend đã có sẵn các service files (`orderService.js`, `checkoutService.js`) nhưng Backend chưa implement.
>
> 💡 **Khi nào làm phần này?** Sau khi đã deploy MVP thành công

---

## 8.1 Order System (Hệ thống Đơn hàng)

### 6.1.1 Order Model

```javascript
// backend/src/models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail: String,
  variant: {
    size: String,
    color: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  apartment: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "Vietnam",
  },
});

const orderSchema = new mongoose.Schema(
  {
    // Order identification
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },

    // Customer info - either user or guest
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    guestPhone: String,

    // Order items
    items: [orderItemSchema],

    // Addresses
    shippingAddress: {
      type: addressSchema,
      required: true,
    },
    billingAddress: addressSchema,
    sameAsShipping: {
      type: Boolean,
      default: true,
    },

    // Payment information
    payment: {
      method: {
        type: String,
        enum: ["stripe", "paypal", "cod", "bank_transfer"],
        required: true,
      },
      transactionId: String,
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded", "partially_refunded"],
        default: "pending",
      },
      paidAt: Date,
      refundedAt: Date,
      refundAmount: Number,
    },

    // Order status
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
        "refunded",
      ],
      default: "pending",
    },

    // Status history for tracking
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    // Pricing breakdown
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    shippingMethod: {
      type: String,
      enum: ["standard", "express", "overnight"],
      default: "standard",
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },

    // Coupon used
    coupon: {
      code: String,
      discount: Number,
      type: {
        type: String,
        enum: ["percentage", "fixed"],
      },
    },

    // Shipping tracking
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    deliveredAt: Date,

    // Cancellation
    cancelledAt: Date,
    cancelReason: String,
    cancelledBy: {
      type: String,
      enum: ["user", "admin", "system"],
    },

    // Return/Refund
    returnRequest: {
      requested: {
        type: Boolean,
        default: false,
      },
      requestedAt: Date,
      reason: String,
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed"],
      },
      processedAt: Date,
      processedBy: mongoose.Schema.Types.ObjectId,
    },

    // Additional info
    notes: String,
    internalNotes: String, // Admin only
    source: {
      type: String,
      enum: ["web", "mobile", "admin"],
      default: "web",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ "payment.status": 1 });
orderSchema.index({ guestEmail: 1 });
orderSchema.index({ createdAt: -1 });

// Generate unique order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Count orders today to generate sequence
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const count = await this.constructor.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const sequence = String(count + 1).padStart(4, "0");
    this.orderNumber = `ORD-${year}${month}${day}-${sequence}`;
  }

  // Add initial status to history
  if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      note: "Order created",
    });
  }

  next();
});

// Method to update status with history
orderSchema.methods.updateStatus = function (newStatus, note, updatedBy) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    note,
    updatedBy,
  });

  // Update relevant timestamps
  if (newStatus === "delivered") {
    this.deliveredAt = new Date();
  } else if (newStatus === "cancelled") {
    this.cancelledAt = new Date();
  }

  return this.save();
};

// Virtual for order age
orderSchema.virtual("age").get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Static method to get order statistics
orderSchema.statics.getStatistics = async function (startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        status: { $nin: ["cancelled", "refunded"] },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$total" },
        averageOrderValue: { $avg: "$total" },
      },
    },
  ]);
};

const Order = mongoose.model("Order", orderSchema);

export default Order;
```

### 6.1.2 Order Controller

```javascript
// backend/src/controllers/orderController.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";
import { sendOrderConfirmation, sendOrderStatusUpdate } from "../services/emailService.js";

/**
 * @desc    Create new order from cart
 * @route   POST /api/orders
 * @access  Private/Public (guest checkout)
 */
export const createOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingAddress,
    billingAddress,
    sameAsShipping,
    paymentMethod,
    notes,
    guestEmail,
    guestPhone,
  } = req.body;

  // Get cart
  const cartQuery = req.user ? { user: req.user._id } : { sessionId: req.sessionId };
  const cart = await Cart.findOne(cartQuery).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  // Validate stock and prepare order items
  const orderItems = [];
  for (const item of cart.items) {
    const product = item.product;

    if (!product || !product.isActive) {
      return next(
        new AppError(`Product ${item.product?.name || "unknown"} is no longer available`, 400)
      );
    }

    // Check stock
    if (product.trackInventory) {
      const availableStock = item.variant?.size
        ? product.sizes.find((s) => s.name === item.variant.size)?.stock || 0
        : product.stock;

      if (availableStock < item.quantity) {
        return next(
          new AppError(`Insufficient stock for ${product.name}. Available: ${availableStock}`, 400)
        );
      }
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      thumbnail: product.thumbnail,
      variant: item.variant,
      quantity: item.quantity,
      price: product.price,
      discount: product.compareAtPrice ? product.compareAtPrice - product.price : 0,
    });
  }

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 100 ? 0 : 7.99; // Free shipping over $100
  const tax = Number((subtotal * 0.1).toFixed(2)); // 10% tax
  const discount = cart.discount || 0;
  const total = Number((subtotal + shipping + tax - discount).toFixed(2));

  // Create order
  const orderData = {
    items: orderItems,
    shippingAddress,
    billingAddress: sameAsShipping ? shippingAddress : billingAddress,
    sameAsShipping,
    payment: {
      method: paymentMethod,
      status: paymentMethod === "cod" ? "pending" : "pending",
    },
    subtotal,
    shipping,
    tax,
    discount,
    total,
    notes,
  };

  // Attach user or guest info
  if (req.user) {
    orderData.user = req.user._id;
  } else {
    if (!guestEmail) {
      return next(new AppError("Email is required for guest checkout", 400));
    }
    orderData.guestEmail = guestEmail;
    orderData.guestPhone = guestPhone;
  }

  // Apply coupon if exists
  if (cart.coupon) {
    orderData.coupon = {
      code: cart.coupon.code,
      discount: cart.discount,
      type: cart.coupon.type,
    };
  }

  const order = await Order.create(orderData);

  // Deduct inventory
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (product.trackInventory) {
      if (item.variant?.size) {
        const sizeIndex = product.sizes.findIndex((s) => s.name === item.variant.size);
        if (sizeIndex !== -1) {
          product.sizes[sizeIndex].stock -= item.quantity;
        }
      } else {
        product.stock -= item.quantity;
      }
      await product.save();
    }
  }

  // Clear cart
  await Cart.findByIdAndDelete(cart._id);

  // Send confirmation email
  try {
    await sendOrderConfirmation(order);
  } catch (emailError) {
    console.error("Failed to send order confirmation email:", emailError);
    // Don't fail the order if email fails
  }

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: { order },
  });
});

/**
 * @desc    Get user's orders
 * @route   GET /api/orders
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = { user: req.user._id };

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  const [orders, total] = await Promise.all([
    Order.find(query).select("-internalNotes").sort("-createdAt").skip(skip).limit(limit).lean(),
    Order.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
      },
    },
  });
});

/**
 * @desc    Get single order
 * @route   GET /api/orders/:orderId
 * @access  Private
 */
export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.orderId,
    user: req.user._id,
  })
    .populate("items.product", "name slug thumbnail")
    .select("-internalNotes");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: { order },
  });
});

/**
 * @desc    Track order by order number (public)
 * @route   GET /api/orders/track/:orderNumber
 * @access  Public
 */
export const trackOrder = asyncHandler(async (req, res, next) => {
  const { orderNumber } = req.params;
  const { email } = req.query;

  const query = { orderNumber };

  // For guest orders, require email verification
  if (email) {
    query.guestEmail = email.toLowerCase();
  }

  const order = await Order.findOne(query)
    .select(
      "orderNumber status statusHistory items shippingAddress trackingNumber carrier estimatedDelivery deliveredAt createdAt"
    )
    .lean();

  if (!order) {
    return next(new AppError("Order not found. Please check your order number and email.", 404));
  }

  res.status(200).json({
    success: true,
    data: { order },
  });
});

/**
 * @desc    Cancel order
 * @route   POST /api/orders/:orderId/cancel
 * @access  Private
 */
export const cancelOrder = asyncHandler(async (req, res, next) => {
  const { reason } = req.body;

  const order = await Order.findOne({
    _id: req.params.orderId,
    user: req.user._id,
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Check if order can be cancelled
  const nonCancellableStatuses = [
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "refunded",
  ];
  if (nonCancellableStatuses.includes(order.status)) {
    return next(new AppError(`Order cannot be cancelled. Current status: ${order.status}`, 400));
  }

  // Update order
  order.status = "cancelled";
  order.cancelledAt = new Date();
  order.cancelReason = reason;
  order.cancelledBy = "user";
  order.statusHistory.push({
    status: "cancelled",
    timestamp: new Date(),
    note: `Cancelled by customer. Reason: ${reason}`,
    updatedBy: req.user._id,
  });

  await order.save();

  // Restore inventory
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product && product.trackInventory) {
      if (item.variant?.size) {
        const sizeIndex = product.sizes.findIndex((s) => s.name === item.variant.size);
        if (sizeIndex !== -1) {
          product.sizes[sizeIndex].stock += item.quantity;
        }
      } else {
        product.stock += item.quantity;
      }
      await product.save();
    }
  }

  // Send cancellation email
  try {
    await sendOrderStatusUpdate(order, "cancelled");
  } catch (emailError) {
    console.error("Failed to send cancellation email:", emailError);
  }

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: { order },
  });
});

/**
 * @desc    Request return
 * @route   POST /api/orders/:orderId/return
 * @access  Private
 */
export const requestReturn = asyncHandler(async (req, res, next) => {
  const { reason } = req.body;

  const order = await Order.findOne({
    _id: req.params.orderId,
    user: req.user._id,
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  if (order.status !== "delivered") {
    return next(new AppError("Only delivered orders can be returned", 400));
  }

  // Check return window (e.g., 30 days)
  const returnWindow = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
  if (Date.now() - order.deliveredAt > returnWindow) {
    return next(new AppError("Return window has expired (30 days from delivery)", 400));
  }

  if (order.returnRequest?.requested) {
    return next(new AppError("Return request already submitted", 400));
  }

  order.returnRequest = {
    requested: true,
    requestedAt: new Date(),
    reason,
    status: "pending",
  };

  order.statusHistory.push({
    status: "return_requested",
    timestamp: new Date(),
    note: `Return requested. Reason: ${reason}`,
    updatedBy: req.user._id,
  });

  await order.save();

  res.status(200).json({
    success: true,
    message: "Return request submitted successfully",
    data: { order },
  });
});
```

### 6.1.3 Order Routes

```javascript
// backend/src/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrder,
  trackOrder,
  cancelOrder,
  requestReturn,
} from "../controllers/orderController.js";
import { protect, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/track/:orderNumber", trackOrder);

// Protected routes - require authentication
router.use(protect);

router.route("/").get(getMyOrders).post(createOrder);

router.route("/:orderId").get(getOrder);

router.post("/:orderId/cancel", cancelOrder);
router.post("/:orderId/return", requestReturn);

export default router;
```

---

## 8.2 Checkout System

### 8.2.1 Checkout Controller

```javascript
// backend/src/controllers/checkoutController.js
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

// Constants
const TAX_RATE = 0.1; // 10%
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_RATES = {
  standard: 7.99,
  express: 14.99,
  overnight: 24.99,
};

/**
 * @desc    Initialize checkout - validate cart and return summary
 * @route   POST /api/checkout/initialize
 * @access  Private/Public
 */
export const initializeCheckout = asyncHandler(async (req, res, next) => {
  const cartQuery = req.user ? { user: req.user._id } : { sessionId: req.sessionId };
  const cart = await Cart.findOne(cartQuery).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  // Validate all items are still available
  const validationErrors = [];
  const validItems = [];

  for (const item of cart.items) {
    const product = item.product;

    if (!product || !product.isActive) {
      validationErrors.push({
        productId: item.product?._id,
        message: "Product is no longer available",
      });
      continue;
    }

    // Check stock
    if (product.trackInventory) {
      const availableStock = item.variant?.size
        ? product.sizes.find((s) => s.name === item.variant.size)?.stock || 0
        : product.stock;

      if (availableStock === 0) {
        validationErrors.push({
          productId: product._id,
          name: product.name,
          message: "Out of stock",
        });
        continue;
      }

      if (availableStock < item.quantity) {
        validationErrors.push({
          productId: product._id,
          name: product.name,
          message: `Only ${availableStock} available`,
          availableStock,
        });
      }
    }

    validItems.push({
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
      },
      variant: item.variant,
      quantity: Math.min(item.quantity, product.stock),
      price: product.price,
    });
  }

  // Calculate totals
  const subtotal = validItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.status(200).json({
    success: true,
    data: {
      items: validItems,
      subtotal,
      validationErrors: validationErrors.length > 0 ? validationErrors : null,
      shippingOptions: Object.entries(SHIPPING_RATES).map(([method, cost]) => ({
        method,
        cost: subtotal >= FREE_SHIPPING_THRESHOLD && method === "standard" ? 0 : cost,
        estimatedDays:
          method === "standard"
            ? "5-7 business days"
            : method === "express"
              ? "2-3 business days"
              : "Next business day",
      })),
    },
  });
});

/**
 * @desc    Calculate shipping rates based on address
 * @route   POST /api/checkout/shipping-rates
 * @access  Private/Public
 */
export const getShippingRates = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;
  const cartQuery = req.user ? { user: req.user._id } : { sessionId: req.sessionId };
  const cart = await Cart.findOne(cartQuery);

  const subtotal = cart?.subtotal || 0;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  // In real app, call shipping carrier APIs (UPS, FedEx, etc.)
  const rates = [
    {
      id: "standard",
      name: "Standard Shipping",
      cost: freeShipping ? 0 : SHIPPING_RATES.standard,
      estimatedDays: "5-7 business days",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "express",
      name: "Express Shipping",
      cost: SHIPPING_RATES.express,
      estimatedDays: "2-3 business days",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      cost: SHIPPING_RATES.overnight,
      estimatedDays: "Next business day",
      estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
  ];

  res.status(200).json({
    success: true,
    data: { rates, freeShippingThreshold: FREE_SHIPPING_THRESHOLD },
  });
});

/**
 * @desc    Calculate tax based on shipping address
 * @route   POST /api/checkout/calculate-tax
 * @access  Private/Public
 */
export const calculateTax = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;
  const cartQuery = req.user ? { user: req.user._id } : { sessionId: req.sessionId };
  const cart = await Cart.findOne(cartQuery);

  const subtotal = cart?.subtotal || 0;

  // In real app, use tax calculation service (TaxJar, Avalara, etc.)
  // Different rates by state/country
  let taxRate = TAX_RATE;

  // Example: Different tax rates by state
  const stateTaxRates = {
    CA: 0.0725,
    NY: 0.08,
    TX: 0.0625,
    FL: 0.06,
    // Add more states...
  };

  if (shippingAddress?.state && stateTaxRates[shippingAddress.state]) {
    taxRate = stateTaxRates[shippingAddress.state];
  }

  const tax = Number((subtotal * taxRate).toFixed(2));

  res.status(200).json({
    success: true,
    data: {
      taxRate,
      taxAmount: tax,
      subtotal,
    },
  });
});

/**
 * @desc    Create payment intent (Stripe)
 * @route   POST /api/checkout/create-payment-intent
 * @access  Private/Public
 */
export const createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { shippingMethod, shippingAddress } = req.body;

  const cartQuery = req.user ? { user: req.user._id } : { sessionId: req.sessionId };
  const cart = await Cart.findOne(cartQuery).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  // Calculate totals
  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD && shippingMethod === "standard"
      ? 0
      : SHIPPING_RATES[shippingMethod] || SHIPPING_RATES.standard;

  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const discount = cart.discount || 0;
  const total = Number((subtotal + shipping + tax - discount).toFixed(2));

  // In real app, create Stripe PaymentIntent
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: Math.round(total * 100), // Stripe uses cents
  //   currency: 'usd',
  //   metadata: { cartId: cart._id.toString() }
  // });

  // Mock response for development
  const mockPaymentIntent = {
    id: `pi_${Date.now()}_mock`,
    clientSecret: `pi_${Date.now()}_secret_mock`,
    amount: Math.round(total * 100),
  };

  res.status(200).json({
    success: true,
    data: {
      clientSecret: mockPaymentIntent.clientSecret,
      paymentIntentId: mockPaymentIntent.id,
      orderSummary: {
        subtotal,
        shipping,
        tax,
        discount,
        total,
      },
    },
  });
});

/**
 * @desc    Complete order after payment
 * @route   POST /api/checkout/complete
 * @access  Private/Public
 */
export const completeOrder = asyncHandler(async (req, res, next) => {
  const {
    paymentIntentId,
    shippingAddress,
    billingAddress,
    sameAsShipping,
    shippingMethod,
    notes,
    guestEmail,
    guestPhone,
  } = req.body;

  // In real app, verify payment with Stripe
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  // if (paymentIntent.status !== 'succeeded') {
  //   return next(new AppError('Payment not completed', 400));
  // }

  // Get and validate cart
  const cartQuery = req.user ? { user: req.user._id } : { sessionId: req.sessionId };
  const cart = await Cart.findOne(cartQuery).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  // Create order items
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    thumbnail: item.product.thumbnail,
    variant: item.variant,
    quantity: item.quantity,
    price: item.product.price,
  }));

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD && shippingMethod === "standard"
      ? 0
      : SHIPPING_RATES[shippingMethod] || SHIPPING_RATES.standard;
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const discount = cart.discount || 0;
  const total = Number((subtotal + shipping + tax - discount).toFixed(2));

  // Create order
  const orderData = {
    items: orderItems,
    shippingAddress,
    billingAddress: sameAsShipping ? shippingAddress : billingAddress,
    sameAsShipping,
    payment: {
      method: "stripe",
      transactionId: paymentIntentId,
      status: "paid",
      paidAt: new Date(),
    },
    status: "confirmed",
    subtotal,
    shipping,
    shippingMethod,
    tax,
    discount,
    total,
    notes,
    estimatedDelivery: new Date(
      Date.now() +
        (shippingMethod === "overnight" ? 1 : shippingMethod === "express" ? 3 : 7) *
          24 *
          60 *
          60 *
          1000
    ),
  };

  if (req.user) {
    orderData.user = req.user._id;
  } else {
    orderData.guestEmail = guestEmail;
    orderData.guestPhone = guestPhone;
  }

  if (cart.coupon) {
    orderData.coupon = {
      code: cart.coupon.code,
      discount: cart.discount,
      type: cart.coupon.type,
    };
  }

  const order = await Order.create(orderData);

  // Update order status history
  order.statusHistory.push({
    status: "confirmed",
    timestamp: new Date(),
    note: "Payment received",
  });
  await order.save();

  // Deduct inventory
  for (const item of cart.items) {
    const product = item.product;
    if (product.trackInventory) {
      if (item.variant?.size) {
        const sizeIndex = product.sizes.findIndex((s) => s.name === item.variant.size);
        if (sizeIndex !== -1) {
          product.sizes[sizeIndex].stock -= item.quantity;
        }
      } else {
        product.stock -= item.quantity;
      }
      await product.save();
    }
  }

  // Clear cart
  await Cart.findByIdAndDelete(cart._id);

  // Send confirmation email (async, don't wait)
  // sendOrderConfirmation(order).catch(console.error);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: {
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
        estimatedDelivery: order.estimatedDelivery,
      },
    },
  });
});
```

### 8.2.2 Checkout Routes

```javascript
// backend/src/routes/checkoutRoutes.js
import express from "express";
import {
  initializeCheckout,
  getShippingRates,
  calculateTax,
  createPaymentIntent,
  completeOrder,
} from "../controllers/checkoutController.js";
import { optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// All checkout routes support both authenticated and guest users
router.use(optionalAuth);

router.post("/initialize", initializeCheckout);
router.post("/shipping-rates", getShippingRates);
router.post("/calculate-tax", calculateTax);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/complete", completeOrder);

export default router;
```

---

## 8.3 Email Service

### 8.3.1 Email Service Implementation

```javascript
// backend/src/services/emailService.js
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter
const createTransporter = () => {
  // For development, use ethereal.email or mailtrap
  if (process.env.NODE_ENV !== "production") {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.mailtrap.io",
      port: process.env.SMTP_PORT || 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // For production, use real SMTP service
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();

// Email templates
const templates = {
  welcome: (data) => ({
    subject: "Welcome to Fashion Store!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome, ${data.firstName}!</h1>
        <p>Thank you for creating an account with Fashion Store.</p>
        <p>Start shopping now and discover the latest trends!</p>
        <a href="${process.env.CLIENT_URL}/products" 
           style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
          Shop Now
        </a>
      </div>
    `,
  }),

  passwordReset: (data) => ({
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p>Hi ${data.firstName},</p>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <a href="${data.resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
          This link will expire in 1 hour. If you didn't request this, please ignore this email.
        </p>
      </div>
    `,
  }),

  orderConfirmation: (data) => ({
    subject: `Order Confirmed - #${data.order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Thank You for Your Order!</h1>
        <p>Order Number: <strong>${data.order.orderNumber}</strong></p>
        
        <h2 style="margin-top: 30px;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${data.order.items
              .map(
                (item) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                  ${item.name}
                  ${item.variant?.size ? `<br><small>Size: ${item.variant.size}</small>` : ""}
                </td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right;">Subtotal:</td>
              <td style="padding: 10px; text-align: right;">$${data.order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right;">Shipping:</td>
              <td style="padding: 10px; text-align: right;">$${data.order.shipping.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right;">Tax:</td>
              <td style="padding: 10px; text-align: right;">$${data.order.tax.toFixed(2)}</td>
            </tr>
            ${
              data.order.discount > 0
                ? `
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; color: green;">Discount:</td>
                <td style="padding: 10px; text-align: right; color: green;">-$${data.order.discount.toFixed(2)}</td>
              </tr>
            `
                : ""
            }
            <tr style="font-weight: bold; font-size: 18px;">
              <td colspan="2" style="padding: 10px; text-align: right;">Total:</td>
              <td style="padding: 10px; text-align: right;">$${data.order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        
        <h2 style="margin-top: 30px;">Shipping Address</h2>
        <p>
          ${data.order.shippingAddress.fullName}<br>
          ${data.order.shippingAddress.street}<br>
          ${data.order.shippingAddress.apartment ? data.order.shippingAddress.apartment + "<br>" : ""}
          ${data.order.shippingAddress.city}, ${data.order.shippingAddress.state} ${data.order.shippingAddress.zipCode}<br>
          ${data.order.shippingAddress.country}
        </p>
        
        <p style="margin-top: 30px;">
          <a href="${process.env.CLIENT_URL}/orders/${data.order._id}" 
             style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
            Track Your Order
          </a>
        </p>
      </div>
    `,
  }),

  orderStatusUpdate: (data) => ({
    subject: `Order Update - #${data.order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Order Status Update</h1>
        <p>Your order <strong>#${data.order.orderNumber}</strong> status has been updated to:</p>
        <h2 style="color: #007bff; text-transform: capitalize;">${data.status.replace(/_/g, " ")}</h2>
        
        ${
          data.trackingNumber
            ? `
          <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
          <p><strong>Carrier:</strong> ${data.carrier}</p>
        `
            : ""
        }
        
        <p style="margin-top: 30px;">
          <a href="${process.env.CLIENT_URL}/orders/track/${data.order.orderNumber}" 
             style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
            Track Your Order
          </a>
        </p>
      </div>
    `,
  }),
};

// Send email function
export const sendEmail = async (to, templateName, data) => {
  try {
    const template = templates[templateName];
    if (!template) {
      throw new Error(`Email template "${templateName}" not found`);
    }

    const { subject, html } = template(data);

    const mailOptions = {
      from: `"Fashion Store" <${process.env.FROM_EMAIL || "noreply@fashionstore.com"}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

// Convenience functions
export const sendWelcomeEmail = (user) => {
  return sendEmail(user.email, "welcome", { firstName: user.firstName });
};

export const sendPasswordResetEmail = (user, resetUrl) => {
  return sendEmail(user.email, "passwordReset", { firstName: user.firstName, resetUrl });
};

export const sendOrderConfirmation = (order) => {
  const email = order.user?.email || order.guestEmail;
  return sendEmail(email, "orderConfirmation", { order });
};

export const sendOrderStatusUpdate = (order, status, trackingInfo = {}) => {
  const email = order.user?.email || order.guestEmail;
  return sendEmail(email, "orderStatusUpdate", {
    order,
    status,
    ...trackingInfo,
  });
};
```

### 8.3.2 Update Auth Controller để gửi email

```javascript
// Trong forgotPassword controller, thay thế TODO bằng:
import { sendPasswordResetEmail } from "../services/emailService.js";

// Inside forgotPassword function:
const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
await sendPasswordResetEmail(user, resetUrl);
```

---

## 8.4 Review & Rating System

### 8.4.1 Review Model

```javascript
// backend/src/models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment"],
      trim: true,
      maxlength: [2000, "Review cannot exceed 2000 characters"],
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    pros: [String],
    cons: [String],
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    helpfulVotes: {
      type: Number,
      default: 0,
    },
    votedBy: [
      {
        user: mongoose.Schema.Types.ObjectId,
        helpful: Boolean,
      },
    ],
    reportCount: {
      type: Number,
      default: 0,
    },
    reportedBy: [
      {
        user: mongoose.Schema.Types.ObjectId,
        reason: String,
        reportedAt: Date,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminResponse: {
      comment: String,
      respondedAt: Date,
      respondedBy: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
reviewSchema.index({ product: 1, user: 1 }, { unique: true }); // One review per user per product
reviewSchema.index({ product: 1, status: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: 1 });

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId, status: "approved" } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
        ratingDistribution: {
          $push: "$rating",
        },
      },
    },
  ]);

  if (stats.length > 0) {
    // Calculate rating distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].ratingDistribution.forEach((rating) => {
      distribution[rating]++;
    });

    await mongoose.model("Product").findByIdAndUpdate(productId, {
      "ratings.average": Math.round(stats[0].averageRating * 10) / 10,
      "ratings.count": stats[0].numReviews,
      "ratings.distribution": distribution,
    });
  } else {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      "ratings.average": 0,
      "ratings.count": 0,
      "ratings.distribution": { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
  }
};

// Post-save hook
reviewSchema.post("save", function () {
  this.constructor.calculateAverageRating(this.product);
});

// Post-remove hook
reviewSchema.post("remove", function () {
  this.constructor.calculateAverageRating(this.product);
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
```

### 8.4.2 Review Controller

```javascript
// backend/src/controllers/reviewController.js
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get reviews for a product
 * @route   GET /api/products/:productId/reviews
 * @access  Public
 */
export const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build query
  const query = { product: productId, status: "approved" };

  // Filter by rating
  if (req.query.rating) {
    query.rating = parseInt(req.query.rating, 10);
  }

  // Filter by verified purchase
  if (req.query.verified === "true") {
    query.isVerifiedPurchase = true;
  }

  // Sort options
  let sort = "-createdAt";
  if (req.query.sort === "helpful") {
    sort = "-helpfulVotes";
  } else if (req.query.sort === "rating-high") {
    sort = "-rating";
  } else if (req.query.sort === "rating-low") {
    sort = "rating";
  }

  const [reviews, total] = await Promise.all([
    Review.find(query)
      .populate("user", "firstName lastName")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Review.countDocuments(query),
  ]);

  // Get rating summary
  const ratingStats = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId), status: "approved" } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalReviews: total,
      },
      summary: ratingStats[0] || { averageRating: 0, totalReviews: 0 },
    },
  });
});

/**
 * @desc    Create a review
 * @route   POST /api/products/:productId/reviews
 * @access  Private
 */
export const createReview = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { rating, title, comment, pros, cons } = req.body;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Check if user already reviewed this product
  const existingReview = await Review.findOne({
    product: productId,
    user: req.user._id,
  });

  if (existingReview) {
    return next(new AppError("You have already reviewed this product", 400));
  }

  // Check if user has purchased this product
  const order = await Order.findOne({
    user: req.user._id,
    "items.product": productId,
    status: "delivered",
  });

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    order: order?._id,
    rating,
    title,
    comment,
    pros: pros || [],
    cons: cons || [],
    isVerifiedPurchase: !!order,
    status: "pending", // Require moderation
  });

  res.status(201).json({
    success: true,
    message: "Review submitted successfully. It will be visible after moderation.",
    data: { review },
  });
});

/**
 * @desc    Update a review
 * @route   PUT /api/products/:productId/reviews/:reviewId
 * @access  Private
 */
export const updateReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, title, comment, pros, cons } = req.body;

  const review = await Review.findOne({
    _id: reviewId,
    user: req.user._id,
  });

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  // Update fields
  if (rating) review.rating = rating;
  if (title !== undefined) review.title = title;
  if (comment) review.comment = comment;
  if (pros) review.pros = pros;
  if (cons) review.cons = cons;

  // Reset status for re-moderation
  review.status = "pending";

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully. It will be visible after moderation.",
    data: { review },
  });
});

/**
 * @desc    Delete a review
 * @route   DELETE /api/products/:productId/reviews/:reviewId
 * @access  Private
 */
export const deleteReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findOne({
    _id: reviewId,
    user: req.user._id,
  });

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  const productId = review.product;
  await review.deleteOne();

  // Recalculate product rating
  await Review.calculateAverageRating(productId);

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

/**
 * @desc    Vote on a review (helpful/not helpful)
 * @route   POST /api/reviews/:reviewId/vote
 * @access  Private
 */
export const voteReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const { helpful } = req.body;

  const review = await Review.findById(reviewId);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  // Check if user already voted
  const existingVoteIndex = review.votedBy.findIndex(
    (vote) => vote.user.toString() === req.user._id.toString()
  );

  if (existingVoteIndex !== -1) {
    // Update existing vote
    const oldVote = review.votedBy[existingVoteIndex].helpful;
    review.votedBy[existingVoteIndex].helpful = helpful;

    // Update helpful count
    if (oldVote !== helpful) {
      review.helpfulVotes += helpful ? 1 : -1;
    }
  } else {
    // Add new vote
    review.votedBy.push({ user: req.user._id, helpful });
    if (helpful) {
      review.helpfulVotes += 1;
    }
  }

  await review.save();

  res.status(200).json({
    success: true,
    data: { helpfulVotes: review.helpfulVotes },
  });
});
```

### 8.4.3 Review Routes

```javascript
// backend/src/routes/reviewRoutes.js
import express from "express";
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  voteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true }); // Merge params from parent router

// Public routes
router.get("/", getProductReviews);

// Protected routes
router.post("/", protect, createReview);
router.put("/:reviewId", protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);
router.post("/:reviewId/vote", protect, voteReview);

export default router;
```

---

## 8.5 Coupon System

### 8.5.1 Coupon Model

```javascript
// backend/src/models/Coupon.js
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: [20, "Coupon code cannot exceed 20 characters"],
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    type: {
      type: String,
      required: [true, "Coupon type is required"],
      enum: ["percentage", "fixed", "free_shipping"],
    },
    value: {
      type: Number,
      required: [true, "Coupon value is required"],
      min: [0, "Value cannot be negative"],
      validate: {
        validator: function (v) {
          // Percentage must be <= 100
          if (this.type === "percentage" && v > 100) {
            return false;
          }
          return true;
        },
        message: "Percentage discount cannot exceed 100%",
      },
    },
    minPurchase: {
      type: Number,
      default: 0,
      min: [0, "Minimum purchase cannot be negative"],
    },
    maxDiscount: {
      type: Number,
      min: [0, "Maximum discount cannot be negative"],
    },
    usageLimit: {
      type: Number,
      min: [1, "Usage limit must be at least 1"],
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    perUserLimit: {
      type: Number,
      default: 1,
      min: [1, "Per user limit must be at least 1"],
    },
    usedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        usedAt: {
          type: Date,
          default: Date.now,
        },
        orderId: mongoose.Schema.Types.ObjectId,
      },
    ],
    applicableProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    applicableCategories: [String],
    excludedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFirstOrderOnly: {
      type: Boolean,
      default: false,
    },
    isNewCustomerOnly: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

// Virtual to check if coupon is valid
couponSchema.virtual("isValid").get(function () {
  const now = new Date();
  return (
    this.isActive &&
    now >= this.startDate &&
    now <= this.endDate &&
    (!this.usageLimit || this.usageCount < this.usageLimit)
  );
});

// Method to validate coupon for a user and cart
couponSchema.methods.validateForUser = async function (userId, cartTotal) {
  const errors = [];

  // Check if active
  if (!this.isActive) {
    errors.push("This coupon is no longer active");
  }

  // Check dates
  const now = new Date();
  if (now < this.startDate) {
    errors.push("This coupon is not yet valid");
  }
  if (now > this.endDate) {
    errors.push("This coupon has expired");
  }

  // Check usage limit
  if (this.usageLimit && this.usageCount >= this.usageLimit) {
    errors.push("This coupon has reached its usage limit");
  }

  // Check minimum purchase
  if (cartTotal < this.minPurchase) {
    errors.push(`Minimum purchase of $${this.minPurchase} required`);
  }

  // Check per-user limit
  if (userId) {
    const userUsageCount = this.usedBy.filter(
      (u) => u.user.toString() === userId.toString()
    ).length;

    if (userUsageCount >= this.perUserLimit) {
      errors.push("You have already used this coupon the maximum number of times");
    }

    // Check first order only
    if (this.isFirstOrderOnly) {
      const Order = mongoose.model("Order");
      const previousOrders = await Order.countDocuments({ user: userId });
      if (previousOrders > 0) {
        errors.push("This coupon is only valid for first orders");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Method to calculate discount
couponSchema.methods.calculateDiscount = function (cartTotal) {
  if (!this.isValid) return 0;

  let discount = 0;

  switch (this.type) {
    case "percentage":
      discount = (cartTotal * this.value) / 100;
      break;
    case "fixed":
      discount = this.value;
      break;
    case "free_shipping":
      // Handled separately in checkout
      discount = 0;
      break;
  }

  // Apply max discount cap
  if (this.maxDiscount && discount > this.maxDiscount) {
    discount = this.maxDiscount;
  }

  // Don't exceed cart total
  if (discount > cartTotal) {
    discount = cartTotal;
  }

  return Number(discount.toFixed(2));
};

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
```

---

## 8.6 Admin Panel APIs

### 8.6.1 Admin Middleware

```javascript
// backend/src/middleware/admin.js
import { AppError } from "./errorHandler.js";

export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Authentication required", 401));
  }

  if (req.user.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }

  next();
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(`Required role: ${roles.join(" or ")}`, 403));
    }

    next();
  };
};
```

### 8.6.2 Admin Controller

```javascript
// backend/src/controllers/adminController.js
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // Current month stats
  const [
    currentMonthOrders,
    lastMonthOrders,
    totalUsers,
    totalProducts,
    pendingOrders,
    lowStockProducts,
  ] = await Promise.all([
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          status: { $nin: ["cancelled", "refunded"] },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
        },
      },
    ]),
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
          status: { $nin: ["cancelled", "refunded"] },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
        },
      },
    ]),
    User.countDocuments({ isActive: true }),
    Product.countDocuments({ isActive: true }),
    Order.countDocuments({ status: "pending" }),
    Product.countDocuments({
      isActive: true,
      trackInventory: true,
      $expr: { $lte: ["$stock", "$lowStockThreshold"] },
    }),
  ]);

  // Recent orders
  const recentOrders = await Order.find()
    .select("orderNumber status total createdAt")
    .populate("user", "firstName lastName email")
    .sort("-createdAt")
    .limit(10)
    .lean();

  // Revenue by day (last 30 days)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const revenueByDay = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo },
        status: { $nin: ["cancelled", "refunded"] },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$total" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Top selling products
  const topProducts = await Order.aggregate([
    { $match: { status: { $nin: ["cancelled", "refunded"] } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $project: {
        name: "$product.name",
        thumbnail: "$product.thumbnail",
        totalSold: 1,
        revenue: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: {
        currentMonth: currentMonthOrders[0] || { totalOrders: 0, totalRevenue: 0 },
        lastMonth: lastMonthOrders[0] || { totalOrders: 0, totalRevenue: 0 },
        totalUsers,
        totalProducts,
        pendingOrders,
        lowStockProducts,
      },
      recentOrders,
      revenueByDay,
      topProducts,
    },
  });
});

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/admin/orders
 * @access  Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  // Build query
  const query = {};

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.paymentStatus) {
    query["payment.status"] = req.query.paymentStatus;
  }

  if (req.query.search) {
    query.$or = [
      { orderNumber: { $regex: req.query.search, $options: "i" } },
      { guestEmail: { $regex: req.query.search, $options: "i" } },
    ];
  }

  if (req.query.startDate || req.query.endDate) {
    query.createdAt = {};
    if (req.query.startDate) {
      query.createdAt.$gte = new Date(req.query.startDate);
    }
    if (req.query.endDate) {
      query.createdAt.$lte = new Date(req.query.endDate);
    }
  }

  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate("user", "firstName lastName email")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
      },
    },
  });
});

/**
 * @desc    Update order status (admin)
 * @route   PATCH /api/admin/orders/:orderId/status
 * @access  Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status, note, trackingNumber, carrier } = req.body;

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Update status
  order.status = status;
  order.statusHistory.push({
    status,
    timestamp: new Date(),
    note,
    updatedBy: req.user._id,
  });

  // Update tracking info if provided
  if (trackingNumber) {
    order.trackingNumber = trackingNumber;
  }
  if (carrier) {
    order.carrier = carrier;
  }

  // Set relevant timestamps
  if (status === "delivered") {
    order.deliveredAt = new Date();
  } else if (status === "cancelled") {
    order.cancelledAt = new Date();
    order.cancelledBy = "admin";
  } else if (status === "shipped") {
    // Estimate delivery based on shipping method
    const daysToAdd =
      order.shippingMethod === "overnight" ? 1 : order.shippingMethod === "express" ? 3 : 7;
    order.estimatedDelivery = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
  }

  await order.save();

  // Send status update email
  // sendOrderStatusUpdate(order, status, { trackingNumber, carrier }).catch(console.error);

  res.status(200).json({
    success: true,
    message: "Order status updated",
    data: { order },
  });
});

/**
 * @desc    Get all users (admin)
 * @route   GET /api/admin/users
 * @access  Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.role) {
    query.role = req.query.role;
  }

  if (req.query.isActive !== undefined) {
    query.isActive = req.query.isActive === "true";
  }

  if (req.query.search) {
    query.$or = [
      { firstName: { $regex: req.query.search, $options: "i" } },
      { lastName: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .select("-password -refreshToken")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
      },
    },
  });
});

/**
 * @desc    Update user (admin)
 * @route   PATCH /api/admin/users/:userId
 * @access  Admin
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  const { role, isActive } = req.body;

  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Prevent admin from demoting themselves
  if (req.user._id.toString() === user._id.toString()) {
    return next(new AppError("You cannot modify your own account", 400));
  }

  if (role !== undefined) {
    user.role = role;
  }

  if (isActive !== undefined) {
    user.isActive = isActive;
    if (!isActive) {
      // Invalidate user sessions
      user.refreshToken = null;
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: { user },
  });
});

/**
 * @desc    Moderate review (admin)
 * @route   PATCH /api/admin/reviews/:reviewId
 * @access  Admin
 */
export const moderateReview = asyncHandler(async (req, res, next) => {
  const { status, adminResponse } = req.body;

  const review = await Review.findById(req.params.reviewId);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  review.status = status;

  if (adminResponse) {
    review.adminResponse = {
      comment: adminResponse,
      respondedAt: new Date(),
      respondedBy: req.user._id,
    };
  }

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review moderated successfully",
    data: { review },
  });
});
```

### 8.6.3 Admin Routes

```javascript
// backend/src/routes/adminRoutes.js
import express from "express";
import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUser,
  moderateReview,
} from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(requireAdmin);

// Dashboard
router.get("/dashboard", getDashboardStats);

// Orders management
router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

// Users management
router.get("/users", getAllUsers);
router.patch("/users/:userId", updateUser);

// Reviews moderation
router.patch("/reviews/:reviewId", moderateReview);

export default router;
```

---

## 8.7 CartContext (Frontend - Đã có trong codebase)

> ℹ️ **Lưu ý**: `CartContext.jsx` đã được implement trong codebase (548 dòng). Dưới đây là tài liệu chi tiết.

### 6.7.1 Cấu trúc CartContext

```jsx
// frontend/src/context/CartContext.jsx

// Constants
const TAX_RATE = 0.1; // 10% tax
const FREE_SHIPPING_THRESHOLD = 100; // Free shipping above $100
const SHIPPING_COST = 7.99;

// Action Types
const CART_ACTIONS = {
  CART_START: "CART_START",
  CART_SUCCESS: "CART_SUCCESS",
  CART_FAILURE: "CART_FAILURE",
  CLEAR_CART: "CLEAR_CART",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  OPTIMISTIC_UPDATE: "OPTIMISTIC_UPDATE",
  OPEN_CART: "OPEN_CART",
  CLOSE_CART: "CLOSE_CART",
  TOGGLE_CART: "TOGGLE_CART",
};

// Initial State
const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  coupon: null,
  itemCount: 0,
  status: CART_STATUS.IDLE,
  error: null,
  isLoading: true,
  isOpen: false, // Cart drawer UI state
};
```

### 6.7.2 Các methods quan trọng

```jsx
// Trong CartProvider:

// Fetch cart from server
const fetchCart = useCallback(async () => {
  dispatch({ type: CART_ACTIONS.CART_START });
  try {
    const cart = await cartService.getCart();
    dispatch({ type: CART_ACTIONS.CART_SUCCESS, payload: { cart } });
  } catch (error) {
    dispatch({ type: CART_ACTIONS.CART_FAILURE, payload: { error: error.message } });
  }
}, []);

// Add to cart with optimistic update
const addToCart = useCallback(
  async (productId, quantity = 1, variant = null) => {
    // Optimistic update
    const optimisticItems = [...state.items];
    // ... add item to optimisticItems
    dispatch({ type: CART_ACTIONS.OPTIMISTIC_UPDATE, payload: { items: optimisticItems } });

    try {
      const cart = await cartService.addItem(productId, quantity, variant);
      dispatch({ type: CART_ACTIONS.CART_SUCCESS, payload: { cart } });
      return { success: true };
    } catch (error) {
      // Rollback on error
      await fetchCart();
      return { success: false, error: error.message };
    }
  },
  [state.items, fetchCart]
);

// Similar patterns for updateQuantity, removeItem, clearCart
```

### 6.7.3 Sử dụng CartContext

```jsx
// Trong component
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart, isOpen, openCart, itemCount } = useCart();

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, 1, { size: "M" });
    if (result.success) {
      openCart(); // Open cart drawer
    }
  };

  return <button onClick={handleAddToCart}>Add to Cart ({itemCount})</button>;
}
```

---

## 8.8 ToastContext (Frontend - Đã có trong codebase)

### 6.8.1 Cấu trúc ToastContext

```jsx
// frontend/src/context/ToastContext.jsx

const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// ToastProvider cung cấp:
// - addToast(message, type, duration)
// - removeToast(id)
// - clearAllToasts()
// - success(message) - shorthand
// - error(message) - shorthand
// - warning(message) - shorthand
// - info(message) - shorthand
```

### 6.8.2 Sử dụng Toast

```jsx
import { useToast } from "../context/ToastContext";

function CheckoutButton() {
  const toast = useToast();

  const handleCheckout = async () => {
    try {
      await processCheckout();
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error.message || "Checkout failed");
    }
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
```

---

## 8.9 Address Management (Thêm vào User Model)

```javascript
// Thêm vào backend/src/models/User.js

const addressSchema = new mongoose.Schema({
  label: {
    type: String,
    default: "Home",
    enum: ["Home", "Work", "Other"],
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  apartment: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "Vietnam",
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

// Trong userSchema, thêm:
addresses: {
  type: [addressSchema],
  default: [],
  validate: {
    validator: function (arr) {
      return arr.length <= 5; // Max 5 addresses
    },
    message: "Cannot have more than 5 saved addresses",
  },
},
```

---

## 8.10 Update Routes Index

```javascript
// backend/src/routes/index.js - Cập nhật để include các routes mới
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import profileRoutes from "./profileRoutes.js";
import orderRoutes from "./orderRoutes.js";
import checkoutRoutes from "./checkoutRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

// Public routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/profile", profileRoutes);
router.use("/orders", orderRoutes);
router.use("/checkout", checkoutRoutes);

// Review routes (nested under products)
router.use("/products/:productId/reviews", reviewRoutes);

// Admin routes
router.use("/admin", adminRoutes);

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
```

---

## 8.11 Complete API Endpoints Summary

### Authentication Endpoints

| Method | Endpoint                          | Description            | Auth      |
| ------ | --------------------------------- | ---------------------- | --------- |
| POST   | `/api/auth/register`              | Register new user      | Public    |
| POST   | `/api/auth/login`                 | Login user             | Public    |
| POST   | `/api/auth/logout`                | Logout user            | Public    |
| POST   | `/api/auth/refresh`               | Refresh access token   | Public    |
| POST   | `/api/auth/forgot-password`       | Request password reset | Public    |
| POST   | `/api/auth/reset-password/:token` | Reset password         | Public    |
| GET    | `/api/auth/me`                    | Get current user       | Protected |

### Profile Endpoints

| Method | Endpoint                | Description      | Auth      |
| ------ | ----------------------- | ---------------- | --------- |
| GET    | `/api/profile`          | Get user profile | Protected |
| PATCH  | `/api/profile`          | Update profile   | Protected |
| PATCH  | `/api/profile/password` | Change password  | Protected |

### Cart Endpoints

| Method | Endpoint                  | Description          | Auth      |
| ------ | ------------------------- | -------------------- | --------- |
| GET    | `/api/cart`               | Get cart             | Optional  |
| POST   | `/api/cart/items`         | Add item to cart     | Optional  |
| PATCH  | `/api/cart/items/:itemId` | Update item quantity | Optional  |
| DELETE | `/api/cart/items/:itemId` | Remove item          | Optional  |
| DELETE | `/api/cart`               | Clear cart           | Optional  |
| POST   | `/api/cart/coupon`        | Apply coupon         | Optional  |
| DELETE | `/api/cart/coupon`        | Remove coupon        | Optional  |
| POST   | `/api/cart/merge`         | Merge guest cart     | Protected |

### Product Endpoints

| Method | Endpoint                     | Description           | Auth   |
| ------ | ---------------------------- | --------------------- | ------ |
| GET    | `/api/products`              | Get all products      | Public |
| GET    | `/api/products/:identifier`  | Get single product    | Public |
| GET    | `/api/products/featured`     | Get featured products | Public |
| GET    | `/api/products/new-arrivals` | Get new arrivals      | Public |
| GET    | `/api/products/sale`         | Get sale products     | Public |

### Order Endpoints (MỚI)

| Method | Endpoint                         | Description       | Auth      |
| ------ | -------------------------------- | ----------------- | --------- |
| GET    | `/api/orders`                    | Get user's orders | Protected |
| POST   | `/api/orders`                    | Create new order  | Optional  |
| GET    | `/api/orders/:orderId`           | Get single order  | Protected |
| GET    | `/api/orders/track/:orderNumber` | Track order       | Public    |
| POST   | `/api/orders/:orderId/cancel`    | Cancel order      | Protected |
| POST   | `/api/orders/:orderId/return`    | Request return    | Protected |

### Checkout Endpoints (MỚI)

| Method | Endpoint                              | Description           | Auth     |
| ------ | ------------------------------------- | --------------------- | -------- |
| POST   | `/api/checkout/initialize`            | Initialize checkout   | Optional |
| POST   | `/api/checkout/shipping-rates`        | Get shipping rates    | Optional |
| POST   | `/api/checkout/calculate-tax`         | Calculate tax         | Optional |
| POST   | `/api/checkout/create-payment-intent` | Create payment intent | Optional |
| POST   | `/api/checkout/complete`              | Complete order        | Optional |

### Review Endpoints (MỚI)

| Method | Endpoint                                     | Description         | Auth      |
| ------ | -------------------------------------------- | ------------------- | --------- |
| GET    | `/api/products/:productId/reviews`           | Get product reviews | Public    |
| POST   | `/api/products/:productId/reviews`           | Create review       | Protected |
| PUT    | `/api/products/:productId/reviews/:reviewId` | Update review       | Protected |
| DELETE | `/api/products/:productId/reviews/:reviewId` | Delete review       | Protected |
| POST   | `/api/reviews/:reviewId/vote`                | Vote on review      | Protected |

### Admin Endpoints (MỚI)

| Method | Endpoint                            | Description         | Auth  |
| ------ | ----------------------------------- | ------------------- | ----- |
| GET    | `/api/admin/dashboard`              | Get dashboard stats | Admin |
| GET    | `/api/admin/orders`                 | Get all orders      | Admin |
| PATCH  | `/api/admin/orders/:orderId/status` | Update order status | Admin |
| GET    | `/api/admin/users`                  | Get all users       | Admin |
| PATCH  | `/api/admin/users/:userId`          | Update user         | Admin |
| PATCH  | `/api/admin/reviews/:reviewId`      | Moderate review     | Admin |

---

# Part 7: Deployment Notes

> 🎯 **Mục tiêu Part này:**
>
> - Containerize ứng dụng với Docker
> - Deploy lên cloud server
> - Setup SSL/HTTPS với Let's Encrypt
> - Configure Nginx reverse proxy

---

## 7.1 Environment Variables for Production

```env
# Backend .env.production
NODE_ENV=production
MONGO_URI=mongodb://mongodb:27017/fashion-store
JWT_SECRET=your-production-secret-key
JWT_REFRESH_SECRET=your-production-refresh-key
CLIENT_URL=https://yourdomain.com

# Frontend .env.production
VITE_API_URL=/api
```

## 7.2 Docker Compose

```yaml
version: "3.8"

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=/api

  backend:
    build: ./fashion-website-backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongodb:27017/fashion-store
    depends_on:
      - mongodb

  mongodb:
    image: mongo:7
    volumes:
      - mongodb_data:/data/db

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend

volumes:
  mongodb_data:
```

---

# 📝 Version History

| Version | Date       | Changes                                                |
| ------- | ---------- | ------------------------------------------------------ |
| 1.0     | 2025-01-21 | Initial complete guide matching current codebase       |
| 2.0     | 2025-01-21 | Added Order, Checkout, Email, Review, Admin systems    |
| 3.0     | 2025-01-21 | Added Theory, Clean Code, Debugging, Interview, Career |

---

# 📚 Câu hỏi Gợi mở cho Người học

## Về Authentication & Security

1. **Tại sao dùng 2 token (Access + Refresh) thay vì chỉ 1 token?**
   - Access token ngắn hạn (15 phút) giảm rủi ro nếu bị đánh cắp
   - Refresh token trong httpOnly cookie bảo vệ khỏi XSS
   - Cân bằng giữa security và UX

2. **`sameSite: 'strict'` có ý nghĩa gì?**
   - Ngăn chặn CSRF attacks
   - Cookie chỉ được gửi khi request từ cùng domain
   - Hạn chế: không hoạt động với cross-site requests

3. **Tại sao `forgotPassword` luôn trả về success?**
   - Ngăn chặn email enumeration attacks
   - Attacker không biết email có tồn tại hay không
   - Security best practice

## Về Cart & Checkout

4. **"Optimistic Update" là gì và tại sao cần?**
   - UI update ngay lập tức, không đợi server response
   - Cải thiện perceived performance
   - Rollback nếu server fail

5. **Inventory Lock trong checkout flow hoạt động thế nào?**
   - Reserve stock khi user bắt đầu checkout
   - Timeout để release nếu user abandon
   - Permanent deduct khi order confirmed

6. **Guest checkout vs User checkout khác gì?**
   - Guest: dùng sessionId, không lưu history
   - User: sync với database, có order history
   - Merge cart khi guest đăng ký/login

## Về Order Management

7. **Tại sao cần `statusHistory` array?**
   - Audit trail cho compliance
   - Debug issues trong fulfillment
   - Customer transparency

8. **Soft delete vs Hard delete - khi nào dùng cái nào?**
   - Soft delete: data có relationships, cần audit
   - Hard delete: test data, GDPR compliance request
   - Fashion store: soft delete products, hard delete carts

## Về Performance & Scalability

9. **Khi nào cần Elasticsearch thay vì MongoDB text search?**
   - Catalog > 10,000 products
   - Cần fuzzy matching, typo tolerance
   - Complex faceted search

10. **Redis cache nên dùng ở đâu?**
    - Session storage
    - Cart data cho guests
    - Frequently accessed products
    - Rate limiting counters

---

# Part 8: Lý thuyết Nền tảng (Foundational Theory)

> 📖 Phần này giải thích các khái niệm core mà mọi lập trình viên fullstack cần nắm vững.

---

## 8.1 Kiến trúc Client-Server

### Khái niệm

```
┌─────────────┐         HTTP Request          ┌─────────────┐
│   CLIENT    │ ─────────────────────────────▶│   SERVER    │
│  (Browser)  │                               │  (Node.js)  │
│             │◀───────────────────────────── │             │
└─────────────┘         HTTP Response         └─────────────┘
```

**Client (Frontend)**:

- Giao diện người dùng (UI)
- Chạy trên browser của user
- Gửi requests, nhận responses
- Render dữ liệu thành HTML/CSS

**Server (Backend)**:

- Xử lý business logic
- Kết nối database
- Xác thực, phân quyền
- Trả về dữ liệu (thường là JSON)

### Tại sao tách Client và Server?

| Lợi ích                    | Giải thích                                      |
| -------------------------- | ----------------------------------------------- |
| **Separation of Concerns** | Mỗi phần chịu trách nhiệm riêng                 |
| **Scalability**            | Scale backend và frontend độc lập               |
| **Security**               | Logic nhạy cảm ở server, không expose ra client |
| **Team Collaboration**     | Frontend và Backend team làm việc song song     |
| **Multiple Clients**       | Một backend phục vụ web, mobile, IoT            |

### Stateless vs Stateful

**HTTP là Stateless Protocol:**

```javascript
// Request 1: Login
POST /api/auth/login { email, password }
// Response: { accessToken: "abc123" }

// Request 2: Get Profile - Server không nhớ request 1!
GET /api/profile
// Phải gửi token để server biết bạn là ai
Headers: { Authorization: "Bearer abc123" }
```

**Cách duy trì state:**

- **Cookies**: Server set, browser tự gửi
- **Tokens (JWT)**: Client lưu, gửi trong header
- **Sessions**: Server lưu, client chỉ giữ session ID

---

## 8.2 RESTful API

### REST là gì?

**REST** = Representational State Transfer

Là một kiến trúc thiết kế API dựa trên các nguyên tắc:

1. **Client-Server**: Tách biệt rõ ràng
2. **Stateless**: Mỗi request chứa đủ thông tin
3. **Cacheable**: Response có thể cache
4. **Uniform Interface**: Sử dụng HTTP methods chuẩn
5. **Layered System**: Có thể thêm middleware, proxy

### HTTP Methods & CRUD

| Method | CRUD Operation   | Ví dụ                    | Idempotent |
| ------ | ---------------- | ------------------------ | ---------- |
| GET    | Read             | Lấy danh sách sản phẩm   | ✅ Yes     |
| POST   | Create           | Tạo đơn hàng mới         | ❌ No      |
| PUT    | Update (Full)    | Thay thế toàn bộ product | ✅ Yes     |
| PATCH  | Update (Partial) | Cập nhật chỉ price       | ✅ Yes     |
| DELETE | Delete           | Xóa review               | ✅ Yes     |

> **Idempotent**: Gọi nhiều lần cho cùng kết quả như gọi 1 lần

### RESTful URL Design

```
# ✅ Good - Resource-based
GET    /api/products          # Lấy tất cả products
GET    /api/products/123      # Lấy product id=123
POST   /api/products          # Tạo product mới
PUT    /api/products/123      # Update product 123
DELETE /api/products/123      # Xóa product 123

# Nested resources
GET    /api/products/123/reviews      # Reviews của product 123
POST   /api/products/123/reviews      # Thêm review cho product 123

# ❌ Bad - Verb-based
GET    /api/getProducts
POST   /api/createProduct
POST   /api/deleteProduct/123
```

### HTTP Status Codes

```javascript
// 2xx - Success
200 OK                  // GET, PUT, PATCH thành công
201 Created             // POST tạo resource thành công
204 No Content          // DELETE thành công

// 4xx - Client Error
400 Bad Request         // Validation error
401 Unauthorized        // Chưa login
403 Forbidden           // Login rồi nhưng không có quyền
404 Not Found           // Resource không tồn tại
409 Conflict            // Duplicate email khi register
422 Unprocessable       // Semantic error
429 Too Many Requests   // Rate limit exceeded

// 5xx - Server Error
500 Internal Server     // Bug trong code
502 Bad Gateway         // Nginx không connect được backend
503 Service Unavailable // Server quá tải
```

### Response Format Chuẩn

```javascript
// Success response
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalProducts": 100
    }
  }
}

// Error response
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": [
    { "field": "email", "message": "Email is required" },
    { "field": "password", "message": "Password too short" }
  ]
}
```

---

## 8.3 JWT (JSON Web Token)

### JWT là gì?

JWT là một chuẩn mở (RFC 7519) để truyền thông tin an toàn giữa các bên dưới dạng JSON object đã được ký số.

### Cấu trúc JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzI0NTY3ODksImV4cCI6MTYzMjQ2MDM4OX0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header.Payload.Signature
```

**Header** (Base64):

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload** (Base64):

```json
{
  "userId": "123456",
  "email": "user@example.com",
  "role": "user",
  "iat": 1632456789,
  "exp": 1632460389
}
```

**Signature**:

```javascript
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secretKey);
```

### JWT Flow trong Authentication

```
┌──────────┐                                      ┌──────────┐
│  Client  │                                      │  Server  │
└────┬─────┘                                      └────┬─────┘
     │                                                 │
     │  1. POST /login { email, password }             │
     │ ───────────────────────────────────────────────▶│
     │                                                 │
     │                    Verify credentials           │
     │                    Generate JWT tokens          │
     │                                                 │
     │  2. { accessToken, refreshToken (cookie) }      │
     │ ◀───────────────────────────────────────────────│
     │                                                 │
     │  3. GET /profile                                │
     │     Authorization: Bearer <accessToken>         │
     │ ───────────────────────────────────────────────▶│
     │                                                 │
     │                    Verify signature             │
     │                    Check expiration             │
     │                    Extract user info            │
     │                                                 │
     │  4. { user: { name, email, ... } }              │
     │ ◀───────────────────────────────────────────────│
```

### Tại sao dùng 2 tokens?

| Aspect             | Access Token            | Refresh Token             |
| ------------------ | ----------------------- | ------------------------- |
| **Lifetime**       | 15 phút                 | 7 ngày                    |
| **Storage**        | Memory/localStorage     | httpOnly cookie           |
| **Purpose**        | Authenticate requests   | Get new access token      |
| **Risk if stolen** | Limited damage (15 min) | Higher risk               |
| **Sent with**      | Every API request       | Only to /refresh endpoint |

### JWT vs Sessions

| JWT                                 | Sessions                             |
| ----------------------------------- | ------------------------------------ |
| Stateless - không cần lưu ở server  | Stateful - server lưu session data   |
| Scalable - không cần shared storage | Cần Redis/DB để share across servers |
| Không thể revoke trước khi hết hạn  | Có thể revoke bất cứ lúc nào         |
| Payload có thể lớn                  | Session ID nhỏ gọn                   |

---

## 8.4 Xác thực (Authentication) vs Phân quyền (Authorization)

### Authentication (AuthN) - Bạn là ai?

```javascript
// Xác minh danh tính user
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "secretPassword"
}

// Server verify và trả về token
{
  "success": true,
  "data": {
    "user": { "id": "123", "email": "user@example.com" },
    "accessToken": "eyJhbGci..."
  }
}
```

### Authorization (AuthZ) - Bạn được làm gì?

```javascript
// Middleware kiểm tra quyền
export const requireAdmin = (req, res, next) => {
  // Authentication đã xong (user có trong req.user)

  // Authorization: kiểm tra role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

// Sử dụng
router.get("/admin/dashboard", protect, requireAdmin, getDashboard);
```

### RBAC (Role-Based Access Control)

```javascript
const roles = {
  user: ["read:products", "write:cart", "write:orders"],
  admin: [
    "read:products",
    "write:products",
    "delete:products",
    "read:orders",
    "update:orders",
    "read:users",
  ],
  superadmin: ["*"], // All permissions
};

// Middleware
export const requirePermission = (...permissions) => {
  return (req, res, next) => {
    const userPermissions = roles[req.user.role] || [];

    const hasPermission = permissions.every(
      (p) => userPermissions.includes(p) || userPermissions.includes("*")
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Required permissions: ${permissions.join(", ")}`,
      });
    }

    next();
  };
};

// Usage
router.delete("/products/:id", protect, requirePermission("delete:products"), deleteProduct);
```

---

## 8.5 State Management

### Tại sao cần State Management?

```
                    ┌─────────────┐
                    │   App.jsx   │
                    │ (user state)│
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      ┌─────────┐    ┌─────────┐    ┌─────────┐
      │ Header  │    │Products │    │  Cart   │
      │(cần user│    │(cần user│    │(cần user│
      │  name)  │    │wishlist)│    │  cart)  │
      └─────────┘    └─────────┘    └─────────┘
```

**Vấn đề Prop Drilling:**

```jsx
// ❌ Truyền props qua nhiều tầng
<App user={user}>
  <Layout user={user}>
    <Header user={user}>
      <UserMenu user={user} /> {/* Cuối cùng mới dùng! */}
    </Header>
  </Layout>
</App>
```

**Giải pháp Context API:**

```jsx
// ✅ Sử dụng Context
<AuthProvider>
  {" "}
  {/* Cung cấp user state */}
  <App>
    <Layout>
      <Header>
        <UserMenu /> {/* Lấy user từ context */}
      </Header>
    </Layout>
  </App>
</AuthProvider>;

// Trong UserMenu
const { user, logout } = useAuth();
```

### React Context + useReducer Pattern

```jsx
// 1. Define action types
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
};

// 2. Create reducer (pure function)
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { ...state, isLoading: true, error: null };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, isAuthenticated: true };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case AUTH_ACTIONS.LOGOUT:
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

// 3. Create context and provider
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const user = await authService.login(email, password);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
  );
}
```

### Khi nào dùng gì?

| Solution                 | Use Case                               |
| ------------------------ | -------------------------------------- |
| **useState**             | Local component state                  |
| **useReducer**           | Complex state logic trong 1 component  |
| **Context + useReducer** | Shared state (auth, theme, cart)       |
| **Redux**                | Very large apps, time-travel debugging |
| **Zustand/Jotai**        | Simpler global state, less boilerplate |
| **React Query/SWR**      | Server state (caching, refetching)     |

---

## 8.6 MVC Pattern

### Model-View-Controller

```
┌─────────────────────────────────────────────────────────────┐
│                        MVC Pattern                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐      ┌────────────┐      ┌─────────┐          │
│  │  VIEW   │ ◀─── │ CONTROLLER │ ◀─── │  MODEL  │          │
│  │(React)  │      │ (Express)  │      │(Mongoose)│          │
│  └────┬────┘      └─────┬──────┘      └────┬────┘          │
│       │                 │                  │                │
│       │    User         │   Business       │   Database     │
│       │    Interface    │   Logic          │   Operations   │
│       │                 │                  │                │
│       ▼                 ▼                  ▼                │
│  ┌─────────┐      ┌────────────┐      ┌─────────┐          │
│  │ Button  │      │ Validate   │      │ MongoDB │          │
│  │ Form    │ ───▶ │ Process    │ ───▶ │ Query   │          │
│  │ Display │      │ Respond    │      │ Save    │          │
│  └─────────┘      └────────────┘      └─────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Trong Fashion Website

```
backend/src/
├── models/           # MODEL - Schema definitions
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── controllers/      # CONTROLLER - Business logic
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
├── routes/           # Route definitions
│   └── index.js
└── middleware/       # Request processing
    └── auth.js

frontend/src/
├── components/       # VIEW - UI components
│   ├── ProductCard.jsx
│   └── CartDrawer.jsx
├── pages/            # VIEW - Page components
│   └── Products.jsx
└── context/          # State management
    └── AuthContext.jsx
```

---

# Part 9: Nguyên tắc Clean Code & Best Practices

## 9.1 SOLID Principles

### S - Single Responsibility Principle

> Một class/function chỉ nên có MỘT lý do để thay đổi.

```javascript
// ❌ Bad - Làm quá nhiều việc
class UserService {
  async register(userData) {
    // Validate input
    if (!userData.email.includes("@")) throw new Error("Invalid email");

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Save to database
    const user = await User.create({ ...userData, password: hashedPassword });

    // Send welcome email
    await sendEmail(user.email, "Welcome!", "Thanks for joining...");

    // Log to analytics
    analytics.track("user_registered", { userId: user.id });

    return user;
  }
}

// ✅ Good - Tách thành các services riêng
class UserService {
  constructor(emailService, analyticsService) {
    this.emailService = emailService;
    this.analyticsService = analyticsService;
  }

  async register(userData) {
    // Chỉ làm 1 việc: tạo user
    const user = await User.create(userData);

    // Delegate các việc khác
    await this.emailService.sendWelcome(user);
    this.analyticsService.track("user_registered", { userId: user.id });

    return user;
  }
}
```

### O - Open/Closed Principle

> Mở cho mở rộng, đóng cho sửa đổi.

```javascript
// ❌ Bad - Phải sửa code khi thêm payment method
function processPayment(order, method) {
  if (method === "stripe") {
    // Stripe logic
  } else if (method === "paypal") {
    // PayPal logic
  } else if (method === "cod") {
    // COD logic
  }
  // Thêm method mới = sửa function này
}

// ✅ Good - Thêm mới không cần sửa code cũ
const paymentProcessors = {
  stripe: new StripeProcessor(),
  paypal: new PayPalProcessor(),
  cod: new CODProcessor(),
};

function processPayment(order, method) {
  const processor = paymentProcessors[method];
  if (!processor) throw new Error("Unknown payment method");
  return processor.process(order);
}

// Thêm payment method mới - chỉ thêm file mới
paymentProcessors.vnpay = new VNPayProcessor();
```

### L - Liskov Substitution Principle

> Objects của subclass có thể thay thế objects của parent class.

```javascript
// ❌ Bad - Square không thể thay thế Rectangle
class Rectangle {
  setWidth(w) {
    this.width = w;
  }
  setHeight(h) {
    this.height = h;
  }
  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(w) {
    this.width = this.height = w;
  } // Breaks LSP!
  setHeight(h) {
    this.width = this.height = h;
  }
}

// ✅ Good - Dùng composition thay vì inheritance
class Shape {
  getArea() {
    throw new Error("Must implement");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  getArea() {
    return this.side * this.side;
  }
}
```

### I - Interface Segregation Principle

> Nhiều interface nhỏ tốt hơn 1 interface lớn.

```javascript
// ❌ Bad - Interface quá lớn
class FullFeaturedUser {
  login() {}
  logout() {}
  updateProfile() {}
  deleteAccount() {}
  viewOrders() {}
  createOrder() {}
  manageProducts() {} // Không phải user nào cũng cần
  viewAnalytics() {} // Chỉ admin cần
}

// ✅ Good - Tách thành các interfaces nhỏ
const AuthMixin = {
  login() {},
  logout() {},
};

const ProfileMixin = {
  updateProfile() {},
  deleteAccount() {},
};

const CustomerMixin = {
  viewOrders() {},
  createOrder() {},
};

const AdminMixin = {
  manageProducts() {},
  viewAnalytics() {},
};

// Compose theo nhu cầu
const RegularUser = { ...AuthMixin, ...ProfileMixin, ...CustomerMixin };
const AdminUser = { ...RegularUser, ...AdminMixin };
```

### D - Dependency Inversion Principle

> Depend on abstractions, not concretions.

```javascript
// ❌ Bad - Phụ thuộc trực tiếp vào implementation
class OrderService {
  async createOrder(data) {
    // Phụ thuộc trực tiếp vào Stripe
    const stripe = require('stripe')(process.env.STRIPE_KEY);
    await stripe.paymentIntents.create(...);

    // Phụ thuộc trực tiếp vào Nodemailer
    const nodemailer = require('nodemailer');
    await nodemailer.sendMail(...);
  }
}

// ✅ Good - Inject dependencies
class OrderService {
  constructor(paymentGateway, emailService) {
    this.paymentGateway = paymentGateway;  // Abstraction
    this.emailService = emailService;       // Abstraction
  }

  async createOrder(data) {
    await this.paymentGateway.charge(data.amount);
    await this.emailService.sendConfirmation(data);
  }
}

// Inject different implementations
const orderService = new OrderService(
  new StripeGateway(),   // hoặc new PayPalGateway()
  new NodemailerService() // hoặc new SendGridService()
);
```

---

## 9.2 DRY, KISS, YAGNI

### DRY - Don't Repeat Yourself

```javascript
// ❌ Bad - Code lặp lại
async function getActiveProducts() {
  return await Product.find({ isActive: true, stock: { $gt: 0 } });
}

async function getFeaturedProducts() {
  return await Product.find({ isActive: true, stock: { $gt: 0 }, isFeatured: true });
}

async function getSaleProducts() {
  return await Product.find({ isActive: true, stock: { $gt: 0 }, isOnSale: true });
}

// ✅ Good - Extract common logic
const baseProductQuery = { isActive: true, stock: { $gt: 0 } };

async function getProducts(additionalQuery = {}) {
  return await Product.find({ ...baseProductQuery, ...additionalQuery });
}

const getActiveProducts = () => getProducts();
const getFeaturedProducts = () => getProducts({ isFeatured: true });
const getSaleProducts = () => getProducts({ isOnSale: true });
```

### KISS - Keep It Simple, Stupid

```javascript
// ❌ Over-engineered
class ProductPriceCalculatorFactory {
  static createCalculator(type) {
    switch (type) {
      case "regular":
        return new RegularPriceCalculator();
      case "sale":
        return new SalePriceCalculator();
      case "vip":
        return new VIPPriceCalculator();
    }
  }
}

class AbstractPriceCalculator {
  calculateFinalPrice(product, user) {
    throw new Error("Must implement");
  }
}

// ✅ Simple and clear
function calculatePrice(product, user) {
  let price = product.price;

  if (product.isOnSale && product.salePrice) {
    price = product.salePrice;
  }

  if (user?.isVIP) {
    price *= 0.9; // 10% VIP discount
  }

  return price;
}
```

### YAGNI - You Aren't Gonna Need It

```javascript
// ❌ Building for imaginary future requirements
const userSchema = new Schema({
  email: String,
  password: String,

  // "Might need these later..."
  facebookId: String,
  googleId: String,
  twitterId: String,
  linkedinId: String,
  githubId: String,

  // "In case we go international..."
  preferredLanguage: String,
  timezone: String,
  currency: String,
  dateFormat: String,

  // "For future gamification..."
  points: Number,
  level: Number,
  badges: [String],
  achievements: [Object],
});

// ✅ Build what you need NOW
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  // Add more fields when you ACTUALLY need them
});
```

---

## 9.3 Clean Code Practices

### Meaningful Names

```javascript
// ❌ Bad names
const d = new Date();
const u = users.filter((x) => x.a > 18);
function calc(p, q, t) {
  return p * q * (1 + t);
}

// ✅ Good names
const currentDate = new Date();
const adultUsers = users.filter((user) => user.age > 18);
function calculateTotalWithTax(price, quantity, taxRate) {
  return price * quantity * (1 + taxRate);
}
```

### Small Functions

```javascript
// ❌ Bad - Function quá dài
async function processOrder(orderData) {
  // 200 lines of code doing everything...
  // Validate
  // Check inventory
  // Calculate totals
  // Process payment
  // Update database
  // Send emails
  // Update analytics
}

// ✅ Good - Tách thành các functions nhỏ
async function processOrder(orderData) {
  validateOrderData(orderData);
  await checkInventoryAvailability(orderData.items);

  const totals = calculateOrderTotals(orderData);
  const paymentResult = await processPayment(totals.total);

  const order = await createOrder(orderData, totals, paymentResult);

  // Fire-and-forget async tasks
  sendOrderConfirmation(order);
  updateAnalytics(order);

  return order;
}
```

### Comments - When and How

```javascript
// ❌ Bad comments - stating the obvious
// Increment i by 1
i++;

// Check if user is logged in
if (user.isLoggedIn) {
}

// ✅ Good comments - explain WHY, not WHAT

// Using 24-hour session timeout as required by PCI-DSS compliance
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

// Workaround for Safari bug in iOS 14.x where cookies
// don't persist after app backgrounding. See: github.com/issue/12345
if (isSafariMobile()) {
  localStorage.setItem("tempAuth", token);
}

// Business rule: VIP users get free shipping on orders over $50
// (normal threshold is $100). Confirmed with product team on 2024-01-15
const freeShippingThreshold = user.isVIP ? 50 : 100;
```

### Error Handling

```javascript
// ❌ Bad - Swallowing errors
try {
  await processPayment(amount);
} catch (e) {
  console.log(e);
}

// ❌ Bad - Generic error messages
catch (error) {
  throw new Error('Something went wrong');
}

// ✅ Good - Proper error handling
try {
  await processPayment(amount);
} catch (error) {
  // Log với context
  logger.error('Payment processing failed', {
    amount,
    userId: user.id,
    error: error.message,
    stack: error.stack
  });

  // Re-throw với message phù hợp cho user
  if (error.code === 'INSUFFICIENT_FUNDS') {
    throw new AppError('Payment declined. Please check your card balance.', 402);
  }

  if (error.code === 'CARD_EXPIRED') {
    throw new AppError('Your card has expired. Please update payment method.', 402);
  }

  // Unknown error - log và show generic message
  throw new AppError('Payment could not be processed. Please try again later.', 500);
}
```

---

# Part 10: Kỹ năng Thực tế (Practical Skills)

## 10.1 Debugging Hiệu quả

### Debugging Mindset

```
┌─────────────────────────────────────────────────────────────┐
│                    DEBUGGING PROCESS                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. REPRODUCE  ─────▶  2. ISOLATE  ─────▶  3. IDENTIFY     │
│     Tái tạo bug         Thu hẹp scope       Tìm root cause │
│                                                             │
│       ▲                                           │         │
│       │                                           ▼         │
│                                                             │
│  6. VERIFY    ◀─────  5. TEST     ◀─────  4. FIX           │
│     Bug đã hết?        Unit test          Sửa code         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Console Debugging Techniques

```javascript
// 1. console.log với labels rõ ràng
console.log("[AUTH] User login attempt:", { email, timestamp: new Date() });
console.log("[CART] Adding item:", { productId, quantity, currentCart: cart.items.length });

// 2. console.table cho arrays/objects
console.table(users.map((u) => ({ id: u.id, name: u.name, role: u.role })));

// 3. console.group cho structured logging
console.group("Order Processing");
console.log("1. Validating order...");
console.log("2. Processing payment...");
console.log("3. Creating order...");
console.groupEnd();

// 4. console.time cho performance
console.time("Database Query");
const products = await Product.find();
console.timeEnd("Database Query"); // Database Query: 45.123ms

// 5. console.trace cho call stack
function deeplyNestedFunction() {
  console.trace("How did we get here?");
}
```

### Backend Debugging

```javascript
// 1. Request/Response logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("Body:", JSON.stringify(req.body, null, 2));
  console.log("Query:", req.query);

  // Log response
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[RESPONSE] ${res.statusCode} - ${duration}ms`);
  });

  next();
});

// 2. Mongoose query debugging
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`[MONGOOSE] ${collectionName}.${method}`, JSON.stringify(query));
});

// 3. Error stack traces
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
  console.error("Stack:", reason?.stack);
});
```

### Frontend Debugging

```javascript
// 1. React DevTools Profiler
// - Tìm component render nhiều lần không cần thiết
// - Đo performance của mỗi render

// 2. Network tab analysis
// - Check request/response payload
// - Verify headers (Authorization, Content-Type)
// - Check timing (TTFB, Download time)

// 3. useEffect dependencies debugging
useEffect(() => {
  console.log("[useEffect] Dependencies changed:", {
    user,
    isAuthenticated,
    renderCount: ++renderCountRef.current,
  });

  // Your effect logic
}, [user, isAuthenticated]);

// 4. Why did this component re-render?
import { useRef } from "react";

function useWhyDidYouRender(componentName, props) {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const changedProps = Object.entries(props).filter(
        ([key, value]) => previousProps.current[key] !== value
      );

      if (changedProps.length > 0) {
        console.log(`[${componentName}] Changed props:`, changedProps);
      }
    }

    previousProps.current = props;
  });
}
```

### Common Bug Patterns

| Bug Pattern          | Symptoms                               | Solution                                  |
| -------------------- | -------------------------------------- | ----------------------------------------- |
| **Race Condition**   | Inconsistent behavior, works sometimes | Use locks, queues, or proper async/await  |
| **Memory Leak**      | App slows down over time               | Cleanup useEffect, remove event listeners |
| **Infinite Loop**    | Browser freezes, max call stack        | Check useEffect deps, recursive calls     |
| **Stale Closure**    | Old values in callbacks                | useRef, useCallback with deps             |
| **CORS Error**       | Request blocked in browser             | Configure backend CORS headers            |
| **401 Unauthorized** | Token missing/expired                  | Check auth flow, refresh token            |

---

## 10.2 Git Workflow

### Git Branching Strategy

```
main (production)
  │
  ├── develop (staging)
  │     │
  │     ├── feature/add-wishlist
  │     │     └── commits...
  │     │
  │     ├── feature/checkout-flow
  │     │     └── commits...
  │     │
  │     └── bugfix/cart-quantity
  │           └── commits...
  │
  └── hotfix/security-patch
        └── merge directly to main
```

### Commit Message Convention

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat     # New feature
fix      # Bug fix
docs     # Documentation
style    # Formatting, no code change
refactor # Code restructuring
test     # Adding tests
chore    # Maintenance tasks

# Examples:
git commit -m "feat(auth): add password reset flow"
git commit -m "fix(cart): resolve quantity update race condition"
git commit -m "refactor(api): extract common validation logic"
git commit -m "docs: update API endpoints in README"
git commit -m "test(order): add checkout flow integration tests"
```

### Daily Git Workflow

```bash
# 1. Start your day - sync with remote
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/add-review-system

# 3. Make atomic commits (small, focused)
git add src/models/Review.js
git commit -m "feat(review): add Review model with schema"

git add src/controllers/reviewController.js
git commit -m "feat(review): add CRUD controller methods"

git add src/routes/reviewRoutes.js
git commit -m "feat(review): configure review routes"

# 4. Push regularly
git push origin feature/add-review-system

# 5. Before PR - rebase to latest develop
git fetch origin
git rebase origin/develop

# 6. Fix conflicts if any
# Edit conflicted files
git add .
git rebase --continue

# 7. Force push after rebase
git push origin feature/add-review-system --force-with-lease

# 8. Create Pull Request on GitHub/GitLab
```

### Handling Merge Conflicts

```bash
# 1. Khi gặp conflict
Auto-merging src/routes/index.js
CONFLICT (content): Merge conflict in src/routes/index.js

# 2. Mở file và tìm conflict markers
<<<<<<< HEAD
import reviewRoutes from './reviewRoutes.js';
=======
import wishlistRoutes from './wishlistRoutes.js';
>>>>>>> feature/add-wishlist

# 3. Resolve - keep both hoặc chọn 1
import reviewRoutes from './reviewRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';

# 4. Stage và continue
git add src/routes/index.js
git rebase --continue
# hoặc
git merge --continue
```

### Git Tips

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Amend last commit message
git commit --amend -m "New message"

# Stash changes temporarily
git stash
git stash pop

# View pretty log
git log --oneline --graph --all

# Find who wrote a line
git blame src/controllers/authController.js

# Search in commit history
git log --grep="password reset"

# Interactive rebase (squash commits)
git rebase -i HEAD~3
```

---

## 10.3 Code Review Best Practices

### As a Reviewer

```markdown
## Code Review Checklist

### Functionality

- [ ] Code does what the PR description says
- [ ] Edge cases are handled
- [ ] Error handling is proper

### Code Quality

- [ ] Follows project coding standards
- [ ] No duplicate code
- [ ] Functions are small and focused
- [ ] Variable names are meaningful

### Security

- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] No SQL/NoSQL injection vulnerabilities
- [ ] Authorization checks in place

### Performance

- [ ] No obvious N+1 queries
- [ ] No unnecessary re-renders
- [ ] Large lists are paginated

### Testing

- [ ] Unit tests added for new logic
- [ ] Existing tests still pass
- [ ] Edge cases tested
```

### Giving Constructive Feedback

```markdown
# ❌ Bad feedback

"This code is wrong"
"Why did you do it this way?"
"This is not how we do things here"

# ✅ Good feedback

"Consider using `Array.find()` instead of `filter()[0]` for better
readability and early termination"

"I noticed this query runs inside a loop (line 45-50). This might
cause N+1 query issues. Would you consider using `.populate()`
or batching the queries? Happy to pair on this if helpful!"

"Nice approach! One small suggestion: we could extract lines 23-35
into a separate function like `calculateDiscount()` to make testing
easier. What do you think?"
```

### As an Author

```markdown
# Good PR Description Template

## What does this PR do?

Adds product review functionality allowing users to rate and review products.

## Why is this change needed?

Per product requirement PRD-123, users should be able to leave reviews
to improve social proof and SEO.

## How to test?

1. Login as a user who has purchased a product
2. Navigate to product detail page
3. Submit a review with rating 1-5
4. Verify review appears after admin moderation

## Screenshots (if UI changes)

[Before/After screenshots]

## Checklist

- [x] Tests added
- [x] Documentation updated
- [x] No console.logs left
- [x] Mobile responsive checked
```

---

## 10.4 Problem Solving Approach

### UMPIRE Method

```
U - Understand the problem
M - Match with known patterns
P - Plan your approach
I - Implement the solution
R - Review and test
E - Evaluate and optimize
```

### Example: "Add to Cart không hoạt động"

```markdown
## U - Understand

- User click "Add to Cart" button
- Không có gì xảy ra
- Console không có error
- Network tab: request không được gửi

## M - Match Pattern

- Có thể là: event handler không được attach
- Có thể là: button disabled
- Có thể là: state không đúng

## P - Plan

1. Check button onClick handler
2. Check component render
3. Add console.log to trace flow

## I - Implement debugging

const handleAddToCart = async () => {
console.log('Button clicked!'); // ← Không log → handler chưa attach
console.log('Product:', product);
await addToCart(product.\_id);
};

## R - Review findings

- onClick handler bị typo: `onCLick` thay vì `onClick`

## E - Fix và validate

// ❌ Wrong
<Button onCLick={handleAddToCart}>Add to Cart</Button>

// ✅ Fixed
<Button onClick={handleAddToCart}>Add to Cart</Button>
```

### Rubber Duck Debugging

Kỹ thuật giải thích vấn đề cho một "con vịt cao su" (hoặc bất kỳ ai/cái gì):

1. **Mô tả vấn đề chi tiết** - "Add to cart button không work"
2. **Giải thích expected behavior** - "Khi click, item phải được thêm vào cart"
3. **Giải thích actual behavior** - "Không có gì xảy ra, không có error"
4. **Walk through code line by line** - "Đầu tiên button render, onClick gọi handleAddToCart..."
5. **💡 Thường sẽ tự tìm ra bug** - "Ồ! onClick bị viết sai!"

---

# Part 11: Bài tập Thực hành & Tình huống Phỏng vấn

## 11.1 Bài tập Củng cố theo Module

### Module 1: Authentication

**Bài tập cơ bản:**

1. Implement "Remember Me" checkbox - giữ user logged in lâu hơn
2. Thêm password strength indicator khi register
3. Implement account lockout sau 5 lần login fail

**Bài tập nâng cao:** 4. Implement 2FA với OTP qua email 5. Thêm social login (Google OAuth) 6. Implement session management - xem và revoke sessions

### Module 2: Shopping Cart

**Bài tập cơ bản:**

1. Thêm "Save for Later" functionality
2. Implement cart item quantity limits (max 10 per item)
3. Show "Low Stock" warning khi inventory < 5

**Bài tập nâng cao:** 4. Implement abandoned cart email (send after 24h) 5. Thêm real-time stock validation khi checkout 6. Implement multi-currency support

### Module 3: Product

**Bài tập cơ bản:**

1. Thêm "Recently Viewed Products" section
2. Implement product comparison (compare 2-3 products)
3. Thêm product zoom on hover

**Bài tập nâng cao:** 4. Implement product recommendations ("Customers also bought") 5. Thêm product variants với different prices 6. Implement product search autocomplete

### Module 4: Order

**Bài tập cơ bản:**

1. Implement order print/PDF export
2. Thêm reorder functionality
3. Implement order status notifications (email/push)

**Bài tập nâng cao:** 4. Implement partial order cancellation 5. Thêm delivery time slot selection 6. Implement order splitting (multiple shipments)

---

## 11.2 Tình huống Phỏng vấn Giả lập

### Câu hỏi Kiến thức

**Q1: Giải thích JWT authentication flow trong project này?**

```
Expected Answer:
1. User gửi credentials (email/password) đến /api/auth/login
2. Server verify credentials với database
3. Server generate 2 tokens:
   - Access token (15 min) - trả về trong response body
   - Refresh token (7 days) - set trong httpOnly cookie
4. Client lưu access token trong memory
5. Mỗi API request gửi access token trong Authorization header
6. Khi access token expire, client gọi /api/auth/refresh
7. Server verify refresh token từ cookie, issue new tokens
8. Logout: clear refresh token từ database và cookie
```

**Q2: Tại sao dùng httpOnly cookie cho refresh token?**

```
Expected Answer:
- httpOnly cookie không thể access bằng JavaScript
- Bảo vệ khỏi XSS attacks - script malicious không đọc được token
- Browser tự động gửi cookie với mỗi request
- Kết hợp với sameSite: 'strict' để chống CSRF
- Access token ngắn hạn trong memory là acceptable risk
```

**Q3: Làm sao xử lý race condition trong inventory management?**

```javascript
// Expected Answer:
// 1. Optimistic locking với version field
// 2. Database transactions cho critical operations
// 3. Inventory reservation khi checkout start
// 4. TTL cho reservations (15-30 minutes)
// 5. Queue system cho high-traffic scenarios

// Code example:
const session = await mongoose.startSession();
session.startTransaction();

try {
  const product = await Product.findOneAndUpdate(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { session, new: true }
  );

  if (!product) {
    throw new Error("Insufficient stock");
  }

  await Order.create([orderData], { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

### Câu hỏi System Design

**Q4: Thiết kế hệ thống "Flash Sale" cho 10,000 concurrent users**

```
Expected Discussion Points:

1. Challenges:
   - High concurrent requests
   - Race conditions
   - Server overload

2. Architecture:
   - Load balancer (Nginx, AWS ALB)
   - Redis for inventory counter (atomic operations)
   - Message queue for order processing
   - CDN for static assets

3. Strategies:
   - Virtual queue system
   - Rate limiting per user
   - Pre-warm cache
   - Separate read/write databases

4. Code pattern:
   // Redis atomic decrement
   const remaining = await redis.decr(`flash_sale:${productId}`);
   if (remaining < 0) {
     await redis.incr(`flash_sale:${productId}`);
     throw new Error('Sold out');
   }
   // Add to processing queue
   await queue.add('process_order', orderData);
```

**Q5: Làm sao implement search với autocomplete cho 100k products?**

```
Expected Discussion Points:

1. Simple approach (< 10k products):
   - MongoDB text index
   - Simple regex matching

2. Medium scale (10k - 100k):
   - Elasticsearch/Algolia
   - Prefix matching with edge n-grams
   - Cache popular searches

3. Autocomplete implementation:
   - Debounce input (300ms)
   - Minimum 2-3 characters
   - Return max 10 suggestions
   - Highlight matching text

4. Performance optimizations:
   - Store search analytics
   - Boost popular products
   - Use completion suggester in ES
```

### Live Coding Challenges

**Challenge 1: Implement debounce function**

```javascript
// Task: Implement debounce to limit search API calls

function debounce(func, wait) {
  // Your implementation here
}

// Expected behavior:
const debouncedSearch = debounce(searchProducts, 300);

// Gọi liên tục 5 lần trong 100ms
debouncedSearch("shirt");
debouncedSearch("shirts");
debouncedSearch("shirts b");
debouncedSearch("shirts bl");
debouncedSearch("shirts blue");

// Chỉ searchProducts('shirts blue') được gọi 1 lần sau 300ms

// Solution:
function debounce(func, wait) {
  let timeoutId = null;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
```

**Challenge 2: Implement cart total calculator**

```javascript
// Task: Calculate cart total with discounts and tax

const cart = {
  items: [
    { productId: "1", price: 29.99, quantity: 2 },
    { productId: "2", price: 49.99, quantity: 1 },
  ],
  coupon: { type: "percentage", value: 10 }, // 10% off
  taxRate: 0.08, // 8%
  freeShippingThreshold: 100,
  shippingCost: 9.99,
};

function calculateCartTotal(cart) {
  // Your implementation
}

// Expected output:
// {
//   subtotal: 109.97,
//   discount: 10.997,
//   afterDiscount: 98.973,
//   shipping: 0, // Free because > 100 before discount
//   tax: 7.92,
//   total: 106.89
// }

// Solution:
function calculateCartTotal(cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (cart.coupon) {
    if (cart.coupon.type === "percentage") {
      discount = subtotal * (cart.coupon.value / 100);
    } else if (cart.coupon.type === "fixed") {
      discount = Math.min(cart.coupon.value, subtotal);
    }
  }

  const afterDiscount = subtotal - discount;

  // Free shipping based on subtotal (before discount)
  const shipping = subtotal >= cart.freeShippingThreshold ? 0 : cart.shippingCost;

  const tax = Number((afterDiscount * cart.taxRate).toFixed(2));

  const total = Number((afterDiscount + shipping + tax).toFixed(2));

  return { subtotal, discount, afterDiscount, shipping, tax, total };
}
```

---

# Part 12: Tài liệu Tham khảo & Học thêm

## 12.1 Documentation Chính thức

### Frontend

| Resource     | Link                     | Notes                    |
| ------------ | ------------------------ | ------------------------ |
| React Docs   | https://react.dev        | New React documentation  |
| Vite Guide   | https://vitejs.dev/guide | Build tool documentation |
| React Router | https://reactrouter.com  | Routing documentation    |
| Axios        | https://axios-http.com   | HTTP client docs         |

### Backend

| Resource | Link                         | Notes                 |
| -------- | ---------------------------- | --------------------- |
| Node.js  | https://nodejs.org/docs      | Official Node.js docs |
| Express  | https://expressjs.com        | Web framework         |
| MongoDB  | https://www.mongodb.com/docs | Database docs         |
| Mongoose | https://mongoosejs.com/docs  | ODM documentation     |

### Security

| Resource     | Link                       | Notes                  |
| ------------ | -------------------------- | ---------------------- |
| OWASP Top 10 | https://owasp.org/Top10    | Common vulnerabilities |
| JWT.io       | https://jwt.io             | JWT debugger & docs    |
| Helmet.js    | https://helmetjs.github.io | Security headers       |

## 12.2 Khóa học & Tutorials

### Tiếng Việt

- **F8**: https://fullstack.edu.vn - Khóa JavaScript, React miễn phí
- **TEDU**: https://tedu.com.vn - Khóa .NET, React
- **Kteam**: https://howkteam.vn - Lập trình cơ bản

### Tiếng Anh

- **freeCodeCamp**: https://freecodecamp.org - Full stack curriculum miễn phí
- **The Odin Project**: https://theodinproject.com - Full stack path
- **Frontend Masters**: https://frontendmasters.com - Advanced courses (paid)
- **Udemy**: Search "MERN Stack" - Nhiều courses chất lượng

### YouTube Channels

- **Traversy Media** - Web development tutorials
- **Fireship** - Quick, modern web content
- **Web Dev Simplified** - React & JavaScript
- **The Net Ninja** - Full stack tutorials

## 12.3 Cộng đồng & Hỗ trợ

### Forums

- **Stack Overflow**: https://stackoverflow.com - Q&A
- **Reddit**: r/reactjs, r/node, r/webdev
- **Dev.to**: https://dev.to - Blog community

### Discord Servers

- Reactiflux (React community)
- Nodeiflux (Node.js community)
- Frontend Mentor

### Vietnamese Communities

- Vietnam Developer Community (Facebook)
- Cộng đồng JavaScript Việt Nam (Facebook)
- Viblo.asia - Tech blog platform

## 12.4 Tools & Productivity

### Development

| Tool            | Purpose           |
| --------------- | ----------------- |
| VS Code         | Code editor       |
| Postman         | API testing       |
| MongoDB Compass | Database GUI      |
| React DevTools  | Browser extension |
| Redux DevTools  | State debugging   |

### Deployment

| Tool           | Purpose          |
| -------------- | ---------------- |
| Docker         | Containerization |
| GitHub Actions | CI/CD            |
| Vercel         | Frontend hosting |
| Railway/Render | Backend hosting  |
| Cloudflare     | CDN & DNS        |

---

# Part 13: Định hướng Nghề nghiệp

## 13.1 Chuẩn bị Portfolio

### GitHub Profile

```markdown
# README.md cho GitHub profile

## 👋 Hi, I'm [Your Name]

🔭 I'm currently working on: [Current project]
🌱 I'm learning: [Technologies]
💬 Ask me about: React, Node.js, MongoDB
📫 How to reach me: [Email/LinkedIn]

### 🛠️ Tech Stack

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)

### 📊 GitHub Stats

[GitHub stats card]
```

### Project Showcase

```markdown
# Fashion E-commerce Website

## 🚀 Live Demo: [Link]

## 📋 Features

- ✅ User authentication with JWT
- ✅ Shopping cart with guest checkout
- ✅ Product search and filtering
- ✅ Order management
- ✅ Admin dashboard

## 🛠️ Tech Stack

- Frontend: React 18, Vite, React Router 6
- Backend: Node.js, Express 5, MongoDB
- Auth: JWT with refresh tokens
- Deployment: Docker, Nginx, Ubuntu VPS

## 📸 Screenshots

[Screenshots of key features]

## 🏃‍♂️ Run Locally

git clone [repo]
cd project
npm install
npm run dev

## 📝 Lessons Learned

- Implemented secure authentication with httpOnly cookies
- Handled race conditions in inventory management
- Optimized MongoDB queries with proper indexing
```

## 13.2 Chuẩn bị Phỏng vấn

### Kỹ thuật Trả lời STAR

```
S - Situation: Bối cảnh, hoàn cảnh
T - Task: Nhiệm vụ của bạn
A - Action: Hành động bạn đã làm
R - Result: Kết quả đạt được

Example:
Q: "Tell me about a challenging bug you solved"

S: "In my e-commerce project, users reported that sometimes
    their cart items disappeared after logging in."

T: "I needed to find and fix the root cause while ensuring
    no data was lost for affected users."

A: "I analyzed the auth flow and discovered a race condition
    between cart merge and session creation. I implemented
    proper async/await handling and added retry logic."

R: "The fix eliminated the issue completely. I also added
    monitoring to detect similar issues early. No more user
    complaints about lost carts."
```

### Câu hỏi Thường gặp

**Behavioral:**

1. Tell me about yourself
2. Why do you want to work here?
3. Describe a project you're proud of
4. How do you handle disagreements with teammates?
5. Tell me about a time you failed

**Technical:**

1. Explain the virtual DOM in React
2. What is the difference between SQL and NoSQL?
3. How does HTTPS work?
4. Explain async/await vs callbacks vs promises
5. What happens when you type a URL in browser?

## 13.3 Career Growth Path

```
Junior Developer (0-2 years)
├── Focus: Learn, build, ask questions
├── Skills: Core language, framework basics, git
└── Goal: Ship features independently

Mid Developer (2-5 years)
├── Focus: Architecture, mentoring
├── Skills: System design, testing, DevOps basics
└── Goal: Lead small projects/features

Senior Developer (5+ years)
├── Focus: Technical leadership, cross-team impact
├── Skills: Scalability, security, team building
└── Goal: Drive technical direction

Staff/Principal (8+ years)
├── Focus: Organization-wide impact
├── Skills: Strategy, influence, innovation
└── Goal: Solve company-level problems
```

---

# PART I: PHỤ LỤC QUAN TRỌNG 📚

## Phụ lục A: Security Checklist & Best Practices

> 🎯 **Mục tiêu**: Hiểu và áp dụng đầy đủ các biện pháp bảo mật cho ứng dụng web production

### A.1 Checklist Bảo mật Backend

```markdown
## Authentication & Authorization

- [ ] Password hashing với bcrypt (salt rounds >= 12)
      → Tại sao: Brute-force attack cần ~100 năm để crack
- [ ] JWT stored trong httpOnly cookie
      → Tại sao: XSS không thể đọc được cookie này
- [ ] Refresh token rotation
      → Tại sao: Nếu token bị đánh cắp, chỉ dùng được 1 lần
- [ ] Access token ngắn hạn (15-30 phút)
      → Tại sao: Giảm window of vulnerability
- [ ] Logout invalidates all tokens
      → Tại sao: Ngăn session hijacking

## Input Validation

- [ ] Validate tất cả input với express-validator
      → Tại sao: Ngăn injection attacks
- [ ] Sanitize NoSQL queries với express-mongo-sanitize
      → Tại sao: Ngăn NoSQL injection ($gt, $ne, etc)
- [ ] Escape HTML trong output
      → Tại sao: Ngăn stored XSS
- [ ] Validate file upload (type, size, content)
      → Tại sao: Ngăn malicious file execution

## Rate Limiting & DDoS Protection

- [ ] Rate limit: 100 requests/5 phút (production)
      → Tại sao: Ngăn brute-force và DDoS
- [ ] Stricter rate limit cho auth endpoints (5/15min)
      → Tại sao: Protect password guessing
- [ ] Slowdown middleware cho repeated failures
      → Tại sao: Tăng cost cho attacker

## Headers & Transport Security

- [ ] Helmet.js enabled với CSP strict
      → Tại sao: Ngăn XSS, clickjacking, MIME sniffing
- [ ] HTTPS only (HSTS enabled)
      → Tại sao: Encrypt all traffic, ngăn MITM
- [ ] Secure cookie flags (secure, sameSite)
      → Tại sao: Ngăn cookie theft và CSRF
- [ ] Remove X-Powered-By header
      → Tại sao: Không tiết lộ tech stack

## Database Security

- [ ] MongoDB không expose ra internet
      → Tại sao: Ngăn unauthorized access
- [ ] Database user có minimal permissions
      → Tại sao: Principle of least privilege
- [ ] Enable MongoDB authentication
      → Tại sao: Không ai truy cập anonymous
- [ ] Regular backup với encryption
      → Tại sao: Data recovery + data protection
```

### A.2 Checklist Bảo mật Frontend

```markdown
## XSS Prevention

- [ ] React tự động escape HTML (không dùng dangerouslySetInnerHTML)
      → Tại sao: React's default protection
- [ ] Sanitize user-generated content
      → Tại sao: Display user content safely
- [ ] CSP header chặn inline scripts
      → Tại sao: Block injected scripts

## Sensitive Data

- [ ] Không store sensitive data trong localStorage
      → Tại sao: XSS có thể đọc localStorage
- [ ] Không log sensitive data trong console
      → Tại sao: Browser extensions có thể capture
- [ ] Mask credit card, password inputs
      → Tại sao: Shoulder surfing protection
- [ ] Clear sensitive state on logout
      → Tại sao: Next user không thấy data

## API Communication

- [ ] HTTPS only
      → Tại sao: Encrypt data in transit
- [ ] Include CSRF token trong requests
      → Tại sao: Verify request origin
- [ ] Validate API responses
      → Tại sao: Don't trust server blindly
```

### A.3 Script Audit Bảo mật Tự động

```bash
#!/bin/bash
# security-audit.sh - Chạy trước mỗi lần deploy

echo "🔒 Running Security Audit..."

# Check for hardcoded secrets
echo "Checking for hardcoded secrets..."
grep -rn "password\s*=\s*['\"]" --include="*.js" --include="*.jsx" || echo "✅ No hardcoded passwords"
grep -rn "API_KEY\s*=\s*['\"]" --include="*.js" --include="*.jsx" || echo "✅ No hardcoded API keys"

# Check for console.log with sensitive data
echo "Checking for sensitive console.log..."
grep -rn "console.log.*password\|console.log.*token" --include="*.js" || echo "✅ No sensitive logs"

# Run npm audit
echo "Running npm audit..."
cd fashion-website-backend && npm audit --production
cd ../frontend && npm audit --production

# Check dependencies for vulnerabilities
echo "Checking for outdated packages..."
npm outdated

echo "🔒 Security Audit Complete!"
```

---

## Phụ lục B: Backup & Recovery Guide

> 🎯 **Mục tiêu**: Đảm bảo data không bao giờ mất và có thể phục hồi nhanh chóng

### B.1 Tại sao cần Backup?

```
❌ Không có backup:
   - Hardware failure → Mất tất cả data
   - Human error (delete nhầm) → Không thể undo
   - Ransomware → Phải trả tiền hoặc mất data
   - Database corruption → Mất tất cả

✅ Có backup strategy:
   - Hardware failure → Restore từ backup
   - Human error → Point-in-time recovery
   - Ransomware → Restore từ offline backup
   - Corruption → Restore từ clean backup
```

### B.2 Backup Strategy (3-2-1 Rule)

```markdown
3 copies of data:
├── 1 Production database (live data)
├── 1 Local backup (trên cùng server)
└── 1 Offsite backup (cloud storage)

2 different storage types:
├── SSD (production)
└── Object storage (S3/DigitalOcean Spaces)

1 offsite backup:
└── Different geographic location
```

### B.3 MongoDB Backup Script

```bash
#!/bin/bash
# backup-mongodb.sh

# Configuration
BACKUP_DIR="/var/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
MONGO_HOST="localhost"
MONGO_PORT="27017"
MONGO_DB="fashion_db"

# Tạo thư mục backup nếu chưa có
mkdir -p $BACKUP_DIR

# Tại sao dùng mongodump?
# → Binary backup, nhanh, có thể restore point-in-time
# → Hỗ trợ backup khi database đang chạy

echo "📦 Starting MongoDB backup..."
mongodump \
    --host $MONGO_HOST \
    --port $MONGO_PORT \
    --db $MONGO_DB \
    --out $BACKUP_DIR/$DATE \
    --gzip  # Tại sao gzip? Giảm 70-90% dung lượng

# Kiểm tra backup thành công
if [ $? -eq 0 ]; then
    echo "✅ Backup successful: $BACKUP_DIR/$DATE"

    # Tại sao upload offsite?
    # → Server chết thì backup vẫn còn
    echo "☁️ Uploading to cloud storage..."
    aws s3 cp $BACKUP_DIR/$DATE s3://your-bucket/backups/$DATE --recursive

    # Xóa backup cũ hơn 7 ngày (local)
    # Tại sao? Tiết kiệm disk space
    find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;

    echo "🗑️ Cleaned up old backups"
else
    echo "❌ Backup failed!"
    # Gửi alert
    curl -X POST "https://hooks.slack.com/your-webhook" \
         -H "Content-Type: application/json" \
         -d '{"text":"⚠️ MongoDB backup FAILED!"}'
    exit 1
fi

# Log backup
echo "$DATE - Backup completed" >> $BACKUP_DIR/backup.log
```

### B.4 Thiết lập Cron Job

```bash
# Chạy backup hàng ngày lúc 2:00 AM
# Tại sao 2AM? Traffic thấp, impact ít nhất

# Edit crontab
crontab -e

# Thêm dòng này:
0 2 * * * /opt/scripts/backup-mongodb.sh >> /var/log/backup.log 2>&1

# Giải thích cron expression:
# ┌─────── minute (0)
# │ ┌───── hour (2 = 2AM)
# │ │ ┌─── day of month (*)
# │ │ │ ┌─ month (*)
# │ │ │ │ ┌ day of week (*)
# 0 2 * * *
```

### B.5 Restore từ Backup

```bash
#!/bin/bash
# restore-mongodb.sh

BACKUP_PATH=$1  # Đường dẫn đến backup
MONGO_DB="fashion_db"

if [ -z "$BACKUP_PATH" ]; then
    echo "Usage: ./restore-mongodb.sh <backup_path>"
    exit 1
fi

echo "⚠️ WARNING: This will REPLACE all data in $MONGO_DB"
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Cancelled."
    exit 0
fi

echo "🔄 Restoring from $BACKUP_PATH..."

# Tại sao --drop? Xóa data cũ trước khi restore
mongorestore \
    --db $MONGO_DB \
    --drop \
    --gzip \
    $BACKUP_PATH/$MONGO_DB

if [ $? -eq 0 ]; then
    echo "✅ Restore successful!"
else
    echo "❌ Restore failed!"
    exit 1
fi
```

### B.6 Code Backup (Git)

```bash
# Tại sao cần backup code riêng?
# → Git history có thể bị corrupt
# → GitHub có thể down
# → Account có thể bị lock

# Backup Git repository định kỳ
git clone --mirror git@github.com:user/fashion-website.git
tar -czf fashion-website-$(date +%Y%m%d).tar.gz fashion-website.git
# Upload to backup storage
```

---

## Phụ lục C: Debugging & Troubleshooting Guide

> 🎯 **Mục tiêu**: Giải quyết bugs nhanh chóng và có hệ thống

### C.1 Debugging Mindset

```
🎯 Quy trình Debug 5 bước:

1. REPRODUCE - Tái hiện bug
   → Nếu không reproduce được, không thể fix

2. ISOLATE - Cô lập vấn đề
   → Frontend hay Backend? Network? Database?

3. IDENTIFY - Xác định root cause
   → Không fix symptoms, fix root cause

4. FIX - Sửa lỗi
   → Minimal change, không break other things

5. VERIFY - Kiểm tra fix
   → Test case ban đầu + regression test
```

### C.2 Common Errors & Solutions

#### Frontend Errors

```javascript
// ❌ Error: "Cannot read property 'X' of undefined"
// Nguyên nhân: Truy cập property của object null/undefined
// Fix:
const name = user?.name || "Guest"; // Optional chaining + fallback

// ❌ Error: "Too many re-renders"
// Nguyên nhân: Infinite loop trong useEffect
// Kiểm tra:
useEffect(() => {
  // ❌ Sai: setState không có dependency → infinite loop
  setData(data);
}, []); // Thêm [] hoặc đúng dependencies

// ❌ Error: "Objects are not valid as React child"
// Nguyên nhân: Render object thay vì string
// Fix:
{
  JSON.stringify(object);
} // Hoặc access specific property

// ❌ Error: Network Error / CORS
// Nguyên nhân: Backend chưa config CORS đúng
// Kiểm tra:
// 1. Backend có cors middleware?
// 2. Origin có trong whitelist?
// 3. Credentials: true ở cả 2 phía?
```

#### Backend Errors

```javascript
// ❌ Error: "MongooseServerSelectionError"
// Nguyên nhân: Không kết nối được MongoDB
// Kiểm tra:
// 1. MongoDB đang chạy? → systemctl status mongod
// 2. Connection string đúng?
// 3. Network/firewall cho phép?

// ❌ Error: "jwt malformed"
// Nguyên nhân: Token không hợp lệ
// Kiểm tra:
// 1. Token có "Bearer " prefix không?
// 2. Token có expire không?
// 3. Secret key có khớp không?

// ❌ Error: "EADDRINUSE"
// Nguyên nhân: Port đang được sử dụng
// Fix:
// Linux: lsof -i :5000 → kill process
// Windows: netstat -ano | findstr :5000

// ❌ Error: "PayloadTooLargeError"
// Nguyên nhân: Request body > limit
// Fix: Tăng limit trong express.json()
app.use(express.json({ limit: "10mb" }));
```

### C.3 Debugging Tools

```javascript
// 1. Console methods (không chỉ console.log!)
console.log("Basic output");
console.error("Error with red color");
console.warn("Warning with yellow");
console.table([{ a: 1 }, { a: 2 }]); // Table format
console.time("Timer");
// ... code
console.timeEnd("Timer"); // Đo thời gian execution
console.trace(); // Stack trace
console.group("Group");
console.log("Nested");
console.groupEnd();

// 2. Debugger statement
function complexFunction(data) {
  debugger; // Browser sẽ pause ở đây
  // ... code
}

// 3. React DevTools
// Install extension, xem component tree, state, props

// 4. Network tab
// Kiểm tra requests, responses, timing, headers
```

### C.4 Debug Checklist

```markdown
## Khi gặp bug, kiểm tra theo thứ tự:

### Frontend Issues

- [ ] Console có error không?
- [ ] Network tab: request có gửi không?
- [ ] Request payload đúng không?
- [ ] Response status code?
- [ ] Response data đúng format?
- [ ] State/props có update không? (React DevTools)

### Backend Issues

- [ ] Server có chạy không?
- [ ] Request có tới server không? (check logs)
- [ ] Route có match không?
- [ ] Middleware có block không?
- [ ] Database query có lỗi không?
- [ ] Response có gửi đúng không?

### Database Issues

- [ ] MongoDB có chạy không?
- [ ] Connection string đúng?
- [ ] Collection/document tồn tại?
- [ ] Query syntax đúng?
- [ ] Index có cho slow queries?

### Deployment Issues

- [ ] Environment variables set đúng?
- [ ] Port có conflict không?
- [ ] SSL certificate hợp lệ?
- [ ] Nginx config đúng?
- [ ] Firewall rules?
```

### C.5 Logging Best Practices

```javascript
// fashion-website-backend/src/utils/logger.js

const winston = require("winston");

// Tại sao dùng Winston?
// → Multiple transports (console, file, cloud)
// → Log levels (error, warn, info, debug)
// → Structured logging (JSON format)

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Console cho development
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    // File cho production
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

// Sử dụng:
logger.info("User logged in", { userId: user._id, ip: req.ip });
logger.error("Payment failed", { orderId, error: err.message });
logger.warn("Rate limit approaching", { ip: req.ip, count: 80 });

module.exports = logger;
```

---

## Phụ lục D: Quick Reference Cheatsheet

### D.1 Git Commands

```bash
# Daily workflow
git status                    # Xem changes
git add .                     # Stage all
git commit -m "feat: add X"   # Commit
git push origin main          # Push

# Branching
git checkout -b feature/name  # Create & switch branch
git merge feature/name        # Merge vào current branch
git branch -d feature/name    # Delete branch

# Undo mistakes
git checkout -- file.js       # Discard local changes
git reset HEAD~1              # Undo last commit (keep changes)
git reset --hard HEAD~1       # Undo last commit (discard changes)
git stash                     # Save changes temporarily
git stash pop                 # Restore stashed changes
```

### D.2 npm Commands

```bash
# Basics
npm install                   # Install dependencies
npm install package           # Add dependency
npm install -D package        # Add dev dependency
npm uninstall package         # Remove package
npm update                    # Update all packages

# Scripts
npm run dev                   # Development mode
npm run build                 # Production build
npm run start                 # Start production
npm run lint                  # Run linter
npm run test                  # Run tests

# Maintenance
npm audit                     # Check vulnerabilities
npm audit fix                 # Auto-fix vulnerabilities
npm outdated                  # Check outdated packages
npm cache clean --force       # Clear npm cache
```

### D.3 MongoDB Commands

```bash
# Mongo shell
mongosh                       # Connect to local
mongosh "mongodb://host/db"   # Connect to remote

# Basic operations
show dbs                      # List databases
use fashion_db                # Switch database
show collections              # List collections

# CRUD
db.products.find()            # Find all
db.products.find({price: {$gt: 100}})  # Find with filter
db.products.insertOne({...})  # Insert one
db.products.updateOne({_id}, {$set: {...}})  # Update one
db.products.deleteOne({_id})  # Delete one

# Indexes
db.products.createIndex({name: 1})     # Create index
db.products.getIndexes()               # List indexes
db.products.dropIndex("name_1")        # Drop index
```

### D.4 Linux Server Commands

```bash
# Process management
pm2 start server.js          # Start with PM2
pm2 restart app              # Restart app
pm2 stop app                 # Stop app
pm2 logs                     # View logs
pm2 monit                    # Monitor resources

# Nginx
sudo nginx -t                # Test config
sudo systemctl reload nginx  # Reload config
sudo systemctl restart nginx # Restart nginx

# System
htop                         # System monitor
df -h                        # Disk usage
free -m                      # Memory usage
netstat -tulpn               # Open ports

# Logs
tail -f /var/log/nginx/access.log   # Live nginx logs
tail -100 logs/error.log            # Last 100 lines
journalctl -u nginx -f              # Systemd logs
```

---

## Phụ lục E: Code Changes Log (BỔ SUNG MỚI) ⭐

> 📅 **Cập nhật:** 2025-01-10
> 🎯 **Mục đích:** Ghi chú tất cả các thay đổi code trong quá trình phát triển dự án

---

### E.1 Automated API Test Suite

**📁 File mới:** `fashion-website-backend/tests/api-test.js`

| Thông tin    | Chi tiết                                  |
| ------------ | ----------------------------------------- |
| **Ngày tạo** | 2025-01-10                                |
| **Mục đích** | Kiểm thử tự động 65 API endpoints         |
| **Lợi ích**  | Phát hiện lỗi sớm, đảm bảo tính nhất quán |

**Tính năng:**

- ✅ 65 test cases cover tất cả modules
- ✅ Chạy bằng lệnh `node tests/api-test.js`
- ✅ Xuất báo cáo JSON tự động
- ✅ Console output có màu sắc dễ đọc

---

### E.2 API Design Observations (Phát hiện từ Testing)

> ⚠️ **Những pattern quan trọng cần biết khi làm việc với API:**

#### E.2.1 Sort Parameter Format

**📁 File liên quan:** `backend/src/controllers/productController.js`

```javascript
// ✅ ĐÚNG: Dùng format hyphenated
const sortOptions = {
  "price-asc": "price",
  "price-desc": "-price",
  newest: "-createdAt",
  oldest: "createdAt",
  "name-asc": "name",
  "name-desc": "-name",
  rating: "-ratings.average",
  popular: "-numReviews",
};

// Gọi API như sau:
// GET /api/products?sort=price-asc  ✅
// GET /api/products?sort=price&order=asc  ❌ KHÔNG ĐÚNG
```

**💡 Lý do:** Đơn giản hóa query string, dễ validate và parse.

---

#### E.2.2 Product Data Structure

**📁 File liên quan:** `backend/src/models/Product.js`

```javascript
// ✅ Cấu trúc sizes - PHẢI dùng object với name là enum
sizes: [
  {
    name: {
      type: String,
      required: true,
      enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size"],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: String,
  },
],

// ✅ Cấu trúc colors - Có hexCode để hiển thị màu
colors: [
  {
    name: {
      type: String,
      required: true,
    },
    hexCode: {
      type: String,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color code"],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [String],
  },
],

// ✅ Cấu trúc images - Có isPrimary để xác định ảnh chính
images: [
  {
    url: {
      type: String,
      required: true,
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
],
```

**💡 Khi tạo Product từ API:**

```javascript
// ✅ Request body đúng format
const newProduct = {
  name: "Test Product",
  description: "Product description...",
  price: 99.99,
  category: "men", // enum: women, men, kids, accessories, shoes, bags
  stock: 100,
  sizes: [
    { name: "S", stock: 30 },
    { name: "M", stock: 40 },
    { name: "L", stock: 30 },
  ],
  colors: [
    { name: "Black", hexCode: "#000000", stock: 50 },
    { name: "White", hexCode: "#FFFFFF", stock: 50 },
  ],
  images: [{ url: "https://example.com/image.jpg", alt: "Product image", isPrimary: true }],
};
```

---

#### E.2.3 User Role Assignment

**📁 File liên quan:** `backend/src/models/User.js`

```javascript
// Khi người dùng đăng ký, role mặc định là "user"
role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",  // ← Mặc định khi register
},
```

| Hành động          | Role được gán                    |
| ------------------ | -------------------------------- |
| Register (đăng ký) | `user` (mặc định)                |
| Login (đăng nhập)  | Giữ nguyên role trong DB         |
| Nâng cấp admin     | Phải cập nhật trực tiếp trong DB |

---

#### E.2.4 Rate Limiting trên Auth Endpoints

**📁 File liên quan:** `backend/src/config/security.js`

```javascript
// Các endpoint nhạy cảm có rate limiting
// Có thể trả về status 429 Too Many Requests

// Khi viết test, cần xử lý case này:
return {
  passed: [400, 404, 429].includes(res.status),
  expected: "Status 400, 404 or 429 (rate limited)",
  actual: `Status ${res.status}`,
};
```

**Endpoints bị rate limit:**

- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`
- `POST /api/auth/login` (sau nhiều lần sai)

---

#### E.2.5 Guest Cart với Session Header

**📁 File liên quan:** `backend/src/controllers/cartController.js`

```javascript
// Helper: Get or create cart for user or guest
const getOrCreateCart = async (req) => {
  // Nếu user đăng nhập, dùng user cart
  if (req.user) {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    return cart;
  }

  // Cho guest, dùng sessionId từ header hoặc body
  const sessionId = req.headers["x-cart-session"] || req.body.sessionId;
  if (!sessionId) {
    return null; // ← Trả về null nếu không có session
  }

  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
  }
  return cart;
};
```

**💡 Khi gọi Cart API cho guest:**

```javascript
// Frontend cần gửi header x-cart-session
const response = await fetch("/api/cart", {
  headers: {
    "x-cart-session": "guest_" + sessionId,
  },
});
```

---

### E.3 Test Suite Files Created

| File                         | Mục đích                | Kích thước     |
| ---------------------------- | ----------------------- | -------------- |
| `tests/api-test.js`          | Script kiểm thử tự động | ~1400 lines    |
| `tests/api-test-report.json` | Báo cáo JSON            | Auto-generated |
| `tests/API_TEST_REPORT.md`   | Báo cáo Markdown        | Auto-generated |

---

### E.4 Danh sách API Endpoints đã test

```
✅ Health Check (3 tests)
   GET /api/health
   GET /api
   GET /api/invalid-route (404)

✅ Authentication (14 tests)
   POST /api/auth/register
   POST /api/auth/login
   GET /api/auth/me
   POST /api/auth/refresh-token
   POST /api/auth/forgot-password
   POST /api/auth/reset-password/:token
   POST /api/auth/logout

✅ Products (14 tests)
   GET /api/products
   GET /api/products?search=...
   GET /api/products?category=...
   GET /api/products?minPrice=...&maxPrice=...
   GET /api/products?sort=price-asc
   GET /api/products/:id
   GET /api/products/featured
   GET /api/products/new-arrivals
   GET /api/products/sale
   GET /api/products/categories
   GET /api/products/:id/related
   POST /api/products (Admin)

✅ Cart (8 tests)
   GET /api/cart
   POST /api/cart/items
   POST /api/cart/coupon
   GET /api/cart/validate
   DELETE /api/cart

✅ Wishlist (7 tests)
   GET /api/wishlist
   POST /api/wishlist/:productId
   GET /api/wishlist/check/:productId
   POST /api/wishlist/:productId/toggle
   DELETE /api/wishlist/:productId
   DELETE /api/wishlist

✅ Checkout (6 tests)
   POST /api/checkout/initialize
   GET /api/checkout/shipping-rates
   POST /api/checkout/calculate-tax
   POST /api/checkout/validate-coupon
   POST /api/checkout/complete

✅ Orders (5 tests)
   GET /api/orders
   GET /api/orders/:id
   GET /api/orders/track/:orderNumber
   GET /api/orders/all (Admin)

✅ Profile (7 tests)
   GET /api/profile
   PUT /api/profile
   PUT /api/profile/password
```

---

## Phụ lục F: Các Tính Năng Nâng Cao Đã Implement ⭐ **MỚI**

### F.1 Tổng Quan Các Tính Năng Mới

Sau khi hoàn thành phần cơ bản, hệ thống đã được bổ sung thêm các tính năng sau:

| Module               | Mô tả                              | Status  |
| -------------------- | ---------------------------------- | ------- |
| Reviews & Ratings    | Đánh giá sản phẩm, vote helpful    | ✅ Done |
| Coupon System        | Mã giảm giá với các điều kiện      | ✅ Done |
| Payment Integration  | COD, Bank Transfer, Stripe, VNPay  | ✅ Done |
| Admin Dashboard      | Thống kê, quản lý đơn hàng         | ✅ Done |
| Inventory Management | Quản lý tồn kho, cảnh báo hết hàng | ✅ Done |
| Email Notifications  | Email xác nhận thanh toán, refund  | ✅ Done |

---

### F.2 Review & Rating System

#### F.2.1 Review Model

**📁 File:** `backend/src/models/Review.js`

```javascript
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, maxlength: 100 },
  comment: { type: String, required: true, maxlength: 1000 },
  images: [{ url: String, alt: String }],
  isVerifiedPurchase: { type: Boolean, default: false },
  helpfulVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  helpfulCount: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  adminReply: { content: String, repliedAt: Date, repliedBy: ObjectId },
});
```

**Các tính năng:**

- 1-5 star rating
- Verified purchase badge (kiểm tra đã mua sản phẩm)
- Helpful votes (vote hữu ích)
- Admin moderation (approve/reject)
- Admin reply
- Auto-calculate product average rating

#### F.2.2 Review API Endpoints

```
# Public
GET /api/reviews/product/:productId     # Lấy reviews của sản phẩm

# User (cần đăng nhập)
POST /api/reviews/product/:productId    # Tạo review
PUT /api/reviews/:reviewId              # Sửa review
DELETE /api/reviews/:reviewId           # Xóa review
POST /api/reviews/:reviewId/helpful     # Vote helpful
GET /api/reviews/my-reviews             # Reviews của tôi
GET /api/reviews/can-review/:productId  # Kiểm tra có thể review không

# Admin
GET /api/reviews/admin/all              # Tất cả reviews
PUT /api/reviews/admin/:reviewId/approve
PUT /api/reviews/admin/:reviewId/reject
POST /api/reviews/admin/:reviewId/reply
```

---

### F.3 Coupon System

#### F.3.1 Coupon Model

**📁 File:** `backend/src/models/Coupon.js`

```javascript
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  discountValue: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: { type: Number }, // Giới hạn cho percentage
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  usageLimit: { type: Number }, // Giới hạn tổng số lần dùng
  usageCount: { type: Number, default: 0 },
  userUsageLimit: { type: Number, default: 1 }, // Số lần mỗi user được dùng
  usedBy: [{ user: ObjectId, usedAt: Date, orderId: ObjectId }],
  applicableCategories: [String],
  applicableProducts: [ObjectId],
  excludedProducts: [ObjectId],
  firstOrderOnly: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});
```

**Các phương thức:**

- `canBeUsedBy(userId)` - Kiểm tra user có thể dùng coupon không
- `calculateDiscount(cartTotal)` - Tính số tiền được giảm
- `recordUsage(userId, orderId)` - Ghi nhận lượt sử dụng

#### F.3.2 Coupon API Endpoints

```
# User
POST /api/coupons/validate     # Validate coupon với cartTotal
GET /api/coupons/available     # Danh sách coupon có thể dùng

# Admin
POST /api/coupons              # Tạo coupon
GET /api/coupons               # Danh sách tất cả coupons
GET /api/coupons/:id           # Chi tiết coupon
PUT /api/coupons/:id           # Cập nhật coupon
DELETE /api/coupons/:id        # Xóa coupon
PUT /api/coupons/:id/toggle    # Bật/tắt coupon
GET /api/coupons/:id/stats     # Thống kê sử dụng
```

---

### F.4 Payment Integration

#### F.4.1 Payment Controller

**📁 File:** `backend/src/controllers/paymentController.js`

**Các phương thức thanh toán hỗ trợ:**

| Method        | Status  | Mô tả                           |
| ------------- | ------- | ------------------------------- |
| COD           | ✅ Full | Thanh toán khi nhận hàng        |
| Bank Transfer | ✅ Full | Chuyển khoản ngân hàng          |
| Stripe        | 🔶 Mock | Credit/Debit card (cần API key) |
| VNPay         | 🔶 Mock | VNPay gateway (cần credentials) |

#### F.4.2 Payment API Endpoints

```
# Public
GET /api/payments/methods              # Danh sách phương thức

# User
POST /api/payments/stripe/intent       # Tạo Stripe PaymentIntent
POST /api/payments/stripe/confirm      # Xác nhận thanh toán Stripe
POST /api/payments/cod                 # Thanh toán COD
POST /api/payments/bank-transfer       # Chuyển khoản
POST /api/payments/vnpay/create        # Tạo VNPay payment
GET /api/payments/vnpay/callback       # VNPay callback
GET /api/payments/:orderId/status      # Trạng thái thanh toán
POST /api/payments/:orderId/refund     # Yêu cầu hoàn tiền

# Admin
PUT /api/payments/admin/:orderId/verify-transfer  # Xác nhận chuyển khoản
PUT /api/payments/admin/:orderId/process-refund   # Xử lý hoàn tiền
```

#### F.4.3 Bank Transfer Flow

```
1. User chọn Bank Transfer → POST /api/payments/bank-transfer
2. System tạo transfer reference (FAS + timestamp + orderNumber)
3. Gửi email hướng dẫn chuyển khoản với thông tin ngân hàng
4. User chuyển khoản với nội dung = transfer reference
5. Admin verify → PUT /api/payments/admin/:orderId/verify-transfer
6. System cập nhật paymentStatus = "completed"
7. Gửi email xác nhận thanh toán thành công
```

---

### F.5 Admin Dashboard

#### F.5.1 Dashboard Overview API

**📁 File:** `backend/src/controllers/adminController.js`

```javascript
// GET /api/admin/dashboard
{
  success: true,
  data: {
    orders: {
      total: 1250,
      today: 15,
      thisMonth: 320,
      lastMonth: 280,
      growth: "14.3%"
    },
    revenue: {
      total: 2500000000,
      thisMonth: 450000000,
      lastMonth: 380000000,
      growth: "18.4%"
    },
    products: {
      total: 450,
      lowStock: 23,
      outOfStock: 5
    },
    users: {
      total: 5600,
      newThisMonth: 120
    },
    pendingReviews: 15,
    activeCoupons: 8
  }
}
```

#### F.5.2 Admin API Endpoints

```
# Dashboard
GET /api/admin/dashboard           # Tổng quan
GET /api/admin/revenue-stats       # Doanh thu theo thời gian
GET /api/admin/top-products        # Top sản phẩm bán chạy
GET /api/admin/recent-orders       # Đơn hàng gần đây
GET /api/admin/category-stats      # Thống kê theo danh mục
GET /api/admin/user-stats          # Thống kê người dùng
GET /api/admin/low-stock           # Sản phẩm sắp hết hàng

# Order Management
GET /api/admin/orders              # Danh sách đơn hàng (filter, paginate)
PUT /api/admin/orders/:id/status   # Cập nhật trạng thái đơn hàng

# User Management
GET /api/admin/users               # Danh sách users (filter, paginate)
PUT /api/admin/users/:id/role      # Cập nhật role user

# Inventory
PUT /api/admin/products/:id/stock  # Cập nhật tồn kho
```

---

### F.6 Inventory Management

#### F.6.1 Inventory Controller

**📁 File:** `backend/src/controllers/inventoryController.js`

**Các tính năng:**

- Low stock alerts (cảnh báo hết hàng)
- Bulk stock update (cập nhật hàng loạt)
- Stock adjustment (điều chỉnh tăng/giảm)
- Stock history tracking (lịch sử thay đổi)
- Inventory reports (báo cáo tồn kho)
- Email alerts (gửi cảnh báo qua email)

#### F.6.2 Inventory API Endpoints

```
# Admin only
GET /api/inventory/alerts          # Danh sách cảnh báo tồn kho
GET /api/inventory/report          # Báo cáo tồn kho theo category
PUT /api/inventory/bulk-update     # Cập nhật tồn kho hàng loạt
PUT /api/inventory/:productId/adjust   # Điều chỉnh +/- tồn kho
GET /api/inventory/:productId/history  # Lịch sử thay đổi
POST /api/inventory/send-alerts    # Gửi email cảnh báo
```

#### F.6.3 Inventory Report Structure

```javascript
// GET /api/inventory/report
{
  success: true,
  data: {
    summary: {
      totalProducts: 450,
      totalStock: 12500,
      totalValue: 2500000000,
      outOfStock: 5,
      lowStock: 23
    },
    byCategory: [
      {
        category: "Áo",
        totalProducts: 120,
        avgPrice: 450000,
        totalStock: 3500,
        avgRating: 4.2
      },
      // ...
    ],
    generatedAt: "2024-01-15T10:30:00.000Z"
  }
}
```

---

### F.7 Email Notifications

#### F.7.1 Các Template Email Mới

**📁 File:** `backend/src/utils/emailService.js`

| Function                       | Mục đích                |
| ------------------------------ | ----------------------- |
| `sendPaymentConfirmationEmail` | Xác nhận thanh toán     |
| `sendBankTransferEmail`        | Hướng dẫn chuyển khoản  |
| `sendOrderStatusEmail`         | Cập nhật trạng thái đơn |
| `sendRefundEmail`              | Thông báo hoàn tiền     |

#### F.7.2 Email Template Structure

Tất cả email templates đều có:

- Header với logo Fashion Store (background #1a1a1a)
- Content section với thông tin chi tiết
- CTA button (màu #c9a962)
- Footer với copyright

---

### F.8 Files Đã Tạo/Cập Nhật

#### Các file MỚI:

| File                                     | Mô tả                      |
| ---------------------------------------- | -------------------------- |
| `src/models/Review.js`                   | Review Model               |
| `src/models/Coupon.js`                   | Coupon Model               |
| `src/controllers/reviewController.js`    | Review Controller          |
| `src/controllers/couponController.js`    | Coupon Controller          |
| `src/controllers/paymentController.js`   | Payment Controller         |
| `src/controllers/adminController.js`     | Admin Dashboard Controller |
| `src/controllers/inventoryController.js` | Inventory Controller       |
| `src/routes/reviewRoutes.js`             | Review Routes              |
| `src/routes/couponRoutes.js`             | Coupon Routes              |
| `src/routes/paymentRoutes.js`            | Payment Routes             |
| `src/routes/adminRoutes.js`              | Admin Routes               |
| `src/routes/inventoryRoutes.js`          | Inventory Routes           |
| `NEW_FEATURES_TEST.md`                   | Test documentation         |

#### Các file ĐÃ CẬP NHẬT:

| File                        | Thay đổi                 |
| --------------------------- | ------------------------ |
| `src/routes/index.js`       | Thêm các routes mới      |
| `src/utils/emailService.js` | Thêm email templates mới |

---

### F.9 Tổng Số API Endpoints

Sau khi bổ sung, hệ thống có tổng cộng:

| Module    | Public | User   | Admin  | Total  |
| --------- | ------ | ------ | ------ | ------ |
| Auth      | 2      | 5      | 0      | 7      |
| Products  | 8      | 0      | 2      | 10     |
| Cart      | 0      | 6      | 0      | 6      |
| Wishlist  | 0      | 6      | 0      | 6      |
| Checkout  | 0      | 5      | 0      | 5      |
| Orders    | 0      | 3      | 1      | 4      |
| Profile   | 0      | 4      | 0      | 4      |
| Reviews   | 1      | 6      | 4      | 11     |
| Coupons   | 0      | 2      | 7      | 9      |
| Payments  | 1      | 7      | 2      | 10     |
| Admin     | 0      | 0      | 12     | 12     |
| Inventory | 0      | 0      | 6      | 6      |
| **TOTAL** | **12** | **44** | **34** | **90** |

---

> 💡 **Lời kết**: Giáo án này cung cấp kiến thức fullstack từ cơ bản đến production-ready. Hãy học theo thứ tự, làm từng bước, và đừng skip phần nào. Mỗi concept đều quan trọng và liên kết với nhau.
>
> **Các tính năng đã implement:**
>
> ✅ Review & Rating System với verified purchase  
> ✅ Coupon System với nhiều điều kiện  
> ✅ Payment Integration (COD, Bank Transfer, Stripe mock, VNPay mock)  
> ✅ Admin Dashboard với thống kê real-time  
> ✅ Inventory Management với cảnh báo tồn kho  
> ✅ Email Notifications cho mọi hoạt động
>
> **Tiếp theo có thể thêm:**
>
> 1. Real-time notifications với Socket.io
> 2. Multi-language support (i18n)
> 3. Redis caching cho performance
> 4. Integrate Stripe/VNPay thật với API keys
>
> Good luck! 🚀
