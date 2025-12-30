import React, { use, useEffect, useState } from 'react'
import Navbar from '../components/organism/Navbar'
import { useChatStore } from '../store/useChatStore'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const groups = useChatStore(state => state.groups)
    const fetchGroups = useChatStore(state => state.fetchGroups)
    const { joinRoom, fetchMessageByRoom } = useChatStore.getState()
    const navigate = useNavigate()

    useEffect(() => {
      fetchGroups()
    }, [fetchGroups])

    const handleJoinGroup = async (roomId) => {
      fetchMessageByRoom(roomId)
      joinRoom(roomId, navigate)
    }

  return (
    <div>
        <Navbar/>
        {/* <ContactList/> */}
        <div className='flex flex-col gap-5'>
          {Array.isArray(groups) ? groups?.map((group) => (
            <div 
              key={group?.roomId} 
              className='cursor-pointer bg-amber-100 px-10 py-2 w-fit'
              onClick={() => handleJoinGroup(group?.roomId)}
            >
              {group?.name}
            </div>
          )) : <p>tunggu</p>}
        </div>
    </div>
  )
}

export default LandingPage