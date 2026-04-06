# 🚀 GitHub Auto-Deploy Setup

Hướng dẫn thiết lập **tự động deploy website từ GitHub** lên cloud server

---

## 📚 Tài liệu trong folder này

| File | Mục đích | Ai nên đọc |
|------|---------|-----------|
| **[SETUP_GITHUB_SECRETS.md](SETUP_GITHUB_SECRETS.md)** | 🎯 **BẮNG BUỘC** - Hướng dẫn từng bước thiết lập GitHub Secrets | Bất kỳ ai lần đầu setup |
| **[GITHUB_AUTO_DEPLOY_GUIDE.md](GITHUB_AUTO_DEPLOY_GUIDE.md)** | Chi tiết về cách GitHub Actions hoạt động | Ai muốn hiểu sâu |
| **[QUICK_FIX_GUIDE.md](../QUICK_FIX_GUIDE.md)** | Cách fix nhanh khi server có vấn đề | Khi gặp sự cố |

---

## ⏱️ Thời gian setup

| Bước | Thời gian |
|------|----------|
| Đọc SETUP_GITHUB_SECRETS.md | 5-10 phút |
| Thực hiện setup (tạo secrets) | 5-10 phút |
| Test deploy | 5 phút |
| **TOTAL** | **15-25 phút** |

---

## ✅ Quick Start (Nếu bạn vội)

### 1️⃣ Server side (SSH vào server):

```bash
ssh root@103.82.24.135

# Tạo SSH key
ssh-keygen -t rsa -b 4096 -C "github-deploy@fashionhbk.shop" -f ~/.ssh/id_rsa -N ""

# Copy private key (để dán vào GitHub)
cat ~/.ssh/id_rsa
```

### 2️⃣ GitHub side:

1. Vào **Repository → Settings → Secrets and variables → Actions**
2. Click **New repository secret** và add:
   - **Name:** `SERVER_HOST` | **Value:** `103.82.24.135`
   - **Name:** `SERVER_USER` | **Value:** `root`
   - **Name:** `SERVER_SSH_KEY` | **Value:** *(Paste private key từ bước 1)*

### 3️⃣ Test Deploy:

```bash
# On local machine
git push origin main

# Xem Actions tab trên GitHub
# Website auto-update trong 1-2 phút 🎉
```

---

## 🔄 Hàng ngày - Workflow đơn giản

```
Sửa code → git push origin main → Website update tự động ✨
```

Thế thôi! Không cần SSH vào server để deploy nữa!

---

## 🚨 Server Down? (Gia hạn trễ, SSL hết hạn, etc)

Chạy **health check script** tự động fix:

```bash
ssh root@103.82.24.135
bash /var/www/fashionhbk.shop/scripts/server-health-check.sh
```

Script này sẽ tự động:
- ✅ Start Nginx (nếu down)
- ✅ Restart PM2 Backend (nếu down)
- ✅ Renew SSL Certificate (nếu hết hạn)
- ✅ Check disk/memory space
- ✅ Report all issues

---

## 🎯 Déployment Files

Dự án đã có sẵn:

```
.github/workflows/
├── deploy.yml              # Frontend auto-deploy
├── deploy-backend.yml      # Backend auto-deploy
├── SETUP_GITHUB_SECRETS.md # 👈 Đọc cái này đầu tiên!
├── GITHUB_AUTO_DEPLOY_GUIDE.md
└── QUICK_FIX_GUIDE.md
```

---

## 📞 Common Issues & Solutions

### ❌ "Permission denied (publickey)"
→ Check [SETUP_GITHUB_SECRETS.md](SETUP_GITHUB_SECRETS.md) Bước 8 (Troubleshooting)

### ❌ "Website không update sau push"
→ Check GitHub Actions logs: **Actions tab → View latest workflow**

### ❌ "Backend offline"
→ Run health check: `bash /var/www/fashionhbk.shop/scripts/server-health-check.sh`

### ❌ "SSL Certificate hết hạn"
→ Use health check script hoặc: `certbot renew && systemctl restart nginx`

---

## 🎓 Hiểu sâu hơn (Optional)

Nếu muốn hiểu GitHub Actions hoạt động như thế nào:

1. Đọc [GITHUB_AUTO_DEPLOY_GUIDE.md](GITHUB_AUTO_DEPLOY_GUIDE.md) full
2. Vào [.github/workflows/deploy.yml](.github/workflows/deploy.yml) xem code
3. Xem GitHub Actions logs khi deploy chạy

---

## 🎉 Success Criteria

Bạn đã setup thành công khi:

- ✅ GitHub Secrets có cả 3 biến
- ✅ `git push` không gây error trong Actions
- ✅ Website update sau vài phút push
- ✅ PM2 backend chạy bình thường
- ✅ Nginx serving frontend files

---

## 📋 Reference

**Commands thường dùng:**

```bash
# SSH vào server
ssh root@103.82.24.135

# Run health check
bash /var/www/fashionhbk.shop/scripts/server-health-check.sh

# View backend logs
pm2 logs fashion-backend

# View nginx status
systemctl status nginx

# Renew SSL (nếu hết hạn)
certbot renew

# Restart all services
pm2 restart all
systemctl restart nginx
```

**GitHub Actions workflow chỉ trigger khi:**
- ✅ Push lên branch `main`
- ✅ `.github/workflows/*.yml` config có thay đổi

---

## 🎊 Tóm tắt

| Bước | Action | Link |
|------|--------|------|
| 1️⃣ | Setup GitHub Secrets | [SETUP_GITHUB_SECRETS.md](SETUP_GITHUB_SECRETS.md) |
| 2️⃣ | Push code | `git push origin main` |
| 3️⃣ | Monitor deploy | GitHub **Actions** tab |
| 4️⃣ | Website live | https://fashionhbk.shop |
| 🚨 | Server issue | [QUICK_FIX_GUIDE.md](../QUICK_FIX_GUIDE.md) |

---

**🚀 Bắt đầu ngay: Mở [SETUP_GITHUB_SECRETS.md](SETUP_GITHUB_SECRETS.md)**

---

**Version:** 1.0  
**Last Updated:** 2026-03-23  
**Status:** ✅ Production Ready
