import { useState } from 'react'
import PocketBase from 'pocketbase'
import { Navigation } from './components/Navigation'
import { OrderForm } from './components/OrderForm'
import { OrderDashboard } from './components/OrderDashboard'
import type { ViewMode } from './types/index'

function App() {
  const pb = new PocketBase('http://127.0.0.1:8090')
  const [viewMode, setViewMode] = useState<ViewMode>('form')

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: 'var(--md-surface)' }}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {/* App Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg mb-6"
            style={{
              background: 'linear-gradient(135deg, var(--md-primary) 0%, var(--md-primary-container) 100%)',
              fontSize: '32px'
            }}
          >
            🍽️
          </div>
          <h1
            className="md-typography-display-small mb-2"
            style={{ color: 'var(--md-on-surface)' }}
          >
            LunchSync
          </h1>
          <p
            className="md-typography-headline-small"
            style={{ color: 'var(--md-on-surface-variant)' }}
          >
            Streamline your company's lunch order collection
          </p>
        </div>

        {/* Navigation */}
        <Navigation viewMode={viewMode} setViewMode={setViewMode} />

        {/* Main Content */}
        <main className="pb-12">
          {viewMode === 'form' && <OrderForm pb={pb} />}
          {viewMode === 'dashboard' && <OrderDashboard pb={pb} setViewMode={setViewMode} />}
        </main>

        {/* Footer */}
        <footer
          className="text-center pt-8"
          style={{ borderTop: '1px solid var(--md-outline-variant)' }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: 'var(--md-primary)' }}
            ></div>
            <span
              className="md-typography-body-small"
              style={{ color: 'var(--md-on-surface-variant)' }}
            >
              © 2025 LunchSync - Professional lunch order coordination
            </span>
          </div>
          <p
            className="md-typography-body-small"
            style={{ color: 'var(--md-outline)' }}
          >
            Built with Material Design 3 principles
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
