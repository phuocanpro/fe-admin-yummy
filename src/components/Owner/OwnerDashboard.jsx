import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuManagement from "./MenuManagement";
import OrderManagement from "./OrderManagement";
import ReviewManagement from "./ReviewManagement";
import "../../styles/styles.css";
import restaurantIcon from "../../assets/images/restaurant-icon.png";
import menuIcon from "../../assets/images/menu-icon.png";
import orderIcon from "../../assets/images/order-icon.png";
import reviewIcon from "../../assets/images/review-icon.png";
import logoutIcon from "../../assets/images/logout-icon.png";

const OwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("MenuManagement");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "MenuManagement":
        return <MenuManagement />;
      case "OrderManagement":
        return <OrderManagement />;
      case "ReviewManagement":
        return <ReviewManagement />;
      default:
        return <MenuManagement />;
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img
            src={restaurantIcon}
            alt="Restaurant Icon"
            className="header-icon"
          />
          <h2>Owner Dashboard</h2>
        </div>
        <button
          className="logout-button"
          onClick={() => setShowLogoutModal(true)}
        >
          <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />{" "}
          Logout
        </button>
      </header>
      <div className="dashboard-content">
        <div className="sidebar">
          <button onClick={() => setActiveComponent("MenuManagement")}>
            <img src={menuIcon} alt="Menu Icon" className="sidebar-icon" /> Menu
            Management
          </button>
          <button onClick={() => setActiveComponent("OrderManagement")}>
            <img src={orderIcon} alt="Order Icon" className="sidebar-icon" />{" "}
            Order Management
          </button>
          <button onClick={() => setActiveComponent("ReviewManagement")}>
            <img src={reviewIcon} alt="Review Icon" className="sidebar-icon" />{" "}
            Review Management
          </button>
        </div>
        <div className="content">{renderComponent()}</div>
      </div>
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Logout</h3>
            <p>Bạn muốn đăng xuất?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
