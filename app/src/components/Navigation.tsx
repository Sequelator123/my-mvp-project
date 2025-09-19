import React from 'react'
import { Button } from './ui/Button'
import type { ViewMode } from '../types/index'

interface NavigationProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export const Navigation: React.FC<NavigationProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="bg-white rounded-lg shadow-sm p-1 flex">
        <Button
          variant="tab"
          isActive={viewMode === 'form'}
          onClick={() => setViewMode('form')}
        >
          📝 Submit Order
        </Button>
        <Button
          variant="tab"
          isActive={viewMode === 'dashboard'}
          onClick={() => setViewMode('dashboard')}
        >
          📊 View Dashboard
        </Button>
      </div>
    </div>
  )
}