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
    <div className="space-y-6">
      <div className="md-card-elevated p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <div className="mb-6 sm:mb-0">
            <div className="flex items-center mb-4">
              <div
                className="w-12 h-12 mr-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--md-primary-container)',
                  fontSize: '24px'
                }}
              >
                📊
              </div>
              <div>
                <h1 className="md-typography-headline-medium mb-1" style={{ color: 'var(--md-on-surface)' }}>
                  Order Dashboard
                </h1>
                <p className="md-typography-body-large" style={{ color: 'var(--md-on-surface-variant)' }}>
                  Real-time view of all submitted lunch orders
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Button
              variant="outlined"
              onClick={fetchOrders}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                  ></div>
                  <span>Refreshing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '16px' }}>🔄</span>
                  <span>Refresh</span>
                </div>
              )}
            </Button>
            {lastRefresh && (
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--md-primary)' }}
                ></div>
                <span className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 md-snackbar error">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '16px' }}>⚠️</span>
              <span className="md-typography-body-medium">{error}</span>
            </div>
          </div>
        )}

        <div className="md-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h2 className="md-typography-title-large mb-1">
                Total orders: <span style={{ color: 'var(--md-primary)' }}>{orders.length}</span>
              </h2>
              <p className="md-typography-body-medium" style={{ color: 'var(--md-on-surface-variant)' }}>
                Live dashboard updates every 10 seconds
              </p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--md-secondary)' }}
                ></div>
                <span className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
                  Pending
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--md-primary)' }}
                ></div>
                <span className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
                  Confirmed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--md-error)' }}
                ></div>
                <span className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
                  Cancelled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {orders.length === 0 && !isLoading ? (
        <div className="md-card p-8 text-center">
          <div className="mb-4" style={{ fontSize: '64px' }}>📋</div>
          <h3 className="md-typography-headline-small mb-2">No orders submitted yet</h3>
          <p className="md-typography-body-large mb-6" style={{ color: 'var(--md-on-surface-variant)' }}>
            Get started by submitting the first lunch order
          </p>
          <Button
            variant="filled"
            onClick={() => setViewMode('form')}
          >
            <span style={{ fontSize: '16px', marginRight: '8px' }}>➕</span>
            Submit First Order
          </Button>
        </div>
      ) : (
        <Table orders={orders} isLoading={isLoading} />
      )}

      <div className="md-card p-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: 'var(--md-primary)' }}
            ></div>
            <span className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
              Data refreshes automatically. Volunteers can export order details from PocketBase admin panel.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}