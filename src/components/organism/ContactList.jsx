import { useEffect } from 'react'
import useUsersStore from '../../store/useUsersStore'
import ContactCard from '../molecules/ContactCard'

const ContactList = () => {
    const users = useUsersStore(state => state.users)
    const fetchUsers = useUsersStore(state => state.fetchUsers)

    useEffect(() => {   
        fetchUsers()
    }, [fetchUsers])

  return (
    <div>
        {users.map((user) => (                
            <ContactCard
                name={user.name}
            />
        ))}
    </div>
  )
}

export default ContactList