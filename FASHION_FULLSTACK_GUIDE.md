# 🛍️ Complete Fullstack Fashion Website Guide

## Using Vite + React, Node.js/Express, Docker, Ubuntu Cloud Server & Termius

> A comprehensive, production-ready guide for building a professional fashion e-commerce website from scratch. Perfect for portfolio projects and job interviews.

---

# Part 1: Overview & Environment Preparation

## 📋 Table of Contents

- [1.1 Project Overview](#11-project-overview)
- [1.2 Technology Stack](#12-technology-stack)
- [1.3 Architecture Overview](#13-architecture-overview)
- [1.4 Prerequisites](#14-prerequisites)
- [1.5 Setting Up Your Cloud Server (Ubuntu)](#15-setting-up-your-cloud-server-ubuntu)
- [1.6 Installing & Configuring Termius](#16-installing--configuring-termius)
- [1.7 Local Development Environment Setup](#17-local-development-environment-setup)
- [1.8 Project Structure Overview](#18-project-structure-overview)

---

## 1.1 Project Overview

### What We're Building

A **professional fashion e-commerce website** with the following features:

| Feature                  | Description                                         |
| ------------------------ | --------------------------------------------------- |
| 🏠 **Homepage**          | Hero banner, featured products, categories          |
| 👗 **Product Catalog**   | Browse products with filters & pagination           |
| 🔍 **Product Details**   | Individual product pages with images, sizes, colors |
| 🛒 **Shopping Cart**     | Add/remove items, quantity management               |
| 🔐 **Authentication**    | Secure login/register with JWT + httpOnly cookies   |
| 👤 **User Profile**      | View orders, update information                     |
| 📱 **Responsive Design** | Mobile-first CSS approach                           |

### Why This Stack?

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION STACK                         │
├─────────────────────────────────────────────────────────────────┤
│  Frontend: Vite + React (Fast, Modern, Industry Standard)       │
│  Backend:  Node.js + Express (JavaScript everywhere)            │
│  Database: MongoDB (Flexible schema for e-commerce)             │
│  Auth:     JWT + httpOnly Cookies (Secure, No XSS attacks)      │
│  Deploy:   Docker + Ubuntu Server (Portable, Scalable)          │
│  Tools:    Termius (Professional server management)             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1.2 Technology Stack

### Frontend

| Technology       | Version | Purpose                         |
| ---------------- | ------- | ------------------------------- |
| **Vite**         | 5.x     | Build tool - Lightning fast HMR |
| **React**        | 18.x    | UI library                      |
| **React Router** | 6.x     | Client-side routing             |
| **Axios**        | 1.x     | HTTP client with interceptors   |
| **CSS Modules**  | -       | Scoped styling                  |

### Backend

| Technology   | Version  | Purpose               |
| ------------ | -------- | --------------------- |
| **Node.js**  | 20.x LTS | Runtime environment   |
| **Express**  | 4.x      | Web framework         |
| **MongoDB**  | 7.x      | NoSQL database        |
| **Mongoose** | 8.x      | MongoDB ODM           |
| **JWT**      | -        | Authentication tokens |
| **bcrypt**   | 5.x      | Password hashing      |

### DevOps & Infrastructure

| Technology         | Purpose                             |
| ------------------ | ----------------------------------- |
| **Docker**         | Containerization                    |
| **Docker Compose** | Multi-container orchestration       |
| **Nginx**          | Reverse proxy & static file serving |
| **Ubuntu Server**  | Cloud hosting OS                    |
| **Termius**        | SSH client for server management    |

---

## 1.3 Architecture Overview

```
                                    ┌──────────────────────┐
                                    │   Ubuntu Cloud       │
                                    │      Server          │
┌──────────────┐                    │  ┌────────────────┐  │
│   Browser    │ ◄──── HTTPS ─────► │  │     Nginx      │  │
│   (Client)   │                    │  │  (Port 80/443) │  │
└──────────────┘                    │  └───────┬────────┘  │
                                    │          │           │
                                    │    ┌─────┴─────┐     │
                                    │    ▼           ▼     │
                                    │ ┌─────┐    ┌─────┐   │
                                    │ │ FE  │    │ BE  │   │
                                    │ │React│    │Node │   │
                                    │ │:3000│    │:5000│   │
                                    │ └─────┘    └──┬──┘   │
                                    │               │      │
                                    │          ┌────▼────┐ │
                                    │          │ MongoDB │ │
                                    │          │ :27017  │ │
                                    │          └─────────┘ │
                                    │                      │
                                    │   Docker Network     │
                                    └──────────────────────┘
```

### Request Flow Explanation

1. **Browser** sends request to your domain (e.g., `fashion.yourdomain.com`)
2. **Nginx** receives the request and routes it:
   - `/api/*` routes → Backend container (port 5000)
   - `/*` routes → Frontend container (port 3000)
3. **Backend** processes API requests, communicates with MongoDB
4. **MongoDB** stores all application data
5. Response flows back through the same path

---

## 1.4 Prerequisites

### Required Knowledge

- ✅ Basic JavaScript/ES6+
- ✅ Basic React concepts (components, hooks, state)
- ✅ Basic command line/terminal usage
- ✅ Understanding of HTTP requests (GET, POST, etc.)

### Required Accounts & Services

| Service                    | Purpose               | Where to Get                                          |
| -------------------------- | --------------------- | ----------------------------------------------------- |
| **Cloud Provider Account** | Ubuntu Server hosting | DigitalOcean, Linode, Vultr, AWS, or any VPS provider |
| **Domain Name** (Optional) | Custom URL            | Namecheap, GoDaddy, Cloudflare                        |
| **GitHub Account**         | Version control       | github.com                                            |

### Software to Install (Local Machine)

#### 1. Node.js (v20 LTS)

```bash
# Windows - Download from https://nodejs.org/
# Or use nvm-windows: https://github.com/coreybutler/nvm-windows

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

#### 2. Visual Studio Code

Download from: https://code.visualstudio.com/

**Recommended Extensions:**

```
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Docker
- Thunder Client (API testing)
- GitLens
```

#### 3. Docker Desktop

Download from: https://www.docker.com/products/docker-desktop/

```bash
# Verify installation
docker --version        # Should show Docker version 24.x+
docker-compose --version # Should show version 2.x+
```

#### 4. Git

```bash
# Windows - Download from https://git-scm.com/

# Verify installation
git --version  # Should show git version 2.x+
```

#### 5. Termius

Download from: https://termius.com/

---

## 1.5 Setting Up Your Cloud Server (Ubuntu)

### Step 1: Create a VPS Instance

Choose any cloud provider and create an instance with these **minimum specs**:

| Spec          | Minimum          | Recommended      |
| ------------- | ---------------- | ---------------- |
| **OS**        | Ubuntu 22.04 LTS | Ubuntu 24.04 LTS |
| **RAM**       | 1 GB             | 2 GB             |
| **CPU**       | 1 vCPU           | 2 vCPU           |
| **Storage**   | 25 GB SSD        | 50 GB SSD        |
| **Bandwidth** | 1 TB             | Unlimited        |

> 💡 **Tip**: DigitalOcean, Linode, and Vultr offer $4-6/month VPS that work perfectly.

### Step 2: Initial Server Access

After creating your VPS, you'll receive:

- **IP Address**: e.g., `203.0.113.50`
- **Root Password** or **SSH Key**

```bash
# Connect via terminal (if you have SSH key)
ssh root@YOUR_SERVER_IP

# Or with password
ssh root@YOUR_SERVER_IP
# Enter password when prompted
```

### Step 3: Initial Server Security Setup

```bash
# Update system packages
apt update && apt upgrade -y

# Create a non-root user (replace 'developer' with your username)
adduser developer

# Grant sudo privileges
usermod -aG sudo developer

# Switch to new user
su - developer
```

### Step 4: Configure SSH Security

```bash
# Generate SSH key on your LOCAL machine (if you don't have one)
# Run this on your Windows PowerShell or Terminal:
ssh-keygen -t ed25519 -C "your_email@example.com"

# Display your public key
cat ~/.ssh/id_ed25519.pub

# Copy the output (starts with ssh-ed25519...)
```

```bash
# On the SERVER, as your new user:
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
# Paste your public key, save with Ctrl+X, Y, Enter

chmod 600 ~/.ssh/authorized_keys
```

### Step 5: Harden SSH Configuration

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Find and modify these lines:
# PermitRootLogin no          # Disable root login
# PasswordAuthentication no   # Disable password auth (use keys only)
# PubkeyAuthentication yes    # Enable key authentication

# Restart SSH service
sudo systemctl restart sshd
```

> ⚠️ **Warning**: Before disabling password authentication, make sure your SSH key works!

### Step 6: Configure Firewall (UFW)

```bash
# Enable UFW
sudo ufw enable

# Allow SSH (important - don't lock yourself out!)
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status

# Expected output:
# Status: active
# To                         Action      From
# --                         ------      ----
# OpenSSH                    ALLOW       Anywhere
# 80/tcp                     ALLOW       Anywhere
# 443/tcp                    ALLOW       Anywhere
```

### Step 7: Install Docker on Ubuntu Server

```bash
# Remove old versions (if any)
sudo apt remove docker docker-engine docker.io containerd runc

# Install prerequisites
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER

# Apply group changes (or logout/login)
newgrp docker

# Verify installation
docker --version
docker compose version
```

### Step 8: Install Git on Server

```bash
sudo apt install -y git
git --version
```

---

## 1.6 Installing & Configuring Termius

### Why Termius?

Termius is a modern SSH client that offers:

- 🖥️ Cross-platform (Windows, Mac, Linux, iOS, Android)
- 📁 SFTP file transfer
- 🔑 Secure credential storage
- 📊 Multiple server management
- 🎨 Clean, modern UI

### Step 1: Download & Install

1. Go to https://termius.com/
2. Download for your OS
3. Install and create an account (free tier works fine)

### Step 2: Add Your Server

1. Open Termius
2. Click **"+ New Host"**
3. Fill in the details:

```
Label:      Fashion-Server (or any name you prefer)
Address:    YOUR_SERVER_IP (e.g., 203.0.113.50)
Port:       22
Username:   developer (the user you created)
```

### Step 3: Add SSH Key to Termius

1. Go to **Keychain** in Termius
2. Click **"+ Key"**
3. Choose **"Import from file"**
4. Select your private key file:
   - Windows: `C:\Users\YourName\.ssh\id_ed25519`
   - Mac/Linux: `~/.ssh/id_ed25519`

### Step 4: Link Key to Host

1. Edit your host
2. Under **"Keys"**, select the key you imported
3. Save

### Step 5: Connect

1. Double-click your host
2. You should connect without password prompt
3. You're now in your server's terminal!

### Termius Tips

```bash
# Useful Termius shortcuts:
# Ctrl + Shift + V    - Paste
# Ctrl + Shift + C    - Copy
# Ctrl + Tab          - Switch tabs
# Ctrl + W            - Close tab
```

---

## 1.7 Local Development Environment Setup

### Create Project Directory Structure

```bash
# On your LOCAL machine
mkdir fashion-store
cd fashion-store

# Create main directories
mkdir -p frontend backend docker nginx

# Initialize git repository
git init
```

### Create Initial Files

```bash
# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Docker
docker-compose.override.yml
EOF
```

### Create README.md

```bash
cat > README.md << 'EOF'
# 🛍️ Fashion Store

A modern fullstack e-commerce fashion website.

## Tech Stack

- **Frontend**: Vite + React
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Deployment**: Docker + Ubuntu Server

## Getting Started

See documentation for setup instructions.

## License

MIT
EOF
```

---

## 1.8 Project Structure Overview

After completing all parts of this guide, your project will look like this:

```
fashion-store/
│
├── frontend/                    # React + Vite Frontend
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/             # Images, fonts
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Buttons, Inputs, Cards
│   │   │   ├── layout/         # Header, Footer, Navbar
│   │   │   └── products/       # Product-specific components
│   │   ├── context/            # React Context (Auth, Cart)
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/           # API calls
│   │   │   ├── api.js          # Axios instance
│   │   │   ├── authService.js
│   │   │   └── productService.js
│   │   ├── styles/             # CSS files
│   │   │   ├── global.css
│   │   │   ├── variables.css
│   │   │   └── components/
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── database.js
│   │   │   └── cors.js
│   │   ├── controllers/        # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── userController.js
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── auth.js         # JWT verification
│   │   │   ├── errorHandler.js
│   │   │   └── validate.js
│   │   ├── models/             # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/             # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── index.js
│   │   ├── services/           # Business logic
│   │   │   └── tokenService.js
│   │   ├── utils/              # Utilities
│   │   │   └── helpers.js
│   │   └── app.js              # Express app setup
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── server.js               # Entry point
│
├── nginx/                       # Nginx Configuration
│   ├── nginx.conf
│   └── conf.d/
│       └── default.conf
│
├── docker/                      # Docker-related files
│   └── mongo-init.js           # MongoDB initialization
│
├── docker-compose.yml           # Development compose
├── docker-compose.prod.yml      # Production compose
├── .gitignore
├── .env.example
└── README.md
```

---

## ✅ Part 1 Checklist

Before moving to Part 2, ensure you have:

- [ ] Cloud server (Ubuntu 22.04+) running and accessible
- [ ] Non-root user created with sudo privileges
- [ ] SSH key authentication configured
- [ ] Firewall (UFW) enabled with ports 22, 80, 443 open
- [ ] Docker and Docker Compose installed on server
- [ ] Termius installed and connected to your server
- [ ] Local development environment ready:
  - [ ] Node.js v20 LTS installed
  - [ ] VS Code with extensions
  - [ ] Docker Desktop running
  - [ ] Git configured
- [ ] Project directory structure created

---

## 🔜 Coming Up in Part 2

**Frontend Development with Vite + React**

- Initialize Vite project with React
- Set up project structure
- Create reusable components
- Implement CSS styling with CSS Modules
- Build responsive layouts
- Create all pages (Home, Products, Cart, Auth)

---

> 💡 **Pro Tip**: Take your time with this setup phase. A solid foundation prevents hours of debugging later!

---

# Part 2: Frontend Development with Vite + React

## 2.1 Project Initialization

### Step 1: Create Vite + React Project

```bash
# Navigate to your project root
cd fashion-store

# Create Vite project with React template
npm create vite@latest frontend -- --template react

# Navigate into frontend directory
cd frontend

# Install dependencies
npm install
```

### Step 2: Install Required Dependencies

```bash
# Core dependencies
npm install react-router-dom axios

# Development dependencies
npm install -D @types/node
```

**Package Explanations:**
| Package | Purpose |
|---------|---------|
| `react-router-dom` | Client-side routing for SPA |
| `axios` | HTTP client with interceptors support |
| `@types/node` | Node.js types for path resolution in Vite |

### Step 3: Configure Vite (`vite.config.js`)

Replace the default `vite.config.js` with this optimized configuration:

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
    host: true, // Expose to network (needed for Docker)
    // Proxy API requests to backend during development
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
    sourcemap: false, // Disable in production for security
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          axios: ["axios"],
        },
      },
    },
  },

  // Environment variable prefix
  envPrefix: "VITE_",
});
```

**Configuration Explained:**

| Section              | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `resolve.alias`      | Use `@components/Button` instead of `../../components/Button` |
| `server.proxy`       | Forward `/api` requests to backend, avoiding CORS issues      |
| `server.host: true`  | Required for Docker container networking                      |
| `build.manualChunks` | Split vendor code for better caching                          |

### Step 4: Create Environment Files

```bash
# Create environment files
touch .env .env.example .env.development .env.production
```

**`.env.example`** (Template for other developers):

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Fashion Store

# Feature Flags
VITE_ENABLE_ANALYTICS=false
```

**`.env.development`**:

```env
# Development environment
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Fashion Store (Dev)
VITE_ENABLE_ANALYTICS=false
```

**`.env.production`**:

```env
# Production environment
VITE_API_URL=/api
VITE_APP_NAME=Fashion Store
VITE_ENABLE_ANALYTICS=true
```

> ⚠️ **Important**: Add `.env` and `.env.*.local` to `.gitignore`. Never commit sensitive data!

### Step 5: Create Folder Structure

```bash
# Create all directories
mkdir -p src/{assets/{images,fonts},components/{common,layout,products},context,hooks,pages,services,styles/components,utils}
```

**Resulting structure:**

```
frontend/src/
├── assets/
│   ├── images/          # Product images, logos, icons
│   └── fonts/           # Custom fonts
├── components/
│   ├── common/          # Button, Input, Card, Modal, Loading
│   ├── layout/          # Header, Footer, Navbar, Sidebar
│   └── products/        # ProductCard, ProductGrid, ProductFilter
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components (Home, Products, Cart, etc.)
├── services/            # API service functions
├── styles/
│   └── components/      # Component-specific CSS modules
└── utils/               # Helper functions
```

### Step 6: Create jsconfig.json (for VS Code IntelliSense)

Create `frontend/jsconfig.json`:

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

### Step 7: Update package.json Scripts

Update `frontend/package.json`:

```json
{
  "name": "fashion-store-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "vite": "^5.0.0"
  }
}
```

### Step 8: Verify Setup

```bash
# Start development server
npm run dev

# You should see:
#   VITE v5.x.x  ready in xxx ms
#   ➜  Local:   http://localhost:3000/
#   ➜  Network: http://192.168.x.x:3000/
```

Open `http://localhost:3000` in your browser. You should see the default Vite + React page.

---

## ✅ Step 2.1 Checklist

- [ ] Vite + React project created
- [ ] Dependencies installed (`react-router-dom`, `axios`)
- [ ] `vite.config.js` configured with aliases and proxy
- [ ] Environment files created (`.env.example`, `.env.development`, `.env.production`)
- [ ] Folder structure created
- [ ] `jsconfig.json` added for VS Code IntelliSense
- [ ] Development server running on port 3000

---

## 2.2 CSS Architecture

A well-organized CSS architecture is crucial for maintainable, scalable styling. We'll use **CSS Modules** with **CSS Custom Properties (Variables)** for a professional setup.

### Why This Approach?

| Approach           | Pros                                               | Cons                            |
| ------------------ | -------------------------------------------------- | ------------------------------- |
| **CSS Modules** ✅ | Scoped styles, no class conflicts, works with Vite | Slightly more setup             |
| Plain CSS          | Simple                                             | Global scope, naming conflicts  |
| Tailwind           | Fast prototyping                                   | HTML bloat, learning curve      |
| Styled-components  | JS-in-CSS                                          | Runtime overhead, larger bundle |

### Step 1: Create CSS Variables File

Create `frontend/src/styles/variables.css`:

```css
/* frontend/src/styles/variables.css */
/* ============================================
   FASHION STORE - CSS VARIABLES (Design Tokens)
   ============================================ */

:root {
  /* ==========================================
     COLOR PALETTE
     ========================================== */

  /* Primary Colors - Elegant Black & Gold */
  --color-primary: #1a1a1a;
  --color-primary-light: #2d2d2d;
  --color-primary-dark: #000000;

  /* Accent Colors - Luxurious Gold */
  --color-accent: #c9a962;
  --color-accent-light: #d4bc7e;
  --color-accent-dark: #b8944d;

  /* Neutral Colors */
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
  --color-success-light: #86efac;
  --color-warning: #f59e0b;
  --color-warning-light: #fcd34d;
  --color-error: #ef4444;
  --color-error-light: #fca5a5;
  --color-info: #3b82f6;
  --color-info-light: #93c5fd;

  /* ==========================================
     TYPOGRAPHY
     ========================================== */

  /* Font Families */
  --font-primary: "Playfair Display", Georgia, serif;
  --font-secondary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "Fira Code", "Consolas", monospace;

  /* Font Sizes (using clamp for responsive sizing) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
  --text-5xl: clamp(3rem, 2rem + 5vw, 4rem);

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  /* ==========================================
     SPACING (8px base unit system)
     ========================================== */
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */
  --space-32: 8rem; /* 128px */

  /* ==========================================
     LAYOUT
     ========================================== */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;

  --header-height: 80px;
  --footer-height: 300px;
  --sidebar-width: 280px;

  /* ==========================================
     BORDERS & RADIUS
     ========================================== */
  --radius-none: 0;
  --radius-sm: 0.125rem; /* 2px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem; /* 8px */
  --radius-xl: 0.75rem; /* 12px */
  --radius-2xl: 1rem; /* 16px */
  --radius-full: 9999px;

  --border-width: 1px;
  --border-color: var(--color-gray-200);

  /* ==========================================
     SHADOWS
     ========================================== */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  /* ==========================================
     TRANSITIONS
     ========================================== */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-slower: 500ms ease;

  /* ==========================================
     Z-INDEX SCALE
     ========================================== */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-toast: 800;
}

/* ==========================================
   DARK MODE SUPPORT (Optional)
   ========================================== */
@media (prefers-color-scheme: dark) {
  :root {
    /* Uncomment to enable automatic dark mode
    --color-primary: #f5f5f5;
    --color-primary-light: #e5e5e5;
    --color-primary-dark: #ffffff;
    --color-gray-50: #171717;
    --color-gray-100: #262626;
    --color-gray-200: #404040;
    --color-gray-800: #e5e5e5;
    --color-gray-900: #f5f5f5;
    */
  }
}
```

### Step 2: Create Global Styles & CSS Reset

Create `frontend/src/styles/global.css`:

```css
/* frontend/src/styles/global.css */
/* ============================================
   GLOBAL STYLES & CSS RESET
   ============================================ */

/* Import variables */
@import "./variables.css";

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap");

/* ==========================================
   CSS RESET (Modern Minimal Reset)
   ========================================== */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Remove default list styles */
ul,
ol {
  list-style: none;
}

/* Prevent font size inflation */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-gray-900);
  background-color: var(--color-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Set shorter line heights on headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--color-gray-900);
}

h1 {
  font-size: var(--text-4xl);
}
h2 {
  font-size: var(--text-3xl);
}
h3 {
  font-size: var(--text-2xl);
}
h4 {
  font-size: var(--text-xl);
}
h5 {
  font-size: var(--text-lg);
}
h6 {
  font-size: var(--text-base);
}

/* Balance text wrapping on headings */
h1,
h2,
h3,
h4 {
  text-wrap: balance;
}

/* A elements that don't have a class get default styles */
a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent-dark);
}

/* Make images easier to work with */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

/* Button reset */
button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Remove textarea resize on certain inputs */
textarea:not([rows]) {
  min-height: 10em;
}

/* Anything with anchor should have scroll margin */
:target {
  scroll-margin-block: 5ex;
}

/* ==========================================
   UTILITY CLASSES
   ========================================== */

/* Container */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-inline: var(--space-8);
  }
}

/* Visually hidden (for screen readers) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Text utilities */
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}

.text-uppercase {
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

/* Flex utilities */
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-1 {
  gap: var(--space-1);
}
.gap-2 {
  gap: var(--space-2);
}
.gap-4 {
  gap: var(--space-4);
}
.gap-6 {
  gap: var(--space-6);
}
.gap-8 {
  gap: var(--space-8);
}

/* Grid utilities */
.grid {
  display: grid;
}

/* ==========================================
   SCROLLBAR STYLING
   ========================================== */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-gray-100);
}

::-webkit-scrollbar-thumb {
  background: var(--color-gray-400);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-gray-500);
}

/* ==========================================
   SELECTION STYLING
   ========================================== */

::selection {
  background-color: var(--color-accent);
  color: var(--color-white);
}

/* ==========================================
   FOCUS STYLES (Accessibility)
   ========================================== */

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ==========================================
   APP ROOT
   ========================================== */

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main content area */
main {
  flex: 1;
  margin-top: var(--header-height);
}
```

### Step 2: Create Responsive Breakpoints Mixin

Create `frontend/src/styles/breakpoints.css`:

```css
/* frontend/src/styles/breakpoints.css */
/* ============================================
   RESPONSIVE BREAKPOINTS REFERENCE
   ============================================
   
   Use these breakpoints consistently across the app:
   
   Mobile First Approach (min-width):
   ----------------------------------
   @media (min-width: 480px)  { } /* xs - Large phones */
@media (min-width: 640px) {
} /* sm - Small tablets */
@media (min-width: 768px) {
} /* md - Tablets */
@media (min-width: 1024px) {
} /* lg - Laptops */
@media (min-width: 1280px) {
} /* xl - Desktops */
@media (min-width: 1536px) {
} /* 2xl - Large screens */

desktopfirstapproach(max-width): ----------------------------------- @media (max-width: 1535px) {

} /* Below 2xl */
@media (max-width: 1279px) {
} /* Below xl */
@media (max-width: 1023px) {
} /* Below lg */
@media (max-width: 767px) {
} /* Below md - Mobile */
@media (max-width: 639px) {
} /* Below sm */
@media (max-width: 479px) {
} /* Below xs */

============================================ */

/* Example responsive grid system */
.grid-responsive {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .grid-responsive {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Step 4: Update main.jsx to Import Global Styles

Update `frontend/src/main.jsx`:

```jsx
// frontend/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import global styles FIRST
import "@styles/global.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Step 5: Example CSS Module Usage

Create an example to demonstrate CSS Modules:

**`frontend/src/styles/components/ExampleComponent.module.css`:**

```css
/* frontend/src/styles/components/ExampleComponent.module.css */

/* CSS Module - All classes are locally scoped */
.card {
  background-color: var(--color-white);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.title {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-2);
}

.description {
  font-size: var(--text-sm);
  color: var(--color-gray-600);
  line-height: var(--leading-relaxed);
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .card {
    padding: var(--space-4);
  }

  .title {
    font-size: var(--text-lg);
  }
}
```

**Using in a Component:**

```jsx
// frontend/src/components/ExampleComponent.jsx
import styles from "@styles/components/ExampleComponent.module.css";

function ExampleComponent({ title, description }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default ExampleComponent;
```

### CSS Modules Key Points

| Feature          | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| **Local Scope**  | `.card` becomes `.ExampleComponent_card_x7y2z` in production |
| **No Conflicts** | Two components can both have `.card` class without collision |
| **IDE Support**  | VS Code provides autocomplete for imported styles            |
| **Tree Shaking** | Unused styles are removed in production build                |

### Step 6: File Structure Summary

```
frontend/src/styles/
├── variables.css          # Design tokens (colors, spacing, etc.)
├── global.css             # Reset, base styles, utilities
├── breakpoints.css        # Responsive breakpoints reference
└── components/            # CSS Modules for components
    ├── Button.module.css
    ├── Card.module.css
    └── ...
```

---

## ✅ Step 2.2 Checklist

- [ ] `variables.css` created with design tokens
- [ ] `global.css` created with CSS reset and utilities
- [ ] `breakpoints.css` created as a reference
- [ ] `main.jsx` updated to import global styles
- [ ] Understand CSS Modules pattern
- [ ] Google Fonts (Playfair Display, Inter) loaded

---

## 🔜 Next: Step 2.3 - Layout Components

In the next step, we'll create:

- Header component with navigation
- Footer component
- Navbar with mobile menu
- Responsive layout wrapper

---

## 2.3 Layout Components

Layout components provide the structural foundation for your entire application. We'll build a professional header, footer, and responsive navigation system.

### Component Overview

| Component      | Purpose                                    |
| -------------- | ------------------------------------------ |
| **Header**     | Logo, navigation, cart icon, user menu     |
| **Footer**     | Links, social media, newsletter, copyright |
| **Navbar**     | Desktop navigation links                   |
| **MobileMenu** | Hamburger menu for mobile devices          |
| **Layout**     | Wrapper combining Header + Footer          |

---

### Step 1: Create Header Component

**`frontend/src/components/layout/Header.jsx`:**

```jsx
// frontend/src/components/layout/Header.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "@styles/components/Header.module.css";

// Icons (we'll use simple SVG icons)
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  // TODO: Replace with actual auth context
  const isAuthenticated = false;
  const cartItemCount = 0;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Shop" },
    { path: "/products?category=women", label: "Women" },
    { path: "/products?category=men", label: "Men" },
    { path: "/products?category=accessories", label: "Accessories" },
    { path: "/about", label: "About" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      e.target.reset();
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>FASHION</span>
          <span className={styles.logoAccent}>Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Search */}
          <button
            className={styles.iconButton}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          {/* User Account */}
          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className={styles.iconButton}
            aria-label={isAuthenticated ? "Profile" : "Login"}
          >
            <UserIcon />
          </Link>

          {/* Cart */}
          <Link to="/cart" className={styles.cartButton} aria-label="Shopping Cart">
            <CartIcon />
            {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Search Bar (Expandable) */}
      <div className={`${styles.searchBar} ${isSearchOpen ? styles.searchOpen : ""}`}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            name="search"
            placeholder="Search for products..."
            className={styles.searchInput}
            autoComplete="off"
          />
          <button type="submit" className={styles.searchSubmit}>
            <SearchIcon />
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Links */}
          <div className={styles.mobileAuthLinks}>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={styles.mobileAuthLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <button className={styles.mobileAuthLink}>Logout</button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={styles.mobileAuthLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${styles.mobileAuthLink} ${styles.registerLink}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;
```

---

### Step 2: Create Header Styles

**`frontend/src/styles/components/Header.module.css`:**

```css
/* frontend/src/styles/components/Header.module.css */

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: var(--color-white);
  z-index: var(--z-fixed);
  transition: box-shadow var(--transition-base), background-color var(--transition-base);
}

.header.scrolled {
  box-shadow: var(--shadow-md);
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(8px);
}

.container {
  max-width: var(--container-xl);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
  text-decoration: none;
  z-index: 10;
}

.logoText {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  letter-spacing: var(--tracking-wider);
}

.logoAccent {
  font-family: var(--font-secondary);
  font-size: var(--text-lg);
  font-weight: var(--font-light);
  color: var(--color-accent);
}

/* Desktop Navigation */
.desktopNav {
  display: none;
}

@media (min-width: 1024px) {
  .desktopNav {
    display: block;
  }
}

.navList {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.navLink {
  position: relative;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-gray-700);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  padding: var(--space-2) 0;
  transition: color var(--transition-fast);
}

.navLink::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width var(--transition-base);
}

.navLink:hover,
.navLink.active {
  color: var(--color-primary);
}

.navLink:hover::after,
.navLink.active::after {
  width: 100%;
}

/* Actions */
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

@media (min-width: 768px) {
  .actions {
    gap: var(--space-4);
  }
}

.iconButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-gray-700);
  border-radius: var(--radius-full);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.iconButton:hover {
  color: var(--color-primary);
  background-color: var(--color-gray-100);
}

.cartButton {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-gray-700);
  border-radius: var(--radius-full);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.cartButton:hover {
  color: var(--color-primary);
  background-color: var(--color-gray-100);
}

.cartBadge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: var(--font-bold);
  color: var(--color-white);
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile Menu Toggle */
.mobileMenuToggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-gray-700);
  z-index: 10;
}

@media (min-width: 1024px) {
  .mobileMenuToggle {
    display: none;
  }
}

/* Search Bar */
.searchBar {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-gray-200);
  padding: var(--space-4);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-lg);
}

.searchBar.searchOpen {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.searchForm {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: var(--space-2);
}

.searchInput {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  outline: none;
  transition: border-color var(--transition-fast);
}

.searchInput:focus {
  border-color: var(--color-accent);
}

.searchSubmit {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.searchSubmit:hover {
  background-color: var(--color-primary-light);
}

/* Mobile Menu */
.mobileMenu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 320px;
  height: 100vh;
  background-color: var(--color-white);
  z-index: var(--z-modal);
  transform: translateX(100%);
  transition: transform var(--transition-slow);
  overflow-y: auto;
  padding: var(--space-20) var(--space-6) var(--space-6);
}

.mobileMenu.mobileMenuOpen {
  transform: translateX(0);
}

@media (min-width: 1024px) {
  .mobileMenu {
    display: none;
  }
}

.mobileNavList {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.mobileNavLink {
  display: block;
  padding: var(--space-4) var(--space-2);
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--color-gray-700);
  border-bottom: 1px solid var(--color-gray-100);
  transition: color var(--transition-fast), padding-left var(--transition-fast);
}

.mobileNavLink:hover,
.mobileNavLink.active {
  color: var(--color-accent);
  padding-left: var(--space-4);
}

.mobileAuthLinks {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.mobileAuthLink {
  display: block;
  padding: var(--space-3) var(--space-4);
  text-align: center;
  font-weight: var(--font-medium);
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.mobileAuthLink:hover {
  background-color: var(--color-gray-100);
}

.registerLink {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.registerLink:hover {
  background-color: var(--color-primary-light);
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal-backdrop);
  animation: fadeIn var(--transition-fast) ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

---

### Step 3: Create Footer Component

**`frontend/src/components/layout/Footer.jsx`:**

```jsx
// frontend/src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import styles from "@styles/components/Footer.module.css";

// Social Icons
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PinterestIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "New Arrivals", path: "/products?sort=newest" },
      { label: "Best Sellers", path: "/products?sort=popular" },
      { label: "Women", path: "/products?category=women" },
      { label: "Men", path: "/products?category=men" },
      { label: "Accessories", path: "/products?category=accessories" },
      { label: "Sale", path: "/products?sale=true" },
    ],
    help: [
      { label: "Customer Service", path: "/help" },
      { label: "Track Order", path: "/track-order" },
      { label: "Shipping Info", path: "/shipping" },
      { label: " Returns & Exchanges", path: "/returns" },
      { label: "Size Guide", path: "/size-guide" },
      { label: "FAQ", path: "/faq" },
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Press", path: "/press" },
      { label: "Sustainability", path: "/sustainability" },
      { label: "Stores", path: "/stores" },
    ],
    legal: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Cookie Policy", path: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: "https://facebook.com", label: "Facebook" },
    { icon: <InstagramIcon />, url: "https://instagram.com", label: "Instagram" },
    { icon: <TwitterIcon />, url: "https://twitter.com", label: "Twitter" },
    { icon: <PinterestIcon />, url: "https://pinterest.com", label: "Pinterest" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
    e.target.reset();
    alert("Thank you for subscribing!");
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h3 className={styles.newsletterTitle}>Join Our Newsletter</h3>
              <p className={styles.newsletterDescription}>
                Subscribe to get special offers, free giveaways, and new arrivals.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandColumn}>
              <Link to="/" className={styles.logo}>
                <span className={styles.logoText}>FASHION</span>
                <span className={styles.logoAccent}>Store</span>
              </Link>
              <p className={styles.brandDescription}>
                Discover the latest trends in fashion. Quality clothing and accessories for the
                modern lifestyle.
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Shop</h4>
              <ul className={styles.linkList}>
                {footerLinks.shop.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Help</h4>
              <ul className={styles.linkList}>
                {footerLinks.help.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Company</h4>
              <ul className={styles.linkList}>
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>© {currentYear} Fashion Store. All rights reserved.</p>
            <div className={styles.legalLinks}>
              {footerLinks.legal.map((link, index) => (
                <span key={link.path}>
                  <Link to={link.path} className={styles.legalLink}>
                    {link.label}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className={styles.separator}>•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

---

### Step 4: Create Footer Styles

**`frontend/src/styles/components/Footer.module.css`:**

```css
/* frontend/src/styles/components/Footer.module.css */

.footer {
  background-color: var(--color-gray-900);
  color: var(--color-gray-300);
  margin-top: auto;
}

.container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }
}

/* Newsletter Section */
.newsletter {
  background-color: var(--color-accent);
  padding: var(--space-12) 0;
}

.newsletterContent {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .newsletterContent {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.newsletterText {
  max-width: 400px;
}

.newsletterTitle {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  margin-bottom: var(--space-2);
}

.newsletterDescription {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.9);
}

.newsletterForm {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
  max-width: 400px;
}

@media (min-width: 480px) {
  .newsletterForm {
    flex-direction: row;
  }
}

.newsletterInput {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  border: none;
  border-radius: var(--radius-md);
  outline: none;
}

.newsletterInput::placeholder {
  color: var(--color-gray-500);
}

.newsletterButton {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-accent);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.newsletterButton:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Main Footer */
.main {
  padding: var(--space-16) 0;
}

.grid {
  display: grid;
  gap: var(--space-10);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

/* Brand Column */
.brandColumn {
  max-width: 300px;
}

@media (min-width: 640px) {
  .brandColumn {
    grid-column: span 2;
  }
}

@media (min-width: 1024px) {
  .brandColumn {
    grid-column: span 1;
  }
}

.logo {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-1);
  text-decoration: none;
  margin-bottom: var(--space-4);
}

.logoText {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  letter-spacing: var(--tracking-wider);
}

.logoAccent {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-light);
  color: var(--color-accent);
}

.brandDescription {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-gray-400);
  margin-bottom: var(--space-6);
}

.socialLinks {
  display: flex;
  gap: var(--space-3);
}

.socialLink {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-gray-400);
  background-color: var(--color-gray-800);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.socialLink:hover {
  color: var(--color-white);
  background-color: var(--color-accent);
  transform: translateY(-3px);
}

/* Link Columns */
.linkColumn {
  min-width: 0;
}

.columnTitle {
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-white);
  margin-bottom: var(--space-4);
}

.linkList {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.link {
  font-size: var(--text-sm);
  color: var(--color-gray-400);
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--color-accent);
}

/* Bottom Bar */
.bottom {
  border-top: 1px solid var(--color-gray-800);
  padding: var(--space-6) 0;
}

.bottomContent {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .bottomContent {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.copyright {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
}

.legalLinks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
}

.legalLink {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  transition: color var(--transition-fast);
}

.legalLink:hover {
  color: var(--color-accent);
}

.separator {
  color: var(--color-gray-600);
  margin: 0 var(--space-1);
}
```

---

### Step 3: Create Layout Wrapper Component

**`frontend/src/components/layout/Layout.jsx`:**

```jsx
// frontend/src/components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@styles/components/Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
```

**`frontend/src/styles/components/Layout.module.css`:**

```css
/* frontend/src/styles/components/Layout.module.css */

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  margin-top: var(--header-height);
}
```

---

### Step 4: Create Index Export File

**`frontend/src/components/layout/index.js`:**

```javascript
// frontend/src/components/layout/index.js
export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as Layout } from "./Layout";
```

---

### Step 5: Update App.jsx with Router and Layout

**`frontend/src/App.jsx`:**

```jsx
// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@components/layout";

// Temporary placeholder pages (we'll create real ones in next section)
const Home = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Welcome to Fashion Store</h1>
    <p>Home page coming soon...</p>
  </div>
);

const Products = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Products</h1>
    <p>Products page coming soon...</p>
  </div>
);

const ProductDetail = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Product Detail</h1>
    <p>Product detail page coming soon...</p>
  </div>
);

const Cart = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Shopping Cart</h1>
    <p>Cart page coming soon...</p>
  </div>
);

const Login = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Login</h1>
    <p>Login page coming soon...</p>
  </div>
);

const Register = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Register</h1>
    <p>Register page coming soon...</p>
  </div>
);

const NotFound = () => (
  <div style={{ padding: "4rem", textAlign: "center" }}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Layout (Header + Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
```

---

### Step 6: Verify Everything Works

```bash
# Make sure you're in the frontend directory
cd frontend

# Start development server
npm run dev
```

**Test the following:**

1. ✅ Header displays with logo and navigation
2. ✅ Navigation links work (even to placeholder pages)
3. ✅ Cart icon with badge shows
4. ✅ Mobile menu opens/closes on smaller screens
5. ✅ Header gets shadow when scrolling
6. ✅ Footer displays with all sections
7. ✅ Newsletter form works (shows alert)
8. ✅ Social links open in new tabs
9. ✅ Responsive design works on mobile

---

## ✅ Step 2.3 Checklist

- [ ] Header component created
- [ ] Footer component created
- [ ] Navbar with mobile menu
- [ ] Responsive layout wrapper
- [ ] All CSS Module styles created
- [ ] React Router configured in App.jsx
- [ ] Placeholder pages for all routes
- [ ] Mobile responsive design working

---

## 2.4 Common UI Components

We'll build a comprehensive library of reusable UI components. This section is divided into parts:

| Part     | Components                    |
| -------- | ----------------------------- |
| **2.4a** | Button Component              |
| **2.4b** | Input & Form Components       |
| **2.4c** | Card Component                |
| **2.4d** | Loading & Skeleton Components |
| **2.4e** | Modal Component               |
| **2.4f** | Toast Notifications           |

---

## 2.4a Button Component

A professional button component with multiple variants, sizes, and states is essential for any UI library.

### Button Features

| Feature        | Description                                  |
| -------------- | -------------------------------------------- |
| **Variants**   | Primary, Secondary, Outline, Ghost, Danger   |
| **Sizes**      | Small, Medium, Large                         |
| **States**     | Default, Hover, Active, Disabled, Loading    |
| **Icons**      | Support for left/right icons                 |
| **Full Width** | Optional full-width mode                     |
| **As Link**    | Can render as `<a>` or React Router `<Link>` |

---

### Step 1: Create Button Component

**`frontend/src/components/common/Button.jsx`:**

```jsx
// frontend/src/components/common/Button.jsx
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "@styles/components/Button.module.css";

// Loading Spinner for Button
const ButtonSpinner = () => (
  <svg
    className={styles.spinner}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className={styles.spinnerTrack}
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className={styles.spinnerHead}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button Component
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {boolean} props.fullWidth - Whether button takes full width
 * @param {boolean} props.isLoading - Show loading spinner
 * @param {boolean} props.disabled - Disable the button
 * @param {React.ReactNode} props.leftIcon - Icon to show on left
 * @param {React.ReactNode} props.rightIcon - Icon to show on right
 * @param {string} props.href - External link URL (renders as <a>)
 * @param {string} props.to - React Router link path (renders as <Link>)
 * @param {React.ReactNode} props.children - Button content
 */
const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      href,
      to,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Build class names
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      isLoading && styles.loading,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Button content
    const content = (
      <>
        {isLoading && <ButtonSpinner />}
        {!isLoading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <span className={styles.text}>{children}</span>
        {!isLoading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </>
    );

    // Render as external link
    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      );
    }

    // Render as React Router Link
    if (to) {
      return (
        <Link ref={ref} to={to} className={buttonClasses} {...props}>
          {content}
        </Link>
      );
    }

    // Render as button
    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
```

---

### Step 2: Create Button Styles

**`frontend/src/styles/components/Button.module.css`:**

```css
/* frontend/src/styles/components/Button.module.css */

/* ==========================================
   BASE BUTTON STYLES
   ========================================== */

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-secondary);
  font-weight: var(--font-semibold);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  outline: none;
  position: relative;
  overflow: hidden;
}

.button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ==========================================
   SIZE VARIANTS
   ========================================== */

.sm {
  height: 36px;
  padding: 0 var(--space-4);
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
}

.md {
  height: 44px;
  padding: 0 var(--space-6);
  font-size: var(--text-base);
  border-radius: var(--radius-md);
}

.lg {
  height: 52px;
  padding: 0 var(--space-8);
  font-size: var(--text-lg);
  border-radius: var(--radius-lg);
}

/* ==========================================
   STYLE VARIANTS
   ========================================== */

/* Primary - Solid dark button */
.primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

/* Secondary - Accent color button */
.secondary {
  background-color: var(--color-accent);
  color: var(--color-primary);
  border-color: var(--color-accent);
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.secondary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

/* Outline - Bordered button */
.outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.outline:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

/* Ghost - Transparent button */
.ghost {
  background-color: transparent;
  color: var(--color-gray-700);
  border-color: transparent;
}

.ghost:hover:not(:disabled) {
  background-color: var(--color-gray-100);
  color: var(--color-primary);
}

.ghost:active:not(:disabled) {
  background-color: var(--color-gray-200);
}

/* Danger - Red button for destructive actions */
.danger {
  background-color: var(--color-error);
  color: var(--color-white);
  border-color: var(--color-error);
}

.danger:hover:not(:disabled) {
  background-color: #dc2626;
  border-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.danger:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

/* ==========================================
   STATES
   ========================================== */

/* Full Width */
.fullWidth {
  width: 100%;
}

/* Disabled State */
.disabled,
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Loading State */
.loading {
  cursor: wait;
  color: transparent !important;
}

.loading .text {
  visibility: hidden;
}

.loading .iconLeft,
.loading .iconRight {
  visibility: hidden;
}

/* ==========================================
   ICONS
   ========================================== */

.iconLeft,
.iconRight {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.iconLeft svg,
.iconRight svg {
  width: 1.25em;
  height: 1.25em;
}

/* ==========================================
   LOADING SPINNER
   ========================================== */

.spinner {
  position: absolute;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.spinnerTrack {
  opacity: 0.25;
}

.spinnerHead {
  opacity: 0.75;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Adjust spinner color based on variant */
.primary .spinner,
.secondary .spinner,
.danger .spinner {
  color: var(--color-white);
}

.outline .spinner,
.ghost .spinner {
  color: var(--color-primary);
}

/* ==========================================
   BUTTON GROUP (Optional utility)
   ========================================== */

.buttonGroup {
  display: flex;
  gap: var(--space-2);
}

.buttonGroup.vertical {
  flex-direction: column;
}
```

---

### Step 2: Create Icon Button Variant

For icon-only buttons (like close, edit, delete icons):

**`frontend/src/components/common/IconButton.jsx`:**

```jsx
// frontend/src/components/common/IconButton.jsx
import { forwardRef } from "react";
import styles from "@styles/components/IconButton.module.css";

/**
 * IconButton Component - For icon-only buttons
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {'default'|'primary'|'danger'} props.variant - Button variant
 * @param {string} props.label - Accessible label (required for a11y)
 * @param {React.ReactNode} props.children - Icon element
 */
const IconButton = forwardRef(
  ({ size = "md", variant = "default", label, className = "", children, ...props }, ref) => {
    const buttonClasses = [styles.iconButton, styles[size], styles[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type="button" className={buttonClasses} aria-label={label} {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
```

**`frontend/src/styles/components/IconButton.module.css`:**

```css
/* frontend/src/styles/components/IconButton.module.css */

.iconButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
  outline: none;
  flex-shrink: 0;
}

.iconButton:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.iconButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.sm {
  width: 32px;
  height: 32px;
}

.sm svg {
  width: 16px;
  height: 16px;
}

.md {
  width: 40px;
  height: 40px;
}

.md svg {
  width: 20px;
  height: 20px;
}

.lg {
  width: 48px;
  height: 48px;
}

.lg svg {
  width: 24px;
  height: 24px;
}

/* Variants */
.default {
  background-color: transparent;
  color: var(--color-gray-600);
}

.default:hover:not(:disabled) {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
}

.primary {
  background-color: var(--color-gray-100);
  color: var(--color-primary);
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.danger {
  background-color: transparent;
  color: var(--color-gray-600);
}

.danger:hover:not(:disabled) {
  background-color: var(--color-error-light);
  color: var(--color-error);
}
```

---

## 2.4b Input & Form Components

Forms are a critical part of any application. This section focuses on creating reusable and accessible input components.

### Components Overview

| Component         | Description                                   |
| ----------------- | --------------------------------------------- |
| **TextInput**     | Standard text input with validation           |
| **PasswordInput** | Password input with show/hide toggle          |
| **Select**        | Dropdown select component                     |
| **Checkbox**      | Checkbox input with label                     |
| **Radio**         | Radio button group                            |
| **FormGroup**     | Wrapper for inputs with labels and validation |

---

### Step 1: Create TextInput Component

**`frontend/src/components/common/TextInput.jsx`:**

```jsx
// frontend/src/components/common/TextInput.jsx
import { forwardRef } from "react";
import styles from "@styles/components/TextInput.module.css";

/**
 * TextInput Component
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.type - Input type (e.g., text, email)
 * @param {string} props.name - Input name attribute
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Change handler
 */
const TextInput = forwardRef(
  (
    { label, placeholder, error, required = false, type = "text", name, value, onChange, ...props },
    ref
  ) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
```

---

### Step 2: Create PasswordInput Component

**`frontend/src/components/common/PasswordInput.jsx`:**

```jsx
// frontend/src/components/common/PasswordInput.jsx
import { useState, forwardRef } from "react";
import styles from "@styles/components/PasswordInput.module.css";

/**
 * PasswordInput Component
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.name - Input name attribute
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Change handler
 */
const PasswordInput = forwardRef(
  ({ label, placeholder, error, required = false, name, value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            id={name}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            {...props}
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
```

---

### Step 3: Create Select Component

**`frontend/src/components/common/Select.jsx`:**

```jsx
// frontend/src/components/common/Select.jsx
import { forwardRef } from "react";
import styles from "@styles/components/Select.module.css";

/**
 * Select Component
 *
 * @param {Object} props
 * @param {string} props.label - Select label
 * @param {Array} props.options - Array of options { value, label }
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether the select is required
 * @param {string} props.name - Select name attribute
 * @param {string} props.value - Controlled select value
 * @param {function} props.onChange - Change handler
 */
const Select = forwardRef(
  ({ label, options, error, required = false, name, value, onChange, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${styles.select} ${error ? styles.errorSelect : ""}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
```

---

### Step 4: Create Checkbox and Radio Components

**`frontend/src/components/common/Checkbox.jsx`:**

```jsx
// frontend/src/components/common/Checkbox.jsx
import styles from "@styles/components/Checkbox.module.css";

function Checkbox({ label, name, checked, onChange, ...props }) {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        {...props}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Checkbox;
```

**`frontend/src/components/common/Radio.jsx`:**

```jsx
// frontend/src/components/common/Radio.jsx
import styles from "@styles/components/Radio.module.css";

function Radio({ label, name, value, checked, onChange, ...props }) {
  return (
    <label className={styles.radioWrapper}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radio}
        {...props}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Radio;
```

---

### Step 5: Create FormGroup Component

**`frontend/src/components/common/FormGroup.jsx`:**

```jsx
// frontend/src/components/common/FormGroup.jsx
import styles from "@styles/components/FormGroup.module.css";

function FormGroup({ label, children, error }) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormGroup;
```

---

### Step 6: Export Components

**`frontend/src/components/common/index.js`:**

```javascript
export { default as TextInput } from "./TextInput";
export { default as PasswordInput } from "./PasswordInput";
export { default as Select } from "./Select";
export { default as Checkbox } from "./Checkbox";
export { default as Radio } from "./Radio";
export { default as FormGroup } from "./FormGroup";
```

---

### Step 7: Usage Examples

Create a demo page to test form components:

**`frontend/src/pages/FormDemo.jsx`:**

```jsx
import { TextInput, PasswordInput, Select, Checkbox, Radio, FormGroup } from "@components/common";

function FormDemo() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Form Components Demo</h1>

      <FormGroup label="Text Input" error="This field is required">
        <TextInput placeholder="Enter text" />
      </FormGroup>

      <FormGroup label="Password Input">
        <PasswordInput placeholder="Enter password" />
      </FormGroup>

      <FormGroup label="Select">
        <Select
          options={[
            { value: "", label: "Select an option" },
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
        />
      </FormGroup>

      <FormGroup label="Checkbox">
        <Checkbox label="I agree to the terms" />
      </FormGroup>

      <FormGroup label="Radio Group">
        <Radio name="group" value="1" label="Option 1" />
        <Radio name="group" value="2" label="Option 2" />
      </FormGroup>
    </div>
  );
}

export default FormDemo;
```

---

### Step 8: Add Demo Route

Update `App.jsx` to include the demo route:

```jsx
import FormDemo from "@pages/FormDemo";

<Route path="form-demo" element={<FormDemo />} />;
```

Visit `http://localhost:3000/form-demo` to see all form components.

---

## ✅ Step 2.4b Checklist

- [ ] TextInput component created
- [ ] PasswordInput component created
- [ ] Select component created
- [ ] Checkbox and Radio components created
- [ ] FormGroup wrapper created
- [ ] Components exported from index.js
- [ ] Demo page created

---

## 2.4c Card Component

Cards are versatile UI elements used to display content in a structured and visually appealing way. This section focuses on creating a reusable Card component.

### Features

| Feature        | Description                                     |
| -------------- | ----------------------------------------------- |
| **Header**     | Optional header section with title and actions  |
| **Body**       | Main content area for text, images, or elements |
| **Footer**     | Optional footer for buttons or links            |
| **Variants**   | Default, outlined, shadowed                     |
| **Responsive** | Adjusts layout for different screen sizes       |

---

### Step 1: Create Card Component

**`frontend/src/components/common/Card.jsx`:**

```jsx
// frontend/src/components/common/Card.jsx
import styles from "@styles/components/Card.module.css";

/**
 * Card Component
 *
 * @param {Object} props
 * @param {string} props.variant - Card style variant (default, outlined, shadowed)
 * @param {React.ReactNode} props.header - Header content
 * @param {React.ReactNode} props.body - Body content
 * @param {React.ReactNode} props.footer - Footer content
 * @param {string} props.className - Additional class names
 */
function Card({ variant = "default", header, body, footer, className = "", ...props }) {
  const cardClasses = [styles.card, styles[variant], className].filter(Boolean).join(" ");

  return (
    <div className={cardClasses} {...props}>
      {header && <div className={styles.header}>{header}</div>}
      {body && <div className={styles.body}>{body}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

export default Card;
```

---

### Step 2: Create Card Styles

**`frontend/src/styles/components/Card.module.css`:**

```css
/* frontend/src/styles/components/Card.module.css */

.card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Variants */
.default {
  border: 1px solid var(--color-gray-200);
}

.outlined {
  border: 2px solid var(--color-primary);
}

.shadowed {
  box-shadow: var(--shadow-lg);
}

/* Header */
.header {
  padding: var(--space-4);
  background-color: var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-200);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

/* Body */
.body {
  padding: var(--space-4);
  flex: 1;
}

/* Footer */
.footer {
  padding: var(--space-4);
  background-color: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);
  text-align: right;
}
```

---

### Step 3: Usage Examples

Create a demo page to test the Card component:

**`frontend/src/pages/CardDemo.jsx`:**

```jsx
import Card from "@components/common/Card";

function CardDemo() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Card Component Demo</h1>

      {/* Default Card */}
      <Card
        header={<h2>Default Card</h2>}
        body={<p>This is the body of a default card.</p>}
        footer={<button>Action</button>}
      />

      {/* Outlined Card */}
      <Card
        variant="outlined"
        header={<h2>Outlined Card</h2>}
        body={<p>This is the body of an outlined card.</p>}
        footer={<button>Action</button>}
      />

      {/* Shadowed Card */}
      <Card
        variant="shadowed"
        header={<h2>Shadowed Card</h2>}
        body={<p>This is the body of a shadowed card.</p>}
        footer={<button>Action</button>}
      />
    </div>
  );
}

export default CardDemo;
```

---

### Step 4: Add Demo Route

Update `App.jsx` to include the demo route:

```jsx
import CardDemo from "@pages/CardDemo";

<Route path="card-demo" element={<CardDemo />} />;
```

Visit `http://localhost:3000/card-demo` to see the Card component in action.

---

## ✅ Step 2.4c Checklist

- [ ] Card component created with:
  - [ ] Header, body, and footer sections
  - [ ] Variants: default, outlined, shadowed
  - [ ] Responsive design
- [ ] CSS Module styles created
- [ ] Demo page created

---

## 2.4d Loading & Skeleton Components

Loading and skeleton components are essential for improving user experience during data fetching or slow network conditions. This section focuses on creating reusable loading spinners and skeleton loaders.

### Features

| Feature             | Description                                   |
| ------------------- | --------------------------------------------- |
| **Loading Spinner** | Animated spinner for indicating loading state |
| **Skeleton Loader** | Placeholder for content while loading         |
| **Customizable**    | Adjustable size, color, and animation speed   |
| **Accessible**      | Includes ARIA roles and labels                |

---

### Step 1: Create Loading Spinner Component

**`frontend/src/components/common/LoadingSpinner.jsx`:**

```jsx
// frontend/src/components/common/LoadingSpinner.jsx
import styles from "@styles/components/LoadingSpinner.module.css";

/**
 * Loading Spinner Component
 *
 * @param {Object} props
 * @param {string} props.size - Size of the spinner (small, medium, large)
 * @param {string} props.color - Color of the spinner
 * @param {string} props.className - Additional class names
 */
function LoadingSpinner({
  size = "medium",
  color = "var(--color-primary)",
  className = "",
  ...props
}) {
  const spinnerClasses = [styles.spinner, styles[size], className].filter(Boolean).join(" ");

  return (
    <div
      className={spinnerClasses}
      style={{ borderColor: color }}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}

export default LoadingSpinner;
```

---

### Step 2: Create Skeleton Loader Component

**`frontend/src/components/common/SkeletonLoader.jsx`:**

```jsx
// frontend/src/components/common/SkeletonLoader.jsx
import styles from "@styles/components/SkeletonLoader.module.css";

/**
 * Skeleton Loader Component
 *
 * @param {Object} props
 * @param {string} props.width - Width of the skeleton
 * @param {string} props.height - Height of the skeleton
 * @param {string} props.className - Additional class names
 */
function SkeletonLoader({ width = "100%", height = "1rem", className = "", ...props }) {
  const skeletonClasses = [styles.skeleton, className].filter(Boolean).join(" ");

  return (
    <div className={skeletonClasses} style={{ width, height }} aria-hidden="true" {...props} />
  );
}

export default SkeletonLoader;
```

---

### Step 3: Create Styles

**`frontend/src/styles/components/LoadingSpinner.module.css`:**

```css
/* frontend/src/styles/components/LoadingSpinner.module.css */

.spinner {
  display: inline-block;
  border: 4px solid transparent;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.small {
  width: 1rem;
  height: 1rem;
}

.medium {
  width: 2rem;
  height: 2rem;
}

.large {
  width: 3rem;
  height: 3rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

**`frontend/src/styles/components/SkeletonLoader.module.css`:**

```css
/* frontend/src/styles/components/SkeletonLoader.module.css */

.skeleton {
  background-color: var(--color-gray-200);
  border-radius: var(--radius-sm);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

### Step 4: Usage Examples

Create a demo page to test the Loading and Skeleton components:

**`frontend/src/pages/LoadingDemo.jsx`:**

```jsx
import LoadingSpinner from "@components/common/LoadingSpinner";
import SkeletonLoader from "@components/common/SkeletonLoader";

function LoadingDemo() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Loading & Skeleton Components Demo</h1>

      <h2>Loading Spinner</h2>
      <LoadingSpinner size="small" />
      <LoadingSpinner size="medium" />
      <LoadingSpinner size="large" />

      <h2>Skeleton Loader</h2>
      <SkeletonLoader width="100%" height="2rem" />
      <SkeletonLoader width="50%" height="1rem" />
    </div>
  );
}

export default LoadingDemo;
```

---

### Step 5: Add Demo Route

Update `App.jsx` to include the demo route:

```jsx
import LoadingDemo from "@pages/LoadingDemo";

<Route path="loading-demo" element={<LoadingDemo />} />;
```

Visit `http://localhost:3000/loading-demo` to see the Loading and Skeleton components in action.

---

## ✅ Step 2.4d Checklist

- [ ] Loading Spinner created with:
  - [ ] Size variants: small, medium, large
  - [ ] Customizable color
  - [ ] Accessible ARIA roles
- [ ] Skeleton Loader created with:
  - [ ] Adjustable width and height
  - [ ] Smooth animation
- [ ] CSS Module styles created
- [ ] Demo page created

---

## 🔜 Next: Step 2.4e - Modal Component

In the next step, we'll create:

- A reusable modal dialog component
- Support for headers, footers, and dynamic content

---

_Say "2.4e" or "next" to continue_

---

# Part 3: Backend Development with Node.js + Express

In this part, we will focus on building the backend for the fashion e-commerce website. The backend will handle API requests, authentication, and database operations.

---

## 3.1 Project Initialization

### Step 1: Initialize Node.js Project

```bash
# Navigate to the backend directory
cd backend

# Initialize a new Node.js project
npm init -y
```

### Step 2: Install Dependencies

Install the required dependencies for the backend:

```bash
# Install core dependencies
npm install express mongoose dotenv bcrypt jsonwebtoken cors

# Install development dependencies
npm install -D nodemon eslint
```

**Dependency Overview:**

| Package        | Purpose                                |
| -------------- | -------------------------------------- |
| `express`      | Web framework for building APIs        |
| `mongoose`     | MongoDB object modeling                |
| `dotenv`       | Environment variable management        |
| `bcrypt`       | Password hashing                       |
| `jsonwebtoken` | JSON Web Token for authentication      |
| `cors`         | Enable Cross-Origin Resource Sharing   |
| `nodemon`      | Auto-restart server during development |
| `eslint`       | Linting for code quality               |

### Step 3: Configure `package.json`

Update the `scripts` section in `package.json`:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "lint": "eslint . --ext .js,.jsx"
}
```

### Step 4: Create Folder Structure

```bash
# Create the following directories
mkdir -p src/{config,controllers,middleware,models,routes,services,utils}
```

**Resulting structure:**

```
backend/
├── src/
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions
│   └── server.js           # Entry point
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Node.js project metadata
└── README.md               # Project documentation
```

### Step 5: Create `.env` File

Create a `.env` file in the root of the `backend` directory:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/fashion-store

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=5000
```

> ⚠️ **Important:** Add `.env` to `.gitignore` to prevent sensitive data from being committed.

### Step 6: Create `.gitignore`

```bash
# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
EOF
```

---

## 3.2 Express Server Setup

### Step 1: Create `server.js`

**`backend/src/server.js`:**

```javascript
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

// Define routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 2: Create Database Connection

**`backend/src/config/database.js`:**

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### Step 3: Verify Server Setup

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5000` in your browser. You should see:

```
API is running...
```

---

## ✅ Step 3.2 Checklist

- [ ] Express server created
- [ ] MongoDB connection established
- [ ] Environment variables configured
- [ ] Development server running

---

## 🔜 Next: Step 3.3 - User Authentication

In the next step, we'll implement user authentication with JWT, including:

- User registration
- User login
- Password hashing with bcrypt
- JWT generation and verification

---

_Say "3.3" or "next" to continue_

## 3.3 User Authentication

User authentication is a critical feature for any e-commerce application. We'll implement secure authentication using JWT (JSON Web Tokens) with httpOnly cookies for enhanced security.

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│  1. User submits credentials (email, password)                  │
│  2. Server validates credentials against database               │
│  3. If valid, server generates JWT token                        │
│  4. Token is sent as httpOnly cookie (secure from XSS)          │
│  5. Client includes cookie in subsequent requests               │
│  6. Server verifies token on protected routes                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 1: Create User Model

**`backend/src/models/User.js`:**

```javascript
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
      select: false, // Don't include password in queries by default
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
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    addresses: [
      {
        type: {
          type: String,
          enum: ["shipping", "billing"],
          default: "shipping",
        },
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
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
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
```

---

### Step 2: Create Token Service

**`backend/src/services/tokenService.js`:**

```javascript
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days

/**
 * Generate Access Token
 * @param {Object} payload - User data to encode
 * @returns {string} JWT access token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

/**
 * Generate Refresh Token
 * @param {Object} payload - User data to encode
 * @returns {string} JWT refresh token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

/**
 * Verify Access Token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Verify Refresh Token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

/**
 * Generate both tokens for a user
 * @param {Object} user - User object
 * @returns {Object} Access and refresh tokens
 */
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

### Step 3: Create Auth Controller

**`backend/src/controllers/authController.js`:**

```javascript
import User from "../models/User.js";
import { generateTokenPair, verifyRefreshToken } from "../services/tokenService.js";

// Cookie options for tokens
const cookieOptions = {
  httpOnly: true, // Prevents XSS attacks
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict", // Prevents CSRF attacks
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokenPair(user);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: user.toJSON(),
        accessToken,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokenPair(user);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: user.toJSON(),
        accessToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      // Clear refresh token from database
      await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    }

    // Clear cookie
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh
 */
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user with this refresh token
    const user = await User.findOne({
      _id: decoded.id,
      refreshToken,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Generate new tokens
    const tokens = generateTokenPair(user);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    // Set new refresh token in cookie
    res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      data: {
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
```

---

### Step 4: Create Auth Middleware

**`backend/src/middleware/auth.js`:**

```javascript
import { verifyAccessToken } from "../services/tokenService.js";
import User from "../models/User.js";

/**
 * Protect routes - Verify JWT token
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - No token provided",
      });
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from token
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

    // Attach user to request
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

/**
 * Authorize specific roles
 * @param {...string} roles - Allowed roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};
```

---

### Step 5: Create Auth Routes

**`backend/src/routes/authRoutes.js`:**

```javascript
import express from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshAccessToken);

// Protected routes
router.get("/me", protect, getMe);

export default router;
```

---

### Step 6: Create Route Index

**`backend/src/routes/index.js`:**

```javascript
import express from "express";
import authRoutes from "./authRoutes.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);

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

### Step 7: Update Server to Use Routes

**Update `backend/src/server.js`:**

```javascript
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import routes from "./routes/index.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parse cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // Allow cookies
  })
);

// Connect to MongoDB
connectDB();

// Mount API routes
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### Step 8: Update Environment Variables

Add the following to your `.env` file:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/fashion-store

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_also_long_and_random

# Server Configuration
PORT=5000
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

---

### Step 9: Install Cookie Parser

```bash
npm install cookie-parser
```

---

### Step 10: Test Authentication Endpoints

Use Thunder Client or Postman to test the following endpoints:

**Register User:**

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User:**

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User (Protected):**

```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <access_token>
```

---

## ✅ Step 3.3 Checklist

- [ ] User model created with:
  - [ ] Password hashing
  - [ ] Email validation
  - [ ] Address support
  - [ ] comparePassword method
- [ ] Token service created with:
  - [ ] Access token generation
  - [ ] Refresh token generation
  - [ ] Token verification
- [ ] Auth controller created with:
  - [ ] Register
  - [ ] Login
  - [ ] Logout
  - [ ] Refresh token
  - [ ] Get current user
- [ ] Auth middleware created with:
  - [ ] protect middleware
  - [ ] authorize middleware
- [ ] Auth routes configured
- [ ] Server updated with routes and middleware

---

## 🔜 Next: Step 3.4 - Product Model & Routes

In the next step, we'll create:

- Product model with categories, sizes, colors
- Product CRUD operations
- Product filtering and pagination

---

_Say "3.4" or "next" to continue_

---

## 3.4 Information Security Best Practices

Security is paramount for any e-commerce application handling user data and payments. This section covers comprehensive security measures to protect your fashion website.

### Security Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                              │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Network Security (HTTPS, Firewall, Rate Limiting)     │
│  Layer 2: Application Security (Input Validation, Sanitization) │
│  Layer 3: Authentication (JWT, Password Hashing, 2FA)           │
│  Layer 4: Authorization (Role-Based Access Control)             │
│  Layer 5: Data Security (Encryption, Secure Storage)            │
│  Layer 6: Monitoring (Logging, Intrusion Detection)             │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 1: Install Security Dependencies

```bash
# Install security packages
npm install helmet express-rate-limit express-mongo-sanitize xss-clean hpp validator express-validator
```

**Package Overview:**

| Package                  | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `helmet`                 | Sets secure HTTP headers                     |
| `express-rate-limit`     | Rate limiting to prevent brute force attacks |
| `express-mongo-sanitize` | Prevents NoSQL injection attacks             |
| `xss-clean`              | Sanitizes user input to prevent XSS          |
| `hpp`                    | Prevents HTTP Parameter Pollution            |
| `validator`              | String validation and sanitization           |
| `express-validator`      | Middleware for input validation              |

---

### Step 2: Create Security Middleware Configuration

**`backend/src/config/security.js`:**

```javascript
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

/**
 * Helmet Configuration
 * Sets various HTTP headers for security
 */
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable for image loading
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});

/**
 * Rate Limiting Configuration
 * Prevents brute force and DDoS attacks
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict Rate Limiter for Authentication Routes
 */
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 login attempts per hour
  message: {
    success: false,
    message: "Too many login attempts, please try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
});

/**
 * Password Reset Rate Limiter
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit to 3 password reset requests per hour
  message: {
    success: false,
    message: "Too many password reset attempts, please try again later",
  },
});

/**
 * MongoDB Query Sanitization
 * Prevents NoSQL injection by removing $ and . from user input
 */
export const mongoSanitizeConfig = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ key, req }) => {
    console.warn(`Sanitized key: ${key} in request from ${req.ip}`);
  },
});

/**
 * XSS Clean Configuration
 * Sanitizes user input to prevent XSS attacks
 */
export const xssCleanConfig = xss();

/**
 * HPP Configuration
 * Prevents HTTP Parameter Pollution
 * Whitelist parameters that can have multiple values
 */
export const hppConfig = hpp({
  whitelist: ["price", "size", "color", "category", "sort", "fields", "page", "limit"],
});
```

---

### Step 3: Create Input Validation Middleware

**`backend/src/middleware/validate.js`:**

```javascript
import { body, param, query, validationResult } from "express-validator";

/**
 * Validation Error Handler
 * Processes validation results and returns formatted errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

/**
 * User Registration Validation Rules
 */
export const validateRegistration = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be 2-50 characters")
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage("First name can only contain letters, spaces, and hyphens"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be 2-50 characters")
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage("Last name can only contain letters, spaces, and hyphens"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage("Email is too long"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be 8-128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage("Password must contain uppercase, lowercase, number, and special character"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  handleValidationErrors,
];

/**
 * User Login Validation Rules
 */
export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
];

/**
 * Password Change Validation Rules
 */
export const validatePasswordChange = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be 8-128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage("Password must contain uppercase, lowercase, number, and special character")
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error("New password must be different from current password");
      }
      return true;
    }),

  handleValidationErrors,
];

