import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// TODO change fetch username function when Profiles are created in the backend
function NavigationBar({ onNavigate, isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("Unknown");

  const fetchUsername = async () => {
    const token = Cookies.get("access_token");
    const response = await fetch("http://localhost:8000/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUsername(data.username);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsername();
    }
  }, [isLoggedIn]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onNavigate("welcome");
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
                  <span className="nav-link">Welcome {username}</span>
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
