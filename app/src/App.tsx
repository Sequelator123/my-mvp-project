import { useState } from 'react'
import PocketBase from 'pocketbase'

function App() {
  const [count, setCount] = useState(0)

  // Initialize PocketBase client (replace with your actual PocketBase URL)
  const pb = new PocketBase('http://127.0.0.1:8090')

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            🍽️ Lunch Order App
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                Setup Complete! ✅
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Vite + React + TypeScript</li>
                <li>✅ Tailwind CSS configured</li>
                <li>✅ PocketBase client installed</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Test Counter
              </h2>
              <button
                onClick={() => setCount((count) => count + 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Count is {count}
              </button>
              <p className="mt-4 text-sm text-gray-600">
                Click to test React functionality
              </p>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">
              Next Steps:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Update PocketBase URL in App.tsx when you have your instance running</li>
              <li>Start building your lunch order components</li>
              <li>Configure your PocketBase collections for orders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
