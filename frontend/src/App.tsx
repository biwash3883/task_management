import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { toast, Toaster } from "sonner";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/dashboard";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function LogOut() {
  localStorage.clear();
  toast.info("User Logged Out 👋");
  return <Navigate to="/login" />;
}

function RegisterAndLogOut() {
  localStorage.clear();
  return <SignUp />;
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<RegisterAndLogOut />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
};

export default App;
