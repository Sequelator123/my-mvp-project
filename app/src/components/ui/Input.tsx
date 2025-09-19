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
  const hasValue = value && value.length > 0

  return (
    <div className={className}>
      <div className={`md-text-field ${hasValue ? 'has-value' : ''}`}>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          required={required}
        />
        <label htmlFor={id}>
          {label} {required && '*'}
        </label>
      </div>
    </div>
  )
}