import { useNavigate } from "react-router-dom"
import { useCreateGroup, useGetGroups, useJoinGroup } from "../../hooks/useChatQueries"
import SearchBar from "../molecules/SearchBar"
import { useState } from "react"
import ChatCard from "../molecules/ChatCard"

const GroupList = (roomId) => {
    const [groupName, setGroupName] = useState()
    const navigate = useNavigate()

    const {
        data : groups,
        isLoading,
        isError,
        refetch
    } = useGetGroups()

    const { mutate: createGroup, isError : createGroupError} = useCreateGroup()
    const { mutate: joinGroup, isError : joinGroupError} = useJoinGroup()

    const handleCreateGroup = (e) => {
        e.preventDefault()

        createGroup({name : groupName})
    }

    const handleJoinGroup = roomId => {
        joinGroup(roomId, {
            onSuccess : () => {
                navigate(`/group/${roomId}`)
            }
        })
    }

  return (
    <div className='flex flex-col gap-5'>
        <SearchBar
            btnName='Create'
            placeholder="Enter group name"
            onChange={(e) => setGroupName(e.target.value)}
            onSubmit={handleCreateGroup}
            value={groupName}
        />

        <div className='flex flex-col gap-3'>
            {createGroupError && (
                <p>{error?.message}</p>
            )}
            {groups?.map(group => (
                <ChatCard
                    chatName={group?.name}
                    onClick={() => handleJoinGroup(group.roomId)}
                />
            ))}
        </div>
    </div>
  )
}

export default GroupList