#!/bin/bash
# ============================================================
# ROLLBACK SCRIPT (B4)
# Zero-downtime rollback for ssnlc.in
# Usage: bash /home/devx/Law-Collage-Website/scripts/rollback.sh
# ============================================================

set -e

# Configuration
DEPLOY_DIR="/home/devx/Law-Collage-Website"
COMPOSE_FILE="docker-compose.prod.yml"
LOG_FILE="/var/log/ssnlc-rollback.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log with timestamp
log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "${YELLOW}============================================${NC}"
log "${YELLOW}🔄 Starting rollback procedure...${NC}"
log "${YELLOW}============================================${NC}"

# Navigate to project directory
cd "$DEPLOY_DIR" || {
    log "${RED}❌ Failed to navigate to $DEPLOY_DIR${NC}"
    exit 1
}

# ============================================================
# STEP 1: Stop current containers
# ============================================================
log "📦 Step 1: Stopping current containers..."

# Gracefully stop containers
docker compose -f "$COMPOSE_FILE" down --remove-orphans 2>/dev/null || true

# Wait for containers to stop
sleep 5

# ============================================================
# STEP 2: Restore previous image tags
# ============================================================
log "🔄 Step 2: Restoring previous Docker images..."

# Check if previous images exist
PREVIOUS_CLIENT_IMAGE=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep "client:previous" | head -1)
PREVIOUS_SERVER_IMAGE=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep "server:previous" | head -1)

if [ -n "$PREVIOUS_CLIENT_IMAGE" ]; then
    log "Found previous client image: $PREVIOUS_CLIENT_IMAGE"
    docker tag "$PREVIOUS_CLIENT_IMAGE" ssnlc-client:latest
    log "✅ Restored client image to :latest"
else
    log "${YELLOW}⚠️  No previous client image found, will rebuild from cache${NC}"
fi

if [ -n "$PREVIOUS_SERVER_IMAGE" ]; then
    log "Found previous server image: $PREVIOUS_SERVER_IMAGE"
    docker tag "$PREVIOUS_SERVER_IMAGE" ssnlc-server:latest
    log "✅ Restored server image to :latest"
else
    log "${YELLOW}⚠️  No previous server image found, will rebuild from cache${NC}"
fi

# ============================================================
# STEP 3: Restart services with previous images
# ============================================================
log "🚀 Step 3: Restarting services with previous images..."

# Start all services
docker compose -f "$COMPOSE_FILE" up -d

# Wait for services to start
log "⏳ Waiting for services to start..."
sleep 30

# ============================================================
# STEP 4: Verify health
# ============================================================
log "🏥 Step 4: Verifying service health..."

HEALTH_OK=true

# Check NGINX
if docker exec ssnlc-nginx nginx -t 2>/dev/null; then
    log "✅ NGINX configuration valid"
else
    log "${RED}❌ NGINX health check failed${NC}"
    HEALTH_OK=false
fi

# Check API
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker exec ssnlc-server wget -q -O - http://localhost:5000/api/health 2>/dev/null | grep -q "ok"; then
        log "✅ API health check passed"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    log "Retry $RETRY_COUNT/$MAX_RETRIES..."
    sleep 5
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    log "${RED}❌ API health check failed after $MAX_RETRIES retries${NC}"
    HEALTH_OK=false
fi

# ============================================================
# STEP 5: Final status
# ============================================================
log "📊 Final container status:"
docker compose -f "$COMPOSE_FILE" ps | tee -a "$LOG_FILE"

if [ "$HEALTH_OK" = true ]; then
    log "${GREEN}============================================${NC}"
    log "${GREEN}✅ Rollback completed successfully!${NC}"
    log "${GREEN}🎉 Services running with previous version${NC}"
    log "${GREEN}============================================${NC}"
else
    log "${RED}============================================${NC}"
    log "${RED}❌ Rollback completed but health checks failed!${NC}"
    log "${RED}🔧 Manual intervention required${NC}"
    log "${RED}============================================${NC}"
    echo ""
    echo "Debug commands:"
    echo "  docker logs ssnlc-server --tail=100"
    echo "  docker logs ssnlc-client --tail=100"
    echo "  docker logs ssnlc-nginx --tail=100"
    echo "  docker compose -f $COMPOSE_FILE logs"
    exit 1
fi

# ============================================================
# ALTERNATIVE: Manual Git rollback (if image restore failed)
# ============================================================
# Uncomment below if you need to rollback to a specific commit:
#
# git log --oneline -10
# git reset --hard <COMMIT_SHA>
# docker compose -f "$COMPOSE_FILE" up -d --build

# ============================================================
# END OF ROLLBACK SCRIPT
# ============================================================