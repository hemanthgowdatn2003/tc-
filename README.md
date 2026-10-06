# TC Web & Studio — Official Business Website & Admin Portal

A modern, fast, responsive business website for **TC Web & Studio**, a creative digital services agency specializing in high-performance website design and development, strategic social media & Instagram account management, and high-retention short-form video editing.

Includes a complete public-facing agency presence and a private internal admin dashboard (`/admin`) for managing service packages, editing pricing, and uploading PDF brochures and media assets without editing source code.

---

## Key Features

### Public Website
- **Modern Agency Aesthetic**: Dark, high-contrast, responsive design built with React 18, Vite, and custom CSS design tokens.
- **Hero & Value Proposition**: Engaging typography, direct calls-to-action ("Explore Services", "View Packages"), and trust metrics.
- **Comprehensive Services Showcase**:
  1. Website Design & Development
  2. Social Media Management
  3. Instagram Account Management
  4. Video Editing & Creative Content
  5. Branding & Digital Creative Services
- **Dynamic Service Packages**: Loaded in real-time from the backend REST API, categorized with pricing ("$299", "Contact for pricing"), feature checklists, and PDF brochure downloads.
- **Structured 5-Step Workflow**:
  1. Understand the client's requirements.
  2. Plan the project and agree on the deliverables.
  3. Create the design or content.
  4. Review and refine the work.
  5. Deliver the final result and provide agreed support.
- **Team Showcase**: Clean profile cards featuring the team:
  - **Naveen** — Video & Creative
  - **Nidhith** — Social Media & Client Handling
  - **Hemant** — Web Development
  *(Zero private founder, ownership, or shareholding information).*
- **Configurable Instagram Section**: Displays a tasteful *"Instagram link coming soon"* placeholder until the internal team configures the official URL.
- **Interactive Contact Form**: Client-side validation, service interest prefill, submission logging to the backend, and rate limiting.

### Private Admin Dashboard (`/admin`)
- **Session Authentication**: Password-protected login with server-side cookie sessions (`express-session`). Zero credentials exposed in frontend code.
- **Package Management (CRUD)**:
  - Create new packages with custom categories, badges, and descriptions.
  - Choose between fixed pricing (e.g., "$299 / month") or custom "Contact for pricing".
  - Add and delete feature checklist items dynamically.
  - Toggle packages between Active (live on site) and Draft (hidden).
  - Attach uploaded PDF brochures to packages.
  - Delete obsolete packages.
- **Document & Media Upload Manager**:
  - Secure file uploads powered by **Multer** (supports PDF, JPG, JPEG, PNG, WEBP).
  - Configurable 10MB file limit with strict MIME and extension validation.
  - Path traversal protection and collision-resistant unique file naming.
  - In-browser file preview, URL copy, and safe deletion.
- **Client Inquiries Log**:
  - Review messages sent via the contact form with timestamp, client email, phone, and selected service.
- **Live Site & Instagram Settings**:
  - Update the official Instagram URL directly from the dashboard; changes take effect immediately across the website without touching code.

---

## Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Lucide React icons, Vanilla CSS.
- **Backend**: Node.js, Express 4, express-session, Multer, CORS, express-rate-limit, dotenv.
- **Storage**: Safe JSON database (`packages.json`, `settings.json`, `inquiries.json`) with atomic temporary-write file swapping. Prepared for zero-friction migration to PostgreSQL or MongoDB in multi-tenant production.

---

## Project Structure

