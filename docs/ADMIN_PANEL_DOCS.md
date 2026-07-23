# SSNLC Law College — Admin Panel Documentation

## 1. Auth Flow

### Login
- **Client page:** `client/src/app/admin/login/page.js:18`
- **Server endpoint:** `POST /api/admin/login` → `server/src/routes/adminAuth.js:9`
- **Flow:** Username/password → server finds `Admin` in MongoDB → bcrypt compare → JWT signed with `JWT_SECRET`, 1-day expiry, payload `{id}` only → token returned

### Token storage
- Stored in **both** `localStorage` (key `adminToken`) and **cookie** (`adminToken`, 7-day expiry, `secure: true`, `sameSite: 'strict'`)
  - `client/src/app/admin/login/page.js:40-42`
- Logout clears both: `client/src/app/admin/dashboard/page.js:46-48`

### Token verification
- **Middleware:** `server/src/middleware/auth.js:4-37` — extracts `Bearer` token from `Authorization` header, verifies with `jwt.verify(token, process.env.JWT_SECRET)`
- **Dev bypass:** When `NODE_ENV === 'development'`, token verification is **completely skipped** (`auth.js:6-9`) — sets hardcoded `{username: 'admin', role: 'admin'}`

### Route protection (client-side)
- **Middleware:** `client/src/middleware.js:4-13`
- Matches `/admin/:path*` (excluding `/admin/login`)
- Checks **cookie only** (not localStorage) for `adminToken` — redirects to login if absent
- Does **not** validate the JWT — existence check only

### Roles
- JWT payload from login contains only `{id}` — **no role field**
- `isAdmin` middleware (`auth.js:41-49`) checks `req.user.role === 'admin'` but is **never used anywhere** and would always fail since the token has no `role`

### Admin model
- `server/src/models/Admin.js:4-18` — fields: `username` (unique), `password` (bcrypt-hashed), `createdAt`
- Pre-save hook hashes password with bcrypt (salt rounds 10): `Admin.js:21-27`
- Password comparison: `Admin.js:30-32`

### Default admin credentials
- **Username:** `admin`, **Password:** `Admin@123` (must exist in MongoDB `admins` collection)
- To create: `cd server && npm run create-admin` — **BROKEN** (see Issues section)

---

## 2. Routes / Pages

### Client-side (Next.js App Router)

| Route | File | Purpose | Auth required |
|---|---|---|---|
| `/admin/login` | `client/src/app/admin/login/page.js` | Login form | No |
| `/admin/dashboard` | `client/src/app/admin/dashboard/page.js` | Main dashboard + Announcements CRUD | Cookie check (middleware) |
| `/admin/dashboard/important-links` | `client/src/app/admin/dashboard/important-links/page.js` | Important Links CRUD | Cookie check (middleware) |

- **No `layout.js`, `loading.js`, or `error.js`** in any admin route segment
- Admin pages inherit root layout (`client/src/app/layout.js`) — public navbar and footer render around admin pages

### Server-side (Express)

| Endpoint | File | Method | Auth |
|---|---|---|---|
| `POST /api/admin/login` | `server/src/routes/adminAuth.js:9` | Login | None |
| `GET /api/announcements` | `server/routes/announcements.routes.js:7` | List all | **None** |
| `POST /api/announcements` | `server/routes/announcements.routes.js:13` | Create | **None** |
| `PUT /api/announcements/:id` | `server/routes/announcements.routes.js:21` | Update | **None** |
| `DELETE /api/announcements/:id` | `server/routes/announcements.routes.js:31` | Delete | **None** |
| `GET /api/important-links` | `server/src/routes/importantLink.routes.js:7` | Public list (active only) | None |
| `GET /api/important-links/:id` | `server/src/routes/importantLink.routes.js:8` | Public single | None |
| `GET /api/important-links/admin/all` | `server/src/routes/importantLink.routes.js:11` | Admin list (all) | `verifyToken` |
| `POST /api/important-links` | `server/src/routes/importantLink.routes.js:12` | Create | `verifyToken` |
| `PUT /api/important-links/:id` | `server/src/routes/importantLink.routes.js:13` | Update | `verifyToken` |
| `DELETE /api/important-links/:id` | `server/src/routes/importantLink.routes.js:14` | Delete | `verifyToken` |
| `GET /api/faculty` | `server/src/route/public.route.js:12` | Public faculty list | None |
| `GET /api/health` | `server/routes/health.js:7` | Health check | None |

