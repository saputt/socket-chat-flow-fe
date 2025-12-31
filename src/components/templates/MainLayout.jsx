import { Outlet } from "react-router-dom"
import Navbar from "../organism/Navbar"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50/90">
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout