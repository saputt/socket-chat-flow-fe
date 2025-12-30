import React from 'react'

const Select = ({children, className}) => {
  return (
    <select className={className}>
        {children}
    </select>
  )
}

export default Select