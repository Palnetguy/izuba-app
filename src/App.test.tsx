import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./lib/reservations', () => ({
  reserveYield: vi.fn(async () => ({ orderId: 'DEMO-TEST', syncMode: 'demo' })),
}))

afterEach(() => {
  cleanup()
  window.history.pushState({}, '', '/')
})

function renderApp() {
  const queryClient = new QueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  )
}

describe('IZUBA MVP', () => {
  it('renders the login role chooser', () => {
    renderApp()

    expect(screen.getByText('IZUBA access portal')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /admin command/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /restaurant buyer/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /farmer ledger/i })).toBeInTheDocument()
  })

  it('renders the admin command center operating metrics', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /admin command/i }))

    expect(screen.getByText('Admin Command Center')).toBeInTheDocument()
    expect(screen.getByText('Zero-Spoilage Ledger')).toBeInTheDocument()
    expect(screen.getByText('4-Cycle Financial Projection')).toBeInTheDocument()
    expect(screen.getByText('Net margin')).toBeInTheDocument()
    expect(screen.getByText('Available harvest')).toBeInTheDocument()
    expect(screen.getByText('JIT Matching Engine')).toBeInTheDocument()
    expect(screen.getByText('Route Readiness')).toBeInTheDocument()
    expect(screen.getByText(/Spoilage prevented by pre-orders/i)).toBeInTheDocument()
  })

  it('confirms a restaurant yield reservation', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /restaurant buyer/i }))
    await user.click(screen.getByRole('button', { name: /reserve yield/i }))

    expect(screen.getByText(/demo fallback active|supabase synced/i)).toBeInTheDocument()
    expect(screen.getByText('Buyer Delivery Timeline')).toBeInTheDocument()
  })

  it('opens role workspaces from direct URLs', () => {
    window.history.pushState({}, '', '/farmer')
    renderApp()

    expect(screen.getByText('Signed in as')).toBeInTheDocument()
    expect(screen.getByText('Farmer Ledger')).toBeInTheDocument()
    expect(screen.getByText('Revenue Ledger')).toBeInTheDocument()
  })

  it('shows farmer revenue and biomass monetization screens', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /farmer ledger/i }))

    expect(screen.getByText('Revenue Ledger')).toBeInTheDocument()
    expect(screen.getByText('Biomass Monetization')).toBeInTheDocument()
    expect(screen.getByText('Transparent split')).toBeInTheDocument()
    expect(screen.getByText('Grow Room Obligations')).toBeInTheDocument()
  })

  it('shows the QR traceability proof page', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /admin command/i }))
    await user.click(screen.getByRole('button', { name: /^qr$/i }))

    expect(screen.getByText('Scan verified product')).toBeInTheDocument()
    expect(screen.getByText('Farm-to-fork proof')).toBeInTheDocument()
    expect(screen.getByText('Public QR page')).toBeInTheDocument()
    expect(screen.getByText('Watch how to prepare this batch')).toBeInTheDocument()
    expect(screen.getByText('Product Information')).toBeInTheDocument()
    expect(screen.getByText('Spoilage')).toBeInTheDocument()
    expect(screen.getByText(/proves origin/i)).toBeInTheDocument()
    expect(screen.queryByText('Signed in as')).not.toBeInTheDocument()
  })

  it('opens the QR scan route as a public page without dashboard access', () => {
    window.history.pushState({}, '', '/trace/nyamata-oyster-2401')
    renderApp()

    expect(screen.getByText('Public QR page')).toBeInTheDocument()
    expect(screen.getByText('Watch how to prepare this batch')).toBeInTheDocument()
    expect(screen.queryByText('Admin Command')).not.toBeInTheDocument()
    expect(screen.queryByText('Switch demo role')).not.toBeInTheDocument()
  })

  it('translates the public QR page to Kinyarwanda', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/trace/nyamata-oyster-2401')
    renderApp()

    await user.click(screen.getByRole('button', { name: 'RW' }))

    expect(screen.getByText('Igicuruzwa cyagenzuwe')).toBeInTheDocument()
    expect(screen.getByText("Amakuru y'Igicuruzwa")).toBeInTheDocument()
    expect(screen.getByText(/Reba uko wategura uyu musaruro/i)).toBeInTheDocument()
  })
})
