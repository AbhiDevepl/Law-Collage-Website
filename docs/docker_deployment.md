# 🚀 SSNLC Law College - Docker Deployment Guide

This document outlines the complete Docker-based architecture designed for the full-stack SSNLC Law College project, ensuring a scalable, production-ready environment.

---

## 📂 Architecture & Folder Structure

We have introduced the following files to containerize the project:

```text
Law-Collage-Website/
├── client/
│   ├── Dockerfile          # Multi-stage build for Next.js (Standalone)
│   └── .dockerignore       # Excludes node_modules, .next, etc.
├── server/
│   ├── Dockerfile          # Multi-stage build for Express API
│   └── .dockerignore       # Excludes node_modules, etc.
├── nginx/
│   └── nginx.conf          # Reverse proxy configuration
├── docker-compose.yml      # Orchestrates client, server, mongodb, and nginx
├── .env.example            # Environment variables template
└── docker_deployment.md    # This guide
```

---

## 🛠️ Step-by-Step Commands to Run

Follow these commands to deploy the project on your production server (or local machine for testing):

### 1. Configure Environment Variables
Copy the template `.env.example` to create your active `.env` file.
```bash
cp .env.example .env
```
*Note: Make sure to edit `.env` and set a strong `JWT_SECRET` and update URLs if you are using a custom domain instead of `localhost`.*

### 2. Build and Start the Containers
Use Docker Compose to build the multi-stage images and start all services in detached mode (`-d`).
```bash
docker-compose up -d --build
```

### 3. Verify Deployment
Check the status of all running containers. They should all say `Up (healthy)`.
```bash
docker-compose ps
```

To view logs for a specific service (e.g., the Next.js client):
```bash
docker-compose logs -f client
```

### 4. Stopping the Environment
To stop the services without deleting the database volume:
```bash
docker-compose stop
```
To bring everything down completely (use carefully, though the `mongodb_data` volume persists unless `-v` is passed):
```bash
docker-compose down
```

---

---

## ☁️ MongoDB is External

MongoDB **no longer runs inside Docker**. The production deployment connects to an external MongoDB instance (e.g., MongoDB Atlas) via the `MONGODB_URI` environment variable.

Set `MONGODB_URI` in your Coolify environment variables or in `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

No MongoDB container or volume is created.

---

## 📈 Notes on Scaling & Production Deployment

### 1. Frontend Scalability (Next.js)
* **Standalone Build:** The Next.js Dockerfile is optimized using `output: 'standalone'` in `next.config.js`. This drastically reduces the image size by copying only the necessary files.
* **Stateless:** The Next.js container is entirely stateless. You can scale horizontally by increasing the number of replicas:
  ```bash
  docker-compose up -d --scale client=3
  ```
  *Note: Nginx would automatically round-robin requests if configured with multiple upstream instances. In Swarm or Kubernetes, this is handled natively.*

### 2. Backend Scalability (Express)
* **Horizontal Scaling:** The backend is designed as a REST API. Assuming authentication relies on JWTs and session state isn't stored in memory, you can safely scale the `server` container horizontally.
* **Security:** The backend container runs under a non-root `expressjs` user to mitigate privilege escalation risks.

### 3. Reverse Proxy & Routing (Nginx)
* **Single Entry Point:** Nginx sits at the front (port `80`) and handles routing:
  * Traffic to `/api/*` is proxied to the backend (`server:5000`).
  * All other traffic is proxied to the frontend (`client:3000`).
* **Caching & Rate Limiting:** The `nginx.conf` includes basic setup for static file caching (for Next.js assets) and a rate-limiting zone to prevent DDoS attacks against the API.
* **HTTPS/SSL:** In a real production deployment, Nginx should be configured with SSL certificates (e.g., via Let's Encrypt/Certbot). We recommend putting a service like Traefik or a Cloudflare tunnel in front of this stack for automatic SSL.

### 4. Database (MongoDB External)
* MongoDB is **external** (Atlas / live URI). No Docker container or volume is created.
* Connection is configured via the `MONGODB_URI` environment variable.
* Data persistence and backups are managed by your MongoDB provider (e.g., Atlas).

### 5. CI/CD Integration
For future automation, you can create a `.github/workflows/deploy.yml` that:
1. Triggers on `push` to `main`.
2. Lints and tests code.
3. SSH's into your production server and runs `git pull && docker-compose up -d --build`.
