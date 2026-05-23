# IZUBA Mushrooms MVP

High-fidelity AgTech MVP for a just-in-time mushroom marketplace connecting rural women-led farms in Rwanda with urban restaurant buyers.

## Demo Routes

- `/` - demo role chooser
- `/admin` - Admin Command Center
- `/restaurant` - Restaurant buyer portal
- `/farmer` - Farmer ledger and grow-room dashboard
- `/trace/nyamata-oyster-2401` - public QR traceability proof

## QR Traceability Flow

Print QR labels that point to a batch route such as `/trace/nyamata-oyster-2401`.
When customers scan the code, they land on a public page with:

- verified farm, farmer, batch, and freshness data
- zero-spoilage logistics proof
- storage and preparation guidance
- recipe/preparation video area
- sustainability impact and substrate recovery information

For the final demo, host the real recipe video on YouTube, Vimeo, Supabase Storage, or Vercel `/public`, then embed it in the Preparation Guide section.

Current video hosting:

```bash
https://abgielctqjvdjcrlddis.supabase.co/storage/v1/object/public/izuba-media/farm-to-fork-web.mp4
```

The source video was compressed to a web-friendly MP4 before upload so the QR page can use the native browser video player.

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

Project ref used for this MVP:

```bash
abgielctqjvdjcrlddis
```

CLI setup:

```bash
npx supabase login
npx supabase init
npx supabase link --project-ref abgielctqjvdjcrlddis
npx supabase db push
npx supabase db query --linked --file supabase/seed.sql
```

Environment:

1. Copy `.env.example` to `.env`.
2. Set:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_DEMO_MODE=false
```

Restaurant reservations attempt a Supabase write when configured and fall back to demo mode if the database is unavailable.

## Deployment

Deploy on Vercel as a Vite app. `vercel.json` rewrites all route deep links back to `index.html`.
