# Production Deployment Complete Setup Guide - ssnlc.in

This document provides a complete step-by-step guide for deploying the SSNLC website to a production VPS with NGINX SSL/TLS, Docker, and GitHub Actions CI/CD.

## 📋 Table of Contents
1. [PART A: VPS PRODUCTION DEPLOYMENT](#part-a-vps-production-deployment)
2. [PART B: CI/CD PIPELINE](#part-b-cicd-pipeline)
3. [Verification & Monitoring](#verification--monitoring)
4. [Troubleshooting](#troubleshooting)

---

## PART A: VPS PRODUCTION DEPLOYMENT

### Prerequisites
- Fresh Ubuntu 22.04 LTS VPS
- Root SSH access
- Domain: ssnlc.in with DNS A record pointing to VPS IP
- GitHub repository with the code

### A1: Initial Server Hardening (5 minutes)

**On your local machine, generate SSH keys if not already done:**
```bash
ssh-keygen -t ed25519 -C "devx@ssnlc.in" -f ~/.ssh/ssnlc_vps
# Press enter twice (no passphrase for automated deploys)
cat ~/.ssh/ssnlc_vps.pub  # Copy this for step 2
```

**Connect to your VPS as root and run the hardening script:**
```bash
ssh root@<VPS_IP>

# Download the hardening script
wget https://raw.githubusercontent.com/AbhiDevepl/Law-Collage-Website/main/scripts/vps-hardening.sh
sudo bash vps-hardening.sh

# When prompted for SSH key, add your public key to devx user
cat your_public_key.pub | sudo -u devx tee /home/devx/.ssh/authorized_keys
sudo -u devx chmod 600 /home/devx/.ssh/authorized_keys

# Verify SSH key-based login works
exit
ssh -i ~/.ssh/ssnlc_vps devx@<VPS_IP>
```

### A2: Docker Installation (5 minutes)

**Still connected as devx user:**
```bash
# Download and run Docker installation script
wget https://raw.githubusercontent.com/AbhiDevepl/Law-Collage-Website/main/scripts/docker-install.sh
sudo bash docker-install.sh

# Verify Docker installation
docker --version
docker compose version

# Log out and log back in for group changes to take effect
exit
ssh -i ~/.ssh/ssnlc_vps devx@<VPS_IP>
docker ps  # Should work without sudo now
```

### A3: Repository + SSL Setup (10 minutes)

**As devx user:**
```bash
# Setup GitHub SSH keys (optional if you already have them)
ssh-keygen -t ed25519 -C "devx@ssnlc.in" -N ""
cat ~/.ssh/id_ed25519.pub  # Add to GitHub Deploy Keys

# Download and run repo setup script
wget https://raw.githubusercontent.com/AbhiDevepl/Law-Collage-Website/main/scripts/vps-repo-setup.sh
bash vps-repo-setup.sh

# When prompted:
# 1. Press Enter to continue
# 2. Follow certbot prompts (ensure DNS A record is already set)

# Verify setup
cd /home/devx/Law-Collage-Website
ls -la nginx/ssl/
cat .env | grep DOMAIN
```

### A4: Production Launch (5 minutes)

**As devx user in the project directory:**
```bash
cd /home/devx/Law-Collage-Website

# Make launch script executable
chmod +x scripts/vps-launch.sh

# Run launch script
bash scripts/vps-launch.sh

# Script will:
# 1. Build Docker images
# 2. Start containers
# 3. Run health checks
# 4. Display status

# Verify all services running
docker compose -f docker-compose.prod.yml ps
```

**Test HTTPS in browser:**
```
https://ssnlc.in
```

---

## PART B: CI/CD PIPELINE

### B1: GitHub Secrets Setup

Go to your GitHub repository:
1. Settings → Secrets and variables → Actions
2. Create these secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `VPS_HOST` | Your VPS IP or domain | `203.0.113.25` |
| `VPS_USER` | SSH user | `devx` |
| `SSH_PRIVATE_KEY` | Full private key content | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

**To get SSH private key content:**
```bash
cat ~/.ssh/ssnlc_vps  # Your private key file
# Copy the entire output (including BEGIN and END lines)
```

### B2: GitHub Actions Workflow

The workflow file `.github/workflows/deploy.yml` is already created. It:
- Triggers on push to `main` branch
- Runs tests (build check)
- Deploys to VPS if tests pass
- Performs health checks
- Rolls back on failure

**To trigger deployment:**
```bash
# Make a change, commit, and push to main
git add .
git commit -m "Update feature"
git push origin main

# GitHub Actions will automatically:
# 1. Build and test
# 2. SSH into VPS
# 3. Pull code
# 4. Rebuild Docker images
# 5. Start containers
# 6. Verify health
# 7. Rollback if needed
```

### B3: Rollback Script

The rollback script is already created at `scripts/rollback.sh`. It:
- Stops failed containers
- Reverts to previous Git commit
- Rebuilds previous images
- Restarts services
- Verifies health

**Manual rollback (if needed):**
```bash
ssh -i ~/.ssh/ssnlc_vps devx@<VPS_IP>
cd /home/devx/Law-Collage-Website
bash scripts/rollback.sh
```

### B4: Health Check Endpoint

Add this health check route to your Express backend:

**File: `server/routes/health.js`**
```javascript
const express = require('express');
const router = express.Router();
const os = require('os');
const packageJson = require('../../package.json');

router.get('/api/health', (req, res) => {
    const healthStatus = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.round(process.uptime()),
        version: packageJson.version || '1.0.0',
        environment: process.env.NODE_ENV || 'production'
    };
    res.status(200).json(healthStatus);
});

module.exports = router;
```

**Then in your main Express app (`server/app.js` or `server/src/app.js`):**
```javascript
const healthRoutes = require('./routes/health');
app.use('/', healthRoutes);

// Make sure MongoDB connection status is tracked
global.mongoConnected = false;
mongoose.connect(process.env.MONGODB_URI, () => {
    global.mongoConnected = true;
    console.log('✅ MongoDB connected');
});
```

---

## Verification & Monitoring

### Health Check Endpoints

```bash
# Test health endpoint
curl https://ssnlc.in/api/health
# Response should be: {"status":"ok","timestamp":"...","uptime":1234,...}

# Check NGINX
ssh -i ~/.ssh/ssnlc_vps devx@<VPS_IP>
docker exec ssnlc-nginx nginx -t

# MongoDB is external (Atlas/live URI). Connection is verified via /api/health/detailed

# View real-time logs
docker compose -f docker-compose.prod.yml logs -f

# Container status
docker compose -f docker-compose.prod.yml ps
```

### Certificate Renewal Status

```bash
# Check certificate expiration
sudo certbot certificates

# Manual renewal (if needed)
sudo certbot renew

# Cron job log
tail -f /tmp/certbot-renewal.log
```

### SSL Labs Test

Visit: https://www.ssllabs.com/ssltest/analyze.html?d=ssnlc.in

Target: Grade A+ (with all security features enabled)

---

## Troubleshooting

### Deployment Failed - Need to Rollback

```bash
ssh -i ~/.ssh/ssnlc_vps devx@<VPS_IP>
cd /home/devx/Law-Collage-Website
bash scripts/rollback.sh
```

### Services Not Starting

```bash
# View logs
docker compose -f docker-compose.prod.yml logs

# Check specific service
docker logs ssnlc-nginx
docker logs ssnlc-server
docker logs ssnlc-client

# Rebuild and restart
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
```

### Certificate Issues

```bash
# Check certificate details
openssl x509 -in /home/devx/Law-Collage-Website/nginx/ssl/cert.pem -noout -dates

# Manual renewal
sudo certbot renew --force-renewal

# Copy to project
sudo cp /etc/letsencrypt/live/ssnlc.in/fullchain.pem /home/devx/Law-Collage-Website/nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/ssnlc.in/privkey.pem /home/devx/Law-Collage-Website/nginx/ssl/key.pem

# Reload NGINX
docker exec ssnlc-nginx nginx -s reload
```

### High Memory/CPU Usage

```bash
# Check resource usage
docker stats

# Check container logs for errors
docker logs <container-name>

# Increase resource limits in docker-compose.prod.yml
# Then redeploy:
docker compose -f docker-compose.prod.yml up -d
```

### GitHub Actions Deployment Issues

1. Check GitHub Actions logs: Repository → Actions tab
2. Verify secrets are set correctly
3. Check SSH connectivity:
   ```bash
   # From GitHub runner perspective:
   ssh -v -i <ssh-key> devx@<VPS_IP>  # Should work without password
   ```

---

## Quick Reference Commands

### Daily Operations

```bash
# SSH into VPS
ssh -i ~/.ssh/ssnlc_vps devx@<VPS_IP>

# Project directory
cd /home/devx/Law-Collage-Website

# View services
docker compose -f docker-compose.prod.yml ps

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Restart a service
docker compose -f docker-compose.prod.yml restart server

# Manual deployment (after git push)
git pull origin main
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d

# Rollback to previous version
bash scripts/rollback.sh
```

### Monitoring

```bash
# Resource usage
docker stats

# Disk usage
df -h /

# Memory usage
free -h

# MongoDB is external (Atlas/live URI). Check via /api/health/detailed endpoint.

# Certificate expiration
sudo certbot certificates
```

### Security

```bash
# Check firewall
sudo ufw status

# View SSH connections
sudo tail -f /var/log/auth.log | grep sshd

# Fail2ban status
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

---

## Security Checklist

- ✅ SSH key-based authentication enabled
- ✅ Root login disabled
- ✅ Password authentication disabled
- ✅ UFW firewall configured (ports 22, 80, 443)
- ✅ Fail2ban installed and configured
- ✅ Let's Encrypt SSL certificate installed
- ✅ Automatic certificate renewal configured
- ✅ HSTS header enabled
- ✅ CSP header configured
- ✅ Rate limiting on API
- ✅ All services behind HTTPS
- ✅ Health checks configured
- ✅ Automated rollback on failure
- ✅ Logs configured with rotation

---

## Files Created

1. `scripts/vps-hardening.sh` - Server hardening
2. `scripts/docker-install.sh` - Docker installation
3. `scripts/vps-repo-setup.sh` - Repository + SSL setup
4. `scripts/vps-launch.sh` - Production launch
5. `scripts/rollback.sh` - Deployment rollback
6. `docker-compose.prod.yml` - Production Docker compose
7. `.github/workflows/deploy.yml` - GitHub Actions workflow
8. `HEALTH_CHECK_ENDPOINT.js` - Health check route (example)

---

## Support & Resources

- **Docker Documentation**: https://docs.docker.com
- **Docker Compose**: https://docs.docker.com/compose
- **Let's Encrypt**: https://letsencrypt.org
- **GitHub Actions**: https://docs.github.com/en/actions
- **NGINX Configuration**: https://nginx.org/en/docs
- **SSL/TLS Best Practices**: https://ssl-config.mozilla.org

---

**Last Updated**: May 12, 2026
**Status**: Production Ready ✅
