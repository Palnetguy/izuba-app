import type { HarvestBatch } from '../data'
import { isSupabaseConfigured, supabase } from './supabase'

const restaurantId = '00000000-0000-0000-0000-000000000201'

const harvestBatchIds: Record<string, string> = {
  'HB-2401': '00000000-0000-0000-0000-000000000301',
  'HB-2402': '00000000-0000-0000-0000-000000000302',
  'HB-2403': '00000000-0000-0000-0000-000000000303',
}

export type ReservationResult = {
  orderId: string
  syncMode: 'supabase' | 'demo'
}

export async function reserveYield(batch: HarvestBatch, quantityKg: number): Promise<ReservationResult> {
  const demoOrderId = `DEMO-${Date.now().toString().slice(-6)}`

  if (!isSupabaseConfigured || !supabase) {
    return { orderId: demoOrderId, syncMode: 'demo' }
  }

  const harvestBatchId = harvestBatchIds[batch.id]

  if (!harvestBatchId) {
    return { orderId: demoOrderId, syncMode: 'demo' }
  }

  try {
    const totalAmount = quantityKg * batch.pricePerKg

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        restaurant_id: restaurantId,
        status: 'reserved',
        delivery_date: batch.harvestDate,
        delivery_window: batch.etaHours <= 16 ? 'Tomorrow, 7:30 AM' : 'Next available morning',
        route: `${batch.district} -> Kigali`,
        distance_km: batch.district === 'Bugesera' ? 42 : batch.district === 'Huye' ? 133 : 103,
        total_kg: quantityKg,
        total_amount: totalAmount,
        spoilage_prevented_kg: quantityKg,
      })
      .select('id')
      .single()

    if (orderError || !order) {
      throw orderError
    }

    const { error: itemError } = await supabase.from('order_items').insert({
      order_id: order.id,
      harvest_batch_id: harvestBatchId,
      quantity_kg: quantityKg,
      unit_price: batch.pricePerKg,
    })

    if (itemError) {
      throw itemError
    }

    const { error: harvestError } = await supabase
      .from('harvest_batches')
      .update({ reserved_kg: batch.reservedKg + quantityKg })
      .eq('id', harvestBatchId)

    if (harvestError) {
      throw harvestError
    }

    return { orderId: String(order.id).slice(0, 8).toUpperCase(), syncMode: 'supabase' }
  } catch {
    return { orderId: demoOrderId, syncMode: 'demo' }
  }
}
