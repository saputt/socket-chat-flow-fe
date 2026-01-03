import { create } from "zustand";
import { getAllGroupMessageAPI, getAllPrivMessageAPI, getGroupAPI, joinGroupRoomAPI, joinPrivRoomAPI } from "../services/Chatservice";
import { initSocket, socket } from "../socket/socketManager";
import { getUserAPI } from "../services/UserService";
import useAuthStore from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    currentRoom : null,
    groupDetail : null,
    privDetail : null,
    currentMessages : [],
    notifMessages : [],
    groups : [],

    addGroup : (data) => {
        set(state => {
            const isExist = state?.groups?.some(g => g.roomId === data.roomId);
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
            const a = await joinGroupRoomAPI(roomId)
            navigate(`/group/${roomId}`)
            const results = await getAllGroupMessageAPI(roomId)
            const groupDetail = await getGroupAPI(roomId)
            console.log(groupDetail)
            set({isGroup : true})
            set({groupDetail: groupDetail?.data})
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
        set({loading : true, currentMessages : [], notifMessages : []})
        try {
            const privRoom = await joinPrivRoomAPI(sendToId)
            navigate(`/chat/${privRoom?.data?.roomId}`)
            const results = await getAllPrivMessageAPI(privRoom?.data?.roomId)
            const sendToDetail = await getUserAPI(sendToId)
            console.log(sendToDetail)
            set({privDetail: sendToDetail?.data})
            set({currentMessages : results?.data?.message})
            const s = socket || initSocket()
            if(s){
                s.emit("join_room", privRoom?.data?.roomId)
            }else{
                console.log("error")
            }

            set({currentRoom : privRoom?.data?.roomId})
        } catch (error) {
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    addMessage : (data) => {
        set(state => {
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
