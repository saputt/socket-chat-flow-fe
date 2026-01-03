import { io } from "socket.io-client"
import useUsersStore from "../store/useUsersStore"
import { useChatStore } from "../store/useChatStore"
import useAuthStore from "../store/useAuthStore"
import { queryClient } from "../main"

export let socket

export const initSocket = () => {
    const { user } = useAuthStore.getState()

    if(!user?.id) return console.log("User belum ada")

    if(!socket){
        socket = io("http://localhost:5000", {
            auth : {
                userId : user.id
            }
        })
        
        socket.emit("join_room", user.id)

        socket.on("new_user", (data) => {
            useUsersStore.getState().setUsers(data)
        })
    
        socket.on("new_group", (data) => {
            queryClient.invalidateQueries({queryKey : ["groups"]})
        })
    
        socket.on("delete_room", (roomId) => {
            queryClient.invalidateQueries({queryKey : ["groups"]})
        })
    
        socket.on("update_group", (data) => {
            queryClient.invalidateQueries({queryKey : ["groups"]})
        })

        socket.on("send_message", (data) => {
            queryClient.setQueryData(["group-messages", data?.roomId], (oldData) => {
                if(!oldData) return oldData

                return {
                    ...oldData,
                    message: [...oldData.message, data]
                }
            })
        })
    }

    return socket
}