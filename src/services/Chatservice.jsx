import FetchClient from "../api/FetchClient"

export const getAllGroupsAPI = () => 
    FetchClient("/api/groups/", {
        method : "GET"
    })


export const joinGroupRoomAPI = (roomId) => 
    FetchClient(`/api/join-group-room/${roomId}`, {
        method : "POST"
    })

export const joinPrivRoomAPI = (sendToId) => 
    FetchClient(`/api/join-priv-room/${sendToId}`, {
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

export const addGroupRoomAPI = (dataGroup) => 
    FetchClient("/api/group-room", {
        method : "POST",
        body : JSON.stringify(dataGroup)
    })

export const getGroupAPI = roomId => 
    FetchClient(`/api/group/${roomId}`, {
        method : "GET"
    })
