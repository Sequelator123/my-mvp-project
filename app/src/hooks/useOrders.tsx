import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import type { LunchOrderRecord } from '../types/index'

interface UseOrdersReturn {
  orders: LunchOrderRecord[]
  isLoading: boolean
  error: string | null
  lastRefresh: Date | null
  fetchOrders: () => void
}

export const useOrders = (pb: PocketBase, shouldAutoRefresh: boolean = false): UseOrdersReturn => {
  const [orders, setOrders] = useState<LunchOrderRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchOrders = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const records = await pb.collection('lunch_orders').getFullList<LunchOrderRecord>({
        sort: '-created'
      })
      setOrders(records)
      setLastRefresh(new Date())
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError('Failed to load orders. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-refresh orders when enabled
  useEffect(() => {
    if (shouldAutoRefresh) {
      fetchOrders()
      const interval = setInterval(fetchOrders, 10000) // Refresh every 10 seconds
      return () => clearInterval(interval)
    }
  }, [shouldAutoRefresh])

  return {
    orders,
    isLoading,
    error,
    lastRefresh,
    fetchOrders
  }
}