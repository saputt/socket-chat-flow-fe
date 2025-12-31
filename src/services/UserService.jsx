import FetchClient from "../api/FetchClient"

export const getAllUsersAPI = () => 
    FetchClient("/api/users", {
        method : "GET"
    })


export const getUserAPI = (id) =>
    FetchClient(`/api/user/${id}`, {
        method : "GET"
    })