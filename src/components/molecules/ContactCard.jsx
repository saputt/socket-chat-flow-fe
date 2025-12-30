import React from 'react'
import Card from '../atoms/Card'

const ContactCard = ({name}) => {
  return (
    <Card
        className='flex gap-5 px-10 py-2 shadow-md w-fit cursor-pointer'
    >
        <div className='bg-amber-200 rounded-full w-20 aspect-square'/>
        <p>
            {name}
        </p>
    </Card>
  )
}

export default ContactCard