/**
 * MongoDB ObjectId Validation
 */
export const validateObjectId = (paramName = "id") => [
  param(paramName).isMongoId().withMessage(`Invalid ${paramName} format`),

  handleValidationErrors,
];

/**
 * Pagination Query Validation
 */
export const validatePagination = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),

  handleValidationErrors,
];
```

---

### Step 4: Create Error Handler Middleware

**`backend/src/middleware/errorHandler.js`:**

```javascript
/**
 * Custom Error Class
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle Cast Errors (Invalid MongoDB ObjectId)
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Handle Duplicate Field Errors
 */
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const message = `${field} already exists. Please use another value.`;
  return new AppError(message, 400);
};

/**
 * Handle Validation Errors
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

/**
 * Handle JWT Errors
 */
const handleJWTError = () => new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your session has expired. Please log in again.", 401);

/**
 * Send Error in Development
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Send Error in Production
 * Don't leak error details to client
 */
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown error: don't leak details
    console.error("ERROR 💥:", err);

    res.status(500).json({
      success: false,
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
  }
};

/**
 * Global Error Handler Middleware
 */
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

/**
 * Async Handler Wrapper
 * Eliminates try-catch blocks in async route handlers
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

---

### Step 5: Create Security Logger

**`backend/src/utils/securityLogger.js`:**

```javascript
import fs from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");
const SECURITY_LOG = path.join(LOG_DIR, "security.log");

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Log security events
 */
