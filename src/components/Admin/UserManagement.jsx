import React, { useEffect, useRef, useState } from "react";
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
  });
  const [rowSelected, setRowSelected] = useState("");

  const [dates, setDates] = useState([]);

  const getAllUsers = async () => {
    const res = UserAPI.Get_All_User();
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUserData(data);
      } catch (error) {
        // Handle error
        console.log("err", error);
      }
    };
    fetchData();
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

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
    });
  };


  useEffect(() => {
    if (rowSelected && isModalVisible) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isModalVisible]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails, rowSelected]);

  // const handleDetailsUsers = () => {
  //   setIsModalVisible(true);
  // };

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


  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = userData.filter((user) => {
        const createdAt = moment(user.created_at);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setUserData(filtered);
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setStateUserDetails({
      id: "",
      name: "",
      email: "",
      role: "",
      phone: "",
      address: "",
    });
    form.resetFields();
    setRowSelected("");
  };

  const handleOnchangeDetails = (name, value) => {
    setStateUserDetails({
      ...stateUserDetails,
      [name]: value,
    });
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    { title: "Tên", 
      dataIndex: "name",
       key: "name",
       sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    { title: "Email", dataIndex: "email", key: "email" ,
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone",
      ...getColumnSearchProps("phone")
    },
    { title: "Địa chỉ", dataIndex: "address", key: "address",
      ...getColumnSearchProps("address")
     },
    { title: "Vai trò", dataIndex: "role", key: "role",
      ...getColumnSearchProps("role")
     },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button
            className="pink-button"
            icon={<EditOutlined />}
            onClick={showModal}
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
  
      <Table
        dataSource={userData}
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
        title={"Thêm người dùng"}
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
              onChange={(e) => handleOnchangeDetails("name", e.target.value)}
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
              onChange={(e) => handleOnchangeDetails("email", e.target.value)}
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
              onChange={(e) => handleOnchangeDetails("phone", e.target.value)}
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
              onChange={(e) => handleOnchangeDetails("address", e.target.value)}
              name="address"
            />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Input
              value={stateUserDetails.role}
              onChange={(e) => handleOnchangeDetails("role", e.target.value)}
              name="role"
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
