import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  CalendarDays,
  ChefHat,
  CircleDot,
  Factory,
  Gauge,
  Leaf,
  LocateFixed,
  PackageCheck,
  QrCode,
  Route,
  Scale,
  ShieldCheck,
  Shuffle,
  Sprout,
  TimerReset,
  Truck,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react'
import {
  biomassSales,
  demandSignals,
  farmRooms,
  formatRwf,
  harvestBatches,
  ledgerEntries,
  orders,
  totals,
  type HarvestBatch,
} from './data'

type View = 'command' | 'restaurant' | 'farmer' | 'trace'
type Role = 'admin' | 'restaurant' | 'farmer'
type Tone = 'blue' | 'green' | 'dark' | 'cream'

const navItems: { id: View; label: string; icon: typeof BarChart3; roles: Role[] | 'public' }[] = [
  { id: 'command', label: 'Admin', icon: BarChart3, roles: ['admin'] },
  { id: 'restaurant', label: 'Restaurant', icon: ChefHat, roles: ['admin', 'restaurant'] },
  { id: 'farmer', label: 'Farmer', icon: Sprout, roles: ['admin', 'farmer'] },
  { id: 'trace', label: 'QR', icon: QrCode, roles: 'public' },
]

const demoAccounts: { role: Role; name: string; email: string; view: View; icon: typeof BarChart3 }[] = [
  { role: 'admin', name: 'Admin Command', email: 'admin@izuba.rw', view: 'command', icon: BarChart3 },
  { role: 'restaurant', name: 'Restaurant Buyer', email: 'restaurant@izuba.rw', view: 'restaurant', icon: ChefHat },
  { role: 'farmer', name: 'Farmer Ledger', email: 'farmer@izuba.rw', view: 'farmer', icon: Sprout },
]

const spoilageData = [
  { day: 'Mon', yieldKg: 12.5, ordersKg: 12.5 },
  { day: 'Tue', yieldKg: 15.0, ordersKg: 15.0 },
  { day: 'Wed', yieldKg: 14.2, ordersKg: 14.2 },
  { day: 'Thu', yieldKg: 18.5, ordersKg: 18.5 },
  { day: 'Fri', yieldKg: 20.1, ordersKg: 20.1 },
  { day: 'Sat', yieldKg: 22.0, ordersKg: 22.0 },
  { day: 'Sun', yieldKg: 21.5, ordersKg: 21.5 },
]

const projectionData = [
  { cycle: 'Cycle 1 (Months 1-3)', tubes: 1000, grossRevenue: 2050000, netProfit: 1450000 },
  { cycle: 'Cycle 2 (Months 4-6)', tubes: 2000, grossRevenue: 4100000, netProfit: 2900000 },
  { cycle: 'Cycle 3 (Months 7-9)', tubes: 3000, grossRevenue: 6150000, netProfit: 4350000 },
  { cycle: 'Cycle 4 (Months 10-12)', tubes: 3000, grossRevenue: 6150000, netProfit: 4350000 },
  { cycle: 'Year 2 Projection', tubes: 6000, grossRevenue: 12300000, netProfit: 8700000 },
]

const unitEconomics = {
  avgKgPerTube: 0.82,
  netMargin: 70.7,
  farmerPayout: 0.75,
  wasteCapture: 100,
}

