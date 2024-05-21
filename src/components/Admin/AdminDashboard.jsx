import React, { useState } from "react";
import UserManagement from "./UserManagement";
import RestaurantManagement from "./RestaurantManagement";
import DishManagement from "./DishManagement";
import "../../styles/styles.css";
import AdminIcon from "../../assets/images/admin-icon.png";
import userIcon from "../../assets/images/user-icon.png";
import restaurantIcon from "../../assets/images/restaurant-icon.png";
import dishIcon from "../../assets/images/dish-icon.png";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("UserManagement");

  const renderComponent = () => {
    switch (activeComponent) {
      case "UserManagement":
        return <UserManagement />;
      case "RestaurantManagement":
        return <RestaurantManagement />;
      case "DishManagement":
        return <DishManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={AdminIcon} alt="Admin Icon" className="header-icon" />
        <h2>Admin Dashboard</h2>
      </header>
      <div className="dashboard-content">
        <div className="sidebar">
          <button onClick={() => setActiveComponent("UserManagement")}>
            <img src={userIcon} alt="User Icon" className="sidebar-icon" /> Quản
            lý người dùng
          </button>
          <button onClick={() => setActiveComponent("RestaurantManagement")}>
            <img
              src={restaurantIcon}
              alt="Restaurant Icon"
              className="sidebar-icon"
            />{" "}
            Quản lý nhà hàng
          </button>
          <button onClick={() => setActiveComponent("DishManagement")}>
            <img src={dishIcon} alt="Dish Icon" className="sidebar-icon" /> Quản
            lý món ăn
          </button>
        </div>
        <div className="content">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
