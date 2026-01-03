import React from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

const SearchBar = ({className, placeholder, btnName, onSubmit, onChange, value}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='flex gap-2'>
          <Input
              className={`bg-gray-50 border-1 border-gray-200 ${className}`}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
          />
          <Button>{btnName}</Button>
      </div>
    </form>
  )
}

export default SearchBar