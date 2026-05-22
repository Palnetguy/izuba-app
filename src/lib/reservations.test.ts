import { describe, expect, it, vi } from 'vitest'
import { harvestBatches } from '../data'

describe('reserveYield fallback', () => {
  it('returns demo mode when Supabase is unavailable', async () => {
    vi.resetModules()
    vi.doMock('./supabase', () => ({
      isSupabaseConfigured: false,
      supabase: null,
    }))

    const { reserveYield } = await import('./reservations')
    const result = await reserveYield(harvestBatches[0], 2)

    expect(result.syncMode).toBe('demo')
    expect(result.orderId).toMatch(/^DEMO-/)
  })
})
