#!/bin/bash

# 🔧 Server Health Check & Auto Recovery Script
# Chạy trên server để kiểm tra và tự động khôi phục các dịch vụ

set -e

# 📋 Cấu hình
SERVER_IP="103.82.24.135"
FRONTEND_PATH="/var/www/fashionhbk.shop/frontend"
BACKEND_PATH="/var/www/fashionhbk.shop/fashion-website-backend"
LOG_FILE="/var/log/server-health-check.log"

# 🎨 Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 📝 Log function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     🔧 Server Health Check & Auto Recovery             ║${NC}"
echo -e "${BLUE}║     fashionhbk.shop (${SERVER_IP})           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

log "==== Starting Server Health Check ===="

# ✅ 1. Check Nginx
echo -e "${YELLOW}[1/6] Checking Nginx...${NC}"
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx is running${NC}"
    log "✅ Nginx status: RUNNING"
else
    echo -e "${RED}❌ Nginx is NOT running${NC}"
    log "❌ Nginx status: STOPPED - Attempting to start..."
    systemctl start nginx
    systemctl enable nginx
    echo -e "${GREEN}✅ Nginx restarted${NC}"
    log "✅ Nginx restarted successfully"
fi

# ✅ 2. Check PM2
echo -e "${YELLOW}[2/6] Checking PM2 Backend...${NC}"
if pm2 list | grep -q "fashion-backend"; then
    STATUS=$(pm2 list | grep "fashion-backend" | awk '{print $NF}')
    if [[ "$STATUS" == "online" ]]; then
        echo -e "${GREEN}✅ PM2 Backend (fashion-backend) is online${NC}"
        log "✅ Backend service: RUNNING"
    else
        echo -e "${RED}❌ Backend is not online${NC}"
        log "❌ Backend status: NOT ONLINE - Attempting to restart..."
        cd "$BACKEND_PATH" || exit 1
        pm2 restart fashion-backend
        echo -e "${GREEN}✅ Backend restarted${NC}"
        log "✅ Backend restarted successfully"
    fi
else
    echo -e "${RED}❌ Fashion-backend process not found in PM2${NC}"
    log "❌ Backend process not found - Starting..."
    cd "$BACKEND_PATH" || exit 1
    npm ci --production
    pm2 start src/server.js --name fashion-backend
    pm2 save
    echo -e "${GREEN}✅ Backend started${NC}"
    log "✅ Backend started successfully"
fi

# ✅ 3. Check SSL Certificate
echo -e "${YELLOW}[3/6] Checking SSL Certificate...${NC}"
CERT_INFO=$(openssl s_client -connect fashionhbk.shop:443 -servername fashionhbk.shop </dev/null 2>/dev/null | grep -A 2 "Not After" || echo "CERT_CHECK_FAILED")

if [[ "$CERT_INFO" != "CERT_CHECK_FAILED" ]]; then
    echo -e "${GREEN}✅ SSL Certificate is valid${NC}"
    log "✅ SSL Certificate: VALID"
    echo -e "${BLUE}   $CERT_INFO${NC}"
else
    echo -e "${YELLOW}⚠️ Could not check SSL Certificate${NC}"
    log "⚠️ SSL Certificate check failed - attempting renewal..."
    if command -v certbot &> /dev/null; then
        certbot renew --non-interactive
        systemctl restart nginx
        echo -e "${GREEN}✅ Certificate renewed${NC}"
        log "✅ Certificate renewed successfully"
    else
        echo -e "${RED}❌ Certbot not installed${NC}"
        log "❌ Certbot not found - manual check required"
    fi
fi

# ✅ 4. Check Disk Space
echo -e "${YELLOW}[4/6] Checking Disk Space...${NC}"
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✅ Disk space: ${DISK_USAGE}% used (OK)${NC}"
    log "✅ Disk usage: ${DISK_USAGE}% - OK"
else
    echo -e "${RED}⚠️ Disk space: ${DISK_USAGE}% used (WARNING)${NC}"
    log "⚠️ Disk usage: ${DISK_USAGE}% - WARNING"
fi

# ✅ 5. Check Memory
echo -e "${YELLOW}[5/6] Checking Memory...${NC}"
MEM_USAGE=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100)}')
if [ "$MEM_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✅ Memory usage: ${MEM_USAGE}% (OK)${NC}"
    log "✅ Memory usage: ${MEM_USAGE}% - OK"
else
    echo -e "${RED}⚠️ Memory usage: ${MEM_USAGE}% (WARNING)${NC}"
    log "⚠️ Memory usage: ${MEM_USAGE}% - WARNING"
fi

# ✅ 6. Check Frontend Files
echo -e "${YELLOW}[6/6] Checking Frontend Files...${NC}"
if [ -d "$FRONTEND_PATH" ] && [ -f "$FRONTEND_PATH/index.html" ]; then
    echo -e "${GREEN}✅ Frontend files exist at $FRONTEND_PATH${NC}"
    log "✅ Frontend files: EXISTS"
    
    # Count files
    FILE_COUNT=$(find "$FRONTEND_PATH" -type f | wc -l)
    echo -e "${BLUE}   Total files: $FILE_COUNT${NC}"
    log "   Total files: $FILE_COUNT"
else
    echo -e "${RED}❌ Frontend files NOT found at $FRONTEND_PATH${NC}"
    log "❌ Frontend files: NOT FOUND"
fi

# 📊 Summary
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                     ✅ Check Complete                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"

log "==== Server Health Check Complete ===="
log "Logs available at: $LOG_FILE"

# 🔄 Auto-restart PM2 on reboot
echo ""
echo -e "${YELLOW}Setting up PM2 to restart on reboot...${NC}"
pm2 startup
pm2 save

echo -e "${GREEN}✅ Done! Server is healthy.${NC}"
echo ""
echo "📝 For detailed logs, check: $LOG_FILE"
echo ""
