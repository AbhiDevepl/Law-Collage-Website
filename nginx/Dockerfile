# NGINX Alpine-based production reverse proxy with SSL/TLS support
FROM nginx:alpine

# Install OpenSSL and curl for health checks
RUN apk add --no-cache openssl curl

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create SSL certificate directory
RUN mkdir -p /etc/nginx/ssl

# Copy SSL certificates (they will be mounted as volumes or copied at build time)
# For development, we'll generate self-signed certificates in the entrypoint
# For production with Let's Encrypt, mount them as volumes

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
