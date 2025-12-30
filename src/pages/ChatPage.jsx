import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import Navbar from '../components/organism/Navbar'
import { useChatStore } from '../store/useChatStore'

const ChatPage = () => {
  const {id} = useParams()

  const [content, setContent] = useState()

  const messages = useChatStore(state => state.currentMessages)
  const {sendMessageGroup, currentRoom, fetchMessageByRoom} = useChatStore.getState()

  const handleSendMessage = (e) => {
    e.preventDefault()
    sendMessageGroup(id, {content})
  }

  console.log(messages)

  console.log(messages)
  return (
    <div className='h-screen flex flex-col'>
      <Navbar/>
      <form onSubmit={handleSendMessage}>
        <div className='m-auto w-200'>
          {/* detail room */}
          <div className='flex bg-amber-100'>
            {/* image room */}
            <div></div>
            {/* detail room info */}
            <div>
              <p>hai</p>
            </div>
          </div>

          {/* chat area */}
          <div className='h-150 bg-gray-50 overflow-y-auto'>

          </div>

          {/* input area */}
          <div className='w-full bg-amber-200 flex py-1 px-3 gap-2'>
            <Input
              className='flex-1'
            />
            <Button>Send</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatPage