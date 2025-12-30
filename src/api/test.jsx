import React from 'react'

const test = async (option, endPoint) => {
    const baseUrl = "http://localhost:5000"

    const token = localStorage.getItem("accessToken")

    const headers = {
        "Content-Type" : "Application/json",
        ...(token && {"Authorization" : `Bearer ${token}`})
    }

    const response = await fetch(`${baseUrl}${endPoint}`, {
        ...option,
        headers : {...headers, ...option.headers}
    })

    if(response.status = "401"){
        try {
            const refreshRes = await fetch(`${baseUrl}/api/refresh`, {
                method : "POST"
            })
            
            if(refreshRes.ok){
                const result = await refreshRes.json()

                localStorage.setItem("accessToken", result.accessToken)

                const newHeaders = {
                    ...headers,
                    "Authorization" : `Bearer ${result.accessToken}`
                }

                return fetch(`${baseUrl}${endPoint}`, {
                    ...option,
                    newHeaders
                })
            }

            localStorage.clear()
            window.location.href('/login')
        } catch (error) {
            localStorage.clear()
            window.location.href('/login')
        }
    }
}

export default test