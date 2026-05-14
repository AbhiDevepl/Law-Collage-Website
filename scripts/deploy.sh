#!/bin/bash
set -e

DEPLOY_DIR="/home/devx/Law-Collage-Website"
COMPOSE_FILE="docker-compose.prod.yml"
mkdir -p "$DEPLOY_DIR/logs"
LOG_FILE="$DEPLOY_DIR/logs/deploy.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "============================================"
log "Starting deployment to ssnlc.in"
log "============================================"

# Step 1: Pre-flight checks
log "Step 1: Running pre-flight checks..."

if ! docker info >/dev/null 2>&1; then
    log "ERROR: Docker is not running"
    exit 1
fi

# Check Let's Encrypt certs (source of truth — not nginx/ssl copy)
if [ ! -f "/etc/letsencrypt/live/ssnlc.in/fullchain.pem" ] || \
   [ ! -f "/etc/letsencrypt/live/ssnlc.in/privkey.pem" ]; then
    log "ERROR: SSL certificates not found at /etc/letsencrypt/live/ssnlc.in/"
    exit 1
fi

if [ ! -f "$DEPLOY_DIR/.env" ]; then
    log "ERROR: .env file not found at $DEPLOY_DIR/.env"
    exit 1
fi

log "Pre-flight checks passed ✅"

# Step 2: Git pull
log "Step 2: Pulling latest code..."
cd "$DEPLOY_DIR"
git pull origin main
log "Recent commits:"
git log --oneline -3

# Step 3: Stop existing containers
log "Step 3: Stopping existing containers..."
docker compose -f "$COMPOSE_FILE" down --timeout 30 || true

# Step 4: Tag current images as :previous for rollback
log "Step 4: Tagging current images as :previous..."
docker tag law-college-website-client:latest law-college-website-client:previous 2>/dev/null || true
docker tag law-college-website-server:latest law-college-website-server:previous 2>/dev/null || true
docker tag law-college-website-nginx:latest law-college-website-nginx:previous 2>/dev/null || true

# Step 5: Build new images
log "Step 5: Building new Docker images..."
if ! docker compose -f "$COMPOSE_FILE" build --no-cache; then
    log "ERROR: Docker build failed"
    exit 1
fi

# Step 6: Start services
log "Step 6: Starting services..."
docker compose -f "$COMPOSE_FILE" up -d

# Step 7: Wait for containers to initialize
log "Waiting 15s for containers to initialize..."
sleep 15

# Step 8: Health check
log "Step 7: Running health checks..."
HEALTH_OK=false
for i in 1 2 3 4 5; do
    log "Health check attempt $i/5..."
    if curl -sf --max-time 10 https://ssnlc.in/api/health >/dev/null 2>&1; then
        HEALTH_OK=true
        log "Health check passed ✅"
        break
    fi
    log "Attempt $i failed, retrying in 10s..."
    sleep 10
done

if [ "$HEALTH_OK" = false ]; then
    log "ERROR: Health check failed after 5 attempts. Triggering rollback..."
    bash "$DEPLOY_DIR/scripts/rollback.sh"
    exit 1
fi

# Step 9: Success
log "============================================"
log "✅ Deployed successfully to https://ssnlc.in"
log "============================================"
docker compose -f "$COMPOSE_FILE" ps