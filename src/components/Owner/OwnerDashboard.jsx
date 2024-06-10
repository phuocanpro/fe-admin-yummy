import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DishManagement from "./DishManagement";
import OrderManagement from "./OrderManagement";
import ReviewManagement from "./ReviewManagement";
import InforManagement from "./InforManagement";
import "../../styles/styles.css";
import restaurantIcon from "../../assets/images/restaurant-icon.png";
import menuIcon from "../../assets/images/menu-icon.png";
import orderIcon from "../../assets/images/order-icon.png";
import reviewIcon from "../../assets/images/review-icon.png";
import logoutIcon from "../../assets/images/logout-icon.png";
import infoIcon from "../../assets/images/info-icon.png";
import Chartow from "./Chartow";
import Chart from "../Admin/chart/Chart";

const OwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("MenuManagement");
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
      case "DishManagement":
        return <DishManagement />;
      case "OrderManagement":
        return <OrderManagement />;
      case "ReviewManagement":
        return <ReviewManagement />;
      case "InforManagement":
        return <InforManagement />;
        case "Chartow":
          return <Chartow/>;
      default:
        return <DishManagement />;
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
          <button onClick={() => setActiveComponent("DishManagement")}>
            <img src={menuIcon} alt="Menu Icon" className="sidebar-icon" />
            Quản lý món ăn
          </button>
          <button onClick={() => setActiveComponent("OrderManagement")}>
            <img src={orderIcon} alt="Order Icon" className="sidebar-icon" />{" "}
            Quản lý đơn hàng
          </button>
          <button onClick={() => setActiveComponent("ReviewManagement")}>
            <img src={reviewIcon} alt="Review Icon" className="sidebar-icon" />{" "}
            Quản lý đánh giá
          </button>
          <button onClick={() => setActiveComponent("InforManagement")}>
            <img src={infoIcon} alt="Info Icon" className="sidebar-icon" /> Quản
            lý thông tin
          </button>
          <button onClick={() => setActiveComponent("Chartow")}>
            <img src={infoIcon} alt="Info Icon" className="sidebar-icon" /> Biểu Đồ
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
