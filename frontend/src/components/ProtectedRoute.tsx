import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthorized, checkAuthorization } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthorization();
      setIsLoading(false);
    };

    checkAuth();
  }, [checkAuthorization]);

  if (isLoading || isAuthorized === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
