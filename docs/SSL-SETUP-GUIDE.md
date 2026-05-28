# NGINX SSL/TLS Production Setup Guide

## Overview
This guide covers the complete SSL/TLS setup for the SSNLC website with NGINX reverse proxy supporting both development (self-signed) and production (Let's Encrypt) certificates.

---

## Part 1: Development Setup (Self-Signed Certificates)

### Quick Start

1. **Generate self-signed certificates:**
```bash
chmod +x scripts/generate-self-signed.sh
./scripts/generate-self-signed.sh localhost 365
```

2. **Verify certificates were created:**
```bash
ls -la nginx/ssl/
```

Expected output:
```
-rw-r--r-- 1 cert.pem
-r------ 1 key.pem
```

3. **Build and run Docker containers:**
```bash
docker-compose build
docker-compose up -d
```

4. **Test HTTPS:**
```bash
# The browser will show a security warning (normal for self-signed)
# Accept the warning and visit: https://localhost

# Command line test with curl (ignore certificate verification)
curl -k https://localhost
curl -k https://localhost/api/health
```

### Self-Signed Certificate Details

- **Location:** `nginx/ssl/cert.pem` and `nginx/ssl/key.pem`
- **Validity:** 365 days (customizable)
- **Algorithm:** RSA 2048-bit
- **Purpose:** Development and testing only

⚠️ **Important:** Self-signed certificates are NOT suitable for production. Browsers and clients will show security warnings.

---

## Part 2: Production Setup (Let's Encrypt with Certbot)

### Prerequisites

- Public domain name (e.g., `ssnlc.edu.in`)
- Server accessible from the internet on port 80 and 443
- SSH access to the server
- Root or sudo privileges

### Step-by-Step Installation

#### 1. Install Certbot on Host Server

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# RHEL/CentOS
sudo yum install certbot python3-certbot-nginx

# macOS (if testing locally)
brew install certbot
```

#### 2. Generate Let's Encrypt Certificate

**Option A: Standalone Mode** (Simplest, but requires stopping NGINX temporarily)

```bash
sudo certbot certonly --standalone \
  -d ssnlc.edu.in \
  -d www.ssnlc.edu.in \
  --email admin@ssnlc.edu.in \
  --agree-tos \
  --non-interactive
```

**Option B: Webroot Mode** (Recommended with Docker)

First, ensure your NGINX is running, then:

```bash
sudo certbot certonly --webroot \
  -w ./public \
  -d ssnlc.edu.in \
  -d www.ssnlc.edu.in \
  --email admin@ssnlc.edu.in \
  --agree-tos \
  --non-interactive
```

#### 3. Verify Certificate Installation

```bash
sudo ls -la /etc/letsencrypt/live/ssnlc.edu.in/
```

Expected files:
```
-rw-r--r-- cert.pem       (Your SSL certificate)
-rw-r--r-- chain.pem      (Intermediate certificates)
-rw-r--r-- fullchain.pem  (Cert + chain combined)
-r------ privkey.pem      (Your private key)
```

#### 4. Update Docker Compose for Production

Uncomment and modify the volumes section in `docker-compose.yml`:

```yaml
volumes:
  - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
  - /etc/letsencrypt/live/ssnlc.edu.in:/etc/nginx/ssl:ro
```

Then update the nginx.conf references:
- Change: `/etc/nginx/ssl/cert.pem` → `/etc/nginx/ssl/fullchain.pem`
- Change: `/etc/nginx/ssl/key.pem` → `/etc/nginx/ssl/privkey.pem`

**Updated nginx.conf snippet:**
```nginx
ssl_certificate /etc/nginx/ssl/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/privkey.pem;
ssl_trusted_certificate /etc/nginx/ssl/chain.pem;
```

#### 5. Enable OCSP Stapling (Optional, Recommended)

Uncomment in `nginx.conf`:
```nginx
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/nginx/ssl/chain.pem;
```

#### 6. Rebuild and Restart Docker Containers

```bash
docker-compose build
docker-compose down
docker-compose up -d
```

#### 7. Test HTTPS Configuration

```bash
# Test SSL/TLS
curl -v https://ssnlc.edu.in/
curl https://ssnlc.edu.in/api/health

# Verify HTTP → HTTPS redirect
curl -i http://ssnlc.edu.in/  # Should show 301 redirect

# Test with SSL Labs (online)
# https://www.ssllabs.com/ssltest/analyze.html?d=ssnlc.edu.in
```

### Step 3: Automatic Renewal

Let's Encrypt certificates expire after 90 days. Set up automatic renewal:

#### A. Create Renewal Script

Create `scripts/renew-certificates.sh`:

```bash
#!/bin/bash
# Automatic Let's Encrypt certificate renewal
# Add this to crontab for automatic execution

DOMAIN="ssnlc.edu.in"
CERT_DIR="/etc/letsencrypt/live/$DOMAIN"
EMAIL="admin@ssnlc.edu.in"

# Renew certificate
sudo certbot renew --quiet --non-interactive

# If renewal successful, reload NGINX
if [ -f "$CERT_DIR/fullchain.pem" ]; then
    docker exec ssnlc-nginx nginx -s reload
    echo "✅ Certificates renewed and NGINX reloaded"
else
    echo "❌ Certificate renewal failed"
    exit 1
fi
```

#### B. Add to Crontab

```bash
# Run renewal daily at 2 AM
sudo crontab -e
```

Add this line:
```
0 2 * * * /path/to/scripts/renew-certificates.sh >> /var/log/letsencrypt-renewal.log 2>&1
```

Or using systemd timer (modern approach):

Create `/etc/systemd/system/certbot-renewal.timer`:
```ini
[Unit]
Description=Run Certbot renewal daily

[Timer]
OnCalendar=daily
OnCalendar=06:00
RandomizedDelaySec=3600
Persistent=true

[Install]
WantedBy=timers.target
```

Create `/etc/systemd/system/certbot-renewal.service`:
```ini
[Unit]
Description=Certbot renewal service
After=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/bin/certbot renew --quiet
ExecStartPost=/usr/bin/docker exec ssnlc-nginx nginx -s reload
```

Enable the timer:
```bash
sudo systemctl enable certbot-renewal.timer
sudo systemctl start certbot-renewal.timer
sudo systemctl status certbot-renewal.timer
```

---

## Part 3: Monitoring & Troubleshooting

### Check Certificate Expiration

```bash
# Check expiration date
certbot certificates

# Or with openssl
sudo openssl x509 -in /etc/letsencrypt/live/ssnlc.edu.in/cert.pem -noout -dates
```

### NGINX SSL Tests

```bash
# Check NGINX configuration
docker exec ssnlc-nginx nginx -t

# Check SSL/TLS settings
openssl s_client -connect localhost:443 -tls1_2

# Verify cipher suites
openssl ciphers -v 'ECDHE-ECDSA-AES128-GCM-SHA256:...'
```

### HSTS Pre-loading

To enable HSTS pre-loading (already set in nginx.conf):

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

Submit your domain to [HSTS Preload List](https://hstspreload.org/):
- Enter: `ssnlc.edu.in`
- Verify HSTS header is present
- Submit for inclusion

### Common Issues

#### Issue: Certificate not found in Docker
**Solution:** Ensure volume mount path matches the certificate location:
```bash
docker inspect ssnlc-nginx | grep -A 5 Mounts
```

#### Issue: NGINX won't start after certificate update
**Solution:** Restart the NGINX service:
```bash
docker-compose restart nginx
```

#### Issue: Mixed content warnings (HTTP + HTTPS)
**Solution:** Ensure all backend requests use HTTPS and update CSP headers in nginx.conf.

---

## Part 4: Environment Configuration

### .env File Template

Create `.env` file in project root:

```bash
# Domain configuration
DOMAIN=ssnlc.edu.in
ENVIRONMENT=production

# Frontend
NEXT_PUBLIC_API_URL=https://ssnlc.edu.in/api
FRONTEND_URI=https://ssnlc.edu.in

# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_very_secure_jwt_secret_here

# SSL/TLS
SSL_MODE=letsencrypt  # or 'selfsigned'
CERT_EMAIL=admin@ssnlc.edu.in
```

Load environment variables:
```bash
export $(cat .env | xargs)
docker-compose up -d
```

---

## Part 5: Security Best Practices

### ✅ Already Implemented

- **TLS 1.2 & 1.3 only** (no legacy SSL/TLS versions)
- **Strong cipher suites** (ECDHE, AES-GCM, ChaCha20-Poly1305)
- **HSTS header** (31536000 seconds = 1 year)
- **CSP header** (Content Security Policy)
- **X-Frame-Options** (clickjacking protection)
- **X-Content-Type-Options** (MIME sniffing protection)
- **X-XSS-Protection** (XSS attack mitigation)

### 🔐 Additional Recommendations

1. **Rate Limiting** (Already in place for `/api/`)
   ```bash
   Current: 30 requests/sec, burst 10
   ```

2. **DDoS Protection**
   - Consider using Cloudflare or similar CDN
   - Enable NGINX rate limiting zones

3. **Certificate Pinning** (Advanced)
   - Useful for mobile apps
   - Configure via HTTP Public Key Pinning (HPKP)

4. **Web Application Firewall**
   - Consider ModSecurity with OWASP CRS
   - Useful for production environments

---

## Quick Reference Commands

```bash
# Development
./scripts/generate-self-signed.sh ssnlc.local 365
docker-compose up -d

# Production
sudo certbot certonly --standalone -d ssnlc.edu.in
docker-compose up -d

# Monitoring
docker logs -f ssnlc-nginx
curl -v https://ssnlc.edu.in/

# Renewal
sudo certbot renew --dry-run
sudo certbot renew

# Clean up
docker-compose down
sudo rm -rf nginx/ssl/*  # Only for self-signed!
```

---

## Resources

- [Let's Encrypt Official Docs](https://letsencrypt.org/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [OWASP SSL/TLS Best Practices](https://owasp.org/www-project-web-security-testing-guide/)
- [SSL Labs Best Practices](https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [NGINX SSL/TLS Configuration](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)

