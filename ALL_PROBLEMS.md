# Tổng Hợp Lỗi Deploy, Phát Triển & Vận Hành Website

## I. Lỗi Deploy (Triển khai)

### 1. Sai vị trí cài đặt dependencies

- **Nguyên nhân:** Chạy `npm install` ở sai thư mục (không đúng nơi chứa `package.json`).
- **Hậu quả:** Không build được project, thiếu thư viện khi chạy.
- **Khắc phục:** Luôn kiểm tra và chạy `npm install` ở đúng thư mục chứa `package.json` của frontend/backend.

### 2. Không build project trước khi upload

- **Nguyên nhân:** Quên chạy `npm run build` cho frontend.
- **Hậu quả:** Upload mã nguồn chưa build, website không chạy được trên server.
- **Khắc phục:** Luôn build project (`npm run build`) trước khi upload lên server.

### 3. Upload sai thư mục hoặc thiếu file

- **Nguyên nhân:** Upload nhầm thư mục, thiếu file build hoặc file cấu hình.
- **Hậu quả:** Website không hoạt động, lỗi 404 hoặc trắng trang.
- **Khắc phục:** Kiểm tra kỹ thư mục build (thường là `dist` hoặc `build`) và file `.env` trước khi upload.

### 4. Cấu hình Nginx sai hoặc thiếu symlink

- **Nguyên nhân:**
  - Cấu hình Nginx không đúng domain, không proxy đúng port backend.
  - Quên tạo symlink từ `sites-available` sang `sites-enabled`.
- **Hậu quả:**
  - Website trả về 404, không truy cập được API.
  - Nginx không nhận cấu hình mới.
- **Khắc phục:**
  - Kiểm tra kỹ file cấu hình Nginx, chỉ tạo symlink cho domain cần dùng.
  - Sau khi sửa cấu hình, luôn chạy `sudo nginx -t` và `sudo systemctl reload nginx`.

### 5. Chưa cấp SSL hoặc SSL sai domain

- **Nguyên nhân:** Chưa cấp SSL cho subdomain hoặc dùng chứng chỉ sai domain.
- **Hậu quả:** Lỗi bảo mật, không truy cập được qua HTTPS, cảnh báo trên trình duyệt.
- **Khắc phục:**
  - Dùng Let's Encrypt để cấp SSL cho từng domain/subdomain.
  - Kiểm tra lại đường dẫn chứng chỉ trong file cấu hình Nginx.

### 6. Sai endpoint API giữa frontend và backend

- **Nguyên nhân:** Frontend gọi sai endpoint (ví dụ `/products` thay vì `/api/products`).
- **Hậu quả:** Không lấy được dữ liệu, lỗi 404 hoặc lỗi CORS.
- **Khắc phục:**
  - Kiểm tra lại biến môi trường API_URL trong frontend.
  - Đảm bảo backend mount đúng route và Nginx proxy đúng đường dẫn.

### 7. Quên seed dữ liệu hoặc kết nối database sai

- **Nguyên nhân:**
  - Chưa chạy script seed dữ liệu cho database.
  - Sai connection string MongoDB Atlas hoặc chưa whitelist IP server.
- **Hậu quả:** Không có dữ liệu hiển thị, lỗi kết nối database.
- **Khắc phục:**
  - Kiểm tra và seed dữ liệu nếu cần.
  - Đảm bảo connection string đúng và IP server đã được whitelist trên MongoDB Atlas.

### 8. Quên reload/restart dịch vụ sau khi thay đổi

- **Nguyên nhân:** Sửa cấu hình nhưng không reload Nginx hoặc restart backend.
- **Hậu quả:** Thay đổi không có hiệu lực, website vẫn lỗi cũ.
- **Khắc phục:** Sau khi thay đổi cấu hình, luôn reload Nginx và restart backend (pm2).

### 9. Không kiểm tra log khi gặp lỗi

- **Nguyên nhân:** Không xem log backend (pm2 logs) hoặc log Nginx khi website lỗi.
- **Hậu quả:** Không xác định được nguyên nhân, khó khắc phục.
- **Khắc phục:** Luôn kiểm tra log khi gặp lỗi để xác định nguyên nhân và xử lý đúng.

### 10. Frontend không đồng bộ endpoint API với backend

- **Nguyên nhân:** Đường dẫn API trong code frontend không khớp với backend (ví dụ: thiếu `/api` ở đầu endpoint).
- **Hậu quả:** Không lấy được dữ liệu, search và các chức năng liên quan API đều lỗi.
- **Khắc phục:** Kiểm tra và sửa toàn bộ đường dẫn API trong code frontend cho đúng với backend (thường là `/api/products`, `/api/...`).

### 11. Search không hoạt động

- **Nguyên nhân:**
  - Backend chưa hỗ trợ query param `search` hoặc chưa xử lý đúng logic tìm kiếm.
  - Backend trả về dữ liệu không đúng định dạng (không có `data.products`).
- **Hậu quả:** Thanh search không trả về kết quả, luôn rỗng hoặc báo lỗi.
- **Khắc phục:**
  - Kiểm tra backend đã nhận và xử lý tham số `search` chưa.
  - Đảm bảo response backend trả về đúng định dạng frontend cần.

### 12. Quên cập nhật file .env.production khi đổi domain API

- **Nguyên nhân:** Đổi domain API nhưng không cập nhật lại biến `VITE_API_URL` trong `.env.production` của frontend.
- **Hậu quả:** Frontend vẫn gọi API cũ, không lấy được dữ liệu.
- **Khắc phục:** Luôn kiểm tra và cập nhật lại `.env.production` mỗi khi thay đổi domain hoặc endpoint API.

### 13. Deploy thành công nhưng website không thay đổi

- **Nguyên nhân:**
  - Deploy vào sai thư mục so với cấu hình Nginx (ví dụ: deploy vào `/var/www/html` nhưng domain lại dùng `/var/www/fashionhbk.shop/frontend`).
  - Có nhiều block server trong Nginx, mỗi block dùng một thư mục root khác nhau.
  - Trình duyệt bị cache hoặc chưa reload Nginx sau khi deploy.
  - Quyền file/folder không đúng, Nginx không đọc được file mới.
- **Hậu quả:**
  - Website vẫn hiển thị code cũ dù deploy thành công.
- **Khắc phục:**
  - Kiểm tra lại file cấu hình Nginx, xác định đúng block server và thư mục root đang phục vụ cho domain.
  - Sửa file deploy.yml để upload vào đúng thư mục root của domain.
  - Reload lại Nginx sau khi deploy: `sudo systemctl reload nginx`.
  - Xóa cache trình duyệt, thử tab ẩn danh.
  - Kiểm tra quyền file: `sudo chown -R www-data:www-data <thư_mục_root>`.

### 14. Deploy đúng thư mục nhưng vẫn không lên code mới

- **Nguyên nhân:**
  - File index.html mới đã được upload nhưng Nginx vẫn ưu tiên file cũ (index.nginx-debian.html) do cấu hình index chưa đúng.
  - Có nhiều file index trong thư mục, Nginx ưu tiên file không mong muốn.
- **Hậu quả:**
  - Website vẫn hiển thị landing page mặc định của Nginx hoặc code cũ.
- **Khắc phục:**
  - Đảm bảo dòng `index` trong block server ưu tiên `index.html` trước các file khác.
  - Xóa file `index.nginx-debian.html` nếu không dùng nữa.
  - Reload lại Nginx.

### 15. Lỗi quyền file/folder sau khi deploy tự động

- **Nguyên nhân:**
  - File/folder được upload lên server bởi user khác (ví dụ: user 1001), Nginx (www-data) không đọc được.
- **Hậu quả:**
  - Website trắng trang hoặc lỗi 403/404.
