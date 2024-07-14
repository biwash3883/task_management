import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NavBar: React.FC = () => {
  const { isAuthorized } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="navBar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          {isAuthorized ? (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/"
                data-testid="homeBtn"
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/calendar"
                data-testid="calendarBtn"
              >
                Calendar
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/logout"
                data-testid="logoutBtn"
              >
                LogOut
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                data-testid="loginBtn"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/register"
                data-testid="registerBtn"
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
