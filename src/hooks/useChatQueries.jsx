import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addGroupRoomAPI, getAllGroupMessageAPI, getAllPrivMessageAPI, getGroupsAPI, joinGroupRoomAPI, joinPrivRoomAPI, sendGroupMessageAPI, sendPrivMessageAPI } from "../services/Chatservice";
import { getAllUsersAPI } from "../services/UserService";
import { socket } from "../socket/socketManager";

// QUERY
export const useGetGroups = () => useQuery({
    queryKey : ["groups"],
    queryFn : getGroupsAPI
})

export const useGetContacts = () => useQuery({
    queryKey : ["contacts"],
    queryFn : getAllUsersAPI
})

export const useGetPrivMessage = roomId => useQuery({
    queryKey : ["priv-messages", roomId],
    queryFn : getAllPrivMessageAPI
})

export const useGetGroupMessage = roomId => useQuery({
    queryKey : ["group-messages", roomId],
    queryFn : () => getAllGroupMessageAPI(roomId),
    enabled : !!roomId
})

// MUTATION
export const useCreateGroup = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (nameGroup) => addGroupRoomAPI(nameGroup),
        onSuccess : () => queryClient.invalidateQueries({ queryKey : ["groups"] })
    })
}

export const useSendPrivMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({roomId, content}) => sendPrivMessageAPI({roomId, content}),
        onSuccess : (data, variables) => queryClient.invalidateQueries({ queryKey : ["priv-messages", variables.roomId] })
    })
}

export const useSendGroupMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({roomId, content}) => sendGroupMessageAPI({roomId, content}),
        onSuccess : (data, variables) => {
            queryClient.invalidateQueries({ queryKey : ["group-messages", variables.roomId] })
            
            if(socket){
                socket.emit("send_")
            }
        }
    })
}

export const useJoinGroup = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (roomId) => joinGroupRoomAPI(roomId),
        onSuccess : (data, roomId) => queryClient.invalidateQueries({ queryKey : ["join-group", roomId] })
    })
}

export const useJoinPriv = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (roomId) => joinPrivRoomAPI(roomId),
        onSuccess : (data, roomId) => queryClient.invalidateQueries({ queryKey : ["join-priv", roomId] })
    })
}


