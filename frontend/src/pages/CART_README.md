# 🛒 Cart Page Documentation

## Tổng quan

Trang giỏ hàng (`Cart.jsx`) là một component React đầy đủ chức năng, cung cấp trải nghiệm mua sắm mượt mà cho người dùng.

## 📁 Cấu trúc files

```
frontend/src/
├── pages/
│   ├── Cart.jsx           # Component chính trang giỏ hàng
│   └── Cart.module.css    # Styles cho trang giỏ hàng
├── components/
│   └── cart/
│       ├── index.js                    # Export components
│       ├── ShippingCalculator.jsx      # Component tính phí vận chuyển
│       └── ShippingCalculator.module.css
└── context/
    └── CartContext.jsx    # Context quản lý state giỏ hàng
```

## ✨ Tính năng

### 1. Hiển thị danh sách sản phẩm

- Tên sản phẩm với link đến trang chi tiết
- Ảnh sản phẩm với hiệu ứng hover
- Giá từng sản phẩm (bao gồm giá gốc nếu có sale)
- Số lượng với nút tăng/giảm
- Thành tiền của từng sản phẩm
- Hiển thị thông tin variant (size, màu sắc)

### 2. Quản lý số lượng

- Nút tăng/giảm số lượng
- Giới hạn theo số lượng tồn kho
- Optimistic UI updates (cập nhật ngay lập tức)
- Rollback khi có lỗi

### 3. Xóa sản phẩm

- Xóa từng sản phẩm
- Xóa tất cả với xác nhận
- Animation mượt mà

### 4. Tóm tắt đơn hàng

- Tạm tính
- Phí vận chuyển (miễn phí khi đạt ngưỡng $100)
- Thuế 10%
- Giảm giá (nếu có)
- Tổng cộng

### 5. Mã giảm giá / Voucher

- Nhập và áp dụng mã giảm giá
- Hiển thị mã đã áp dụng với thông tin giảm giá
- Xóa mã giảm giá

### 6. Tính phí vận chuyển

- Component ShippingCalculator độc lập
- Chọn tỉnh/thành phố
- Hiển thị phí vận chuyển ước tính
- Thời gian giao hàng dự kiến
- Phương thức vận chuyển (tiêu chuẩn/nhanh)

### 7. Tiến độ miễn phí vận chuyển

- Progress bar hiển thị tiến độ
- Thông báo số tiền cần mua thêm
- Hiệu ứng khi đạt miễn phí ship

### 8. Sản phẩm đề xuất

- Grid sản phẩm liên quan
- Lọc bỏ sản phẩm đã có trong giỏ
- Responsive grid layout

### 9. Responsive Design

- Desktop: Layout 2 cột (giỏ hàng + tóm tắt)
- Tablet: Layout 1 cột
- Mobile: Giao diện tối ưu với actions inline

## 🎨 UI/UX Features

- **Optimistic Updates**: Cập nhật UI ngay lập tức, rollback nếu lỗi
- **Loading States**: Hiển thị spinner khi đang tải
- **Error Handling**: Toast notifications cho các lỗi
- **Empty State**: Giao diện thân thiện khi giỏ trống
- **Animations**: Hover effects, transitions mượt mà
- **Accessibility**: ARIA labels, keyboard navigation

## 🔧 Cách sử dụng

### Import và sử dụng trong router:

```jsx
import Cart from "@pages/Cart";

// Trong Router
<Route path="cart" element={<Cart />} />;
```

### CartContext cung cấp các methods:

```jsx
const {
  // State
  items, // Danh sách sản phẩm
  subtotal, // Tổng tiền hàng
  total, // Tổng cộng sau thuế, ship
  discount, // Số tiền giảm giá
  coupon, // Mã giảm giá đã áp dụng
  itemCount, // Tổng số lượng
  shipping, // Phí vận chuyển
  tax, // Thuế
  isLoading, // Đang tải
  error, // Lỗi

  // Computed
  isEmpty, // Giỏ trống?
  freeShippingProgress, // % tiến độ free ship
  amountToFreeShipping, // Số tiền cần mua thêm
  freeShippingThreshold, // Ngưỡng free ship ($100)

  // Actions
  addItem, // Thêm sản phẩm
  updateItem, // Cập nhật số lượng
  removeItem, // Xóa sản phẩm
  clearCart, // Xóa tất cả
  applyCoupon, // Áp dụng mã giảm giá
  removeCoupon, // Xóa mã giảm giá
  refreshCart, // Làm mới giỏ hàng
} = useCart();
```

## 📦 Dependencies

- React Router DOM (navigation, Link)
- CartContext (state management)
- AuthContext (kiểm tra đăng nhập)
- ToastContext (notifications)
- CSS Modules (styling)

## 🎯 Tùy chỉnh

### Thay đổi ngưỡng miễn phí vận chuyển:

Sửa trong `CartContext.jsx`:

```jsx
const FREE_SHIPPING_THRESHOLD = 100; // Đổi thành giá trị mong muốn
```

### Thêm tỉnh/thành phố:

Sửa trong `ShippingCalculator.jsx`:

```jsx
const PROVINCES_DATA = [
  { id: "new-city", name: "Tên thành phố", shippingFee: 4.99, days: "2-3" },
  // ...
];
```

### Thay đổi thuế suất:

Sửa trong `CartContext.jsx`:

```jsx
const TAX_RATE = 0.1; // 10%, đổi thành giá trị mong muốn
```

## 🔒 Bảo mật

- Kiểm tra authentication trước khi checkout
- Redirect đến login với return URL
- Validate số lượng trước khi gửi request
- Sanitize user input

## 📱 Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🚀 Performance

- Lazy loading images
- Memoized components và callbacks
- Optimistic UI updates
- Debounced quantity updates (nếu cần)

## 🐛 Troubleshooting

### Giỏ hàng không hiển thị:

1. Kiểm tra CartProvider đã wrap App
2. Kiểm tra API cart endpoint
3. Xem console logs

### Số lượng không cập nhật:

1. Kiểm tra kết nối API
2. Xem network tab trong DevTools
3. Kiểm tra error state

### Mã giảm giá không hoạt động:

1. Kiểm tra API coupon endpoint
2. Xác nhận mã hợp lệ
3. Xem response từ server
