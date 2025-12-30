import React, { useEffect } from 'react'
import Router from './router'
import { initSocket } from './socket/socketManager'

const App = () => {
  useEffect(() => {
    initSocket()
  },[])

  return (
    <div>
        <Router/>
    </div>
  )
}

export default App