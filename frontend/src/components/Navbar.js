import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user info

  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/"); // redirect to home
    // No need to reload; state will update automatically if parent uses context or state
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // send search term to parent
  };

  // Styles
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const brandStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const inputStyle = {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    minWidth: "400px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const signUpButton = {
    ...buttonStyle,
    marginRight: "15px",
    backgroundColor: "#e67e22",
    color: "#fff",
  };

  const loginButton = {
    ...buttonStyle,
    backgroundColor: "#3498db",
    color: "#fff",
  };

  const logoutButton = {
    ...buttonStyle,
    backgroundColor: "#e74c3c",
    color: "#fff",
  };

  return (
    <nav style={navStyle}>
      {/* Website Name */}
      <div style={brandStyle} onClick={() => navigate("/")}>
        Pune Voyager
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search places..."
          value={searchTerm}
          onChange={handleSearch}
          style={inputStyle}
        />
      </div>

      {/* Auth Buttons / User Info */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/Signup" style={{ textDecoration: "none" }}>
              <button style={signUpButton}>Sign Up</button>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <button style={loginButton}>Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