export const logSecurityEvent = (eventType, details) => {
  const timestamp = new Date().toISOString();
  const logEntry =
    JSON.stringify({
      timestamp,
      eventType,
      ...details,
    }) + "\n";

  fs.appendFile(SECURITY_LOG, logEntry, (err) => {
    if (err) console.error("Failed to write security log:", err);
  });

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[SECURITY] ${eventType}:`, details);
  }
};

/**
 * Security Event Types
 */
export const SECURITY_EVENTS = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT: "LOGOUT",
  REGISTRATION: "REGISTRATION",
  PASSWORD_CHANGE: "PASSWORD_CHANGE",
  PASSWORD_RESET_REQUEST: "PASSWORD_RESET_REQUEST",
  INVALID_TOKEN: "INVALID_TOKEN",
  UNAUTHORIZED_ACCESS: "UNAUTHORIZED_ACCESS",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  SUSPICIOUS_ACTIVITY: "SUSPICIOUS_ACTIVITY",
  INPUT_SANITIZATION: "INPUT_SANITIZATION",
  CSRF_ATTEMPT: "CSRF_ATTEMPT",
};

/**
 * Security Audit Middleware
 * Logs all authentication-related requests
 */
export const securityAuditMiddleware = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    // Log auth route responses
    if (req.path.includes("/auth/")) {
      const logData = {
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.headers["user-agent"],
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        userId: req.user?.id || "anonymous",
      };

      if (res.statusCode >= 400) {
        logSecurityEvent(SECURITY_EVENTS.SUSPICIOUS_ACTIVITY, logData);
      }
    }

    return originalSend.call(this, body);
  };

  next();
};
```

---

### Step 6: Create CORS Configuration

**`backend/src/config/cors.js`:**

```javascript
/**
 * CORS Configuration
 * Securely configure Cross-Origin Resource Sharing
 */
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  // Add production domains here
];

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "X-CSRF-Token",
  ],
  exposedHeaders: ["X-Total-Count", "X-Page-Count"],
  maxAge: 86400, // Cache preflight for 24 hours
  optionsSuccessStatus: 200,
};
```

---

### Step 7: Update Server with Security Middleware

**Update `backend/src/server.js`:**

```javascript
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import routes from "./routes/index.js";
import { corsOptions } from "./config/cors.js";
import {
  helmetConfig,
  generalLimiter,
  mongoSanitizeConfig,
  xssCleanConfig,
  hppConfig,
} from "./config/security.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import { securityAuditMiddleware } from "./utils/securityLogger.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Trust proxy (required for rate limiting behind reverse proxy)
app.set("trust proxy", 1);

// ==========================================
// SECURITY MIDDLEWARE (Order matters!)
// ==========================================

// 1. Helmet - Set security HTTP headers
app.use(helmetConfig);

// 2. CORS - Handle cross-origin requests
app.use(cors(corsOptions));

// 3. Rate limiting - Prevent brute force attacks
app.use("/api", generalLimiter);

// 4. Body parsers with size limits
app.use(express.json({ limit: "10kb" })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 5. Cookie parser
app.use(cookieParser());

// 6. Data sanitization against NoSQL injection
app.use(mongoSanitizeConfig);

// 7. Data sanitization against XSS
app.use(xssCleanConfig);

// 8. Prevent HTTP Parameter Pollution
app.use(hppConfig);

// 9. Security audit logging
app.use(securityAuditMiddleware);

// ==========================================
// DATABASE CONNECTION
// ==========================================
connectDB();

// ==========================================
// API ROUTES
// ==========================================
app.use("/api", routes);

// ==========================================
// ERROR HANDLING
// ==========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(globalErrorHandler);

// ==========================================
// SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
```

---

### Step 8: Update Auth Routes with Rate Limiting

**Update `backend/src/routes/authRoutes.js`:**

```javascript
import express from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter, passwordResetLimiter } from "../config/security.js";
import { validateRegistration, validateLogin } from "../middleware/validate.js";

const router = express.Router();

// Public routes with rate limiting and validation
router.post("/register", authLimiter, validateRegistration, register);
router.post("/login", authLimiter, validateLogin, login);
router.post("/logout", logout);
router.post("/refresh", refreshAccessToken);

// Protected routes
router.get("/me", protect, getMe);

export default router;
```

---

### Step 9: Create Environment Security Checklist

**`backend/.env.example`:**

```env
# ==========================================
# SERVER CONFIGURATION
# ==========================================
NODE_ENV=development
PORT=5000

# ==========================================
# DATABASE
# ==========================================
# Use strong credentials in production!
MONGO_URI=mongodb://localhost:27017/fashion-store

# ==========================================
# JWT CONFIGURATION
# Generate secure secrets: openssl rand -base64 64
# ==========================================
JWT_SECRET=CHANGE_THIS_TO_A_LONG_RANDOM_STRING_64_CHARS_MINIMUM
JWT_REFRESH_SECRET=CHANGE_THIS_TO_ANOTHER_LONG_RANDOM_STRING_64_CHARS
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# ==========================================
# CORS
# ==========================================
CLIENT_URL=http://localhost:3000

# ==========================================
# RATE LIMITING
# ==========================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ==========================================
# ENCRYPTION (for sensitive data at rest)
# ==========================================
ENCRYPTION_KEY=GENERATE_32_BYTE_HEX_KEY

# ==========================================
# SECURITY HEADERS
# ==========================================
HSTS_MAX_AGE=31536000
```

---

### Security Checklist Summary

| Category                | Implementation                         | Status |
| ----------------------- | -------------------------------------- | ------ |
| **HTTP Headers**        | Helmet with CSP, HSTS, XSS Protection  | ✅     |
| **Rate Limiting**       | Express-rate-limit on all routes       | ✅     |
| **Input Validation**    | Express-validator with sanitization    | ✅     |
| **NoSQL Injection**     | Mongo-sanitize middleware              | ✅     |
| **XSS Prevention**      | XSS-clean middleware                   | ✅     |
| **CORS**                | Whitelist-based origin control         | ✅     |
| **Password Security**   | Bcrypt hashing with 12 salt rounds     | ✅     |
| **JWT Security**        | httpOnly cookies, short expiry         | ✅     |
| **Error Handling**      | No sensitive data in production errors | ✅     |
| **Security Logging**    | Audit trail for auth events            | ✅     |
| **Body Size Limits**    | 10KB limit on JSON payloads            | ✅     |
| **Parameter Pollution** | HPP middleware                         | ✅     |

---

## ✅ Step 3.4 Security Checklist

- [ ] Security packages installed
- [ ] Helmet configured with CSP
- [ ] Rate limiting on all routes
- [ ] Input validation middleware created
- [ ] NoSQL injection protection enabled
- [ ] XSS protection enabled
- [ ] CORS properly configured
- [ ] Error handler doesn't leak sensitive info
- [ ] Security logging implemented
- [ ] Environment variables secured

---

## 🔜 Next: Step 3.5 - Product Model & Routes

In the next step, we'll create:

- Product model with categories, sizes, colors
- Product CRUD operations with security
- Product filtering and pagination

---

_Say "3.5" or "next" to continue_

---

## 3.5 Product Model & Routes

Products are the core of any e-commerce application. This section covers creating a comprehensive product model with all necessary fields for a fashion store, along with secure CRUD operations and advanced filtering.

### Product Data Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRODUCT SCHEMA                             │
├─────────────────────────────────────────────────────────────────┤
│  Basic Info:    name, slug, description, brand                  │
│  Pricing:       price, compareAtPrice, discount                 │
│  Inventory:     sku, stock, lowStockThreshold                   │
│  Variants:      sizes[], colors[], materials                    │
│  Media:         images[], thumbnail                             │
│  Categorization: category, subcategory, tags[]                  │
│  Status:        isActive, isFeatured, isNewArrival              │
│  SEO:           metaTitle, metaDescription                      │
│  Reviews:       ratings, numReviews                             │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 1: Create Product Model

**`backend/src/models/Product.js`:**

```javascript
import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [100, "Brand name cannot exceed 100 characters"],
    },

    // Pricing
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    compareAtPrice: {
      type: Number,
      min: [0, "Compare at price cannot be negative"],
      validate: {
        validator: function (value) {
          return !value || value > this.price;
        },
        message: "Compare at price must be greater than regular price",
      },
    },
    costPrice: {
      type: Number,
      min: [0, "Cost price cannot be negative"],
      select: false, // Hide from public queries
    },
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "VND"],
    },

    // Inventory
    sku: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple null values
      uppercase: true,
      trim: true,
    },
    barcode: {
      type: String,
      sparse: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: [0, "Low stock threshold cannot be negative"],
    },
    trackInventory: {
      type: Boolean,
      default: true,
    },

    // Variants
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
    materials: [
      {
        name: String,
        percentage: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],

    // Media
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
    thumbnail: {
      type: String,
    },

    // Categorization
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["women", "men", "kids", "accessories", "shoes", "bags"],
      index: true,
    },
    subcategory: {
      type: String,
      index: true,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],

    // Product Details
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ["kg", "g", "lb", "oz"],
        default: "kg",
      },
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "in"],
        default: "cm",
      },
    },
    careInstructions: [String],
    features: [String],

    // Status Flags
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNewArrival: {
      type: Boolean,
      default: true,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },

    // SEO
    metaTitle: {
      type: String,
      maxlength: [70, "Meta title cannot exceed 70 characters"],
    },
    metaDescription: {
      type: String,
      maxlength: [160, "Meta description cannot exceed 160 characters"],
    },

    // Reviews & Ratings
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
      distribution: {
        1: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        5: { type: Number, default: 0 },
      },
    },
    numReviews: {
      type: Number,
      default: 0,
    },

    // Timestamps for business logic
    publishedAt: Date,
    saleStartDate: Date,
    saleEndDate: Date,

    // Admin tracking
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ==========================================
// INDEXES for Performance
// ==========================================
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ price: 1, category: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ "ratings.average": -1 });
productSchema.index({ isActive: 1, isFeatured: 1 });

// ==========================================
// VIRTUALS
// ==========================================

// Calculate discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

// Check if product is in stock
productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});

// Check if low stock
productSchema.virtual("isLowStock").get(function () {
  return this.stock > 0 && this.stock <= this.lowStockThreshold;
});

// Get primary image
productSchema.virtual("primaryImage").get(function () {
  const primary = this.images?.find((img) => img.isPrimary);
  return primary?.url || this.images?.[0]?.url || this.thumbnail;
});

// ==========================================
// PRE-SAVE MIDDLEWARE
// ==========================================

// Generate slug from name
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    // Add unique identifier to prevent duplicates
    this.slug = `${this.slug}-${Date.now().toString(36)}`;
  }
  next();
});

// Set thumbnail from primary image
productSchema.pre("save", function (next) {
  if (!this.thumbnail && this.images?.length > 0) {
    const primary = this.images.find((img) => img.isPrimary);
    this.thumbnail = primary?.url || this.images[0].url;
  }
  next();
});

// Update isOnSale based on dates
productSchema.pre("save", function (next) {
  const now = new Date();
  if (this.saleStartDate && this.saleEndDate) {
    this.isOnSale = now >= this.saleStartDate && now <= this.saleEndDate;
  }
  next();
});

// ==========================================
// STATIC METHODS
// ==========================================

// Calculate average rating
productSchema.statics.calculateAverageRating = async function (productId) {
  const Review = mongoose.model("Review");

  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
        distribution: {
          $push: "$rating",
        },
      },
    },
  ]);

  if (stats.length > 0) {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].distribution.forEach((rating) => {
      distribution[rating]++;
    });

    await this.findByIdAndUpdate(productId, {
      "ratings.average": Math.round(stats[0].avgRating * 10) / 10,
      "ratings.count": stats[0].numReviews,
      "ratings.distribution": distribution,
      numReviews: stats[0].numReviews,
    });
  } else {
    await this.findByIdAndUpdate(productId, {
      "ratings.average": 0,
      "ratings.count": 0,
      "ratings.distribution": { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      numReviews: 0,
    });
  }
};

// ==========================================
// INSTANCE METHODS
// ==========================================

// Check if specific size is available
productSchema.methods.isSizeAvailable = function (sizeName) {
  const size = this.sizes.find((s) => s.name === sizeName);
  return size ? size.stock > 0 : false;
};

// Check if specific color is available
productSchema.methods.isColorAvailable = function (colorName) {
  const color = this.colors.find((c) => c.name === colorName);
  return color ? color.stock > 0 : false;
};

// Reduce stock
productSchema.methods.reduceStock = async function (quantity, size, color) {
  if (this.trackInventory) {
    this.stock -= quantity;

    if (size) {
      const sizeVariant = this.sizes.find((s) => s.name === size);
      if (sizeVariant) sizeVariant.stock -= quantity;
    }

    if (color) {
      const colorVariant = this.colors.find((c) => c.name === color);
      if (colorVariant) colorVariant.stock -= quantity;
    }

    await this.save();
  }
};

const Product = mongoose.model("Product", productSchema);

export default Product;
```

---

### Step 2: Install Additional Dependencies

```bash
npm install slugify
```

---

### Step 3: Create Product Controller

**`backend/src/controllers/productController.js`:**

```javascript
import Product from "../models/Product.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get all products with filtering, sorting, pagination
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  // Build query
  const queryObj = { isActive: true };

  // 1. FILTERING
  const {
    category,
    subcategory,
    brand,
    minPrice,
    maxPrice,
    size,
    color,
    tags,
    search,
    inStock,
    onSale,
    featured,
  } = req.query;

  if (category) queryObj.category = category;
  if (subcategory) queryObj.subcategory = subcategory;
  if (brand) queryObj.brand = { $regex: brand, $options: "i" };
  if (tags) queryObj.tags = { $in: tags.split(",") };
  if (inStock === "true") queryObj.stock = { $gt: 0 };
  if (onSale === "true") queryObj.isOnSale = true;
  if (featured === "true") queryObj.isFeatured = true;

  // Price range filter
  if (minPrice || maxPrice) {
    queryObj.price = {};
    if (minPrice) queryObj.price.$gte = Number(minPrice);
    if (maxPrice) queryObj.price.$lte = Number(maxPrice);
  }

  // Size filter
  if (size) {
    queryObj["sizes.name"] = { $in: size.split(",") };
    queryObj["sizes.stock"] = { $gt: 0 };
  }

  // Color filter
  if (color) {
    queryObj["colors.name"] = { $in: color.split(",") };
  }

  // Text search
  if (search) {
    queryObj.$text = { $search: search };
  }

  // 2. SORTING
  let sortBy = "-createdAt"; // Default: newest first
  const { sort } = req.query;

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

  if (sort && sortOptions[sort]) {
    sortBy = sortOptions[sort];
  }

  // 3. FIELD SELECTION
  let fields = "-costPrice -__v";
  if (req.query.fields) {
    fields = req.query.fields.split(",").join(" ");
  }

  // 4. PAGINATION
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const skip = (page - 1) * limit;

  // Execute query
  const [products, total] = await Promise.all([
    Product.find(queryObj).select(fields).sort(sortBy).skip(skip).limit(limit).lean(),
    Product.countDocuments(queryObj),
  ]);

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    success: true,
    data: {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts: total,
        limit,
        hasNextPage,
        hasPrevPage,
      },
    },
  });
});

/**
 * @desc    Get single product by ID or slug
 * @route   GET /api/products/:identifier
 * @access  Public
 */
export const getProduct = asyncHandler(async (req, res, next) => {
  const { identifier } = req.params;

  // Try to find by ID first, then by slug
  let product;

  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(identifier);
  }

  if (!product) {
    product = await Product.findOne({ slug: identifier, isActive: true });
  }

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    data: { product },
  });
});

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 8;

  const products = await Product.find({ isActive: true, isFeatured: true })
    .select("name slug price compareAtPrice thumbnail ratings category")
    .sort("-createdAt")
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    data: { products },
  });
});

/**
 * @desc    Get new arrivals
 * @route   GET /api/products/new-arrivals
 * @access  Public
 */
export const getNewArrivals = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 8;

  const products = await Product.find({ isActive: true, isNewArrival: true })
    .select("name slug price compareAtPrice thumbnail ratings category")
    .sort("-createdAt")
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    data: { products },
  });
});

/**
 * @desc    Get products on sale
 * @route   GET /api/products/sale
 * @access  Public
 */
export const getSaleProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 12;

  const products = await Product.find({
    isActive: true,
    compareAtPrice: { $exists: true, $gt: 0 },
    $expr: { $lt: ["$price", "$compareAtPrice"] },
  })
    .select("name slug price compareAtPrice thumbnail ratings category")
    .sort("-createdAt")
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    data: { products },
  });
});

/**
 * @desc    Get related products
 * @route   GET /api/products/:id/related
 * @access  Public
 */
export const getRelatedProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const limit = parseInt(req.query.limit, 10) || 4;

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    isActive: true,
    $or: [{ category: product.category }, { tags: { $in: product.tags } }],
  })
    .select("name slug price compareAtPrice thumbnail ratings category")
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    data: { products: relatedProducts },
  });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  // Add creator info
  req.body.createdBy = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: { product },
  });
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = asyncHandler(async (req, res, next) => {
  // Add updater info
  req.body.updatedBy = req.user._id;

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: { product },
  });
});

/**
 * @desc    Delete product (soft delete)
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

/**
 * @desc    Get product categories with counts
 * @route   GET /api/products/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        subcategories: { $addToSet: "$subcategory" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json({
    success: true,
    data: { categories },
  });
});

/**
 * @desc    Update product stock
 * @route   PATCH /api/products/:id/stock
 * @access  Private/Admin
 */
export const updateStock = asyncHandler(async (req, res, next) => {
  const { stock, sizes, colors } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (stock !== undefined) {
    product.stock = stock;
  }

  if (sizes) {
    sizes.forEach((update) => {
      const sizeIndex = product.sizes.findIndex((s) => s.name === update.name);
      if (sizeIndex > -1) {
        product.sizes[sizeIndex].stock = update.stock;
      }
    });
  }

  if (colors) {
    colors.forEach((update) => {
      const colorIndex = product.colors.findIndex((c) => c.name === update.name);
      if (colorIndex > -1) {
        product.colors[colorIndex].stock = update.stock;
      }
    });
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Stock updated successfully",
    data: { product },
  });
});
```

---

### Step 4: Create Product Validation

**`backend/src/middleware/productValidation.js`:**

```javascript
import { body, query } from "express-validator";
import { handleValidationErrors } from "./validate.js";

/**
 * Product Creation/Update Validation
 */
export const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Name must be 3-200 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 5000 })
    .withMessage("Description must be 10-5000 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("compareAtPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Compare at price must be a positive number"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["women", "men", "kids", "accessories", "shoes", "bags"])
    .withMessage("Invalid category"),

  body("sizes").optional().isArray().withMessage("Sizes must be an array"),

  body("sizes.*.name")
    .optional()
    .isIn(["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size"])
    .withMessage("Invalid size"),

  body("colors").optional().isArray().withMessage("Colors must be an array"),

  body("colors.*.hexCode")
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Invalid hex color code"),

  body("images").optional().isArray({ min: 1 }).withMessage("At least one image is required"),

  body("images.*.url").optional().isURL().withMessage("Invalid image URL"),

  handleValidationErrors,
];

/**
 * Product Query Validation
 */
export const validateProductQuery = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Min price must be a positive number"),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Max price must be a positive number"),

  query("sort")
    .optional()
    .isIn([
      "price-asc",
      "price-desc",
      "newest",
      "oldest",
      "name-asc",
      "name-desc",
      "rating",
      "popular",
    ])
    .withMessage("Invalid sort option"),

  handleValidationErrors,
];
```

---

### Step 5: Create Product Routes

**`backend/src/routes/productRoutes.js`:**

```javascript
import express from "express";
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getNewArrivals,
  getSaleProducts,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  updateStock,
} from "../controllers/productController.js";
import { protect, authorize } from "../middleware/auth.js";
import { validateProduct, validateProductQuery } from "../middleware/productValidation.js";
import { validateObjectId } from "../middleware/validate.js";

const router = express.Router();

// Public routes
router.get("/", validateProductQuery, getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/new-arrivals", getNewArrivals);
router.get("/sale", getSaleProducts);
router.get("/categories", getCategories);
router.get("/:identifier", getProduct);
router.get("/:id/related", validateObjectId("id"), getRelatedProducts);

// Admin routes (protected)
router.post("/", protect, authorize("admin"), validateProduct, createProduct);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validateObjectId("id"),
  validateProduct,
  updateProduct
);

router.delete("/:id", protect, authorize("admin"), validateObjectId("id"), deleteProduct);

router.patch("/:id/stock", protect, authorize("admin"), validateObjectId("id"), updateStock);

export default router;
```

---

### Step 6: Update Route Index

**Update `backend/src/routes/index.js`:**

```javascript
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);

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

### Step 7: Test Product Endpoints

**Get All Products with Filters:**

```
GET http://localhost:5000/api/products?category=women&minPrice=50&maxPrice=200&sort=price-asc&page=1&limit=12
```

**Get Single Product:**

```
GET http://localhost:5000/api/products/product-slug-here
```

**Create Product (Admin):**

```
POST http://localhost:5000/api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Elegant Summer Dress",
  "description": "A beautiful summer dress perfect for any occasion...",
  "price": 89.99,
  "compareAtPrice": 129.99,
  "stock": 50,
  "category": "women",
  "subcategory": "dresses",
  "brand": "Fashion Brand",
  "sizes": [
    { "name": "S", "stock": 15 },
    { "name": "M", "stock": 20 },
    { "name": "L", "stock": 15 }
  ],
  "colors": [
    { "name": "Navy Blue", "hexCode": "#000080", "stock": 25 },
    { "name": "White", "hexCode": "#FFFFFF", "stock": 25 }
  ],
  "images": [
    { "url": "https://example.com/image1.jpg", "isPrimary": true },
    { "url": "https://example.com/image2.jpg" }
  ],
  "tags": ["summer", "dress", "elegant"],
  "isFeatured": true
}
```

---

## ✅ Step 3.5 Checklist

- [ ] Product model created with:
  - [ ] Basic info (name, slug, description)
  - [ ] Pricing (price, compareAtPrice, discount)
  - [ ] Inventory tracking (stock, SKU)
  - [ ] Variants (sizes, colors, materials)
  - [ ] Media (images, thumbnail)
  - [ ] Categorization (category, tags)
  - [ ] Status flags (isActive, isFeatured)
  - [ ] SEO fields
  - [ ] Ratings system
- [ ] Product controller with:
  - [ ] CRUD operations
  - [ ] Advanced filtering
  - [ ] Sorting and pagination
  - [ ] Featured/New/Sale endpoints
- [ ] Input validation for products
- [ ] Product routes configured
- [ ] Admin-only protection for write operations

---

## 🔜 Next: Step 3.6 - Cart & Order Models

In the next step, we'll create:

- Shopping cart functionality
- Order model and processing
- Checkout flow

---

_Say "3.6" or "next" to continue_

---

## 3.6 Shopping Cart & Order Models (In-Depth)

This section provides an in-depth look at designing and implementing a robust shopping cart and order system for an e-commerce platform. We'll cover architecture decisions, data flow, edge cases, and best practices.

---

### 3.6.1 Cart Architecture Deep Dive

#### Cart Storage Strategies

There are several approaches to storing cart data, each with trade-offs:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CART STORAGE STRATEGIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. DATABASE CART (MongoDB)                                                 │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  Pros:                                                          │     │
│     │  • Persistent across devices and sessions                       │     │
│     │  • Easy to implement abandoned cart recovery                    │     │
│     │  • Can store cart history for analytics                         │     │
│     │  • Supports guest cart → user cart merge                        │     │
│     │                                                                 │     │
│     │  Cons:                                                          │     │
│     │  • Database load for every cart operation                       │     │
│     │  • Slightly slower than in-memory solutions                     │     │
│     │  • Requires cleanup of abandoned carts                          │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  2. REDIS CART (In-Memory)                                                  │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  Pros:                                                          │     │
│     │  • Extremely fast read/write operations                         │     │
│     │  • Built-in TTL for automatic expiration                        │     │
│     │  • Reduces database load                                        │     │
│     │                                                                 │     │
│     │  Cons:                                                          │     │
│     │  • Additional infrastructure (Redis server)                     │     │
│     │  • Data loss if Redis crashes (unless persistence enabled)      │     │
│     │  • More complex setup                                           │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  3. HYBRID APPROACH (Recommended for Production)                            │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  • Redis for active carts (fast operations)                     │     │
│     │  • MongoDB for cart persistence (backup/recovery)               │     │
│     │  • Sync periodically or on significant events                   │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  4. CLIENT-SIDE CART (localStorage/sessionStorage)                          │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  Pros:                                                          │     │
│     │  • Zero server load                                             │     │
│     │  • Works offline                                                │     │
│     │  • Instant operations                                           │     │
│     │                                                                 │     │
│     │  Cons:                                                          │     │
│     │  • Not persistent across devices                                │     │
│     │  • Security concerns (price manipulation)                       │     │
│     │  • Lost if browser data cleared                                 │     │
│     │  • No abandoned cart recovery                                   │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Our Choice: Database Cart (MongoDB) with optional Redis caching**

For this guide, we'll use MongoDB for cart storage because:

1. Simplifies infrastructure (no additional Redis server)
2. Provides persistence and cross-device sync
3. Enables abandoned cart features
4. Sufficient performance for most fashion e-commerce sites

---

### 3.6.2 Cart Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CART DATA FLOW                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GUEST USER FLOW:                                                           │
│  ┌────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │ Browse │───►│ Add to Cart │───►│ Cart stored  │───►│ Login/       │     │
│  │Products│    │ (sessionId) │    │ with sessionId│   │ Register     │     │
│  └────────┘    └─────────────┘    └──────────────┘    └──────┬───────┘     │
│                                                               │             │
│                                                               ▼             │
│                                                        ┌──────────────┐     │
│                                                        │ Merge guest  │     │
│                                                        │ cart → user  │     │
│                                                        │ cart         │     │
│                                                        └──────────────┘     │
│                                                                             │
│  LOGGED-IN USER FLOW:                                                       │
│  ┌────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │ Browse │───►│ Add to Cart │───►│ Cart stored  │───►│  Checkout    │     │
│  │Products│    │  (userId)   │    │  with userId │    │              │     │
│  └────────┘    └─────────────┘    └──────────────┘    └──────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.6.3 Cart Model Design

**`backend/src/models/Cart.js`:**

```javascript
import mongoose from "mongoose";

