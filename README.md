# IZUBA Mushrooms MVP

High-fidelity AgTech MVP for a just-in-time mushroom marketplace connecting rural women-led farms in Rwanda with urban restaurant buyers.

## Demo Routes

- `/` - demo role chooser
- `/admin` - Admin Command Center
- `/restaurant` - Restaurant buyer portal
- `/farmer` - Farmer ledger and grow-room dashboard
- `/trace/nyamata-oyster-2401` - public QR traceability proof

## Local Setup

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run build
```

## Supabase

The app is demo-safe by default. It uses bundled data unless Supabase env vars are configured.

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. Copy `.env.example` to `.env.local`.
5. Set:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_DEMO_MODE=false
```

Restaurant reservations attempt a Supabase write when configured and fall back to demo mode if the database is unavailable.

## Deployment

Deploy on Vercel as a Vite app. `vercel.json` rewrites all route deep links back to `index.html`.
