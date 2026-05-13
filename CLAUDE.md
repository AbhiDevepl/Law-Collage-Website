# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SSNLC Law College Website - a full-stack institutional website with Next.js frontend, Express.js backend, and MongoDB database.

## Architecture

- **Frontend**: Next.js 14 with App Router (`client/src/app/`). Client-side components use "use client" directive.
- **Backend**: Express.js API server (`server/`) running on port 5000
- **Database**: MongoDB via Mongoose
- **Reverse Proxy**: NGINX for HTTPS/SSL termination
- **Deployment**: Docker Compose with GitHub Actions CI/CD

### API Communication
Frontend calls backend via `NEXT_PUBLIC_API_URL` environment variable (default `/api` through NGINX proxy). Backend routes are under `/api/` prefix.

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

# Docker
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml logs -f
```

## Environment Variables

### Server (.env)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 5000)
- `FRONTEND_URI` - Frontend URL for CORS
- `NODE_ENV` - production/development

### Client (.env)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Health Check
Server exposes `GET /api/health` returning `{status, uptime, timestamp, version}`.