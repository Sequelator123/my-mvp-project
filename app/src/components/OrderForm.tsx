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
      <div className="md-card-elevated p-8">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full"
            style={{
              backgroundColor: 'var(--md-primary-container)',
              fontSize: '32px'
            }}
          >
            🍽️
          </div>
          <h1 className="md-typography-headline-medium mb-2" style={{ color: 'var(--md-on-surface)' }}>
            Lunch Order Form
          </h1>
          <p className="md-typography-body-large" style={{ color: 'var(--md-on-surface-variant)' }}>
            Submit your lunch order for coordinated delivery
          </p>
        </div>

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
            <div className={message.type === 'success' ? 'md-snackbar' : 'md-snackbar error'}>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: message.type === 'success'
                      ? 'var(--md-primary)'
                      : 'var(--md-error)'
                  }}
                ></div>
                <span className="md-typography-body-medium">{message.text}</span>
              </div>
            </div>
          )}

          <div className="pt-8 mt-4 flex justify-center">
            <Button
              type="submit"
              variant="filled"
              disabled={isSubmitting}
              className="max-w-[180px] w-full my-4"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"
                  ></div>
                  <span>Submitting Order...</span>
                </div>
              ) : (
                'Submit Order'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--md-outline-variant)' }}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-center">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: 'var(--md-primary)' }}
              ></div>
              <p className="md-typography-body-small" style={{ color: 'var(--md-on-surface-variant)' }}>
                Orders are collected daily and volunteers coordinate restaurant delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}