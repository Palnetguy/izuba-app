import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
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
  it('renders the command center operating metrics', () => {
    renderApp()

    expect(screen.getByText('Available harvest')).toBeInTheDocument()
    expect(screen.getByText('JIT Matching Engine')).toBeInTheDocument()
    expect(screen.getByText('Route Readiness')).toBeInTheDocument()
    expect(screen.getByText(/Spoilage prevented by pre-orders/i)).toBeInTheDocument()
  })

  it('confirms a restaurant yield reservation', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /restaurant/i }))
    await user.click(screen.getByRole('button', { name: /reserve yield/i }))

    expect(screen.getByText(/reserved\. farmer fulfillment/i)).toBeInTheDocument()
    expect(screen.getByText('Buyer Delivery Timeline')).toBeInTheDocument()
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

    await user.click(screen.getByRole('button', { name: /qr trace/i }))

    expect(screen.getByText('QR verified batch')).toBeInTheDocument()
    expect(screen.getByText('Farm-to-fork proof')).toBeInTheDocument()
    expect(screen.getByText('Spoilage')).toBeInTheDocument()
    expect(screen.getByText(/verified origin/i)).toBeInTheDocument()
  })
})
