import { jwtDecode, JwtPayload } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface AuthContextType {
  isAuthorized: boolean | null;
  checkAuthorization: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      const decodedToken = jwtDecode<JwtPayload>(token);
      const tokenExpiry = decodedToken?.exp;
      const now = Date.now() / 1000;

      if (tokenExpiry && tokenExpiry < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      setIsAuthorized(false);
      console.error("authERROR: ", error);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      const res = await api.post("/api/v1/token/refresh", {
        refresh: refreshToken,
      });
      console.log(res, "refresh token");
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
      console.error("refreshERROR: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, checkAuthorization }}>
      {children}
    </AuthContext.Provider>
  );
};
