# Nginx Deployment & SSL Configuration Guide

## Overview

This document describes the process of deploying the Fashion Website frontend to a production Ubuntu server using Nginx as a reverse proxy with Let's Encrypt SSL certificates for HTTPS.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTPS/HTTP
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Nginx (Reverse Proxy)                           │
│         Port 80 (HTTP) & 443 (HTTPS)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Redirect HTTP → HTTPS                               │   │
│  │ Serve Static Files (dist/)                          │   │
│  │ Proxy /api/* → Backend (Port 5000)                  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────┬──────────────────────┬────────────────────┘
                 │                      │
          Static Files            Backend API
        (/var/www/...)            (localhost:5000)
```

---

## Process & Workflow

### Step 1: Build Frontend

**Why**: Production requires optimized, minified assets instead of dev server files.

```bash
cd frontend
npm install
npm run build
```

**Output**: Creates `frontend/dist/` with optimized assets.

---

### Step 2: Create Server Directory Structure

**Why**: Organize files and follow Linux FHS (Filesystem Hierarchy Standard).

```bash
sudo mkdir -p /var/www/fashionhbk.shop/frontend
sudo mkdir -p /var/www/certbot
```

---

### Step 3: Upload Frontend Files via SCP

**Why**: Secure file transfer from local machine to remote server.

**Command** (run from Windows, in `d:\fashion-website`):

```bash
scp -r frontend/dist/* root@103.82.24.135:/var/www/fashionhbk.shop/frontend/
```

**Why SCP over alternatives**:

- Encrypted (SSH-based)
- Simple and reliable
- No need for additional services

---

### Step 4: Configure Nginx

#### Initial Configuration Issues

**Problem 1: Symlink Already Exists**

```
ln: failed to create symbolic link '/etc/nginx/sites-enabled/fashionhbk.shop.conf':
File exists
```

**Solution**:

```bash
# Option A: Remove and recreate
sudo rm /etc/nginx/sites-enabled/fashionhbk.shop.conf
sudo ln -s /etc/nginx/sites-available/fashionhbk.shop.conf /etc/nginx/sites-enabled/

# Option B: Force overwrite (simpler)
sudo ln -sf /etc/nginx/sites-available/fashionhbk.shop.conf /etc/nginx/sites-enabled/
```

---

### Step 5: SSL Certificate Generation

#### Problem 2: Certificate Files Don't Exist

```
nginx: [emerg] cannot load certificate "/etc/letsencrypt/live/fashionhbk.shop/fullchain.pem"
```

**Reason**: Nginx config references SSL certificates that haven't been created yet.

**Solution**: Use HTTP-only config first to generate certificates.

#### Problem 3: DNS Not Pointing to Server

```
Domain: fashionhbk.shop
Type: unauthorized
Detail: 84.32.84.32: Invalid response from http://fashionhbk.shop/.well-known/acme-challenge/...
```

**Root Cause**: DNS was pointing to `84.32.84.32` instead of server IP `103.82.24.135`.

**Solution**:

1. Update DNS A record in domain registrar to `103.82.24.135`
2. Wait 5-15 minutes for DNS propagation
3. Verify with: `nslookup fashionhbk.shop`

#### Problem 4: Port 80 Already in Use

```
Could not bind TCP port 80 because it is already in use by another process
```

**Solution**:

```bash
# Find process using port 80
sudo lsof -i :80

# Stop nginx if running
sudo systemctl stop nginx

# Retry certbot
sudo certbot certonly --standalone -d fashionhbk.shop -d www.fashionhbk.shop
```

#### Successful Certificate Generation

```bash
sudo certbot certonly --standalone -d fashionhbk.shop -d www.fashionhbk.shop
```

**Output**:

```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/fashionhbk.shop/fullchain.pem
Key is saved at: /etc/letsencrypt/live/fashionhbk.shop/privkey.pem
This certificate expires on 2026-03-18.
```

---

### Step 6: Deploy Nginx Configuration

**File Lost Issue**:

```bash
cp: cannot stat '/tmp/fashionhbk.shop.conf': No such file or directory
```

**Reason**: Temporary file was deleted or not uploaded.

**Solution**: Re-upload from local machine:

```bash
cd "D:\fashion-website"
scp nginx/fashionhbk.shop.conf root@103.82.24.135:/tmp/
```

**On Server**:

```bash
sudo cp /tmp/fashionhbk.shop.conf /etc/nginx/sites-available/fashionhbk.shop.conf
sudo nginx -t
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

### Step 7: Enable Certificate Auto-Renewal

**Why**: Let's Encrypt certificates expire every 90 days. Automation prevents downtime.

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

**Verification**:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

---

## Final Nginx Configuration

Located at: `/etc/nginx/sites-available/fashionhbk.shop.conf`

**Key Features**:

- ✅ HTTP → HTTPS redirect
- ✅ HTTP/2 support
- ✅ Security headers (HSTS, X-Frame-Options, etc.)
- ✅ Static file caching (30 days)
- ✅ SPA routing (React Router fallback to index.html)
- ✅ API proxy to backend on port 5000
- ✅ Proper CORS headers forwarding

---

## Verification

**Test HTTPS**:

```bash
curl -I https://fashionhbk.shop
curl -I https://www.fashionhbk.shop
```

**Check Certificate**:

```bash
openssl s_client -connect fashionhbk.shop:443
```

**View Nginx Status**:

```bash
sudo systemctl status nginx
sudo nginx -t
```

**Check Certificate Renewal**:

```bash
sudo certbot renew --dry-run
```

---

## Troubleshooting Checklist

| Issue                        | Solution                                    |
| ---------------------------- | ------------------------------------------- |
| DNS not resolving            | Update A record to server IP, wait 5-15 min |
| Port 80 in use               | `sudo systemctl stop nginx` then retry      |
| Certificate generation fails | Stop nginx, use `--standalone` mode         |
| Symlink exists               | Use `sudo ln -sf` to force overwrite        |
| Nginx won't start            | Run `sudo nginx -t` to see errors           |
| Files lost in /tmp           | Re-upload with scp from local machine       |

---

## Security Best Practices Implemented

1. **HTTPS Only**: HTTP redirects to HTTPS (port 80 → 443)
2. **Strong SSL/TLS**: TLSv1.2 and TLSv1.3 only
3. **Security Headers**:

   - `Strict-Transport-Security`: Force HTTPS for 1 year
   - `X-Frame-Options`: Prevent clickjacking
   - `X-Content-Type-Options`: Prevent MIME sniffing
   - `X-XSS-Protection`: XSS protection

4. **API Proxy Headers**:
   - Forward real client IP
   - Forward protocol and host information

---

## Timeline & Certificate Renewal

- **Issued**: 2025-12-19
- **Expires**: 2026-03-18 (90 days)
- **Auto-renewal**: Enabled via certbot.timer
- **Renewal Attempt**: 30 days before expiration

---

## Summary

| Component         | Configuration                                   |
| ----------------- | ----------------------------------------------- |
| **Server IP**     | 103.82.24.135                                   |
| **Domain**        | fashionhbk.shop, www.fashionhbk.shop            |
| **Frontend Path** | /var/www/fashionhbk.shop/frontend               |
| **Backend URL**   | http://localhost:5000                           |
| **Nginx Config**  | /etc/nginx/sites-available/fashionhbk.shop.conf |
| **SSL Cert**      | /etc/letsencrypt/live/fashionhbk.shop/          |
| **HTTP Port**     | 80 (redirects to 443)                           |
| **HTTPS Port**    | 443 (HTTP/2)                                    |

---

## Deployment Status

✅ **PRODUCTION READY**

- Frontend: Deployed
- SSL: Active (expires 2026-03-18)
- Auto-renewal: Enabled
- Backend proxy: Configured for port 5000
- Security headers: Implemented