/**
 * Cart Item Sub-Schema
 * Represents a single item in the cart with all variant information
 */
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    // Denormalized product data (snapshot at time of adding)
    // This ensures cart shows correct info even if product changes
    productSnapshot: {
      name: { type: String, required: true },
      slug: String,
      price: { type: Number, required: true },
      compareAtPrice: Number,
      thumbnail: String,
      sku: String,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      max: [99, "Quantity cannot exceed 99"],
      default: 1,
    },
    // Selected variants
    selectedSize: {
      type: String,
      enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size", null],
    },
    selectedColor: {
      name: String,
      hexCode: String,
    },
    // Price at time of adding (locks in sale prices)
    unitPrice: {
      type: Number,
      required: true,
    },
    // Calculated fields
    lineTotal: {
      type: Number,
      required: true,
    },
    // Gift options
    isGift: {
      type: Boolean,
      default: false,
    },
    giftMessage: {
      type: String,
      maxlength: [500, "Gift message cannot exceed 500 characters"],
    },
    // Tracking
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

/**
 * Main Cart Schema
 */
const cartSchema = new mongoose.Schema(
  {
    // Owner identification (either user OR session, not both required)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    sessionId: {
      type: String,
      index: true,
    },

    // Cart items
    items: [cartItemSchema],

    // Cart totals (calculated)
    subtotal: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },

    // Discount/Coupon
    coupon: {
      code: String,
      discountType: {
        type: String,
        enum: ["percentage", "fixed", "free_shipping"],
      },
      discountValue: Number,
      discountAmount: {
        type: Number,
        default: 0,
      },
    },

    // Shipping estimate (optional, calculated)
    estimatedShipping: {
      type: Number,
      default: 0,
    },

    // Tax estimate (optional, calculated based on location)
    estimatedTax: {
      type: Number,
      default: 0,
    },

    // Grand total
    estimatedTotal: {
      type: Number,
      default: 0,
    },

    // Cart status
    status: {
      type: String,
      enum: ["active", "merged", "converted", "abandoned", "expired"],
      default: "active",
    },

    // Metadata
    currency: {
      type: String,
      default: "USD",
    },
    notes: String,

    // Abandoned cart tracking
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
    abandonedEmailSent: {
      type: Boolean,
      default: false,
    },

    // Conversion tracking
    convertedToOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    // Expiration (for guest carts)
    expiresAt: {
      type: Date,
      index: { expireAfterSeconds: 0 }, // TTL index
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ==========================================
// INDEXES
// ==========================================
cartSchema.index({ user: 1, status: 1 });
cartSchema.index({ sessionId: 1, status: 1 });
cartSchema.index({ lastActivityAt: 1, status: 1 }); // For abandoned cart queries
cartSchema.index({ "items.product": 1 });

// ==========================================
// VIRTUALS
// ==========================================

cartSchema.virtual("isEmpty").get(function () {
  return this.items.length === 0;
});

cartSchema.virtual("hasDiscount").get(function () {
  return this.coupon && this.coupon.discountAmount > 0;
});

// ==========================================
// INSTANCE METHODS
// ==========================================

/**
 * Add item to cart
 * Handles duplicate detection and quantity updates
 */
cartSchema.methods.addItem = async function (productData, quantity = 1, options = {}) {
  const { selectedSize, selectedColor, isGift, giftMessage } = options;

  // Check if same product with same variants exists
  const existingItemIndex = this.items.findIndex(
    (item) =>
      item.product.toString() === productData._id.toString() &&
      item.selectedSize === selectedSize &&
      item.selectedColor?.name === selectedColor?.name
  );

  if (existingItemIndex > -1) {
    // Update quantity of existing item
    const newQuantity = this.items[existingItemIndex].quantity + quantity;

    if (newQuantity > 99) {
      throw new Error("Maximum quantity per item is 99");
    }

    this.items[existingItemIndex].quantity = newQuantity;
    this.items[existingItemIndex].lineTotal = this.items[existingItemIndex].unitPrice * newQuantity;
  } else {
    // Add new item
    const unitPrice = productData.price;

    this.items.push({
      product: productData._id,
      productSnapshot: {
        name: productData.name,
        slug: productData.slug,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice,
        thumbnail: productData.thumbnail || productData.primaryImage,
        sku: productData.sku,
      },
      quantity,
      selectedSize,
      selectedColor,
      unitPrice,
      lineTotal: unitPrice * quantity,
      isGift,
      giftMessage,
    });
  }

  this.lastActivityAt = new Date();
  await this.calculateTotals();
  return this.save();
};

/**
 * Update item quantity
 */
cartSchema.methods.updateItemQuantity = async function (itemId, quantity) {
  const item = this.items.id(itemId);

  if (!item) {
    throw new Error("Item not found in cart");
  }

  if (quantity < 1) {
    return this.removeItem(itemId);
  }

  if (quantity > 99) {
    throw new Error("Maximum quantity per item is 99");
  }

  item.quantity = quantity;
  item.lineTotal = item.unitPrice * quantity;
  this.lastActivityAt = new Date();

  await this.calculateTotals();
  return this.save();
};

/**
 * Remove item from cart
 */
cartSchema.methods.removeItem = async function (itemId) {
  this.items = this.items.filter((item) => item._id.toString() !== itemId.toString());

  this.lastActivityAt = new Date();
  await this.calculateTotals();
  return this.save();
};

/**
 * Clear all items from cart
 */
cartSchema.methods.clearCart = async function () {
  this.items = [];
  this.coupon = undefined;
  await this.calculateTotals();
  return this.save();
};

/**
 * Calculate all cart totals
 */
cartSchema.methods.calculateTotals = async function () {
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.lineTotal, 0);

  // Count items and quantity
  this.totalItems = this.items.length;
  this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);

  // Apply coupon discount
  if (this.coupon && this.coupon.code) {
    if (this.coupon.discountType === "percentage") {
      this.coupon.discountAmount = (this.subtotal * this.coupon.discountValue) / 100;
    } else if (this.coupon.discountType === "fixed") {
      this.coupon.discountAmount = Math.min(this.coupon.discountValue, this.subtotal);
    } else if (this.coupon.discountType === "free_shipping") {
      this.estimatedShipping = 0;
    }
  } else {
    this.coupon = undefined;
  }

  const discountAmount = this.coupon?.discountAmount || 0;

  // Calculate estimated total
  this.estimatedTotal = this.subtotal - discountAmount + this.estimatedShipping + this.estimatedTax;

  // Ensure non-negative
  this.estimatedTotal = Math.max(0, this.estimatedTotal);

  return this;
};

/**
 * Apply coupon code
 */
cartSchema.methods.applyCoupon = async function (couponData) {
  this.coupon = {
    code: couponData.code,
    discountType: couponData.discountType,
    discountValue: couponData.discountValue,
    discountAmount: 0,
  };

  await this.calculateTotals();
  return this.save();
};

/**
 * Remove coupon
 */
cartSchema.methods.removeCoupon = async function () {
  this.coupon = undefined;
  await this.calculateTotals();
  return this.save();
};

/**
 * Validate cart items against current product data
 * Returns array of issues found
 */
cartSchema.methods.validateItems = async function () {
  const Product = mongoose.model("Product");
  const issues = [];

  for (const item of this.items) {
    const product = await Product.findById(item.product);

    if (!product) {
      issues.push({
        itemId: item._id,
        type: "PRODUCT_NOT_FOUND",
        message: `Product "${item.productSnapshot.name}" is no longer available`,
      });
      continue;
    }

    if (!product.isActive) {
      issues.push({
        itemId: item._id,
        type: "PRODUCT_INACTIVE",
        message: `Product "${item.productSnapshot.name}" is no longer available`,
      });
      continue;
    }

    // Check stock
    if (product.stock < item.quantity) {
      issues.push({
        itemId: item._id,
        type: "INSUFFICIENT_STOCK",
        message: `Only ${product.stock} units of "${item.productSnapshot.name}" available`,
        availableStock: product.stock,
      });
    }

    // Check if price changed
    if (product.price !== item.unitPrice) {
      issues.push({
        itemId: item._id,
        type: "PRICE_CHANGED",
        message: `Price of "${item.productSnapshot.name}" has changed`,
        oldPrice: item.unitPrice,
        newPrice: product.price,
      });
    }

    // Check size availability
    if (item.selectedSize) {
      const sizeVariant = product.sizes.find((s) => s.name === item.selectedSize);
      if (!sizeVariant || sizeVariant.stock < item.quantity) {
        issues.push({
          itemId: item._id,
          type: "SIZE_UNAVAILABLE",
          message: `Size ${item.selectedSize} of "${item.productSnapshot.name}" is not available`,
        });
      }
    }
  }

  return issues;
};

/**
 * Merge another cart into this one (for guest → user conversion)
 */
cartSchema.methods.mergeCart = async function (guestCart) {
  for (const guestItem of guestCart.items) {
    // Check if product already exists in user cart
    const existingIndex = this.items.findIndex(
      (item) =>
        item.product.toString() === guestItem.product.toString() &&
        item.selectedSize === guestItem.selectedSize &&
        item.selectedColor?.name === guestItem.selectedColor?.name
    );

    if (existingIndex > -1) {
      // Add quantities (cap at 99)
      const newQty = Math.min(99, this.items[existingIndex].quantity + guestItem.quantity);
      this.items[existingIndex].quantity = newQty;
      this.items[existingIndex].lineTotal = this.items[existingIndex].unitPrice * newQty;
    } else {
      // Add guest item to user cart
      this.items.push(guestItem);
    }
  }

  await this.calculateTotals();
  return this.save();
};

// ==========================================
// STATIC METHODS
// ==========================================

/**
 * Get or create cart for user
 */
cartSchema.statics.getOrCreateForUser = async function (userId) {
  let cart = await this.findOne({ user: userId, status: "active" });

  if (!cart) {
    cart = await this.create({ user: userId });
  }

  return cart;
};

/**
 * Get or create cart for guest session
 */
cartSchema.statics.getOrCreateForSession = async function (sessionId) {
  let cart = await this.findOne({ sessionId, status: "active" });

  if (!cart) {
    // Set expiration for guest carts (30 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    cart = await this.create({ sessionId, expiresAt });
  }

  return cart;
};

/**
 * Find abandoned carts (no activity for specified hours)
 */
cartSchema.statics.findAbandonedCarts = async function (hoursInactive = 24) {
  const cutoffDate = new Date();
  cutoffDate.setHours(cutoffDate.getHours() - hoursInactive);

  return this.find({
    status: "active",
    lastActivityAt: { $lt: cutoffDate },
    totalItems: { $gt: 0 },
    abandonedEmailSent: false,
    user: { $exists: true }, // Only for registered users
  }).populate("user", "email firstName");
};

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
```

---

### 3.6.4 Order Lifecycle & States

Understanding the order lifecycle is crucial for proper implementation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ORDER LIFECYCLE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ PENDING  │───►│ CONFIRMED│───►│PROCESSING│───►│ SHIPPED  │              │
│  │(Payment  │    │(Payment  │    │(Preparing│    │(In       │              │
│  │ awaited) │    │ received)│    │ order)   │    │ transit) │              │
│  └────┬─────┘    └──────────┘    └──────────┘    └────┬─────┘              │
│       │                                               │                     │
│       │ Payment                                       │ Delivered           │
│       │ Failed                                        ▼                     │
│       │                                        ┌──────────┐                 │
│       ▼                                        │DELIVERED │                 │
│  ┌──────────┐                                  │(Complete)│                 │
│  │ CANCELLED│                                  └────┬─────┘                 │
│  │          │                                       │                       │
│  └──────────┘                                       │ Return                │
│                                                     │ Requested             │
│       ▲                                             ▼                       │
│       │                                        ┌──────────┐                 │
│       │ Cancelled by                           │ RETURNED │                 │
│       │ User/Admin                             │          │                 │
│       │                                        └──────────┘                 │
│                                                                             │
│  REFUND STATES:                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  pending_refund → refund_processing → refunded → partial_refund │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.6.5 Order Model Design

**`backend/src/models/Order.js`:**

```javascript
import mongoose from "mongoose";
import crypto from "crypto";

/**
 * Order Item Sub-Schema
 */
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    // Complete product snapshot at time of order
    productSnapshot: {
      name: { type: String, required: true },
      slug: String,
      sku: String,
      thumbnail: String,
      brand: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    lineTotal: {
      type: Number,
      required: true,
    },
    // Selected variants
    selectedSize: String,
    selectedColor: {
      name: String,
      hexCode: String,
    },
    // Item-level discount
    discount: {
      type: Number,
      default: 0,
    },
    // Gift options
    isGift: {
      type: Boolean,
      default: false,
    },
    giftMessage: String,
    // Item fulfillment status
    fulfillmentStatus: {
      type: String,
      enum: ["pending", "fulfilled", "backordered", "cancelled"],
      default: "pending",
    },
  },
  { _id: true }
);

/**
 * Address Sub-Schema
 */
const addressSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: String,
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "US" },
    phone: { type: String, required: true },
    email: String,
    isDefault: Boolean,
  },
  { _id: false }
);

/**
 * Payment Info Sub-Schema
 */
const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "stripe", "cod", "bank_transfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "authorized", "captured", "failed", "refunded", "partial_refund"],
      default: "pending",
    },
    transactionId: String,
    gateway: String, // 'stripe', 'paypal', etc.
    gatewayResponse: mongoose.Schema.Types.Mixed,
    paidAt: Date,
    // Card details (masked)
    cardLast4: String,
    cardBrand: String,
    // Amounts
    amount: Number,
    currency: { type: String, default: "USD" },
    // Refund tracking
    refundedAmount: { type: Number, default: 0 },
    refunds: [
      {
        amount: Number,
        reason: String,
        refundedAt: Date,
        transactionId: String,
      },
    ],
  },
  { _id: false }
);

/**
 * Shipping Info Sub-Schema
 */
const shippingSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    carrier: String, // 'fedex', 'ups', 'usps', etc.
    cost: {
      type: Number,
      required: true,
      default: 0,
    },
    estimatedDelivery: {
      from: Date,
      to: Date,
    },
    trackingNumber: String,
    trackingUrl: String,
    shippedAt: Date,
    deliveredAt: Date,
    // Shipping label
    label: {
      url: String,
      createdAt: Date,
    },
  },
  { _id: false }
);

/**
 * Order Timeline Event Sub-Schema
 */
const timelineEventSchema = new mongoose.Schema(
  {
    status: String,
    description: String,
    timestamp: { type: Date, default: Date.now },
    actor: {
      type: String,
      enum: ["system", "user", "admin"],
      default: "system",
    },
    actorId: mongoose.Schema.Types.ObjectId,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { _id: true }
);

/**
 * Main Order Schema
 */
const orderSchema = new mongoose.Schema(
  {
    // Order identification
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },

    // Customer info
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    guestEmail: String, // For guest checkout
    customerSnapshot: {
      email: String,
      firstName: String,
      lastName: String,
      phone: String,
    },

    // Order items
    items: [orderItemSchema],

    // Addresses
    shippingAddress: addressSchema,
    billingAddress: addressSchema,
    sameAsShipping: { type: Boolean, default: true },

    // Pricing breakdown
    pricing: {
      subtotal: { type: Number, required: true },
      shipping: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      taxRate: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },

    // Coupon/Discount applied
    coupon: {
      code: String,
      discountType: String,
      discountValue: Number,
      discountAmount: Number,
    },

    // Payment info
    payment: paymentSchema,

    // Shipping info
    shipping: shippingSchema,

    // Order status
    status: {
      type: String,
      enum: [
        "pending", // Order created, awaiting payment
        "confirmed", // Payment received
        "processing", // Being prepared
        "shipped", // In transit
        "delivered", // Delivered to customer
        "completed", // Order finalized
        "cancelled", // Cancelled
        "refunded", // Fully refunded
        "failed", // Payment failed
      ],
      default: "pending",
      index: true,
    },

    // Fulfillment status
    fulfillmentStatus: {
      type: String,
      enum: ["unfulfilled", "partially_fulfilled", "fulfilled", "returned"],
      default: "unfulfilled",
    },

    // Timeline/History
    timeline: [timelineEventSchema],

    // Internal notes (admin only)
    internalNotes: [
      {
        note: String,
        createdBy: mongoose.Schema.Types.ObjectId,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Customer notes
    customerNotes: String,

    // Flags
    isGift: { type: Boolean, default: false },
    giftMessage: String,
    requiresShipping: { type: Boolean, default: true },

    // Metadata
    source: {
      type: String,
      enum: ["web", "mobile", "admin", "api"],
      default: "web",
    },
    ipAddress: String,
    userAgent: String,

    // Related records
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },

    // Timestamps
    placedAt: Date,
    confirmedAt: Date,
    processedAt: Date,
    shippedAt: Date,
    deliveredAt: Date,
    completedAt: Date,
    cancelledAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ==========================================
// INDEXES
// ==========================================
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ "payment.status": 1 });
orderSchema.index({ "customerSnapshot.email": 1 });
orderSchema.index({ createdAt: -1 });

// ==========================================
// VIRTUALS
// ==========================================

orderSchema.virtual("itemCount").get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

orderSchema.virtual("isPaid").get(function () {
  return ["captured", "partial_refund"].includes(this.payment?.status);
});

orderSchema.virtual("canCancel").get(function () {
  return ["pending", "confirmed"].includes(this.status);
});

orderSchema.virtual("canRefund").get(function () {
  return (
    this.isPaid &&
    ["confirmed", "processing", "shipped", "delivered", "completed"].includes(this.status)
  );
});

// ==========================================
// PRE-SAVE MIDDLEWARE
// ==========================================

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    this.orderNumber = await generateOrderNumber();
  }
  next();
});

/**
 * Generate unique order number
 * Format: FS-YYYYMMDD-XXXXX (e.g., FS-20241216-A3B2C)
 */
async function generateOrderNumber() {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `FS-${dateStr}-${randomStr}`;
}

// ==========================================
// INSTANCE METHODS
// ==========================================

/**
 * Add timeline event
 */
orderSchema.methods.addTimelineEvent = function (
  status,
  description,
  actor = "system",
  metadata = {}
) {
  this.timeline.push({
    status,
    description,
    actor,
    metadata,
    timestamp: new Date(),
  });
};

/**
 * Update order status with validation
 */
orderSchema.methods.updateStatus = async function (
  newStatus,
  actorType = "system",
  actorId = null
) {
  const validTransitions = {
    pending: ["confirmed", "cancelled", "failed"],
    confirmed: ["processing", "cancelled", "refunded"],
    processing: ["shipped", "cancelled"],
    shipped: ["delivered", "returned"],
    delivered: ["completed", "returned"],
    completed: ["refunded"],
    cancelled: [],
    refunded: [],
    failed: ["pending"],
  };

  if (!validTransitions[this.status]?.includes(newStatus)) {
    throw new Error(`Invalid status transition from "${this.status}" to "${newStatus}"`);
  }

  const oldStatus = this.status;
  this.status = newStatus;

  // Set timestamps
  const timestampMap = {
    confirmed: "confirmedAt",
    processing: "processedAt",
    shipped: "shippedAt",
    delivered: "deliveredAt",
    completed: "completedAt",
    cancelled: "cancelledAt",
  };

  if (timestampMap[newStatus]) {
    this[timestampMap[newStatus]] = new Date();
  }

  // Add timeline event
  this.addTimelineEvent(
    newStatus,
    `Order status changed from "${oldStatus}" to "${newStatus}"`,
    actorType,
    { previousStatus: oldStatus, actorId }
  );

  return this.save();
};

/**
 * Process refund
 */
orderSchema.methods.processRefund = async function (amount, reason, transactionId) {
  if (!this.canRefund) {
    throw new Error("Order cannot be refunded");
  }

  const maxRefund = this.pricing.total - this.payment.refundedAmount;
  if (amount > maxRefund) {
    throw new Error(`Maximum refund amount is ${maxRefund}`);
  }

  this.payment.refundedAmount += amount;
  this.payment.refunds.push({
    amount,
    reason,
    transactionId,
    refundedAt: new Date(),
  });

  // Update payment status
  if (this.payment.refundedAmount >= this.pricing.total) {
    this.payment.status = "refunded";
    this.status = "refunded";
  } else {
    this.payment.status = "partial_refund";
  }

  this.addTimelineEvent("refund", `Refund of ${amount} processed. Reason: ${reason}`, "admin");

  return this.save();
};

/**
 * Calculate order totals from items
 */
orderSchema.methods.calculateTotals = function () {
  this.pricing.subtotal = this.items.reduce((sum, item) => sum + item.lineTotal, 0);

  const discountAmount = this.coupon?.discountAmount || 0;

  this.pricing.total =
    this.pricing.subtotal +
    this.pricing.shipping +
    this.pricing.tax -
    this.pricing.discount -
    discountAmount;

  this.pricing.total = Math.max(0, this.pricing.total);
};

// ==========================================
// STATIC METHODS
// ==========================================

/**
 * Create order from cart
 */
orderSchema.statics.createFromCart = async function (cart, orderData) {
  const User = mongoose.model("User");

  // Validate cart
  const issues = await cart.validateItems();
  if (issues.length > 0) {
    throw new Error("Cart validation failed: " + JSON.stringify(issues));
  }

  // Get user info if logged in
  let customerSnapshot = {};
  if (cart.user) {
    const user = await User.findById(cart.user);
    if (user) {
      customerSnapshot = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      };
    }
  }

  // Create order items from cart items
  const orderItems = cart.items.map((item) => ({
    product: item.product,
    productSnapshot: item.productSnapshot,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineTotal: item.lineTotal,
    selectedSize: item.selectedSize,
    selectedColor: item.selectedColor,
    isGift: item.isGift,
    giftMessage: item.giftMessage,
  }));

  // Create order
  const order = await this.create({
    user: cart.user,
    guestEmail: orderData.guestEmail,
    customerSnapshot,
    items: orderItems,
    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.sameAsShipping ? orderData.shippingAddress : orderData.billingAddress,
    sameAsShipping: orderData.sameAsShipping,
    pricing: {
      subtotal: cart.subtotal,
      shipping: orderData.shippingCost || 0,
      tax: orderData.tax || 0,
      taxRate: orderData.taxRate || 0,
      discount: cart.coupon?.discountAmount || 0,
      total: cart.estimatedTotal,
      currency: cart.currency,
    },
    coupon: cart.coupon,
    payment: {
      method: orderData.paymentMethod,
      amount: cart.estimatedTotal,
      currency: cart.currency,
    },
    shipping: {
      method: orderData.shippingMethod,
      cost: orderData.shippingCost || 0,
      estimatedDelivery: orderData.estimatedDelivery,
    },
    customerNotes: orderData.customerNotes,
    isGift: orderData.isGift,
    giftMessage: orderData.giftMessage,
    source: orderData.source || "web",
    ipAddress: orderData.ipAddress,
    userAgent: orderData.userAgent,
    cart: cart._id,
    placedAt: new Date(),
  });

  // Add initial timeline event
  order.addTimelineEvent("pending", "Order placed", "user");
  await order.save();

  // Mark cart as converted
  cart.status = "converted";
  cart.convertedToOrder = order._id;
  await cart.save();

  return order;
};

/**
 * Get order statistics
 */
orderSchema.statics.getStats = async function (startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        status: { $nin: ["cancelled", "failed"] },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$pricing.total" },
        averageOrderValue: { $avg: "$pricing.total" },
        totalItems: { $sum: { $size: "$items" } },
      },
    },
  ]);
};

const Order = mongoose.model("Order", orderSchema);

export default Order;
```

---

### 3.6.6 Cart Controller

**`backend/src/controllers/cartController.js`:**

```javascript
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * Get cart identifier from request
 */
const getCartIdentifier = (req) => {
  if (req.user) {
    return { user: req.user._id };
  }
  // For guests, use session ID from cookie or header
  const sessionId = req.cookies.cartSession || req.headers["x-cart-session"];
  if (!sessionId) {
    throw new AppError("Cart session required for guest users", 400);
  }
  return { sessionId };
};

/**
 * @desc    Get current cart
 * @route   GET /api/cart
 * @access  Public (with session) / Private
 */
export const getCart = asyncHandler(async (req, res) => {
  let cart;

  if (req.user) {
    cart = await Cart.getOrCreateForUser(req.user._id);
  } else {
    const sessionId = req.cookies.cartSession || req.headers["x-cart-session"];
    if (sessionId) {
      cart = await Cart.getOrCreateForSession(sessionId);
    } else {
      // Return empty cart structure for new visitors
      return res.status(200).json({
        success: true,
        data: {
          cart: {
            items: [],
            subtotal: 0,
            totalItems: 0,
            totalQuantity: 0,
            estimatedTotal: 0,
          },
        },
      });
    }
  }

  // Populate product details
  await cart.populate("items.product", "name slug price stock isActive");

  res.status(200).json({
    success: true,
    data: { cart },
  });
});

/**
 * @desc    Add item to cart
 * @route   POST /api/cart/items
 * @access  Public (with session) / Private
 */
export const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity = 1, selectedSize, selectedColor, isGift, giftMessage } = req.body;

  // Validate product
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (!product.isActive) {
    return next(new AppError("Product is not available", 400));
  }

  // Check stock
  if (product.stock < quantity) {
    return next(new AppError(`Only ${product.stock} items available`, 400));
  }

  // Check size availability if selected
  if (selectedSize) {
    const sizeVariant = product.sizes.find((s) => s.name === selectedSize);
    if (!sizeVariant || sizeVariant.stock < quantity) {
      return next(new AppError(`Size ${selectedSize} is not available`, 400));
    }
  }

  // Get or create cart
  let cart;
  if (req.user) {
    cart = await Cart.getOrCreateForUser(req.user._id);
  } else {
    let sessionId = req.cookies.cartSession || req.headers["x-cart-session"];
    if (!sessionId) {
      // Generate new session ID
      sessionId = require("crypto").randomBytes(32).toString("hex");
      res.cookie("cartSession", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
    }
    cart = await Cart.getOrCreateForSession(sessionId);
  }

  // Add item to cart
  await cart.addItem(product, quantity, {
    selectedSize,
    selectedColor,
    isGift,
    giftMessage,
  });

  await cart.populate("items.product", "name slug price stock isActive");

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    data: { cart },
  });
});

/**
 * @desc    Update cart item quantity
 * @route   PATCH /api/cart/items/:itemId
 * @access  Public (with session) / Private
 */
export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const identifier = getCartIdentifier(req);
  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const item = cart.items.id(itemId);
  if (!item) {
    return next(new AppError("Item not found in cart", 404));
  }

  // Validate stock
  const product = await Product.findById(item.product);
  if (product && quantity > product.stock) {
    return next(new AppError(`Only ${product.stock} items available`, 400));
  }

  await cart.updateItemQuantity(itemId, quantity);
  await cart.populate("items.product", "name slug price stock isActive");

  res.status(200).json({
    success: true,
    message: quantity > 0 ? "Cart updated" : "Item removed from cart",
    data: { cart },
  });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/items/:itemId
 * @access  Public (with session) / Private
 */
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;

  const identifier = getCartIdentifier(req);
  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  await cart.removeItem(itemId);
  await cart.populate("items.product", "name slug price stock isActive");

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    data: { cart },
  });
});

/**
 * @desc    Clear entire cart
 * @route   DELETE /api/cart
 * @access  Public (with session) / Private
 */
export const clearCart = asyncHandler(async (req, res, next) => {
  const identifier = getCartIdentifier(req);
  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  await cart.clearCart();

  res.status(200).json({
    success: true,
    message: "Cart cleared",
    data: { cart },
  });
});

/**
 * @desc    Apply coupon to cart
 * @route   POST /api/cart/coupon
 * @access  Public (with session) / Private
 */
export const applyCoupon = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  // TODO: Implement coupon validation
  // For now, simple mock validation
  const couponData = {
    code: code.toUpperCase(),
    discountType: "percentage",
    discountValue: 10, // 10% off
  };

  const identifier = getCartIdentifier(req);
  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  await cart.applyCoupon(couponData);
  await cart.populate("items.product", "name slug price stock isActive");

  res.status(200).json({
    success: true,
    message: "Coupon applied",
    data: { cart },
  });
});

/**
 * @desc    Remove coupon from cart
 * @route   DELETE /api/cart/coupon
 * @access  Public (with session) / Private
 */
export const removeCoupon = asyncHandler(async (req, res, next) => {
  const identifier = getCartIdentifier(req);
  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  await cart.removeCoupon();
  await cart.populate("items.product", "name slug price stock isActive");

  res.status(200).json({
    success: true,
    message: "Coupon removed",
    data: { cart },
  });
});

/**
 * @desc    Validate cart before checkout
 * @route   POST /api/cart/validate
 * @access  Public (with session) / Private
 */
export const validateCart = asyncHandler(async (req, res, next) => {
  const identifier = getCartIdentifier(req);
  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  if (cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  const issues = await cart.validateItems();

  res.status(200).json({
    success: issues.length === 0,
    data: {
      valid: issues.length === 0,
      issues,
      cart,
    },
  });
});

/**
 * @desc    Merge guest cart into user cart (after login)
 * @route   POST /api/cart/merge
 * @access  Private
 */
export const mergeCarts = asyncHandler(async (req, res, next) => {
  const { guestSessionId } = req.body;

  if (!guestSessionId) {
    return res.status(200).json({
      success: true,
      message: "No guest cart to merge",
    });
  }

  const guestCart = await Cart.findOne({
    sessionId: guestSessionId,
    status: "active",
  });

  if (!guestCart || guestCart.items.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No guest cart to merge",
    });
  }

  const userCart = await Cart.getOrCreateForUser(req.user._id);
  await userCart.mergeCart(guestCart);

  // Mark guest cart as merged
  guestCart.status = "merged";
  await guestCart.save();

  await userCart.populate("items.product", "name slug price stock isActive");

  res.status(200).json({
    success: true,
    message: "Carts merged successfully",
    data: { cart: userCart },
  });
});
```

---

### 3.6.7 Cart Routes

**`backend/src/routes/cartRoutes.js`:**

```javascript
import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  validateCart,
  mergeCarts,
} from "../controllers/cartController.js";
import { protect, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// All cart routes support both guest and authenticated users
router.use(optionalAuth);

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:itemId", updateCartItem);
router.delete("/items/:itemId", removeFromCart);
router.delete("/", clearCart);
router.post("/coupon", applyCoupon);
router.delete("/coupon", removeCoupon);
router.post("/validate", validateCart);

// Merge requires authentication
router.post("/merge", protect, mergeCarts);

export default router;
```

---

### 3.6.8 Optional Auth Middleware

Add to `backend/src/middleware/auth.js`:

```javascript
/**
 * Optional authentication
 * Populates req.user if token exists, but doesn't require it
 */
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
    // Silently continue without user
    next();
  }
};
```

---

### 3.6.9 Update Route Index

**Update `backend/src/routes/index.js`:**

```javascript
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

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

## ✅ Step 3.6 Checklist

- [ ] Cart Model created with:
  - [ ] Support for guest and authenticated users
  - [ ] Cart items with product snapshots
  - [ ] Variant selection (size, color)
  - [ ] Coupon/discount support
  - [ ] Automatic total calculations
  - [ ] Cart validation
  - [ ] Cart merging (guest → user)
  - [ ] Abandoned cart tracking
- [ ] Order Model created with:
  - [ ] Order number generation
  - [ ] Complete item snapshots
  - [ ] Shipping and billing addresses
  - [ ] Payment tracking
  - [ ] Order status lifecycle
  - [ ] Timeline/history tracking
  - [ ] Refund processing
- [ ] Cart Controller with:
  - [ ] Get/create cart
  - [ ] Add/update/remove items
  - [ ] Apply/remove coupons
  - [ ] Validate cart
  - [ ] Merge carts
- [ ] Cart Routes configured
- [ ] Optional auth middleware for guest support

---

## 🔜 Next: Step 3.7 - Checkout & Payment Integration

In the next step, we'll create:

- Checkout flow implementation
- Stripe payment integration
- Order confirmation and emails

---

_Say "3.7" or "next" to continue_

---

## 3.7 Checkout & Payment Integration (In-Depth)

This section provides a comprehensive guide to implementing a secure, production-ready checkout system with Stripe payment integration. We'll cover architecture decisions, security considerations, and best practices.

---

### 3.7.1 Payment Integration Architecture

