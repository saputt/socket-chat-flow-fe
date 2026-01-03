import React from 'react'
import { useGetContacts, useJoinPriv } from '../../hooks/useChatQueries'
import ChatCard from '../molecules/ChatCard'
import useAuthStore from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const ContactList = () => {
    const { data:contacts, error, isError } = useGetContacts()
    const { mutate:joinPriv, isError:isJoinPricError } = useJoinPriv()

    const user = useAuthStore(state => state.user)

    const navigate = useNavigate()

    console.log(contacts)

    const handleJoinPriv = (sendToId) => {
        joinPriv(sendToId, {
            onSuccess: () => {
                const roomId = [user.id, sendToId].sort().join("_")
                navigate(`/chat/${roomId}`)
            }
        })
    }
  return (
    <div>
        <div>
            {contacts?.data?.map(contact => (
                contact?.id !== user?.id && (
                    <ChatCard
                        chatName={contact?.name}
                        onClick={() => handleJoinPriv(contact?.id)}
                    />
                )
            ))}
        </div>
    </div>
  )
}

export default ContactList