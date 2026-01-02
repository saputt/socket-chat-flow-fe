import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import Navbar from '../components/organism/Navbar'
import { useChatStore } from '../store/useChatStore'
import useAuthStore from '../store/useAuthStore'

const PrivChatPage = () => {
  const {id} = useParams()

  const [content, setContent] = useState()

  const messages = useChatStore(state => state.currentMessages)
  const roomDetail = useChatStore(state => state.detailRoom)
  const user = useAuthStore(state => state.user)
  const {sendPrivMessage, fetchPrivMessage} = useChatStore.getState()

  const isGroup = useChatStore(state => state.isGroup)
  const privDetail = useChatStore(state => state.privDetail)

  const handleSendMessage = (e) => {
    e.preventDefault()
    setContent("")
    sendPrivMessage(id, {content})
  }

  useEffect(() => {
    fetchPrivMessage(id)
  },[])

  const scrollRef = useRef(null)
  
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({behavior : "smooth"})
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className='mt-10'>
        <div className='m-auto w-200 bg-white rounded-sm shadow-md overflow-hidden'>
          <form onSubmit={handleSendMessage}>
            {/* detail room */}
            <div className='flex bg-gray-200 px-5 py-3 gap-3'>
              {/* image room */}
              <div className='w-7 bg-white aspect-square rounded-full'></div>
              {/* detail room info */}
              <div>
                <p>{privDetail?.name || "test"}</p>
              </div>
            </div>

            {/* chat area */}
            <div className='h-150 bg-gray-50 overflow-y-auto flex flex-col gap-5 py-7'>
              {messages?.map(message => (
                message.senderId === user.id ? (
                  <div className='flex justify-end' key={message.id}>
                    <div className='px-5 flex flex-col gap-2'>
                      <p className='bg-white shadow-md py-1 rounded-xl w-fit px-5'>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='flex' key={message.id}>
                    <div className='px-5 flex flex-col gap-2'>
                      {isGroup && (
                        <p className='text-xs'>
                          {message?.sender?.name}
                        </p>
                      )}
                      <p className='bg-white shadow-md py-1 rounded-xl w-fit px-5'>
                        {message.content}
                      </p>
                    </div>
                  </div>
                )
              ))}
              <div ref={scrollRef}></div>
            </div>

            {/* input area */}
            <div className='w-full bg-gray-200 flex py-1 px-3 gap-2'>
              <Input
                className='flex-1'
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <Button>Send</Button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default PrivChatPage