#### Payment Gateway Options

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PAYMENT GATEWAY COMPARISON                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STRIPE (Our Choice)                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  Pros:                                                          │       │
│  │  • Excellent developer experience & documentation               │       │
│  │  • Built-in fraud detection (Radar)                             │       │
│  │  • PCI DSS Level 1 compliant (highest level)                    │       │
│  │  • Support for 135+ currencies                                  │       │
│  │  • Webhooks for real-time event notifications                   │       │
│  │  • Easy refunds and dispute management                          │       │
│  │  • Test mode with comprehensive test cards                      │       │
│  │                                                                 │       │
│  │  Cons:                                                          │       │
│  │  • 2.9% + $0.30 per transaction (US)                            │       │
│  │  • Account holds possible for high-risk businesses              │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  PAYPAL                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  Pros:                                                          │       │
│  │  • High consumer trust and recognition                          │       │
│  │  • Buyer protection increases conversion                        │       │
│  │  • Express checkout reduces friction                            │       │
│  │                                                                 │       │
│  │  Cons:                                                          │       │
│  │  • Complex API, less developer-friendly                         │       │
│  │  • Higher fees for international transactions                   │       │
│  │  • Account freezes more common                                  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  SQUARE                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  Best for: Businesses with both online and physical presence    │       │
│  │  • Unified online/in-store payments                             │       │
│  │  • Free POS software                                            │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Why Stripe for Fashion E-commerce:**

1. **Stripe Elements** - Pre-built UI components that handle PCI compliance
2. **Payment Intents API** - Modern, SCA-compliant payment flow
3. **Webhook reliability** - Essential for order fulfillment
4. **International support** - Multi-currency for global fashion brands

---

### 3.7.2 Checkout Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CHECKOUT FLOW                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STEP 1: CART REVIEW                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Validate all cart items (stock, price changes)               │       │
│  │  • Display itemized totals                                      │       │
│  │  • Apply/remove coupons                                         │       │
│  │  • Reserve inventory (optional)                                 │       │
│  └────────────────────────────────┬────────────────────────────────┘       │
│                                   │                                         │
│                                   ▼                                         │
│  STEP 2: SHIPPING INFORMATION                                               │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Collect shipping address                                     │       │
│  │  • Address validation (optional API)                            │       │
│  │  • Calculate shipping rates                                     │       │
│  │  • Calculate tax based on destination                           │       │
│  └────────────────────────────────┬────────────────────────────────┘       │
│                                   │                                         │
│                                   ▼                                         │
│  STEP 3: SHIPPING METHOD                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Display available shipping options                           │       │
│  │  • Show estimated delivery dates                                │       │
│  │  • Calculate final shipping cost                                │       │
│  └────────────────────────────────┬────────────────────────────────┘       │
│                                   │                                         │
│                                   ▼                                         │
│  STEP 4: PAYMENT                                                            │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Create Stripe PaymentIntent (server-side)                    │       │
│  │  • Display Stripe Elements form (client-side)                   │       │
│  │  • Handle 3D Secure authentication if required                  │       │
│  │  • Process payment                                              │       │
│  └────────────────────────────────┬────────────────────────────────┘       │
│                                   │                                         │
│                                   ▼                                         │
│  STEP 5: ORDER CONFIRMATION                                                 │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Create order record                                          │       │
│  │  • Decrement inventory                                          │       │
│  │  • Send confirmation email                                      │       │
│  │  • Clear cart                                                   │       │
│  │  • Display order confirmation                                   │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.7.3 Stripe Payment Flow (Payment Intents)

Understanding the Payment Intents flow is crucial:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STRIPE PAYMENT INTENTS FLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   CLIENT                          SERVER                         STRIPE    │
│      │                               │                              │       │
│      │  1. Initiate Checkout         │                              │       │
│      │──────────────────────────────►│                              │       │
│      │                               │                              │       │
│      │                               │  2. Create PaymentIntent     │       │
│      │                               │─────────────────────────────►│       │
│      │                               │                              │       │
│      │                               │  3. Return client_secret     │       │
│      │                               │◄─────────────────────────────│       │
│      │                               │                              │       │
│      │  4. Return client_secret      │                              │       │
│      │◄──────────────────────────────│                              │       │
│      │                               │                              │       │
│      │  5. Collect card with         │                              │       │
│      │     Stripe Elements           │                              │       │
│      │                               │                              │       │
│      │  6. confirmCardPayment()      │                              │       │
│      │─────────────────────────────────────────────────────────────►│       │
│      │                               │                              │       │
│      │                               │                   ┌──────────┴─────┐ │
│      │                               │                   │ 3D Secure      │ │
│      │                               │                   │ (if required)  │ │
│      │                               │                   └──────────┬─────┘ │
│      │                               │                              │       │
│      │  7. Payment Result            │                              │       │
│      │◄─────────────────────────────────────────────────────────────│       │
│      │                               │                              │       │
│      │                               │  8. Webhook: payment_intent  │       │
│      │                               │     .succeeded               │       │
│      │                               │◄─────────────────────────────│       │
│      │                               │                              │       │
│      │                               │  9. Fulfill Order            │       │
│      │                               │  (Create order, send email)  │       │
│      │                               │                              │       │
│      │  10. Order Confirmation       │                              │       │
│      │◄──────────────────────────────│                              │       │
│      │                               │                              │       │
└─────────────────────────────────────────────────────────────────────────────┘

KEY CONCEPTS:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  PaymentIntent: Represents a payment attempt                                │
│  ├── amount: Amount in smallest currency unit (cents)                       │
│  ├── currency: Three-letter ISO currency code                               │
│  ├── client_secret: Used by frontend to complete payment                    │
│  ├── status: requires_payment_method → requires_confirmation →              │
│  │           requires_action → processing → succeeded/failed                │
│  └── metadata: Custom data (order_id, user_id, etc.)                        │
│                                                                             │
│  Stripe Elements: Secure, pre-built UI components                           │
│  ├── Card Element: Single input for card number, expiry, CVC                │
│  ├── Payment Element: Supports multiple payment methods                     │
│  └── Handles PCI compliance - card data never touches your server           │
│                                                                             │
│  Webhooks: Server-to-server notifications                                   │
│  ├── payment_intent.succeeded: Payment completed                            │
│  ├── payment_intent.payment_failed: Payment failed                          │
│  └── charge.refunded: Refund processed                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.7.4 Security Best Practices

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PAYMENT SECURITY CHECKLIST                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✅ PCI DSS COMPLIANCE                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Use Stripe Elements (card data never hits your server)       │       │
│  │  • Never log card numbers, CVVs, or full card details           │       │
│  │  • Use HTTPS everywhere (TLS 1.2+)                              │       │
│  │  • Stripe handles PCI compliance at Level 1                     │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ✅ API KEY SECURITY                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • NEVER expose secret key (sk_*) to frontend                   │       │
│  │  • Only publishable key (pk_*) in client code                   │       │
│  │  • Rotate keys if compromised                                   │       │
│  │  • Use restricted keys for specific operations                  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ✅ WEBHOOK SECURITY                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Always verify webhook signatures                             │       │
│  │  • Use webhook signing secret (whsec_*)                         │       │
│  │  • Respond quickly (< 5 seconds)                                │       │
│  │  • Implement idempotency (handle duplicate events)              │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ✅ FRAUD PREVENTION                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Enable Stripe Radar for fraud detection                      │       │
│  │  • Verify billing address (AVS)                                 │       │
│  │  • Require CVC verification                                     │       │
│  │  • Implement velocity checks (too many orders)                  │       │
│  │  • Flag mismatched shipping/billing addresses                   │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ✅ DATA HANDLING                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Store only last 4 digits of card (from Stripe response)      │       │
│  │  • Never store CVV/CVC codes                                    │       │
│  │  • Encrypt sensitive data at rest                               │       │
│  │  • Implement proper access controls                             │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.7.5 Install Stripe Dependencies

```bash
# Backend
cd backend
npm install stripe

# Frontend
cd ../frontend
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

### 3.7.6 Environment Configuration

**Update `backend/.env`:**

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# Frontend URL (for redirects)
FRONTEND_URL=http://localhost:5173
```

**Update `frontend/.env`:**

```env
# Stripe Publishable Key (safe for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
```

---

### 3.7.7 Stripe Configuration

**`backend/src/config/stripe.js`:**

```javascript
import Stripe from "stripe";

// Initialize Stripe with API version pinning for stability
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Pin to specific version
  maxNetworkRetries: 2, // Automatic retry on network errors
  timeout: 30000, // 30 second timeout
});

export default stripe;

/**
 * Stripe Configuration Constants
 */
export const STRIPE_CONFIG = {
  // Payment Intent settings
  paymentIntent: {
    captureMethod: "automatic", // or 'manual' for auth-then-capture
    confirmationMethod: "automatic",
  },

  // Supported payment methods
  paymentMethods: ["card"],

  // Currency settings
  currency: "usd",

  // Metadata keys
  metadataKeys: {
    orderId: "order_id",
    userId: "user_id",
    cartId: "cart_id",
  },
};

/**
 * Format amount for Stripe (convert to cents)
 * Stripe expects amounts in smallest currency unit
 */
export const formatAmountForStripe = (amount, currency = "usd") => {
  // Zero-decimal currencies (JPY, KRW, etc.)
  const zeroDecimalCurrencies = [
    "bif",
    "clp",
    "djf",
    "gnf",
    "jpy",
    "kmf",
    "krw",
    "mga",
    "pyg",
    "rwf",
    "ugx",
    "vnd",
    "vuv",
    "xaf",
    "xof",
    "xpf",
  ];

  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return Math.round(amount);
  }

  return Math.round(amount * 100);
};

/**
 * Format amount from Stripe (convert from cents)
 */
export const formatAmountFromStripe = (amount, currency = "usd") => {
  const zeroDecimalCurrencies = [
    "bif",
    "clp",
    "djf",
    "gnf",
    "jpy",
    "kmf",
    "krw",
    "mga",
    "pyg",
    "rwf",
    "ugx",
    "vnd",
    "vuv",
    "xaf",
    "xof",
    "xpf",
  ];

  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return amount;
  }

  return amount / 100;
};
```

---

### 3.7.8 Checkout Service

**`backend/src/services/checkoutService.js`:**

```javascript
import stripe, { formatAmountForStripe, STRIPE_CONFIG } from "../config/stripe.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { AppError } from "../middleware/errorHandler.js";

/**
 * Checkout Service
 * Handles the complete checkout flow
 */
class CheckoutService {
  /**
   * Initialize checkout session
   * Validates cart and creates PaymentIntent
   */
  async initializeCheckout(cartId, userId, sessionId) {
    // Get cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    if (cart.items.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    // Validate cart items
    const validationIssues = await cart.validateItems();
    if (validationIssues.length > 0) {
      throw new AppError("Cart validation failed", 400, { issues: validationIssues });
    }

    // Recalculate totals to ensure accuracy
    await cart.calculateTotals();
    await cart.save();

    return {
      cart,
      subtotal: cart.subtotal,
      estimatedTotal: cart.estimatedTotal,
      itemCount: cart.totalItems,
    };
  }

  /**
   * Calculate shipping rates based on address
   */
  async calculateShipping(cartId, shippingAddress) {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    // Calculate shipping based on:
    // - Destination (country, state)
    // - Cart subtotal (free shipping threshold)
    // - Total weight (if tracked)
    // - Item count

    const shippingOptions = [];

    // Free shipping threshold
    const FREE_SHIPPING_THRESHOLD = 100;
    const qualifiesForFreeShipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD;

    // Standard shipping
    shippingOptions.push({
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      cost: qualifiesForFreeShipping ? 0 : 7.99,
      estimatedDays: { min: 5, max: 7 },
    });

    // Express shipping
    shippingOptions.push({
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      cost: 14.99,
      estimatedDays: { min: 2, max: 3 },
    });

    // Overnight shipping (US only)
    if (shippingAddress.country === "US") {
      shippingOptions.push({
        id: "overnight",
        name: "Overnight Shipping",
        description: "Next business day",
        cost: 29.99,
        estimatedDays: { min: 1, max: 1 },
      });
    }

    return {
      options: shippingOptions,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      qualifiesForFreeShipping,
      amountUntilFreeShipping: qualifiesForFreeShipping
        ? 0
        : FREE_SHIPPING_THRESHOLD - cart.subtotal,
    };
  }

  /**
   * Calculate tax based on shipping address
   */
  async calculateTax(cartId, shippingAddress) {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    // Simplified tax calculation
    // In production, use a tax service like TaxJar, Avalara, or Stripe Tax

    const US_STATE_TAX_RATES = {
      CA: 0.0725, // California
      NY: 0.08, // New York
      TX: 0.0625, // Texas
      FL: 0.06, // Florida
      WA: 0.065, // Washington
      // Add more states as needed
    };

    let taxRate = 0;
    let taxAmount = 0;

    if (shippingAddress.country === "US") {
      taxRate = US_STATE_TAX_RATES[shippingAddress.state] || 0;
      taxAmount = cart.subtotal * taxRate;
    }

    return {
      taxRate,
      taxAmount: Math.round(taxAmount * 100) / 100, // Round to 2 decimals
      taxDescription:
        taxRate > 0
          ? `${shippingAddress.state} Sales Tax (${(taxRate * 100).toFixed(2)}%)`
          : "No tax applicable",
    };
  }

  /**
   * Create Stripe PaymentIntent
   */
  async createPaymentIntent(checkoutData) {
    const { cartId, userId, shippingAddress, shippingMethod, shippingCost, taxAmount } =
      checkoutData;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    // Calculate final total
    const subtotal = cart.subtotal;
    const discount = cart.coupon?.discountAmount || 0;
    const total = subtotal - discount + shippingCost + taxAmount;

    if (total <= 0) {
      throw new AppError("Invalid order total", 400);
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(total, STRIPE_CONFIG.currency),
      currency: STRIPE_CONFIG.currency,
      payment_method_types: STRIPE_CONFIG.paymentMethods,
      capture_method: STRIPE_CONFIG.paymentIntent.captureMethod,
      metadata: {
        [STRIPE_CONFIG.metadataKeys.cartId]: cartId.toString(),
        [STRIPE_CONFIG.metadataKeys.userId]: userId?.toString() || "guest",
        shipping_method: shippingMethod,
      },
      // Shipping information for Radar fraud detection
      shipping: {
        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        address: {
          line1: shippingAddress.addressLine1,
          line2: shippingAddress.addressLine2 || "",
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.postalCode,
          country: shippingAddress.country,
        },
        phone: shippingAddress.phone,
      },
      // Receipt email (optional)
      receipt_email: shippingAddress.email,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: total,
    };
  }

  /**
   * Update PaymentIntent (e.g., when shipping method changes)
   */
  async updatePaymentIntent(paymentIntentId, updates) {
    const { shippingCost, taxAmount, cartId } = updates;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    const subtotal = cart.subtotal;
    const discount = cart.coupon?.discountAmount || 0;
    const total = subtotal - discount + (shippingCost || 0) + (taxAmount || 0);

    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount: formatAmountForStripe(total, STRIPE_CONFIG.currency),
    });

    return {
      clientSecret: paymentIntent.client_secret,
      amount: total,
    };
  }

  /**
   * Complete order after successful payment
   */
  async completeOrder(paymentIntentId, orderData) {
    // Retrieve PaymentIntent to verify status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      throw new AppError("Payment not completed", 400);
    }

    const cartId = paymentIntent.metadata[STRIPE_CONFIG.metadataKeys.cartId];
    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    // Create order from cart
    const order = await Order.createFromCart(cart, {
      ...orderData,
      paymentMethod: "stripe",
    });

    // Update order with payment info
    order.payment = {
      method: "stripe",
      status: "captured",
      transactionId: paymentIntent.id,
      gateway: "stripe",
      gatewayResponse: {
        paymentIntentId: paymentIntent.id,
        chargeId: paymentIntent.latest_charge,
      },
      paidAt: new Date(),
      cardLast4: paymentIntent.payment_method_details?.card?.last4,
      cardBrand: paymentIntent.payment_method_details?.card?.brand,
      amount: orderData.total,
      currency: paymentIntent.currency,
    };

    // Update order status
    order.status = "confirmed";
    order.confirmedAt = new Date();
    order.addTimelineEvent("confirmed", "Payment received via Stripe", "system");

    await order.save();

    // Decrement product inventory
    await this.decrementInventory(cart.items);

    return order;
  }

  /**
   * Decrement inventory for ordered items
   */
  async decrementInventory(items) {
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stock: -item.quantity,
          "inventory.quantity": -item.quantity,
        },
      });

      // Update size-specific stock if applicable
      if (item.selectedSize) {
        await Product.updateOne(
          { _id: item.product, "sizes.name": item.selectedSize },
          { $inc: { "sizes.$.stock": -item.quantity } }
        );
      }
    }
  }

  /**
   * Process refund
   */
  async processRefund(orderId, amount, reason) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (!order.payment?.transactionId) {
      throw new AppError("No payment transaction found", 400);
    }

    // Create Stripe refund
    const refund = await stripe.refunds.create({
      payment_intent: order.payment.transactionId,
      amount: formatAmountForStripe(amount, order.pricing.currency),
      reason: reason === "customer_request" ? "requested_by_customer" : "requested_by_customer",
      metadata: {
        order_id: orderId.toString(),
        reason: reason,
      },
    });

    // Update order with refund info
    await order.processRefund(amount, reason, refund.id);

    return {
      refundId: refund.id,
      amount: amount,
      status: refund.status,
    };
  }
}

export default new CheckoutService();
```

---

### 3.7.9 Checkout Controller

**`backend/src/controllers/checkoutController.js`:**

```javascript
import checkoutService from "../services/checkoutService.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Initialize checkout
 * @route   POST /api/checkout/initialize
 * @access  Public (with session) / Private
 */
export const initializeCheckout = asyncHandler(async (req, res, next) => {
  const identifier = req.user ? { user: req.user._id } : { sessionId: req.cookies.cartSession };

  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const checkoutData = await checkoutService.initializeCheckout(
    cart._id,
    req.user?._id,
    req.cookies.cartSession
  );

  res.status(200).json({
    success: true,
    data: checkoutData,
  });
});

/**
 * @desc    Calculate shipping rates
 * @route   POST /api/checkout/shipping-rates
 * @access  Public (with session) / Private
 */
export const getShippingRates = asyncHandler(async (req, res, next) => {
  const { shippingAddress } = req.body;

  if (!shippingAddress) {
    return next(new AppError("Shipping address is required", 400));
  }

  const identifier = req.user ? { user: req.user._id } : { sessionId: req.cookies.cartSession };

  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const shippingData = await checkoutService.calculateShipping(cart._id, shippingAddress);

  res.status(200).json({
    success: true,
    data: shippingData,
  });
});

/**
 * @desc    Calculate tax
 * @route   POST /api/checkout/calculate-tax
 * @access  Public (with session) / Private
 */
export const calculateTax = asyncHandler(async (req, res, next) => {
  const { shippingAddress } = req.body;

  if (!shippingAddress) {
    return next(new AppError("Shipping address is required", 400));
  }

  const identifier = req.user ? { user: req.user._id } : { sessionId: req.cookies.cartSession };

  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const taxData = await checkoutService.calculateTax(cart._id, shippingAddress);

  res.status(200).json({
    success: true,
    data: taxData,
  });
});

/**
 * @desc    Create PaymentIntent
 * @route   POST /api/checkout/create-payment-intent
 * @access  Public (with session) / Private
 */
export const createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { shippingAddress, shippingMethod, shippingCost, taxAmount } = req.body;

  // Validation
  if (!shippingAddress) {
    return next(new AppError("Shipping address is required", 400));
  }

  if (!shippingMethod) {
    return next(new AppError("Shipping method is required", 400));
  }

  const identifier = req.user ? { user: req.user._id } : { sessionId: req.cookies.cartSession };

  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const paymentData = await checkoutService.createPaymentIntent({
    cartId: cart._id,
    userId: req.user?._id,
    shippingAddress,
    shippingMethod,
    shippingCost: shippingCost || 0,
    taxAmount: taxAmount || 0,
  });

  res.status(200).json({
    success: true,
    data: paymentData,
  });
});

/**
 * @desc    Update PaymentIntent
 * @route   PATCH /api/checkout/payment-intent/:paymentIntentId
 * @access  Public (with session) / Private
 */
export const updatePaymentIntent = asyncHandler(async (req, res, next) => {
  const { paymentIntentId } = req.params;
  const { shippingCost, taxAmount } = req.body;

  const identifier = req.user ? { user: req.user._id } : { sessionId: req.cookies.cartSession };

  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const paymentData = await checkoutService.updatePaymentIntent(paymentIntentId, {
    shippingCost,
    taxAmount,
    cartId: cart._id,
  });

  res.status(200).json({
    success: true,
    data: paymentData,
  });
});

/**
 * @desc    Complete order after payment
 * @route   POST /api/checkout/complete
 * @access  Public (with session) / Private
 */
export const completeOrder = asyncHandler(async (req, res, next) => {
  const {
    paymentIntentId,
    shippingAddress,
    billingAddress,
    sameAsShipping,
    shippingMethod,
    shippingCost,
    taxAmount,
    customerNotes,
    isGift,
    giftMessage,
  } = req.body;

  if (!paymentIntentId) {
    return next(new AppError("Payment intent ID is required", 400));
  }

  const identifier = req.user ? { user: req.user._id } : { sessionId: req.cookies.cartSession };

  const cart = await Cart.findOne({ ...identifier, status: "active" });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Calculate final total
  const subtotal = cart.subtotal;
  const discount = cart.coupon?.discountAmount || 0;
  const total = subtotal - discount + shippingCost + taxAmount;

  const order = await checkoutService.completeOrder(paymentIntentId, {
    shippingAddress,
    billingAddress: sameAsShipping ? shippingAddress : billingAddress,
    sameAsShipping,
    shippingMethod,
    shippingCost,
    tax: taxAmount,
    total,
    customerNotes,
    isGift,
    giftMessage,
    guestEmail: shippingAddress.email,
    source: "web",
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: {
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.pricing.total,
        estimatedDelivery: order.shipping.estimatedDelivery,
      },
    },
  });
});

/**
 * @desc    Get order by order number (for confirmation page)
 * @route   GET /api/checkout/order/:orderNumber
 * @access  Public (with email verification) / Private
 */
export const getOrderByNumber = asyncHandler(async (req, res, next) => {
  const { orderNumber } = req.params;
  const { email } = req.query;

  const query = { orderNumber };

  // For authenticated users, verify ownership
  if (req.user) {
    query.user = req.user._id;
  } else if (email) {
    // For guests, verify email matches
    query["customerSnapshot.email"] = email.toLowerCase();
  } else {
    return next(new AppError("Authentication required", 401));
  }

  const order = await Order.findOne(query).select("-internalNotes -ipAddress -userAgent");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: { order },
  });
});
```

---

### 3.7.10 Stripe Webhook Handler

**`backend/src/controllers/webhookController.js`:**

```javascript
import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import { sendOrderConfirmationEmail } from "../services/emailService.js";

/**
 * Stripe Webhook Handler
 * Processes events from Stripe
 *
 * IMPORTANT: This endpoint must receive raw body (not parsed JSON)
 */
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object);
        break;

      case "charge.refunded":
        await handleChargeRefunded(event.data.object);
        break;

      case "charge.dispute.created":
        await handleDisputeCreated(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error(`Error handling webhook event ${event.type}:`, err);
    // Return 200 to acknowledge receipt (Stripe will retry on 4xx/5xx)
    // Log the error for investigation
    res.status(200).json({ received: true, error: err.message });
  }
};

/**
 * Handle successful payment
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log("Payment succeeded:", paymentIntent.id);

  // Find order by payment intent ID
  const order = await Order.findOne({
    "payment.transactionId": paymentIntent.id,
  });

  if (order) {
    // Order already created (via completeOrder endpoint)
    // Just ensure status is correct
    if (order.status === "pending") {
      order.status = "confirmed";
      order.confirmedAt = new Date();
      order.addTimelineEvent("confirmed", "Payment confirmed via webhook", "system");
      await order.save();
    }

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }
  } else {
    // Order not yet created - this can happen if webhook arrives
    // before completeOrder endpoint finishes
    // Log for monitoring but don't fail
    console.log("Order not found for PaymentIntent:", paymentIntent.id);
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentIntentFailed(paymentIntent) {
  console.log("Payment failed:", paymentIntent.id);

  const order = await Order.findOne({
    "payment.transactionId": paymentIntent.id,
  });

  if (order) {
    order.status = "failed";
    order.payment.status = "failed";
    order.addTimelineEvent(
      "failed",
      `Payment failed: ${paymentIntent.last_payment_error?.message || "Unknown error"}`,
      "system"
    );
    await order.save();
  }
}

/**
 * Handle refund
 */
async function handleChargeRefunded(charge) {
  console.log("Charge refunded:", charge.id);

  const order = await Order.findOne({
    "payment.gatewayResponse.chargeId": charge.id,
  });

  if (order) {
    const refundAmount = charge.amount_refunded / 100; // Convert from cents

    // Update if not already updated
    if (order.payment.refundedAmount < refundAmount) {
      order.payment.refundedAmount = refundAmount;

      if (charge.refunded) {
        order.payment.status = "refunded";
        order.status = "refunded";
      } else {
        order.payment.status = "partial_refund";
      }

      order.addTimelineEvent("refund", `Refund processed: $${refundAmount}`, "system");

      await order.save();
    }
  }
}

/**
 * Handle dispute (chargeback)
 */
async function handleDisputeCreated(dispute) {
  console.log("Dispute created:", dispute.id);

  // Find order by charge ID
  const order = await Order.findOne({
    "payment.gatewayResponse.chargeId": dispute.charge,
  });

  if (order) {
    order.addTimelineEvent("dispute", `Dispute opened: ${dispute.reason}`, "system", {
      disputeId: dispute.id,
      amount: dispute.amount / 100,
    });

    // Add internal note for admin attention
    order.internalNotes.push({
      note: `DISPUTE ALERT: ${dispute.reason}. Amount: $${dispute.amount / 100}. Dispute ID: ${
        dispute.id
      }`,
      createdAt: new Date(),
    });

    await order.save();

    // TODO: Send alert to admin
  }
}
```

---

### 3.7.11 Checkout Routes

**`backend/src/routes/checkoutRoutes.js`:**

```javascript
import express from "express";
import {
  initializeCheckout,
  getShippingRates,
  calculateTax,
  createPaymentIntent,
  updatePaymentIntent,
  completeOrder,
  getOrderByNumber,
} from "../controllers/checkoutController.js";
import { handleStripeWebhook } from "../controllers/webhookController.js";
import { optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Stripe webhook - MUST be before JSON body parser
// Note: This route needs raw body, configured in server.js
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

// All other routes use optional auth (guests can checkout)
router.use(optionalAuth);

router.post("/initialize", initializeCheckout);
router.post("/shipping-rates", getShippingRates);
router.post("/calculate-tax", calculateTax);
router.post("/create-payment-intent", createPaymentIntent);
router.patch("/payment-intent/:paymentIntentId", updatePaymentIntent);
router.post("/complete", completeOrder);
router.get("/order/:orderNumber", getOrderByNumber);

export default router;
```

---

### 3.7.12 Update Server for Webhook

**Update `backend/src/server.js`** to handle raw body for webhooks:

```javascript
// IMPORTANT: Webhook route must be before JSON body parser
// Stripe requires raw body for signature verification
app.use("/api/checkout/webhook", express.raw({ type: "application/json" }));

// Then apply JSON parser to all other routes
app.use(express.json({ limit: "10kb" }));
```

---

### 3.7.13 Update Route Index

**Update `backend/src/routes/index.js`:**

```javascript
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import checkoutRoutes from "./checkoutRoutes.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/checkout", checkoutRoutes);

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

### 3.7.14 Email Service (Placeholder)

**`backend/src/services/emailService.js`:**

```javascript
/**
 * Email Service
 * Placeholder for email functionality
 * In production, use services like:
 * - SendGrid
 * - Mailgun
 * - AWS SES
 * - Postmark
 */

/**
 * Send order confirmation email
 */
export const sendOrderConfirmationEmail = async (order) => {
  // TODO: Implement email sending
  console.log(`📧 Order confirmation email would be sent to: ${order.customerSnapshot.email}`);
  console.log(`   Order: ${order.orderNumber}`);
  console.log(`   Total: $${order.pricing.total}`);

  // Example with SendGrid:
  // const msg = {
  //   to: order.customerSnapshot.email,
  //   from: 'orders@fashionstore.com',
  //   templateId: 'd-xxxxxxxxxxxxx',
  //   dynamicTemplateData: {
  //     orderNumber: order.orderNumber,
  //     items: order.items,
  //     total: order.pricing.total,
  //     shippingAddress: order.shippingAddress,
  //   },
  // };
  // await sgMail.send(msg);

  return true;
};

/**
 * Send shipping confirmation email
 */
export const sendShippingConfirmationEmail = async (order) => {
  console.log(`📧 Shipping confirmation email would be sent to: ${order.customerSnapshot.email}`);
  console.log(`   Order: ${order.orderNumber}`);
  console.log(`   Tracking: ${order.shipping.trackingNumber}`);

  return true;
};

/**
 * Send order cancelled email
 */
export const sendOrderCancelledEmail = async (order, reason) => {
  console.log(`📧 Order cancelled email would be sent to: ${order.customerSnapshot.email}`);
  console.log(`   Order: ${order.orderNumber}`);
  console.log(`   Reason: ${reason}`);

  return true;
};
```

---

### 3.7.15 Stripe Test Cards

For testing, use these Stripe test card numbers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STRIPE TEST CARDS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SUCCESSFUL PAYMENTS:                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  4242 4242 4242 4242  │  Visa                │  Succeeds        │       │
│  │  5555 5555 5555 4444  │  Mastercard          │  Succeeds        │       │
│  │  3782 822463 10005    │  American Express    │  Succeeds        │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  3D SECURE AUTHENTICATION:                                                  │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  4000 0025 0000 3155  │  Requires authentication               │       │
│  │  4000 0000 0000 3220  │  3D Secure 2 authentication            │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  DECLINED PAYMENTS:                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  4000 0000 0000 0002  │  Card declined                         │       │
│  │  4000 0000 0000 9995  │  Insufficient funds                    │       │
│  │  4000 0000 0000 9987  │  Lost card                             │       │
│  │  4000 0000 0000 0069  │  Expired card                          │       │
│  │  4000 0000 0000 0127  │  Incorrect CVC                         │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  Use any future expiry date (e.g., 12/34)                                   │
│  Use any 3-digit CVC (or 4-digit for Amex)                                  │
│  Use any 5-digit ZIP code                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.7.16 Testing Webhooks Locally

Use Stripe CLI to forward webhooks to your local server:

```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Windows: scoop install stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5000/api/checkout/webhook

# The CLI will output a webhook signing secret (whsec_...)
# Use this in your .env file for local development

