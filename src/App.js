import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminDashboard from "./components/Admin/AdminDashboard";
import OwnerDashboard from "./components/Owner/OwnerDashboard";
import "../src/styles/styles.css";
import RegisterRestaurant from "./components/Owner/RegisterRestaurant";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-restaurant" element={<RegisterRestaurant />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
