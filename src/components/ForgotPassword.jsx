import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "../styles/styles.css";
import UserAPI from "../API/UserAPI";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onFinish = async (values) => {
    const { email } = values;

    try {
      const response = await UserAPI.ForgotPassword({ email });

      if (response.data && response.data.status === "error") {
        if (response.data.message === "Email không tồn tại") {
          setError("Email không tồn tại");
        } else {
          setError("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      } else {
        setSuccess(
          "Một email đặt lại mật khẩu đã được gửi đến địa chỉ của bạn"
        );
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Quên mật khẩu</h2>
        <Form
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            className="forgot-password-item"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
            ]}
          >
            <Input className="forgot-password-input" placeholder="Email" />
          </Form.Item>
          {error && <span style={{ color: "red" }}>{error}</span>}
          {success && <span style={{ color: "green" }}>{success}</span>}
          <Form.Item className="forgot-password-item">
            <Button
              type="primary"
              htmlType="submit"
              className="forgot-password-button"
            >
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
