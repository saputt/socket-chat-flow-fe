import { create } from "zustand";
import { getAllGroupsAPI, getAllMessageByRoomAPI, joinRoomAPI, sendMessageAPI } from "../services/Chatservice";
import { initSocket, socket } from "../socket/socketManager";

export const useChatStore = create((set, get) => ({
    groups : [],
    loading : false,
    currentRoom : null,
    currentMessages : [],

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

    joinRoom : async (roomId, navigate) => {
        set({loading : true, currentMessages : []})
        try {
            await joinRoomAPI(roomId)
            const results = await getAllMessageByRoomAPI(roomId)
            set({currentMessages : results?.data?.message})
            const s = socket || initSocket()

            if(s){
                s.emit("join_room", roomId)
            }else{
                console.log("error")
            }

            set({currentRoom : roomId})
            navigate(`/chat/${roomId}`)
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
            console.log("hasil result, ", results)
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
            const messageExist = state.currentMessages.some(m => m.id === data.id)
            if(!messageExist){
                return {currentMessages : [...state.currentMessages, data]}
            }
            return state
        })
    }
}))
