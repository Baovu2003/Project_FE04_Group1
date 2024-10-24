import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaCog, FaUser } from "react-icons/fa";
import { Button } from "react-bootstrap";
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Xóa token khỏi cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Đặt ngày hết hạn về trước

    // Hoặc xóa token khỏi local storage
    // localStorage.removeItem('token');

    // Chuyển hướng người dùng về trang đăng nhập
    navigate("auth/login");
  };
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

              <Link to="auth/login" className="btn btn-primary auth-btn">
                Sign In
              </Link>
              <Button onClick={handleLogout} variant="danger">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
