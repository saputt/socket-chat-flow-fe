import { useGetGroupMessage, useSendGroupMessage } from '../../../hooks/useChatQueries'
import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import BubleChatCard from '../../molecules/BubleChatCard'
import useAuthStore from '../../../store/useAuthStore'
import { useEffect, useRef, useState } from 'react'

const GroupChat = ({roomId}) => {
  const [content, setContent] = useState('')

  const {
    data,
    isLoading,
    isError : getChatError,
    refetch
  } = useGetGroupMessage(roomId)

  const user = useAuthStore(state => state.user)

  const { mutate, isError : sendChatError, error } = useSendGroupMessage()

  const sendMessage = (e) => {
    e.preventDefault()
    mutate({roomId, content})
    setContent("")
  }

  const scrollRef = useRef(null)

  const scrollToBottom = () => {
    scrollRef?.current?.scrollIntoView({behavior : "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  },[data])
  return (
    <form onSubmit={sendMessage}>
        {/* detail room */}
        <div className='flex bg-gray-200 px-5 py-3 gap-3'>
            {/* image room */}
            <div className='w-7 bg-white aspect-square rounded-full'></div>
            {/* detail room info */}
            <div>
            <p>{data?.name}</p>
            </div>
        </div>

        {/* chat area */}
        <div className='h-150 bg-gray-50 overflow-y-auto flex flex-col gap-5 py-7 px-5'>
          {data?.message?.map(message => (
            message?.senderId === user?.id ? (
              <BubleChatCard
                senderName="Anda"
                className='flex justify-end'
                content={message?.content}
              />
            ) : (
              <BubleChatCard
                senderName={message?.sender?.name}
                className=''
                content={message?.content}
              />
            )
          ))}
          <div ref={scrollRef}/>
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
  )
}

export default GroupChat