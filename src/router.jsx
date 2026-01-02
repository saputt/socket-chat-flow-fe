import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import LandingPage from "./pages/LandingPage"
import MainLayout from "./components/templates/mainLayout"
import GroupChatPage from "./pages/GroupChatPage"
import PrivChatPage from "./pages/PrivChatPage"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="/chat/:id" element={<PrivChatPage/>}/>
                    <Route path="/group/:id" element={<GroupChatPage/>}/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}



