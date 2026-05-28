# ============================================================
# PART A5: FIRST PRODUCTION LAUNCH
# ============================================================

# Navigate to project directory
cd /home/devx/Law-Collage-Website

# ============================================================
# A5.1: BUILD ALL IMAGES
# ============================================================

# Build all Docker images (no cache for first build)
docker compose -f docker-compose.prod.yml build --no-cache

# ============================================================
# A5.2: START SERVICES IN DETACHED MODE
# ============================================================

# Start all services in detached mode
docker compose -f docker-compose.prod.yml up -d

# ============================================================
# A5.3: VERIFY ALL CONTAINERS RUNNING
# ============================================================

# Check container status
docker compose -f docker-compose.prod.yml ps

# Check container health status
docker compose -f docker-compose.prod.yml ps --format "table {{.Name}}\t{{.Status}}\t{{.Health}}"

# View all logs
docker compose -f docker-compose.prod.yml logs --tail=50

# View logs per service:
docker compose -f docker-compose.prod.yml logs nginx --tail=100
docker compose -f docker-compose.prod.yml logs client --tail=100
docker compose -f docker-compose.prod.yml logs server --tail=100
# Note: MongoDB is external (Atlas/live URI). No mongodb container.

# ============================================================
# A5.4: TEST HTTPS
# ============================================================

# Wait for services to be fully started
sleep 30

# Test HTTPS connection
curl -v -k https://localhost

# Test HTTPS from external (run from your local machine)
# curl -v -k https://ssnlc.in

# Test API health endpoint
curl -f https://localhost/api/health || curl -f http://localhost:5000/api/health

# ============================================================
# A5.5: ROLLBACK COMMAND IF SOMETHING FAILS
# ============================================================

# Stop all services
docker compose -f docker-compose.prod.yml down

# To rollback to previous version (use the rollback script):
# bash /home/devx/Law-Collage-Website/scripts/rollback.sh

# To rebuild and restart:
# docker compose -f docker-compose.prod.yml up -d --build

# Check what's currently running
docker compose -f docker-compose.prod.yml ps

# View real-time logs
docker compose -f docker-compose.prod.yml logs -f

# ============================================================
# TROUBLESHOOTING COMMANDS
# ============================================================

# Restart a specific service
docker compose -f docker-compose.prod.yml restart nginx

# Check NGINX config test
docker exec ssnlc-nginx nginx -t

# Restart NGINX inside container
docker exec ssnlc-nginx nginx -s reload

# Check server logs
docker logs ssnlc-server --tail=100

# Check client logs
docker logs ssnlc-client --tail=100

# Check MongoDB connection from server
docker exec ssnlc-server sh -c "wget -q -O - http://localhost:5000/api/health"

# Enter container for debugging
docker exec -it ssnlc-server sh
docker exec -it ssnlc-client sh
docker exec -it ssnlc-nginx sh

# Remove all containers and volumes (CLEAN START)
docker compose -f docker-compose.prod.yml down -v

# ============================================================
# END OF A5 LAUNCH + VERIFY
# ============================================================