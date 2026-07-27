# AGENTS.md

Project context for opencode agents.

## Project Overview

SSNLC Law College Website — full-stack institutional site with Next.js frontend, Express.js backend, MongoDB database.

## Architecture

```
client/          → Next.js 14 App Router (src/app/)
server/          → Express.js API (server.js, port 5000)
docker-compose.prod.yml → Coolify/Traefik deployment
```

### API Communication

- Next.js `rewrites()` proxies `/api/*` → `http://server:5000/api/*` internally
- Client env var: `NEXT_PUBLIC_API_URL=https://ssnlc.in/api`

### Coolify / Traefik

- Traefik labels handle domain routing, TLS, security headers
- All services on `coolify` external Docker network
- SSL via Let's Encrypt auto-managed
- `www.ssnlc.in` → `ssnlc.in` redirect

## Tech Stack

**Client:** Next.js 14, React 18, Tailwind CSS, Framer Motion, Flowbite React, Lucide React, SweetAlert2

**Server:** Express.js 4, Mongoose 7, JWT (jsonwebtoken), bcryptjs, CORS, rate-limit

## Commands

```bash
# Client
cd client && npm run dev        # Dev server :3000
cd client && npm run build      # Production build
cd client && npm run lint       # Lint check

# Server
cd server && npm run dev        # Dev with nodemon
cd server && npm start          # Production
cd server && npm run create-admin  # Create admin user

# Docker
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## Environment

**Server (.env):**
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `PORT` — Server port (default: 5000)
- `FRONTEND_URI` — Frontend URL for CORS
- `NODE_ENV` — production/development

**Client (.env):**
- `NEXT_PUBLIC_API_URL` — Backend API URL

## API Routes

- `GET /api/health` — Returns `{status, uptime, timestamp, version}`

## Conventions

- Client-side components use `"use client"` directive
- Server runs on port 5000
- Client runs on port 3000 (dev)