# In another terminal, trigger test events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger charge.refunded
```

---

## ✅ Step 3.7 Checklist

- [ ] Stripe dependencies installed (stripe, @stripe/stripe-js, @stripe/react-stripe-js)
- [ ] Environment variables configured
- [ ] Stripe configuration module created with:
  - [ ] API initialization
  - [ ] Amount formatting helpers
- [ ] Checkout Service with:
  - [ ] Initialize checkout
  - [ ] Calculate shipping rates
  - [ ] Calculate tax
  - [ ] Create/update PaymentIntent
  - [ ] Complete order
  - [ ] Process refunds
  - [ ] Inventory decrement
- [ ] Checkout Controller with all endpoints
- [ ] Webhook handler with:
  - [ ] Signature verification
  - [ ] Payment success handling
  - [ ] Payment failure handling
  - [ ] Refund handling
  - [ ] Dispute handling
- [ ] Checkout Routes configured
- [ ] Server updated for raw webhook body
- [ ] Email service placeholder created

---

## 🔜 Next: Step 3.8 - Order Management API

In the next step, we'll create:

- Order listing and details endpoints
- Order status updates
- Admin order management
- Order history for users

---

_Say "3.8" or "next" to continue_

---

## 3.8 Order Management API (In-Depth)

This section provides a comprehensive guide to building a robust order management system. We'll cover order lifecycle, access control patterns, admin workflows, and real-world considerations for fashion e-commerce.

---

### 3.8.1 Order Management Architecture

#### System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ORDER MANAGEMENT SYSTEM                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                      USER PORTAL                                │       │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐    │       │
│  │  │  Order    │  │  Order    │  │  Track    │  │  Request  │    │       │
│  │  │  History  │  │  Details  │  │  Shipment │  │  Return   │    │       │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘    │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                     ORDER SERVICE                               │       │
│  │  ┌───────────────────────────────────────────────────────────┐  │       │
│  │  │  • Create Order (from checkout)                           │  │       │
│  │  │  • Retrieve Orders (with filtering/pagination)            │  │       │
│  │  │  • Update Order Status                                    │  │       │
│  │  │  • Process Cancellations                                  │  │       │
│  │  │  • Handle Returns/Refunds                                 │  │       │
│  │  │  • Generate Invoices                                      │  │       │
│  │  └───────────────────────────────────────────────────────────┘  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                      ADMIN PORTAL                               │       │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐    │       │
│  │  │  View All │  │  Update   │  │  Process  │  │  Analytics│    │       │
│  │  │  Orders   │  │  Status   │  │  Refunds  │  │  & Reports│    │       │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘    │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.8.2 Access Control Matrix

Understanding who can do what with orders is critical:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ORDER ACCESS CONTROL MATRIX                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ACTION                      │ GUEST │ USER  │ ADMIN │ SUPER_ADMIN         │
│  ────────────────────────────┼───────┼───────┼───────┼─────────────        │
│  View own orders             │  ✓*   │   ✓   │   ✓   │     ✓               │
│  View order details          │  ✓*   │   ✓   │   ✓   │     ✓               │
│  Cancel own order            │  ✓*   │   ✓   │   ✓   │     ✓               │
│  Request return              │   ✗   │   ✓   │   ✓   │     ✓               │
│  ────────────────────────────┼───────┼───────┼───────┼─────────────        │
│  View all orders             │   ✗   │   ✗   │   ✓   │     ✓               │
│  Update order status         │   ✗   │   ✗   │   ✓   │     ✓               │
│  Add tracking number         │   ✗   │   ✗   │   ✓   │     ✓               │
│  Process refunds             │   ✗   │   ✗   │   ✓   │     ✓               │
│  Delete order                │   ✗   │   ✗   │   ✗   │     ✓               │
│  View order analytics        │   ✗   │   ✗   │   ✓   │     ✓               │
│  Export orders               │   ✗   │   ✗   │   ✓   │     ✓               │
│  ────────────────────────────┼───────┼───────┼───────┼─────────────        │
│                                                                             │
│  * Guest requires order number + email verification                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.8.3 Order Status Transitions (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ORDER STATUS STATE MACHINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                           ┌──────────────┐                                  │
│                           │   PENDING    │                                  │
│                           │ (awaiting    │                                  │
│                           │  payment)    │                                  │
│                           └──────┬───────┘                                  │
│                     ┌────────────┼────────────┐                             │
│                     │            │            │                             │
│                     ▼            ▼            ▼                             │
│              ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│              │ CANCELLED│ │ CONFIRMED│ │  FAILED  │                         │
│              │(by user) │ │(payment  │ │(payment  │                         │
│              │          │ │ received)│ │ failed)  │                         │
│              └──────────┘ └────┬─────┘ └──────────┘                         │
│                                │                                            │
│                     ┌──────────┴──────────┐                                 │
│                     │                     │                                 │
│                     ▼                     ▼                                 │
│              ┌──────────┐          ┌──────────┐                             │
│              │PROCESSING│          │ CANCELLED│                             │
│              │(preparing│          │(by admin │                             │
│              │ order)   │          │ or stock)│                             │
│              └────┬─────┘          └──────────┘                             │
│                   │                                                         │
│                   ▼                                                         │
│              ┌──────────┐                                                   │
│              │ SHIPPED  │◄─────────────────────────────┐                    │
│              │(in       │                              │                    │
│              │ transit) │                              │                    │
│              └────┬─────┘                              │                    │
│                   │                                    │                    │
│                   ▼                                    │                    │
│              ┌──────────┐     ┌──────────┐     ┌──────────┐                 │
│              │DELIVERED │────►│COMPLETED │     │ RETURNED │                 │
│              │          │     │(finalized│     │(items    │                 │
│              │          │     │ after 14 │     │ returned)│                 │
│              │          │     │ days)    │     │          │                 │
│              └────┬─────┘     └──────────┘     └──────────┘                 │
│                   │                  │               ▲                      │
│                   │                  │               │                      │
│                   └──────────────────┴───────────────┘                      │
│                         (return requested)                                  │
│                                                                             │
│  ALLOWED TRANSITIONS:                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  pending    → confirmed, cancelled, failed                      │       │
│  │  confirmed  → processing, cancelled, refunded                   │       │
│  │  processing → shipped, cancelled                                │       │
│  │  shipped    → delivered, returned                               │       │
│  │  delivered  → completed, returned                               │       │
│  │  completed  → returned (within return window)                   │       │
│  │  cancelled  → (terminal state)                                  │       │
│  │  refunded   → (terminal state)                                  │       │
│  │  failed     → pending (retry payment)                           │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.8.4 Order Query Patterns

Understanding how orders are queried helps design efficient APIs:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COMMON ORDER QUERY PATTERNS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USER QUERIES:                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • My orders (paginated, newest first)                          │       │
│  │  • Order by ID/number (single order details)                    │       │
│  │  • Orders by status (e.g., "show my shipped orders")            │       │
│  │  • Orders in date range                                         │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ADMIN QUERIES:                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • All orders (with filters)                                    │       │
│  │  • Orders by status (for workflow: "pending orders")            │       │
│  │  • Orders by customer (support lookup)                          │       │
│  │  • Orders by date range (reporting)                             │       │
│  │  • Orders by payment status                                     │       │
│  │  • Orders containing specific product                           │       │
│  │  • High-value orders (fraud review)                             │       │
│  │  • Problem orders (disputes, returns)                           │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ANALYTICS QUERIES:                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  • Total revenue (daily/weekly/monthly)                         │       │
│  │  • Average order value                                          │       │
│  │  • Orders by product category                                   │       │
│  │  • Top selling products                                         │       │
│  │  • Conversion funnel (cart → checkout → order)                  │       │
│  │  • Return rate by product                                       │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.8.5 Order Controller (User)

**`backend/src/controllers/orderController.js`:**

```javascript
import Order from "../models/Order.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get current user's orders
 * @route   GET /api/orders
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    startDate,
    endDate,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  // Build query
  const query = { user: req.user._id };

  // Status filter
  if (status) {
    query.status = status;
  }

  // Date range filter
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  // Execute query
  const [orders, totalCount] = await Promise.all([
    Order.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-internalNotes -ipAddress -userAgent"),
    Order.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalOrders: totalCount,
        hasMore: skip + orders.length < totalCount,
      },
    },
  });
});

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:orderId
 * @access  Private
 */
export const getOrderById = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
  }).select("-internalNotes -ipAddress -userAgent");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: { order },
  });
});

/**
 * @desc    Get order by order number (for guests with email verification)
 * @route   GET /api/orders/track/:orderNumber
 * @access  Public
 */
export const trackOrder = asyncHandler(async (req, res, next) => {
  const { orderNumber } = req.params;
  const { email } = req.query;

  if (!email) {
    return next(new AppError("Email is required to track order", 400));
  }

  const order = await Order.findOne({
    orderNumber: orderNumber.toUpperCase(),
    $or: [{ "customerSnapshot.email": email.toLowerCase() }, { guestEmail: email.toLowerCase() }],
  }).select(
    "orderNumber status items.productSnapshot items.quantity pricing shipping.trackingNumber shipping.carrier shipping.estimatedDelivery timeline createdAt"
  );

  if (!order) {
    return next(new AppError("Order not found. Please check your order number and email.", 404));
  }

  res.status(200).json({
    success: true,
    data: { order },
  });
});

/**
 * @desc    Cancel order (user)
 * @route   POST /api/orders/:orderId/cancel
 * @access  Private
 */
export const cancelOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Check if order can be cancelled
  if (!order.canCancel) {
    return next(new AppError(`Order cannot be cancelled. Current status: ${order.status}`, 400));
  }

  // Update order status
  await order.updateStatus("cancelled", "user", req.user._id);

  // Add cancellation reason to timeline
  order.addTimelineEvent("cancellation_reason", reason || "Cancelled by customer", "user", {
    userId: req.user._id,
  });
  await order.save();

  // TODO: Process refund if payment was captured
  // TODO: Restore inventory

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: { order },
  });
});

/**
 * @desc    Request return for delivered order
 * @route   POST /api/orders/:orderId/return
 * @access  Private
 */
export const requestReturn = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { items, reason, comments } = req.body;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Check if return is allowed
  if (!["delivered", "completed"].includes(order.status)) {
    return next(new AppError("Return can only be requested for delivered orders", 400));
  }

  // Check return window (14 days from delivery)
  const returnWindowDays = 14;
  const deliveryDate = order.deliveredAt || order.createdAt;
  const returnDeadline = new Date(deliveryDate);
  returnDeadline.setDate(returnDeadline.getDate() + returnWindowDays);

  if (new Date() > returnDeadline) {
    return next(
      new AppError(
        `Return window has expired. Returns must be requested within ${returnWindowDays} days of delivery.`,
        400
      )
    );
  }

  // Validate items to return
  if (!items || items.length === 0) {
    return next(new AppError("Please specify items to return", 400));
  }

  // Create return request (could be a separate collection in larger systems)
  const returnRequest = {
    items: items.map((item) => ({
      orderItemId: item.orderItemId,
      quantity: item.quantity,
      reason: item.reason || reason,
    })),
    reason,
    comments,
    requestedAt: new Date(),
    status: "pending",
  };

  // Add to order
  if (!order.returnRequests) {
    order.returnRequests = [];
  }
  order.returnRequests.push(returnRequest);

  order.addTimelineEvent(
    "return_requested",
    `Return requested for ${items.length} item(s). Reason: ${reason}`,
    "user",
    { returnRequest }
  );

  await order.save();

  res.status(200).json({
    success: true,
    message: "Return request submitted successfully",
    data: {
      returnRequest,
      instructions: "You will receive an email with return shipping instructions within 24 hours.",
    },
  });
});

/**
 * @desc    Get order invoice
 * @route   GET /api/orders/:orderId/invoice
 * @access  Private
 */
export const getOrderInvoice = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Generate invoice data
  const invoice = {
    invoiceNumber: `INV-${order.orderNumber}`,
    orderNumber: order.orderNumber,
    orderDate: order.createdAt,
    customer: {
      name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      email: order.customerSnapshot.email,
      address: order.shippingAddress,
    },
    items: order.items.map((item) => ({
      name: item.productSnapshot.name,
      sku: item.productSnapshot.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.lineTotal,
      variant: item.selectedSize ? `Size: ${item.selectedSize}` : null,
    })),
    pricing: order.pricing,
    payment: {
      method: order.payment.method,
      status: order.payment.status,
      paidAt: order.payment.paidAt,
      last4: order.payment.cardLast4,
    },
  };

  res.status(200).json({
    success: true,
    data: { invoice },
  });
});
```

---

### 3.8.6 Order Controller (Admin)

**`backend/src/controllers/adminOrderController.js`:**

```javascript
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import checkoutService from "../services/checkoutService.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/admin/orders
 * @access  Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status,
    paymentStatus,
    fulfillmentStatus,
    startDate,
    endDate,
    search,
    minTotal,
    maxTotal,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  // Build query
  const query = {};

  // Status filters
  if (status) {
    query.status = { $in: status.split(",") };
  }

  if (paymentStatus) {
    query["payment.status"] = paymentStatus;
  }

  if (fulfillmentStatus) {
    query.fulfillmentStatus = fulfillmentStatus;
  }

  // Date range
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  // Price range
  if (minTotal || maxTotal) {
    query["pricing.total"] = {};
    if (minTotal) query["pricing.total"].$gte = parseFloat(minTotal);
    if (maxTotal) query["pricing.total"].$lte = parseFloat(maxTotal);
  }

  // Search (order number, customer email, customer name)
  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: "i" } },
      { "customerSnapshot.email": { $regex: search, $options: "i" } },
      { "customerSnapshot.firstName": { $regex: search, $options: "i" } },
      { "customerSnapshot.lastName": { $regex: search, $options: "i" } },
    ];
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  // Execute query
  const [orders, totalCount] = await Promise.all([
    Order.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("user", "email firstName lastName"),
    Order.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalOrders: totalCount,
        hasMore: skip + orders.length < totalCount,
      },
    },
  });
});

/**
 * @desc    Get single order details (admin)
 * @route   GET /api/admin/orders/:orderId
 * @access  Admin
 */
export const getOrderDetails = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId)
    .populate("user", "email firstName lastName phone")
    .populate("items.product", "name slug sku stock");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: { order },
  });
});

/**
 * @desc    Update order status (admin)
 * @route   PATCH /api/admin/orders/:orderId/status
 * @access  Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { status, note } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  try {
    await order.updateStatus(status, "admin", req.user._id);

    // Add admin note if provided
    if (note) {
      order.internalNotes.push({
        note: `Status changed to ${status}: ${note}`,
        createdBy: req.user._id,
        createdAt: new Date(),
      });
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: { order },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
});

/**
 * @desc    Add tracking information (admin)
 * @route   PATCH /api/admin/orders/:orderId/tracking
 * @access  Admin
 */
export const addTrackingInfo = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { trackingNumber, carrier, trackingUrl, notifyCustomer = true } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Update shipping info
  order.shipping.trackingNumber = trackingNumber;
  order.shipping.carrier = carrier;
  order.shipping.trackingUrl = trackingUrl || generateTrackingUrl(carrier, trackingNumber);
  order.shipping.shippedAt = new Date();

  // Update status to shipped if not already
  if (order.status === "processing") {
    await order.updateStatus("shipped", "admin", req.user._id);
  }

  order.addTimelineEvent(
    "tracking_added",
    `Tracking number added: ${trackingNumber} (${carrier})`,
    "admin",
    { trackingNumber, carrier }
  );

  await order.save();

  // TODO: Send shipping notification email if notifyCustomer is true

  res.status(200).json({
    success: true,
    message: "Tracking information added",
    data: { order },
  });
});

/**
 * Generate tracking URL based on carrier
 */
function generateTrackingUrl(carrier, trackingNumber) {
  const carriers = {
    ups: `https://www.ups.com/track?tracknum=${trackingNumber}`,
    fedex: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
    usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
    dhl: `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
  };

  return carriers[carrier.toLowerCase()] || null;
}

/**
 * @desc    Process refund (admin)
 * @route   POST /api/admin/orders/:orderId/refund
 * @access  Admin
 */
export const processRefund = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { amount, reason, restoreInventory = true } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  if (!order.canRefund) {
    return next(new AppError("This order cannot be refunded", 400));
  }

  // Calculate max refundable amount
  const maxRefund = order.pricing.total - order.payment.refundedAmount;
  if (amount > maxRefund) {
    return next(new AppError(`Maximum refund amount is $${maxRefund.toFixed(2)}`, 400));
  }

  try {
    // Process Stripe refund
    const refundResult = await checkoutService.processRefund(orderId, amount, reason);

    // Restore inventory if requested
    if (restoreInventory) {
      await restoreOrderInventory(order);
    }

    // Add admin note
    order.internalNotes.push({
      note: `Refund of $${amount} processed. Reason: ${reason}. Inventory restored: ${restoreInventory}`,
      createdBy: req.user._id,
      createdAt: new Date(),
    });
    await order.save();

    res.status(200).json({
      success: true,
      message: "Refund processed successfully",
      data: {
        refund: refundResult,
        order,
      },
    });
  } catch (error) {
    return next(new AppError(`Refund failed: ${error.message}`, 400));
  }
});

/**
 * Restore inventory for order items
 */
async function restoreOrderInventory(order) {
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        stock: item.quantity,
        "inventory.quantity": item.quantity,
      },
    });

    if (item.selectedSize) {
      await Product.updateOne(
        { _id: item.product, "sizes.name": item.selectedSize },
        { $inc: { "sizes.$.stock": item.quantity } }
      );
    }
  }
}

/**
 * @desc    Add internal note to order (admin)
 * @route   POST /api/admin/orders/:orderId/notes
 * @access  Admin
 */
export const addInternalNote = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { note } = req.body;

  if (!note || note.trim().length === 0) {
    return next(new AppError("Note content is required", 400));
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  order.internalNotes.push({
    note: note.trim(),
    createdBy: req.user._id,
    createdAt: new Date(),
  });

  await order.save();

  res.status(200).json({
    success: true,
    message: "Note added",
    data: { notes: order.internalNotes },
  });
});

/**
 * @desc    Mark order as delivered (admin)
 * @route   POST /api/admin/orders/:orderId/delivered
 * @access  Admin
 */
export const markAsDelivered = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { deliveryDate, signature } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  if (order.status !== "shipped") {
    return next(new AppError("Only shipped orders can be marked as delivered", 400));
  }

  order.shipping.deliveredAt = deliveryDate || new Date();
  await order.updateStatus("delivered", "admin", req.user._id);

  if (signature) {
    order.addTimelineEvent("delivery_confirmed", `Delivered and signed by: ${signature}`, "admin");
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order marked as delivered",
    data: { order },
  });
});

/**
 * @desc    Get order statistics (admin)
 * @route   GET /api/admin/orders/stats
 * @access  Admin
 */
export const getOrderStats = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const start = startDate
    ? new Date(startDate)
    : new Date(new Date().setDate(new Date().getDate() - 30));
  const end = endDate ? new Date(endDate) : new Date();
  end.setHours(23, 59, 59, 999);

  // Get various statistics
  const [totalStats, statusBreakdown, dailyOrders, topProducts] = await Promise.all([
    // Overall stats
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: { $nin: ["cancelled", "failed"] },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$pricing.total" },
          averageOrderValue: { $avg: "$pricing.total" },
          totalItems: { $sum: { $size: "$items" } },
        },
      },
    ]),

    // Status breakdown
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]),

    // Daily orders trend
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: { $nin: ["cancelled", "failed"] },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          orders: { $sum: 1 },
          revenue: { $sum: "$pricing.total" },
        },
      },
      { $sort: { _id: 1 } },
    ]),

    // Top selling products
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: { $nin: ["cancelled", "failed"] },
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          productName: { $first: "$items.productSnapshot.name" },
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$items.lineTotal" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      period: { start, end },
      summary: totalStats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        totalItems: 0,
      },
      statusBreakdown: statusBreakdown.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      dailyTrend: dailyOrders,
      topProducts,
    },
  });
});

/**
 * @desc    Export orders to CSV (admin)
 * @route   GET /api/admin/orders/export
 * @access  Admin
 */
export const exportOrders = asyncHandler(async (req, res) => {
  const { startDate, endDate, status } = req.query;

  const query = {};

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  if (status) {
    query.status = status;
  }

  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .limit(10000) // Safety limit
    .lean();

  // Convert to CSV format
  const csvHeaders = [
    "Order Number",
    "Date",
    "Status",
    "Customer Email",
    "Customer Name",
    "Items",
    "Subtotal",
    "Shipping",
    "Tax",
    "Discount",
    "Total",
    "Payment Status",
    "Shipping Address",
  ];

  const csvRows = orders.map((order) => [
    order.orderNumber,
    new Date(order.createdAt).toISOString(),
    order.status,
    order.customerSnapshot?.email || order.guestEmail || "",
    `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim(),
    order.items.length,
    order.pricing?.subtotal || 0,
    order.pricing?.shipping || 0,
    order.pricing?.tax || 0,
    order.pricing?.discount || 0,
    order.pricing?.total || 0,
    order.payment?.status || "",
    order.shippingAddress
      ? `${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`
      : "",
  ]);

  const csvContent = [
    csvHeaders.join(","),
    ...csvRows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=orders-${new Date().toISOString().split("T")[0]}.csv`
  );
  res.send(csvContent);
});
```

---

### 3.8.7 Order Routes (User)

**`backend/src/routes/orderRoutes.js`:**

```javascript
import express from "express";
import {
  getMyOrders,
  getOrderById,
  trackOrder,
  cancelOrder,
  requestReturn,
  getOrderInvoice,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public route for guest order tracking
router.get("/track/:orderNumber", trackOrder);

// Protected routes (require authentication)
router.use(protect);

router.get("/", getMyOrders);
router.get("/:orderId", getOrderById);
router.post("/:orderId/cancel", cancelOrder);
router.post("/:orderId/return", requestReturn);
router.get("/:orderId/invoice", getOrderInvoice);

export default router;
```

---

### 3.8.8 Order Routes (Admin)

**`backend/src/routes/adminOrderRoutes.js`:**

```javascript
import express from "express";
import {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  addTrackingInfo,
  processRefund,
  addInternalNote,
  markAsDelivered,
  getOrderStats,
  exportOrders,
} from "../controllers/adminOrderController.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(restrictTo("admin", "super_admin"));

// Order listing and stats
router.get("/", getAllOrders);
router.get("/stats", getOrderStats);
router.get("/export", exportOrders);

// Individual order operations
router.get("/:orderId", getOrderDetails);
router.patch("/:orderId/status", updateOrderStatus);
router.patch("/:orderId/tracking", addTrackingInfo);
router.post("/:orderId/refund", processRefund);
router.post("/:orderId/notes", addInternalNote);
router.post("/:orderId/delivered", markAsDelivered);

export default router;
```

---

### 3.8.9 Role Restriction Middleware

**Add to `backend/src/middleware/auth.js`:**

```javascript
/**
 * Restrict access to specific roles
 * @param  {...string} roles - Allowed roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }

    next();
  };
};
```

---

### 3.8.10 Update Route Index

**Update `backend/src/routes/index.js`:**

```javascript
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import checkoutRoutes from "./checkoutRoutes.js";
import orderRoutes from "./orderRoutes.js";
import adminOrderRoutes from "./adminOrderRoutes.js";

const router = express.Router();

// Public & User routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/orders", orderRoutes);

// Admin routes
router.use("/admin/orders", adminOrderRoutes);

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

### 3.8.11 Update User Model for Role

Ensure your User model supports roles:

**Add to `backend/src/models/User.js`:**

```javascript
// In the user schema definition
role: {
  type: String,
  enum: ['user', 'admin', 'super_admin'],
  default: 'user',
},
```

---

### 3.8.12 API Endpoints Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ORDER API ENDPOINTS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USER ENDPOINTS (/api/orders):                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  GET    /                   │ Get user's orders (paginated)     │       │
│  │  GET    /:orderId           │ Get order details                 │       │
│  │  GET    /track/:orderNumber │ Track order (guest, needs email)  │       │
│  │  POST   /:orderId/cancel    │ Cancel order                      │       │
│  │  POST   /:orderId/return    │ Request return                    │       │
│  │  GET    /:orderId/invoice   │ Get order invoice                 │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ADMIN ENDPOINTS (/api/admin/orders):                                       │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  GET    /                   │ Get all orders (filtered)         │       │
│  │  GET    /stats              │ Get order statistics              │       │
│  │  GET    /export             │ Export orders to CSV              │       │
│  │  GET    /:orderId           │ Get order details (full)          │       │
│  │  PATCH  /:orderId/status    │ Update order status               │       │
│  │  PATCH  /:orderId/tracking  │ Add tracking information          │       │
│  │  POST   /:orderId/refund    │ Process refund                    │       │
│  │  POST   /:orderId/notes     │ Add internal note                 │       │
│  │  POST   /:orderId/delivered │ Mark as delivered                 │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Step 3.8 Checklist

- [ ] Order Controller (User) with:
  - [ ] Get my orders (paginated, filtered)
  - [ ] Get order by ID
  - [ ] Track order (guest support)
  - [ ] Cancel order
  - [ ] Request return
  - [ ] Get invoice
- [ ] Order Controller (Admin) with:
  - [ ] Get all orders (filtered, paginated)
  - [ ] Get order details
  - [ ] Update order status
  - [ ] Add tracking information
  - [ ] Process refund
  - [ ] Add internal notes
  - [ ] Mark as delivered
  - [ ] Get order statistics
  - [ ] Export orders to CSV
- [ ] Order Routes (User) configured
- [ ] Order Routes (Admin) configured
- [ ] Role restriction middleware
- [ ] Route index updated
- [ ] User model updated with role field

---

## 🔜 Next: Step 3.9 - User Profile & Address Management

In the next step, we'll create:

- User profile endpoints
- Address management (CRUD)
- Password change functionality
- Account settings

---

_Say "3.9" or "next" to continue_

---

## 3.9 User Profile & Address Management

This section covers user profile management, saved addresses for faster checkout, password management, and account preferences.

---

### 3.9.1 User Profile Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    USER PROFILE SYSTEM                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                      USER PROFILE                               │       │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │       │
│  │  │  Basic Info   │  │   Security    │  │  Preferences  │       │       │
│  │  │  • Name       │  │  • Password   │  │  • Currency   │       │       │
│  │  │  • Email      │  │  • 2FA        │  │  • Language   │       │       │
│  │  │  • Phone      │  │  • Sessions   │  │  • Newsletter │       │       │
│  │  │  • Avatar     │  │  • Activity   │  │  • Marketing  │       │       │
│  │  └───────────────┘  └───────────────┘  └───────────────┘       │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                    SAVED ADDRESSES                              │       │
│  │  ┌───────────────────────────────────────────────────────────┐  │       │
│  │  │  • Multiple shipping addresses                            │  │       │
│  │  │  • Multiple billing addresses                             │  │       │
│  │  │  • Default address selection                              │  │       │
│  │  │  • Address validation                                     │  │       │
│  │  │  • Quick checkout selection                               │  │       │
│  │  └───────────────────────────────────────────────────────────┘  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                    RELATED DATA                                 │       │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐    │       │
│  │  │  Orders   │  │  Wishlist │  │  Reviews  │  │  Support  │    │       │
│  │  │  History  │  │  Items    │  │  Written  │  │  Tickets  │    │       │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘    │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.9.2 Enhanced User Model

**Update `backend/src/models/User.js`:**

```javascript
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

/**
 * Address Sub-Schema
 * Used for both shipping and billing addresses
 */
const addressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      maxlength: [50, "Label cannot exceed 50 characters"],
      default: "Home",
    },
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
    company: {
      type: String,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    addressLine1: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: [200, "Address cannot exceed 200 characters"],
    },
    addressLine2: {
      type: String,
      trim: true,
      maxlength: [200, "Address line 2 cannot exceed 200 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [100, "City cannot exceed 100 characters"],
    },
    state: {
      type: String,
      required: [true, "State/Province is required"],
      trim: true,
      maxlength: [100, "State cannot exceed 100 characters"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true,
      maxlength: [20, "Postal code cannot exceed 20 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      default: "US",
      maxlength: [2, "Use 2-letter country code"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [20, "Phone cannot exceed 20 characters"],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["shipping", "billing", "both"],
      default: "both",
    },
  },
  { timestamps: true }
);

/**
 * User Preferences Sub-Schema
 */
const preferencesSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "CAD", "AUD"],
    },
    language: {
      type: String,
      default: "en",
      enum: ["en", "es", "fr", "de", "it"],
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    marketingEmails: {
      type: Boolean,
      default: false,
    },
    orderUpdates: {
      type: Boolean,
      default: true,
    },
    smsNotifications: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

/**
 * Main User Schema
 */
const userSchema = new mongoose.Schema(
  {
    // Basic Info
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't include in queries by default
    },
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
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone cannot exceed 20 characters"],
    },
    avatar: {
      url: String,
      publicId: String, // For cloud storage reference
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },

    // Role & Status
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // Addresses
    addresses: [addressSchema],

    // Preferences
    preferences: {
      type: preferencesSchema,
      default: () => ({}),
    },

    // Security
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // Login tracking
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,

    // Refresh tokens (for multi-device support)
    refreshTokens: [
      {
        token: String,
        device: String,
        createdAt: { type: Date, default: Date.now },
        expiresAt: Date,
      },
    ],

    // Wishlist
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // Metadata
    source: {
      type: String,
      enum: ["web", "mobile", "admin", "import"],
      default: "web",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ==========================================
// INDEXES
// ==========================================
userSchema.index({ email: 1 });
userSchema.index({ "addresses.isDefault": 1 });
userSchema.index({ createdAt: -1 });

// ==========================================
// VIRTUALS
// ==========================================
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("defaultShippingAddress").get(function () {
  return this.addresses.find((addr) => addr.isDefault && ["shipping", "both"].includes(addr.type));
});

userSchema.virtual("defaultBillingAddress").get(function () {
  return this.addresses.find((addr) => addr.isDefault && ["billing", "both"].includes(addr.type));
});

userSchema.virtual("isLocked").get(function () {
  return this.lockUntil && this.lockUntil > Date.now();
});

// ==========================================
// PRE-SAVE MIDDLEWARE
// ==========================================
userSchema.pre("save", async function (next) {
  // Only hash password if modified
  if (!this.isModified("password")) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Set passwordChangedAt
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second for token timing
  }

  next();
});

// ==========================================
// INSTANCE METHODS
// ==========================================

/**
 * Compare password
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Check if password was changed after token was issued
 */
userSchema.methods.passwordChangedAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return tokenIssuedAt < changedTimestamp;
  }
  return false;
};

/**
 * Generate password reset token
 */
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

/**
 * Generate email verification token
 */
userSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

/**
 * Handle failed login attempt
 */
userSchema.methods.handleFailedLogin = async function () {
  this.failedLoginAttempts += 1;

  // Lock account after 5 failed attempts
  if (this.failedLoginAttempts >= 5) {
    this.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
  }

  await this.save({ validateBeforeSave: false });
};

/**
 * Handle successful login
 */
userSchema.methods.handleSuccessfulLogin = async function () {
  this.failedLoginAttempts = 0;
  this.lockUntil = undefined;
  this.lastLogin = new Date();
  this.loginCount += 1;

  await this.save({ validateBeforeSave: false });
};

/**
 * Add address
 */
userSchema.methods.addAddress = async function (addressData) {
  // If this is the first address or marked as default, update other defaults
  if (addressData.isDefault || this.addresses.length === 0) {
    this.addresses.forEach((addr) => {
      if (addr.type === addressData.type || addr.type === "both" || addressData.type === "both") {
        addr.isDefault = false;
      }
    });
    addressData.isDefault = true;
  }

  this.addresses.push(addressData);
  return this.save();
};

/**
 * Update address
 */
userSchema.methods.updateAddress = async function (addressId, addressData) {
  const address = this.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found");
  }

  // If setting as default, remove default from others
  if (addressData.isDefault) {
    this.addresses.forEach((addr) => {
      if (addr._id.toString() !== addressId.toString()) {
        if (addr.type === addressData.type || addr.type === "both" || addressData.type === "both") {
          addr.isDefault = false;
        }
      }
    });
  }

  // Update address fields
  Object.assign(address, addressData);

  return this.save();
};

/**
 * Remove address
 */
userSchema.methods.removeAddress = async function (addressId) {
  const address = this.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found");
  }

  const wasDefault = address.isDefault;
  const addressType = address.type;

  this.addresses = this.addresses.filter((addr) => addr._id.toString() !== addressId.toString());

  // If removed address was default, set another as default
  if (wasDefault && this.addresses.length > 0) {
    const sameTypeAddress = this.addresses.find(
      (addr) => addr.type === addressType || addr.type === "both"
    );
    if (sameTypeAddress) {
      sameTypeAddress.isDefault = true;
    }
  }

  return this.save();
};

/**
 * Set default address
 */
userSchema.methods.setDefaultAddress = async function (addressId) {
  const address = this.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found");
  }

  // Remove default from other addresses of same type
  this.addresses.forEach((addr) => {
    if (addr.type === address.type || addr.type === "both" || address.type === "both") {
      addr.isDefault = addr._id.toString() === addressId.toString();
    }
  });

  return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
```

---

### 3.9.3 Profile Controller

**`backend/src/controllers/profileController.js`:**

```javascript
import User from "../models/User.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get current user profile
 * @route   GET /api/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshTokens -passwordResetToken -passwordResetExpires -emailVerificationToken -emailVerificationExpires"
  );

  res.status(200).json({
    success: true,
    data: { user },
  });
});

/**
 * @desc    Update user profile
 * @route   PATCH /api/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res, next) => {
  const allowedFields = ["firstName", "lastName", "phone", "dateOfBirth", "gender"];

  // Filter out non-allowed fields
  const updates = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedFields.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields to update", 400));
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password -refreshTokens");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: { user },
  });
});

/**
 * @desc    Update email (requires verification)
 * @route   PATCH /api/profile/email
 * @access  Private
 */
export const updateEmail = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  // Get user with password
  const user = await User.findById(req.user._id).select("+password");

  // Verify password
  if (!(await user.comparePassword(password))) {
    return next(new AppError("Incorrect password", 401));
  }

  // Check if email is already in use
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
    return next(new AppError("Email is already in use", 400));
  }

  // Update email and mark as unverified
  user.email = email.toLowerCase();
  user.isEmailVerified = false;

  // Generate verification token
  const verificationToken = user.createEmailVerificationToken();
  await user.save();

  // TODO: Send verification email

  res.status(200).json({
    success: true,
    message: "Email updated. Please verify your new email address.",
    data: {
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    },
  });
});

