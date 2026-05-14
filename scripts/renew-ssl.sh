#!/bin/bash
set -e

LOG_FILE="/home/devx/Law-Collage-Website/logs/ssl-renewal.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting SSL certificate renewal..."

certbot renew --quiet --non-interactive

log "Restarting NGINX to pick up renewed certificates..."
cd /home/devx/Law-Collage-Website
docker compose -f docker-compose.prod.yml restart nginx

log "SSL renewal completed successfully"
