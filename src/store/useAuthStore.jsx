import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user : null,
            accessToken : null,
            isAuthorized : false,

            setLogin: (userData, token) => {
                set({
                    user : userData,
                    accessToken : token,
                    isAuthorized : true
                })
            },

            setLogout: () => {
                set({
                    user : null,
                    accessToken : null,
                    isAuthorized : false
                })
            },

            setAccessToken : (token) => {
                set({
                    accessToken : token
                })
            }
        }),
        {
            name : "auth-session"
        }
    )
)

export default useAuthStore