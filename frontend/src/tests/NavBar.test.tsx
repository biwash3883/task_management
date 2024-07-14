import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import NavBar from "../components/NavBar";

vi.doMock("../components/AuthContext");

describe("NavBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should only render login and register button when not authenticated", () => {
    render(
      <AuthContext.Provider
        value={{
          isAuthorized: false,
          checkAuthorization: vi.fn(),
          LogOut: vi.fn(),
        }}
      >
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const loginButton = screen.getByTestId("loginBtn");
    const registerButton = screen.getByTestId("registerBtn");

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("should render home, calendar, logout button when authenticated", () => {
    render(
      <AuthContext.Provider
        value={{
          isAuthorized: true,
          checkAuthorization: vi.fn(),
          LogOut: vi.fn(),
        }}
      >
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const homeButton = screen.getByTestId("homeBtn");
    const calendarButton = screen.getByTestId("calendarBtn");
    const logoutButton = screen.getByTestId("logoutBtn");

    expect(homeButton).toBeInTheDocument();
    expect(calendarButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
