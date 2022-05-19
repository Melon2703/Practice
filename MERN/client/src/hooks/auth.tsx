import React, { useCallback, useContext, useMemo, useState } from "react";
import { AuthData } from "../types";

const LS_KEY = "usersData";

const def = { token: "", userId: "" };

const getDefaultAuthDAta: AuthData = JSON.parse(
  localStorage.getItem(LS_KEY) ?? '{"token": "","userId": ""}'
);

interface Context {
  setToken: (token: string, userId: string) => void;
  deleteToken: () => void;
  authData: AuthData;
  isAuth: boolean;
}

// @ts-ignore
const AuthContext = React.createContext<Context>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState(getDefaultAuthDAta);

  const setToken = useCallback((token, userId) => {
    const data = { token, userId };

    localStorage.setItem(LS_KEY, JSON.stringify(data));

    setAuthData(data);
  }, []);

  const deleteToken = useCallback(() => {
    localStorage.removeItem(LS_KEY);
    setAuthData(def);
  }, []);

  const isAuth = useMemo(() => !!authData.token, [authData.token]);

  return (
    <AuthContext.Provider value={{ setToken, deleteToken, authData, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