- **Khắc phục:**
  - Sau khi deploy, chạy: `sudo chown -R www-data:www-data <thư_mục_root>` để đảm bảo quyền.

### 16. Lỗi cache trình duyệt hoặc cache server

- **Nguyên nhân:**
  - Trình duyệt lưu cache file cũ, kể cả khi đã deploy code mới.
  - Có thể server/proxy (Cloudflare, Nginx cache) cũng cache file cũ.
- **Hậu quả:**
  - Người dùng không thấy code mới.
- **Khắc phục:**
  - Ctrl+F5, thử tab ẩn danh, xóa cache trình duyệt.
  - Nếu dùng proxy/cache server, clear cache server.

### 17. Lỗi Nginx cấu hình nhiều block server, domain trỏ sai

- **Nguyên nhân:**
  - Có nhiều block server, mỗi block dùng một root khác nhau, domain trỏ nhầm block.
- **Hậu quả:**
  - Deploy đúng thư mục nhưng domain vẫn không nhận code mới.
- **Khắc phục:**
  - Kiểm tra kỹ file cấu hình Nginx, xác định block server nào phục vụ cho domain bạn muốn.
  - Deploy đúng thư mục root của block đó.

### 18. Lỗi tìm kiếm sản phẩm bị giới hạn bởi category (Search không trả về kết quả toàn site)

- **Nguyên nhân:**
  - Khi người dùng đang ở trang danh mục (ví dụ: /products?category=women), thực hiện tìm kiếm sẽ vẫn giữ filter category, khiến kết quả chỉ nằm trong danh mục hiện tại.
  - Logic frontend chưa loại bỏ filter category khi có từ khóa tìm kiếm.
  - Sau khi search, người dùng không thể filter theo category khác vì logic setSearch xóa category.
- **Hậu quả:**
  - Người dùng tìm kiếm từ khóa (ví dụ: "kid") nhưng không thấy sản phẩm thuộc danh mục khác (ví dụ: "Kids"), gây hiểu nhầm là không có sản phẩm.
  - Sau khi có kết quả search, không thể lọc thêm theo category.
- **Khắc phục:**
  - Sửa logic `setSearch` trong hook `useProducts.js`: Thêm tham số `clearCategory` để kiểm soát việc xóa category.
  - Khi search từ Header → xóa category để tìm toàn site (clearCategory = true).
  - Khi đang ở trang products và filter → giữ nguyên search query, cho phép kết hợp search + filter.
  - Thêm FilterSidebar vào trang Products để người dùng có thể filter category sau khi search.
- **Cải tiến UX đã thực hiện:**
  - Khi người dùng nhập từ khóa tìm kiếm từ Header, hệ thống sẽ tự động tìm trên toàn bộ sản phẩm (bỏ lọc category).
  - Hiển thị FilterSidebar bên trái để người dùng có thể filter thêm sau khi search.
  - Hiển thị banner thông báo "Searching for ... across all products" hoặc "Searching for ... in [Category]" tùy thuộc vào context.
  - Nút "Clear search" để người dùng dễ dàng xóa từ khóa và quay lại duyệt bình thường.
  - Tiêu đề trang động: hiển thị từ khóa tìm kiếm và/hoặc category đang chọn.

---

## II. Lỗi Phát Triển & Vận Hành

### 1. Lỗi CORS (Cross-Origin Resource Sharing)

- **Nguyên nhân:** allowedOrigins chưa đúng, thiếu domain frontend hoặc cấu hình CORS backend sai.
- **Hậu quả:** Frontend không gọi được API, lỗi trên console trình duyệt.
- **Khắc phục:** Bổ sung domain frontend vào allowedOrigins, kiểm tra lại cấu hình CORS và withCredentials.

### 2. Lỗi biến môi trường (.env) sai

- **Nguyên nhân:** .env backend để CLIENT_URL là localhost thay vì domain thật, hoặc thiếu biến quan trọng.
- **Hậu quả:** Không xác thực được, lỗi CORS, API trả về sai dữ liệu.
- **Khắc phục:** Luôn kiểm tra và cập nhật đúng biến môi trường khi deploy hoặc đổi domain.

### 3. Lỗi Nginx proxy nhầm domain

- **Nguyên nhân:** Nginx proxy nhầm sang API hoặc frontend, hoặc thiếu proxy_pass.
- **Hậu quả:** Không truy cập được API hoặc frontend, lỗi 404 hoặc 502.
- **Khắc phục:** Kiểm tra kỹ file cấu hình Nginx, test lại bằng curl hoặc browser.

### 4. Lỗi không hiển thị dữ liệu do frontend gọi sai endpoint

- **Nguyên nhân:** Frontend gọi sai endpoint (thiếu /api hoặc sai đường dẫn).
- **Hậu quả:** Không hiển thị sản phẩm, dữ liệu rỗng.
- **Khắc phục:** Kiểm tra và sửa lại endpoint trong code frontend.

### 5. Lỗi không đồng bộ dữ liệu giữa frontend và backend

- **Nguyên nhân:** Seed thiếu dữ liệu, backend trả về sai định dạng (không có data.products).
- **Hậu quả:** Frontend không render được dữ liệu, lỗi UI.
- **Khắc phục:** Kiểm tra seed, kiểm tra response backend, đồng bộ định dạng dữ liệu.

### 6. Lỗi xác thực/đăng nhập/đăng xuất

- **Nguyên nhân:** Sai logic xác thực, thiếu token/cookie, backend không trả về đúng thông tin user.
- **Hậu quả:** Không đăng nhập được, mất session, không phân quyền đúng.
- **Khắc phục:** Kiểm tra lại flow xác thực, truyền đúng withCredentials, kiểm tra response backend.

### 7. Lỗi kết nối MongoDB Atlas

- **Nguyên nhân:** Chưa whitelist IP server hoặc sai connection string.
- **Hậu quả:** Backend không kết nối được database, lỗi 500 hoặc timeout.
- **Khắc phục:** Whitelist IP server trên MongoDB Atlas, kiểm tra lại connection string.

### 8. Lỗi không nhận được cookie/token

- **Nguyên nhân:** Thiếu withCredentials ở axios/fetch hoặc cấu hình CORS backend chưa đúng.
- **Hậu quả:** Không xác thực được, mất session.
- **Khắc phục:** Bổ sung withCredentials, kiểm tra lại CORS backend.

### 9. Lỗi giao diện (CSS, responsive) khác giữa local và production

- **Nguyên nhân:** Thiếu file CSS, build production khác local, cache trình duyệt.
- **Hậu quả:** Giao diện vỡ, không giống bản local.
- **Khắc phục:** Kiểm tra lại file build, xóa cache trình duyệt, kiểm tra import CSS.

### 10. Lỗi upload ảnh/file

- **Nguyên nhân:** Backend chưa xử lý multipart/form-data hoặc sai đường dẫn lưu file.
- **Hậu quả:** Upload thất bại, ảnh/file không hiển thị.
- **Khắc phục:** Bổ sung middleware xử lý file (multer, ...), kiểm tra đường dẫn lưu file.

---

## II. Lỗi & Vấn Đề Chức Năng Đăng Nhập/Đăng Ký

### 1. Lỗi import sai đường dẫn AuthContext

- **Mô tả:** Không thể import được hook `useAuth` trong Header hoặc các component khác, gây lỗi build hoặc runtime.
- **Nguyên nhân:** Import sai đường dẫn (`../../contexts/AuthContext` thay vì `../../context/AuthContext`).
- **Cách sửa:** Sửa lại đường dẫn import thành đúng `../../context/AuthContext`.

### 2. Lỗi hiển thị navigation bị dính chữ (HomeShop, LoginRegister)

