import FetchClient from "../api/FetchClient"

export const getAllUsersAPI = () => 
    FetchClient("/api/users", {
        method : "GET"
    })


