import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./stores/authStore";
import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route path="/" element={<LoginPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
