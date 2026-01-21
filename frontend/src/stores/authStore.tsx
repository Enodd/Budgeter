import { createContext, useContext, useState, ReactNode } from "react";
import { StorageKeys } from "../lib/enums/StorageKeys";
import { Envs } from "../lib/envs";

interface AuthState {
  authToken: string | null;
  refreshToken: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (authToken: string, refreshToken: string, username: string) => void;
  logout: (reason: string | null) => void;
  checkAuth: () => void;
  getLogoutReason: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    authToken: null,
    refreshToken: null,
    username: null,
    isAuthenticated: false,
  });

  const login = (authToken: string, refreshToken: string, username: string) => {
    localStorage.setItem(StorageKeys.AUTH_TOKEN, authToken);
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(StorageKeys.USERNAME, username);
    setAuthState({ authToken, refreshToken, username, isAuthenticated: true });
  };

  const logout = (reason: string | null = null) => {
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(StorageKeys.USERNAME);

    if (reason) {
      localStorage.setItem(StorageKeys.LOGOUT_REASON, reason);
    }
    setAuthState({
      authToken: null,
      refreshToken: null,
      username: null,
      isAuthenticated: false,
    });
  };

  const checkAuth = () => {
    const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);
    const username = localStorage.getItem(StorageKeys.USERNAME);
    const authToken = localStorage.getItem(StorageKeys.AUTH_TOKEN);
    if (authToken && refreshToken && username) {
      setAuthState({
        authToken,
        refreshToken,
        username,
        isAuthenticated: true,
      });
    }
  };

  const getLogoutReason = () => {
    const reason = localStorage.getItem(StorageKeys.LOGOUT_REASON);
    localStorage.removeItem(StorageKeys.LOGOUT_REASON);
    return reason;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        checkAuth,
        getLogoutReason,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
