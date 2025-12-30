import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AuthLayout = ({children, name}) => {
  return (
    <div className='bg-gray-50/60 h-screen flex justify-center items-center'>
        <div className='bg-white px-8 py-5 w-100 flex flex-col gap-10 shadow-md rounded-2xl'>
            <h2 className='text-3xl font-semibold'>{name}</h2>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout