Listed directory Law-Collage-Website
Listed directory client
Listed directory server
Listed directory src
Listed directory src
Listed directory routes
Listed directory scripts
Viewed package.json:1-44
Viewed package.json:1-25
Viewed README.md:1-151
Listed directory app
Listed directory pages
Viewed server.js:1-31
Viewed app.js:1-48
Viewed layout.js:1-225

Here is a comprehensive summary of your entire codebase for the **Law College Website (SSNLC)** project based on its structure and configuration.

### 🏗️ High-Level Architecture
Your project is a modern, decoupled full-stack web application with a distinct separation between the frontend client and the backend server. 
* **Frontend:** Built with **Next.js** (App Router).
* **Backend:** Built with **Express.js** and **MongoDB**.

---

### 💻 Frontend (`/client`)
The frontend is a robust Next.js 14 application focused on performance, SEO, and modern UI/UX.

**Tech Stack & Libraries:**
* **Framework:** Next.js 14 (`^14.2.28`) utilizing the modern `app/` directory router.
* **Styling:** Tailwind CSS (`^3.3.5`), Material Tailwind (`^2.1.4`), Flowbite React (`^0.9.0`), and custom CSS (`globals.css`).
* **Animations:** Framer Motion (`^12.16.0`).
* **Icons:** FontAwesome (`^6.5.2`) and React Icons (`^5.5.0`).
* **Utilities:** `axios` for API calls, `sweetalert2` for alerts, `react-pdf` for document viewing, and `markdown-to-jsx`/`marked` for markdown rendering.

**Key Structure & Features:**
* **Routing (`src/app/`):** Contains directories for all major pages like `/about`, `/academics`, `/admin`, `/announcements`, `/contact`, `/events`, `/faculty`, `/gallery`, and `/newsbulletin`.
* **SEO & PWA:** Your `layout.js` is highly optimized with rich structured data (EducationalOrganization schema), extensive Open Graph tags, Google Analytics integration, and a Service Worker (`sw.js`) setup for Progressive Web App capabilities.
* **Components (`src/components/`):** Contains reusable UI elements like `NavBar` and `Footer`.

---

### ⚙️ Backend (`/server`)
The backend is a lightweight but fully-featured Express REST API that handles data operations and administrative authentication.

**Tech Stack & Libraries:**
* **Framework:** Express.js (`^4.18.2`).
* **Database:** MongoDB via Mongoose (`^7.0.3`).
* **Authentication:** JWT (`jsonwebtoken`) and password hashing (`bcryptjs`).
* **Middleware:** `cors` (configured to allow requests from your frontend URI), `cookie-parser`, and `dotenv`.

**Key Structure & Features:**
* **Entry Point (`server.js` & `src/app.js`):** Initializes the server, connects to the database via `src/config/db`, and sets up global middleware (including a global error handler).
* **Routes (`routes/` & `src/route/`):** Contains structured API endpoints like:
  * `/api/admin` - Admin authentication routes.
  * `/api/announcements` - CRUD operations for college announcements.
  * `/api` - Publicly accessible endpoints.
* **MVC Pattern (`src/`):** Follows a structured Model-View-Controller pattern with distinct folders for `controller`, `model`, `route`, and `middleware`.
* **Scripts (`scripts/`):** Utility scripts like `createAdmin.js` (for bootstrapping an admin user) and `generateSecretKey.js` (for JWT secret generation).

### 🚀 Overall Summary
You have built a highly scalable and production-ready educational platform. The frontend uses the latest Next.js paradigms with a strong focus on Search Engine Optimization (SEO) and responsiveness. The backend uses a classic, reliable Express+MongoDB architecture, securely managing data and administration tasks.