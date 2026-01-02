import { io } from "socket.io-client"
import useUsersStore from "../store/useUsersStore"
import { useChatStore } from "../store/useChatStore"
import useAuthStore from "../store/useAuthStore"

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
            useChatStore.getState().addGroup(data)
        })
    
        socket.on("delete_room", (roomId) => {
            useChatStore.getState().deleteGroup(roomId)
        })
    
        socket.on("update_group", (data) => {
            useChatStore.getState().updateGroup(data)
        })

        socket.on("send_message", (data) => {
            useChatStore.getState().addMessage(data)
        })
    }

    return socket
}