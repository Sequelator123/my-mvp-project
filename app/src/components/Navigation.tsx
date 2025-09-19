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
      <div className="md-navigation-tabs max-w-md w-full">
        <Button
          variant="tab"
          isActive={viewMode === 'form'}
          onClick={() => setViewMode('form')}
        >
          <span style={{ fontSize: '18px', marginRight: '8px' }}>📝</span>
          <span className="md-typography-title-small">Submit Order</span>
        </Button>
        <Button
          variant="tab"
          isActive={viewMode === 'dashboard'}
          onClick={() => setViewMode('dashboard')}
        >
          <span style={{ fontSize: '18px', marginRight: '8px' }}>📊</span>
          <span className="md-typography-title-small">View Dashboard</span>
        </Button>
      </div>
    </div>
  )
}