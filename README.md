# Stockly

Household shopping list + monthly budget (THB). Web app for iPhone/iPad, installable from Safari.

## Setup
1. `npm install`
2. Supabase: create a project, run `supabase/schema.sql` in the SQL editor, create a public storage bucket `menu-photos`, enable realtime on `list_items, stock_items, week_plans, notifications, household_invites`.
3. Copy `.env.example` → `.env` and fill in the Supabase URL/anon key (Project Settings → API). For push: `npx web-push generate-vapid-keys`.
4. `npm run dev`

## Deploy
- **Vercel** (recommended): import the repo, add the three env vars, deploy. Then add the URL under Supabase → Auth → URL configuration.
- **GitHub Pages**: Settings → Pages → Source: GitHub Actions; add the three env vars as repository secrets. The workflow in `.github/workflows/pages.yml` builds with `base: /stockly/`.
- Push notifications: deploy `supabase/functions/*`, set secrets, add a DB webhook on `notifications` INSERT → `send-push`, schedule `weekly-recap` (see file comments).

## Design
`design/README.md` is the full spec. `design/Stockly App.dc.html` is the working prototype (open it in a browser). `public/ds/` holds the design tokens; the React component sources are in `design/_ds/_ds_bundle.js`.

## On the phone
Open the deployed URL in Safari → Share → Add to Home Screen → open from the icon → Household → Turn on notifications.
