# Ví dụ cấu hình secrets cho GitHub Actions deploy

Bạn cần vào phần **Settings > Secrets and variables > Actions** của repository trên GitHub để thêm các biến sau:

| Tên biến           | Ý nghĩa                                            | Ví dụ giá trị                                |
| ------------------ | -------------------------------------------------- | -------------------------------------------- |
| SERVER_HOST        | Địa chỉ IP hoặc domain server                      | 123.45.67.89 hoặc mydomain.com               |
| SERVER_USER        | Tên user SSH trên server                           | ubuntu hoặc root                             |
| SERVER_SSH_KEY     | Private key SSH (dạng PEM, không pass)             | (copy toàn bộ file id_rsa)                   |
| SERVER_PORT        | Port SSH (thường là 22)                            | 22                                           |
| SERVER_TARGET_PATH | Thư mục đích trên server (build sẽ upload vào đây) | /var/www/html hoặc /home/ubuntu/app/frontend |

## Ví dụ cụ thể:

- **SERVER_HOST:** `123.45.67.89`
- **SERVER_USER:** `ubuntu`
- **SERVER_SSH_KEY:** _(copy toàn bộ nội dung file ~/.ssh/id_rsa)_
- **SERVER_PORT:** `22`
- **SERVER_TARGET_PATH:** `/var/www/html`

### Hướng dẫn lấy SERVER_SSH_KEY (private key)

- **Trên Linux/macOS:**

  1. Mở Terminal.
  2. Chạy lệnh: `cat ~/.ssh/id_rsa`
  3. Copy toàn bộ nội dung hiện ra (bắt đầu bằng `-----BEGIN OPENSSH PRIVATE KEY-----` hoặc `-----BEGIN RSA PRIVATE KEY-----` và kết thúc bằng `-----END ... PRIVATE KEY-----`).

- **Trên Windows (dùng Git Bash hoặc WSL):**

  1. Mở Git Bash hoặc WSL.
  2. Chạy lệnh: `cat ~/.ssh/id_rsa`
  3. Copy toàn bộ nội dung như trên.

- **Lưu ý:**
  - KHÔNG chia sẻ private key cho bất kỳ ai.
  - Không public key này lên repo, chỉ dán vào GitHub Secrets.
  - Nếu chưa có file `id_rsa`, tạo bằng lệnh: `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` và nhấn Enter liên tục.

#### Nếu chưa có file id_rsa:

- Chạy lệnh sau để tạo mới SSH key:
  ```
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  ```
- Khi được hỏi nơi lưu file, nhấn Enter để dùng mặc định (`/root/.ssh/id_rsa` hoặc `~/.ssh/id_rsa`).
- Không cần đặt passphrase (chỉ nhấn Enter liên tục).
- Sau đó, chạy lại lệnh `cat ~/.ssh/id_rsa` để lấy private key.

> Lưu ý: Không public file này, chỉ dùng để tham khảo cấu hình. Secrets phải nhập trong GitHub, không commit lên repo! 
