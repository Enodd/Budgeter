import { AuthResponse } from "../lib/AuthResponse";
import { StorageKeys } from "../lib/enums/StorageKeys";
import axiosService from "../services/axiosService";
import { useAuth } from "../stores/authStore";

export const useAuthentication = () => {
  const { login: storeLogin } = useAuth();

  const login = async (login: string, password: string) => {
    console.log(login, password)
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
    const { accessToken, refreshToken, email } = data;
    storeLogin(accessToken, refreshToken, email);
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

  const refresh = async () => {
    const { data: { accessToken, refreshToken, email } } =
      await axiosService.post<AuthResponse>("/auth/refresh", {
        refreshToken: localStorage.getItem(StorageKeys.REFRESH_TOKEN),
      });
    storeLogin(accessToken, refreshToken, email);
    return true;
  };

  return { login, register, refresh };
};
