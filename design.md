# IZUBA App - Premium SaaS Design System & UX Guidelines

## 1. Core Philosophy (Zero Tolerance for Generic UI)

The aesthetic is "Top-Tier Venture-Backed AgTech." Do NOT use generic, default Bootstrap-style layouts, boring HTML tables, or standard form inputs. Think of the design language used by Stripe, Vercel, or Linear. The UI must be highly polished, intuitive, and feature flawless visual hierarchy.

## 2. Color Palette (Tailwind Configuration)

- **Primary Brand Color (BK Blue):** `#005B9F` (Use for primary actions, active states, key data highlights).
- **Background Base (Cream):** `#FCFBF8` (App background - creates a warm, organic feel).
- **Surface/Cards (Pure White):** `#FFFFFF` (Floating containers to create depth).
- **Primary Text (Charcoal):** `#2D2D2D` (No pure black).
- **Secondary Text (Muted Grey):** `#6B7280`
- **Success/Organic Accent (Green):** `#16A34A`

## 3. Typography & UI Elements

- **Fonts:** `Plus Jakarta Sans` or `Outfit` (Headings). `Inter` or `DM Sans` (Body).
- **Cards & Containers:** Heavily rounded corners (`rounded-2xl` or `3xl`). Use subtle borders (`border-gray-100/50`) and soft, premium shadows (`shadow-[0_8px_30px_rgb(0,0,0,0.04)]`).
- **Micro-interactions:** Buttons and cards must have smooth hover states (e.g., `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`).
- **Glassmorphism:** Use subtle backdrop blurs (`backdrop-blur-md bg-white/70`) for sticky headers or floating nav bars to give it a modern iOS feel.
- **Data Visualization:** No boring tables. Display data using interactive KPI cards, progress bars, and clean layout grids.
