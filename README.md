# Disuness Bevelopment

Personal B2B media project for the iGaming industry — honest interviews, no PR speak.

**Stack:** Next.js 14 (App Router) · Tailwind CSS · PostgreSQL · Prisma · iron-session · Nodemailer

---

## Prerequisites

- Node.js 18+
- PostgreSQL (local or hosted — Supabase, Railway, Neon all work)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ADMIN_EMAIL` | Admin panel login email |
| `ADMIN_PASSWORD` | Admin panel password (plain text, hashed on seed) |
| `SESSION_SECRET` | Random 32+ char string — `openssl rand -base64 32` |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials for email notifications |
| `ADMIN_NOTIFY_EMAIL` | Where to send new application notifications |
| `NEXT_PUBLIC_APP_URL` | Your public URL (e.g. `https://disunessbevelopment.com`) |

### 3. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# Seed with admin user + 2 example interviews
npm run db:seed
```

### 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Admin Panel

`/admin` — protected, password-only login

| Route | Description |
|---|---|
| `/admin/login` | Sign in |
| `/admin/applications` | View & manage interview applications |
| `/admin/interviews` | Manage published interviews |
| `/admin/interviews/new` | Create a new interview |
| `/admin/interviews/[id]` | Edit an existing interview |

### Interview content format

Interview content is stored as HTML. Use this structure:

```html
<h2>Question here?</h2>
<p>Answer paragraph.</p>
<blockquote>A highlight quote worth pulling out.</blockquote>
<p>More answer...</p>
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, latest interviews, CTA |
| `/interviews` | All published interviews (grid) |
| `/interviews/[slug]` | Individual interview with share-quote button |
| `/about` | Project story |
| `/apply` | Application form |
| `/insights` | Key quotes aggregated from all interviews |

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Set all env variables in the Vercel dashboard. Run migrations against your production DB before deploying.

### Self-hosted

```bash
npm run build
npm start
```

---

## Production checklist

- [ ] Change `ADMIN_PASSWORD` to something strong
- [ ] Set `SESSION_SECRET` to a real random string
- [ ] Run `npm run db:migrate` on production DB
- [ ] Run `npm run db:seed` once (only creates admin if not exists)
- [ ] Set `NEXT_PUBLIC_APP_URL` to your actual domain
- [ ] Configure SMTP (Gmail App Password, Resend, Postmark, etc.)

---

## Email notifications

When a new application is submitted, an email is sent to `ADMIN_NOTIFY_EMAIL`.

If `SMTP_HOST` is not set, email is silently skipped (won't break the form).

For Gmail: enable 2FA and create an [App Password](https://myaccount.google.com/apppasswords).

---

## Local DB quickstart (macOS)

```bash
brew install postgresql@15
brew services start postgresql@15
createdb disuness_bevelopment
# Then set DATABASE_URL=postgresql://$(whoami)@localhost:5432/disuness_bevelopment
```
