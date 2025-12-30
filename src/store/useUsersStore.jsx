import { create } from "zustand";
import { getAllUsersAPI } from "../services/UserService";

const useUsersStore = create((set, get) => ({
    users : [],
    loading : false,

    fetchUsers : async () => {
        set({loading : true})
        try {
            const results = await getAllUsersAPI()
            set({users : results?.data})
        } catch (error) {
            throw new Error(error.message)
        } finally {
            set({loading : false})
        }
    },

    setUsers : (data) => {
        const currentUsers = get().users

        const userExist = currentUsers.find(u => u.id === data?.id)

        if(!userExist){
            set({users : [...currentUsers, data]})
        }

    }
}))

export default useUsersStore