import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './stores/authStore';
import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { MainPage } from './pages/MainPage';
import Dashboard from './pages/Dashboard';
import {BudgetDashboard} from "./pages/BudgetDashboard.tsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route
              path='/'
              element={<MainPage />}
            />
            <Route
              path={'/auth/login'}
              element={<LoginPage />}
            />
            <Route
              path={'/auth/register'}
              element={<RegisterPage />}
            />
            <Route
              path={'/dashboard'}
              element={<Dashboard />}
            />
            <Route
              path={'/budgets/:id'}
              element={<BudgetDashboard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
