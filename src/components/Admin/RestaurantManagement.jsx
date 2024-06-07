import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Row, Col } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { restaurants } from "../../data/fakeData";
import "../../styles/styles.css";
import RestaurantAPI from "../../API/RestaurantAPI";
import UserAPI from "../../API/UserAPI";
import moment from "moment";

const { RangePicker } = DatePicker;

const RestaurantManagement = () => {
  const [form] = Form.useForm();
  const [restaurantData, setRestaurantData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateDetails, setStateDetails] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    opening_hours: "",
    owner_name: "",
    user_id: "",
  });
  const [rowSelected, setRowSelected] = useState("");
  const [dates, setDates] = useState([]);

  const getAllRestaurants = async () => {
    const res = RestaurantAPI.Get_All();
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRestaurants();
        const modifiedData = [];
        for (const restaurant of data) {
          const user = await UserAPI.Get_User(restaurant.user_id);
          modifiedData.push({
            ...restaurant,
            owner_name: user?.name,
            user_id: user?.id,
          });
        }
        setRestaurantData(modifiedData);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const fetchGetDetailsRestaurant = async (rowSelected) => {
    const response = await RestaurantAPI.Get_Item(rowSelected);
    const user = await UserAPI.Get_User(response.user_id);
    setStateDetails({
      id: response?.id,
      name: response?.name,
      phone: response?.phone,
      address: response?.address,
      opening_hours: response?.opening_hours,
      owner_name: user?.name,
      user_id: response?.user_id,
    });
  };

  useEffect(() => {
    if (rowSelected && isModalVisible) {
      fetchGetDetailsRestaurant(rowSelected);
    }
  }, [rowSelected, isModalVisible]);

  useEffect(() => {
    form.setFieldsValue(stateDetails);
  }, [form, stateDetails, rowSelected]);

  const handleAddOrUpdateRestaurant = async () => {
    if (rowSelected) {
      const res = await RestaurantAPI.Put(stateDetails);
      if (res.status === "SUCCESS") {
        handleCancel();
      }
    }
  };

  const handleDeleteRestaurant = async () => {
    const res = await RestaurantAPI.Delete(rowSelected);
    if (res.status === "SUCCESS") {
      handleCancel();
    }
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = restaurantData.filter((restaurant) => {
        const createdAt = moment(restaurant.created_at);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setRestaurantData(filtered);
    } 
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setStateDetails({
      id: "",
      name: "",
      phone: "",
      address: "",
      opening_hours: "",
      owner_name: "",
      user_id: "",
    });
    form.resetFields();
    setRowSelected("");
  };

  const handleOnchangeDetails = (e) => {
    setStateDetails({
      ...stateDetails,
      [e.target.name]: e.target.value,
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
    { title: "Tên", dataIndex: "name", key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
     },
    { title: "Địa chỉ", dataIndex: "address", key: "address",
      ...getColumnSearchProps("address"),
     },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone",
      ...getColumnSearchProps("phone"),
     },
    { title: "Giờ mở cửa", dataIndex: "opening_hours", key: "opening_hours",
      ...getColumnSearchProps("opening_hours"),
     },
    { title: "Tên chủ quán", dataIndex: "owner_name", key: "owner_name",
      sorter: (a, b) => a.owner_name.length - b.owner_name.length,
      ...getColumnSearchProps("owner_name"),
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
            onClick={() => handleDeleteRestaurant()}
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
        dataSource={restaurantData}
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
        title={rowSelected ? "Sửa nhà hàng" : "Thêm nhà hàng"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={handleAddOrUpdateRestaurant}
          form={form}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input
              value={stateDetails.name}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input
              value={stateDetails.address}
              onChange={handleOnchangeDetails}
              name="address"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input
              value={stateDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>
          <Form.Item
            name="opening_hours"
            label="Giờ mở cửa"
            rules={[{ required: true }]}
          >
            <Input
              value={stateDetails.opening_hours}
              onChange={handleOnchangeDetails}
              name="opening_hours"
            />
          </Form.Item>
          <Form.Item
            name="owner_name"
            label="Tên chủ quán"
            rules={[{ required: true }]}
          >
            <Input
              value={stateDetails.owner_name}
              onChange={handleOnchangeDetails}
              name="owner_name"
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

export default RestaurantManagement;
