import React from 'react'

interface TextareaProps {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  label: string
  rows?: number
  className?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  label,
  rows = 3,
  className = ''
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}