import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function NavigationBar({ onNavigate, isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("Unknown");

  const handleUsername = () => {
    const usernameFromCookie = Cookies.get("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleUsername();
  });

  const handleHomeClick = (e) => {
    e.preventDefault();
    onNavigate("home");
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    onNavigate("profile");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onNavigate("login");
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    onNavigate("register");
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("username");
    Cookies.remove("email");
    localStorage.clear();
    setUsername("Unknown");
    setIsLoggedIn(false);
    onNavigate("home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="" onClick={handleHomeClick}>
          Task Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleLoginClick}>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleRegisterClick}>
                    Register
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center">
                  <a className="nav-link" href="" onClick={handleProfileClick}>
                    Welcome {username}
                  </a>
                </li>
                <li className="nav-item">
                  <i
                    onClick={handleLogoutClick}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{ color: "#ffffff" }}
                    />
                  </i>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
NavigationBar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default NavigationBar;
