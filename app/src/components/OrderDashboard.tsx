import React from 'react'
import PocketBase from 'pocketbase'
import { Button } from './ui/Button'
import { Table } from './ui/Table'
import { useOrders } from '../hooks/useOrders'
import type { ViewMode } from '../types/index'

interface OrderDashboardProps {
  pb: PocketBase
  setViewMode: (mode: ViewMode) => void
}

export const OrderDashboard: React.FC<OrderDashboardProps> = ({ pb, setViewMode }) => {
  const { orders, isLoading, error, lastRefresh, fetchOrders } = useOrders(pb, true)

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            📊 Order Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time view of all submitted lunch orders
          </p>
        </div>
        <div className="text-right">
          <Button
            variant="secondary"
            onClick={fetchOrders}
            disabled={isLoading}
            className="mb-2"
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
          {lastRefresh && (
            <p className="text-xs text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Total orders: <span className="font-semibold">{orders.length}</span>
        </p>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            Pending
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            Confirmed
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            Cancelled
          </span>
        </div>
      </div>

      {orders.length === 0 && !isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders submitted yet.</p>
          <button
            onClick={() => setViewMode('form')}
            className="mt-2 text-blue-600 hover:text-blue-700"
          >
            Submit the first order →
          </button>
        </div>
      ) : (
        <Table orders={orders} isLoading={isLoading} />
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Orders refresh automatically every 10 seconds. Volunteers can export this data from PocketBase admin.
        </p>
      </div>
    </div>
  )
}