import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { users } from "../../data/fakeData";
import "../../styles/styles.css";

const UserManagement = () => {
  const [userData, setUserData] = useState(users);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddOrUpdateUser = (values) => {
    if (currentUser) {
      setUserData(
        userData.map((user) =>
          user.id === currentUser.id ? { ...user, ...values } : user
        )
      );
    } else {
      setUserData([...userData, { ...values, id: userData.length + 1 }]);
    }
    setIsModalVisible(false);
  };

  const handleDeleteUser = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  const showModal = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
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
            onClick={() => handleDeleteUser(record.id)}
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
          Thêm người dùng
        </Button>
      </div>
      <Table dataSource={userData} columns={columns} rowKey="id" />
      <Modal
        title={currentUser ? "Sửa người dùng" : "Thêm người dùng"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={currentUser} onFinish={handleAddOrUpdateUser}>
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
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
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="admin">Quản trị viên</Select.Option>
              <Select.Option value="user">Người dùng</Select.Option>
              <Select.Option value="restaurant">Nhà hàng</Select.Option>
            </Select>
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {currentUser ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
