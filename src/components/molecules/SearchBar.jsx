import React from 'react'
import Input from '../atoms/Input'

const SearchBar = ({className}) => {
  return (
    <Input
        className={`bg-gray-50 border-1 border-gray-200 ${className}`}
        placeholder='Search kontak'
    />
  )
}

export default SearchBar