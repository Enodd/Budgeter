import { createContext, useContext, useState, ReactNode } from "react";
import { StorageKeys } from "../lib/enums/StorageKeys";

interface AuthState {
  authToken: string | null;
  username: string | null;
  userId: number;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (authToken: string, username: string, userId: number) => void;
  logout: (reason: string | null) => void;
  checkAuth: () => void;
  getLogoutReason: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    authToken: null,
    username: null,
    userId: 0,
    isAuthenticated: false,
  });

  const login = (authToken: string, username: string, userId: number) => {
    localStorage.setItem(StorageKeys.AUTH_TOKEN, authToken);
    localStorage.setItem(StorageKeys.USERNAME, username);
    localStorage.setItem(StorageKeys.USER_ID, userId + '');
    setAuthState({ authToken, username, userId, isAuthenticated: true });
  };

  const logout = (reason: string | null = null) => {
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.USERNAME);
    localStorage.removeItem(StorageKeys.USER_ID);

    if (reason) {
      localStorage.setItem(StorageKeys.LOGOUT_REASON, reason);
    }
    setAuthState({
      authToken: null,
      username: null,
      userId: 0,
      isAuthenticated: false,
    });
  };

  const checkAuth = () => {
    const username = localStorage.getItem(StorageKeys.USERNAME);
    const authToken = localStorage.getItem(StorageKeys.AUTH_TOKEN);
    const userId = localStorage.getItem(StorageKeys.USER_ID);

    if (authToken && username && userId) {
      setAuthState({
        authToken,
        username,
        userId: parseInt(userId),
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