/**
 * @desc    Change password
 * @route   PATCH /api/profile/password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new AppError("All password fields are required", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError("New passwords do not match", 400));
  }

  if (newPassword.length < 8) {
    return next(new AppError("Password must be at least 8 characters", 400));
  }

  // Get user with password
  const user = await User.findById(req.user._id).select("+password");

  // Verify current password
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError("Current password is incorrect", 401));
  }

  // Check if new password is same as current
  if (await user.comparePassword(newPassword)) {
    return next(new AppError("New password must be different from current password", 400));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // TODO: Optionally invalidate all refresh tokens

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

/**
 * @desc    Update preferences
 * @route   PATCH /api/profile/preferences
 * @access  Private
 */
export const updatePreferences = asyncHandler(async (req, res) => {
  const allowedPreferences = [
    "currency",
    "language",
    "newsletter",
    "marketingEmails",
    "orderUpdates",
    "smsNotifications",
  ];

  const updates = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedPreferences.includes(key)) {
      updates[`preferences.${key}`] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("preferences");

  res.status(200).json({
    success: true,
    message: "Preferences updated successfully",
    data: { preferences: user.preferences },
  });
});

/**
 * @desc    Upload avatar
 * @route   POST /api/profile/avatar
 * @access  Private
 */
export const uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please upload an image", 400));
  }

  // TODO: Upload to cloud storage (S3, Cloudinary, etc.)
  // For now, store the local path
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: {
        url: avatarUrl,
        publicId: req.file.filename,
      },
    },
    { new: true }
  ).select("avatar");

  res.status(200).json({
    success: true,
    message: "Avatar uploaded successfully",
    data: { avatar: user.avatar },
  });
});

/**
 * @desc    Delete avatar
 * @route   DELETE /api/profile/avatar
 * @access  Private
 */
export const deleteAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // TODO: Delete from cloud storage

  user.avatar = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Avatar deleted successfully",
  });
});

/**
 * @desc    Delete account
 * @route   DELETE /api/profile
 * @access  Private
 */
export const deleteAccount = asyncHandler(async (req, res, next) => {
  const { password, confirmation } = req.body;

  if (confirmation !== "DELETE") {
    return next(new AppError("Please type DELETE to confirm account deletion", 400));
  }

  // Get user with password
  const user = await User.findById(req.user._id).select("+password");

  // Verify password
  if (!(await user.comparePassword(password))) {
    return next(new AppError("Incorrect password", 401));
  }

  // Soft delete - just deactivate the account
  user.isActive = false;
  user.email = `deleted_${Date.now()}_${user.email}`; // Free up the email
  await user.save();

  // TODO: Cancel any active subscriptions
  // TODO: Clear any sensitive data

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});
```

---

### 3.9.4 Address Controller

**`backend/src/controllers/addressController.js`:**

```javascript
import User from "../models/User.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get all addresses
 * @route   GET /api/profile/addresses
 * @access  Private
 */
export const getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("addresses");

  res.status(200).json({
    success: true,
    data: {
      addresses: user.addresses,
      count: user.addresses.length,
    },
  });
});

/**
 * @desc    Get single address
 * @route   GET /api/profile/addresses/:addressId
 * @access  Private
 */
export const getAddress = asyncHandler(async (req, res, next) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id).select("addresses");
  const address = user.addresses.id(addressId);

  if (!address) {
    return next(new AppError("Address not found", 404));
  }

  res.status(200).json({
    success: true,
    data: { address },
  });
});

/**
 * @desc    Add new address
 * @route   POST /api/profile/addresses
 * @access  Private
 */
export const addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // Limit number of addresses
  const MAX_ADDRESSES = 10;
  if (user.addresses.length >= MAX_ADDRESSES) {
    return next(new AppError(`Maximum ${MAX_ADDRESSES} addresses allowed`, 400));
  }

  await user.addAddress(req.body);

  res.status(201).json({
    success: true,
    message: "Address added successfully",
    data: {
      addresses: user.addresses,
      newAddress: user.addresses[user.addresses.length - 1],
    },
  });
});

/**
 * @desc    Update address
 * @route   PATCH /api/profile/addresses/:addressId
 * @access  Private
 */
export const updateAddress = asyncHandler(async (req, res, next) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id);

  try {
    await user.updateAddress(addressId, req.body);

    const updatedAddress = user.addresses.id(addressId);

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: { address: updatedAddress },
    });
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
});

/**
 * @desc    Delete address
 * @route   DELETE /api/profile/addresses/:addressId
 * @access  Private
 */
export const deleteAddress = asyncHandler(async (req, res, next) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id);

  try {
    await user.removeAddress(addressId);

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: { addresses: user.addresses },
    });
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
});

/**
 * @desc    Set default address
 * @route   PATCH /api/profile/addresses/:addressId/default
 * @access  Private
 */
export const setDefaultAddress = asyncHandler(async (req, res, next) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id);

  try {
    await user.setDefaultAddress(addressId);

    res.status(200).json({
      success: true,
      message: "Default address updated",
      data: { addresses: user.addresses },
    });
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
});
```

---

### 3.9.5 Wishlist Controller

**`backend/src/controllers/wishlistController.js`:**

```javascript
import User from "../models/User.js";
import Product from "../models/Product.js";
import { asyncHandler, AppError } from "../middleware/errorHandler.js";

/**
 * @desc    Get wishlist
 * @route   GET /api/profile/wishlist
 * @access  Private
 */
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    select: "name slug price compareAtPrice primaryImage stock isActive",
    match: { isActive: true },
  });

  res.status(200).json({
    success: true,
    data: {
      wishlist: user.wishlist,
      count: user.wishlist.length,
    },
  });
});

/**
 * @desc    Add to wishlist
 * @route   POST /api/profile/wishlist
 * @access  Private
 */
export const addToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  // Verify product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const user = await User.findById(req.user._id);

  // Check if already in wishlist
  if (user.wishlist.includes(productId)) {
    return next(new AppError("Product already in wishlist", 400));
  }

  // Limit wishlist size
  const MAX_WISHLIST_ITEMS = 50;
  if (user.wishlist.length >= MAX_WISHLIST_ITEMS) {
    return next(new AppError(`Maximum ${MAX_WISHLIST_ITEMS} items in wishlist`, 400));
  }

  user.wishlist.push(productId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Product added to wishlist",
    data: { wishlistCount: user.wishlist.length },
  });
});

/**
 * @desc    Remove from wishlist
 * @route   DELETE /api/profile/wishlist/:productId
 * @access  Private
 */
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  const index = user.wishlist.indexOf(productId);
  if (index === -1) {
    return next(new AppError("Product not in wishlist", 404));
  }

  user.wishlist.splice(index, 1);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
    data: { wishlistCount: user.wishlist.length },
  });
});

/**
 * @desc    Clear wishlist
 * @route   DELETE /api/profile/wishlist
 * @access  Private
 */
export const clearWishlist = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { wishlist: [] });

  res.status(200).json({
    success: true,
    message: "Wishlist cleared",
    data: { wishlistCount: 0 },
  });
});

/**
 * @desc    Check if product is in wishlist
 * @route   GET /api/profile/wishlist/check/:productId
 * @access  Private
 */
export const checkWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id).select("wishlist");
  const inWishlist = user.wishlist.includes(productId);

  res.status(200).json({
    success: true,
    data: { inWishlist },
  });
});

/**
 * @desc    Move wishlist item to cart
 * @route   POST /api/profile/wishlist/:productId/move-to-cart
 * @access  Private
 */
export const moveToCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { selectedSize, selectedColor } = req.body;

  // Import cart controller function
  const Cart = (await import("../models/Cart.js")).default;

  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return next(new AppError("Product not available", 404));
  }

  // Get or create cart
  let cart = await Cart.getOrCreateForUser(req.user._id);

  // Add to cart
  await cart.addItem(product, 1, { selectedSize, selectedColor });

  // Remove from wishlist
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { wishlist: productId },
  });

  res.status(200).json({
    success: true,
    message: "Item moved to cart",
  });
});
```

---

### 3.9.6 Profile Routes

**`backend/src/routes/profileRoutes.js`:**

```javascript
import express from "express";
import {
  getProfile,
  updateProfile,
  updateEmail,
  changePassword,
  updatePreferences,
  uploadAvatar,
  deleteAvatar,
  deleteAccount,
} from "../controllers/profileController.js";
import {
  getAddresses,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlist,
  moveToCart,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.get("/", getProfile);
router.patch("/", updateProfile);
router.patch("/email", updateEmail);
router.patch("/password", changePassword);
router.patch("/preferences", updatePreferences);
router.post("/avatar", upload.single("avatar"), uploadAvatar);
router.delete("/avatar", deleteAvatar);
router.delete("/", deleteAccount);

// Address routes
router.get("/addresses", getAddresses);
router.post("/addresses", addAddress);
router.get("/addresses/:addressId", getAddress);
router.patch("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);
router.patch("/addresses/:addressId/default", setDefaultAddress);

// Wishlist routes
router.get("/wishlist", getWishlist);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist", clearWishlist);
router.get("/wishlist/check/:productId", checkWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.post("/wishlist/:productId/move-to-cart", moveToCart);

export default router;
```

---

### 3.9.7 File Upload Middleware

**`backend/src/middleware/upload.js`:**

```javascript
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { AppError } from "./errorHandler.js";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = crypto.randomBytes(8).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${req.user._id}-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files are allowed (JPEG, PNG, GIF, WebP)", 400), false);
  }
};

// Export multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});
```

---

### 3.9.8 Update Route Index

**Update `backend/src/routes/index.js`:**

```javascript
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import checkoutRoutes from "./checkoutRoutes.js";
import orderRoutes from "./orderRoutes.js";
import adminOrderRoutes from "./adminOrderRoutes.js";
import profileRoutes from "./profileRoutes.js";

const router = express.Router();

// Public & User routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/orders", orderRoutes);
router.use("/profile", profileRoutes);

// Admin routes
router.use("/admin/orders", adminOrderRoutes);

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

### 3.9.9 API Endpoints Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROFILE API ENDPOINTS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROFILE (/api/profile):                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  GET     /                    │ Get user profile                │       │
│  │  PATCH   /                    │ Update profile info             │       │
│  │  PATCH   /email               │ Update email (needs password)   │       │
│  │  PATCH   /password            │ Change password                 │       │
│  │  PATCH   /preferences         │ Update preferences              │       │
│  │  POST    /avatar              │ Upload avatar image             │       │
│  │  DELETE  /avatar              │ Delete avatar                   │       │
│  │  DELETE  /                    │ Delete account                  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ADDRESSES (/api/profile/addresses):                                        │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  GET     /                    │ Get all addresses               │       │
│  │  POST    /                    │ Add new address                 │       │
│  │  GET     /:addressId          │ Get single address              │       │
│  │  PATCH   /:addressId          │ Update address                  │       │
│  │  DELETE  /:addressId          │ Delete address                  │       │
│  │  PATCH   /:addressId/default  │ Set as default address          │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  WISHLIST (/api/profile/wishlist):                                          │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  GET     /                    │ Get wishlist items              │       │
│  │  POST    /                    │ Add product to wishlist         │       │
│  │  DELETE  /                    │ Clear entire wishlist           │       │
│  │  GET     /check/:productId    │ Check if product in wishlist    │       │
│  │  DELETE  /:productId          │ Remove from wishlist            │       │
│  │  POST    /:productId/move-to-cart │ Move item to cart           │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Step 3.9 Checklist

- [ ] Enhanced User Model with:
  - [ ] Address sub-schema
  - [ ] Preferences sub-schema
  - [ ] Wishlist array
  - [ ] Security fields (lockout, password reset)
  - [ ] Address management methods
- [ ] Profile Controller with:
  - [ ] Get/update profile
  - [ ] Change email (with verification)
  - [ ] Change password
  - [ ] Update preferences
  - [ ] Avatar upload/delete
  - [ ] Delete account
- [ ] Address Controller with:
  - [ ] CRUD operations
  - [ ] Set default address
  - [ ] Address limits (max 10)
- [ ] Wishlist Controller with:
  - [ ] Add/remove items
  - [ ] Clear wishlist
  - [ ] Check if in wishlist
  - [ ] Move to cart
- [ ] File Upload Middleware
- [ ] Profile Routes configured
- [ ] Route index updated

---

## 🔜 Next: Step 3.10 - API Documentation with Swagger

In the next step, we'll create:

- Swagger/OpenAPI documentation
- Interactive API explorer
- Request/response examples

---

_Say "3.10" or "next" to continue_

---

## 3.10 API Documentation with Swagger

Professional API documentation is essential for team collaboration, frontend development, and third-party integrations. We'll use Swagger (OpenAPI) to create interactive, self-documenting APIs.

---

### 3.10.1 Install Dependencies

```bash
cd backend
npm install swagger-jsdoc swagger-ui-express
```

---

### 3.10.2 Swagger Configuration

**`backend/src/config/swagger.js`:**

```javascript
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fashion Store API",
      version: "1.0.0",
      description: `
        A comprehensive REST API for the Fashion E-commerce Platform.
        
        ## Features
        - User authentication with JWT
        - Product catalog management
        - Shopping cart functionality
        - Order processing with Stripe payments
        - User profile and address management
        
        ## Authentication
        Most endpoints require authentication via Bearer token.
        Include the token in the Authorization header:
        \`Authorization: Bearer <your_token>\`
      `,
      contact: {
        name: "API Support",
        email: "support@fashionstore.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
      {
        url: "https://api.fashionstore.com/api",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        // Common schemas
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            error: {
              type: "object",
              properties: {
                code: { type: "string" },
                details: { type: "object" },
              },
            },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            currentPage: { type: "integer", example: 1 },
            totalPages: { type: "integer", example: 10 },
            totalItems: { type: "integer", example: 100 },
            hasMore: { type: "boolean", example: true },
          },
        },
        // User schemas
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "507f1f77bcf86cd799439011" },
            email: { type: "string", format: "email", example: "user@example.com" },
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            phone: { type: "string", example: "+1234567890" },
            role: { type: "string", enum: ["user", "admin", "super_admin"], example: "user" },
            isActive: { type: "boolean", example: true },
            isEmailVerified: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        // Address schema
        Address: {
          type: "object",
          required: [
            "firstName",
            "lastName",
            "addressLine1",
            "city",
            "state",
            "postalCode",
            "country",
            "phone",
          ],
          properties: {
            _id: { type: "string" },
            label: { type: "string", example: "Home" },
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            company: { type: "string", example: "Acme Inc" },
            addressLine1: { type: "string", example: "123 Main St" },
            addressLine2: { type: "string", example: "Apt 4B" },
            city: { type: "string", example: "New York" },
            state: { type: "string", example: "NY" },
            postalCode: { type: "string", example: "10001" },
            country: { type: "string", example: "US" },
            phone: { type: "string", example: "+1234567890" },
            isDefault: { type: "boolean", example: true },
            type: { type: "string", enum: ["shipping", "billing", "both"], example: "both" },
          },
        },
        // Product schemas
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string", example: "Classic White T-Shirt" },
            slug: { type: "string", example: "classic-white-t-shirt" },
            description: { type: "string" },
            price: { type: "number", example: 29.99 },
            compareAtPrice: { type: "number", example: 39.99 },
            category: { type: "string", example: "Tops" },
            brand: { type: "string", example: "FashionBrand" },
            stock: { type: "integer", example: 100 },
            sizes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", example: "M" },
                  stock: { type: "integer", example: 25 },
                },
              },
            },
            colors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", example: "White" },
                  hexCode: { type: "string", example: "#FFFFFF" },
                },
              },
            },
            images: {
              type: "array",
              items: { type: "string" },
            },
            isActive: { type: "boolean", example: true },
            rating: {
              type: "object",
              properties: {
                average: { type: "number", example: 4.5 },
                count: { type: "integer", example: 120 },
              },
            },
          },
        },
        // Cart schemas
        CartItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            product: { type: "string" },
            productSnapshot: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                thumbnail: { type: "string" },
              },
            },
            quantity: { type: "integer", example: 2 },
            selectedSize: { type: "string", example: "M" },
            selectedColor: {
              type: "object",
              properties: {
                name: { type: "string", example: "Blue" },
                hexCode: { type: "string", example: "#0000FF" },
              },
            },
            unitPrice: { type: "number", example: 29.99 },
            lineTotal: { type: "number", example: 59.98 },
          },
        },
        Cart: {
          type: "object",
          properties: {
            _id: { type: "string" },
            user: { type: "string" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
            subtotal: { type: "number", example: 89.97 },
            totalItems: { type: "integer", example: 3 },
            totalQuantity: { type: "integer", example: 5 },
            estimatedTotal: { type: "number", example: 97.96 },
            coupon: {
              type: "object",
              properties: {
                code: { type: "string", example: "SAVE10" },
                discountAmount: { type: "number", example: 8.99 },
              },
            },
          },
        },
        // Order schemas
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            orderNumber: { type: "string", example: "FS-20241216-A3B2C" },
            status: {
              type: "string",
              enum: [
                "pending",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "completed",
                "cancelled",
                "refunded",
              ],
              example: "confirmed",
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
            pricing: {
              type: "object",
              properties: {
                subtotal: { type: "number", example: 89.97 },
                shipping: { type: "number", example: 7.99 },
                tax: { type: "number", example: 7.2 },
                discount: { type: "number", example: 0 },
                total: { type: "number", example: 105.16 },
              },
            },
            shippingAddress: { $ref: "#/components/schemas/Address" },
            payment: {
              type: "object",
              properties: {
                method: { type: "string", example: "stripe" },
                status: { type: "string", example: "captured" },
                cardLast4: { type: "string", example: "4242" },
              },
            },
            shipping: {
              type: "object",
              properties: {
                method: { type: "string", example: "standard" },
                trackingNumber: { type: "string" },
                carrier: { type: "string", example: "ups" },
              },
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
              example: {
                success: false,
                message: "Not authorized to access this route",
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
              example: {
                success: false,
                message: "Resource not found",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
              example: {
                success: false,
                message: "Validation failed",
                errors: [{ field: "email", message: "Email is required" }],
              },
            },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Products", description: "Product catalog endpoints" },
      { name: "Cart", description: "Shopping cart endpoints" },
      { name: "Checkout", description: "Checkout and payment endpoints" },
      { name: "Orders", description: "Order management endpoints" },
      { name: "Profile", description: "User profile endpoints" },
      { name: "Addresses", description: "Address management endpoints" },
      { name: "Wishlist", description: "Wishlist endpoints" },
      { name: "Admin", description: "Admin-only endpoints" },
    ],
  },
  apis: ["./src/routes/*.js", "./src/docs/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
```

---

### 3.10.3 Setup Swagger in Server

**Update `backend/src/server.js`:**

```javascript
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
// ... other imports

const app = express();

// ... other middleware

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Fashion Store API Documentation",
    swaggerOptions: {
      persistAuthorization: true, // Keep auth token between page reloads
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
    },
  })
);

// JSON spec endpoint (for external tools)
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ... rest of server setup
```

---

### 3.10.4 API Documentation Files

Create documentation files with JSDoc comments:

**`backend/src/docs/auth.docs.js`:**

```javascript
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: SecurePass123!
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     accessToken:
 *                       type: string
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: Email already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: SecurePass123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     accessToken:
 *                       type: string
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie with refresh token
 *             schema:
 *               type: string
 *       401:
 *         description: Invalid credentials
 *       423:
 *         description: Account locked due to too many failed attempts
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Uses the refresh token from HTTP-only cookie to generate a new access token
 *     responses:
 *       200:
 *         description: Token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *       401:
 *         description: Invalid or expired refresh token
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent (if email exists)
 */

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password with token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token from email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 8
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
```

---

**`backend/src/docs/products.docs.js`:**

```javascript
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Products per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: Filter by available size
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by color
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in name and description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, price, name, rating]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /products/{slug}:
 *   get:
 *     summary: Get product by slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Product slug
 *         example: classic-white-t-shirt
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Categories list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           count:
 *                             type: integer
 */
```

---

**`backend/src/docs/cart.docs.js`:**

```javascript
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get current cart
 *     tags: [Cart]
 *     description: Returns the cart for the authenticated user or guest session
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     responses:
 *       200:
 *         description: Cart retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     cart:
 *                       $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: integer
 *                 default: 1
 *                 minimum: 1
 *                 maximum: 99
 *               selectedSize:
 *                 type: string
 *                 example: M
 *               selectedColor:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   hexCode:
 *                     type: string
 *     responses:
 *       200:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     cart:
 *                       $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Product not available or insufficient stock
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /cart/items/{itemId}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 99
 *                 description: New quantity (0 to remove)
 *     responses:
 *       200:
 *         description: Cart updated
 *       404:
 *         description: Item not found in cart
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     responses:
 *       200:
 *         description: Cart cleared
 */

/**
 * @swagger
 * /cart/coupon:
 *   post:
 *     summary: Apply coupon code
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE10
 *     responses:
 *       200:
 *         description: Coupon applied
 *       400:
 *         description: Invalid coupon code
 *   delete:
 *     summary: Remove coupon
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     responses:
 *       200:
 *         description: Coupon removed
 */
```

---

**`backend/src/docs/orders.docs.js`:**

```javascript
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, processing, shipped, delivered, completed, cancelled]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Orders retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /orders/track/{orderNumber}:
 *   get:
 *     summary: Track order (guest)
 *     tags: [Orders]
 *     description: Track an order without logging in (requires email verification)
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         schema:
 *           type: string
 *         example: FS-20241216-A3B2C
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: Order tracking info
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /orders/{orderId}/cancel:
 *   post:
 *     summary: Cancel order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Changed my mind
 *     responses:
 *       200:
 *         description: Order cancelled
 *       400:
 *         description: Order cannot be cancelled (already shipped, etc.)
 */

/**
 * @swagger
 * /orders/{orderId}/return:
 *   post:
 *     summary: Request return
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - reason
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     orderItemId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *               reason:
 *                 type: string
 *                 enum: [wrong_size, wrong_color, defective, not_as_described, other]
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Return request submitted
 *       400:
 *         description: Return window expired or order not delivered
 */
```

---

**`backend/src/docs/profile.docs.js`:**

```javascript
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *   patch:
 *     summary: Update profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female, other, prefer_not_to_say]
 *     responses:
 *       200:
 *         description: Profile updated
 *   delete:
 *     summary: Delete account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmation
 *             properties:
 *               password:
 *                 type: string
 *               confirmation:
 *                 type: string
 *                 example: DELETE
 *     responses:
 *       200:
 *         description: Account deleted
 */

/**
 * @swagger
 * /profile/password:
 *   patch:
 *     summary: Change password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed
 *       401:
 *         description: Current password incorrect
 */

/**
 * @swagger
 * /profile/addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     addresses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Address'
 *                     count:
 *                       type: integer
 *   post:
 *     summary: Add new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address added
 *       400:
 *         description: Maximum addresses limit reached
 */

/**
 * @swagger
 * /profile/addresses/{addressId}:
 *   get:
 *     summary: Get address by ID
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address details
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *   patch:
 *     summary: Update address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated
 *   delete:
 *     summary: Delete address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted
 */

/**
 * @swagger
 * /profile/wishlist:
 *   get:
 *     summary: Get wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist items
 *   post:
 *     summary: Add to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added to wishlist
 *   delete:
 *     summary: Clear wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared
 */
```

---

### 3.10.5 Access the Documentation

Once everything is set up, access the API documentation at:

```
http://localhost:5000/api-docs
```

The Swagger UI provides:

- Interactive API explorer
- Try-it-out functionality
- Authentication support
- Request/response examples
- Schema definitions

---

## ✅ Step 3.10 Checklist

- [ ] Swagger dependencies installed (swagger-jsdoc, swagger-ui-express)
- [ ] Swagger configuration with OpenAPI 3.0 spec
- [ ] Component schemas defined (User, Product, Cart, Order, Address)
- [ ] Security schemes configured (Bearer JWT)
- [ ] Common error responses defined
- [ ] API tags for grouping endpoints
- [ ] Server setup with Swagger UI
- [ ] Documentation files created:
  - [ ] Auth endpoints
  - [ ] Product endpoints
  - [ ] Cart endpoints
  - [ ] Order endpoints
  - [ ] Profile/Address/Wishlist endpoints
- [ ] JSON spec endpoint available

---

## 🎉 Backend Development Complete!

Congratulations! You've completed the backend development phase. Your API now includes:

✅ **Authentication** - JWT with refresh tokens, password reset
✅ **Products** - Full catalog with filtering, search, pagination
✅ **Cart** - Guest and authenticated user support
✅ **Checkout** - Stripe payment integration
✅ **Orders** - Complete order lifecycle management
✅ **Profiles** - User management, addresses, wishlists
✅ **Security** - Rate limiting, input sanitization, CORS
✅ **Documentation** - Interactive Swagger API docs

---

## 🔜 Next: Part 4 - Frontend Integration

In Part 4, we'll connect the frontend to our backend:

- API service layer
- Authentication context
- Protected routes
- Product pages with data fetching
- Shopping cart integration
- Checkout flow

---

_Say "Part 4" or "next" to continue to Frontend Integration_

---

# Part 4: Frontend Integration

Now we'll connect our React frontend to the Node.js backend, implementing authentication, data fetching, state management, and a complete shopping experience.

---

## 4.1 API Service Layer

The API service layer provides a clean abstraction for all backend communication.

---

### 4.1.1 Axios Configuration

**`frontend/src/services/api.js`:**

```javascript
import axios from "axios";

// Create axios instance with default config
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

/**
 * Set the access token
 */
export const setAccessToken = (token) => {
  accessToken = token;
};

/**
 * Get the access token
 */
export const getAccessToken = () => accessToken;

/**
 * Clear the access token
 */
export const clearAccessToken = () => {
  accessToken = null;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken: newToken } = response.data.data;
        setAccessToken(newToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear token and redirect to login
        clearAccessToken();
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(refreshError);
      }
    }

    // Format error response
    const errorResponse = {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(errorResponse);
  }
);

export default api;
```

---

### 4.1.2 Auth Service

**`frontend/src/services/authService.js`:**

```javascript
import api, { setAccessToken, clearAccessToken } from "./api";

const authService = {
  /**
   * Register a new user
   */
  async register(userData) {
    const response = await api.post("/auth/register", userData);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    return { user, accessToken };
  },

  /**
   * Login user
   */
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    return { user, accessToken };
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAccessToken();
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data.data.user;
  },

  /**
   * Refresh access token
   */
  async refreshToken() {
    const response = await api.post("/auth/refresh");
    const { accessToken } = response.data.data;
    setAccessToken(accessToken);
    return accessToken;
  },

  /**
   * Request password reset
   */
  async forgotPassword(email) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  /**
   * Reset password with token
   */
  async resetPassword(token, password, confirmPassword) {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
    return response.data;
  },

  /**
   * Verify email
   */
  async verifyEmail(token) {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },
};

export default authService;
```

---

### 4.1.3 Product Service

**`frontend/src/services/productService.js`:**

```javascript
import api from "./api";

const productService = {
  /**
   * Get all products with filters
   */
  async getProducts(params = {}) {
    const response = await api.get("/products", { params });
    return response.data.data;
  },

  /**
   * Get single product by slug
   */
  async getProductBySlug(slug) {
    const response = await api.get(`/products/${slug}`);
    return response.data.data.product;
  },

  /**
   * Get product by ID
   */
  async getProductById(id) {
    const response = await api.get(`/products/id/${id}`);
    return response.data.data.product;
  },

  /**
   * Get all categories
   */
  async getCategories() {
    const response = await api.get("/products/categories");
    return response.data.data.categories;
  },

  /**
   * Get all brands
   */
  async getBrands() {
    const response = await api.get("/products/brands");
    return response.data.data.brands;
  },

  /**
   * Search products
   */
  async searchProducts(query, params = {}) {
    const response = await api.get("/products", {
      params: { search: query, ...params },
    });
    return response.data.data;
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 8) {
    const response = await api.get("/products", {
      params: { featured: true, limit },
    });
    return response.data.data.products;
  },

  /**
   * Get new arrivals
   */
  async getNewArrivals(limit = 8) {
    const response = await api.get("/products", {
      params: { sortBy: "createdAt", sortOrder: "desc", limit },
    });
    return response.data.data.products;
  },

  /**
   * Get related products
   */
  async getRelatedProducts(productId, limit = 4) {
    const response = await api.get(`/products/${productId}/related`, {
      params: { limit },
    });
    return response.data.data.products;
  },
};

export default productService;
```

---

### 4.1.4 Cart Service

**`frontend/src/services/cartService.js`:**

```javascript
import api from "./api";

const cartService = {
  /**
   * Get current cart
   */
  async getCart() {
    const response = await api.get("/cart");
    return response.data.data.cart;
  },

  /**
   * Add item to cart
   */
  async addItem(productId, quantity = 1, options = {}) {
    const response = await api.post("/cart/items", {
      productId,
      quantity,
      ...options,
    });

    // Store cart session for guests
    if (response.headers["x-cart-session"]) {
      localStorage.setItem("cartSession", response.headers["x-cart-session"]);
    }

    return response.data.data.cart;
  },

  /**
   * Update item quantity
   */
  async updateItem(itemId, quantity) {
    const response = await api.patch(`/cart/items/${itemId}`, { quantity });
    return response.data.data.cart;
  },

  /**
   * Remove item from cart
   */
  async removeItem(itemId) {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data.data.cart;
  },

  /**
   * Clear cart
   */
  async clearCart() {
    const response = await api.delete("/cart");
    return response.data.data.cart;
  },

  /**
   * Apply coupon
   */
  async applyCoupon(code) {
    const response = await api.post("/cart/coupon", { code });
    return response.data.data.cart;
  },

  /**
   * Remove coupon
   */
  async removeCoupon() {
    const response = await api.delete("/cart/coupon");
    return response.data.data.cart;
  },

  /**
   * Validate cart
   */
  async validateCart() {
    const response = await api.post("/cart/validate");
    return response.data.data;
  },

  /**
   * Merge guest cart after login
   */
  async mergeCarts() {
    const guestSessionId = localStorage.getItem("cartSession");
    if (!guestSessionId) return null;

    const response = await api.post("/cart/merge", { guestSessionId });
    localStorage.removeItem("cartSession");
    return response.data.data.cart;
  },
};

export default cartService;
```

---

### 4.1.5 Order Service

**`frontend/src/services/orderService.js`:**

```javascript
import api from "./api";

const orderService = {
  /**
   * Get user's orders
   */
  async getOrders(params = {}) {
    const response = await api.get("/orders", { params });
    return response.data.data;
  },

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data.order;
  },

  /**
   * Track order (guest)
   */
  async trackOrder(orderNumber, email) {
    const response = await api.get(`/orders/track/${orderNumber}`, {
      params: { email },
    });
    return response.data.data.order;
  },

  /**
   * Cancel order
   */
  async cancelOrder(orderId, reason) {
    const response = await api.post(`/orders/${orderId}/cancel`, { reason });
    return response.data.data.order;
  },

  /**
   * Request return
   */
  async requestReturn(orderId, returnData) {
    const response = await api.post(`/orders/${orderId}/return`, returnData);
    return response.data.data;
  },

  /**
   * Get order invoice
   */
  async getInvoice(orderId) {
    const response = await api.get(`/orders/${orderId}/invoice`);
    return response.data.data.invoice;
  },
};

export default orderService;
```

---

### 4.1.6 Checkout Service

**`frontend/src/services/checkoutService.js`:**

```javascript
import api from "./api";

const checkoutService = {
  /**
   * Initialize checkout
   */
  async initialize() {
    const response = await api.post("/checkout/initialize");
    return response.data.data;
  },

  /**
   * Get shipping rates
   */
  async getShippingRates(shippingAddress) {
    const response = await api.post("/checkout/shipping-rates", {
      shippingAddress,
    });
    return response.data.data;
  },

  /**
   * Calculate tax
   */
  async calculateTax(shippingAddress) {
    const response = await api.post("/checkout/calculate-tax", {
      shippingAddress,
    });
    return response.data.data;
  },

  /**
   * Create payment intent
   */
  async createPaymentIntent(checkoutData) {
    const response = await api.post("/checkout/create-payment-intent", checkoutData);
    return response.data.data;
  },

  /**
   * Update payment intent
   */
  async updatePaymentIntent(paymentIntentId, updates) {
    const response = await api.patch(`/checkout/payment-intent/${paymentIntentId}`, updates);
    return response.data.data;
  },

  /**
   * Complete order
   */
  async completeOrder(orderData) {
    const response = await api.post("/checkout/complete", orderData);
    return response.data.data;
  },

  /**
   * Get order confirmation
   */
  async getOrderConfirmation(orderNumber, email) {
    const response = await api.get(`/checkout/order/${orderNumber}`, {
      params: email ? { email } : {},
    });
    return response.data.data.order;
  },
};

