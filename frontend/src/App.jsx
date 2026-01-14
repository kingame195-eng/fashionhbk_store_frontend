import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@components/layout";
import Home from "@pages/Home";
import Products from "@pages/Products";
import ProductDetail from "@pages/ProductDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import FormDemo from "@pages/FormDemo";
import CardDemo from "@pages/CardDemo";
import LoadingDemo from "@pages/LoadingDemo";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

// Placeholder pages - can be expanded later
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
              {/* Routes with Layout (Header + Footer) */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="form-demo" element={<FormDemo />} />
                <Route path="card-demo" element={<CardDemo />} />
                <Route path="loading-demo" element={<LoadingDemo />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
