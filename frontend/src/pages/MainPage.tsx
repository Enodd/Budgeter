import React, {useEffect} from 'react';
import {useAuth} from "../stores/authStore.tsx";
import {useNavigate} from "react-router-dom";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth/login")
    }
  }, [])
  return <></>
}