export default checkoutService;
```

---

### 4.1.7 Profile Service

**`frontend/src/services/profileService.js`:**

```javascript
import api from "./api";

const profileService = {
  /**
   * Get user profile
   */
  async getProfile() {
    const response = await api.get("/profile");
    return response.data.data.user;
  },

  /**
   * Update profile
   */
  async updateProfile(data) {
    const response = await api.patch("/profile", data);
    return response.data.data.user;
  },

  /**
   * Update email
   */
  async updateEmail(email, password) {
    const response = await api.patch("/profile/email", { email, password });
    return response.data.data;
  },

  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword, confirmPassword) {
    const response = await api.patch("/profile/password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  /**
   * Update preferences
   */
  async updatePreferences(preferences) {
    const response = await api.patch("/profile/preferences", preferences);
    return response.data.data.preferences;
  },

  /**
   * Upload avatar
   */
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data.avatar;
  },

  /**
   * Delete avatar
   */
  async deleteAvatar() {
    const response = await api.delete("/profile/avatar");
    return response.data;
  },

  /**
   * Delete account
   */
  async deleteAccount(password, confirmation) {
    const response = await api.delete("/profile", {
      data: { password, confirmation },
    });
    return response.data;
  },

  // Address methods
  async getAddresses() {
    const response = await api.get("/profile/addresses");
    return response.data.data;
  },

  async addAddress(address) {
    const response = await api.post("/profile/addresses", address);
    return response.data.data;
  },

  async updateAddress(addressId, address) {
    const response = await api.patch(`/profile/addresses/${addressId}`, address);
    return response.data.data.address;
  },

  async deleteAddress(addressId) {
    const response = await api.delete(`/profile/addresses/${addressId}`);
    return response.data.data;
  },

  async setDefaultAddress(addressId) {
    const response = await api.patch(`/profile/addresses/${addressId}/default`);
    return response.data.data;
  },

  // Wishlist methods
  async getWishlist() {
    const response = await api.get("/profile/wishlist");
    return response.data.data;
  },

  async addToWishlist(productId) {
    const response = await api.post("/profile/wishlist", { productId });
    return response.data.data;
  },

  async removeFromWishlist(productId) {
    const response = await api.delete(`/profile/wishlist/${productId}`);
    return response.data.data;
  },

  async checkWishlist(productId) {
    const response = await api.get(`/profile/wishlist/check/${productId}`);
    return response.data.data.inWishlist;
  },

  async moveToCart(productId, options = {}) {
    const response = await api.post(`/profile/wishlist/${productId}/move-to-cart`, options);
    return response.data;
  },
};

export default profileService;
```

---

### 4.1.8 Service Index

**`frontend/src/services/index.js`:**

```javascript
export { default as api, setAccessToken, getAccessToken, clearAccessToken } from "./api";
export { default as authService } from "./authService";
export { default as productService } from "./productService";
export { default as cartService } from "./cartService";
export { default as orderService } from "./orderService";
export { default as checkoutService } from "./checkoutService";
export { default as profileService } from "./profileService";
```

---

## ✅ Step 4.1 Checklist

- [ ] Axios instance configured with:
  - [ ] Base URL from environment
  - [ ] Request interceptors (auth token, cart session)
  - [ ] Response interceptors (token refresh, error handling)
- [ ] Auth Service (register, login, logout, password reset)
- [ ] Product Service (list, search, filters, categories)
- [ ] Cart Service (CRUD operations, coupons, merge)
- [ ] Order Service (list, track, cancel, return)
- [ ] Checkout Service (initialize, shipping, tax, payment)
- [ ] Profile Service (profile, addresses, wishlist)
- [ ] Service index for clean exports

---

## 4.2 Authentication Context (Detailed Discussion)

Authentication in React applications requires careful architecture to manage user state, handle token lifecycle, protect routes, and provide a seamless user experience. Let's explore the complete authentication context system in depth.

---

### 4.2.1 Understanding React Context for Authentication

#### Why Context for Auth?

```
┌─────────────────────────────────────────────────────────────────┐
│                     WITHOUT AUTH CONTEXT                        │
│                                                                 │
│  App ──┬── Header (needs user) ◄── prop drilling               │
│        │        │                                               │
│        │        └── UserMenu (needs user, logout)               │
│        │                                                        │
│        ├── Sidebar (needs user role)                            │
│        │                                                        │
│        └── Routes                                               │
│              ├── Dashboard (needs user)                         │
│              ├── Profile (needs user, updateUser)               │
│              └── Checkout (needs user, isAuthenticated)         │
│                                                                 │
│  Problem: Props must be passed through every intermediate       │
│           component, creating tight coupling and verbosity      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      WITH AUTH CONTEXT                          │
│                                                                 │
│  AuthProvider ◄── Single source of truth                        │
│        │                                                        │
│        └── App                                                  │
│              ├── Header                                         │
│              │     └── UserMenu ◄── useAuth()                   │
│              │                                                  │
│              ├── Sidebar ◄── useAuth()                          │
│              │                                                  │
│              └── Routes                                         │
│                    ├── Dashboard ◄── useAuth()                  │
│                    ├── Profile ◄── useAuth()                    │
│                    └── Checkout ◄── useAuth()                   │
│                                                                 │
│  Solution: Any component can access auth state directly         │
└─────────────────────────────────────────────────────────────────┘
```

#### Authentication State Machine

```
┌─────────────────────────────────────────────────────────────────┐
│                   AUTH STATE MACHINE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ┌──────────┐                                                 │
│    │ INITIAL  │ ─── App loads ───►  ┌──────────────┐            │
│    │ (idle)   │                     │   LOADING    │            │
│    └──────────┘                     │ (checking)   │            │
│                                     └──────┬───────┘            │
│                                            │                    │
│                           ┌────────────────┼────────────────┐   │
│                           ▼                ▼                │   │
│                    ┌────────────┐   ┌────────────┐          │   │
│                    │AUTHENTICATED│   │UNAUTHENTICATED│        │   │
│                    │  (user)    │   │  (guest)   │          │   │
│                    └─────┬──────┘   └──────┬─────┘          │   │
│                          │                 │                │   │
│           ┌──────────────┤                 │                │   │
│           ▼              ▼                 ▼                │   │
│     ┌──────────┐  ┌───────────┐     ┌───────────┐          │   │
│     │  LOGOUT  │  │  REFRESH  │     │   LOGIN   │          │   │
│     │          │  │  TOKEN    │     │           │          │   │
│     └────┬─────┘  └─────┬─────┘     └─────┬─────┘          │   │
│          │              │                 │                │   │
│          ▼              ▼                 ▼                │   │
│    ┌─────────────────────────────────────────────────┐     │   │
│    │        Back to LOADING for verification         │     │   │
│    └─────────────────────────────────────────────────┘     │   │
│                                                             │   │
└─────────────────────────────────────────────────────────────────┘

States:
- IDLE: Initial state before any auth check
- LOADING: Checking authentication status (token refresh, API call)
- AUTHENTICATED: Valid user session exists
- UNAUTHENTICATED: No valid session, guest user
- ERROR: Authentication error occurred
```

---

### 4.2.2 Token Management Strategy

#### Access Token vs Refresh Token

```
┌─────────────────────────────────────────────────────────────────┐
│                    TOKEN ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    ACCESS TOKEN                          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ • Short-lived (15 minutes)                               │   │
│  │ • Stored in memory (JavaScript variable)                 │   │
│  │ • Sent in Authorization header                           │   │
│  │ • Contains user ID, role, permissions                    │   │
│  │ • Lost on page refresh (by design)                       │   │
│  │ • Cannot be accessed by XSS attacks in storage           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   REFRESH TOKEN                          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ • Long-lived (7 days)                                    │   │
│  │ • Stored in httpOnly cookie                              │   │
│  │ • Automatically sent with requests (withCredentials)     │   │
│  │ • Cannot be read by JavaScript (XSS protection)          │   │
│  │ • Used only to obtain new access tokens                  │   │
│  │ • Survives page refresh                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Security Benefits:                                             │
│  ✓ XSS cannot steal refresh token (httpOnly)                   │
│  ✓ Short access token limits exposure window                   │
│  ✓ CSRF protection via SameSite cookie attribute               │
│  ✓ Token rotation on refresh adds extra security               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Token Refresh Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   SILENT TOKEN REFRESH                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User Action                                                    │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────┐                                                │
│  │ API Request │                                                │
│  │ /api/orders │                                                │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────┐                                │
│  │ Axios Request Interceptor   │                                │
│  │ Adds: Bearer {accessToken}  │                                │
│  └──────────────┬──────────────┘                                │
│                 │                                               │
│                 ▼                                               │
│         ┌──────────────┐                                        │
│         │    Server    │                                        │
│         │ Validates JWT│                                        │
│         └──────┬───────┘                                        │
│                │                                                │
│       ┌────────┴────────┐                                       │
│       ▼                 ▼                                       │
│  ┌─────────┐      ┌─────────────┐                               │
│  │ 200 OK  │      │ 401 Expired │                               │
│  │ Return  │      │   Token     │                               │
│  │  Data   │      └──────┬──────┘                               │
│  └─────────┘             │                                      │
│                          ▼                                      │
│               ┌────────────────────┐                            │
│               │ Response Interceptor│                            │
│               │ Detects 401 error  │                            │
│               └─────────┬──────────┘                            │
│                         │                                       │
│                         ▼                                       │
│               ┌────────────────────┐                            │
│               │ POST /auth/refresh │                            │
│               │ (with httpOnly     │                            │
│               │  refresh cookie)   │                            │
│               └─────────┬──────────┘                            │
│                         │                                       │
│            ┌────────────┴────────────┐                          │
│            ▼                         ▼                          │
│     ┌─────────────┐          ┌─────────────┐                    │
│     │ New Access  │          │  Refresh    │                    │
│     │   Token     │          │  Invalid    │                    │
│     └──────┬──────┘          └──────┬──────┘                    │
│            │                        │                           │
│            ▼                        ▼                           │
│     ┌─────────────┐          ┌─────────────┐                    │
│     │ Retry       │          │  Logout     │                    │
│     │ Original    │          │  User       │                    │
│     │ Request     │          │  Redirect   │                    │
│     └─────────────┘          └─────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4.2.3 Auth Context Implementation

**`frontend/src/contexts/AuthContext.jsx`:**

```jsx
import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { authService, cartService, setAccessToken, clearAccessToken } from "../services";

// ============================================
// AUTH STATE TYPES
// ============================================

const AUTH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

// ============================================
// ACTION TYPES
// ============================================

const AUTH_ACTIONS = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAILURE: "AUTH_FAILURE",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  user: null,
  status: AUTH_STATUS.IDLE,
  error: null,
  isAuthenticated: false,
  isLoading: true,
};

// ============================================
// REDUCER
// ============================================

function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_START:
      return {
        ...state,
        status: AUTH_STATUS.LOADING,
        isLoading: true,
        error: null,
      };

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
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// ============================================
// CONTEXT CREATION
// ============================================

const AuthContext = createContext(null);

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // -----------------------------------------
  // Initialize Auth on Mount
  // -----------------------------------------
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: AUTH_ACTIONS.AUTH_START });

      try {
        // Attempt to refresh token (uses httpOnly cookie)
        const token = await authService.refreshToken();

        if (token) {
          // Get user profile with new token
          const user = await authService.getCurrentUser();

          // Merge guest cart if exists
          await cartService.mergeCarts().catch(() => {});

          dispatch({
            type: AUTH_ACTIONS.AUTH_SUCCESS,
            payload: { user },
          });
        } else {
          dispatch({
            type: AUTH_ACTIONS.AUTH_FAILURE,
            payload: { error: null },
          });
        }
      } catch (error) {
        // No valid session - user is guest
        dispatch({
          type: AUTH_ACTIONS.AUTH_FAILURE,
          payload: { error: null }, // Don't show error for initial check
        });
      }
    };

    initializeAuth();

    // Listen for logout events (from axios interceptor)
    const handleLogoutEvent = () => {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    window.addEventListener("auth:logout", handleLogoutEvent);
    return () => window.removeEventListener("auth:logout", handleLogoutEvent);
  }, []);

  // -----------------------------------------
  // Register
  // -----------------------------------------
  const register = useCallback(async (userData) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });

    try {
      const { user } = await authService.register(userData);

      // Merge guest cart
      await cartService.mergeCarts().catch(() => {});

      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: { user },
      });

      return { success: true, user };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, []);

  // -----------------------------------------
  // Login
  // -----------------------------------------
  const login = useCallback(async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });

    try {
      const { user } = await authService.login(credentials);

      // Merge guest cart after login
      await cartService.mergeCarts().catch(() => {});

      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: { user },
      });

      return { success: true, user };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  }, []);

  // -----------------------------------------
  // Logout
  // -----------------------------------------
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAccessToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // -----------------------------------------
  // Update User
  // -----------------------------------------
  const updateUser = useCallback((userData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: { user: userData },
    });
  }, []);

  // -----------------------------------------
  // Refresh User Data
  // -----------------------------------------
  const refreshUser = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: { user },
      });
      return user;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      return null;
    }
  }, []);

  // -----------------------------------------
  // Clear Error
  // -----------------------------------------
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  // -----------------------------------------
  // Check Permissions
  // -----------------------------------------
  const hasPermission = useCallback(
    (permission) => {
      if (!state.user) return false;
      if (state.user.role === "admin") return true;
      return state.user.permissions?.includes(permission) ?? false;
    },
    [state.user]
  );

  const hasRole = useCallback(
    (roles) => {
      if (!state.user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(state.user.role);
    },
    [state.user]
  );

  // -----------------------------------------
  // Memoized Context Value
  // -----------------------------------------
  const value = useMemo(
    () => ({
      // State
      user: state.user,
      status: state.status,
      error: state.error,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,

      // Actions
      register,
      login,
      logout,
      updateUser,
      refreshUser,
      clearError,

      // Helpers
      hasPermission,
      hasRole,
    }),
    [state, register, login, logout, updateUser, refreshUser, clearError, hasPermission, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Export status constants
export { AUTH_STATUS };
```

---

### 4.2.4 Protected Route Components

#### Understanding Route Protection

```
┌─────────────────────────────────────────────────────────────────┐
│                    ROUTE PROTECTION LAYERS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 1: Authentication Check                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Is user logged in?                                      │   │
│  │  YES ─► Proceed to next layer                            │   │
│  │  NO  ─► Redirect to /login (save intended destination)   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Layer 2: Role-Based Access                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Does user have required role?                           │   │
│  │  ADMIN routes: role === 'admin'                          │   │
│  │  CUSTOMER routes: role === 'customer' || 'admin'         │   │
│  │  YES ─► Proceed to next layer                            │   │
│  │  NO  ─► Redirect to /unauthorized                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Layer 3: Permission-Based Access                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Does user have specific permission?                     │   │
│  │  Example: 'orders:manage', 'products:edit'               │   │
│  │  YES ─► Render protected component                       │   │
│  │  NO  ─► Redirect to /unauthorized                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Layer 4: Email Verification (Optional)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Is email verified? (for sensitive operations)           │   │
│  │  YES ─► Render protected component                       │   │
│  │  NO  ─► Redirect to /verify-email                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**`frontend/src/components/auth/ProtectedRoute.jsx`:**

```jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, AUTH_STATUS } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * ProtectedRoute - Guards routes that require authentication
 *
 * @param {ReactNode} children - The protected component(s)
 * @param {string[]} roles - Required roles (optional)
 * @param {string[]} permissions - Required permissions (optional)
 * @param {boolean} requireVerified - Require email verification (optional)
 * @param {string} redirectTo - Custom redirect path (default: /login)
 */
export default function ProtectedRoute({
  children,
  roles,
  permissions,
  requireVerified = false,
  redirectTo = "/login",
}) {
  const { user, isAuthenticated, isLoading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location.pathname, message: "Please login to continue" }}
        replace
      />
    );
  }

  // Check role requirements
  if (roles && roles.length > 0 && !hasRole(roles)) {
    return (
      <Navigate to="/unauthorized" state={{ required: "role", from: location.pathname }} replace />
    );
  }

  // Check permission requirements
  if (permissions && permissions.length > 0) {
    const hasAllPermissions = permissions.every((p) => hasPermission(p));
    if (!hasAllPermissions) {
      return (
        <Navigate
          to="/unauthorized"
          state={{ required: "permission", from: location.pathname }}
          replace
        />
      );
    }
  }

  // Check email verification
  if (requireVerified && !user.emailVerified) {
    return <Navigate to="/verify-email" state={{ from: location.pathname }} replace />;
  }

  // All checks passed - render children
  return children;
}
```

**`frontend/src/components/auth/GuestRoute.jsx`:**

```jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * GuestRoute - Guards routes that should only be accessible to guests
 * (e.g., login, register pages - logged in users shouldn't see these)
 *
 * @param {ReactNode} children - The guest-only component(s)
 * @param {string} redirectTo - Where to redirect authenticated users
 */
export default function GuestRoute({ children, redirectTo = "/" }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Already authenticated - redirect
  if (isAuthenticated) {
    // Redirect to intended destination or default
    const destination = location.state?.from || redirectTo;
    return <Navigate to={destination} replace />;
  }

  // Guest user - render children
  return children;
}
```

**`frontend/src/components/auth/AdminRoute.jsx`:**

```jsx
import ProtectedRoute from "./ProtectedRoute";

/**
 * AdminRoute - Shorthand for admin-only routes
 */
export default function AdminRoute({ children }) {
  return (
    <ProtectedRoute roles={["admin"]} redirectTo="/login">
      {children}
    </ProtectedRoute>
  );
}
```

---

### 4.2.5 Auth Component Index

**`frontend/src/components/auth/index.js`:**

```javascript
export { default as ProtectedRoute } from "./ProtectedRoute";
export { default as GuestRoute } from "./GuestRoute";
export { default as AdminRoute } from "./AdminRoute";
```

---

### 4.2.6 Router Integration

**`frontend/src/router/index.jsx`:**

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute, GuestRoute, AdminRoute } from "../components/auth";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

// Protected Pages
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import AccountPage from "../pages/account/AccountPage";
import ProfilePage from "../pages/account/ProfilePage";
import OrdersPage from "../pages/account/OrdersPage";
import OrderDetailPage from "../pages/account/OrderDetailPage";
import AddressesPage from "../pages/account/AddressesPage";
import WishlistPage from "../pages/account/WishlistPage";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminCustomers from "../pages/admin/AdminCustomers";

// Error Pages
import NotFoundPage from "../pages/NotFoundPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // ========== PUBLIC ROUTES ==========
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:slug", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      // ========== GUEST-ONLY ROUTES ==========
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <GuestRoute>
            <ForgotPasswordPage />
          </GuestRoute>
        ),
      },
      {
        path: "reset-password/:token",
        element: (
          <GuestRoute>
            <ResetPasswordPage />
          </GuestRoute>
        ),
      },
      { path: "verify-email/:token", element: <VerifyEmailPage /> },

      // ========== PROTECTED ROUTES ==========
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-confirmation/:orderNumber",
        element: <OrderConfirmationPage />, // Allow guest access with email
      },

      // Account Routes
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ProfilePage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/:orderId", element: <OrderDetailPage /> },
          { path: "addresses", element: <AddressesPage /> },
          { path: "wishlist", element: <WishlistPage /> },
        ],
      },

      // ========== ERROR ROUTES ==========
      { path: "unauthorized", element: <UnauthorizedPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // ========== ADMIN ROUTES ==========
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "customers", element: <AdminCustomers /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
```

---

### 4.2.7 App Entry Point with Providers

**`frontend/src/App.jsx`:**

```jsx
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./contexts/ToastContext";
import AppRouter from "./router";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
```

---

### 4.2.8 useAuth Hook Usage Examples

```jsx
// ============================================
// Example 1: Login Form Component
// ============================================

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const result = await login(formData);

    if (result.success) {
      // Redirect to intended page or home
      const destination = location.state?.from || '/';
      navigate(destination, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// ============================================
// Example 2: Header with User Menu
// ============================================

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>

        {isAuthenticated ? (
          <div className="user-menu">
            <span>Welcome, {user.firstName}!</span>
            <Link to="/account">My Account</Link>
            <Link to="/account/orders">Orders</Link>
            <Link to="/account/wishlist">Wishlist</Link>

            {hasRole('admin') && (
              <Link to="/admin">Admin Dashboard</Link>
            )}

            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

// ============================================
// Example 3: Conditional Rendering by Role
// ============================================

import { useAuth } from '../../contexts/AuthContext';

export default function ProductActions({ product }) {
  const { isAuthenticated, hasRole, hasPermission } = useAuth();

  return (
    <div className="product-actions">
      <button>Add to Cart</button>

      {isAuthenticated && (
        <button>Add to Wishlist</button>
      )}

      {hasRole('admin') && (
        <Link to={`/admin/products/edit/${product._id}`}>
          Edit Product
        </Link>
      )}

      {hasPermission('products:delete') && (
        <button className="delete-btn">Delete</button>
      )}
    </div>
  );
}
```

---

### 4.2.9 Session Persistence Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 SESSION PERSISTENCE FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Page Load / Refresh                                            │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  1. AuthProvider mounts                                  │   │
│  │  2. Initial state: { isLoading: true, user: null }       │   │
│  │  3. useEffect triggers initializeAuth()                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  POST /api/auth/refresh                                  │   │
│  │  (httpOnly refresh cookie sent automatically)            │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│    ┌────┴────┐                                                  │
│    ▼         ▼                                                  │
│  Valid    Invalid                                               │
│    │         │                                                  │
│    ▼         ▼                                                  │
│  ┌──────┐  ┌──────────────────────────────────────────────┐    │
│  │ New  │  │ No session - user is guest                   │    │
│  │Access│  │ { isLoading: false, isAuthenticated: false } │    │
│  │Token │  └──────────────────────────────────────────────┘    │
│  └──┬───┘                                                       │
│     │                                                           │
│     ▼                                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  GET /api/auth/me                                        │   │
│  │  (with new access token)                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│     │                                                           │
│     ▼                                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  User data received                                      │   │
│  │  { isLoading: false, isAuthenticated: true, user: {...}} │   │
│  └─────────────────────────────────────────────────────────┘   │
│     │                                                           │
│     ▼                                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Merge guest cart (if exists)                            │   │
│  │  POST /api/cart/merge { guestSessionId }                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Timeline:                                                      │
│  ─────────────────────────────────────────────────────────      │
│  0ms        50ms       150ms      200ms                         │
│  │           │           │          │                           │
│  │   Load    │  Refresh  │  Get     │  Ready                    │
│  │   Page    │  Token    │  User    │                           │
│  │           │           │          │                           │
│  └───────────┴───────────┴──────────┴──────────────────────     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ Step 4.2 Checklist

- [ ] Auth Context with useReducer:
  - [ ] State machine (idle, loading, authenticated, unauthenticated)
  - [ ] Actions (register, login, logout, updateUser)
  - [ ] Memoized context value
- [ ] Token Management:
  - [ ] Access token in memory (not localStorage)
  - [ ] Refresh token in httpOnly cookie
  - [ ] Silent token refresh on 401
- [ ] Protected Route Components:
  - [ ] ProtectedRoute (auth + roles + permissions)
  - [ ] GuestRoute (login/register redirect)
  - [ ] AdminRoute (admin-only shorthand)
- [ ] Router Integration:
  - [ ] Public routes
  - [ ] Guest-only routes
  - [ ] Protected routes with role checks
  - [ ] Admin routes
- [ ] App Entry with Provider hierarchy

---

## 4.3 Product Pages (Detailed Discussion)

Product pages are the heart of any e-commerce site. This section covers the complete architecture for browsing, searching, filtering, and viewing products - broken into manageable parts.

---

### 4.3.1 Product Page Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   PRODUCT PAGE ECOSYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    USER JOURNEY                          │   │
│  │                                                          │   │
│  │   Homepage ──► Categories ──► Product List ──► Detail    │   │
│  │       │            │              │              │        │   │
│  │       │            │              │              ▼        │   │
│  │       │            │              │         Add to Cart   │   │
│  │       │            │              │              │        │   │
│  │       │            │              │              ▼        │   │
│  │       └────────────┴──────────────┴─────────► Checkout    │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    PAGE COMPONENTS                       │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                          │   │
│  │   /products                    /products/:slug           │   │
│  │   ┌────────────────────┐      ┌────────────────────┐    │   │
│  │   │   ProductsPage     │      │  ProductDetailPage │    │   │
│  │   │   ├── Filters      │      │  ├── ImageGallery │     │   │
│  │   │   ├── SearchBar    │      │  ├── ProductInfo  │     │   │
│  │   │   ├── SortDropdown │      │  ├── SizeSelector │     │   │
│  │   │   ├── ProductGrid  │      │  ├── AddToCart    │     │   │
│  │   │   │   └── Cards    │      │  ├── Reviews      │     │   │
│  │   │   └── Pagination   │      │  └── Related      │     │   │
│  │   └────────────────────┘      └────────────────────┘    │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    DATA FLOW                             │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                          │   │
│  │   URL Parameters ──► useSearchParams ──► API Call        │   │
│  │         │                                    │            │   │
│  │         │              ┌─────────────────────┘            │   │
│  │         │              ▼                                  │   │
│  │         │         Response                                │   │
│  │         │              │                                  │   │
│  │         ▼              ▼                                  │   │
│  │   Filter State ◄── Products + Pagination                 │   │
│  │         │                                                │   │
│  │         └──────────► Re-render UI                        │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### URL-Driven State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                  URL AS SOURCE OF TRUTH                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Why URL-driven?                                                │
│  ✓ Shareable - Users can share filtered results                │
│  ✓ Bookmarkable - Save searches for later                      │
│  ✓ SEO-friendly - Search engines can index filtered pages      │
│  ✓ Browser history - Back/forward navigation works             │
│  ✓ Server rendering - Can pre-render with filters              │
│                                                                 │
│  URL Structure:                                                 │
│  /products?category=dresses&minPrice=50&maxPrice=200&sort=price │
│            ├─────────┘    ├──────────────────────┘  ├─────────┘ │
│            │              │                         │           │
│            category       price range               sort by     │
│                                                                 │
│  Full Example:                                                  │
│  /products?                                                     │
│    category=dresses&                                            │
│    brand=zara,hm&                                               │
│    size=S,M&                                                    │
│    color=black&                                                 │
│    minPrice=50&                                                 │
│    maxPrice=200&                                                │
│    sortBy=price&                                                │
│    sortOrder=asc&                                               │
│    page=2&                                                      │
│    search=summer                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4.3.2 Custom Hooks for Products

#### useProducts Hook

**`frontend/src/hooks/useProducts.js`:**

```javascript
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../services";

/**
 * Custom hook for fetching and managing products with filters
 *
 * Features:
 * - URL-driven filter state
 * - Automatic data fetching on filter change
 * - Pagination support
 * - Loading and error states
 * - Debounced search
 */
export function useProducts(initialFilters = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse filters from URL
  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams);
    return {
      category: params.category || initialFilters.category || "",
      brand: params.brand ? params.brand.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      color: params.color ? params.color.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      sortBy: params.sortBy || "createdAt",
      sortOrder: params.sortOrder || "desc",
      page: params.page ? Number(params.page) : 1,
      limit: params.limit ? Number(params.limit) : 12,
      search: params.search || "",
      featured: params.featured === "true",
      onSale: params.onSale === "true",
    };
  }, [searchParams, initialFilters]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build API params
      const apiParams = {};

      if (filters.category) apiParams.category = filters.category;
      if (filters.brand.length) apiParams.brand = filters.brand.join(",");
      if (filters.size.length) apiParams.size = filters.size.join(",");
      if (filters.color.length) apiParams.color = filters.color.join(",");
      if (filters.minPrice) apiParams.minPrice = filters.minPrice;
      if (filters.maxPrice) apiParams.maxPrice = filters.maxPrice;
      if (filters.search) apiParams.search = filters.search;
      if (filters.featured) apiParams.featured = true;
      if (filters.onSale) apiParams.onSale = true;

      apiParams.sortBy = filters.sortBy;
      apiParams.sortOrder = filters.sortOrder;
      apiParams.page = filters.page;
      apiParams.limit = filters.limit;

      const data = await productService.getProducts(apiParams);

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch on filter change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update filters (updates URL)
  const updateFilters = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();

      const merged = { ...filters, ...newFilters };

      // Only add non-empty values to URL
      if (merged.category) params.set("category", merged.category);
      if (merged.brand.length) params.set("brand", merged.brand.join(","));
      if (merged.size.length) params.set("size", merged.size.join(","));
      if (merged.color.length) params.set("color", merged.color.join(","));
      if (merged.minPrice) params.set("minPrice", merged.minPrice.toString());
      if (merged.maxPrice) params.set("maxPrice", merged.maxPrice.toString());
      if (merged.search) params.set("search", merged.search);
      if (merged.featured) params.set("featured", "true");
      if (merged.onSale) params.set("onSale", "true");
      if (merged.sortBy !== "createdAt") params.set("sortBy", merged.sortBy);
      if (merged.sortOrder !== "desc") params.set("sortOrder", merged.sortOrder);
      if (merged.page > 1) params.set("page", merged.page.toString());

      setSearchParams(params, { replace: true });
    },
    [filters, setSearchParams]
  );

  // Convenience methods
  const setPage = useCallback((page) => updateFilters({ page }), [updateFilters]);

  const setSort = useCallback(
    (sortBy, sortOrder = "asc") => updateFilters({ sortBy, sortOrder, page: 1 }),
    [updateFilters]
  );

  const setSearch = useCallback((search) => updateFilters({ search, page: 1 }), [updateFilters]);

  const toggleFilter = useCallback(
    (filterType, value) => {
      const current = filters[filterType] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateFilters({ [filterType]: updated, page: 1 });
    },
    [filters, updateFilters]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.category ||
      filters.brand.length > 0 ||
      filters.size.length > 0 ||
      filters.color.length > 0 ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.search ||
      filters.featured ||
      filters.onSale
    );
  }, [filters]);

  return {
    // Data
    products,
    pagination,
    filters,

    // State
    isLoading,
    error,
    hasActiveFilters,

    // Actions
    updateFilters,
    setPage,
    setSort,
    setSearch,
    toggleFilter,
    clearFilters,
    refetch: fetchProducts,
  };
}
```

#### useProduct Hook (Single Product)

**`frontend/src/hooks/useProduct.js`:**

```javascript
import { useState, useEffect, useCallback } from "react";
import { productService } from "../services";

/**
 * Custom hook for fetching a single product
 */
export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);

    try {
      const productData = await productService.getProductBySlug(slug);
      setProduct(productData);

      // Fetch related products
      if (productData._id) {
        const related = await productService.getRelatedProducts(productData._id, 4);
        setRelatedProducts(related);
      }
    } catch (err) {
      setError(err.message || "Product not found");
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    relatedProducts,
    isLoading,
    error,
    refetch: fetchProduct,
  };
}
```

#### useCategories Hook

**`frontend/src/hooks/useCategories.js`:**

```javascript
import { useState, useEffect } from "react";
import { productService } from "../services";

/**
 * Custom hook for fetching product categories
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
```

#### Hooks Index

**`frontend/src/hooks/index.js`:**

```javascript
export { useProducts } from "./useProducts";
export { useProduct } from "./useProduct";
export { useCategories } from "./useCategories";
export { useDebounce } from "./useDebounce";
```

#### useDebounce Hook

**`frontend/src/hooks/useDebounce.js`:**

```javascript
import { useState, useEffect } from "react";

/**
 * Debounce a value - useful for search inputs
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

---

## ✅ Step 4.3.1-4.3.2 Checklist

- [ ] Product page architecture understood
- [ ] URL-driven state management pattern
- [ ] useProducts hook with:
  - [ ] URL parameter parsing
  - [ ] Filter state management
  - [ ] Pagination support
  - [ ] Sort functionality
- [ ] useProduct hook for single product
- [ ] useCategories hook
- [ ] useDebounce hook for search

---

## 🔜 Next: Step 4.3.3 - Product Listing Page Components

In the next part, we'll build:

- ProductsPage main component
- Filter sidebar component
- Product grid component
- Pagination component

---

_Say "4.3.3" or "next" to continue_
