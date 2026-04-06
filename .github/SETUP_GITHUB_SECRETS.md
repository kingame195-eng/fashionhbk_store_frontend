# 🔐 Hướng dẫn Thiết lập GitHub Secrets (Từng bước chi tiết)

> Đây là bước quan trọng để GitHub Actions có thể kết nối SSH đến server và deploy

---

## 📌 Yêu cầu

- ✅ GitHub account
- ✅ Repository trên GitHub (https://github.com/your-username/fashion-website-frontend)
- ✅ Cloud server có SSH access (103.82.24.135)
- ✅ SSH key trên server

---

## 🔧 Bước 1: Tạo/Kiểm tra SSH Key trên Server

### A. SSH vào server:

```bash
ssh root@103.82.24.135
```

### B. Kiểm tra SSH key đã tồn tại chưa:

```bash
ls -la ~/.ssh/

# Output sẽ giống thế này:
# -rw------- 1 root root 3414 Jan 10 10:22 id_rsa
# -rw-r--r-- 1 root root  743 Jan 10 10:22 id_rsa.pub
```

✅ **Nếu thấy `id_rsa` file:** → Nhảy sang Bước 2  
❌ **Nếu không thấy:** → Tạo mới bằng lệnh dưới

### C. Tạo SSH key mới (nếu chưa có):

```bash
ssh-keygen -t rsa -b 4096 -C "github-deploy@fashionhbk.shop" -f ~/.ssh/id_rsa -N ""
```

**Giải thích:**

- `-t rsa` : Kiểu key
- `-b 4096` : Độ dài key (bảo mật)
- `-C "..."` : Comment (để nhận biết)
- `-f ~/.ssh/id_rsa` : Vị trí lưu file
- `-N ""` : Không cần password (để automated deploy)

### D. Verify key được tạo:

```bash
ls -la ~/.ssh/

# Phải thấy:
# -rw------- 1 root root 3414 ... id_rsa
# -rw-r--r-- 1 root root  743 ... id_rsa.pub
```

---

## 🔑 Bước 2: Lấy Private Key (để paste vào GitHub)

### Xem nội dung private key:

```bash
cat ~/.ssh/id_rsa
```

### Output sẽ giống thế này:

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2x4Jk7h9k8s4jFj2L0QmP8QrK9v1L8s3mK4w5p9n6o8t2v
UwYzABcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgH
... (nhiều dòng tiếp theo)
-----END RSA PRIVATE KEY-----
```

⚠️ **QUAN TRỌNG:**

- Copy **toàn bộ nội dung** (từ `BEGIN RSA PRIVATE KEY` đến `END RSA PRIVATE KEY`)
- Đừng chia sẻ key này cho ai
- Chỉ paste vào GitHub Secrets, không commit vào repository

---

## 🌐 Bước 3: Vào GitHub Repository

### A. Mở trình duyệt:

```
https://github.com/your-username/fashion-website-frontend
```

### B. Thay `your-username` bằng tên GitHub của bạn

Ví dụ:

- Nếu GitHub URL của bạn là: `https://github.com/john-doe/fashion-website-frontend`
- Thì `your-username` = `john-doe`

---

## 🔒 Bước 4: Vào Repository Settings

### A. Click **Settings** tab:

```
Repository home page → Settings tab (gần cuối cùng)
```

### B. Ở sidebar bên trái, click **Secrets and variables**:

```
Sidebar → Security → Secrets and variables → Actions
```

### C. Bạn sẽ thấy màn hình như này:

```
┌─────────────────────────────────────────┐
│  Secrets / New repository secret button │
│  (Nếu chưa có secret nào)               │
└─────────────────────────────────────────┘
```

---

## 🆕 Bước 5: Thêm Secret #1 - SERVER_HOST

### A. Click **New repository secret** button:

```
Green button "New repository secret"
```

### B. Điền form:

| Field | Giá trị         |
| ----- | --------------- |
| Name  | `SERVER_HOST`   |
| Value | `103.82.24.135` |

**Ví dụ:**

```
Name:  SERVER_HOST
Value: 103.82.24.135
```

### C. Click **Add secret** button:

```
Màu xanh lá "Add secret"
```

✅ **Xong Secret #1!**

---

## 🆕 Bước 6: Thêm Secret #2 - SERVER_USER

### A. Click **New repository secret** button lại:

```
Green button "New repository secret"
```

### B. Điền form:

| Field | Giá trị                                   |
| ----- | ----------------------------------------- |
| Name  | `SERVER_USER`                             |
| Value | `root` (hoặc `ubuntu` nếu dùng user khác) |

**Ví dụ:**

```
Name:  SERVER_USER
Value: root
```

### C. Click **Add secret** button

✅ **Xong Secret #2!**

---

## 🆕 Bước 7: Thêm Secret #3 - SERVER_SSH_KEY (Quan trọng nhất!)

### A. Click **New repository secret** button:

```
Green button "New repository secret"
```

### B. Điền form:

| Field | Giá trị                                                 |
| ----- | ------------------------------------------------------- |
| Name  | `SERVER_SSH_KEY`                                        |
| Value | _(Paste toàn bộ nội dung file ~/.ssh/id_rsa từ Bước 2)_ |

**Ví dụ cụ thể:**

```
Name:  SERVER_SSH_KEY

Value: -----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2x4Jk7h9k8s4jFj2L0QmP8QrK9v1L8s3mK4w5p9n6o8t2v
UwYzABcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgH
iJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRs
TuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDe
... (nhiều dòng)
-----END RSA PRIVATE KEY-----
```

⚠️ **CÁCH PASTE ĐÚNG:**

1. Vào terminal/server, chạy: `cat ~/.ssh/id_rsa`
2. Select toàn bộ output (Ctrl+A hoặc cmd+a)
3. Copy (Ctrl+C)
4. Vào GitHub form, click vào ô "Value"
5. Paste (Ctrl+V)
6. Scroll xuống xác nhận có dòng `-----END RSA PRIVATE KEY-----` không

### C. Click **Add secret** button

✅ **Xong Secret #3 (Quan trọng nhất!)**

---

## ✅ Bước 8: Kiểm tra tất cả Secrets đã add

### Vào lại **Secrets and variables → Actions**

### Bạn sẽ thấy:

```
Repository secrets:
├─ SERVER_HOST      (Last used: ...)
├─ SERVER_USER      (Last used: ...)
└─ SERVER_SSH_KEY   (Last used: ...)
```

Nếu thấy cả 3 → ✅ **Hoàn tất!**

---

## 🧪 Bước 9: Test Deploy

### A. Sửa một file nhỏ trên máy local:

```bash
# Edit một file (ví dụ frontend/src/App.jsx)
# Thêm hoặc sửa một dòng nào đó

# Save file
```

### B. Commit và push lên GitHub:

```bash
git add .
git commit -m "test auto deploy - ignore this"
git push origin main
```

### C. Xem GitHub Actions chạy:

1. Vào **Repository → Actions tab**
2. Bạn sẽ thấy workflow `Deploy Frontend to Server` chạy
3. Click vào workflow để xem chi tiết
4. Chờ khoảng 1-2 phút cho quá trình build & deploy hoàn tất

### D. Kiểm tra website:

```
Vào https://fashionhbk.shop
Reload browser (Ctrl+Shift+R để clear cache)
Xem thay đổi có được apply không
```

✅ **Nếu website cập nhật → Deploy hoạt động!** 🎉

---

## ❌ Troubleshooting

Nếu deploy fail (❌ Failed trong Actions):

### 1. Check GitHub Actions logs:

```
Actions tab → Click workflow error → Scroll down → Xem error message
```

### 2. Error phổ biến:

| Error                           | Nguyên nhân                               | Fix                             |
| ------------------------------- | ----------------------------------------- | ------------------------------- |
| `Permission denied (publickey)` | SSH key invalid hoặc không được authorize | Kiểm tra private key bên dưới   |
| `Could not resolve hostname`    | Server IP sai                             | Check `SERVER_HOST` value       |
| `Connection refused`            | Server offline                            | SSH vào server check trạng thái |
| `No such file or directory`     | Deploy folder không tồn tại               | Tạo folder trên server          |

### 3. Check SSH key trên server:

```bash
# SSH vào server
ssh root@103.82.24.135

# Verify public key được add vào authorized_keys
cat ~/.ssh/authorized_keys

# Nếu thấy key của GitHub → OK
# Nếu không thấy → Add nó:
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 4. Test SSH từ máy local:

```bash
# Từ máy local, test kết nối
ssh -i ~/.ssh/id_rsa root@103.82.24.135 "echo OK"

# Nếu thấy "OK" → SSH OK
# Nếu error → Có vấn đề với key
```

---

## 📊 Visual: Workflow hoạt động

```
┌─────────────────────────────────────────┐
│  KHI BẠN: git push origin main           │
└────────────┬────────────────────────────┘
             │
             ↓
      ┌──────────────┐
      │ GitHub nhận  │
      │ push event   │
      └──────┬───────┘
             │
             ↓
    ┌─────────────────────┐
    │ GitHub Actions      │
    │ Chạy deploy.yml     │
    └──────────┬──────────┘
               │
        ┌──────┴──────┐
        ↓             ↓
    ┌────────┐    ┌──────────┐
    │ Build  │    │ Compare  │
    │Vite    │    │ Secrets  │
    └───┬────┘    └────┬─────┘
        │              │
        └───────┬──────┘
                ↓
        ┌──────────────────────┐
        │ Connect SSH to server │
        │ (Using Secrets)       │
        │                       │
        │ SERVER_HOST = 103.... │
        │ SERVER_USER = root    │
        │ SERVER_SSH_KEY = ... │
        └────────┬─────────────┘
                 │
                 ↓
        ┌──────────────────────┐
        │ Upload dist/ folder   │
        │ to /var/www/...       │
        └────────┬─────────────┘
                 │
                 ↓
    ┌──────────────────────────┐
    │ ✅ Website UPDATED!       │
    │ https://fashionhbk.shop   │
    └──────────────────────────┘
```

---

## 🎓 Recap

| Bước | Hành động                                       | Nơi             |
| ---- | ----------------------------------------------- | --------------- |
| 1    | Tạo SSH key `ssh-keygen`                        | Server terminal |
| 2    | Copy private key `cat ~/.ssh/id_rsa`            | Server terminal |
| 3    | Vào GitHub Settings → Secrets                   | GitHub web      |
| 4    | Add `SERVER_HOST` secret                        | GitHub web      |
| 5    | Add `SERVER_USER` secret                        | GitHub web      |
| 6    | Add `SERVER_SSH_KEY` secret (paste private key) | GitHub web      |
| 7    | Push code: `git push origin main`               | Local terminal  |
| 8    | Monitor Actions tab                             | GitHub web      |
| 9    | Website auto-updates! ✅                        | Browser         |

---

## 💥 Bây giờ bạn đã sẵn sàng!

Mỗi lần bạn:

```bash
git push origin main
```

Website sẽ tự động update trên server! 🚀

**Chill, drink coffee ☕ và để GitHub Actions làm việc!**

---

## 📞 Cần help?

- ✅ Secrets set up đúng và deploy fail? → Check error message trong GitHub Actions logs
- ✅ SSH key mất? → Tạo mới bằng `ssh-keygen`
- ✅ Server down? → SSH vào server check status
- ✅ Website không update? → Kiểm tra `/var/www/fashionhbk.shop/frontend` có `index.html` không