---

## 3. Core Features

### Announcements CRUD
- **Client:** `client/src/app/admin/dashboard/page.js:51-107`
- **Server:** `server/routes/announcements.routes.js` (all 4 routes)
- **Model:** `server/src/model/announcement.model.js` — fields: `text` (required), timestamps
- **Features:** Create, read, update, delete. Search filter. Sort (newest/oldest). Delete confirmation modal.
- **Bug:** Sort logic references `a.date` / `b.date` (`dashboard/page.js:128-131`) but the model uses `createdAt` (from `timestamps: true`). Sort is effectively broken.

### Important Links CRUD
- **Client:** `client/src/app/admin/dashboard/important-links/page.js:67-130`
- **Server:** `server/src/routes/importantLink.routes.js` + `server/src/controller/importantLink.controller.js`
- **Model:** `server/src/models/ImportantLink.js` — fields: `title`, `url`, `isExternal`, `order`, `active`, timestamps
- **Features:** Create, read, update, delete. Search filter. Sort (order/title/newest/oldest). Inline table with status/type badges. Delete confirmation inline.

### Dashboard
- `client/src/app/admin/dashboard/page.js:179-204` — module cards for "Important Links" (navigates to sub-page) and "Announcements" (inline below card)

---

## 4. Data Flow

### Frontend → API → DB

```
Client (localhost:3000)
  → fetch('/api/...')
  → Next.js rewrite (next.config.js:68-73)
  → http://server:5000/api/...  (Docker network)
  → Express route handler
  → Mongoose model → MongoDB Atlas
```

### Key patterns
- All API calls go through Next.js `/api` rewrite — never direct to `server:5000` from the browser
- Bearer token sent via `Authorization` header (Important Links page) — but **not** sent for Announcements calls (no auth on those routes anyway)
- Responses: `{ success: boolean, ...data }` — no consistent error envelope

---

## 5. State Management

- **No global state** (no React Context, no Redux, no Zustand)
- Each admin page manages its own state with `useState` hooks:
  - `client/src/app/admin/dashboard/page.js:11-20` — announcements, form state, search, sort
  - `client/src/app/admin/dashboard/important-links/page.js:11-25` — links, form state, search, sort
- Auth state: `localStorage.getItem('adminToken')` checked on mount → redirect to login if absent
- No shared auth context between pages — each page independently checks localStorage

---

## 6. Third-Party Integrations

| Integration | Where | Status |
|---|---|---|
| **MongoDB Atlas** | `server/src/config/db.js` via `MONGODB_URI` | Active |
| **Cloudinary** | `server/src/utils/cloudinary.js` | Dead code — not mounted in any route; `cloudinary` not in `package.json` |
| **Google Tag Manager** | CSP allowlisted in `docker-compose.prod.yml:38` | Active (external) |
| **Google Analytics** | CSP allowlisted in `docker-compose.prod.yml:38` | Active (external) |

---

## 7. Known Issues / Bugs / TODOs

### Broken / Dead Code

| Issue | File:Line | Severity |
|---|---|---|
| `createAdmin` script references missing `user.model` — crashes at require | `server/scripts/createAdmin.js:2` | **Critical** — can't create admin |
| `carousel.controller.js` imports missing `carousel.model` — crashes at require | `server/src/controller/carousel.controller.js:1` | High |
| `notice.controller.js` imports missing `notice.model` — crashes at require | `server/src/controller/notice.controller.js:1` | High |
| `editNotice` calls `Event.updateOne()` instead of `Notice.updateOne()` — ReferenceError | `server/src/controller/notice.controller.js:70` | **Critical** |
| `createTokens.js` uses `ACCESS_TOKEN_KEY` / `REFRESH_TOKEN_KEY` env vars not defined anywhere | `server/src/utils/createTokens.js:8,19` | Medium |
| `generateSecretKey.js` is empty (1 blank line) | `server/src/utils/generateSecretKey.js:1` | Low |
| `DashboardCard.jsx` component never imported/used | `client/src/components/admin/dashboard/DashboardCard.jsx` | Low |
| Orphaned `server/src/app.js` — alternative Express setup, never imported | `server/src/app.js` | Low |
| 3 duplicate DB connection files (only `config/db.js` used) | `server/src/database/connection.js`, `database.js` | Low |
| Legacy `server/routes/adminAuth.routes.js` has only test endpoint — dead file | `server/routes/adminAuth.routes.js` | Low |

