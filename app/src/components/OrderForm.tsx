import React from 'react'
import PocketBase from 'pocketbase'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'
import { useOrderForm } from '../hooks/useOrderForm'

interface OrderFormProps {
  pb: PocketBase
}

export const OrderForm: React.FC<OrderFormProps> = ({ pb }) => {
  const {
    formData,
    isSubmitting,
    message,
    handleInputChange,
    handleSubmit
  } = useOrderForm(pb)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          🍽️ Lunch Order Form
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Submit your lunch order for today
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="employee_name"
            name="employee_name"
            value={formData.employee_name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            label="Your Name"
          />

          <Textarea
            id="order_item"
            name="order_item"
            value={formData.order_item}
            onChange={handleInputChange}
            placeholder="e.g., Turkey sandwich with mayo, no onions"
            required
            label="What would you like to order?"
            rows={3}
          />

          <Textarea
            id="dietary_notes"
            name="dietary_notes"
            value={formData.dietary_notes}
            onChange={handleInputChange}
            placeholder="Allergies, special requests, etc."
            label="Dietary Notes (Optional)"
            rows={2}
          />

          <Input
            id="order_date"
            name="order_date"
            type="date"
            value={formData.order_date}
            onChange={handleInputChange}
            required
            label="Order Date"
          />

          {message && (
            <div className={`p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Your order will be collected and volunteers will handle restaurant coordination.
          </p>
        </div>
      </div>
    </div>
  )
}