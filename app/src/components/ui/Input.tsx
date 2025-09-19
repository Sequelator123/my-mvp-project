import React from 'react'

interface InputProps {
  id: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  label: string
  className?: string
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  label,
  className = ''
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}