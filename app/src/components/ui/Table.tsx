import React from 'react'
import type { LunchOrderRecord } from '../../types/index'

interface TableProps {
  orders: LunchOrderRecord[]
  isLoading?: boolean
}

export const Table: React.FC<TableProps> = ({ orders, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="md-card p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--md-primary)' }}></div>
        <p className="mt-4 md-typography-body-medium" style={{ color: 'var(--md-on-surface-variant)' }}>Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="md-card p-8 text-center">
        <div className="mb-4" style={{ fontSize: '48px' }}>📋</div>
        <h3 className="md-typography-headline-small mb-2">No orders submitted yet</h3>
        <p className="md-typography-body-medium" style={{ color: 'var(--md-on-surface-variant)' }}>
          Orders will appear here once employees start submitting their lunch requests.
        </p>
      </div>
    )
  }

  const getStatusChip = (status: string) => {
    const baseClasses = "md-chip"
    switch (status) {
      case 'confirmed':
        return `${baseClasses} md-chip-primary`
      case 'pending':
        return `${baseClasses} md-chip-secondary`
      case 'cancelled':
        return `${baseClasses} md-chip-error`
      default:
        return baseClasses
    }
  }

  return (
    <div className="md-data-table">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Order</th>
            <th>Dietary Notes</th>
            <th>Date</th>
            <th>Status</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <span className="md-typography-body-medium font-medium">
                  {order.employee_name}
                </span>
              </td>
              <td>
                <div style={{ maxWidth: '300px' }}>
                  <span className="md-typography-body-medium">
                    {order.order_item.length > 60
                      ? `${order.order_item.substring(0, 60)}...`
                      : order.order_item
                    }
                  </span>
                </div>
              </td>
              <td>
                <span className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
                  {order.dietary_notes || '—'}
                </span>
              </td>
              <td>
                <span className="md-typography-body-medium">
                  {new Date(order.order_date).toLocaleDateString()}
                </span>
              </td>
              <td>
                <span className={getStatusChip(order.status)}>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: order.status === 'pending'
                        ? 'var(--md-secondary)'
                        : order.status === 'confirmed'
                        ? 'var(--md-primary)'
                        : 'var(--md-error)'
                    }}
                  ></div>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td>
                <span className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
                  {new Date(order.created).toLocaleDateString()} {new Date(order.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}