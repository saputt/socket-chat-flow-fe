import React from 'react'

const Button = ({children, className, onClick}) => {
  return (
    <button className={`bg-green-700 text-white font-semibold px-10 py-2 rounded-2xl cursor-pointer ${className}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button