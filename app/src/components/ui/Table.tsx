import React from 'react'
import type { LunchOrderRecord } from '../../types/index'

interface TableProps {
  orders: LunchOrderRecord[]
  isLoading?: boolean
}

export const Table: React.FC<TableProps> = ({ orders, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No orders submitted yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-4 py-2 text-left">Employee</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Order</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Dietary Notes</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium">
                {order.employee_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="max-w-xs">
                  {order.order_item.length > 50
                    ? `${order.order_item.substring(0, 50)}...`
                    : order.order_item
                  }
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                {order.dietary_notes || '-'}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.order_date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    order.status === 'pending'
                      ? 'bg-yellow-400'
                      : order.status === 'confirmed'
                      ? 'bg-green-400'
                      : 'bg-red-400'
                  }`}></div>
                  {order.status}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                {new Date(order.created).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}