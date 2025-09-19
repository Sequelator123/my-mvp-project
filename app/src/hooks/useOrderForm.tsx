import { useState } from 'react'
import PocketBase from 'pocketbase'
import type { LunchOrder, Message } from '../types/index'

interface UseOrderFormReturn {
  formData: LunchOrder
  isSubmitting: boolean
  message: Message | null
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  resetForm: () => void
}

const getInitialFormData = (): LunchOrder => ({
  employee_name: '',
  order_item: '',
  dietary_notes: '',
  order_date: new Date().toISOString().split('T')[0],
  status: 'pending'
})

export const useOrderForm = (pb: PocketBase): UseOrderFormReturn => {
  const [formData, setFormData] = useState<LunchOrder>(getInitialFormData())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (): string | null => {
    if (!formData.employee_name.trim()) {
      return 'Employee name is required'
    }
    if (!formData.order_item.trim()) {
      return 'Order item is required'
    }
    if (!formData.order_date) {
      return 'Order date is required'
    }
    return null
  }

  const resetForm = () => {
    setFormData(getInitialFormData())
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setMessage({ type: 'error', text: validationError })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      await pb.collection('lunch_orders').create(formData)
      setMessage({ type: 'success', text: 'Order submitted successfully!' })
      resetForm()
    } catch (error) {
      console.error('Error submitting order:', error)
      setMessage({
        type: 'error',
        text: 'Failed to submit order. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    message,
    handleInputChange,
    handleSubmit,
    resetForm
  }
}