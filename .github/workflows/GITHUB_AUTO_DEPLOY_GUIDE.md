# 🚀 Hướng dẫn Auto Deploy từ GitHub (CI/CD)

> **Mục đích:** Mỗi lần push lên GitHub, website tự động update trên cloud server

---

## 📋 Yêu cầu

- ✅ Dự án đã có `.github/workflows/` folder
- ✅ Repository đã được push lên GitHub (https://github.com/your-username/fashion-website-frontend)
- ✅ Có cloud server với SSH access
- ✅ Đã cài Node.js trên server

---

## ⚙️ Bước 1: Tạo SSH Key trên Server (nếu chưa có)

### Trên Cloud Server của bạn (103.82.24.135):

```bash
# Tạo SSH key (nếu chưa có)
ssh-keygen -t rsa -b 4096 -C "github-deploy@fashionhbk.shop" -f ~/.ssh/id_rsa -N ""

# Xem private key (để copy vào GitHub Secrets)
cat ~/.ssh/id_rsa

# Xem public key (để add vào server authorized_keys)
cat ~/.ssh/id_rsa.pub
```

**⚠️ LƯU Ý:** Copy toàn bộ private key (từ `-----BEGIN RSA PRIVATE KEY-----` đến `-----END RSA PRIVATE KEY-----`)

---

## 🔐 Bước 2: Thiết lập GitHub Secrets

### Vào GitHub:

1. **Mở repository:** https://github.com/your-username/fashion-website-frontend
2. **Settings → Secrets and variables → Actions**
3. **Click "New repository secret"** và thêm các secrets sau:

| Secret Name      | Giá trị                         |
| ---------------- | ------------------------------- |
| `SERVER_HOST`    | `103.82.24.135`                 |
| `SERVER_USER`    | `root` (hoặc `ubuntu` nếu dùng) |
| `SERVER_SSH_KEY` | (Nội dung file `~/.ssh/id_rsa`) |

**Ví dụ SERVER_SSH_KEY:**

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2x4Jk7h9...
...
-----END RSA PRIVATE KEY-----
```

---

## ✅ Bước 3: Deploy Frontend

### Cấu hình hiện tại (deploy.yml):

```yaml
name: Deploy Frontend to Server

on:
  push:
    branches:
      - main # Tự động deploy khi push lên branch 'main'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: |
          cd frontend
          npm ci

      - name: Build project
        run: |
          cd frontend
          npm run build

      - name: Deploy to server via SCP
        uses: appleboy/scp-action@v0.1.7
        with:
          host: 103.82.24.135
          username: root
          key: ${{ secrets.SERVER_SSH_KEY }}
          port: 22
          source: "frontend/dist/*"
          target: /var/www/fashionhbk.shop/frontend
          strip_components: 2
```

### Điều gì xảy ra khi bạn push:

1. **GitHub Actions detect push** lên branch `main`
2. **Build frontend** (Vite) → output vào `frontend/dist/`
3. **Upload `dist/` folder** lên server qua SCP
4. **Website cập nhật** ngay lập tức!

### Test Deploy:

```bash
# 1. Sửa một file (ví dụ frontend/src/App.jsx)
# 2. Push lên GitHub
git add .
git commit -m "test auto deploy"
git push origin main

# 3. Xem Actions tab trên GitHub để follow progress
# 4. Vào https://fashionhbk.shop để check update
```

---

## ✅ Bước 4: Deploy Backend

### Cấu hình hiện tại (deploy-backend.yml):

```yaml
name: Deploy Backend to Server

on:
  push:
    branches:
      - main
    paths:
      - "fashion-website-backend/**" # Chỉ deploy khi backend folder thay đổi

jobs:
  deploy:
    name: Deploy Backend
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to server via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          port: 22
          script: |
            cd /var/www/fashionhbk.shop/fashion-website-backend

            # Pull latest changes
            git pull origin main

            # Install dependencies
            npm ci --production

            # Restart application with PM2
            pm2 restart fashion-backend || pm2 start src/server.js --name fashion-backend

            # Save PM2 process list
            pm2 save

            echo "Backend deployed successfully!"
```

---

## 🛠️ Bước 5: Cấu hình Server (lần đầu)

### SSH vào server:

```bash
# Đăng nhập server
ssh root@103.82.24.135

# Tạo thư mục deploy (nếu chưa có)
mkdir -p /var/www/fashionhbk.shop/frontend
mkdir -p /var/www/fashionhbk.shop/fashion-website-backend

# Clone repository (để backend có thể pull)
cd /var/www/fashionhbk.shop
git clone https://github.com/your-username/fashion-website-frontend.git repo

# Copy backend vào vị trí chuẩn
cp -r repo/fashion-website-backend /var/www/fashionhbk.shop/fashion-website-backend

# Cài dependencies backend
cd /var/www/fashionhbk.shop/fashion-website-backend
npm ci --production

# Cài PM2 globally
npm install -g pm2

# Start backend application
pm2 start src/server.js --name fashion-backend
pm2 save
pm2 startup
```

### Cấu hình Nginx:

```bash
# Xem file cấu hình Nginx hiện tại
cat /var/www/fashionhbk.shop/fashionhbk.shop.conf
```

---

## 🔄 Workflow Hàng Ngày

### Để update website sau khi làm việc:

```bash
# 1. Sửa code (frontend hoặc backend)
# 2. Commit và push
git add .
git commit -m "Update feature XYZ"
git push origin main

# 3. GitHub Actions tự động chạy:
#    - Build frontend và upload dist/
#    - Pull backend code mới và restart PM2
# 4. Website cập nhật ngay! 🎉
```

### Monitor deployment:

- **Vào GitHub → Actions tab** để xem status
- **Click vào workflow chạy gần nhất** để xem logs
- Nếu có lỗi, sẽ thấy ❌ Failed

---

## ⚠️ Xử lý Vấn đề Khi Gia Hạn Server

### Vấn đề 1: Server Offline/Down khi gia hạn

```bash
# 1. SSH vào server khi server up lại
ssh root@103.82.24.135

# 2. Check status nginx
systemctl status nginx

# 3. Nếu nginx down, start lại
systemctl start nginx
systemctl enable nginx

# 4. Check PM2 backend
pm2 status

# 5. Nếu backend down, start lại
cd /var/www/fashionhbk.shop/fashion-website-backend
pm2 start src/server.js --name fashion-backend
pm2 save
```

### Vấn đề 2: SSL Certificate hết hạn

```bash
# 1. SSH vào server
ssh root@103.82.24.135

# 2. Renew Let's Encrypt certificate
certbot renew

# 3. Restart nginx
systemctl restart nginx

# 4. Check certificate expiry
openssl s_client -connect fashionhbk.shop:443 -servername fashionhbk.shop | grep -A 2 "Not After"
```

### Vấn đề 3: Deploy workflow failed

**Kiểm tra:**

1. **GitHub Actions logs:**
   - Settings → Secrets có đầy đủ không?
   - SSH key còn valid không?
   - Server IP có thay đổi không?

2. **Server SSH access:**

   ```bash
   # Test SSH từ máy local
   ssh -i ~/.ssh/id_rsa root@103.82.24.135
   ```

3. **Server folders:**
   ```bash
   # SSH vào server, check folders tồn tại
   ls -la /var/www/fashionhbk.shop/frontend
   ls -la /var/www/fashionhbk.shop/fashion-website-backend
   ```

---

## 📊 Quá trình hoạt động (Visual)

```
┌─────────────────────────────────────────┐
│  Máy Local (Bạn)                        │
│  git push origin main                   │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│  GitHub Repository                      │
│  Trigger GitHub Actions workflow        │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────────────┐
        │                     │
        ↓                     ↓
    ┌──────────────┐    ┌─────────────────┐
    │ deploy.yml   │    │ deploy-backend  │
    │ (Frontend)   │    │ (Backend)       │
    └──────┬───────┘    └────────┬────────┘
           │                     │
           ↓                     ↓
    [Build Vite]        [git pull origin main]
    [Upload dist/]      [npm ci --production]
           │            [pm2 restart]
           │                     │
           └──────────┬──────────┘
                      ↓
        ┌─────────────────────────────────┐
        │  Cloud Server (103.82.24.135)   │
        │  Website UPDATED! 🎉            │
        └─────────────────────────────────┘
```

---

## ✨ Advanced: Thêm Notification

### Deploy Complete - Gửi Slack/Discord

Thêm vào workflow (tùy chọn):

```yaml
- name: Notify Deployment Success
  if: success()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "✅ Frontend deployed successfully!",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Status:* ✅ Deployed\n*Branch:* main\n*Time:* $(date)"
            }
          }
        ]
      }
