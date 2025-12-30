import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppTesting from "./AppTesting"
import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import LandingPage from "./pages/LandingPage"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat/:id" element={<ChatPage/>}/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}



