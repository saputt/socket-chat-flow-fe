import React from 'react'
import useAuthStore from '../store/useAuthStore'
import { refreshAPI } from '../services/AuthService'

const FetchClient = async (endPoint, option) => {
    const baseUrl = "http://localhost:5000"

    const {setAccessToken} = useAuthStore.getState()

    const token = useAuthStore.getState().accessToken

    const headers = {
        "Content-Type" : "application/json",
        ...(token && {"Authorization" : `Bearer ${token}`})
    }

    const response = await fetch(`${baseUrl}${endPoint}`, {
        ...option,
        headers : {...headers, ...option.headers},
        credentials : "include"
    })

    const data = await response.json()

    if(!response.ok){
        if(response.status === 401){
            try {
                const refreshRes = await fetch(`${baseUrl}/api/refresh`, {
                    method : "POST",
                    credentials : "include"
                })
    
                const refreshData = await refreshRes.json()
    
                if(refreshData.status === "Success"){    
                    setAccessToken(refreshData?.accessToken)
                    return fetch(`${baseUrl}${endPoint}`, {
                        ...option,
                        headers: {
                            ...headers,
                            "Authorization" : `Bearer ${refreshData.accessToken}`,
                        },
                        credentials : "include"
                    }).then(res => res.json())
                } 
            } catch (error) {
                console.error(error)
            }
        } else if(response.status === 500) throw new Error("Database issue")
        
        throw new Error(data.message)
    }


    if(data.status === "Error") throw new Error(data.message || "Error")

    return data
}

export default FetchClient