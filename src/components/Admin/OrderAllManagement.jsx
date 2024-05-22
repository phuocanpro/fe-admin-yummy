import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Rate,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { dishes, restaurants } from "../../data/fakeData";
import "../../styles/styles.css";

const OrderAllManagement = () => {
  const [dishData, setDishData] = useState(dishes);
  // const [orderData, setOrderData] = useState(orders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);

  const handleAddOrUpdateDish = (values) => {
    if (currentDish) {
      setDishData(
        dishData.map((dish) =>
          dish.id === currentDish.id ? { ...dish, ...values } : dish
        )
      );
    } else {
      setDishData([...dishData, { ...values, id: dishData.length + 1 }]);
    }
    setIsModalVisible(false);
  };

  const handleDeleteDish = (id) => {
    setDishData(dishData.filter((dish) => dish.id !== id));
  };

  const showModal = (dish) => {
    setCurrentDish(dish);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentDish(null);
  };

  const columns = [
    { title: "Tên Món", dataIndex: "name", key: "name" },
    {
      title: "Nhà Hàng",
      dataIndex: "restaurant_id",
      key: "restaurant_id",
      render: (id) => restaurants.find((r) => r.id === id)?.name || "Không rõ",
    },
    { title: "Giá", dataIndex: "price", key: "price" },
    {
      title: "Đánh Giá",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => <Rate disabled defaultValue={rate} />,
    },
    { title: "Loại", dataIndex: "type", key: "type" },
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
            onClick={() => handleDeleteDish(record.id)}
          >
            Xóa
          </Button>
        </div>
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
          Thêm món ăn
        </Button>
      </div>
      <Table dataSource={dishData} columns={columns} rowKey="id" />
      <Modal
        title={currentDish ? "Sửa món ăn" : "Thêm món ăn"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={currentDish} onFinish={handleAddOrUpdateDish}>
          <Form.Item name="name" label="Tên Món" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="restaurant_id"
            label="Nhà Hàng"
            rules={[{ required: true }]}
          >
            <Select>
              {restaurants.map((restaurant) => (
                <Select.Option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="rate" label="Đánh Giá" rules={[{ required: true }]}>
            <Rate />
          </Form.Item>
          <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Chính">Chính</Select.Option>
              <Select.Option value="Khai Vị">Khai Vị</Select.Option>
              <Select.Option value="Tráng Miệng">Tráng Miệng</Select.Option>
            </Select>
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {currentDish ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderAllManagement;
