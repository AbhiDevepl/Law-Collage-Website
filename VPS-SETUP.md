# VPS Setup Guide for ssnlc.in

Run these commands in order on your VPS as root user.

---

## Step 1: System Update & Docker Installation

```bash
# Update system packages
apt update && apt upgrade -y

# Install prerequisites
apt install -y ca-certificates curl gnupg lsb-release

# Add Docker GPG key
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify Docker
docker --version
docker compose version
```

---

## Step 2: Create Deployment User

```bash
# Create devx user
adduser devx

# Add to sudo group
usermod -aG sudo devx

# Passwordless sudo
echo "devx ALL=(ALL) NOPASSWD: ALL" | tee /etc/sudoers.d/devx
chmod 440 /etc/sudoers.d/devx

# Add devx to docker group (so can run docker without sudo)
usermod -aG docker devx

# Exit root and switch to devx
exit
```

---

## Step 3: SSH Key Setup (as devx)

```bash
# Switch to devx
su - devx

# Generate SSH key
ssh-keygen -t ed25519 -C "devx@ssnlc.in"

# Display public key - ADD THIS TO GITHUB
cat ~/.ssh/id_ed25519.pub
```

**Add the above public key to GitHub:** Repo Settings → Deploy Keys → Add deploy key

---

## Step 4: Clone Repository

```bash
# As devx, clone the repo
cd /home/devx
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git Law-Collage-Website
cd Law-Collage-Website
```

---

## Step 5: Setup SSL Certificate

```bash
# Install certbot
sudo apt install -y certbot

# Stop any running containers
sudo docker compose down 2>/dev/null || true

# Generate SSL certificate (port 80 must be free)
sudo certbot certonly --standalone -d ssnlc.in -d www.ssnlc.in --agree-tos --email admin@ssnlc.in

# Copy certificates to nginx/ssl folder
sudo cp /etc/letsencrypt/live/ssnlc.in/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/ssnlc.in/privkey.pem nginx/ssl/key.pem

# Set correct permissions
chmod 644 nginx/ssl/cert.pem
chmod 600 nginx/ssl/key.pem
```

---

## Step 6: Create .env File

```bash
# Create production .env file
cat > .env << 'EOF'
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://ssnlc.in/api
FRONTEND_URI=https://ssnlc.in
PORT=5000
JWT_SECRET=your_secure_random_string_here_change_this
MONGO_URI=mongodb://ssnlc-mongodb:27017/ssnlc
EOF

chmod 600 .env
```

**Generate a secure JWT_SECRET:**
```bash
openssl rand -base64 32
```

---

## Step 7: Firewall Setup (as root)

```bash
# Configure UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status verbose
```

---

## Step 8: Build & Start Services

```bash
# As devx, in project directory
cd /home/devx/Law-Collage-Website

# Build and start all services
docker compose -f docker-compose.prod.yml up -d --build

# Wait for containers to start
sleep 30

# Check status
docker compose -f docker-compose.prod.yml ps
```

---

## Step 9: Verify Deployment

```bash
# Test HTTPS locally
curl -k https://localhost

# Test API health
curl http://localhost:5000/api/health
# OR
curl https://ssnlc.in/api/health

# View logs
docker compose -f docker-compose.prod.yml logs --tail=100

# Check running containers
docker ps
```

---

## Setup Auto-Renewal for SSL

```bash
# Create renewal script
cat > /home/devx/certbot-renewal-hook.sh << 'EOF'
#!/bin/bash
cp /etc/letsencrypt/live/ssnlc.in/fullchain.pem /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
cp /etc/letsencrypt/live/ssnlc.in/privkey.pem /home/devx/Law-Collage-Website/nginx/ssl/key.pem
chmod 644 /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
chmod 600 /home/devx/Law-Collage-Website/nginx/ssl/key.pem
cd /home/devx/Law-Collage-Website
docker compose exec -T nginx nginx -s reload
EOF

chmod +x /home/devx/certbot-renewal-hook.sh

# Add to certbot renewal config
echo "renew_hook = /home/devx/certbot-renewal-hook.sh" | sudo tee /etc/letsencrypt/renewal/ssnlc.conf

# Test renewal
sudo certbot renew --dry-run
```

---

## Common Commands

```bash
# Restart services
docker compose -f docker-compose.prod.yml restart

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Stop services
docker compose -f docker-compose.prod.yml down

# Rebuild and start
docker compose -f docker-compose.prod.yml up -d --build

# Check container health
docker compose -f docker-compose.prod.yml ps
```