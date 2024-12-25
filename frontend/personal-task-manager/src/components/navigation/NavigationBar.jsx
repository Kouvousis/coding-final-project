import { useState } from "react";
import PropTypes from "prop-types";

function NavigationBar({ onNavigate }) {
  const [isLoggedIn] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onNavigate("home");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onNavigate("login");
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    onNavigate("register");
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
              <li className="nav-item">
                <a className="nav-link" href="">
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
NavigationBar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default NavigationBar;
