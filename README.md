# 🇮🇳 India Matrix — National Intelligence & Analytics Platform (1947 — 2026)

**India Matrix** is a premium, high-fidelity data visualization and intelligence suite tracking India's transformation over 79 years of independence. Built with interactive timelines, geospatial mapping, policy simulators, and a dual-engine AI analytical module.

---

## ✨ Features

- 🦁 **National Branding & Logo**: Features the 4K-rendered metallic and crystal Ashoka Lions insignia, optimized for high zoom levels and visible across browser favicons, desktop menus, and mobile layouts.
- 🎓 **Founding Fathers Tribute**: Dedicated showcase honoring the architects of modern India—with special focus on the institutional legacy and nation-building contributions of Pandit Jawaharlal Nehru.
- 📋 **15 Prime Ministers' Detailed Report Cards**: Multi-dimensional grading across 18 leadership tenures measuring average GDP growth, exit GDP, inflation rates, policy milestones, and legacy notes.
- 🗺️ **Geospatial & State Analytics Engine**: Map-based overlays tracking heavy industry corridors, spaceports, high-tech clusters, and dynamic state-level development indexes.
- 🎲 **Interactive Matrix Quiz**: Gamified multi-tier testing module to challenge users on space records, economic reforms, and rural landmarks.
- 🎛️ **Vision 2047 Policy Simulator**: Drag and balance governance sliders (infrastructure, energy, social indicators) to project growth paths for India's centenary of independence.
- 🤖 **Dual-Engine AI Insights**: Powered by **Gemini 2.5 Flash** (Primary Key) and **Groq LLaMA 3.3** (Fallback) to generate conversational, humorous, and data-backed explanations of policy decisions.

---

## 🚀 Setup & Local Execution

Follow these quick commands to spin up the development workspace on your local machine:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup your environment variables**:
   Create a file named `.env` in the root folder and add your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Repository Upload Guide (GitHub Manual Upload)

If you are uploading your files manually to GitHub, upload **only** the following folders and files:

### ✅ Files & Folders to Upload
- `src/` (Entire directory containing React code)
- `public/` (Contains images, logo, and routing files)
- `index.html` (Main entry page)
- `package.json` & `package-lock.json`
- `vite.config.ts`
- `tailwind.config.js` & `postcss.config.js`
- `eslint.config.js`
- `tsconfig.json` (and `.app.json`, `.node.json` versions)
- `.gitignore`
- `README.md` (This file!)

### ❌ Files & Folders to Ignore
- `node_modules/` (Automatically managed by npm)
- `dist/` (Local build assets)
- `.env` (Contains your private, sensitive API keys)
- `backend/venv/` & `backend/__pycache__/` (Python virtual environment and caching)

---

## 🌐 Render.com Secure Deployment Configuration

To ensure API keys remain hidden and secure, this application is deployed as a **Web Service** using the included `Dockerfile` (which builds the React frontend and serves it via the FastAPI backend):

- **Service Type:** Web Service
- **Runtime:** `Docker` (automatically detected from the root `Dockerfile`)
- **Environment Variables** (under *Advanced Settings*):
  - `GEMINI_API_KEY` = `your_gemini_api_key_here`
  - `GROQ_API_KEY` = `your_groq_api_key_here`

*Note: The FastAPI backend handles API calls securely on the server side and serves the React single-page application with fallback routing, preventing credential leakage to client browsers.*
