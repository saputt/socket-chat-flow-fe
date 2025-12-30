import React from 'react'
import Input from '../atoms/Input'

const FormField = ({label, placeholder, onChange, type}) => {
  return (
    <div className='flex flex-col gap-2'>
        <label>
            {label}
        </label>
        <Input 
           placeholder={placeholder}
           onChange={onChange} 
           type={type}
           className="w-full"
        />
    </div>
  )
}

export default FormField