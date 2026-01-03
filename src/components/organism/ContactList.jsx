import React from 'react'
import { useGetContacts } from '../../hooks/useChatQueries'
import ChatCard from '../molecules/ChatCard'
import useAuthStore from '../../store/useAuthStore'

const ContactList = () => {
    const {data:contacts, error, isError} = useGetContacts()

    const user = useAuthStore(state => state.user)

    console.log(contacts)
  return (
    <div>
        <div>
            {contacts?.data?.map(contact => (
                contact?.id !== user?.id && (
                    <ChatCard
                        chatName={contact?.name}
                    />
                )
            ))}
        </div>
    </div>
  )
}

export default ContactList