- **Mô tả:** Thanh menu navigation bị dính chữ, các link không có style, hiển thị "HomeShop" và "LoginRegister" liền nhau.
- **Nguyên nhân:** Có đoạn code thừa các thẻ `<Link>` và `<div>` không có class CSS nằm ngoài danh sách navList.
- **Cách sửa:** Xóa các đoạn code thừa, chỉ render các link trong navList với className đúng.

### 3. Lỗi CSS input bị tràn viền, không thấy chữ khi nhập

- **Mô tả:** Trường input trong form đăng ký/đăng nhập bị tràn viền, khi nhập không thấy chữ hoặc chữ quá nhạt.
- **Nguyên nhân:**
  - Màu chữ input dùng biến CSS không tồn tại (`var(--color-gray-900, #171717)`) nên có thể bị nhạt hoặc không hiển thị.
  - Các container input thiếu thuộc tính `min-width: 0`, `box-sizing: border-box` gây tràn viền khi responsive hoặc khi có lỗi.
- **Cách sửa:**
  - Đặt màu chữ input thành `#000` (đen) rõ ràng.
  - Thêm `min-width: 0`, `width: 100%`, `box-sizing: border-box` cho `.input`, `.inputWrapper`, `.nameRow`, `.inputGroup`.

### 4. Lỗi validate hiển thị viền đỏ bị lệch hoặc tràn

- **Mô tả:** Khi có lỗi validate, viền đỏ của input bị lệch hoặc tràn ra ngoài form.
- **Nguyên nhân:** Thiếu `box-sizing: border-box` và `min-width: 0` ở các container input.
- **Cách sửa:** Thêm các thuộc tính này vào CSS cho các class liên quan.

### 5. Lỗi UX: Không thấy rõ placeholder hoặc text khi nhập

- **Mô tả:** Placeholder hoặc text trong input quá nhạt, khó nhìn.
- **Nguyên nhân:** Màu placeholder hoặc text dùng biến màu xám nhạt.
- **Cách sửa:** Đặt màu chữ input là đen, placeholder giữ màu xám nhưng tăng độ tương phản nếu cần.

### 6. Lỗi responsive: Form bị vỡ layout trên mobile

- **Mô tả:** Form đăng ký/đăng nhập bị vỡ layout, input tràn ra ngoài trên màn hình nhỏ.
- **Nguyên nhân:** Các grid input thiếu `min-width: 0`, không set `width: 100%`.
- **Cách sửa:** Đảm bảo các input, group, row đều có `min-width: 0` và `width: 100%`.

---

## Phân tích lỗi Pagination & Nhật ký sửa chi tiết

### 1. Sử dụng sai component

- Route `/products` trong App.jsx dùng `Products.jsx`, nhưng bạn lại sửa và test ở `ProductsPage.jsx`.
- Mọi thay đổi ở `ProductsPage.jsx` không có tác dụng thực tế.

### 2. Cấu trúc pagination không khớp với API

- **API trả về:**
  ```json
  {
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalProducts": 26,
      "limit": 12,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
  ```
- **Code cũ trong Products.jsx:**
  ```js
  pagination = { page: 1, pages: 0, total: 0 };
  ```
- **Sửa lại:**
  - Dùng trực tiếp các biến từ API: `pagination.currentPage`, `pagination.totalPages`, `pagination.totalProducts`, `pagination.hasNextPage`.

### 3. Logic phân trang cũ, không hỗ trợ "Xem thêm"

- **Code cũ:**
  ```jsx
  {pagination.pages > 1 && (
    <div className={styles.pagination}>
      <button onClick={() => setPage(pagination.page - 1)} ...>Previous</button>
      <div className={styles.pageNumbers}>
        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => setPage(page)} ...>{page}</button>
        ))}
      </div>
      <button onClick={() => setPage(pagination.page + 1)} ...>Next</button>
    </div>
  )}
  ```
- **Sửa lại:**
  ```jsx
  {hasMore && (
    <div className={styles.loadMoreWrapper}>
      <button
        onClick={loadMore}
        disabled={isLoadingMore}
        className={styles.loadMoreBtn}
      >
        {isLoadingMore ? (
          <>
            <span className={styles.loadMoreSpinner}></span>
            Đang tải...
          </>
        ) : (
          <>
            Xem thêm {remainingProducts} sản phẩm
            <svg width="18" height="18" ...>
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </>
        )}
      </button>
    </div>
  )}
  ```

### 4. Thiếu biến/hàm hỗ trợ "Xem thêm"

- **Code cũ chỉ có:** `setPage`, `setSort`, `setSearch`, `clearFilters`
- **Sửa lại:** Thêm các biến/hàm từ hook mới:
  ```js
  const {
    products = [],
    pagination,
    filters,
    isLoading,
    isLoadingMore,
    error,
    hasActiveFilters,
    hasMore,
    remainingProducts,
    setSort,
    setSearch,
    clearFilters,
    loadMore,
  } = useProducts();
  ```

### 5. Hiển thị số sản phẩm tổng bị sai

- **Code cũ:**
  ```jsx
  <div className={styles.resultsInfo}>
    Showing {products.length} of {pagination.total} products
  </div>
  ```
- **Sửa lại:**
  ```jsx
  <div className={styles.resultsInfo}>
    Đang hiển thị {products.length} trên tổng {pagination?.totalProducts || 0} sản phẩm
  </div>
  ```

### 6. Thiếu CSS cho nút "Xem thêm"

- **Code cũ:** Chỉ có `.loadMoreBtn`, thiếu `.loadMoreWrapper` và `.loadMoreSpinner`
- **Sửa lại:** Thêm vào Products.module.css:

  ```css
  .loadMoreWrapper {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  .loadMoreBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  }

  .loadMoreBtn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }

  .loadMoreSpinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  ```

### 7. Hook useProducts đã sửa đúng nhưng chưa được sử dụng đầy đủ

- Hook đã trả về các biến/hàm mới, nhưng component cũ không dùng.

### 8. Kết quả cuối cùng

- Sau khi sửa lại từng dòng như trên, nút "Xem thêm X sản phẩm ↓" đã xuất hiện đúng, logic phân trang hoạt động chuẩn xác, hiển thị số sản phẩm đúng với backend.

---

## III. Lỗi Phát Triển Frontend (React/Vite)

### 1. Lỗi 404 (Not Found) khi gọi API Login/Refresh Token

- **Mô tả:** Khi gửi request đăng nhập hoặc refresh token, nhận được lỗi 404:

  ```
  POST http://localhost:3000/auth/refresh 404 (Not Found)
  POST http://localhost:3000/auth/login 404 (Not Found)
  ```

  Request đang gửi đến port 3000 (frontend) thay vì port 5000 (backend).

- **Nguyên nhân:**
  - File `.env.development` cấu hình sai `VITE_API_URL`:
    ```
    VITE_API_URL=http://localhost:3000
    ```
  - URL này trỏ đến frontend (port 3000) thay vì sử dụng proxy của Vite để chuyển request đến backend (port 5000).
  - Vite đã có cấu hình proxy trong `vite.config.js` để forward `/api` → `http://localhost:5000`, nhưng `VITE_API_URL` không sử dụng path `/api`.

- **Mã nguồn trước khi sửa:**

  **File: `.env.development`**

  ```env
  # Development environment
  VITE_API_URL=http://localhost:3000
  VITE_APP_NAME=Fashion Store (Dev)
  VITE_ENABLE_ANALYTICS=false
  ```

- **Mã nguồn sau khi sửa:**

  **File: `.env.development`**

  ```env
  # Development environment
  # Use relative path /api to leverage Vite's proxy configuration
  # Vite proxy will forward /api requests to http://localhost:5000
  VITE_API_URL=/api
  VITE_APP_NAME=Fashion Store (Dev)
  VITE_ENABLE_ANALYTICS=false
  ```

