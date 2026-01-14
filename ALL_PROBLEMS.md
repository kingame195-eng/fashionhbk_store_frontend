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
- **Hậu quả:**
  - Người dùng tìm kiếm từ khóa (ví dụ: "kid") nhưng không thấy sản phẩm thuộc danh mục khác (ví dụ: "Kids"), gây hiểu nhầm là không có sản phẩm.
- **Khắc phục:**
  - Sửa logic frontend: Khi có từ khóa tìm kiếm, tự động xóa filter category để trả về kết quả trên toàn bộ sản phẩm.
  - Nếu muốn giữ filter category khi search, cần hiển thị thông báo rõ ràng cho người dùng biết kết quả đang bị giới hạn trong danh mục hiện tại.
- **Cải tiến UX đã thực hiện:**
  - Khi người dùng nhập từ khóa tìm kiếm, hệ thống sẽ tự động tìm trên toàn bộ sản phẩm (bỏ lọc category).
  - Hiển thị banner thông báo "Searching for ... across all products" và nút "Clear search" để người dùng dễ dàng quay lại duyệt sản phẩm bình thường.

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

**Lời khuyên:**

- Luôn kiểm tra log backend, log Nginx khi gặp lỗi.
- Ghi chú lại các lỗi và cách khắc phục để tiết kiệm thời gian cho lần sau.
- Đảm bảo đồng bộ cấu hình giữa local, staging và production.
- Sử dụng các lệnh kiểm tra log, trạng thái dịch vụ để phát hiện và xử lý lỗi nhanh chóng.
- Đảm bảo cấu hình domain, SSL, Nginx, backend, frontend đồng bộ và đúng chuẩn.
