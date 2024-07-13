import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthorized, checkAuthorization } = useAuth();

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  if (isAuthorized === null) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
