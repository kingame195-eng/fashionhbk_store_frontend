# ⚡ Quick Fix Guide - Khi Server Có Vấn đề

## 🚨 Tình huống 1: Website không truy cập được (Server Down khi gia hạn)

### Bước 1: Check server có online không?

```bash
# Từ máy local, ping server
ping 103.82.24.135

# Hoặc thử SSH vào
ssh root@103.82.24.135
```

✅ **Nếu ping được / SSH được:** → Đi bước 2  
❌ **Nếu không ping được:** → Liên hệ hosting provider

---

### Bước 2: Check các dịch vụ trên server

**SSH vào server:**

```bash
ssh root@103.82.24.135
```

**Chạy health check script:**

```bash
bash /var/www/fashionhbk.shop/scripts/server-health-check.sh
```

Hoặc **check thủ công:**

```bash
# 1️⃣ Check Nginx
systemctl status nginx

# 2️⃣ Check Backend
pm2 list

# 3️⃣ Check SSL Certificate
openssl s_client -connect fashionhbk.shop:443 -servername fashionhbk.shop
```

---

### Bước 3: Fix từng vấn đề

#### 🔴 **Nginx Down**

```bash
# Start Nginx
systemctl start nginx
systemctl enable nginx

# Verify
systemctl status nginx
```

#### 🔴 **Backend Down**

```bash
# Check log
pm2 logs

# Restart
pm2 restart fashion-backend

# Or restart all
pm2 restart all

# Verify
pm2 list
```

#### 🔴 **SSL Certificate Hết Hạn**

```bash
# Renew certificate
certbot renew

# Restart Nginx
systemctl restart nginx

# Check expiry date
openssl s_client -connect fashionhbk.shop:443 -servername fashionhbk.shop 2>/dev/null | grep -A2 "Not After"
```

---

## 🚨 Tình huống 2: Deploy từ GitHub không hoạt động

### Kiểm tra Secrets trên GitHub:

1. Vào **Repository Settings → Secrets and variables → Actions**
2. Kiểm tra các secrets sau tồn tại không:
   - `SERVER_HOST` = `103.82.24.135`
   - `SERVER_USER` = `root`
   - `SERVER_SSH_KEY` = _(private key)_

### Test SSH từ terminal:

```bash
# Download private key (nếu lưu trên máy)
# Giả sử key lưu tại ~/.ssh/github_key

# Test kết nối
ssh -i ~/.ssh/github_key root@103.82.24.135 "echo 'SSH OK'"
```

### Check deploy folders tồn tại không:

```bash
# SSH vào server
ssh root@103.82.24.135

# Check folders
ls -la /var/www/fashionhbk.shop/frontend
ls -la /var/www/fashionhbk.shop/fashion-website-backend

# Check file permissions
stat /var/www/fashionhbk.shop/frontend
```

### View GitHub Actions logs:

1. Vào **Repository → Actions tab**
2. Click vào workflow gần nhất
3. Check step nào bị ❌ Failed
4. Click vào step đó xem full error message

---

## 🚨 Tình huống 3: Update từ GitHub bị fail, phải deploy thủ công

### Deploy Frontend thủ công:

```bash
# SSH vào server
ssh root@103.82.24.135

# Vào frontend folder
cd /var/www/fashionhbk.shop

# Clone repo (nếu chưa có)
git clone https://github.com/your-username/fashion-website-frontend.git repo

# Hoặc pull nếu đã có
cd repo
git pull origin main

# Build frontend
cd frontend
npm ci
npm run build

# Copy build output
cp -r dist/* /var/www/fashionhbk.shop/frontend/

# Check files
ls -la /var/www/fashionhbk.shop/frontend/
```

### Deploy Backend thủ công:

```bash
# SSH vào server
ssh root@103.82.24.135

# Vào repo folder
cd /var/www/fashionhbk.shop/repo

# Pull latest code
git pull origin main

# Copy backend
cp -r fashion-website-backend/* /var/www/fashionhbk.shop/fashion-website-backend/

# Install dependencies
cd /var/www/fashionhbk.shop/fashion-website-backend
npm ci --production

# Restart PM2
pm2 restart fashion-backend

# Verify
pm2 logs
```

---

## ⏱️ Khi Gia Hạn Server Trễ (Auto Renewal)

### Thiết lập auto-renew SSL:

```bash
# SSH vào server
ssh root@103.82.24.135

# Kiểm tra certbot renewal service
systemctl status certbot.timer

# Nếu không active, enable:
systemctl enable certbot.timer
systemctl start certbot.timer

# Test renewal (dry-run)
certbot renew --dry-run
```

### Setup auto-restart services:

```bash
# SSH vào server
ssh root@103.82.24.135

# Ensure Nginx restarts on reboot
systemctl enable nginx

# Ensure PM2 restarts on reboot
pm2 startup
pm2 save
```

### Cài đặt cron job để auto-check:

```bash
# SSH vào server
ssh root@103.82.24.135

# Edit crontab
crontab -e

# Thêm dòng này để chạy health check mỗi giờ:
0 * * * * bash /var/www/fashionhbk.shop/scripts/server-health-check.sh

# Lưu (Ctrl+X, Y, Enter)

# Verify cron được add
crontab -l
```

---

## 📋 Checklist Hàng Tuần

```
[ ] Check GitHub Actions logs - có error không?
[ ] SSH vào server & chạy health check
[ ] Verify website load bình thường trên browser
[ ] Check SSL certificate expiry:
    openssl s_client -connect fashionhbk.shop:443 -servername fashionhbk.shop | grep -A2 "Not After"
[ ] Check disk usage: df -h
[ ] Check memory: free -h
[ ] View backend logs: pm2 logs
[ ] Verify PM2 processes: pm2 list
```

---

## 🆘 Emergency Contacts

- **Hosting Provider:** [Your hosting provider contact]
- **Server IP:** 103.82.24.135
- **Domain:** fashionhbk.shop
- **Backend Port:** (usuallly 5000/3000)
- **Frontend Port:** (80/443 via Nginx)

---

## 🎯 Quick Command Reference

```bash
# SSH vào server
ssh root@103.82.24.135

# Health check
bash /var/www/fashionhbk.shop/scripts/server-health-check.sh

# View Nginx status
systemctl status nginx

# View Backend logs
pm2 logs fashion-backend

# Restart everything
pm2 restart all
systemctl restart nginx

# Pull latest code (backend)
cd /var/www/fashionhbk.shop/fashion-website-backend
git pull origin main
npm ci --production
pm2 restart fashion-backend

# Rebuild frontend
cd /var/www/fashionhbk.shop/repo/frontend
npm ci
npm run build
cp -r dist/* /var/www/fashionhbk.shop/frontend/

# Renew SSL
certbot renew
systemctl restart nginx

# Check certificate expiry
openssl s_client -connect fashionhbk.shop:443 -servername fashionhbk.shop </dev/null 2>/dev/null | grep -A2 "Not After"
```

---

**💡 Tip:** Bookmark page này để dễ truy cập khi cần! 🚀
