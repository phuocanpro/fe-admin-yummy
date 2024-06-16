import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import RestaurantManagement from "./RestaurantManagement";
import DishManagement from "./OrderAllManagement";
import "../../styles/styles.css";
import AdminIcon from "../../assets/images/admin-icon.png";
import userIcon from "../../assets/images/user-icon.png";
import restaurantIcon from "../../assets/images/restaurant-icon.png";
import dishIcon from "../../assets/images/dish-icon.png";
import logoutIcon from "../../assets/images/logout-icon.png"; 
import chartIcon from "../../assets/images/chart-icon.png";
import OrderAllManagement from "./OrderAllManagement";
import { useSelector } from "react-redux";
import ChartManagement from "./ChartManagement";
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("UserManagement");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const idUser = localStorage.getItem('userId');

  useEffect(() => {
    try {
      if (!idUser) navigate("/login");
    } catch (error) {
      // Handle error
      console.log("err", error);
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "UserManagement":
        return <UserManagement />;
      case "RestaurantManagement":
        return <RestaurantManagement />;
      case "OrderAllManagement":
        return <OrderAllManagement />;
      case "ChartManagement":
          return <ChartManagement/>;
      default:
        return <UserManagement />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src={AdminIcon} alt="Admin Icon" className="header-icon" />
          <h2>Admin Dashboard</h2>
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
        <button onClick={() => setActiveComponent("OrderAllManagement")}>
            <img src={dishIcon} alt="Dish Icon" className="sidebar-icon" /> Quản
            lý đơn hàng
          </button>
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
            Quản lý quán ăn
          </button>
          <button onClick={() => setActiveComponent("ChartManagement")}>
            <img
              src={chartIcon}
              alt="Chart Icon"
              className="sidebar-icon"
            />{" "}
            Biểu đồ 
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

export default AdminDashboard;
