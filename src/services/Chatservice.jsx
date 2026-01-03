import FetchClient from "../api/FetchClient"

export const getGroupsAPI = async () => {
    const groups = await FetchClient("/api/groups/", {
        method : "GET"
    })
    return groups.data
}

export const joinGroupRoomAPI = roomId => 
    FetchClient(`/api/join-group-room/${roomId}`, {
        method : "POST"
    })

export const joinPrivRoomAPI = sendToId => 
    FetchClient(`/api/join-priv-room/${sendToId}`, {
        method : "POST"
    })


export const sendPrivMessageAPI = ({roomId, content}) => 
    FetchClient(`/api/priv-message/${roomId}`, {
        method : "POST",
        body : JSON.stringify({content})
    })

export const sendGroupMessageAPI = ({roomId, content}) => 
    FetchClient(`/api/group-message/${roomId}`, {
        method : "POST",
        body : JSON.stringify({content})
    })

export const getAllPrivMessageAPI = async roomId => {
    const privMessages = await FetchClient(`/api/priv-messages/${roomId}`, {
        method : "GET"
    })
    return privMessages.data
}

export const getAllGroupMessageAPI = async roomId => {
    const groupMessages = await FetchClient(`/api/group-messages/${roomId}`, {
        method : "GET"
    })
    return groupMessages.data
}

export const addGroupRoomAPI = nameGroup => 
    FetchClient("/api/group-room", {
        method : "POST",
        body : JSON.stringify(nameGroup)
    })

export const getGroupAPI = roomId => 
    FetchClient(`/api/group/${roomId}`, {
        method : "GET"
    })

export const getPrivRoomIdAPI = async sendToId => {
    const privRoomId = await FetchClient(`/api/priv-room-id/${sendToId}`, {
        method : "GET"
    })
    return privRoomId.data
}