- **Cách khắc phục:**
  1. Sửa `VITE_API_URL=/api` để sử dụng relative path.
  2. Vite proxy sẽ tự động forward tất cả request `/api/*` đến `http://localhost:5000`.
  3. Restart dev server sau khi thay đổi file `.env`: `npm run dev`.
  4. Đảm bảo backend đang chạy ở port 5000 với các endpoint `/api/auth/login`, `/api/auth/refresh`.

---

### 2. Lỗi TypeError: showToast is not a function

- **Mô tả:** Khi submit form đăng nhập, gặp lỗi:

  ```
  Uncaught (in promise) TypeError: showToast is not a function
  at handleSubmit (Login.jsx:164:7)
  ```

- **Nguyên nhân:**
  - Component `Login.jsx` sử dụng `const { showToast } = useToast();`
  - Nhưng `ToastContext.jsx` không export method `showToast`, chỉ export: `addToast`, `showSuccess`, `showError`, `showWarning`, `showInfo`.
  - Khi destructure `showToast` từ context, giá trị trả về là `undefined`, gây lỗi khi gọi như function.

- **Mã nguồn trước khi sửa:**

  **File: `src/context/ToastContext.jsx`**

  ```jsx
  // -----------------------------------------
  // Memoized Context Value
  // -----------------------------------------
  const value = useMemo(
    () => ({
      // State
      toasts: state.toasts,

      // Actions
      addToast,
      removeToast,
      clearAllToasts,

      // Convenience methods
      showSuccess,
      showError,
      showWarning,
      showInfo,
    }),
    [
      state.toasts,
      addToast,
      removeToast,
      clearAllToasts,
      showSuccess,
      showError,
      showWarning,
      showInfo,
    ]
  );
  ```

- **Mã nguồn sau khi sửa:**

  **File: `src/context/ToastContext.jsx`**

  ```jsx
  // -----------------------------------------
  // Generic showToast method (commonly used)
  // -----------------------------------------
  const showToast = useCallback(
    (message, type = TOAST_TYPES.INFO, duration) => addToast(message, type, duration),
    [addToast]
  );

  // -----------------------------------------
  // Memoized Context Value
  // -----------------------------------------
  const value = useMemo(
    () => ({
      // State
      toasts: state.toasts,

      // Actions
      addToast,
      removeToast,
      clearAllToasts,

      // Generic method
      showToast,

      // Convenience methods
      showSuccess,
      showError,
      showWarning,
      showInfo,
    }),
    [
      state.toasts,
      addToast,
      removeToast,
      clearAllToasts,
      showToast,
      showSuccess,
      showError,
      showWarning,
      showInfo,
    ]
  );
  ```

- **Cách khắc phục:**
  1. Thêm method `showToast` vào `ToastContext.jsx` để wrap `addToast` với signature phổ biến: `showToast(message, type, duration)`.
  2. Export `showToast` trong context value.
  3. Hoặc có thể sửa `Login.jsx` để dùng `showSuccess`/`showError` thay vì `showToast`:

     ```jsx
     // Thay vì:
     showToast("Welcome back!", "success");

     // Dùng:
     showSuccess("Welcome back!");
     ```

---

### 3. Best Practices để tránh lỗi tương tự

#### 3.1. Cấu hình Environment Variables

- **Development:** Sử dụng relative path `/api` để tận dụng Vite proxy.
- **Production:** Sử dụng full URL của backend API.
- **Ví dụ cấu hình:**

  **`.env.development`**

  ```env
  VITE_API_URL=/api
  ```

  **`.env.production`**

  ```env
  VITE_API_URL=https://api.yourdomain.com/api
  ```

#### 3.2. Kiểm tra Context exports trước khi sử dụng

- Luôn kiểm tra xem method có được export từ context hay không.
- Sử dụng TypeScript để có autocomplete và type checking.
- Nếu không dùng TypeScript, kiểm tra file context để xác nhận các method available.

#### 3.3. Vite Proxy Configuration

- Đảm bảo `vite.config.js` có proxy configuration đúng:
  ```js
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  }
  ```

---

### 4. Lỗi CORS "Not allowed by CORS" trong Development

- **Mô tả:** Khi gọi API login/refresh, nhận được lỗi:

  ```
  Not allowed by CORS
  POST http://localhost:3000/api/auth/login 500 (Internal Server Error)
  ```

- **Nguyên nhân:**
  - Backend CORS config (`cors.js`) chỉ cho phép các origin cố định:
    ```javascript
    const allowedOrigins = [
      process.env.CLIENT_URL || "http://localhost:3000",
      "https://fashionhbk.shop",
      "https://www.fashionhbk.shop",
    ];
    ```
  - Nhưng frontend có thể chạy trên port khác (3001, 5173, v.v.) khi port 3000 bị chiếm.
  - Hoặc `.env` của backend có `CLIENT_URL=https://fashionhbk.shop` (production) thay vì localhost.

- **Mã nguồn trước khi sửa:**

  **File: `backend/src/config/cors.js`**

  ```javascript
  const allowedOrigins = [
    process.env.CLIENT_URL || "http://localhost:3000",
    "https://fashionhbk.shop",
    "https://www.fashionhbk.shop",
  ];
  ```

- **Mã nguồn sau khi sửa:**

  **File: `backend/src/config/cors.js`**

  ```javascript
  const allowedOrigins = [
    process.env.CLIENT_URL || "http://localhost:3000",
    // Development origins - Vite default ports
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    // Production origins
    "https://fashionhbk.shop",
    "https://www.fashionhbk.shop",
  ];
  ```

- **Cách khắc phục:**
  1. Thêm tất cả các localhost port phổ biến vào `allowedOrigins`.
  2. Hoặc trong development, có thể cho phép tất cả localhost:

     ```javascript
     origin: (origin, callback) => {
       // Allow requests with no origin (mobile apps, curl, etc.)
       if (!origin) return callback(null, true);

       // Allow all localhost in development
       if (
         process.env.NODE_ENV === "development" &&
         (origin.includes("localhost") || origin.includes("127.0.0.1"))
       ) {
         return callback(null, true);
       }

       if (allowedOrigins.includes(origin)) {
         callback(null, true);
       } else {
         callback(new Error("Not allowed by CORS"));
       }
     };
     ```

  3. Restart backend sau khi sửa.

---

### 5. Lỗi 500 Internal Server Error khi gọi API

- **Mô tả:** API trả về lỗi 500 kèm theo lỗi CORS.

- **Nguyên nhân:**
  - Lỗi CORS xảy ra trước khi request đến được controller.
  - Khi CORS middleware throw error `"Not allowed by CORS"`, Express sẽ trả về 500.
  - Có thể có lỗi logic trong controller (ví dụ: `refreshAccessToken` không tìm thấy user, database connection fail).

- **Cách khắc phục:**
  1. **Fix CORS trước** (xem mục 4 ở trên).
  2. Kiểm tra log backend để xem lỗi chi tiết:

     ```bash
     # Nếu dùng pm2
     pm2 logs backend

     # Nếu chạy trực tiếp
     npm run dev  # Xem console output
     ```

  3. Kiểm tra database connection:
     ```javascript
     // Đảm bảo MongoDB đang chạy và connection string đúng
     MONGODB_URI=mongodb://localhost:27017/fashion-store
     ```
  4. Kiểm tra controller có handle error đúng không:
     ```javascript
     // Trong authController.js
     export const refreshAccessToken = async (req, res) => {
       try {
         const refreshToken = req.cookies.refreshToken;
         if (!refreshToken) {
           return res.status(401).json({ message: "No refresh token" });
         }
         // ... logic
       } catch (error) {
         console.error("Refresh token error:", error);
         return res.status(500).json({ message: "Internal server error" });
       }
     };
     ```

---

### 6. Lưu ý quan trọng về Port Configuration

