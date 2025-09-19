import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'filled' | 'outlined' | 'text' | 'tab'
  disabled?: boolean
  className?: string
  isActive?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'filled',
  disabled = false,
  className = '',
  isActive = false
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'md-motion-emphasized'

    switch (variant) {
      case 'filled':
        return `${baseClasses} md-button-filled`
      case 'outlined':
        return `${baseClasses} md-button-outlined`
      case 'text':
        return `${baseClasses} md-button-text`
      case 'tab':
        return `${baseClasses} md-navigation-tab ${isActive ? 'active' : ''}`
      default:
        return `${baseClasses} md-button-filled`
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClasses()} ${className}`}
    >
      {children}
    </button>
  )
}