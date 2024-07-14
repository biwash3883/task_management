import { createContext, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isAuthorized: boolean | null;
  checkAuthorization: () => void;
  LogOut: () => JSX.Element;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const mockAuthContext: AuthContextType = {
    isAuthorized: false,
    checkAuthorization: () => {},
    LogOut: () => {
      localStorage.clear();
      toast.info("User Logged Out 👋");
      return <Navigate to="/login" />;
    },
  };

  return (
    <AuthContext.Provider value={mockAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

export { MockAuthProvider, useAuth };
