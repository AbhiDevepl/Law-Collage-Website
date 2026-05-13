# ============================================================
# PART A3: REPOSITORY + SSL SETUP
# ============================================================

# Switch to devx user
su - devx

# ============================================================
# A3.1: CLONE REPO FROM GITHUB (SSH METHOD)
# ============================================================

# Generate SSH key (run on VPS as devx)
ssh-keygen -t ed25519 -C "devx@ssnlc.in" -f ~/.ssh/id_ed25519

# Add public key to GitHub (add to deploy keys in repo settings)
cat ~/.ssh/id_ed25519.pub

# Add GitHub to known_hosts
echo "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI6umpRUzj3Mvq3qYPY5iTJgY9HElOCuSpQw6l1mqf3WL" >> ~/.ssh/known_hosts

# Create SSH config for GitHub
cat > ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
EOF

chmod 600 ~/.ssh/config

# Test SSH connection
ssh -T git@github.com

# Clone repository
cd /home/devx
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git Law-Collage-Website

# Navigate to project directory
cd /home/devx/Law-Collage-Website

# ============================================================
# A3.2: SETUP .ENV FILE ON SERVER
# ============================================================

# Create production .env file
cat > /home/devx/Law-Collage-Website/.env << 'EOF'
# Production Environment Variables for ssnlc.in

# Node Environment
NODE_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=https://ssnlc.in/api
FRONTEND_URI=https://ssnlc.in

# Backend
PORT=5000
JWT_SECRET=your_super_secure_jwt_secret_key_here_change_in_production

# Database (using Docker Compose MongoDB)
MONGO_URI=mongodb://ssnlc-mongodb:27017/ssnlc

# Cloudinary (if using)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EOF

chmod 600 /home/devx/Law-Collage-Website/.env
chown devx:devx /home/devx/Law-Collage-Website/.env

# ============================================================
# A3.3: SETUP NGINX/SSL/ DIRECTORY
# ============================================================

# Create SSL directory with correct permissions
mkdir -p /home/devx/Law-Collage-Website/nginx/ssl
chmod 755 /home/devx/Law-Collage-Website/nginx/ssl
chown devx:devx /home/devx/Law-Collage-Website/nginx/ssl

# ============================================================
# A3.4: RUN LET'S ENCRYPT CERTBOT FOR ssnlc.in
# ============================================================

# Install Certbot
apt update
apt install -y certbot python3-certbot-nginx

# Stop any running containers using port 80
cd /home/devx/Law-Collage-Website
docker compose down 2>/dev/null || true

# Generate SSL certificate using standalone method (ensure port 80 is free)
certbot certonly --standalone -d ssnlc.in -d www.ssnlc.in --agree-tos --email admin@ssnlc.in

# Copy certificates to nginx/ssl directory
cp /etc/letsencrypt/live/ssnlc.in/fullchain.pem /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
cp /etc/letsencrypt/live/ssnlc.in/privkey.pem /home/devx/Law-Collage-Website/nginx/ssl/key.pem
chmod 644 /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
chmod 600 /home/devx/Law-Collage-Website/nginx/ssl/key.pem
chown devx:devx /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
chown devx:devx /home/devx/Law-Collage-Website/nginx/ssl/key.pem

# Verify certificates
ls -la /home/devx/Law-Collage-Website/nginx/ssl/

# ============================================================
# A3.5: SETUP AUTO-RENEWAL CRON JOB
# ============================================================

# Create Certbot renewal hook script
cat > /home/devx/certbot-renewal-hook.sh << 'EOF'
#!/bin/bash
# This script copies renewed certificates to the nginx/ssl directory

# Copy new certificates
cp /etc/letsencrypt/live/ssnlc.in/fullchain.pem /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
cp /etc/letsencrypt/live/ssnlc.in/privkey.pem /home/devx/Law-Collage-Website/nginx/ssl/key.pem

# Set correct permissions
chmod 644 /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
chmod 600 /home/devx/Law-Collage-Website/nginx/ssl/key.pem
chown devx:devx /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
chown devx:devx /home/devx/Law-Collage-Website/nginx/ssl/key.pem

# Reload nginx container
cd /home/devx/Law-Collage-Website
docker compose exec -T nginx nginx -s reload

echo "Certificates renewed and copied at $(date)" >> /var/log/certbot-renewal.log
EOF

chmod +x /home/devx/certbot-renewal-hook.sh

# Edit Certbot renewal config to use the hook
cat > /etc/letsencrypt/renewal/ssnlc.conf << 'EOF'
renew_hook = /home/devx/certbot-renewal-hook.sh
EOF

# Test renewal (dry-run)
certbot renew --dry-run

# Add cron job for automatic renewal (twice daily)
crontab -e

# Add this line to crontab:
# 0 0,12 * * * certbot renew --quiet --deploy-hook /home/devx/certbot-renewal-hook.sh

# Verify crontab
crontab -l

# ============================================================
# END OF A3 REPO + SSL SETUP
# ============================================================