import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  CalendarDays,
  ChefHat,
  Factory,
  Leaf,
  PackageCheck,
  QrCode,
  Route,
  Sprout,
  Truck,
  Users,
  WalletCards,
} from 'lucide-react'
import {
  biomassSales,
  formatRwf,
  harvestBatches,
  ledgerEntries,
  orders,
  totals,
  type HarvestBatch,
} from './data'

type View = 'command' | 'restaurant' | 'farmer' | 'trace'

const navItems: { id: View; label: string; icon: typeof BarChart3 }[] = [
  { id: 'command', label: 'Command', icon: BarChart3 },
  { id: 'restaurant', label: 'Restaurant', icon: ChefHat },
  { id: 'farmer', label: 'Farmer ledger', icon: Sprout },
  { id: 'trace', label: 'QR trace', icon: QrCode },
]

function App() {
  const [activeView, setActiveView] = useState<View>('command')

  return (
    <div className="min-h-screen text-charcoal">
      <div className="mx-auto flex w-full max-w-7xl gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="glass-panel fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-2xl px-3 py-2 lg:sticky lg:top-4 lg:inset-x-auto lg:bottom-auto lg:h-[calc(100vh-2rem)] lg:w-72 lg:flex-col lg:items-stretch lg:rounded-3xl lg:p-4">
          <div className="hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-white shadow-lift">
                <Leaf size={22} />
              </div>
              <div>
                <p className="font-display text-lg font-bold">IZUBA</p>
                <p className="text-xs font-medium text-muted">Mushroom OS</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-charcoal p-4 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">Finals demo</p>
              <p className="mt-2 text-2xl font-bold">Zero-spoilage JIT marketplace</p>
            </div>
          </div>

          <nav className="grid w-full grid-cols-4 gap-2 lg:grid-cols-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`flex h-12 items-center justify-center gap-3 rounded-xl px-3 text-sm font-semibold transition-all duration-300 lg:justify-start ${
                    isActive
                      ? 'bg-brand text-white shadow-lift'
                      : 'text-muted hover:bg-white hover:text-charcoal'
                  }`}
                  title={item.label}
                >
                  <Icon size={18} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="hidden rounded-2xl border border-organic/20 bg-organic/10 p-4 lg:block">
            <div className="flex items-center gap-2 text-sm font-bold text-organic">
              <BadgeCheck size={17} />
              Live demo ready
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">
              Mock data is bundled so the pitch keeps working even without a database connection.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <Header activeView={activeView} />
          {activeView === 'command' && <CommandCenter />}
          {activeView === 'restaurant' && <RestaurantPortal />}
          {activeView === 'farmer' && <FarmerLedger />}
          {activeView === 'trace' && <TraceabilityPage batch={harvestBatches[0]} />}
        </main>
      </div>
    </div>
  )
}

function Header({ activeView }: { activeView: View }) {
  const label = navItems.find((item) => item.id === activeView)?.label ?? 'Command'

  return (
    <header className="glass-panel sticky top-3 z-30 mb-5 rounded-3xl px-5 py-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-brand">{label}</p>
          <h1 className="font-display text-2xl font-extrabold tracking-normal sm:text-3xl">
            Rwanda's just-in-time mushroom marketplace
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill icon={CalendarDays} label="May 22, 2026" tone="blue" />
          <StatusPill icon={PackageCheck} label="0% spoilage target" tone="green" />
        </div>
      </div>
    </header>
  )
}

function CommandCenter() {
  return (
    <ScreenFrame>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Sprout} label="Available harvest" value={`${totals.availableKg} kg`} detail="Across 3 rural farms" />
        <MetricCard icon={PackageCheck} label="Reserved JIT" value={`${totals.reservedKg} kg`} detail="Locked before harvest" />
        <MetricCard icon={Users} label="Farmer income" value={formatRwf(totals.farmerIncome)} detail="75% payout model" />
        <MetricCard icon={Factory} label="Biomass revenue" value={formatRwf(totals.biomassRevenue)} detail="Waste to green energy" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="premium-card p-5">
          <SectionTitle icon={Route} title="B2B Fulfillment Board" action="Tomorrow's harvest" />
          <div className="mt-5 grid gap-3">
            {orders.map((order) => {
              const batch = harvestBatches.find((item) => item.id === order.batchId)

              return (
                <motion.div
                  key={order.id}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-gray-100 bg-cream/60 p-4"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <p className="font-bold">{order.restaurant}</p>
                      <p className="text-sm text-muted">
                        {order.quantityKg} kg from {batch?.farm} - {order.deliveryWindow}
                      </p>
                    </div>
                    <StatusPill icon={Truck} label={order.status} tone={order.status === 'In transit' ? 'blue' : 'green'} />
                  </div>
                  <ProgressBar value={order.status === 'Reserved' ? 35 : order.status === 'Packed' ? 68 : 86} />
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="premium-card overflow-hidden p-5">
          <SectionTitle icon={BarChart3} title="Operating Model" action="25/75 split" />
          <div className="mt-6 rounded-3xl bg-charcoal p-5 text-white">
            <p className="text-sm text-white/60">Spoilage prevented</p>
            <p className="mt-2 text-5xl font-extrabold">{totals.spoilagePreventedKg} kg</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Orders reserve yield before harvest, converting volatile produce into scheduled demand.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <SplitTile label="Farmers" value="75%" />
            <SplitTile label="IZUBA" value="25%" />
          </div>
        </div>
      </section>
    </ScreenFrame>
  )
}

function RestaurantPortal() {
  const [selectedId, setSelectedId] = useState(harvestBatches[0].id)
  const [kg, setKg] = useState(16)
  const [confirmedKg, setConfirmedKg] = useState(0)
  const selected = harvestBatches.find((batch) => batch.id === selectedId) ?? harvestBatches[0]
  const unreserved = Math.max(0, selected.availableKg - selected.reservedKg - confirmedKg)
  const effectiveKg = Math.min(kg, Math.max(1, unreserved))
  const total = effectiveKg * selected.pricePerKg

  return (
    <ScreenFrame>
      <section className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="premium-card p-5">
          <SectionTitle icon={ChefHat} title="Available Yield" action="Pre-order before harvest" />
          <div className="mt-5 grid gap-4">
            {harvestBatches.map((batch) => (
              <button
                key={batch.id}
                type="button"
                onClick={() => {
                  setSelectedId(batch.id)
                  setConfirmedKg(0)
                }}
                className={`rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  selectedId === batch.id ? 'border-brand bg-brand text-white' : 'border-gray-100 bg-cream/70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{batch.type}</p>
                    <p className={selectedId === batch.id ? 'text-sm text-white/70' : 'text-sm text-muted'}>
                      {batch.farm}, {batch.district}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold">
                    {batch.availableKg - batch.reservedKg} kg open
                  </span>
                </div>
                <ProgressBar value={(batch.reservedKg / batch.availableKg) * 100} inverted={selectedId === batch.id} />
              </button>
            ))}
          </div>
        </div>

        <div className="premium-card p-5">
          <SectionTitle icon={WalletCards} title="JIT Order Composer" action="Live reservation" />
          <div className="mt-6 rounded-3xl bg-cream p-5">
            <p className="text-sm font-semibold text-brand">{selected.id}</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">{selected.type}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Harvested by {selected.farmer} in {selected.district}. Reserve only what your kitchen needs.
            </p>
            <label className="mt-6 block text-sm font-bold" htmlFor="kg">
              Kilograms
            </label>
            <input
              id="kg"
              min="1"
              max={unreserved}
              value={effectiveKg}
              onChange={(event) => setKg(Math.min(unreserved, Number(event.target.value)))}
              type="range"
              className="mt-3 w-full accent-brand"
            />
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-5xl font-extrabold">{effectiveKg} kg</p>
                <p className="text-sm text-muted">{unreserved} kg still unreserved</p>
              </div>
              <p className="text-right text-2xl font-extrabold text-brand">{formatRwf(total)}</p>
            </div>
            <button
              type="button"
              onClick={() => setConfirmedKg((current) => current + effectiveKg)}
              disabled={unreserved <= 0}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand font-bold text-white shadow-lift transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
            >
              Reserve yield
              <ArrowRight size={18} />
            </button>
            {confirmedKg > 0 && (
              <div className="mt-4 rounded-2xl border border-organic/20 bg-organic/10 p-4 text-sm font-semibold text-organic">
                {confirmedKg} kg reserved for your next delivery route. Farmer fulfillment and ledger are ready.
              </div>
            )}
          </div>
        </div>
      </section>
    </ScreenFrame>
  )
}

