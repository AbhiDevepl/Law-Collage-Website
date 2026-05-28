<h1 align="center">🎓 SSNLC Law College Website</h1>

<p align="center">
  <a href="https://ssnlc.in">
    <img src="https://img.shields.io/badge/Live%20Site-ssnlc.in-brightgreen?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Frontend-Next.js-blue?style=for-the-badge&logo=next.js&logoColor=white" alt="Frontend">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Backend-Express.js-yellow?style=for-the-badge&logo=express&logoColor=black" alt="Backend">
  </a>
</p>

<hr>

<h2>🌐 Overview</h2>
<p>This is the official website of <strong>SSNLC Law College</strong>, built to serve students, faculty, and the public with fast and useful access to law college services.</p>
<p><strong>Live Site:</strong> <a href="https://ssnlc.in">https://ssnlc.in</a></p>

<hr>

<h2>🧱 Project Structure</h2>
<pre>
Law-Collage-Website/
├── client/     # Frontend - Next.js
│   ├── pages/
│   ├── public/
│   └── ...
├── server/     # Backend - Express.js
│   ├── routes/
│   ├── ...
└── README.md
</pre>

<hr>

<h2>🖼️ System Architecture</h2>
<pre>
    Browser → https://ssnlc.in
                │
         ┌──────▼──────────┐
         │   Traefik        │  ← Coolify manages this
         │   (Reverse Proxy │     Auto SSL, routing
         │    + SSL)        │
         └──────┬──────────┘
                │
         ┌──────▼──────────┐     ┌────────────────┐
         │   Frontend      │────▶│   Backend      │
         │   (Next.js)     │     │ (Express.js)   │
         │   :3000         │     │   :5000        │
         └─────────────────┘     └──────┬─────────┘
                                        │
                                 ┌──────▼─────────┐
                                 │   MongoDB      │
                                 │   :27017       │
                                 └────────────────┘
</pre>
<p>Next.js proxies <code>/api/*</code> requests to Express internally via Docker network (rewrites in <code>next.config.js</code>).</p>

<hr>

<h2>🚀 Getting Started</h2>
<h3>📥 Clone the Repository</h3>
<pre>
git clone https://github.com/AbhiDevepl/Law-Collage-Website.git
cd Law-Collage-Website
</pre>

<h3>🖥️ Install Client (Next.js)</h3>
<pre>
cd client
npm install
</pre>

<h3>⚙️ Install Server (Express.js)</h3>
<pre>
cd ../server
npm install
</pre>

<hr>

<h2>💻 Development</h2>
<h3>▶ Start the Client</h3>
<pre>
cd client
npm run dev
</pre>

<h3>▶ Start the Server</h3>
<pre>
cd ../server
npm run dev
</pre>

<hr>

<h2>🏁 Production Build</h2>
<h3>⚙️ Build and Start Client</h3>
<pre>
cd client
npm run build
npm start
</pre>

<h3>⚙️ Start Server</h3>
<pre>
cd ../server
npm start
</pre>

<hr>

<h2>📦 Deployment (Coolify)</h2>
<p>This project deploys via <strong>Coolify</strong> — a self-hosted PaaS running on the VPS. Coolify uses Traefik for reverse proxy and automatic SSL.</p>
<ol>
  <li>Install Coolify on VPS: <code>curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash</code></li>
  <li>Add GitHub repo in Coolify dashboard</li>
  <li>Set domain to <code>ssnlc.in</code></li>
  <li>Add environment variables</li>
  <li>Deploy — SSL and routing are automatic</li>
</ol>
<p>See <a href="VPS-SETUP.md">VPS-SETUP.md</a> for full setup instructions.</p>
<h3>Manual Fallback</h3>
<pre>
docker compose -f docker-compose.prod.yml up -d --build
</pre>
<hr>

<h2>📌 Notes</h2>
<ul>
  <li><code>node_modules</code> not included — run <code>npm install</code> in both client and server</li>
  <li>Default ports: 3000 (frontend), 5000 (backend)</li>
</ul>

<hr>


<h2>📄 License</h2>
<p>This project is open-source. See the LICENSE file for details.</p>

<hr>

<h2>🙋 Contact</h2>
<ul>
  <li><a href="https://github.com/AbhiDevepl/Law-Collage-Website/issues">Open an issue</a></li>
  <li><a href="https://ssnlc.in">Visit the live website</a></li>
</ul>
