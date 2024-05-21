import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Select } from "antd";
import "../styles/styles.css";

const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password, role, remember } = values;
    // Kiểm tra xác thực người dùng ở đây
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "restaurant") {
      navigate("/owner-dashboard");
    }
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
            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select your Role!" }]}
            >
              <Select placeholder="Select a role">
                <Option value="admin">Admin</Option>
                <Option value="restaurant">Restaurant Owner</Option>
              </Select>
            </Form.Item>
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
