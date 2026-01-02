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


export const sendPrivMessageAPI = (roomId, data) => 
    FetchClient(`/api/priv-message/${roomId}`, {
        method : "POST",
        body : JSON.stringify(data)
    })

export const sendGroupMessageAPI = (roomId, data) => 
    FetchClient(`/api/group-message/${roomId}`, {
        method : "POST",
        body : JSON.stringify(data)
    })

export const getAllPrivMessageAPI = (roomId) => 
    FetchClient(`/api/priv-messages/${roomId}`, {
        method : "GET"
    })

export const getAllGroupMessageAPI = (roomId) => 
    FetchClient(`/api/group-messages/${roomId}`, {
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

export const getPrivRoomIdAPI = sendToId => 
    FetchClient(`/api/priv-room-id/${sendToId}`, {
        method : "GET"
    })
