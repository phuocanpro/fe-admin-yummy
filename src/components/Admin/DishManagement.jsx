import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { orders, users, restaurants } from "../../data/fakeData";
import "../../styles/styles.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const OrderManagement = () => {
  const [orderData, setOrderData] = useState(orders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleAddOrUpdateOrder = (values) => {
    if (currentOrder) {
      setOrderData(
        orderData.map((order) =>
          order.id === currentOrder.id ? { ...order, ...values } : order
        )
      );
    } else {
      setOrderData([...orderData, { ...values, id: orderData.length + 1 }]);
    }
    setIsModalVisible(false);
  };

  const showModal = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentOrder(null);
  };

  const columns = [
    {
      title: "Người dùng",
      dataIndex: "user_id",
      key: "user_id",
      render: (id) => users.find((u) => u.id === id)?.name || "Không rõ",
    },
    {
      title: "Nhà hàng",
      dataIndex: "restaurant_id",
      key: "restaurant_id",
      render: (id) => restaurants.find((r) => r.id === id)?.name || "Không rõ",
    },
    { title: "Giá", dataIndex: "price", key: "price" },
    { title: "Phí vận chuyển", dataIndex: "ship", key: "ship" },
    { title: "Tổng tiền", dataIndex: "total_amount", key: "total_amount" },
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
          Thêm đơn hàng
        </Button>
      </div>
      <Table dataSource={orderData} columns={columns} rowKey="id" />
      <Modal
        title={currentOrder ? "Sửa đơn hàng" : "Thêm đơn hàng"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={currentOrder} onFinish={handleAddOrUpdateOrder}>
          <Form.Item
            name="user_id"
            label="Người dùng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="restaurant_id"
            label="Nhà hàng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="ship"
            label="Phí vận chuyển"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="total_amount"
            label="Tổng tiền"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {currentOrder ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderManagement;
