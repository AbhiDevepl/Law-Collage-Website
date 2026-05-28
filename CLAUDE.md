# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SSNLC Law College Website - a full-stack institutional website with Next.js frontend, Express.js backend, and MongoDB database.

## Architecture

- **Frontend**: Next.js 14 with App Router (`client/src/app/`). Client-side components use "use client" directive.
- **Backend**: Express.js API server (`server/`) running on port 5000
- **Database**: MongoDB via Mongoose
- **Reverse Proxy**: Coolify (Traefik) — handles SSL termination, routing, and security headers
- **Deployment**: Docker Compose via Coolify with GitHub Actions CI/CD

### API Communication
Frontend calls backend via Next.js `rewrites()` in `next.config.js` — proxies `/api/*` to `http://server:5000/api/*` internally via Docker network. The `NEXT_PUBLIC_API_URL` env var is set to `https://ssnlc.in/api` for client-side API calls.

### Coolify / Traefik
- Traefik labels on the `client` service handle domain routing, TLS, and security headers
- All services run on the `coolify` external Docker network
- SSL certificates are auto-managed by Traefik via Let's Encrypt
- `www.ssnlc.in` redirects to `ssnlc.in` via Traefik middleware

## Common Commands

```bash
# Client (Next.js)
cd client && npm install
npm run dev    # Development server on :3000
npm run build  # Production build
npm run lint   # Lint check

# Server (Express.js)
cd server && npm install
npm run dev    # Development with nodemon
npm start      # Production
npm run create-admin  # Create admin user

# Docker (via Coolify or manual fallback)
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml logs -f
```

## Environment Variables

### Server (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 5000)
- `FRONTEND_URI` - Frontend URL for CORS
- `NODE_ENV` - production/development

### Client (.env)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Health Check
Server exposes `GET /api/health` returning `{status, uptime, timestamp, version}`.