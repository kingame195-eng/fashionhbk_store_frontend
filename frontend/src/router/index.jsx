// Router configuration (not currently used - App.jsx uses inline routing)
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ProtectedRoute, GuestRoute, AdminRoute } from "../components/auth";
// import { createBrowserRouter } from "react-router-dom";
// import Layout from "../components/layout/Layout";

// This file is kept for future expansion when moving to RouterProvider pattern
// Currently, App.jsx handles routing directly with BrowserRouter

export default null;
//         path: "/",
//     element: <MainLayout />,
//     children: [
//       // ========== PUBLIC ROUTES ==========
//       { index: true, element: <HomePage /> },
//       { path: "products", element: <ProductsPage /> },
//       { path: "products/:slug", element: <ProductDetailPage /> },
//       { path: "cart", element: <CartPage /> },
//       { path: "about", element: <AboutPage /> },
//       { path: "contact", element: <ContactPage /> },

//       // ========== GUEST-ONLY ROUTES ==========
//       {
//         path: "login",
//         element: (
//           <GuestRoute>
//             <LoginPage />
//           </GuestRoute>
//         ),
//       },
//       {
//         path: "register",
//         element: (
//           <GuestRoute>
//             <RegisterPage />
//           </GuestRoute>
//         ),
//       },
//       {
//         path: "forgot-password",
//         element: (
//           <GuestRoute>
//             <ForgotPasswordPage />
//           </GuestRoute>
//         ),
//       },
//       {
//         path: "reset-password/:token",
//         element: (
//           <GuestRoute>
//             <ResetPasswordPage />
//           </GuestRoute>
//         ),
//       },
//       { path: "verify-email/:token", element: <VerifyEmailPage /> },

//       // ========== PROTECTED ROUTES ==========
//       {
//         path: "checkout",
//         element: (
//           <ProtectedRoute>
//             <CheckoutPage />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "order-confirmation/:orderNumber",
//         element: <OrderConfirmationPage />, // Allow guest access with email
//       },

//       // Account Routes
//       {
//         path: "account",
//         element: (
//           <ProtectedRoute>
//             <AccountPage />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <ProfilePage /> },
//           { path: "profile", element: <ProfilePage /> },
//           { path: "orders", element: <OrdersPage /> },
//           { path: "orders/:orderId", element: <OrderDetailPage /> },
//           { path: "addresses", element: <AddressesPage /> },
//           { path: "wishlist", element: <WishlistPage /> },
//         ],
//       },

//       // ========== ERROR ROUTES ==========
//       { path: "unauthorized", element: <UnauthorizedPage /> },
//       { path: "*", element: <NotFoundPage /> },
//     ],
//   },

//   // ========== ADMIN ROUTES ==========
//   {
//     path: "/admin",
//     element: (
//       <AdminRoute>
//         <AdminLayout />
//       </AdminRoute>
//     ),
//     children: [
//       { index: true, element: <AdminDashboard /> },
//       { path: "products", element: <AdminProducts /> },
//       { path: "orders", element: <AdminOrders /> },
//       { path: "customers", element: <AdminCustomers /> },
//     ],
//   },
// ]);

// export default function AppRouter() {
//   return <RouterProvider router={router} />;
// }
