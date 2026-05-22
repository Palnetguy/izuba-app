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
}

export type Order = {
  id: string
  restaurant: string
  buyer: string
  batchId: string
  quantityKg: number
  status: 'Reserved' | 'Packed' | 'In transit' | 'Delivered'
  deliveryWindow: string
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
  },
  {
    id: 'ORD-7742',
    restaurant: 'Umami Kacyiru',
    buyer: 'Chef Emmanuel',
    batchId: 'HB-2402',
    quantityKg: 18,
    status: 'In transit',
    deliveryWindow: 'Today, 4:15 PM',
  },
  {
    id: 'ORD-7743',
    restaurant: 'Norrsken Cafe',
    buyer: 'Procurement Desk',
    batchId: 'HB-2403',
    quantityKg: 14,
    status: 'Reserved',
    deliveryWindow: 'Sunday, 8:00 AM',
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
}
