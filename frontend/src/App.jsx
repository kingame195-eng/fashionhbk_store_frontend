import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@components/layout";
import { ErrorBoundary } from "@components/common";
import ScrollToTop from "@components/common/ScrollToTop";
import Home from "@pages/Home";
import Products from "@pages/Products";
import ProductDetail from "@pages/ProductDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Profile from "@pages/Profile";
import ForgotPassword from "@pages/ForgotPassword";
import ResetPassword from "@pages/ResetPassword";
import Cart from "@pages/Cart";
import Checkout from "@pages/Checkout";
import OrderConfirmation from "@pages/OrderConfirmation";
import Orders from "@pages/Orders";
import Wishlist from "@pages/Wishlist";
import About from "@pages/About";
import Contact from "@pages/Contact";
import FAQ from "@pages/FAQ";
import FormDemo from "@pages/FormDemo";
import CardDemo from "@pages/CardDemo";
import LoadingDemo from "@pages/LoadingDemo";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { ProtectedRoute, GuestRoute } from "@components/auth";

const NotFound = () => (
  <div style={{ padding: "4rem", textAlign: "center" }}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Routes with Layout (Header + Footer) */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:slug" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="orders" element={<Orders />} />
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
    </ErrorBoundary>
  );
}