```

---

## 🎓 Tóm tắt

| Bước              | Hành động                       | Lệnh/Link                                   |
| ----------------- | ------------------------------- | ------------------------------------------- |
| 1. Tạo SSH key    | `ssh-keygen -t rsa -b 4096 ...` | Term                                        |
| 2. Add Secrets    | GitHub Settings → Secrets       | https://github.com/settings/secrets/actions |
| 3. Push code      | `git push origin main`          | Term                                        |
| 4. Monitor deploy | GitHub Actions tab              | https://github.com/.../actions              |
| 5. Check website  | Vào https://fashionhbk.shop     | Browser                                     |
| 6. Troubleshoot   | SSH vào server, check logs      | `ssh root@103.82.24.135`                    |

---

## 📞 Troubleshooting Checklist

- [ ] Secrets được add vào GitHub chưa?
- [ ] SSH key trên server có công khai (authorized_keys) không?
- [ ] Server IP (103.82.24.135) có chính xác không?
- [ ] Folders `/var/www/fashionhbk.shop/frontend` tồn tại chưa?
- [ ] `npm ci` có chạy successfully ở GitHub Actions không?
- [ ] Nginx config có valid không?
- [ ] PM2 process backend chạy bình thường chưa?

---

**🎉 Lấy! Mỗi push là một deploy tự động!**
