# VPS Setup Guide for ssnlc.in (Coolify)

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

## Step 2: Install Coolify

```bash
# Install Coolify (as root)
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

After installation, access the Coolify dashboard at `http://YOUR_VPS_IP:8000` and complete the initial setup.

Coolify automatically:
- Sets up Traefik as the reverse proxy
- Creates the `coolify` Docker network
- Manages Let's Encrypt SSL certificates
- Provides a web dashboard for managing deployments

---

## Step 3: Create Deployment User

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

## Step 4: SSH Key Setup (as devx)

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

## Step 5: Clone Repository

```bash
# As devx, clone the repo
cd /home/devx
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git Law-Collage-Website
cd Law-Collage-Website
```

---

## Step 6: Set Environment Variables in Coolify

**Do NOT create a local `.env` file.** Instead, add these environment variables in the Coolify dashboard:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string (Atlas or any external MongoDB) |
| `JWT_SECRET` | Secret key for JWT token signing |
| `CLOUDINARY_CLOUD_NAME` | (Optional) Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | (Optional) Cloudinary API key |
| `CLOUDINARY_API_SECRET` | (Optional) Cloudinary API secret |

Example values:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_secure_random_string_here_change_this
```

**Generate a secure JWT_SECRET:**
```bash
openssl rand -base64 32
```

> **Important:** MongoDB is now external. The `MONGODB_URI` must point to a live MongoDB instance (e.g., MongoDB Atlas). No MongoDB Docker container will be created.

---

## Step 7: Firewall Setup (as root)

```bash
# Configure UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 80/tcp     # HTTP (Traefik)
sudo ufw allow 443/tcp    # HTTPS (Traefik)
sudo ufw allow 8000/tcp   # Coolify dashboard
sudo ufw --force enable
sudo ufw status verbose
```

> **Note:** Port 8000 is for the Coolify admin dashboard. Consider restricting access to your IP only in production.

---

## Step 8: Deploy via Coolify Dashboard

### Option A: Coolify Native Deployment (Recommended)
1. Open Coolify dashboard at `http://YOUR_VPS_IP:8000`
2. Add a new Resource → Application → Docker Compose
3. Connect your GitHub repository
4. Set the domain to `ssnlc.in`
5. Add environment variables (especially `MONGODB_URI` and `JWT_SECRET`)
6. Deploy

### Option B: Manual Docker Compose (Fallback)
```bash
# As devx, in project directory
cd /home/devx/Law-Collage-Website

# Create .env file with required variables
cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_secure_random_string_here_change_this
EOF

chmod 600 .env

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
# Test via internal Docker exec
docker compose -f docker-compose.prod.yml exec client wget -qO- http://localhost:3000/

# Test API health
docker compose -f docker-compose.prod.yml exec client wget -qO- http://localhost:3000/api/health

# Test external (after Traefik routing is active)
curl https://ssnlc.in
curl https://ssnlc.in/api/health

# Check security headers
curl -I https://ssnlc.in

# View logs
docker compose -f docker-compose.prod.yml logs --tail=100

# Check running containers (should show client and server only)
docker ps
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

---

## Adding New Projects to Coolify

Each new project on the same VPS:
1. Coolify dashboard → New Resource → Application
2. Connect GitHub repo
3. Set domain (e.g., `client2.com`)
4. SSL auto-generated by Traefik
5. Deploy

No manual docker-compose, certbot, or reverse proxy configuration needed.
