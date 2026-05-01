# GWS Marketing — Deployment Guide (Vercel + Supabase)

A Vite + React + Tailwind v4 site with Supabase as the backend (auth, database, storage), ready to deploy on **Vercel**.

> This bundle has been **converted from TanStack Start (Cloudflare Workers SSR) to a plain Vite SPA** so it runs cleanly on Vercel's static + serverless platform with zero edge-runtime quirks.

---

## 1. What's inside

```
local-to-global-spark-vercel/
├── src/
│   ├── pages/             # All page components (HomePage, AboutPage, ...)
│   ├── components/        # Site components + shadcn/ui
│   ├── integrations/
│   │   └── supabase/      # supabase-js client + generated DB types
│   ├── assets/            # Images
│   ├── hooks/  lib/       # Helpers
│   ├── App.tsx            # React Router routes table
│   ├── main.tsx           # React 18 entry point
│   └── styles.css         # Tailwind v4 + design tokens
├── supabase/
│   └── migrations/        # Original migration files
├── supabase-setup.sql     # ⭐ Single SQL script to run in Supabase
├── index.html
├── vite.config.ts
├── vercel.json            # SPA rewrites + cache headers
├── tsconfig.json
├── package.json
├── .env.example
└── DEPLOY.md              # ← you are here
```

---

## 2. Tech stack

| Layer        | Tech |
|--------------|------|
| Frontend     | React 18, TypeScript, Vite 5 |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`), tw-animate-css |
| Routing      | `react-router-dom` v6 (BrowserRouter) |
| UI           | shadcn/ui + Radix primitives, Lucide icons |
| Backend      | Supabase (Postgres + Auth + Storage) |
| Hosting      | Vercel (static SPA build, `dist/`) |

> ⚠️ Supabase **is** your Node.js backend here — no separate Express server is needed. Database, auth, and file uploads all happen via the `@supabase/supabase-js` client.
> If later you need custom server endpoints (webhooks, payments, AI), add them as **Vercel Serverless / Edge Functions** under `/api/*` and call them from the client.

---

## 3. Step-by-step migration & deployment

### STEP 1 — Create a Supabase project

1. Go to <https://supabase.com> → **New Project**.
2. Pick a name (e.g. `gws-marketing`) and a strong database password.
3. Choose a region close to your users.
4. Wait ~2 minutes for the project to provision.

### STEP 2 — Run the database script

1. In your Supabase project, open **SQL Editor → New query**.
2. Open `supabase-setup.sql` from this repo, copy **the entire file**, paste it into the editor.
3. Click **Run**.

This creates:
- Tables: `profiles`, `user_roles`, `projects`, `services`, `testimonials`, `client_logos`, `site_content`
- Enum: `app_role` (`admin`, `user`)
- RLS policies (public read for content, admin-only writes)
- `has_role()` SECURITY DEFINER function (no recursive RLS)
- `on_auth_user_created` trigger that auto-creates a profile row
- A public `media` storage bucket
- Seed data for the 5 services + hero/about/contact site_content

### STEP 3 — Create the admin user

1. Supabase → **Authentication → Users → Add user → Create new user**.
2. Email: `swapnilnaik670@gmail.com` (this is hard-coded in `src/pages/AdminLogin.tsx` — change it there if you want a different admin email).
3. Set a password and **uncheck** "Send invite" — just create the account.
4. Copy the new user's UUID.
5. Back in **SQL Editor**, run:

   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('PASTE-USER-UUID-HERE', 'admin');
   ```

### STEP 4 — Get your Supabase keys

In Supabase: **Project Settings → API**. Copy:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon / public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Project ref** (the `xxxx` in `https://xxxx.supabase.co`) → `VITE_SUPABASE_PROJECT_ID`

> Never put the `service_role` key in the frontend. The anon key is safe to ship in the bundle because RLS policies enforce access.

### STEP 5 — Run locally (optional sanity check)

```bash
cp .env.example .env.local
# fill in the three VITE_SUPABASE_* values
npm install
npm run dev
```

Visit <http://localhost:5173>. The home page should fetch services from Supabase. Log in at `/admin` with the email/password from Step 3.

### STEP 6 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Vercel-ready build"
git branch -M main
git remote add origin git@github.com:YOUR-USER/gws-marketing.git
git push -u origin main
```

### STEP 7 — Deploy to Vercel

1. Go to <https://vercel.com/new> and **Import** the GitHub repo.
2. Vercel auto-detects **Vite**. Leave the defaults:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Expand **Environment Variables** and add:

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | `https://YOUR-PROJECT-REF.supabase.co` |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOi...` (anon key) |
   | `VITE_SUPABASE_PROJECT_ID` | `YOUR-PROJECT-REF` |

4. Click **Deploy**. First build takes ~2 min.

### STEP 8 — Configure Supabase Auth redirect URLs

In Supabase: **Authentication → URL Configuration**.

- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs** (add each):
  - `https://your-app.vercel.app`
  - `https://your-app.vercel.app/admin`
  - `https://your-app.vercel.app/admin/dashboard`
  - `http://localhost:5173` (for dev)

### STEP 9 — (Optional) Custom domain

In Vercel → **Project → Settings → Domains** → add your domain and follow the DNS instructions. Then add the new origin to Supabase's redirect URLs (Step 8).

---

## 4. SPA routing on Vercel

`vercel.json` includes:

```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

This makes deep links (e.g. `/about`, `/admin/dashboard`) resolve to `index.html` so React Router can take over. Without this, refreshing on `/about` would 404.

---

## 5. Common pitfalls

| Problem | Fix |
|---------|-----|
| `Missing Supabase environment variable(s)` | Env vars not set in Vercel project. Add them and redeploy. |
| Login works locally, fails on Vercel | Add the Vercel URL to Supabase Auth → URL Configuration. |
| `404 NOT_FOUND` when refreshing `/about` | Make sure `vercel.json` is committed at the repo root. |
| Tailwind utility classes look unstyled | Tailwind v4 reads `src/styles.css`. Confirm `import "./styles.css"` is in `src/main.tsx`. |
| Admin can read but cannot write | The auth user has no `admin` row in `user_roles`. Re-run Step 3. |

---

## 6. Adding a Node.js endpoint later (optional)

If you need a custom server endpoint (e.g. Stripe webhook, contact form email):

1. Create `api/contact.ts` at the **repo root** (Vercel auto-detects this).
2. Example:
   ```ts
   import type { VercelRequest, VercelResponse } from "@vercel/node";
   export default async function handler(req: VercelRequest, res: VercelResponse) {
     if (req.method !== "POST") return res.status(405).end();
     // ... your logic, then:
     res.status(200).json({ ok: true });
   }
   ```
3. Add `@vercel/node` to devDependencies. Vercel turns it into a serverless function automatically — no extra config.

---

That's it. Push, deploy, done. 🚀
