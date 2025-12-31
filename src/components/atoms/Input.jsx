import React from 'react'

const Input = ({className, type="text", onChange, children, placeholder, value}) => {
  return (
    <input
        className={`bg-white shadow-md focus:outline-1 px-5 py-2 rounded-xl flex ${className}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
    >
        {children}
    </input>
  )
}

export default Input