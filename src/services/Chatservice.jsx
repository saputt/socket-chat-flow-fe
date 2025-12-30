import FetchClient from "../api/FetchClient"

export const getAllGroupsAPI = () => 
    FetchClient("/api/groups/", {
        method : "GET"
    })


export const joinRoomAPI = (roomId) => 
    FetchClient(`/api/join-group-room/${roomId}`, {
        method : "POST"
    })


export const sendMessageAPI = (roomId, data) => 
    FetchClient(`/api/message/${roomId}`, {
        method : "POST",
        body : JSON.stringify(data)
    })

export const getAllMessageByRoomAPI = (roomId) => 
    FetchClient(`/api/messages/${roomId}`, {
        method : "GET"
    })
