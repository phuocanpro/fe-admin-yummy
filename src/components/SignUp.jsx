import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import "../styles/styles.css";

const { Option } = Select;

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, email, password, phone, role } = values;
    // Gọi API để đăng ký người dùng mới ở đây
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "restaurant") {
      navigate("/owner-dashboard");
    }
  };

  return (
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
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="Email" />
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
              name="phone"
              rules={[
                { required: true, message: "Please input your Phone number!" },
              ]}
            >
              <Input placeholder="Phone" />
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
            <Form.Item>
              <Button className="pink-button" type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="image-section">
          <h2>Welcome to Sign Up</h2>
          <p>Don't have an account?</p>
          <a className="button" onClick={() => navigate("/login")}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
