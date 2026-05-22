# IZUBA Mushrooms MVP Roadmap

## Stack Decision

- Frontend: React + Vite + TypeScript
- Styling: Tailwind CSS, Framer Motion, lucide-react
- Backend target: Supabase Postgres + Auth
- Hosting target: Vercel
- Demo reliability: seeded mock data first, Supabase integration layer next

## Build Phases

1. Foundation
   - Create Vite React app.
   - Configure Tailwind theme from `design.md`.
   - Add route-level shell for public traceability, restaurant, farmer, and command center views.

2. Data Model
   - Model farms, restaurants, harvest batches, orders, ledger entries, and biomass sales.
   - Start with typed mock data so the demo is functional offline.
   - Keep Supabase query boundaries isolated for fast replacement.

3. Premium UI System
   - Build reusable metric cards, status pills, timelines, yield cards, ledger rows, and dashboard sections.
   - Avoid generic tables; use dense visual SaaS components.

4. Core Screens
   - Command Center: investor-grade operational overview.
   - Restaurant Portal: just-in-time yield reservation and order tracking.
   - Farmer Ledger: active tubes, fulfillment queue, 75/25 split, biomass revenue.
   - QR Traceability: public farm-to-fork story and harvest batch proof.

5. Hardening
   - Add responsive states, loading/empty states, demo credentials, and deployment config.
   - Verify `npm run build`.
   - Start local dev server for live review.

## Current Completion Snapshot

- Foundation: complete.
- Data model: complete for MVP demo, with Supabase schema and seed files.
- Premium UI system: complete, revised toward sharper operating-system surfaces with restrained radii.
- Core screens: complete for Command Center, Restaurant Portal, Farmer Ledger, and QR Traceability.
- Hardening: test suite and production build are required before every commit and push.

## Demo Story

1. A harvest batch becomes available from a rural women-led farm.
2. A Kigali restaurant reserves kilograms just in time.
3. The farmer dashboard updates fulfillment and shows the 75% farmer share.
4. IZUBA captures 25% platform revenue and monetizes biomass waste.
5. The public QR page proves origin, impact, and zero-spoilage logistics.
