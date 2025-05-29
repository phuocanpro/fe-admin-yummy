import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DishManagement from "./DishManagement";
import OrderManagement from "./OrderManagement";
import ReviewManagement from "./ReviewManagement";
import InforManagement from "./InforManagement";
import ChatPage from "./ChatPage";
import "../../styles/styles.css";
import restaurantIcon from "../../assets/images/restaurant-icon.png";
import menuIcon from "../../assets/images/menu-icon.png";
import orderIcon from "../../assets/images/order-icon.png";
import reviewIcon from "../../assets/images/review-icon.png";
import logoutIcon from "../../assets/images/logout-icon.png";
import chartIcon from "../../assets/images/chart-icon.png";
import infoIcon from "../../assets/images/info-icon.png";
import Chartow from "./Chartow";

const OwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("MenuManagement");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const idUser = localStorage.getItem("userId");

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
      case "Messenges":
        return <ChatPage />;
      case "InforManagement":
        return <InforManagement />;
      case "Chartow":
        return <Chartow />;
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
    <div className="dashboard-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="dashboard-header" style={{ height: 64, backgroundColor: '#5a80cc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', color: 'white', flexShrink: 0 }}>
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
      <div className="dashboard-content" style={{ flex: 1, display: 'flex', overflow: 'hidden', height: 'calc(100vh - 64px)' }} >
        <div className="sidebar" style={{ width: 250, backgroundColor: '#ff69b4', overflowY: 'auto', padding: 16, flexShrink: 0 }}>
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
          <button onClick={() => setActiveComponent("Messenges")}>
            <img src={reviewIcon} alt="Review Icon" className="sidebar-icon" />{" "}
            Tin nhắn
          </button>
          <button onClick={() => setActiveComponent("InforManagement")}>
            <img src={infoIcon} alt="Info Icon" className="sidebar-icon" /> Quản
            lý thông tin
          </button>
          <button onClick={() => setActiveComponent("Chartow")}>
            <img src={chartIcon} alt="Chart Icon" className="sidebar-icon" />{" "}
            Biểu Đồ
          </button>
        </div>
        <div className="content" style={{ flex: 1, backgroundColor: '#f5f5f5', overflowY: 'auto', padding: 16 }}>{renderComponent()}</div>
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
