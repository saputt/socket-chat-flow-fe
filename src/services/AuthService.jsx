import FetchClient from "../api/FetchClient";

export const loginAPI = (credential) => 
    FetchClient("/api/login", {
        method : "POST",
        body : JSON.stringify(credential)
    })

export const registerAPI = (userData) => 
    FetchClient("/api/register", {
        method : "POST",
        body : JSON.stringify(userData)
    })

export const refreshAPI = () => 
    FetchClient("/api/refresh", {
        method : "POST"
    })

export const getProfileAPI = () => FetchClient("/api/me", {method : "GET"})

export const logoutAPI = () => FetchClient("/api/logout", {method : "GET"})

