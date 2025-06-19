// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCaretDown, FaHome, FaCarSide, FaPhoneAlt, FaImages } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import logo from '../../assets/vsms-logo.jpg';
import "./Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    onToggleSidebar(!collapsed);
  };

  const handleNavItemClick = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-nav-container">
      <div className="admin-nav-header">
        <div className="admin-nav-header-left">
          <div className={`admin-nav-sidebar-toggle ${collapsed ? 'collapsed' : ''}`} onClick={toggleSidebar}>
            <IoMenu className="toggle-icon" />
          </div>
          &nbsp;&nbsp;
          <img src={logo} alt="Logo" className="admin-nav-company-logo" style={{ width: "80px", height: "50px", borderRadius: "8px" }} />
        </div>

        <div className="admin-nav-header-right">
          <div className="admin-nav-header-icons">
            <div className="admin-nav-icon-container" onClick={handleProfileClick}>
              <div className="admin-nav-profile">
                <img src="https://i.pravatar.cc/100?img=4" alt="Profile" className="admin-nav-profile-img" />
                <FaCaretDown className="admin-nav-caret-icon" />
              </div>
              {showDropdown && (
                <div className="admin-nav-profile-dropdown">
                  <div className="admin-nav-profile-header"><strong>Admin</strong></div>
                  <div className="admin-nav-profile-item" onClick={handleLogout}>Sign Out</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`admin-nav-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="admin-nav-position-sticky">
          <ul className="nav flex-column">
            <li className="admin-nav-item">
              <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} to="/dashboard" onClick={handleNavItemClick}>
                <FaHome className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Dashboard</span>}
              </Link>

              <Link className={`nav-link ${location.pathname === "/details" ? "active" : ""}`} to="/details" onClick={handleNavItemClick}>
                <FaCarSide className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Car Details</span>}
              </Link>

              <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact" onClick={handleNavItemClick}>
                <FaPhoneAlt className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Contact</span>}
              </Link>

              <Link className={`nav-link ${location.pathname === "/gallery" ? "active" : ""}`} to="/gallery" onClick={handleNavItemClick}>
                <FaImages className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Gallery</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
