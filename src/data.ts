export type HarvestBatch = {
  id: string
  farm: string
  farmer: string
  district: string
  type: string
  availableKg: number
  reservedKg: number
  harvestDate: string
  pricePerKg: number
  qrSlug: string
  qualityScore: number
  etaHours: number
  substrateKg: number
}

export type Order = {
  id: string
  restaurant: string
  buyer: string
  batchId: string
  quantityKg: number
  status: 'Reserved' | 'Packed' | 'In transit' | 'Delivered'
  deliveryWindow: string
  route: string
  distanceKm: number
}

export type LedgerEntry = {
  id: string
  farm: string
  gross: number
  farmerShare: number
  izubaShare: number
  status: string
}

export type BiomassSale = {
  id: string
  farm: string
  weightKg: number
  amount: number
  buyer: string
  useCase: string
}

export type FarmRoom = {
  id: string
  farm: string
  stage: string
  tubes: number
  humidity: number
  tempC: number
  readyInDays: number
}

export type DemandSignal = {
  restaurant: string
  district: string
  forecastKg: number
  matchRate: number
  priority: 'High' | 'Medium' | 'Watch'
}

export const harvestBatches: HarvestBatch[] = [
  {
    id: 'HB-2401',
    farm: 'Nyamata Women Growers',
    farmer: 'Aline Mukamana',
    district: 'Bugesera',
    type: 'Oyster mushrooms',
    availableKg: 86,
    reservedKg: 54,
    harvestDate: '2026-05-23',
    pricePerKg: 2800,
    qrSlug: 'nyamata-oyster-2401',
    qualityScore: 97,
    etaHours: 12,
    substrateKg: 128,
  },
  {
    id: 'HB-2402',
    farm: 'Huye Sunrise Cooperative',
    farmer: 'Clarisse Uwase',
    district: 'Huye',
    type: 'Button mushrooms',
    availableKg: 62,
    reservedKg: 48,
    harvestDate: '2026-05-23',
    pricePerKg: 3200,
    qrSlug: 'huye-button-2402',
    qualityScore: 94,
    etaHours: 16,
    substrateKg: 92,
  },
  {
    id: 'HB-2403',
    farm: 'Musanze Mycelium Hub',
    farmer: 'Vestine Iradukunda',
    district: 'Musanze',
    type: 'Shiitake trial crop',
    availableKg: 39,
    reservedKg: 24,
    harvestDate: '2026-05-24',
    pricePerKg: 4500,
    qrSlug: 'musanze-shiitake-2403',
    qualityScore: 91,
    etaHours: 34,
    substrateKg: 64,
  },
]

export const orders: Order[] = [
  {
    id: 'ORD-7741',
    restaurant: 'Kigali Table',
    buyer: 'Chef Nadia',
    batchId: 'HB-2401',
    quantityKg: 28,
    status: 'Packed',
    deliveryWindow: 'Tomorrow, 7:30 AM',
    route: 'Bugesera -> Kigali CBD',
    distanceKm: 42,
  },
  {
    id: 'ORD-7742',
    restaurant: 'Umami Kacyiru',
    buyer: 'Chef Emmanuel',
    batchId: 'HB-2402',
    quantityKg: 18,
    status: 'In transit',
    deliveryWindow: 'Today, 4:15 PM',
    route: 'Huye -> Kacyiru',
    distanceKm: 133,
  },
  {
    id: 'ORD-7743',
    restaurant: 'Norrsken Cafe',
    buyer: 'Procurement Desk',
    batchId: 'HB-2403',
    quantityKg: 14,
    status: 'Reserved',
    deliveryWindow: 'Sunday, 8:00 AM',
    route: 'Musanze -> Nyarutarama',
    distanceKm: 103,
  },
]

export const ledgerEntries: LedgerEntry[] = [
  {
    id: 'LED-901',
    farm: 'Nyamata Women Growers',
    gross: 235200,
    farmerShare: 176400,
    izubaShare: 58800,
    status: 'Clearing tonight',
  },
  {
    id: 'LED-902',
    farm: 'Huye Sunrise Cooperative',
    gross: 198400,
    farmerShare: 148800,
    izubaShare: 49600,
    status: 'Paid',
  },
  {
    id: 'LED-903',
    farm: 'Musanze Mycelium Hub',
    gross: 175500,
    farmerShare: 131625,
    izubaShare: 43875,
    status: 'Pending delivery',
  },
]

export const biomassSales: BiomassSale[] = [
  {
    id: 'BIO-310',
    farm: 'Nyamata Women Growers',
    weightKg: 128,
    amount: 38400,
    buyer: 'GreenSpark Briquettes',
    useCase: 'Clean cooking fuel',
  },
  {
    id: 'BIO-311',
    farm: 'Huye Sunrise Cooperative',
    weightKg: 92,
    amount: 27600,
    buyer: 'AgroCycle Rwanda',
    useCase: 'Bio-compost blend',
  },
]

export const farmRooms: FarmRoom[] = [
  {
    id: 'ROOM-A',
    farm: 'Nyamata Women Growers',
    stage: 'Fruiting',
    tubes: 520,
    humidity: 88,
    tempC: 21,
    readyInDays: 1,
  },
  {
    id: 'ROOM-B',
    farm: 'Huye Sunrise Cooperative',
    stage: 'Pinning',
    tubes: 430,
    humidity: 84,
    tempC: 22,
    readyInDays: 2,
  },
  {
    id: 'ROOM-C',
    farm: 'Musanze Mycelium Hub',
    stage: 'Incubation',
    tubes: 470,
    humidity: 79,
    tempC: 20,
    readyInDays: 5,
  },
]

export const demandSignals: DemandSignal[] = [
  {
    restaurant: 'Kigali Table',
    district: 'CBD',
    forecastKg: 32,
    matchRate: 96,
    priority: 'High',
  },
  {
    restaurant: 'Umami Kacyiru',
    district: 'Kacyiru',
    forecastKg: 24,
    matchRate: 89,
    priority: 'High',
  },
  {
    restaurant: 'Norrsken Cafe',
    district: 'Nyarutarama',
    forecastKg: 18,
    matchRate: 82,
    priority: 'Medium',
  },
  {
    restaurant: 'Kivu Grill',
    district: 'Remera',
    forecastKg: 14,
    matchRate: 73,
    priority: 'Watch',
  },
]

export const formatRwf = (value: number) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value)

export const totals = {
  availableKg: harvestBatches.reduce((sum, batch) => sum + batch.availableKg, 0),
  reservedKg: harvestBatches.reduce((sum, batch) => sum + batch.reservedKg, 0),
  farmerIncome: ledgerEntries.reduce((sum, entry) => sum + entry.farmerShare, 0),
  izubaRevenue: ledgerEntries.reduce((sum, entry) => sum + entry.izubaShare, 0),
  biomassRevenue: biomassSales.reduce((sum, sale) => sum + sale.amount, 0),
  spoilagePreventedKg: orders.reduce((sum, order) => sum + order.quantityKg, 0),
  averageMatchRate: Math.round(
    demandSignals.reduce((sum, signal) => sum + signal.matchRate, 0) / demandSignals.length,
  ),
  substrateRecoveredKg: biomassSales.reduce((sum, sale) => sum + sale.weightKg, 0),
}
