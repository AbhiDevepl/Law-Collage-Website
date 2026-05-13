# 🚀 NGINX SSL/TLS Setup - Quick Reference

## What Was Created

Your SSNLC website now has a complete production-ready HTTPS/SSL-TLS setup with NGINX reverse proxy.

### Files Created/Modified

```
✅ nginx/Dockerfile                  → Alpine NGINX with SSL support
✅ nginx/nginx.conf                  → Modern TLS + security headers
✅ nginx/SSL-SETUP-GUIDE.md          → Comprehensive documentation
✅ nginx/ssl/README.md               → Certificate directory guide
✅ scripts/generate-self-signed.sh   → Dev cert generator (executable)
✅ scripts/deploy-ssl.sh             → Production deployment (executable)
✅ docker-compose.yml                → Updated with SSL volumes & ports
✅ HTTPS-SETUP.md                    → Complete setup overview
✅ nginx/ssl/                        → Certificate directory (empty)
```

---

## 🎯 Quick Start

### For Development (Takes 2 minutes)

```bash
# 1. Generate self-signed certificates
./scripts/generate-self-signed.sh localhost 365

# 2. Start containers
docker-compose up -d

# 3. Access
open https://localhost
# Browser will warn about self-signed cert - this is normal ✅
```

### For Production (Takes 5 minutes)

```bash
# 1. Run production deployment (auto handles everything)
./scripts/deploy-ssl.sh yourdomain.com admin@yourdomain.com

# 2. Update DNS to point to your server
# 3. Access
open https://yourdomain.com
# No browser warnings - certificate is trusted ✅
```

---

## 🔒 What's Included

### Security Features

| Feature | Status |
|---------|--------|
| HTTPS/SSL 443 | ✅ Enabled |
| HTTP→HTTPS Redirect | ✅ Auto-redirect (301) |
| TLS 1.2 + 1.3 | ✅ Modern only |
| Strong Ciphers | ✅ ECDHE, AES-GCM, ChaCha20 |
| HSTS Header | ✅ 1 year preload |
| CSP Header | ✅ XSS prevention |
| X-Frame-Options | ✅ Clickjacking protection |
| X-Content-Type-Options | ✅ MIME sniffing protection |
| Rate Limiting | ✅ 30 req/s for API |
| Static Caching | ✅ 1 year for /_next/static/ |

### Infrastructure

| Component | Config |
|-----------|--------|
| Frontend | Next.js on `client:3000` |
| Backend | Express on `server:5000` |
| Proxy | NGINX with SSL termination |
| Database | MongoDB on `mongodb:27017` |
| Network | Docker bridge network |

---

## 📋 Common Commands

### Development

```bash
# Generate certs
./scripts/generate-self-signed.sh localhost 365

# Start all services
docker-compose up -d

# View logs
docker logs -f ssnlc-nginx

# Test HTTPS
curl -k https://localhost/
curl -k https://localhost/api/health

# Stop all services
docker-compose down
```

### Production

```bash
# Full deployment with Let's Encrypt
./scripts/deploy-ssl.sh yourdomain.com admin@yourdomain.com

# Renew certificates
sudo certbot renew

# Reload NGINX after renewal
docker exec ssnlc-nginx nginx -s reload

# Check certificate expiration
sudo certbot certificates
```

### Debugging

```bash
# NGINX config validation
docker exec ssnlc-nginx nginx -t

# View NGINX configuration
docker exec ssnlc-nginx nginx -T | less

# Check certificate details
openssl x509 -in nginx/ssl/cert.pem -text -noout

# Test SSL/TLS
openssl s_client -connect localhost:443 -tls1_2

# Check container status
docker-compose ps

# View network
docker network inspect ssnlc_network
```

---

## 📁 File Locations

### Certificates (Local)
```
nginx/ssl/
├── cert.pem     (public certificate)
└── key.pem      (private key)
```

### Certificates (Production with Let's Encrypt)
```
/etc/letsencrypt/live/yourdomain.com/
├── cert.pem / fullchain.pem
├── privkey.pem / key.pem
└── chain.pem
```

### Configuration
```
nginx/nginx.conf           (NGINX config)
docker-compose.yml         (Docker services)
.env                       (Environment variables)
```

### Documentation
```
HTTPS-SETUP.md             (This comprehensive guide)
nginx/SSL-SETUP-GUIDE.md   (Detailed SSL documentation)
nginx/ssl/README.md        (Certificate directory guide)
```

---

## 🔄 Certificate Renewal (Let's Encrypt)

### Automatic (Recommended)

Add to crontab:
```bash
crontab -e

# Add this line (runs daily at 2 AM)
0 2 * * * certbot renew --quiet && docker exec ssnlc-nginx nginx -s reload
```

### Manual