function FarmerLedger() {
  return (
    <ScreenFrame>
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard icon={Sprout} label="Active grow tubes" value="1,420" detail="Across women-led farms" />
        <MetricCard icon={Truck} label="Fulfillment today" value="46 kg" detail="2 restaurant routes" />
        <MetricCard icon={Banknote} label="Clearing to farmers" value={formatRwf(456825)} detail="75% of gross revenue" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <div className="premium-card p-5">
          <SectionTitle icon={WalletCards} title="Revenue Ledger" action="Transparent split" />
          <div className="mt-5 grid gap-3">
            {ledgerEntries.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-gray-100 bg-cream/70 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-bold">{entry.farm}</p>
                    <p className="text-sm text-muted">{entry.status}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-right">
                    <MiniStat label="Gross" value={formatRwf(entry.gross)} />
                    <MiniStat label="Farmer" value={formatRwf(entry.farmerShare)} strong />
                    <MiniStat label="IZUBA" value={formatRwf(entry.izubaShare)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-5">
          <SectionTitle icon={Factory} title="Biomass Monetization" action="Waste to value" />
          <div className="mt-5 grid gap-3">
            {biomassSales.map((sale) => (
              <div key={sale.id} className="rounded-2xl bg-charcoal p-4 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{sale.buyer}</p>
                    <p className="text-sm text-white/60">{sale.useCase}</p>
                  </div>
                  <p className="text-xl font-extrabold">{formatRwf(sale.amount)}</p>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-sm">
                  <span>{sale.farm}</span>
                  <span>{sale.weightKg} kg substrate</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScreenFrame>
  )
}

function TraceabilityPage({ batch }: { batch: HarvestBatch }) {
  return (
    <ScreenFrame>
      <section className="overflow-hidden rounded-3xl bg-charcoal text-white shadow-lift">
        <div className="grid min-h-[520px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <StatusPill icon={QrCode} label="QR verified batch" tone="light" />
              <h2 className="mt-6 font-display text-4xl font-extrabold sm:text-5xl">{batch.type}</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">
                Harvested by {batch.farmer} at {batch.farm}. This batch was reserved before harvest and routed directly to restaurants.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              <SplitTile label="Origin" value={batch.district} dark />
              <SplitTile label="Reserved" value={`${batch.reservedKg} kg`} dark />
              <SplitTile label="Spoilage" value="0%" dark />
            </div>
          </div>
          <div className="relative bg-[linear-gradient(135deg,rgba(22,163,74,0.35),rgba(0,91,159,0.52)),url('https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/85 p-5 text-charcoal backdrop-blur-md">
              <p className="text-sm font-bold text-brand">Farm-to-fork proof</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Demand is committed before the crop leaves the growing room, removing the usual post-harvest guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ScreenFrame>
  )
}

function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-5"
    >
      {children}
    </motion.div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Sprout
  label: string
  value: string
  detail: string
}) {
  return (
    <motion.div whileHover={{ y: -4 }} className="premium-card p-5 transition-all duration-300 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand">
          <Icon size={21} />
        </div>
        <ArrowRight className="text-gray-300" size={18} />
      </div>
      <p className="mt-5 text-sm font-semibold text-muted">{label}</p>
      <p className="mt-1 text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
    </motion.div>
  )
}

function SectionTitle({
  icon: Icon,
  title,
  action,
}: {
  icon: typeof Sprout
  title: string
  action: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand/10 text-brand">
          <Icon size={19} />
        </div>
        <h2 className="font-display text-xl font-extrabold">{title}</h2>
      </div>
      <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-muted">{action}</span>
    </div>
  )
}

function StatusPill({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof Sprout
  label: string
  tone: 'blue' | 'green' | 'light'
}) {
  const className =
    tone === 'green'
      ? 'bg-organic/10 text-organic'
      : tone === 'light'
        ? 'bg-white/15 text-white'
        : 'bg-brand/10 text-brand'

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold ${className}`}>
      <Icon size={15} />
      {label}
    </span>
  )
}

function ProgressBar({ value, inverted = false }: { value: number; inverted?: boolean }) {
  return (
    <div className={`mt-4 h-2 overflow-hidden rounded-full ${inverted ? 'bg-white/20' : 'bg-gray-100'}`}>
      <div className={`h-full rounded-full ${inverted ? 'bg-white' : 'bg-organic'}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function SplitTile({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className={dark ? 'rounded-2xl bg-white/10 p-4' : 'rounded-2xl bg-cream p-4'}>
      <p className={dark ? 'text-sm text-white/60' : 'text-sm text-muted'}>{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </div>
  )
}

function MiniStat({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className={strong ? 'text-sm font-extrabold text-organic sm:text-base' : 'text-sm font-bold sm:text-base'}>{value}</p>
    </div>
  )
}

export default App
