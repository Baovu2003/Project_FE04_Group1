import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaCog, FaUser } from "react-icons/fa";
const Header = () => {
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo Section */}
          <div className="col-3">
            <div className="inner-logo">
              <Link to={`/dashboard`}>ADMIN</Link>
            </div>
          </div>

          <div className="col-9">
            <div className="sider d-flex justify-content-end align-items-center">
              <div className="admin-avatar me-3 d-flex align-items-center">
                <FaUser
                  className="ms-2"
                  style={{ color: "white", fontSize: "20px" }}
                  title="User Profile"
                />
                <span className="admin-name">Admin Name</span>{" "}
              </div>

              {/* Authentication Buttons */}
              <Link to="/signin" className="btn btn-primary auth-btn">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn btn-secondary auth-btn signup-btn"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