```bash
# Test renewal (no changes)
sudo certbot renew --dry-run

# Actual renewal
sudo certbot renew

# Reload NGINX
docker exec ssnlc-nginx nginx -s reload
```

### Monitor

```bash
# Check certificate expiration dates
sudo certbot certificates

# Or with OpenSSL
openssl x509 -in /etc/letsencrypt/live/yourdomain.com/cert.pem -noout -dates
```

---

## 🧪 Testing Your Setup

### Test HTTPS Connection

```bash
# Development (self-signed)
curl -k https://localhost/

# Production
curl https://yourdomain.com/

# With verbose output
curl -v https://yourdomain.com/
```

### Test Redirect

```bash
# Should redirect to HTTPS
curl -I http://yourdomain.com/
# Expected: HTTP/1.1 301 Moved Permanently
```

### Test API

```bash
# Frontend
curl -k https://localhost/

# Backend API
curl -k https://localhost/api/health
curl -k https://localhost/api/announcements
```

### SSL/TLS Validation

```bash
# Check TLS version support
openssl s_client -connect yourdomain.com:443 -tls1_2

# Check cipher suites
openssl ciphers -v 'ECDHE+AESGCM'

# Online SSL Labs test
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com
```

---

## 🐛 Troubleshooting

### NGINX not starting?

```bash
# Check logs
docker logs ssnlc-nginx

# Validate config
docker exec ssnlc-nginx nginx -t

# Common issues:
# - Certificates missing: Run generate-self-signed.sh
# - Port in use: Check port 80 and 443 are free
# - Permission denied: Ensure ssl/ directory is readable
```

### Certificate errors?

```bash
# Check certificate file
openssl x509 -in nginx/ssl/cert.pem -text -noout

# Check key file
openssl rsa -in nginx/ssl/key.pem -check

# Fix permissions
chmod 644 nginx/ssl/cert.pem
chmod 600 nginx/ssl/key.pem
```

### HSTS issues?

```bash
# Clear HSTS cache (browser)
# - Chrome: Settings → Privacy → Clear browsing data → Cookies
# - Firefox: about:networking (search HSTS)

# Or wait for HSTS to expire (max-age in header)
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [HTTPS-SETUP.md](HTTPS-SETUP.md) | Complete overview (this file) |
| [nginx/SSL-SETUP-GUIDE.md](nginx/SSL-SETUP-GUIDE.md) | Detailed SSL/TLS guide |
| [nginx/ssl/README.md](nginx/ssl/README.md) | Certificate management |
| [docker-compose.yml](docker-compose.yml) | Service definitions |
| [nginx/nginx.conf](nginx/nginx.conf) | NGINX configuration |

---

## 🔐 Security Checklist

- ✅ TLS 1.2+ only (no SSL 3.0, TLS 1.0, 1.1)
- ✅ Strong cipher suites (ECDHE, no weak ciphers)
- ✅ HSTS enabled (1 year)
- ✅ CSP header (XSS prevention)
- ✅ X-Frame-Options (clickjacking protection)
- ✅ X-Content-Type-Options (MIME sniffing)
- ✅ HTTP→HTTPS redirect
- ✅ Rate limiting on API (30 req/s)
- ✅ Security headers on all responses
- ⚠️ HSTS preload submission (optional, see SSL-SETUP-GUIDE.md)

---

## 🚀 Next Steps

1. **Development?** → Run `./scripts/generate-self-signed.sh localhost 365` then `docker-compose up -d`

2. **Production?** → Run `./scripts/deploy-ssl.sh yourdomain.com admin@yourdomain.com`

3. **Manual setup?** → See detailed instructions in [nginx/SSL-SETUP-GUIDE.md](nginx/SSL-SETUP-GUIDE.md)

4. **Issues?** → Check [Troubleshooting](#-troubleshooting) section or review logs with `docker logs -f ssnlc-nginx`

---

## 📞 Support Resources

- **Let's Encrypt Docs:** https://letsencrypt.org/docs/
- **Certbot Guide:** https://certbot.eff.org/docs/
- **NGINX SSL Module:** https://nginx.org/en/docs/http/ngx_http_ssl_module.html
- **Mozilla SSL Config:** https://ssl-config.mozilla.org/
- **OWASP TLS Cheat Sheet:** https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html

---

## 📝 Environment Variables

Create `.env` file or use defaults:

```bash
# Domain (required for production)
DOMAIN=localhost

# Environment mode
ENVIRONMENT=development

# API URLs
NEXT_PUBLIC_API_URL=http://localhost/api
FRONTEND_URI=http://localhost

# Backend config
PORT=5000
MONGO_URI=mongodb://mongodb:27017/ssnlc
JWT_SECRET=your_secure_jwt_secret_here

# Certificate email (required for Let's Encrypt)
CERT_EMAIL=admin@example.com
```

---

**Ready to secure your website? Start with the Quick Start section above! 🔐**
