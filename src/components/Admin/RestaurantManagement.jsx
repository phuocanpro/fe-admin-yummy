import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { restaurants } from "../../data/fakeData";
import "../../styles/styles.css";
import RestaurantAPI from "../../API/RestaurantAPI";
import UserAPI from "../../API/UserAPI";

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
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
            user_id: user?.id
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
    console.log("row",rowSelected );
    if (rowSelected && isModalVisible) {
      fetchGetDetailsRestaurant(rowSelected);
    }
  }, [rowSelected, isModalVisible]);

  useEffect(() => {
    form.setFieldsValue(stateDetails);
    console.log("detail", stateDetails);
    console.log("rowSelected", rowSelected);
  }, [form, stateDetails, rowSelected]);

  const handleAddOrUpdateRestaurant = async () => {
    if (rowSelected) {
      const res = await RestaurantAPI.Put(stateDetails);
      if (res.status === "SUCCESS") {
        // message.success("Success");
        handleCancel();
      } else {
        // message.error("Error");
      }
    } else {

    }
  };

  const handleDeleteRestaurant = async () => {
    const res = await RestaurantAPI.Delete(rowSelected);
    if (res.status === "SUCCESS") {
      // message.success("Success");
      handleCancel();
    } else {
      // message.error("Error");
    }
  };

  const handleOnchangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        const res = await RestaurantAPI.Search(searchValue);
        if (res.status === "success") {
          setRestaurantData([]);
        } else if (res.status === "error") {
          const data = getAllRestaurants();
          setRestaurantData(Array.from(data));
          setLoading(false);
        } else {
          setRestaurantData(Array.from(res));
          setLoading(false);
        }
      } catch (err) {
        setError("Đã có lỗi xảy ra");
      }
    };

    if (searchValue.trim() !== "") {
      handleSearch();
    } else {
      const data = getAllRestaurants();
      setRestaurantData(Array.from(data));
    }
  }, [searchValue]);



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

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Giờ mở cửa", dataIndex: "opening_hours", key: "opening_hours" },
    { title: "Tên chủ quán", dataIndex: "owner_name", key: "owner_name" },
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
      {/* <div className="button-container">
        <Button
          className="pink-button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Thêm nhà hàng
        </Button>
      </div> */}
      <Input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        value={searchValue}
        onChange={handleOnchangeSearch}
      />
      {loading ? (
        <div>Đang tìm kiếm...</div>
      ) : (
        <div>{error}</div>
      )}
      <br />
      <Table dataSource={restaurantData} columns={columns} rowKey="id" onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            setRowSelected(record.id);
          },
        };
      }} />
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
            <Input value={stateDetails.name}
              onChange={handleOnchangeDetails}
              name="name" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input value={stateDetails.address}
              onChange={handleOnchangeDetails}
              name="address" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input value={stateDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone" />
          </Form.Item>
          <Form.Item
            name="opening_hours"
            label="Giờ mở cửa"
            rules={[{ required: true }]}
          >
            <Input value={stateDetails.opening_hours}
              onChange={handleOnchangeDetails}
              name="opening_hours" />
          </Form.Item>
          <Form.Item
            name="owner_name"
            label="Tên chủ quán"
            rules={[{ required: true }]}
          >
            <Input value={stateDetails.owner_name}
              onChange={handleOnchangeDetails}
              name="owner_name" />
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
