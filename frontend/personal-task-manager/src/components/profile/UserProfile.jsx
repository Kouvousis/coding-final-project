import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function UserProfile({ onNavigate }) {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const email = Cookies.get("email");
    const username = Cookies.get("username");
    setUser((prev) => ({
      ...prev,
      email: email || "",
      username: username || "",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
      const token = Cookies.get("access_token");
      const response = await fetch("http://localhost:8000/api/update-user/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        Cookies.set("username", user.username);
        Cookies.set("email", user.email);
        setSuccess("Profile updated successfully");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await response.json();
        setSuccess("");
        if (data.username) {
          setError(data.username[0]);
        } else if (data.email) {
          setError(data.email[0]);
        } else if (data.password) {
          setError(data.password[0]);
        } else {
          setError(data.message || "Registration failed");
        }
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete you account? This action can not be undone."
      )
    ) {
      setIsLoading(true);
      setError("");
      setSuccess("");

      try {
        const token = Cookies.get("access_token");
        const response = await fetch("http://localhost:8000/api/delete-user/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setSuccess("Account deleted successfully");
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          Cookies.remove("username");
          Cookies.remove("email");
          localStorage.clear();
          setTimeout(() => {
            onNavigate("login");
          }, 3000);
        } else {
          setError("Failed to delete account");
        }
      } catch {
        setError("Network error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Change Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Change Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Change Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="d-flex justify-content-end mt-3">
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
        <button
          className="btn btn-danger m-2"
          onClick={handleDeleteAccount}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default UserProfile;
