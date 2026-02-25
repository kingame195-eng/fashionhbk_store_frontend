# 🛒 Cart Page Documentation

## Overview

The Cart page (`Cart.jsx`) is a fully functional React component that provides a smooth shopping experience for users.

## 📁 File Structure

```
frontend/src/
├── pages/
│   ├── Cart.jsx           # Main cart page component
│   └── Cart.module.css    # Cart page styles
├── components/
│   └── cart/
│       ├── index.js                    # Export components
│       ├── ShippingCalculator.jsx      # Shipping calculator component
│       └── ShippingCalculator.module.css
└── context/
    └── CartContext.jsx    # Cart state management context
```

## ✨ Features

### 1. Product List Display

- Product name with link to detail page
- Product image with hover effect
- Price per product (including original price if on sale)
- Quantity with increase/decrease buttons
- Subtotal per product
- Display variant info (size, color)

### 2. Quantity Management

- Increase/decrease quantity buttons
- Limited by stock quantity
- Optimistic UI updates (instant update)
- Rollback on error

### 3. Remove Products

- Remove individual products
- Clear all with confirmation
- Smooth animation

### 4. Order Summary

- Subtotal
- Shipping fee (free when reaching $100 threshold)
- 10% Tax
- Discount (if any)
- Total

### 5. Discount Code / Voucher

- Enter and apply discount code
- Display applied code with discount info
- Remove discount code

### 6. Shipping Calculator

- Independent ShippingCalculator component
- Select province/city
- Display estimated shipping fee
- Estimated delivery time
- Shipping method (standard/express)

### 7. Free Shipping Progress

- Progress bar showing progress
- Message showing amount needed
- Effect when free shipping is reached

### 8. Recommended Products

- Related products grid
- Filter out products already in cart
- Responsive grid layout

### 9. Responsive Design

- Desktop: 2-column layout (cart + summary)
- Tablet: 1-column layout
- Mobile: Optimized interface with inline actions

## 🎨 UI/UX Features

- **Optimistic Updates**: Update UI immediately, rollback on error
- **Loading States**: Display spinner while loading
- **Error Handling**: Toast notifications for errors
- **Empty State**: Friendly interface when cart is empty
- **Animations**: Hover effects, smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation

## 🔧 Usage

### Import and use in router:

```jsx
import Cart from "@pages/Cart";

// In Router
<Route path="cart" element={<Cart />} />;
```

### CartContext provides these methods:

```jsx
const {
  // State
  items, // Product list
  subtotal, // Subtotal
  total, // Total after tax, shipping
  discount, // Discount amount
  coupon, // Applied coupon code
  itemCount, // Total quantity
  shipping, // Shipping fee
  tax, // Tax
  isLoading, // Loading state
  error, // Error

  // Computed
  isEmpty, // Is cart empty?
  freeShippingProgress, // % progress to free shipping
  amountToFreeShipping, // Amount needed for free shipping
  freeShippingThreshold, // Free shipping threshold ($100)

  // Actions
  addItem, // Add product
  updateItem, // Update quantity
  removeItem, // Remove product
  clearCart, // Clear all
  applyCoupon, // Apply discount code
  removeCoupon, // Remove discount code
  refreshCart, // Refresh cart
} = useCart();
```

## 📦 Dependencies

- React Router DOM (navigation, Link)
- CartContext (state management)
- AuthContext (authentication check)
- ToastContext (notifications)
- CSS Modules (styling)

## 🎯 Customization

### Change free shipping threshold:

Edit in `CartContext.jsx`:

```jsx
const FREE_SHIPPING_THRESHOLD = 100; // Change to desired value
```

### Add provinces/cities:

Edit in `ShippingCalculator.jsx`:

```jsx
const PROVINCES_DATA = [
  { id: "new-city", name: "City Name", shippingFee: 4.99, days: "2-3" },
  // ...
];
```

### Change tax rate:

Edit in `CartContext.jsx`:

```jsx
const TAX_RATE = 0.1; // 10%, change to desired value
```

## 🔒 Security

- Check authentication before checkout
- Redirect to login with return URL
- Validate quantity before sending request
- Sanitize user input

## 📱 Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🚀 Performance

- Lazy loading images
- Memoized components and callbacks
- Optimistic UI updates
- Debounced quantity updates (if needed)

## 🐛 Troubleshooting

### Cart not displaying:

1. Check CartProvider wraps App
2. Check cart API endpoint
3. View console logs

### Quantity not updating:

1. Check API connection
2. View network tab in DevTools
3. Check error state

### Discount code not working:

1. Check coupon API endpoint
2. Confirm code is valid
3. View server response
