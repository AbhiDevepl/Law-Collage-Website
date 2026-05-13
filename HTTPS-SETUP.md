# NGINX HTTPS/SSL-TLS Production Setup

Complete production-ready NGINX reverse proxy configuration with SSL/TLS termination support for the SSNLC website.

## 📋 Quick Start

### Development (Self-Signed Certificates)

```bash
# 1. Generate self-signed certificates
chmod +x scripts/generate-self-signed.sh
./scripts/generate-self-signed.sh localhost 365

# 2. Start Docker containers
docker-compose up -d

# 3. Access via HTTPS (browser will warn about self-signed cert)
# https://localhost
```

### Production (Let's Encrypt)

```bash
# 1. Make deploy script executable and run
chmod +x scripts/deploy-ssl.sh
./scripts/deploy-ssl.sh yourdomain.com admin@yourdomain.com

# 2. Certificates are automatically obtained and configured
# 3. Services are started automatically
# https://yourdomain.com
```

---

## 📁 File Structure

```
nginx/
├── Dockerfile              # NGINX Alpine-based image with SSL support
├── nginx.conf             # Production NGINX configuration with SSL/TLS
├── SSL-SETUP-GUIDE.md     # Comprehensive SSL/TLS setup documentation
├── ssl/
│   ├── README.md          # SSL directory documentation
│   ├── cert.pem           # SSL certificate (generated or symlinked)
│   └── key.pem            # Private key (generated or symlinked)
scripts/
├── generate-self-signed.sh # Generate self-signed certificates for dev
├── deploy-ssl.sh          # Full production deployment with Let's Encrypt
├── build.sh               # Build all Docker images
└── ...
.env.example               # Environment configuration template
docker-compose.yml         # Updated with SSL volume mounts
```

---

## 🔧 Configuration Details

### NGINX Configuration (`nginx.conf`)

Key features:

✅ **HTTP → HTTPS Redirect**
- All HTTP traffic redirected to HTTPS (301 permanent)

✅ **Modern TLS Only**
- TLS 1.2 and 1.3 (no legacy protocols)
- Strong cipher suites (ECDHE, AES-GCM, ChaCha20-Poly1305)

✅ **Security Headers**
- `Strict-Transport-Security` (HSTS) - 1 year preload
- `Content-Security-Policy` (CSP) - Prevents XSS
- `X-Frame-Options` - Clickjacking protection
- `X-Content-Type-Options` - MIME sniffing protection
- `X-XSS-Protection` - Legacy XSS protection
- `Referrer-Policy` - Strict referrer control
- `Permissions-Policy` - Restricts browser features

✅ **Reverse Proxy**
- Frontend: `http://client:3000`
- Backend: `http://server:5000`

✅ **Rate Limiting**
- API endpoints: 30 req/s with 10 burst
- Zone: `limit_req_zone`

✅ **Caching**
- Static files: 1 year cache (immutable)
- Next.js assets: `/_next/static/`

### Docker Compose Updates

```yaml
nginx:
  build:
    context: ./nginx
    dockerfile: Dockerfile
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./nginx/ssl:/etc/nginx/ssl:ro
  environment:
    - DOMAIN=${DOMAIN:-localhost}
    - ENVIRONMENT=${ENVIRONMENT:-development}
```

---

## 🚀 Deployment Options

### Option 1: Self-Signed (Development)

Best for: Local development, testing, staging

```bash
./scripts/generate-self-signed.sh yourdomain.local 365
docker-compose up -d
# Access: https://yourdomain.local (ignore browser warnings)
```

Pros:
- No external dependencies
- Instant certificate generation
- Suitable for development

Cons:
- Browser security warnings
- Certificate expires after specified period
- Not suitable for production

---

### Option 2: Let's Encrypt (Production)

Best for: Production deployments, public-facing websites

```bash
./scripts/deploy-ssl.sh yourdomain.com admin@yourdomain.com production
```

What it does:
1. Creates `.env` with your configuration
2. Installs Certbot (if needed)
3. Generates Let's Encrypt certificate
4. Copies certificates to `nginx/ssl/`
5. Builds and starts Docker containers
6. Provides renewal instructions

Pros:
- Free SSL certificates
- Browser trusted (no warnings)
- Automatic renewal capability
- Industry standard

Requirements:
- Public domain name
- Server accessible on ports 80 and 443
- Email address for certificate notifications

---

### Option 3: Manual Setup

For advanced users:

```bash
# 1. Generate Let's Encrypt certificate
sudo certbot certonly --standalone \
  -d yourdomain.com \
  -d www.yourdomain.com \
  --email admin@yourdomain.com \
  --agree-tos

# 2. Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/key.pem
sudo chown $(id -u):$(id -g) nginx/ssl/*

# 3. Update docker-compose.yml volumes (uncomment Let's Encrypt section)

# 4. Build and start
docker-compose build
docker-compose up -d
```

---

## 🔄 Certificate Renewal

### Automatic Renewal (Recommended)

Add to crontab:
```bash
crontab -e
```

Add this line (runs daily at 2 AM):
```
0 2 * * * certbot renew --quiet && docker exec ssnlc-nginx nginx -s reload
```

### Manual Renewal

```bash
# Dry run (test without making changes)
sudo certbot renew --dry-run

# Actual renewal
sudo certbot renew

# Reload NGINX
docker exec ssnlc-nginx nginx -s reload
```

### Monitor Expiration

```bash
# Check certificate details
sudo openssl x509 -in /etc/letsencrypt/live/yourdomain.com/cert.pem -noout -dates

# Or with certbot
sudo certbot certificates
```

