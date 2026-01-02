import React, { use, useEffect, useRef, useState } from 'react'
import Navbar from '../components/organism/Navbar'
import { useChatStore } from '../store/useChatStore'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { addGroupRoomAPI } from '../services/Chatservice'
import useUsersStore from '../store/useUsersStore'
import useAuthStore from '../store/useAuthStore'

const LandingPage = () => {
    const groups = useChatStore(state => state.groups)
    const fetchGroups = useChatStore(state => state.fetchGroups)
    const { joinGroupRoom, joinPrivRoom, fetchGroupMessage, fetchPrivMessage } = useChatStore.getState()
    const [groupName, setGroupName] = useState()
    const removeOneNotif = useChatStore(state => state.removeOneNotif)

    const myUser = useAuthStore(state => state.user)

    const users = useUsersStore(state => state.users)

    const {fetchUsers} = useUsersStore.getState()

    const notifMessages = useChatStore(state => state.notifMessages)

    const navigate = useNavigate()

    console.log(users)

    useEffect(() => {
      fetchGroups()
      fetchUsers()
    }, [])

    useEffect(() => {
      if(notifMessages.length > 0){
        const timer = setTimeout(() => {
          removeOneNotif()
        }, 2000)

        return () => clearTimeout(timer)
      }
    },[notifMessages])

    const handleJoinGroup = async (roomId) => {
      joinGroupRoom(roomId, navigate)
    }

    const handleAddGroup = async (e) => {
      e.preventDefault()
      const s = await addGroupRoomAPI({
        name : groupName
      })
      console.log(s)
    }

    const handleJoinPriv = async (sendToId) => {
      joinPrivRoom(sendToId, navigate)
    }

  return (
    <div className='flex lg:px-30 md:px-20 px-15 py-5'>
      <div className='flex-1 flex flex-col gap-5'>
        {/* <ContactList/> */}
        <form onSubmit={handleAddGroup} className='flex gap-2'>
          <Input
            placeholder={'Enter name group'}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button>Create</Button>
        </form>
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
        {Array.isArray(notifMessages) && notifMessages.length > 0 && (
          notifMessages[0] !== false && (
            <div 
              className={`
                absolute right-10 bottom-10 px-10 py-3 bg-amber-50 shadow-md
              `}
            >
              {notifMessages[0]?.content}
            </div>
          )
        )}
      </div>
      <div className='flex-1 flex flex-col gap-5'>
        {users?.map(user => (
          user?.id !== myUser?.id && (
            <div 
              className='bg-white shadow-sm rounded-md px-10 py-5 flex gap-5 items-center cursor-pointer'
              onClick={() => handleJoinPriv(user?.id)}
            >
              <div className='w-10 bg-gray-500 aspect-square rounded-full'/>
              {user?.name}
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default LandingPage