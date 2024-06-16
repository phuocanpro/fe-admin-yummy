import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import "../styles/styles.css";
import UserAPI from "../API/UserAPI";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import googleLogo from "../assets/images/googleLogo.png";

const { Option } = Select;

const clientId =
  "254917498473-o52drkmjbhldirifso7p895tf7d6m7be.apps.googleusercontent.com";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    const { name, email, password, phone, role } = values;

    const fetchData = async () => {
      const response = await UserAPI.Register(values).then((res) => res);

      if (response.status === "error") {
        if (response.message === "Enter missing information") {
          setError("Vui lòng nhập đủ thông tin");
        } else if (response.message === "Email exist") {
          setError("Email đã được đăng ký");
        }
      } else {
        if (role === "restaurant") {
          localStorage.setItem("userId", response.user.id);
          navigate("/register-restaurant");
        } else {
          navigate("/login");
        }
      }
    };
    fetchData();
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
    const values = {
      name: credentialResponseDecoded.name,
      email: credentialResponseDecoded.email,
      password: "",
      phone: "",
      role: "restaurant",
    };
    onFinish(values);
  };

  const handleGoogleFailure = () => {
    console.log("Login Failed");
    setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <div className="box">
          <div className="form-section">
            <h2>Sign Up</h2>
            <Form
              name="signup"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
              >
                <Select placeholder="Chọn vai trò">
                  <Option value="user">Người dùng</Option>
                  <Option value="restaurant">Quán ăn</Option>
                </Select>
              </Form.Item>
              {error && <span style={{ color: "red" }}>{error}</span>}
              <Form.Item>
                <Button
                  className="pink-button"
                  type="primary"
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <div className="google-login-container">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>
          </div>
          <div className="image-section">
            <h2>Chào mừng đến với Đăng ký</h2>
            <p>Bạn đã có tài khoản?</p>
            <a className="button" onClick={() => navigate("/login")}>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