---

## 🧪 Testing & Validation

### Test HTTPS

```bash
# Basic HTTPS test
curl -v https://yourdomain.com

# Test redirect (should return 301)
curl -I http://yourdomain.com

# Test API endpoint
curl https://yourdomain.com/api/health

# With certificate verification (production)
curl https://yourdomain.com

# Without verification (self-signed certs)
curl -k https://yourdomain.com
```

### Validate SSL/TLS Configuration

```bash
# Check TLS version
openssl s_client -connect yourdomain.com:443 -tls1_2

# View certificate details
openssl x509 -in nginx/ssl/cert.pem -text -noout

# Check HSTS header
curl -I https://yourdomain.com | grep -i "strict-transport"

# Test with SSL Labs (online)
# https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com
```

### NGINX Configuration Validation

```bash
# Check NGINX config syntax
docker exec ssnlc-nginx nginx -t

# View running NGINX config
docker exec ssnlc-nginx nginx -T | less

# Check error logs
docker logs ssnlc-nginx

# Monitor real-time logs
docker logs -f ssnlc-nginx
```

---

## 🔒 Security Features

### Already Implemented

| Feature | Benefit | Config |
|---------|---------|--------|
| TLS 1.2 + 1.3 | Modern encryption | `ssl_protocols` |
| Strong ciphers | ECDHE, AES-GCM | `ssl_ciphers` |
| HSTS header | Enforce HTTPS | `Strict-Transport-Security` |
| CSP header | XSS prevention | `Content-Security-Policy` |
| X-Frame-Options | Clickjacking protection | `X-Frame-Options` |
| X-Content-Type-Options | MIME sniffing protection | `X-Content-Type-Options` |
| Session cache | Performance | `ssl_session_cache` |
| No old ciphers | Security | `ssl_prefer_server_ciphers` |

### HSTS Preloading (Optional)

After deployment, submit to [HSTS Preload List](https://hstspreload.org/):
1. Verify HSTS header present
2. No subdomains exempt
3. Submit domain

Benefits:
- Browsers force HTTPS before first visit
- Protection against SSL stripping attacks

### Additional Security Recommendations

1. **Keep certificates rotated** - Renew Let's Encrypt certs regularly
2. **Monitor certificate expiration** - Set email notifications
3. **Use strong JWT secrets** - At least 32 characters
4. **Enable rate limiting** - Already configured for API
5. **Update Docker images** - Regularly update `nginx:alpine`
6. **Enable OCSP Stapling** - Uncomment in nginx.conf for Let's Encrypt
7. **Set Content-Security-Policy** - Already configured, customize as needed

---

## 🐛 Troubleshooting

### NGINX won't start

```bash
# Check logs
docker logs ssnlc-nginx

# Validate config
docker exec ssnlc-nginx nginx -t

# Common issues:
# - Certificates not found: Ensure cert.pem and key.pem exist in nginx/ssl/
# - Permission denied: Check file permissions (644 cert, 600 key)
# - Port in use: Check ports 80 and 443 are available
```

### Certificate issues

```bash
# Check certificate file
openssl x509 -in nginx/ssl/cert.pem -text -noout

# Check key file
openssl rsa -in nginx/ssl/key.pem -check

# Verify certificate chain
openssl verify -CAfile nginx/ssl/chain.pem nginx/ssl/cert.pem
```

### SSL/TLS handshake errors

```bash
# Debug SSL handshake
openssl s_client -connect yourdomain.com:443 -tls1_2 -showcerts

# Check cipher compatibility
openssl ciphers -v 'ECDHE+AESGCM'
```

### HTTP redirect issues

```bash
# Test redirect
curl -I http://yourdomain.com  # Should return 301

# Check redirect location
curl -L http://yourdomain.com -v
```

---

## 📊 Monitoring & Logging

### View Logs

```bash
# All NGINX logs
docker logs ssnlc-nginx

# Follow logs in real-time
docker logs -f ssnlc-nginx

# Last 100 lines
docker logs --tail 100 ssnlc-nginx

# Logs since last 10 minutes
docker logs --since 10m ssnlc-nginx
```

### Monitor Services

```bash
# Container status
docker-compose ps

# Inspect NGINX container
docker inspect ssnlc-nginx

# View resource usage
docker stats ssnlc-nginx

# Check network connectivity
docker exec ssnlc-nginx ping client:3000
docker exec ssnlc-nginx ping server:5000
```

---

## 📚 Related Documentation

- **[SSL Setup Guide](nginx/SSL-SETUP-GUIDE.md)** - Comprehensive SSL/TLS documentation
- **[SSL Directory](nginx/ssl/README.md)** - Certificate management details
- **[NGINX Configuration](nginx/nginx.conf)** - Complete config with comments
- **[Docker Compose](docker-compose.yml)** - Service definitions
- **[Environment Configuration](.env.example)** - Environment variables template

---

## 🔗 Useful Resources

- [Let's Encrypt Official Docs](https://letsencrypt.org/docs/)
- [Certbot Documentation](https://certbot.eff.org/)
- [NGINX SSL Module](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)
- [Mozilla SSL Configuration](https://ssl-config.mozilla.org/)
- [OWASP TLS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)
- [SSL Labs Best Practices](https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)

---

## 📝 License

Same as parent project.

---

## ❓ Questions?

Refer to [SSL-SETUP-GUIDE.md](nginx/SSL-SETUP-GUIDE.md) for detailed documentation or check Docker/NGINX logs for troubleshooting.
