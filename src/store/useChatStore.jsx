import { create } from "zustand";
import { getAllGroupsAPI, getAllMessageByRoomAPI, getGroupAPI, joinGroupRoomAPI, joinPrivRoomAPI, sendMessageAPI } from "../services/Chatservice";
import { initSocket, socket } from "../socket/socketManager";
import { getUserAPI } from "../services/UserService";
import useAuthStore from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    groups : [],
    loading : false,
    currentRoom : null,
    detailRoom : null,
    currentMessages : [],
    notifMessages : [],
    isGroup : false,

    fetchGroups : async () => {
        set({loading : true})
        try {
            const results = await getAllGroupsAPI()
            const finalData = results?.data || results || []
            set({groups : finalData})
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    addGroup : (data) => {
        set(state => {
            const isExist = state.groups.some(g => g.roomId === data.roomId);
            if (!isExist) {
                return { groups: [...state.groups, data] };
            }
            return state;
        })
    },

    deleteGroup : (id) => {
        set(state => {
            const groupExist = state.groups.some(g => g.roomId === id)
            if(groupExist){
                const filterGroup = state.groups.filter(g => g.roomId !== id)
                return { groups : filterGroup }
            }
        })
    },

    updateGroup : (data) => {
        set(state => ({
            groups : state.groups.map(group => {
                if(group.roomId === data.roomId){
                    return {...group, ...data}
                }
                return group
            })
        }))
    },

    joinGroupRoom : async (roomId, navigate) => {
        set({loading : true, currentMessages : [], notifMessages : []})
        try {
            await joinGroupRoomAPI(roomId)
            navigate(`/chat/${roomId}`)
            const results = await getAllMessageByRoomAPI(roomId)
            const groupDetail = await getGroupAPI(roomId)
            set({isGroup : true})
            set({detailRoom : groupDetail?.data})
            set({currentMessages : results?.data?.message})
            const s = socket || initSocket()

            if(s){
                s.emit("join_room", roomId)
            }else{
                console.log("error")
            }

            set({currentRoom : roomId})
        } catch (error) {
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    joinPrivRoom : async (sendToId, navigate) => {
        set({loading : true, currentMessages : [], notifMessages : [], isGroup : false})
        try {
            const privRoom = await joinPrivRoomAPI(sendToId)
            const results = await getAllMessageByRoomAPI(privRoom?.data?.roomId)
            const sendToDetail = await getUserAPI(sendToId)
            set({detailRoom : sendToDetail?.data})
            set({currentMessages : results?.data?.message})
            const s = socket || initSocket()
            if(s){
                s.emit("join_room", privRoom?.data?.roomId)
            }else{
                console.log("error")
            }

            set({currentRoom : privRoom?.data?.roomId})
            navigate(`/chat/${privRoom?.data?.roomId}`)
        } catch (error) {
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    fetchMessageByRoom : async (roomId) => {
        set({loading : true})
        try {
            const results = await getAllMessageByRoomAPI(roomId)
            set({currentMessages : results?.data?.message})
        } catch (error) {
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    fetchPrivMessageByRoom : async (sendToId) => {
        set({loading : true})
        try {
            const privRoom = await joinPrivRoomAPI(sendToId)
            const results = await getAllMessageByRoomAPI(privRoom?.data?.roomId)
            set({currentMessages : results?.data?.message})
        } catch (error) {
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    sendMessageGroup : async (roomId, data) => {
        set({loading : true})
        try {
            await sendMessageAPI(roomId, data)
        } catch (error) {
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    addMessage : (data) => {
        set(state => {
            console.log(data)
            let isFromMe = null;
            const messageExist = state.currentMessages.some(m => m.id === data.id)
            if(data.senderId === useAuthStore.getState().user?.id) {
                isFromMe = true
            }
            if(!messageExist){
                return {
                    currentMessages : [...state.currentMessages, data],
                    notifMessages : [!isFromMe && data]
                }
            }
            return state
        })
    },

    resetNotifMessages : () => {
        set({notifMessages : []})
    },
    
    removeOneNotif : () => {
        set(state => ({
            notifMessages : state.notifMessages.slice(1)
        }))
    }
}))
