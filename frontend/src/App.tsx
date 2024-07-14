import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { toast, Toaster } from "sonner";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/dashboard";
import BasicCalendar from "./components/dashboard/calendar/BasicCalendar";
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
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <BasicCalendar />
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
