import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Select } from "antd";
import "../styles/styles.css";
import UserAPI from "../API/UserAPI";

const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onFinish = (values) => {
    const { email, password, role, remember } = values;

    const fetchData = async () => {
      const response = await UserAPI.Login(values)
        .then((res) => res)

      if (response.status === "error") {
        if (response.message === "Enter missing information") {
          setError("Vui lòng nhập đủ thông tin");
        } else if (response.message === "Email not exist") {
          setError("Email sai");
        } else if (response.message === "Wrong password") {
          setError("Mật khẩu sai");
        }
      } else {
        if (response.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "restaurant") {
          navigate("/owner-dashboard");
        }
      }
    }


    fetchData()
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
            {error && (
              <span style={{ color: "red" }}>{error}</span>
            )}
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item></Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="pink-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
