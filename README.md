# Encouraging Poetics: Kalandice Thomas

Author website for Kalandice Thomas and her poetry collection *Encouraging Poetics*, with a
built-in CMS so she can manage her own blog posts, events, books and resources.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Supabase (Postgres, Auth, Storage) · Resend · Vercel

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: the site runs on built-in content without it
npm run dev
```

Public site: http://localhost:3000 · Dashboard: http://localhost:3000/admin

## Where things live

| Path | What |
|---|---|
| `src/app/` | Public pages, plus `admin/` (dashboard), `auth/confirm` (email links) and `api/keep-alive` (cron) |
| `src/components/sanctuary/` | Home page sections, navbar, footer, butterfly canvas, music |
| `src/components/pages/` | Client-side bodies of the inner pages |
| `src/components/admin/` | Dashboard UI and editors |
| `src/lib/content/` | Content types, public queries, and fallback content |
| `supabase/` | `schema.sql`, `seed.sql`, `grant-admin.sql` |
| `design-reference/` | Client's reference screenshots (not deployed) |

## Docs

- **[SETUP.md](SETUP.md)**: Supabase, environment variables, admin invites, email, Vercel and domain, pre-handover checklist
- **[docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)**: plain-English guide for Kalandice
