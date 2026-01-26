import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./stores/authStore";
import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import {MainPage} from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path={"/login"} element={<LoginPage />} />
                        <Route path={"/register"} element={<RegisterPage />} />
                        <Route path={"/dashboard"} element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
