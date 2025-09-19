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
  const hasValue = value && value.length > 0

  return (
    <div className={className}>
      <div className={`md-text-field ${hasValue ? 'has-value' : ''}`}>
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          required={required}
          rows={rows}
        />
        <label htmlFor={id}>
          {label} {required && '*'}
        </label>
      </div>
    </div>
  )
}