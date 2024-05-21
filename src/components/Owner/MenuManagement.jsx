import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { dishes, restaurants } from "../../data/fakeData";
import "../../styles/styles.css";

const MenuManagement = () => {
  const [dishData, setDishData] = useState(dishes);
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

  const showModal = (dish) => {
    setCurrentDish(dish);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentDish(null);
  };

  const columns = [
    { title: "Tên món", dataIndex: "name", key: "name" },
    {
      title: "Nhà hàng",
      dataIndex: "restaurant_id",
      key: "restaurant_id",
      render: (id) => restaurants.find((r) => r.id === id)?.name || "Không rõ",
    },
    { title: "Giá", dataIndex: "price", key: "price" },
    { title: "Đánh giá", dataIndex: "rate", key: "rate" },
    { title: "Loại", dataIndex: "type", key: "type" },
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
          Thêm món
        </Button>
      </div>
      <Table dataSource={dishData} columns={columns} rowKey="id" />
      <Modal
        title={currentDish ? "Sửa món" : "Thêm món"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={currentDish} onFinish={handleAddOrUpdateDish}>
          <Form.Item name="name" label="Tên món" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="restaurant_id"
            label="Nhà hàng"
            rules={[{ required: true }]}
          >
            <Select>
              {restaurants.map((r) => (
                <Select.Option key={r.id} value={r.id}>
                  {r.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="rate" label="Đánh giá" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Món chính">Món chính</Select.Option>
              <Select.Option value="Món thêm">Món thêm</Select.Option>
              <Select.Option value="Đồ uống">Đồ uống</Select.Option>
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

export default MenuManagement;
