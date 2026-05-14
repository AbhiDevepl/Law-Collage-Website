#!/bin/bash
set -e

DEPLOY_DIR="/home/devx/Law-Collage-Website"
COMPOSE_FILE="docker-compose.prod.yml"
LOG_FILE="$DEPLOY_DIR/logs/rollback.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "============================================"
log "Starting rollback procedure..."
log "============================================"

cd "$DEPLOY_DIR"

log "Stopping current containers..."
docker compose -f "$COMPOSE_FILE" down --timeout 30 || true
sleep 5

log "Restoring previous Docker images..."
for service in client server nginx; do
    if docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "law-college-website-${service}:previous"; then
        docker tag "law-college-website-${service}:previous" "law-college-website-${service}:latest"
        log "Restored ${service} image"
    else
        log "WARNING: No previous image found for ${service}"
    fi
done

log "Starting services with previous images..."
docker compose -f "$COMPOSE_FILE" up -d

log "Verifying health after rollback..."
sleep 30
HEALTH_OK=false
for i in 1 2 3; do
    if curl -sf https://ssnlc.in/api/health >/dev/null 2>&1; then
        HEALTH_OK=true
        log "Health check passed after rollback"
        break
    fi
    sleep 10
done

log "Container statuses:"
docker compose -f "$COMPOSE_FILE" ps

if [ "$HEALTH_OK" = true ]; then
    log "Rollback completed successfully"
else
    log "ERROR: Rollback completed but health checks failed - manual intervention required"
    exit 1
fi
