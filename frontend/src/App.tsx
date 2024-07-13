import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