- **Backend** thường chạy trên port **5000** (hoặc theo `PORT` trong `.env`).
- **Frontend (Vite)** mặc định chạy trên port **5173**, hoặc **3000** nếu config.
- **Khi port bị chiếm**, Vite tự động chuyển sang port khác (3001, 5174, v.v.).

- **Checklist khi gặp lỗi kết nối:**
  1. ✅ Backend đang chạy? (`npm run dev` trong thư mục backend)
  2. ✅ Backend chạy đúng port? (kiểm tra console output)
  3. ✅ Frontend `VITE_API_URL` đúng? (`/api` cho development)
  4. ✅ Vite proxy target đúng port backend? (`http://localhost:5000`)
  5. ✅ CORS config backend cho phép origin của frontend?

---

### 7. Lỗi "Route not found" khi gọi API Auth (Login, Register, Refresh)

- **Mô tả:** Khi gọi API đăng nhập hoặc refresh token, nhận được response:

  ```json
  { "success": false, "message": "Route not found" }
  ```

  URL: `http://localhost:3000/api/auth/refresh` hoặc `http://localhost:3000/api/auth/login`

- **Nguyên nhân:**
  1. **Backend chưa được tạo hoặc chưa chạy**: Repo chỉ có frontend, backend cần được tạo riêng theo hướng dẫn trong `FASHION_FULLSTACK_GUIDE.md`.
  2. **Backend chưa mount route auth**: File `routes/index.js` chưa có `router.use("/auth", authRoutes)`.
  3. **Backend chưa mount routes vào app**: File `server.js` chưa có `app.use("/api", routes)`.
  4. **Controller chưa được export/import đúng**: `refreshAccessToken` chưa được export từ `authController.js`.

- **Cấu trúc route đúng trong Backend:**

  **File: `backend/src/routes/authRoutes.js`**

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

  **File: `backend/src/routes/index.js`**

  ```javascript
  import express from "express";
  import authRoutes from "./authRoutes.js";

  const router = express.Router();

  // Mount routes
  router.use("/auth", authRoutes);

  export default router;
  ```

  **File: `backend/src/server.js`**

  ```javascript
  import routes from "./routes/index.js";

  // Mount API routes
  app.use("/api", routes);

  // 404 handler - phải đặt sau tất cả routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  });
  ```

- **Cách khắc phục:**
  1. **Tạo backend** theo hướng dẫn trong `FASHION_FULLSTACK_GUIDE.md` (Part 2-3).
  2. Đảm bảo cấu trúc thư mục:
     ```
     backend/
     ├── src/
     │   ├── controllers/
     │   │   └── authController.js
     │   ├── routes/
     │   │   ├── authRoutes.js
     │   │   └── index.js
     │   ├── middleware/
     │   │   └── auth.js
     │   └── server.js
     └── package.json
     ```
  3. Chạy backend: `cd backend && npm run dev`
  4. Kiểm tra backend đang chạy đúng port 5000.
  5. Kiểm tra console backend có log route được mount không.

- **Debug tips:**

  ```bash
  # Kiểm tra backend có chạy không
  curl http://localhost:5000/api/auth/login -X POST -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"123456"}'

  # Nếu trả về "Route not found" → Backend chưa mount route auth
  # Nếu trả về lỗi khác (401, 400) → Route đã có, lỗi ở logic
  ```

---

### 8. Checklist hoàn chỉnh cho tính năng Đăng nhập/Đăng ký

| #   | Kiểm tra                                     | Trạng thái |
| --- | -------------------------------------------- | ---------- |
| 1   | Backend đã được tạo và có thư mục `backend/` | ⬜         |
| 2   | Backend đang chạy trên port 5000             | ⬜         |
| 3   | Route `/api/auth/login` đã được mount        | ⬜         |
| 4   | Route `/api/auth/register` đã được mount     | ⬜         |
| 5   | Route `/api/auth/refresh` đã được mount      | ⬜         |
| 6   | MongoDB đang chạy và kết nối được            | ⬜         |
| 7   | CORS config cho phép origin frontend         | ⬜         |
| 8   | Frontend `VITE_API_URL=/api` (development)   | ⬜         |
| 9   | Vite proxy target `http://localhost:5000`    | ⬜         |
| 10  | `ToastContext` có export `showToast`         | ⬜         |

---

## IV. Lỗi Trang Profile, Logout & Route Guards

### 1. Trang Profile không tồn tại

- **Mô tả:** Khi người dùng đăng nhập và click vào "Profile" hoặc truy cập `/profile`, trang trắng hoặc lỗi 404.

- **Nguyên nhân:**
  - File `Profile.jsx` và `Profile.module.css` chưa được tạo.
  - Route `/profile` chưa được đăng ký trong `App.jsx`.

- **Mã nguồn trước khi sửa:**

  **File: `App.jsx` (không có route profile)**

  ```jsx
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetailPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* Không có route /profile */}
    </Route>
  </Routes>
  ```

- **Mã nguồn sau khi sửa:**

  **File: `App.jsx`**

  ```jsx
  import Profile from "./pages/Profile";
  import { ProtectedRoute, GuestRoute } from "./components/auth";

  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetailPage />} />

      {/* Guest-only routes */}
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

      {/* Protected routes */}
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Route>
  </Routes>;
  ```

  **File: `Profile.jsx` (mới tạo)**

  ```jsx
  import { useState, useEffect } from "react";
  import { useAuth } from "../context/AuthContext";
  import { useToast } from "../context/ToastContext";
  import { useNavigate } from "react-router-dom";
  import profileService from "../services/profileService";
  import styles from "./Profile.module.css";

  export default function Profile() {
    const { user, logout } = useAuth();
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile");
    // ... full implementation with tabs: Profile, Security, Orders, Wishlist
  }
  ```

- **Cách khắc phục:**
  1. Tạo file `src/pages/Profile.jsx` với đầy đủ chức năng: xem/sửa thông tin, đổi mật khẩu, xem đơn hàng, wishlist, logout.
  2. Tạo file `src/pages/Profile.module.css` với styling chuyên nghiệp.
  3. Import và thêm route `/profile` trong `App.jsx`.
  4. Bọc route bằng `<ProtectedRoute>` để yêu cầu đăng nhập.

---

### 2. Chức năng Logout không hoạt động

- **Mô tả:** Nút "Logout" trong Header không có hiệu ứng khi click, hoặc không có nút Logout.

- **Nguyên nhân:**
  - Header component không có user menu dropdown.
  - Không có `onClick` handler cho nút logout.
  - Không gọi `logout()` từ AuthContext.

- **Mã nguồn trước khi sửa:**

  **File: `Header.jsx` (chỉ có nút Login/Register)**

  ```jsx
  {
    user ? (
      <span className={styles.userName}>{user.firstName}</span>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    );
  }
  ```

- **Mã nguồn sau khi sửa:**

  **File: `Header.jsx`**

  ```jsx
  import { useAuth } from "../../context/AuthContext";
  import { useToast } from "../../context/ToastContext";

  export default function Header() {
    const { user, logout } = useAuth();
    const { showSuccess } = useToast();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = async () => {
      try {
        await logout();
        showSuccess("Đăng xuất thành công!");
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
      setIsUserMenuOpen(false);
    };

    return (
      // ... header content
      {user ? (
        <div className={styles.userMenuWrapper}>
          <button
            className={styles.userMenuButton}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className={styles.userAvatar}>
              {user.firstName?.charAt(0).toUpperCase()}
            </div>
          </button>

          {isUserMenuOpen && (
            <div className={styles.userDropdown}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownName}>
                  {user.firstName} {user.lastName}
                </span>
                <span className={styles.dropdownEmail}>{user.email}</span>
              </div>
              <div className={styles.dropdownDivider}></div>
              <Link to="/profile" className={styles.dropdownItem}>
                <UserIcon /> Trang cá nhân
              </Link>
              <Link to="/profile?tab=orders" className={styles.dropdownItem}>
                <OrderIcon /> Đơn hàng
              </Link>
              <button onClick={handleLogout} className={styles.logoutLink}>
                <LogoutIcon /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        // Login/Register links
      )}
    );
  }
  ```

