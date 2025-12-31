import { BrowserRouter, Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import LandingPage from "./pages/LandingPage"
import MainLayout from "./components/templates/mainLayout"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="/chat/:id" element={<ChatPage/>}/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}