```text
tc-web-studio/
├── public/
│   ├── images/
│   │   ├── team/
│   │   └── services/
│   └── uploads/
│       └── .gitkeep
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── PackageCard.jsx
│   │   ├── ServiceCard.jsx
│   │   └── TeamMember.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Packages.jsx
│   │   ├── Services.jsx
│   │   └── Team.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── admin.css
│   │   ├── contact.css
│   │   ├── global.css
│   │   ├── home.css
│   │   ├── navbar.css
│   │   ├── packages.css
│   │   └── team.css
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── data/
│   │   ├── db.js
│   │   ├── inquiries.json
│   │   ├── packages.json
│   │   └── settings.json
│   ├── middleware/
│   │   └── requireAdmin.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── packageRoutes.js
│   │   ├── settingsRoutes.js
│   │   └── uploadRoutes.js
│   ├── uploads/
│   │   └── tc_services_brochure.pdf
│   ├── test/
│   │   └── api.test.js
│   ├── .env
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation & Local Development

### 1. Prerequisites
- Node.js LTS (v18, v20, or v22+)
- npm (v9+)

### 2. Install Dependencies

Install root dependencies (frontend):
```bash
npm install
```

Install backend dependencies:
```bash
npm --prefix server install
```

### 3. Environment Variables Configuration

Copy `.env.example` in `server/`:
```bash
cp server/.env.example server/.env
```

Review or update `server/.env`:
```env
PORT=5000
NODE_ENV=development
ADMIN_PASSWORD=tcadmin2026!
SESSION_SECRET=tc_super_secure_session_secret_key_99482716
CLIENT_URL=http://localhost:5173
INSTAGRAM_URL=
```

### 4. Running the Development Servers

You can run both backend and frontend together with:
```bash
npm run dev:all
```

Or run them in separate terminal windows:

**Terminal 1 — Backend API Server:**
```bash
npm run server
# Or with auto-reload:
npm run server:dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 — Frontend Vite Server:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## Testing & Verifying the Application

### 1. Public Website
- Visit `http://localhost:5173` in your browser.
- Browse the **Services** and **Packages** pages.
- Click **"View PDF Brochure"** on any package card to view or download the attached PDF.
- Fill out the **Contact** form and submit an inquiry; verify the polite feedback confirmation.

### 2. Admin Dashboard
- Visit `http://localhost:5173/admin` or click **"Admin"** in the navigation bar.
- Log in using your configured `ADMIN_PASSWORD` (default: `tcadmin2026!`).
- **Create a Package**: Click "Create New Package", enter details, add custom deliverables, and save.
- **Upload a Brochure**: Switch to the "PDF & Media Uploads" tab, upload a PDF file, and copy its URL or attach it to any package.
- **Toggle Visibility**: Switch any package between Active and Draft to see it appear/disappear on the public site.
- **Review Inquiries**: Check the "Client Inquiries" tab to inspect messages submitted from the contact form.

### 3. Automated Backend Tests
Run the automated API test suite:
```bash
npm --prefix server test
```

---

## Connecting the Official Instagram Account

Until the official account is provided, the website automatically displays:
> *"Instagram link coming soon"*

When the official profile is ready, choose either method:

### Method A: Through the Admin Dashboard (No code editing required)
1. Navigate to `http://localhost:5173/admin` and log in.
2. Select the **Site & Instagram Settings** tab.
3. Paste the profile URL (e.g., `https://www.instagram.com/tcwebstudio`).
4. Click **Save Site Settings**. The link updates across the footer, homepage, and contact sections immediately.

### Method B: Via Environment Variable
Set `INSTAGRAM_URL` in `server/.env`:
```env
INSTAGRAM_URL=https://www.instagram.com/tcwebstudio
```

---

## Production Deployment Checklist

1. **Environment Variables**:
   - Set a strong, random `ADMIN_PASSWORD`.
   - Set a 64+ character random string for `SESSION_SECRET`.
   - Set `NODE_ENV=production`.
   - Set `CLIENT_URL` to your production domain (e.g. `https://tcwebstudio.com`).
2. **HTTPS**:
   - Always run behind HTTPS (e.g. Nginx, Cloudflare, or AWS ALB) so session cookies are encrypted with `secure: true`.
3. **Database Migration**:
   - For multi-instance horizontal scaling, swap `server/data/db.js` with PostgreSQL or MongoDB.
4. **Persistent File Storage**:
   - For cloud platforms with ephemeral filesystems (Heroku, Render), point Multer destination to AWS S3, Cloudflare R2, or Google Cloud Storage.
5. **Rate Limiting & Firewalls**:
   - Built-in rate limiting protects `/api/admin/login` and `/api/contact`. Adjust window sizes in `server/index.js` as needed for higher traffic.

---

## License

Internal proprietary software for **TC Web & Studio**. All rights reserved.