- **Cách khắc phục:**
  1. Import `useAuth` và `useToast` vào Header.
  2. Tạo state `isUserMenuOpen` để toggle dropdown menu.
  3. Tạo function `handleLogout` gọi `logout()` từ AuthContext.
  4. Thêm dropdown menu với các link: Profile, Orders, Wishlist, Logout.
  5. Thêm CSS cho dropdown menu trong `Header.module.css`.

---

### 3. ProtectedRoute và GuestRoute không hoạt động

- **Mô tả:**
  - Người dùng chưa đăng nhập vẫn truy cập được `/profile`.
  - Người dùng đã đăng nhập vẫn thấy trang `/login`, `/register`.

- **Nguyên nhân:**
  - `ProtectedRoute.jsx` và `GuestRoute.jsx` sử dụng placeholder code, không kết nối với `AuthContext` thực.
  - Luôn return `true` hoặc hardcode user, không kiểm tra trạng thái đăng nhập thực sự.

- **Mã nguồn trước khi sửa:**

  **File: `ProtectedRoute.jsx` (placeholder)**

  ```jsx
  import { Navigate, Outlet } from "react-router-dom";

  const ProtectedRoute = ({ children }) => {
    // TODO: Replace with actual auth check
    const isAuthenticated = true; // Hardcoded - luôn cho phép

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children || <Outlet />;
  };

  export default ProtectedRoute;
  ```

  **File: `GuestRoute.jsx` (placeholder)**

  ```jsx
  import { Navigate, Outlet } from "react-router-dom";

  const GuestRoute = ({ children }) => {
    // TODO: Replace with actual auth check
    const isAuthenticated = false; // Hardcoded - luôn là guest

    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return children || <Outlet />;
  };

  export default GuestRoute;
  ```

- **Mã nguồn sau khi sửa:**

  **File: `ProtectedRoute.jsx`**

  ```jsx
  import { Navigate, Outlet, useLocation } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext";
  import LoadingSpinner from "../common/LoadingSpinner";

  const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    // Show loading while checking auth status
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <LoadingSpinner size="large" />
        </div>
      );
    }

    // Redirect to login if not authenticated
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children || <Outlet />;
  };

  export default ProtectedRoute;
  ```

  **File: `GuestRoute.jsx`**

  ```jsx
  import { Navigate, Outlet, useLocation } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext";
  import LoadingSpinner from "../common/LoadingSpinner";

  const GuestRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    // Show loading while checking auth status
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <LoadingSpinner size="large" />
        </div>
      );
    }

    // Redirect to home (or previous page) if already authenticated
    if (user) {
      const from = location.state?.from?.pathname || "/";
      return <Navigate to={from} replace />;
    }

    return children || <Outlet />;
  };

  export default GuestRoute;
  ```

- **Cách khắc phục:**
  1. Import `useAuth` từ `AuthContext` trong cả 2 file.
  2. Sử dụng `user` và `isLoading` từ context để kiểm tra trạng thái thực.
  3. Hiển thị loading spinner khi đang kiểm tra auth.
  4. ProtectedRoute: Redirect về `/login` nếu chưa đăng nhập.
  5. GuestRoute: Redirect về `/` (hoặc trang trước đó) nếu đã đăng nhập.

---

### 4. Backend thiếu Profile API Routes

- **Mô tả:** Khi frontend gọi API cập nhật profile hoặc đổi mật khẩu, nhận được lỗi 404.

- **Nguyên nhân:**
  - Backend chưa có file `profileRoutes.js`.
  - Chưa mount route `/api/profile` trong `routes/index.js`.

- **Mã nguồn trước khi sửa:**

  **File: `routes/index.js` (không có profile routes)**

  ```javascript
  import authRoutes from "./authRoutes.js";
  import productRoutes from "./productRoutes.js";

  router.use("/auth", authRoutes);
  router.use("/products", productRoutes);
  // Không có /profile
  ```

- **Mã nguồn sau khi sửa:**

  **File: `routes/profileRoutes.js` (mới tạo)**

  ```javascript
  import express from "express";
  import { protect } from "../middleware/auth.js";
  import User from "../models/User.js";
  import bcrypt from "bcrypt";

  const router = express.Router();

  // GET /api/profile - Get current user profile
  router.get("/", protect, async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // PATCH /api/profile - Update profile info
  router.patch("/", protect, async (req, res) => {
    try {
      const { firstName, lastName, phone } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { firstName, lastName, phone },
        { new: true, runValidators: true }
      ).select("-password");
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // PATCH /api/profile/password - Change password
  router.patch("/password", protect, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user._id).select("+password");

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  export default router;
  ```

  **File: `routes/index.js` (đã thêm profile)**

  ```javascript
  import authRoutes from "./authRoutes.js";
  import productRoutes from "./productRoutes.js";
  import profileRoutes from "./profileRoutes.js";

  router.use("/auth", authRoutes);
  router.use("/products", productRoutes);
  router.use("/profile", profileRoutes);
  ```

- **Cách khắc phục:**
  1. Tạo file `routes/profileRoutes.js` với các endpoints: GET `/`, PATCH `/`, PATCH `/password`.
  2. Sử dụng middleware `protect` để yêu cầu đăng nhập.
  3. Import và mount routes trong `routes/index.js`.

---

### 5. Lỗi Import sai package bcryptjs thay vì bcrypt

- **Mô tả:** Backend báo lỗi khi chạy:

  ```
  Error: Cannot find module 'bcryptjs'
  ```

- **Nguyên nhân:**
  - Code import `bcryptjs` nhưng package được cài là `bcrypt`.
  - Hai package này có API tương tự nhưng tên khác nhau.

- **Mã nguồn trước khi sửa:**

  **File: `profileRoutes.js`**

  ```javascript
  import bcrypt from "bcryptjs"; // SAI - package không tồn tại
  ```

- **Mã nguồn sau khi sửa:**

  **File: `profileRoutes.js`**

  ```javascript
  import bcrypt from "bcrypt"; // ĐÚNG - package đã cài trong package.json
  ```

- **Cách khắc phục:**
  1. Kiểm tra `package.json` xem package nào được cài: `bcrypt` hay `bcryptjs`.
  2. Sửa import cho khớp với package đã cài.
  3. Nếu cần dùng `bcryptjs`, chạy: `npm install bcryptjs`.

---

### 6. CSS Profile Page không chuyên nghiệp, khó nhìn

- **Mô tả:** Trang Profile có giao diện lỗi thời, màu sắc không nhất quán, thiếu hiệu ứng hover, spacing không đều.

- **Nguyên nhân:**
  - CSS sử dụng màu nền tối, không phù hợp với design system.
  - Thiếu border-radius, box-shadow cho các thành phần.
  - Buttons không có gradient, hover effects.
  - Font sizes và spacing không theo design tokens.

- **Mã nguồn trước khi sửa:**

  **File: `Profile.module.css` (một phần)**

  ```css
  .container {
    min-height: calc(100vh - var(--header-height));
    background-color: #1a1a1a; /* Nền tối */
    padding: 20px;
  }

  .sidebar {
    background: #2a2a2a; /* Tối */
    padding: 15px;
  }

  .navItem {
    padding: 10px;
    color: #999;
    background: none;
  }

  .navItem.active {
    background: #333;
    color: white;
  }

  .saveBtn {
    padding: 10px 20px;
    background: green;
    color: white;
  }
  ```

