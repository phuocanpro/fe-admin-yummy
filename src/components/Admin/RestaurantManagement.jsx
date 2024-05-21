import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { restaurants } from "../../data/fakeData";
import "../../styles/styles.css"; // Make sure you have the appropriate styles in this file

const RestaurantManagement = () => {
  const [restaurantData, setRestaurantData] = useState(restaurants);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  const handleAddOrUpdateRestaurant = (values) => {
    if (currentRestaurant) {
      setRestaurantData(
        restaurantData.map((restaurant) =>
          restaurant.id === currentRestaurant.id
            ? { ...restaurant, ...values }
            : restaurant
        )
      );
    } else {
      setRestaurantData([
        ...restaurantData,
        { ...values, id: restaurantData.length + 1 },
      ]);
    }
    setIsModalVisible(false);
  };

  const showModal = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRestaurant(null);
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Giờ mở cửa",
      dataIndex: "opening_hours",
      key: "opening_hours",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Button
          className="pink-button"
          icon={<EditOutlined />}
          onClick={() => showModal(record)}
        >
          Sửa
        </Button>
      ),
    },
  ];

  return (
    <div className="owner-container">
      <div className="button-container">
        <Button
          className="pink-button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal(null)}
        >
          Thêm nhà hàng
        </Button>
      </div>
      <Table dataSource={restaurantData} columns={columns} rowKey="id" />
      <Modal
        title={currentRestaurant ? "Sửa nhà hàng" : "Thêm nhà hàng"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentRestaurant}
          onFinish={handleAddOrUpdateRestaurant}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="opening_hours"
            label="Giờ mở cửa"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {currentRestaurant ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default RestaurantManagement;
