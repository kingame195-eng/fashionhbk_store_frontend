# 🛍️ Fashion E-Commerce Website

A full-stack e-commerce fashion website built with React, Node.js, Express, and MongoDB.

> **This is a fullstack learning project** - Each code section includes explanations of why and how it's implemented.

---

## 📖 Learning Resources

| File                                                       | Description                                                    |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| [FASHION_FULLSTACK_GUIDE.md](./FASHION_FULLSTACK_GUIDE.md) | 📚 **Main Guide** - Step-by-step guide to building the project |

---

## 🏗️ Project Structure

```
fashion-website-frontend/
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/       # UI Components
│   │   ├── pages/            # Page Components
│   │   ├── context/          # State Management
│   │   ├── hooks/            # Custom Hooks
│   │   ├── services/         # API Services
│   │   └── styles/           # CSS Styles
│   └── package.json
│
├── fashion-website-backend/  # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/      # Request Handlers
│   │   ├── models/           # Database Models
│   │   ├── routes/           # API Routes
│   │   ├── middleware/       # Custom Middleware
│   │   ├── config/           # Configuration
│   │   └── utils/            # Utilities
│   └── package.json
│
├── nginx/                    # Nginx Configuration
└── .github/workflows/        # CI/CD Pipelines
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x LTS
- MongoDB 7.x
- Git

### 1. Clone repository

```bash
git clone https://github.com/your-username/fashion-website-frontend.git
cd fashion-website-frontend
```

### 2. Setup Backend

```bash
cd fashion-website-backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev           # Run at http://localhost:5000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev           # Run at http://localhost:3000
```

---

## ✨ Features

| Feature            | Description                    | Status         |
| ------------------ | ------------------------------ | -------------- |
| 🏠 Homepage        | Hero banner, featured products | ✅ Done        |
| 👗 Product Catalog | Browse, filter, pagination     | ✅ Done        |
| 🔍 Product Details | Images, sizes, colors          | ✅ Done        |
| 🛒 Shopping Cart   | Add/remove, quantity           | ✅ Done        |
| 🔐 Authentication  | JWT + httpOnly cookies         | ✅ Done        |
| 🔑 Password Reset  | Email recovery flow            | ✅ Done        |
| 👤 User Profile    | View/update profile            | ✅ Done        |
| 📱 Responsive      | Mobile-first design            | ✅ Done        |
| 💳 Checkout        | Payment integration            | 🚧 In Progress |
| 👨‍💼 Admin Panel     | Product/Order management       | 🚧 In Progress |

---

## 🛠️ Tech Stack

### Frontend

- **Vite** - Build tool with HMR
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Axios** - HTTP client
- **CSS Modules** - Scoped styling

### Backend

- **Node.js 20** - Runtime
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication

### Security

- Helmet (security headers)
- Rate limiting
- Input validation
- XSS/NoSQL injection protection

### DevOps

- GitHub Actions CI/CD
- Nginx reverse proxy
- Let's Encrypt SSL

---

## 📝 Scripts

### Backend

```bash
npm run dev      # Development with nodemon
npm start        # Production
npm run lint     # ESLint check
npm test         # Run tests
```

### Frontend

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
npm test         # Run tests
```

---

## 🌐 Deployment

See details in [FASHION_FULLSTACK_GUIDE.md](./FASHION_FULLSTACK_GUIDE.md) section **Part 6: Docker & Deployment**.

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for more details.

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

**Happy Coding! 🎉**
