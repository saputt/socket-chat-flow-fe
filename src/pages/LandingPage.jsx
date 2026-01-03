import React from 'react'
import GroupList from '../components/organism/GroupList'
import ContactList from '../components/organism/ContactList'

const LandingPage = () => {
  return (
    <div className='grid grid-cols-2 px-20 py-10'>
      <GroupList/>
      <ContactList/>
    </div>
  )
}

export default LandingPage