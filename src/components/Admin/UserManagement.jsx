import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Row, Col } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { users } from "../../data/fakeData";
import "../../styles/styles.css";
import UserAPI from "../../API/UserAPI";
import moment from "moment";

const { RangePicker } = DatePicker;

const UserManagement = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    level: "",
    coin: "",
  });
  const [rowSelected, setRowSelected] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([]);

  const getAllUsers = async () => {
    const res = UserAPI.Get_All_User();
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUserData(Array.from(usersData));
        setFilteredData(Array.from(usersData));
      } catch (error) {
        // Handle error
        console.log("err", error);
      }
    };
    fetchData();
  }, [isModalVisible]);

  const handleDetailsUsers = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (rowSelected && isModalVisible) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isModalVisible]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails, rowSelected]);

  const fetchGetDetailsUser = async (rowSelected) => {
    const response = await UserAPI.Get_User(rowSelected);
    setStateUserDetails({
      id: response?.id,
      name: response?.name,
      email: response?.email,
      password: response?.password,
      role: response?.role,
      phone: response?.phone,
      address: response?.address,
      level: response?.level,
      coin: response?.coin,
    });
  };

  const handleAddOrUpdateUser = async () => {
    const res = await UserAPI.Put_User(stateUserDetails);
    if (res.status === "SUCCESS") {
      handleCancel();
    } else {
      // handle error
    }
  };

  const handleDeleteUser = async () => {
    const res = await UserAPI.Delete(rowSelected);
    if (res.status === "SUCCESS") {
      handleCancel();
    } else {
      // handle error
    }
  };

  const handleOnchangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = userData.filter((user) => {
        const createdAt = moment(user.createdAt);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(userData);
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        const res = await UserAPI.Search(searchValue);
        if (res.status === "success") {
          setUserData([]);
        } else if (res.status === "error") {
          const usersData = getAllUsers();
          setUserData(Array.from(usersData));
          setLoading(false);
        } else {
          setUserData(Array.from(res));
          setLoading(false);
        }
      } catch (err) {
        setError("Đã có lỗi xảy ra");
      }
    };

    if (searchValue.trim() !== "") {
      handleSearch();
    } else {
      const usersData = getAllUsers();
      setUserData(Array.from(usersData));
    }
  }, [searchValue]);

  const handleCancel = () => {
    setIsModalVisible(false);
    setStateUserDetails({
      id: "",
      name: "",
      email: "",
      role: "",
      phone: "",
      address: "",
      level: "",
      coin: "",
    });
    form.resetFields();
    setRowSelected("");
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Cấp độ", dataIndex: "level", key: "level" },
    { title: "Số xu", dataIndex: "coin", key: "coin" },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button
            className="pink-button"
            icon={<EditOutlined />}
            onClick={handleDetailsUsers}
          >
            Sửa
          </Button>
          <Button
            className="pink-button"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser()}
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
            onClick={() => setIsModalVisible(true)}
          >
            Thêm người dùng
          </Button>
        </Col>
        <Col>
          <Input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm"
            value={searchValue}
            onChange={handleOnchangeSearch}
          />
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
      {loading ? <div>Đang tìm kiếm...</div> : <div>{error}</div>}
      <br />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record.id);
            },
          };
        }}
      />
      <Modal
        title={rowSelected ? "Sửa người dùng" : "Thêm người dùng"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={handleAddOrUpdateUser}
          form={form}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input
              value={stateUserDetails.name}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input
              value={stateUserDetails.email}
              onChange={handleOnchangeDetails}
              name="email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input
              value={stateUserDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input
              value={stateUserDetails.address}
              onChange={handleOnchangeDetails}
              name="address"
            />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Input
              value={stateUserDetails.role}
              onChange={handleOnchangeDetails}
              name="role"
            />
          </Form.Item>
          <Form.Item name="level" label="Cấp độ" rules={[{ required: true }]}>
            <Input
              value={stateUserDetails.level}
              onChange={handleOnchangeDetails}
              name="level"
            />
          </Form.Item>
          <Form.Item name="coin" label="Số xu" rules={[{ required: true }]}>
            <Input
              value={stateUserDetails.coin}
              onChange={handleOnchangeDetails}
              name="coin"
            />
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {rowSelected ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
