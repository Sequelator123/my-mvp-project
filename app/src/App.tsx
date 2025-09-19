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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Navigation viewMode={viewMode} setViewMode={setViewMode} />

        {viewMode === 'form' && <OrderForm pb={pb} />}
        {viewMode === 'dashboard' && <OrderDashboard pb={pb} setViewMode={setViewMode} />}
      </div>
    </div>
  )
}

export default App
