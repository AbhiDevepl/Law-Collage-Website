# ============================================================
# PART A: SERVER SETUP COMMANDS (A1-A2)
# ============================================================

# ============================================================
# A1. INITIAL SERVER HARDENING
# ============================================================

# Login as root and update system packages
apt update && apt upgrade -y

# Install essential packages
apt install -y curl wget git ufw fail2ban unattended-upgrades

# Create non-root sudo user (devx)
adduser devx
usermod -aG sudo devx

# Create SSH directory for devx and set correct permissions
mkdir -p /home/devx/.ssh
chmod 700 /home/devx/.ssh

# Enable passwordless sudo for devx user
echo "devx ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/devx
chmod 440 /etc/sudoers.d/devx

# Setup SSH key-based authentication (run on your LOCAL machine first):
# ssh-keygen -t ed25519 -C "your_email@example.com"
# ssh-copy-id devx@YOUR_VPS_IP

# Disable root SSH login and password authentication
sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#?PermitEmptyPasswords.*/PermitEmptyPasswords no/' /etc/ssh/sshd_config

# Restart SSH service
systemctl restart sshd

# Configure UFW firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable
ufw status verbose

# Install and configure Fail2ban
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
EOF

systemctl enable fail2ban
systemctl restart fail2ban
fail2ban-client status

# ============================================================
# A2. DOCKER INSTALLATION ON UBUNTU 22.04
# ============================================================

# Remove old Docker versions if any
apt remove -y docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc 2>/dev/null || true

# Install prerequisites
apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update and install Docker Engine
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add devx user to docker group
usermod -aG docker devx

# Enable Docker on system startup
systemctl enable docker
systemctl enable containerd

# Start Docker
systemctl start docker

# Verify Docker installation
docker --version
docker compose version
docker run --rm hello-world

# Test docker compose plugin
docker compose version

# ============================================================
# END OF A1-A2 SERVER SETUP
# ============================================================