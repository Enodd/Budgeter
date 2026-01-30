import { AuthResponse } from "../lib/AuthResponse";
import { useAuth } from "../stores/authStore";
import axios from "axios";
import {Envs} from "../lib/envs.ts";

const axiosService = axios.create({
  baseURL: Envs.apiUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const useAuthentication = () => {
  const { login: storeLogin } = useAuth();

  const login = async (login: string, password: string) => {
    const { data, status } = await axiosService.post<AuthResponse>(
      "/auth/login",
      {
        mail: login,
        password,
      },
    );
    if (![200, 202].includes(status)) {
      return false;
    }
    const { accessToken, email, userId } = data;
    storeLogin(accessToken, email, userId);
    return true;
  };

  const register = async (
    login: string,
    password: string,
    email: string,
    dateOfBirth: string,
  ): Promise<boolean> => {
    const { status } = await axiosService.post<AuthResponse>("/auth/register", {
      name: login,
      password,
      mail: email,
      dateOfBirth,
    });
    return [200, 202].includes(status);
  };

  return { login, register };
};
