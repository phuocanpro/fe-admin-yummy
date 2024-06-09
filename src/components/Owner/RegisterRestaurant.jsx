import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, TimePicker } from "antd";
import moment from "moment";
import "../../styles/styles.css";
import RestaurantAPI from "../../API/RestaurantAPI";

const RegisterRestaurant = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    const { restaurantName, phone, address, openingHours } = values;
    const formattedOpeningHours = `${moment(openingHours[0]).format(
      "HH:mm"
    )} - ${moment(openingHours[1]).format("HH:mm")}`;

    const idUser = localStorage.getItem('userId');

    const data = {
      name: restaurantName,
      phone,
      address,
      opening_hours: formattedOpeningHours,
      user_id: idUser,
    };

    try {
      const response = await RestaurantAPI.Create(data);

      if (response.status === "error") {
        if (response.message === "Enter missing information") {
          setError("Vui lòng nhập đủ thông tin");
        } else if (response.message === "Phone exist") {
          setError("Số điện thoại đã được đăng ký");
        } else {
          setError("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error creating restaurant:", err);
      setError("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Thông tin cơ bản</h2>
        <Form
          name="register-restaurant"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="restaurantName"
            label="Tên quán"
            rules={[{ required: true, message: "Vui lòng nhập tên quán ăn!" }]}
          >
            <Input placeholder="Tên quán" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại liên hệ"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>

          <Form.Item
            name="openingHours"
            label="Giờ mở cửa"
            rules={[{ required: true, message: "Vui lòng chọn giờ mở cửa!" }]}
          >
            <TimePicker.RangePicker
              format="HH:mm"
              placeholder={["Mở cửa", "Đóng cửa"]}
            />
          </Form.Item>

          {error && <span style={{ color: "red" }}>{error}</span>}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="pink-button">
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
