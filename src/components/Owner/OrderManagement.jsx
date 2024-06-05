import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Row, Col } from "antd";
import { orders, users, restaurants } from "../../data/fakeData";
import "../../styles/styles.css";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const [orderData, setOrderData] = useState(orders);
  const [filteredData, setFilteredData] = useState(orders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [dates, setDates] = useState([]);

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
    setFilteredData(orderData);
    setIsModalVisible(false);
  };

  const handleDeleteOrder = (id) => {
    setOrderData(orderData.filter((order) => order.id !== id));
    setFilteredData(orderData.filter((order) => order.id !== id));
  };

  const showModal = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentOrder(null);
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = orderData.filter((order) => {
        const createdAt = moment(order.createdAt);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setFilteredData(filtered);
    }
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
        <div className="action-buttons">
          <Button
            className="pink-button"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Button
            className="pink-button"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteOrder(record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="owner-container">
      <Row className="button-container" gutter={[16, 16]}>
        <Col>
          <Button
            className="pink-button"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal(null)}
          >
            Thêm đơn hàng
          </Button>
        </Col>
        <Col>
          <DatePicker
            placeholder="Từ ngày"
            onChange={(date) => handleDateChange([date, dates[1]])}
          />
        </Col>
        <Col>
          <DatePicker
            placeholder="Đến ngày"
            onChange={(date) => handleDateChange([dates[0], date])}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchByDate}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
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
