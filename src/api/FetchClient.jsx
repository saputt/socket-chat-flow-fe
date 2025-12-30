import React from 'react'
import useAuthStore from '../store/useAuthStore'

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

    if(response.status === 401){
        try {
            const refreshRes = await fetch(`${baseUrl}/api/refresh`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                credentials : "include"
            })

            console.log(refreshRes)

            if(refreshRes.ok){
                console.log("berhasil")

                const result = await refreshRes.json()

                setAccessToken(result.accessToken)

                const newHeaders = {
                    ...headers,
                    "Authorization" : `Bearer ${result.accessToken}`,
                    credentials : "include"
                }

                return fetch(`${baseUrl}${endPoint}`, {
                    ...option,
                    headers: {
                        ...headers,
                        "Authorization" : `Bearer ${result.accessToken}`,
                    },
                    credentials : "include"
                }).then(res => res.json())
            } else {
                localStorage.clear()
                console.log("gajee")
                // window.location.href= "/login"
            }
        } catch (error) {
            // localStorage.clear()
            window.location.href = "/login"
        }
    } else if(response.status === 500) throw new Error("Database issue")

    const data = await response.json()

    if(!response.ok) throw new Error(data.message || "Error")

    return data
}

export default FetchClient