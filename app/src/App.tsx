import { useState } from 'react'
import PocketBase from 'pocketbase'

interface LunchOrder {
  employee_name: string
  order_item: string
  dietary_notes: string
  order_date: string
  status: string
}

function App() {
  const pb = new PocketBase('http://127.0.0.1:8090')

  const [formData, setFormData] = useState<LunchOrder>({
    employee_name: '',
    order_item: '',
    dietary_notes: '',
    order_date: new Date().toISOString().split('T')[0],
    status: 'pending'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setMessage({type: 'error', text: validationError})
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      await pb.collection('lunch_orders').create(formData)
      setMessage({type: 'success', text: 'Order submitted successfully!'})

      // Reset form
      setFormData({
        employee_name: '',
        order_item: '',
        dietary_notes: '',
        order_date: new Date().toISOString().split('T')[0],
        status: 'pending'
      })
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            🍽️ Lunch Order Form
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Submit your lunch order for today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="employee_name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="employee_name"
                name="employee_name"
                value={formData.employee_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="order_item" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to order? *
              </label>
              <textarea
                id="order_item"
                name="order_item"
                value={formData.order_item}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Turkey sandwich with mayo, no onions"
                required
              />
            </div>

            <div>
              <label htmlFor="dietary_notes" className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Notes (Optional)
              </label>
              <textarea
                id="dietary_notes"
                name="dietary_notes"
                value={formData.dietary_notes}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Allergies, special requests, etc."
              />
            </div>

            <div>
              <label htmlFor="order_date" className="block text-sm font-medium text-gray-700 mb-2">
                Order Date *
              </label>
              <input
                type="date"
                id="order_date"
                name="order_date"
                value={formData.order_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {message && (
              <div className={`p-4 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
              } text-white`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Your order will be collected and volunteers will handle restaurant coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
