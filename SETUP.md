# Setup & Deployment Guide (developer)

The website works without any of this: until Supabase is connected, public pages show
the built-in content in `src/lib/content/fallback.ts`, forms show an error, and `/admin`
shows a "not connected" notice. Follow these steps to switch on the CMS.

---

## 1. Accounts (on Kalandice's email, with you invited)

| Service | What it's for | Your access |
|---|---|---|
| Supabase | Database, admin login, image storage | Organization → Team → invite you as **Administrator** |
| Vercel | Hosting | Team member, or deploy then transfer the project to her |
| Resend | Form notification emails (optional) | Her account, or yours |
| Domain registrar | The domain name | Registered to her |

Never ask for her email password. Everything below works from your own login once she's invited you.

---

## 2. Supabase project

1. Create a project named `kalandice` in a US region (e.g. East US). Save the database password in your password manager.
2. **SQL Editor → New query**, paste and run, in order:
   1. `supabase/schema.sql` (tables, Row Level Security, `media` storage bucket) — safe to re-run at any time, e.g. after a schema change
   2. `supabase/seed.sql` (loads the content currently on the site)
3. **Authentication → Sign In / Providers → Email**: turn **off** "Allow new users to sign up".
   Only people you invite can get an account.
4. **Authentication → URL Configuration**:
   - Site URL: `https://YOUR-DOMAIN` (use `http://localhost:3000` until the domain is live)
   - Redirect URLs: add `http://localhost:3000/**` and `https://YOUR-DOMAIN/**`
5. **Authentication → Email Templates**. Replace the link in these two templates so the
   links work on any device:
   - **Invite user**:
     ```html
     <h2>You're invited to manage Encouraging Poetics</h2>
     <p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite&next=/admin/set-password">Set your password</a></p>
     ```
   - **Reset Password**:
     ```html
     <h2>Reset your Encouraging Poetics dashboard password</h2>
     <p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/admin/set-password">Choose a new password</a></p>
     ```
6. **Project Settings → API**: copy the Project URL, the `anon` key and the `service_role` key.

---

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill it in. Add the same variables in
**Vercel → Project → Settings → Environment Variables**, with `NEXT_PUBLIC_SITE_URL`
set to the real domain.

`SUPABASE_SERVICE_ROLE_KEY` is secret. It's only used on the server to save form
submissions. Never commit it or give it a `NEXT_PUBLIC_` prefix.

Restart `npm run dev` after changing env vars.

---

## 4. Admin accounts

1. **Supabase → Authentication → Users → Invite user**, then enter the email. Do this for Kalandice and for yourself.
2. Open `supabase/grant-admin.sql`, put the email in, and run it in the SQL Editor (once per person).
   Being invited isn't enough on its own: only emails in `admin_users` can edit content.
3. The person clicks the invite email, chooses their own password, and lands in `/admin`.

To test before inviting her, invite yourself first and go through the whole flow.

---

## 5. Email notifications (Resend)

1. Sign up at resend.com and create an API key, then set `RESEND_API_KEY`.
2. For testing, `EMAIL_FROM=Encouraging Poetics <onboarding@resend.dev>` only delivers to the
   Resend account owner's email.
3. For production, verify her domain in Resend (it adds a few DNS records), then set
   `EMAIL_FROM=Encouraging Poetics <hello@YOUR-DOMAIN>` and `NOTIFY_EMAIL=kalandice.poetics@gmail.com`.

Without Resend, submissions are still saved and appear in **/admin → Messages**.

---

## 6. Deploy to Vercel

1. Import the GitHub repo into Vercel (Framework: Next.js, default settings).
2. Add every variable from `.env.example`. Generate `CRON_SECRET` with any long random string.
3. Deploy. `vercel.json` sets up a daily `/api/keep-alive` call so the free Supabase
   project doesn't pause from inactivity.
4. **Domains**: add her domain and copy the DNS records Vercel shows into her registrar. HTTPS is automatic.
5. Update Supabase's Site URL and Redirect URLs (step 2.4) to the live domain.

---

## 7. Pre-handover test checklist

Test with **her** account, not just yours:

- [ ] Invite email arrives → she sets a password → dashboard opens
- [ ] "Forgot password" email works
- [ ] Create a draft post → it isn't on `/blog` → publish → it appears
- [ ] Add a reader quote → the home page section appears (it's hidden while there are none)
- [ ] Edit / delete a post, event, book, resource → site updates within seconds
- [ ] Upload a phone photo as a post cover → it shows on the post
- [ ] Contact form, prayer box, speaking request → email arrives and appears in Messages
- [ ] Newsletter signup → appears in Subscribers → CSV download opens in Excel/Sheets
- [ ] Logged out, `/admin` redirects to login; a non-admin account sees "No dashboard access"
- [ ] Book purchase link, Spotify links, social links, butterfly animation, music toggle
- [ ] Check on a phone, a tablet and desktop
- [ ] `https://YOUR-DOMAIN/sitemap.xml` and `/robots.txt` show the real domain

---

## How it fits together

- `src/lib/content/queries.ts` has the public reads. Pages are cached for an hour, and any
  save in the admin refreshes the whole site immediately (`revalidatePath("/", "layout")`).
- `src/app/admin/actions.ts` has the admin writes. Each one checks the admin session, and RLS enforces it again in the database.
- `src/app/actions/forms.ts` holds the public form handlers (honeypot spam trap, validation, save plus email).
- `src/proxy.ts` refreshes the auth session and redirects signed-out visitors away from `/admin`.
- `supabase/schema.sql`: visitors can only read `published = true` rows. They can't read
  messages or subscribers at all.
