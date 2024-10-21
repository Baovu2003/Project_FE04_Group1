import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiHome,
  FiInfo,
  FiMail,
  FiShoppingCart,
} from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { RiMenuFold3Fill } from "react-icons/ri";
import { RiMenuUnfoldFill } from "react-icons/ri";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
         <header>
      <div className="navbar-container">
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
            <li>
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
        
        <div className="navbar-cart">
          <Link to="/signin" className="btn btn-primary auth-btn">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-secondary auth-btn signup-btn">
            Sign Up
          </Link>
          <Link to="/cart">
            <FiShoppingCart /> Cart(10)
          </Link>
        </div>
      </div>
    
    </header>
   
    </>
   

    
  );
}

export default Header;
