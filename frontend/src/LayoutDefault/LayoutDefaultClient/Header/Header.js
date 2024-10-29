import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiHome, FiInfo, FiMail, FiShoppingCart } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { RiMenuFold3Fill } from "react-icons/ri";
import { RiMenuUnfoldFill } from "react-icons/ri";
import "./Header.css";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.UserReducer);
  console.log(user);
  console.log(user.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className="navbar-header">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dbe0xyjvc/image/upload/v1722079169/Cloudinary-React/u054yukevieqjjh9phhf.png"
                alt="Logo"
                className="logo"
              />
            </Link>

            <button className="navbar-toggler" onClick={toggleMenu}>
              {isMenuOpen ? <RiMenuUnfoldFill /> : <RiMenuFold3Fill />}
            </button>
          </div>

          <nav className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
            <ul className="navbar-links">
              <li>
                <NavLink to="/" activeClassName="active">
                  <FiHome /> Home
                </NavLink>
              </li>
              <li className="sub-menu">
                <NavLink to="/listProduct" activeClassName="active">
                  <BsBag /> Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">
                  <FiInfo /> About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" activeClassName="active">
                  <FiMail /> Feedback
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="header-button">
            {user.user ? (
                <div className="header-user-info" >

                <span className="user-name">Hello,{user && user.user.fullName} </span>
                <div className="header-cart">
                  <Link to="/cart">
                    <FiShoppingCart /> Cart(10)
                  </Link>
                </div>
              </div>
            ) : (
              <div className="header-button-sign">
                <Link to="/user/login" className="btn btn-primary auth-btn me-2">
                  Login
                </Link>
                <Link
                  to="/user/register"
                  className="btn btn-secondary auth-btn signup-btn"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
