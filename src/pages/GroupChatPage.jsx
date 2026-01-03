import React from 'react'
import { useParams } from 'react-router-dom'
import GroupChat from '../components/organism/chat/GroupChat'
import ChatLayout from '../components/templates/ChatLayout'

const GroupChatPage = () => {
  const {id} = useParams()

  
  return (
    <ChatLayout>
      <GroupChat
        roomId={id}
      />
    </ChatLayout>
  )
}

export default GroupChatPage