function App() {
  const [activeView, setActiveView] = useState<View>('command')
  const [activeRole, setActiveRole] = useState<Role>('admin')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const activeAccount = demoAccounts.find((account) => account.role === activeRole) ?? demoAccounts[0]
  const visibleNavItems = navItems.filter((item) => item.roles === 'public' || item.roles.includes(activeRole))

  const switchRole = (role: Role) => {
    const account = demoAccounts.find((item) => item.role === role) ?? demoAccounts[0]
    setActiveRole(role)
    setActiveView(account.view)
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <LoginScreen onSelectRole={switchRole} />
  }

  return (
    <div className="min-h-screen text-charcoal">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4 px-3 py-3 sm:px-5 lg:px-6">
        <aside className="glass-panel fixed inset-x-3 bottom-3 z-40 flex items-center justify-between px-2 py-2 lg:sticky lg:top-3 lg:inset-x-auto lg:bottom-auto lg:h-[calc(100vh-1.5rem)] lg:w-[278px] lg:flex-col lg:items-stretch lg:p-3">
          <div className="hidden lg:block">
            <div className="flex items-center gap-3 border-b border-gray-200/70 pb-4">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-charcoal text-white">
                <Leaf size={20} />
              </div>
              <div>
                <p className="font-display text-lg font-extrabold">IZUBA</p>
                <p className="text-xs font-semibold text-muted">Mushroom Market OS</p>
              </div>
            </div>

            <div className="mt-4 border-l-4 border-brand bg-white p-4 shadow-premium">
              <p className="mono-label text-brand">Finals demo</p>
              <p className="mt-2 text-xl font-extrabold leading-tight">Zero-spoilage JIT marketplace</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <CompactStat label="Match" value={`${totals.averageMatchRate}%`} />
                <CompactStat label="Waste" value="0%" />
              </div>
            </div>

            <div className="mt-3 border border-gray-200 bg-cream/80 p-3">
              <p className="mono-label text-muted">Signed in as</p>
              <p className="mt-1 font-bold">{activeAccount.name}</p>
              <p className="text-xs font-semibold text-muted">{activeAccount.email}</p>
            </div>
          </div>

          <nav className="grid w-full grid-cols-4 gap-1.5 lg:grid-cols-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`flex h-11 items-center justify-center gap-3 rounded-md px-3 text-sm font-bold transition-all duration-200 lg:justify-start ${
                    isActive
                      ? 'bg-brand text-white shadow-lift'
                      : 'text-muted hover:bg-white hover:text-charcoal hover:shadow-premium'
                  }`}
                  title={item.label}
                >
                  <Icon size={18} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="hidden border border-organic/20 bg-organic/10 p-3 lg:block">
            <div className="flex items-center gap-2 text-sm font-bold text-organic">
              <BadgeCheck size={16} />
              Demo fallback online
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">
              Seeded data keeps the full pitch flow operational before Supabase is connected live.
            </p>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-organic/25 bg-white/70 px-3 py-2 text-sm font-bold text-organic transition hover:bg-white"
            >
              <Shuffle size={15} />
              Switch demo role
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-20 lg:pb-0">
          <Header activeView={activeView} activeRole={activeRole} onSwitchRole={switchRole} />
          {activeView === 'command' && <AdminCommandCenter />}
          {activeView === 'restaurant' && <RestaurantPortal />}
          {activeView === 'farmer' && <FarmerLedger />}
          {activeView === 'trace' && <TraceabilityPage batch={harvestBatches[0]} />}
        </main>
      </div>
    </div>
  )
}

function LoginScreen({ onSelectRole }: { onSelectRole: (role: Role) => void }) {
  return (
    <main className="min-h-screen px-4 py-6 text-charcoal sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-l-4 border-brand bg-white p-6 shadow-lift sm:p-8">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-charcoal text-white">
            <Leaf size={22} />
          </div>
          <p className="mono-label mt-8 text-brand">IZUBA demo login</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-normal sm:text-6xl">
            Choose the role you want to pitch.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            One build, three workspaces: admin operations, restaurant pre-orders, and farmer revenue visibility.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <CompactStat label="Spoilage" value="0%" />
            <CompactStat label="Farmer split" value="75%" />
            <CompactStat label="Match" value={`${totals.averageMatchRate}%`} />
          </div>
        </div>

        <div className="grid gap-3">
          {demoAccounts.map((account) => {
            const Icon = account.icon

            return (
              <button
                key={account.role}
                type="button"
                onClick={() => onSelectRole(account.role)}
                className="group border border-gray-200 bg-white p-4 text-left shadow-premium transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-md bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-display text-xl font-extrabold">{account.name}</p>
                      <p className="text-sm font-semibold text-muted">{account.email}</p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-300 transition group-hover:text-brand" size={20} />
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function Header({
  activeView,
  activeRole,
  onSwitchRole,
}: {
  activeView: View
  activeRole: Role
  onSwitchRole: (role: Role) => void
}) {
  const label = navItems.find((item) => item.id === activeView)?.label ?? 'Admin'

  return (
    <header className="glass-panel sticky top-3 z-30 mb-4 px-4 py-3">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="mono-label text-brand">{label}</p>
          <h1 className="font-display text-2xl font-extrabold tracking-normal sm:text-3xl">
            Rwanda's just-in-time mushroom operating system
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex border border-gray-200 bg-white p-1">
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                type="button"
                onClick={() => onSwitchRole(account.role)}
                className={`rounded-md px-3 py-1.5 text-xs font-extrabold transition ${
                  activeRole === account.role ? 'bg-charcoal text-white' : 'text-muted hover:text-brand'
                }`}
              >
                {account.role}
              </button>
            ))}
          </div>
          <StatusPill icon={CalendarDays} label="May 22, 2026" tone="blue" />
          <StatusPill icon={ShieldCheck} label="Pitch-safe mock mode" tone="green" />
        </div>
      </div>
    </header>
  )
}

function AdminCommandCenter() {
  return (
    <ScreenFrame>
      <section className="grid gap-3 border border-brand/20 bg-white p-4 shadow-premium lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="mono-label text-brand">Admin Command Center</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold">Platform control room for demand, yield, routing, and payouts</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <CompactStat label="Role" value="Admin" />
          <CompactStat label="Markets" value="4" />
          <CompactStat label="Routes" value="3" />
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Sprout} label="Available harvest" value={`${totals.availableKg} kg`} detail="3 farms online" />
        <MetricCard icon={PackageCheck} label="Reserved JIT" value={`${totals.reservedKg} kg`} detail="Demand locked pre-harvest" />
        <MetricCard icon={Users} label="Farmer income" value={formatRwf(totals.farmerIncome)} detail="75% payout model" />
        <MetricCard icon={Factory} label="Substrate recovered" value={`${totals.substrateRecoveredKg} kg`} detail={formatRwf(totals.biomassRevenue)} />
      </section>

      <AdminAnalytics />

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="JIT Matching Engine" action={`${totals.averageMatchRate}% demand match`} icon={Gauge}>
          <div className="grid gap-3">
            {demandSignals.map((signal) => (
              <div key={signal.restaurant} className="grid gap-3 border border-gray-200 bg-cream/70 p-3 md:grid-cols-[1fr_96px_92px] md:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{signal.restaurant}</p>
                    <StatusDot priority={signal.priority} />
                  </div>
                  <p className="text-sm text-muted">{signal.district} demand forecast - {signal.forecastKg} kg</p>
                </div>
                <ProgressBar value={signal.matchRate} />
                <p className="text-right text-2xl font-extrabold text-brand">{signal.matchRate}%</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Operating Model" action="25/75 split" icon={BarChart3}>
          <div className="bg-charcoal p-5 text-white">
            <p className="text-sm text-white/60">Spoilage prevented by pre-orders</p>
            <p className="mt-2 text-5xl font-extrabold">{totals.spoilagePreventedKg} kg</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              The algorithm turns harvest risk into confirmed restaurant demand before crops leave the farm.
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <SplitTile label="Farmers" value="75%" />
            <SplitTile label="IZUBA" value="25%" />
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel title="Route Readiness" action="Live fulfillment" icon={Route}>
          <div className="grid gap-3">
            {orders.map((order, index) => {
              const batch = harvestBatches.find((item) => item.id === order.batchId)

              return (
                <div key={order.id} className="grid gap-3 border border-gray-200 bg-white p-3 sm:grid-cols-[36px_1fr_auto] sm:items-center">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-brand text-sm font-extrabold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold">{order.restaurant}</p>
                    <p className="text-sm text-muted">{order.route} - {batch?.farm}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <StatusPill icon={Truck} label={order.status} tone={order.status === 'In transit' ? 'blue' : 'green'} />
                    <p className="mt-1 text-xs font-bold text-muted">{order.distanceKm} km</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>

        <Panel title="Harvest Rooms" action="Sensor snapshot" icon={LocateFixed}>
          <div className="grid gap-3 md:grid-cols-3">
            {farmRooms.map((room) => (
              <div key={room.id} className="border border-gray-200 bg-cream/70 p-3">
                <p className="mono-label text-brand">{room.id}</p>
                <p className="mt-2 font-bold leading-tight">{room.farm}</p>
                <p className="mt-1 text-sm text-muted">{room.stage} - ready in {room.readyInDays}d</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <CompactStat label="Tubes" value={String(room.tubes)} />
                  <CompactStat label="RH" value={`${room.humidity}%`} />
                  <CompactStat label="Temp" value={`${room.tempC}C`} />
                  <CompactStat label="ETA" value={`${room.readyInDays}d`} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </ScreenFrame>
  )
}

function AdminAnalytics() {
  const totalProjectedProfit = projectionData.reduce((sum, item) => sum + item.netProfit, 0)
  const yearOneProfit = projectionData.slice(0, 4).reduce((sum, item) => sum + item.netProfit, 0)

  return (
    <section className="grid gap-4 2xl:grid-cols-[1.05fr_0.95fr]">
      <Panel title="Zero-Spoilage Ledger" action="7-day algorithm proof" icon={Scale}>
        <div className="grid gap-4 xl:grid-cols-[1fr_220px]">
          <div className="h-[320px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spoilageData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
                <defs>
                  <linearGradient id="yieldFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 700 }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={(value) => `${value}kg`}
                />
                <Tooltip content={<ChartTooltip formatter={(value) => `${Number(value).toFixed(1)} kg`} />} />
                <Area
                  type="monotone"
                  dataKey="yieldKg"
                  name="Harvest Yield"
                  stroke="#16A34A"
                  strokeWidth={2}
                  fill="url(#yieldFill)"
                  animationDuration={900}
                />
                <Area
                  type="monotone"
                  dataKey="ordersKg"
                  name="B2B Pre-Orders"
                  stroke="#005B9F"
                  strokeWidth={4}
                  fill="transparent"
                  animationDuration={1100}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid content-start gap-3">
            <InsightBlock label="Waste variance" value="0.0 kg" detail="Yield and orders match every day." tone="green" />
            <InsightBlock label="Fulfillment lock" value="100%" detail="Every harvested kilogram has a buyer." tone="blue" />
            <InsightBlock label="Algorithm signal" value="Synced" detail="No unsold inventory exposure this week." tone="dark" />
          </div>
        </div>
      </Panel>

      <Panel title="4-Cycle Financial Projection" action="Optimal efficiency model" icon={BarChart3}>
        <div className="grid gap-4 xl:grid-cols-[1fr_220px]">
          <div className="h-[320px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={projectionData} margin={{ top: 16, right: 4, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="cycle"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 700 }}
                  interval={0}
                  tickFormatter={(value) => String(value).replace(' (Months ', '\nM').replace(')', '')}
                />
                <YAxis
                  yAxisId="tubes"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={(value) => `${Number(value) / 1000}k`}
                />
                <YAxis
                  yAxisId="profit"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#005B9F', fontSize: 12, fontWeight: 800 }}
                  tickFormatter={(value) => `${Number(value) / 1000000}M`}
                />
                <Tooltip content={<ChartTooltip formatter={(value, name) => name === 'Tubes' ? `${value} tubes` : formatRwf(Number(value))} />} />
                <Bar
                  yAxisId="tubes"
                  dataKey="tubes"
                  name="Tubes"
                  fill="#D0E4FF"
                  stroke="#A8CEFF"
                  radius={[4, 4, 0, 0]}
                  animationDuration={900}
                />
                <Line
                  yAxisId="profit"
                  type="monotone"
                  dataKey="netProfit"
                  name="Net Profit"
                  stroke="#005B9F"
                  strokeWidth={4}
                  dot={{ r: 4, fill: '#005B9F', stroke: '#FFFFFF', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#16A34A', stroke: '#FFFFFF', strokeWidth: 2 }}
                  animationDuration={1200}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="grid content-start gap-3">
            <InsightBlock label="Year-one net" value={formatRwf(yearOneProfit)} detail="Cycles 1-4 at efficiency cap." tone="blue" />
            <InsightBlock label="Year-two net" value={formatRwf(projectionData[4].netProfit)} detail="Scaling to 2 farmer operators." tone="green" />
            <InsightBlock label="Modeled net" value={formatRwf(totalProjectedProfit)} detail="Includes year-two projection." tone="dark" />
          </div>
        </div>
      </Panel>

      <div className="grid gap-3 md:grid-cols-4 2xl:col-span-2">
        <UnitEconomicsTile label="Kg / tube" value={unitEconomics.avgKgPerTube.toFixed(2)} detail="Conservative production assumption" />
        <UnitEconomicsTile label="Net margin" value={`${unitEconomics.netMargin}%`} detail="After direct production costs" />
        <UnitEconomicsTile label="Farmer payout" value={`${unitEconomics.farmerPayout * 100}%`} detail="Profit-share to rural women" />
        <UnitEconomicsTile label="Waste capture" value={`${unitEconomics.wasteCapture}%`} detail="Food + biomass monetized" />
      </div>
    </section>
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
      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Panel title="Available Yield Exchange" action="Pre-order before harvest" icon={ChefHat}>
          <div className="grid gap-3">
            {harvestBatches.map((batch) => {
              const isSelected = selectedId === batch.id
              const openKg = batch.availableKg - batch.reservedKg

              return (
                <button
                  key={batch.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(batch.id)
                    setConfirmedKg(0)
                  }}
                  className={`border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift ${
                    isSelected ? 'border-brand bg-brand text-white' : 'border-gray-200 bg-cream/70'
                  }`}
                >
                  <div className="grid gap-3 md:grid-cols-[1fr_120px_92px] md:items-center">
                    <div>
                      <p className="font-bold">{batch.type}</p>
                      <p className={isSelected ? 'text-sm text-white/70' : 'text-sm text-muted'}>
                        {batch.farm}, {batch.district}
                      </p>
                    </div>
                    <ProgressBar value={(batch.reservedKg / batch.availableKg) * 100} inverted={isSelected} />
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-extrabold">{openKg} kg</p>
                      <p className={isSelected ? 'text-xs font-bold text-white/65' : 'text-xs font-bold text-muted'}>open</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </Panel>

        <Panel title="JIT Order Composer" action="Live reservation" icon={WalletCards}>
          <div className="bg-cream p-4">
            <p className="mono-label text-brand">{selected.id}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">{selected.type}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Harvested by {selected.farmer} in {selected.district}. Reserve only what your kitchen needs, then route it directly.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <CompactStat label="Quality" value={`${selected.qualityScore}%`} />
              <CompactStat label="ETA" value={`${selected.etaHours}h`} />
              <CompactStat label="Waste" value={`${selected.substrateKg}kg`} />
            </div>
            <label className="mt-6 block text-sm font-bold" htmlFor="kg">
              Reservation volume
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
            <div className="mt-4 flex items-end justify-between gap-4">
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
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand font-bold text-white shadow-lift transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
            >
              Reserve yield
              <ArrowRight size={18} />
            </button>
            {confirmedKg > 0 && (
              <div className="mt-4 border border-organic/20 bg-organic/10 p-3 text-sm font-semibold text-organic">
                {confirmedKg} kg reserved. Farmer fulfillment, route planning, and ledger split are staged.
              </div>
            )}
          </div>
        </Panel>
      </section>

      <Panel title="Buyer Delivery Timeline" action="Kitchen-ready logistics" icon={TimerReset}>
        <div className="grid gap-3 md:grid-cols-3">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 bg-white p-3">
              <p className="mono-label text-brand">{order.id}</p>
              <p className="mt-2 font-bold">{order.restaurant}</p>
              <p className="mt-1 text-sm text-muted">{order.deliveryWindow}</p>
              <div className="mt-4 flex items-center justify-between">
                <StatusPill icon={Truck} label={order.status} tone={order.status === 'Delivered' ? 'dark' : 'blue'} />
                <p className="text-sm font-extrabold">{order.quantityKg} kg</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </ScreenFrame>
  )
}

function FarmerLedger() {
  return (
    <ScreenFrame>
      <section className="grid gap-3 md:grid-cols-3">
        <MetricCard icon={Sprout} label="Active grow tubes" value="1,420" detail="Across women-led farms" />
        <MetricCard icon={Truck} label="Fulfillment today" value="46 kg" detail="2 restaurant routes" />
        <MetricCard icon={Banknote} label="Clearing to farmers" value={formatRwf(456825)} detail="75% of gross revenue" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.85fr]">
        <Panel title="Revenue Ledger" action="Transparent split" icon={WalletCards}>
          <div className="grid gap-3">
            {ledgerEntries.map((entry) => (
              <div key={entry.id} className="border border-gray-200 bg-cream/70 p-3">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="mono-label text-brand">{entry.id}</p>
                    <p className="mt-1 font-bold">{entry.farm}</p>
                    <p className="text-sm text-muted">{entry.status}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-right">
                    <MiniStat label="Gross" value={formatRwf(entry.gross)} />
                    <MiniStat label="Farmer 75%" value={formatRwf(entry.farmerShare)} strong />
                    <MiniStat label="IZUBA 25%" value={formatRwf(entry.izubaShare)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Biomass Monetization" action="Waste to value" icon={Factory}>
          <div className="grid gap-3">
            {biomassSales.map((sale) => (
              <div key={sale.id} className="bg-charcoal p-4 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{sale.buyer}</p>
                    <p className="text-sm text-white/60">{sale.useCase}</p>
                  </div>
                  <p className="text-xl font-extrabold">{formatRwf(sale.amount)}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border border-white/15 bg-white/10 px-3 py-2 text-sm">
                  <span>{sale.farm}</span>
                  <span>{sale.weightKg} kg substrate</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <Panel title="Grow Room Obligations" action="What farmers do next" icon={CircleDot}>
        <div className="grid gap-3 md:grid-cols-3">
          {farmRooms.map((room) => (
            <div key={room.id} className="border border-gray-200 bg-white p-3">
              <p className="mono-label text-brand">{room.stage}</p>
              <p className="mt-2 font-bold">{room.farm}</p>
              <ProgressBar value={Math.max(12, 100 - room.readyInDays * 16)} />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <CompactStat label="Tubes" value={String(room.tubes)} />
                <CompactStat label="RH" value={`${room.humidity}%`} />
                <CompactStat label="Ready" value={`${room.readyInDays}d`} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </ScreenFrame>
  )
}

function TraceabilityPage({ batch }: { batch: HarvestBatch }) {
  return (
    <ScreenFrame>
      <section className="overflow-hidden bg-charcoal text-white shadow-lift">
        <div className="grid min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <StatusPill icon={QrCode} label="QR verified batch" tone="dark" />
              <h2 className="mt-6 font-display text-4xl font-extrabold sm:text-6xl">{batch.type}</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">
                Harvested by {batch.farmer} at {batch.farm}. Reserved before harvest and routed directly to Kigali restaurants.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              <SplitTile label="Origin" value={batch.district} dark />
              <SplitTile label="Reserved" value={`${batch.reservedKg} kg`} dark />
              <SplitTile label="Spoilage" value="0%" dark />
            </div>
          </div>
          <div className="relative min-h-[460px] bg-[linear-gradient(135deg,rgba(22,163,74,0.28),rgba(0,91,159,0.48)),url('https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
            <div className="absolute right-5 top-5 grid h-28 w-28 grid-cols-5 gap-1 bg-white p-3 shadow-lift">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className={index % 2 === 0 || [6, 8, 16, 18].includes(index) ? 'bg-charcoal' : 'bg-white'}
                />
              ))}
            </div>
            <div className="absolute bottom-5 left-5 right-5 bg-white/88 p-5 text-charcoal backdrop-blur-md">
              <p className="text-sm font-bold text-brand">Farm-to-fork proof</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Batch {batch.id} shows verified origin, live reservation volume, farmer payout logic, and biomass recovery.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <CompactStat label="Quality" value={`${batch.qualityScore}%`} />
                <CompactStat label="ETA" value={`${batch.etaHours}h`} />
                <CompactStat label="Substrate" value={`${batch.substrateKg}kg`} />
              </div>
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="grid gap-4"
    >
      {children}
    </motion.div>
  )
}

function Panel({
  children,
  icon: Icon,
  title,
  action,
}: {
  children: React.ReactNode
  icon: typeof Sprout
  title: string
  action: string
}) {
  return (
    <section className="premium-card p-4">
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-brand/10 text-brand">
            <Icon size={18} />
          </div>
          <h2 className="font-display text-xl font-extrabold">{title}</h2>
        </div>
        <span className="mono-label hidden text-muted sm:inline">{action}</span>
      </div>
      {children}
    </section>
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
    <motion.div whileHover={{ y: -3 }} className="premium-card p-4 transition-all duration-200 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-brand/10 text-brand">
          <Icon size={19} />
        </div>
        <Zap className="text-gray-300" size={17} />
      </div>
      <p className="mt-4 text-sm font-semibold text-muted">{label}</p>
      <p className="mt-1 text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
    </motion.div>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color?: string }>
  label?: string
  formatter: (value: number, name: string) => string
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="border border-gray-200 bg-white/95 p-3 shadow-lift backdrop-blur-md">
      <p className="mono-label text-brand">{label}</p>
      <div className="mt-2 grid gap-1.5">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-8 text-sm">
            <span className="flex items-center gap-2 font-semibold text-muted">
              <span className="h-2 w-2" style={{ backgroundColor: item.color ?? '#005B9F' }} />
              {item.name}
            </span>
            <span className="font-extrabold text-charcoal">{formatter(item.value, item.name)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightBlock({
  label,
  value,
  detail,
  tone,
}: {
  label: string
  value: string
  detail: string
  tone: Tone
}) {
  const toneClass =
    tone === 'green'
      ? 'border-organic/25 bg-organic/10 text-organic'
      : tone === 'blue'
        ? 'border-brand/25 bg-brand/10 text-brand'
        : 'border-charcoal/15 bg-charcoal text-white'

  return (
    <div className={`border p-3 ${toneClass}`}>
      <p className="text-xs font-bold uppercase tracking-[0.12em] opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
      <p className={tone === 'dark' ? 'mt-2 text-sm leading-5 text-white/65' : 'mt-2 text-sm leading-5 text-muted'}>
        {detail}
      </p>
    </div>
  )
}

function UnitEconomicsTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-gray-200 bg-white p-4 shadow-premium">
      <p className="mono-label text-muted">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-brand">{value}</p>
      <p className="mt-2 text-sm leading-5 text-muted">{detail}</p>
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
  tone: Tone
}) {
  const className =
    tone === 'green'
      ? 'bg-organic/10 text-organic'
      : tone === 'dark'
        ? 'bg-white/15 text-white'
        : tone === 'cream'
          ? 'bg-cream text-muted'
          : 'bg-brand/10 text-brand'

  return (
    <span className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-bold ${className}`}>
      <Icon size={15} />
      {label}
    </span>
  )
}

function ProgressBar({ value, inverted = false }: { value: number; inverted?: boolean }) {
  return (
    <div className={`h-2 overflow-hidden bg-gray-200 ${inverted ? 'bg-white/20' : ''}`}>
      <div className={`h-full ${inverted ? 'bg-white' : 'bg-organic'}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function SplitTile({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className={dark ? 'border border-white/15 bg-white/10 p-3' : 'border border-gray-200 bg-cream p-3'}>
      <p className={dark ? 'text-sm text-white/60' : 'text-sm text-muted'}>{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </div>
  )
}

function CompactStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-gray-200/80 bg-white/70 px-2 py-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 text-sm font-extrabold text-charcoal">{value}</p>
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

function StatusDot({ priority }: { priority: 'High' | 'Medium' | 'Watch' }) {
  const className = priority === 'High' ? 'bg-organic' : priority === 'Medium' ? 'bg-brand' : 'bg-amber-500'

  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-muted">
      <span className={`h-2 w-2 ${className}`} />
      {priority}
    </span>
  )
}

export default App
