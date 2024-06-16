import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import "../styles/styles.css";
import UserAPI from "../API/UserAPI";
import googleLogo from "../assets/images/googleLogo.png";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    const { email, password, remember } = values;

    console.log(values);
    const fetchData = async () => {
      const response = await UserAPI.Login(values).then((res) => res);

      if (response.status === "error") {
        if (response.message === "Enter missing information") {
          setError("Vui lòng nhập đủ thông tin");
        } else if (response.message === "Email not exist") {
          setError("Email sai");
        } else if (response.message === "Wrong password") {
          setError("Mật khẩu sai");
        }
      } else {
        localStorage.setItem("userId", response.user.id);
        if (response.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.user.role === "restaurant") {
          navigate("/owner-dashboard");
        }
      }
    };

    fetchData();
  };

  const handleGoogleLogin = () => {
    // Thêm logic đăng nhập với Google tại đây
  };

  return (
    <div>
      <div className="box">
        <div className="image-section">
          <h2>Welcome to login</h2>
          <p>Don't have an account?</p>
          <a className="button" onClick={() => navigate("/signup")}>
            Sign Up
          </a>
        </div>
        <div className="form-section">
          <h2>Login</h2>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <Form.Item>
              <Checkbox name="remember" valuePropName="checked">
                Remember me
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <a
                className="forgot-password-link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="pink-button">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="google-login-container">
            <button className="google-login-button" onClick={handleGoogleLogin}>
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              Đăng nhập với Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