- **Mã nguồn sau khi sửa:**

  **File: `Profile.module.css` (cải tiến)**

  ```css
  .container {
    min-height: calc(100vh - var(--header-height));
    background-color: #f8f9fa; /* Nền sáng, dễ nhìn */
    padding: var(--space-6) var(--space-4);
  }

  .sidebar {
    background-color: var(--color-white);
    border-radius: var(--radius-xl); /* Bo góc */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); /* Shadow mềm */
    padding: var(--space-6);
    border: 1px solid rgba(0, 0, 0, 0.04);
  }

  .avatar {
    width: 88px;
    height: 88px;
    border-radius: var(--radius-full);
    background: linear-gradient(145deg, var(--color-accent), #a88a4a); /* Gradient gold */
    box-shadow: 0 4px 14px rgba(201, 169, 98, 0.35);
  }

  .navItem {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    color: var(--color-gray-600);
    font-weight: var(--font-medium);
    transition: all 0.2s ease; /* Smooth transition */
  }

  .navItem:hover {
    background-color: var(--color-gray-50);
    color: var(--color-gray-900);
    transform: translateX(2px); /* Hiệu ứng hover */
  }

  .navItem.active {
    background: linear-gradient(145deg, var(--color-accent), #b8944d); /* Gradient */
    color: var(--color-white);
    box-shadow: 0 2px 8px rgba(201, 169, 98, 0.3);
  }

  .saveBtn {
    padding: 10px 20px;
    background: linear-gradient(145deg, #22c55e, #16a34a); /* Gradient green */
    color: var(--color-white);
    border-radius: var(--radius-lg);
    font-weight: var(--font-semibold);
    box-shadow: 0 2px 6px rgba(34, 197, 94, 0.3);
    transition: all 0.2s ease;
  }

  .saveBtn:hover {
    transform: translateY(-1px); /* Lift effect */
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);
  }

  .input {
    padding: 14px 16px;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-lg);
    transition: all 0.2s ease;
  }

  .input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.15); /* Focus ring */
  }
  ```

- **Các cải tiến chính:**

  | Thành phần     | Trước                   | Sau                                |
  | -------------- | ----------------------- | ---------------------------------- |
  | **Nền trang**  | `#1a1a1a` (tối)         | `#f8f9fa` (sáng, dễ nhìn)          |
  | **Cards**      | Góc vuông, không shadow | `border-radius: 12px`, soft shadow |
  | **Buttons**    | Màu phẳng               | Gradient, shadow, hover lift       |
  | **Inputs**     | Border tối              | Border nhạt, focus ring với accent |
  | **Navigation** | Active mờ               | Gradient gold với shadow           |
  | **Avatar**     | Phẳng                   | Gradient gold với box-shadow       |
  | **Hover**      | Không có                | Transform, shadow transitions      |
  | **Spacing**    | Hardcoded px            | CSS variables nhất quán            |

---

## V. Chức Năng Quên Mật Khẩu (Forgot Password)

### 1. Thiếu trang Forgot Password và Reset Password

- **Mô tả:** Website chỉ có link "Forgot password?" trong trang Login nhưng không có trang xử lý, dẫn đến lỗi 404.

- **Nguyên nhân:**
  - Chưa tạo file `ForgotPassword.jsx` và `ResetPassword.jsx`.
  - Chưa thêm routes `/forgot-password` và `/reset-password/:token` vào `App.jsx`.
  - Backend chưa có endpoints xử lý forgot/reset password.

- **Mã nguồn trước khi sửa:**

  **File: `App.jsx` (không có routes)**

  ```jsx
  <Route path="register" element={<GuestRoute><Register /></GuestRoute>} />
  <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  // Không có route forgot-password và reset-password
  ```

- **Mã nguồn sau khi sửa:**

  **File: `App.jsx`**

  ```jsx
  import ForgotPassword from "@pages/ForgotPassword";
  import ResetPassword from "@pages/ResetPassword";

  // Routes
  <Route path="register" element={<GuestRoute><Register /></GuestRoute>} />
  <Route path="forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
  <Route path="reset-password/:token" element={<GuestRoute><ResetPassword /></GuestRoute>} />
  <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  ```

---

### 2. Trang Forgot Password (ForgotPassword.jsx)

- **Mô tả:** Trang cho phép người dùng nhập email Gmail để yêu cầu đặt lại mật khẩu.

- **Tính năng:**
  - Chỉ chấp nhận email Gmail (@gmail.com)
  - Validation realtime khi blur
  - Loading state khi gửi request
  - Hiển thị thông báo thành công với hướng dẫn chi tiết
  - Xử lý các lỗi: email không tồn tại, rate limiting, server error

- **Mã nguồn chính:**

  **File: `ForgotPassword.jsx`**

  ```jsx
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { useToast } from "../context/ToastContext";
  import authService from "../services/authService";
  import styles from "./ForgotPassword.module.css";

  export default function ForgotPassword() {
    const { showSuccess, showError } = useToast();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Validate email - chỉ Gmail
    const validateEmail = (emailValue) => {
      if (!emailValue.trim()) {
        return "Vui lòng nhập địa chỉ email";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        return "Địa chỉ email không hợp lệ";
      }
      // Gmail only check
      if (!emailValue.toLowerCase().endsWith("@gmail.com")) {
        return "Chỉ hỗ trợ địa chỉ email Gmail (@gmail.com)";
      }
      return "";
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationError = validateEmail(email);
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsSubmitting(true);
      try {
        await authService.forgotPassword(email.trim().toLowerCase());
        setIsSuccess(true);
        showSuccess("Đã gửi email hướng dẫn đặt lại mật khẩu!");
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Email này chưa được đăng ký trong hệ thống");
        } else if (err.response?.status === 429) {
          setError("Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi vài phút.");
        } else {
          setError(err.response?.data?.message || "Có lỗi xảy ra");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    // Success state - hiển thị hướng dẫn
    if (isSuccess) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <CheckCircleIcon />
            <h1>Email đã được gửi!</h1>
            <p>
              Chúng tôi đã gửi hướng dẫn đến <strong>{email}</strong>
            </p>
            <div className={styles.successInstructions}>
              <h3>Bước tiếp theo:</h3>
              <ol>
                <li>Kiểm tra hộp thư đến</li>
                <li>Kiểm tra thư mục Spam nếu không thấy</li>
                <li>Click link trong email để đặt lại mật khẩu</li>
                <li>Link hết hạn sau 1 giờ</li>
              </ol>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Quên mật khẩu?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
            {error && <span className={styles.errorText}>{error}</span>}
            <p className={styles.hint}>* Chỉ hỗ trợ email Gmail</p>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Gửi hướng dẫn đặt lại"}
            </button>
          </form>
          <Link to="/login">Quay lại đăng nhập</Link>
        </div>
      </div>
    );
  }
  ```

---

### 3. Trang Reset Password (ResetPassword.jsx)

- **Mô tả:** Trang cho phép người dùng đặt mật khẩu mới sau khi click link trong email.

- **Tính năng:**
  - Nhận token từ URL params
  - Password strength indicator (Yếu/Trung bình/Mạnh)
  - Xác nhận mật khẩu với indicator khớp/không khớp
  - Toggle show/hide password
  - Xử lý token hết hạn hoặc không hợp lệ
  - Redirect về login sau khi thành công

