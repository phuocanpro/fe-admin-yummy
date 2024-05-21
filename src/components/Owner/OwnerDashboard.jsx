import React, { useState } from "react";
import MenuManagement from "./MenuManagement";
import OrderManagement from "./OrderManagement";
import ReviewManagement from "./ReviewManagement";
import "../../styles/styles.css";
import restaurantIcon from "../../assets/images/restaurant-icon.png";
import menuIcon from "../../assets/images/menu-icon.png";
import orderIcon from "../../assets/images/order-icon.png";
import reviewIcon from "../../assets/images/review-icon.png";

const OwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("MenuManagement");

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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img
          src={restaurantIcon}
          alt="Restaurant Icon"
          className="header-icon"
        />
        <h2>Owner Dashboard</h2>
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
    </div>
  );
};

export default OwnerDashboard;
