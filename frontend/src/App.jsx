import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@components/layout";
import Home from "@pages/Home";
import FormDemo from "@pages/FormDemo";
import CardDemo from "@pages/CardDemo";
import LoadingDemo from "@pages/LoadingDemo";

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
          <Route path="form-demo" element={<FormDemo />} />
          <Route path="card-demo" element={<CardDemo />} />
          <Route path="*" element={<NotFound />} />
          <Route path="loading-demo" element={<LoadingDemo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