### Security Issues

| Issue | File:Line | Severity |
|---|---|---|
| **Announcements CRUD has ZERO auth** — anyone can create/edit/delete | `server/routes/announcements.routes.js` | **Critical** |
| `verifyToken` bypasses all auth when `NODE_ENV === 'development'` | `server/src/middleware/auth.js:6-9` | High (dev only) |
| `isAdmin` middleware never used; token payload has no `role` field | `server/src/middleware/auth.js:41-49` + `adminAuth.js:27` | Medium |
| No rate limiting on login endpoint — brute-force vulnerable | `server/src/routes/adminAuth.js:9` | Medium |
| `.env` with real MongoDB URI and JWT_SECRET committed to repo | `.env` | **Critical** |
| `cookie-parser` installed but never imported in `server.js` | `server/package.json` vs `server/server.js` | Low |

### Sorting Bug
- Announcement sort compares `a.date` / `b.date` but model uses `createdAt` — sort always produces same order
- `client/src/app/admin/dashboard/page.js:128-131`

### Debug Leftovers
- `console.log(error)` in `carousel.controller.js:20`, `event.controller.js:26`, `notice.controller.js:25`
- `console.error` in `auth.js:32`, `adminAuth.js:40`, `importantLink.controller.js:16,36,61,88,141,177`
- `console.log` in `config/db.js:7,14`, `database/connection.js:11`, `database/database.js:11` (connection status)
- `removeConsole` is enabled in production (`next.config.js:23`) so client logs are stripped, but server logs remain

---

## 8. Env Vars / Config

### Server (required)

| Var | Purpose | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing key | 64-byte hex string |
| `PORT` | Server port (default 5000) | `5000` |
| `NODE_ENV` | `production` or `development` | Controls auth bypass |
| `FRONTEND_URI` | CORS origin | `https://ssnlc.in` |

### Server (optional / unused)

| Var | Purpose | Status |
|---|---|---|
| `SESSION_SECRET` | Passed in docker-compose but never used in code | Dead |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary config | Dead (utility exists but not mounted) |
| `CLOUDINARY_API_KEY` | Cloudinary config | Dead |
| `CLOUDINARY_API_SECRET` | Cloudinary config | Dead |
| `ACCESS_TOKEN_KEY` | `createTokens.js` | Dead |
| `REFRESH_TOKEN_KEY` | `createTokens.js` | Dead |

### Client (required)

| Var | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | API base URL for client-side calls | `https://ssnlc.in/api` |

### Running locally

```bash
# Server
cd server
cp ../.env .env          # or create with MONGODB_URI, JWT_SECRET, NODE_ENV=development
npm install
npm run dev              # starts on :5000 with nodemon

# Client
cd client
npm install
npm run dev              # starts on :3000

# NOTE: In development (NODE_ENV=development), verifyToken is bypassed entirely.
# Important Links admin routes will work without a token.
# Announcements routes have no auth regardless of environment.
```

---

## Summary: Active vs Dead Code

### Active admin flow (what actually works)
1. Login → `POST /api/admin/login` → JWT → stored in localStorage + cookie
2. Dashboard → Announcements CRUD (unauthenticated) + Important Links card
3. Important Links → CRUD with Bearer token auth

### Dead / never-reached code
- Carousel controller + missing model
- Notice controller + missing model + `Event` bug
- Event controller (no route mounted)
- Faculty create/update/delete (exported but no routes)
- `createAdmin` script (broken import)
- `createTokens.js` utility
- `isAdmin` middleware
- `cookie-parser` middleware
- Cloudinary integration
- `server/src/app.js` alternative entry
- `DashboardCard.jsx` component
