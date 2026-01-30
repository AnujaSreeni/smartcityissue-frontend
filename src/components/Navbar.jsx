import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    navigate("/");
  };

  // ✅ Role-based dashboard path
  const getDashboardPath = () => {
    if (role === "admin") return "/admin";
    if (role === "department") return "/department";
    return "/user"; // citizen
  };

  return (
    <>
      <nav className="navbar">
        {/* LEFT */}
        <div className="navbar-left">
          <NavLink to="/" className="navbar-brand">
            <div className="logo-box">S</div>
            <div className="logo-text">
              <span className="logo-title">SCIM</span>
              <span className="logo-subtitle">
                Smart City Issue Management
              </span>
            </div>
          </NavLink>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {!token && (
            <>
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </>
          )}

          {token && (
            <>
              

              <NavLink to="/" className="nav-link">Home</NavLink>

              {/* ✅ Correct dashboard by role */}
              <NavLink
                to={getDashboardPath()}
                className="nav-link"
              >
                Dashboard
              </NavLink>

              {/* ✅ Only citizen can report issue */}
              {role === "citizen" && (
                <NavLink
                  to="/complaint"
                  className="nav-link"
                >
                  Report Issue
                </NavLink>
              )}

              <button
                className="nav-btn primary"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="modal-actions">
              <button
                className="modal-btn cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="modal-btn logout"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