- **Mã nguồn chính:**

  **File: `ResetPassword.jsx`**

  ```jsx
  import { useState } from "react";
  import { Link, useParams, useNavigate } from "react-router-dom";
  import { useToast } from "../context/ToastContext";
  import authService from "../services/authService";
  import styles from "./ResetPassword.module.css";

  export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const [formData, setFormData] = useState({
      password: "",
      confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, success, expired, error

    // Password strength calculation
    const calculatePasswordStrength = (password) => {
      let score = 0;
      if (password.length >= 6) score += 1;
      if (password.length >= 8) score += 1;
      if (/[A-Z]/.test(password)) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;

      if (score <= 2) return { label: "Yếu", color: "#ef4444" };
      if (score <= 4) return { label: "Trung bình", color: "#f59e0b" };
      return { label: "Mạnh", color: "#22c55e" };
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        await authService.resetPassword(token, formData.password, formData.confirmPassword);
        setStatus("success");
        showSuccess("Đặt lại mật khẩu thành công!");
      } catch (err) {
        if (err.response?.data?.message?.includes("expired")) {
          setStatus("expired");
        } else if (err.response?.data?.message?.includes("invalid")) {
          setStatus("error");
        } else {
          showError(err.response?.data?.message || "Có lỗi xảy ra");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    // Token expired state
    if (status === "expired") {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <XCircleIcon />
            <h1>Link đã hết hạn</h1>
            <p>Link đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu link mới.</p>
            <Link to="/forgot-password">Yêu cầu link mới</Link>
          </div>
        </div>
      );
    }

    // Success state
    if (status === "success") {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <CheckCircleIcon />
            <h1>Đặt lại mật khẩu thành công!</h1>
            <p>Bây giờ bạn có thể đăng nhập với mật khẩu mới.</p>
            <button onClick={() => navigate("/login")}>Đăng nhập ngay</button>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Đặt lại mật khẩu</h1>
          <form onSubmit={handleSubmit}>
            {/* Password input với strength indicator */}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới"
            />
            {/* Strength bar */}
            <div className={styles.strengthBar}>
              <div
                style={{
                  width: `${(strength.score / 6) * 100}%`,
                  backgroundColor: strength.color,
                }}
              />
            </div>

            {/* Confirm password */}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
            />
            {/* Match indicator */}
            {formData.password === formData.confirmPassword && (
              <span className={styles.matchText}>✓ Mật khẩu khớp</span>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </form>

          {/* Password tips */}
          <div className={styles.tips}>
            <h4>Gợi ý tạo mật khẩu mạnh:</h4>
            <ul>
              <li>Sử dụng ít nhất 8 ký tự</li>
              <li>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
              <li>Không sử dụng thông tin cá nhân dễ đoán</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  ```

---

### 4. Backend API Endpoints (Cần tạo)

- **Mô tả:** Backend cần có các endpoints xử lý forgot/reset password.

- **Endpoints cần tạo:**

  **File: `routes/authRoutes.js`**

  ```javascript
  import express from "express";
  import { forgotPassword, resetPassword } from "../controllers/authController.js";

  const router = express.Router();

  // Forgot password - gửi email reset
  router.post("/forgot-password", forgotPassword);

  // Reset password với token
  router.post("/reset-password/:token", resetPassword);

  export default router;
  ```

  **File: `controllers/authController.js`**

  ```javascript
  import crypto from "crypto";
  import User from "../models/User.js";
  import { sendPasswordResetEmail } from "../utils/emailService.js";

  // POST /api/auth/forgot-password
  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;

      // Kiểm tra email Gmail
      if (!email.toLowerCase().endsWith("@gmail.com")) {
        return res.status(400).json({
          message: "Chỉ hỗ trợ địa chỉ email Gmail",
        });
      }

      // Tìm user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).json({
          message: "Email không tồn tại trong hệ thống",
        });
      }

      // Tạo reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

      // Lưu token vào database (hết hạn sau 1 giờ)
      user.passwordResetToken = hashedToken;
      user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
      await user.save({ validateBeforeSave: false });

      // Tạo reset URL
      const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      // Gửi email
      await sendPasswordResetEmail(user.email, user.firstName, resetURL);

      res.status(200).json({
        success: true,
        message: "Đã gửi email hướng dẫn đặt lại mật khẩu",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại." });
    }
  };

  // POST /api/auth/reset-password/:token
  export const resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      // Validate passwords
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Mật khẩu không khớp" });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message: "Mật khẩu phải có ít nhất 6 ký tự",
        });
      }

      // Hash token để so sánh
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

      // Tìm user với token hợp lệ và chưa hết hạn
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          message: "Token không hợp lệ hoặc đã hết hạn (expired)",
        });
      }

      // Cập nhật mật khẩu
      user.password = password; // Will be hashed by pre-save hook
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Đặt lại mật khẩu thành công",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại." });
    }
  };
  ```

---

### 5. Email Service với Nodemailer (Cần tạo)

- **Mô tả:** Service gửi email reset password qua Gmail SMTP.

- **Cấu hình:**

  **File: `.env` (Backend)**

  ```env
  # Email Configuration (Gmail)
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASS=your-app-password
  EMAIL_FROM="Fashion Store <noreply@fashionstore.com>"
  ```

  **Lưu ý:** Cần tạo "App Password" trong Google Account:
  1. Vào Google Account → Security
  2. Bật 2-Step Verification
  3. Tạo App Password cho "Mail"
  4. Sử dụng password này trong `EMAIL_PASS`

  **File: `utils/emailService.js`**

  ```javascript
  import nodemailer from "nodemailer";

  // Tạo transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Gửi email reset password
  export const sendPasswordResetEmail = async (email, firstName, resetURL) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "🔐 Đặt lại mật khẩu - Fashion Store",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); padding: 30px; text-align: center;">
            <h1 style="color: #c9a962; margin: 0;">Fashion Store</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Xin chào ${firstName},</h2>
            <p style="color: #666; line-height: 1.6;">
              Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản Fashion Store.
              Click vào nút bên dưới để tạo mật khẩu mới:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetURL}" 
                 style="background: linear-gradient(135deg, #c9a962 0%, #b8944d 100%);
                        color: white;
                        padding: 15px 40px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                        display: inline-block;">
                Đặt lại mật khẩu
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px;">
              ⏰ Link này sẽ hết hạn sau <strong>1 giờ</strong>.
            </p>
            <p style="color: #999; font-size: 14px;">
              Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
            </p>
          </div>
          
          <div style="background: #333; padding: 20px; text-align: center;">
            <p style="color: #999; margin: 0; font-size: 12px;">
              © 2024 Fashion Store. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  };
  ```

---

### 6. User Model - Thêm fields cho reset password

- **Mô tả:** Model User cần có thêm fields để lưu reset token.

- **Mã nguồn:**

  **File: `models/User.js`**

  ```javascript
  const userSchema = new mongoose.Schema({
    // ... existing fields

    // Password reset fields
    passwordResetToken: {
      type: String,
      select: false, // Không trả về trong queries mặc định
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
  });
  ```

---

### 7. Giao diện các trạng thái

| Trạng thái              | Mô tả            | Giao diện                                            |
| ----------------------- | ---------------- | ---------------------------------------------------- |
| **Form nhập email**     | Màn hình chính   | Icon khóa, input email, hint "Chỉ Gmail", button gửi |
| **Loading**             | Đang gửi request | Button disabled, spinner xoay                        |
| **Success**             | Email đã gửi     | Icon check xanh, hướng dẫn 4 bước, nút gửi lại       |
| **Email không tồn tại** | Lỗi 404          | Hiển thị error text đỏ dưới input                    |
| **Rate limit**          | Gửi quá nhiều    | Thông báo đợi vài phút                               |
| **Token expired**       | Link hết hạn     | Icon X đỏ, nút yêu cầu link mới                      |
| **Reset thành công**    | Đổi pass xong    | Icon check, nút đăng nhập ngay                       |

---

**Lời khuyên:**

- Luôn kiểm tra log backend, log Nginx khi gặp lỗi.
- Ghi chú lại các lỗi và cách khắc phục để tiết kiệm thời gian cho lần sau.
- Đảm bảo đồng bộ cấu hình giữa local, staging và production.
- Sử dụng các lệnh kiểm tra log, trạng thái dịch vụ để phát hiện và xử lý lỗi nhanh chóng.
- Đảm bảo cấu hình domain, SSL, Nginx, backend, frontend đồng bộ và đúng chuẩn.
