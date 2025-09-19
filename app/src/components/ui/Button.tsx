import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'tab'
  disabled?: boolean
  className?: string
  isActive?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  isActive = false
}) => {
  const baseClasses = 'font-medium transition-colors rounded-md'

  const variantClasses = {
    primary: `py-3 px-4 ${
      disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
    } text-white`,
    secondary: `py-2 px-4 ${
      disabled
        ? 'bg-gray-400 cursor-not-allowed text-gray-600'
        : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
    }`,
    tab: `px-4 py-2 ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:text-gray-800'
    }`
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  )
}