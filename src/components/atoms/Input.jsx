import React from 'react'

const Input = ({className, type="text", onChange, children, placeholder}) => {
  return (
    <input
        className={`bg-gray-50 focus:outline-1 px-5 py-2 rounded-xl flex ${className}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
    >
        {children}
    </input>
  )
}

export default Input