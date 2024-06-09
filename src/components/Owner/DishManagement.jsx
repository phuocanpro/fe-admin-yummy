import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { dishes } from "../../data/fakeData";
import DishAPI from "../../API/DishAPI";
import "../../styles/styles.css";
import RestaurantAPI from "../../API/RestaurantAPI";
import { getBase64 } from "./util";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const DishManagement = () => {
  const [form] = Form.useForm();
  const [dishData, setDishData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateDetails, setStateDetails] = useState({
    id: "",
    restaurant_id: "",
    name: "",
    img: "",
    price: "",
    rate: "",
    type: "",
  });
  const [rowSelected, setRowSelected] = useState("");
  const [dates, setDates] = useState([]);

  const idUser = localStorage.getItem('userId');

  const getAllDishes = async () => {
    console.log(idUser);
    const res = DishAPI.Get_All(idUser);
    console.log("res", res);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDishes();
        if (data) {
          setDishData(data);
        }
      
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const fetchGetDetailsDish = async (rowSelected) => {
    const response = await DishAPI.Get_Item(rowSelected);
    setStateDetails({
      id: response?.id,
      name: response?.name,
      img: response?.img,
      price: response?.price,
      rate: response?.rate,
      type: response?.type,
    });
  };

  useEffect(() => {
    if (rowSelected && isModalVisible) {
      fetchGetDetailsDish(rowSelected);
    }
  }, [rowSelected, isModalVisible]);

  useEffect(() => {
    form.setFieldsValue(stateDetails);
  }, [form, stateDetails, rowSelected]);

  const handleAddOrUpdateDish = async () => {
    if (rowSelected) {
      const res = await DishAPI.Put(stateDetails);
      if (res.status === "success") {
        console.log("dong");
        handleCancel();
      }
    } else {
      const idUser = localStorage.getItem("userId");
      const restaurant = await RestaurantAPI.SearchColumn("user_id", idUser);
      setStateDetails({
        ...stateDetails,
        restaurant_id: restaurant[0].id,
      });
      const res = await DishAPI.Create(stateDetails);
      if (res.status === "success") {
        handleCancel();
      }
    }
  };

  const handleDeleteDish = async () => {
    const res = await DishAPI.Delete(rowSelected);
    
    if (res.status === "success") {
      setRowSelected("");
      handleCancel();
    }
  };


  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = dishData.filter((dish) => {
        const createdAt = moment(dish.created_at);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setDishData(filtered);
      
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setStateDetails({
      id: "",
      name: "",
      img: "",
      price: "",
      rate: "",
      type: "",
      restaurant_id: "",
    });
    form.resetFields();
    setRowSelected("");
  };

  const handleOnchangeDetails = (name, value) => {
    setStateDetails({
      ...stateDetails,
      [name]: value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateDetails({
      ...stateDetails,
      img: file.preview,
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
    {
      title: "Tên món",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
      key: "name"
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps("price"),
      key: "price"
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      sorter: (a, b) => a.rate - b.rate,
      ...getColumnSearchProps("rate"),
      key: "rate"
    },
    {
      title: "Loại",
      dataIndex: "type",
      ...getColumnSearchProps("type"),
      key: "type"
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
            onClick={() => handleDeleteDish()}
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
            onClick={showModal}
          >
            Thêm món
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
    
      <Table
        dataSource={dishData}
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
        title={rowSelected ? "Sửa món" : "Thêm món"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={handleAddOrUpdateDish}
          form={form}
        >
          <Form.Item name="name" label="Tên món" rules={[{ required: true }]}>
            <Input
              value={stateDetails.name}
              onChange={(e) => handleOnchangeDetails("name", e.target.value)}
              name="name"
            />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <Input
              value={stateDetails.price}
              onChange={(e) => handleOnchangeDetails("price", e.target.value)}
              name="price"
            />
          </Form.Item>
          <Form.Item name="rate" label="Đánh giá" rules={[{ required: true }]}>
            <Input
              value={stateDetails.rate}
              onChange={(e) => handleOnchangeDetails("rate", e.target.value)}
              name="rate"
            />
          </Form.Item>
          <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
            <Select
              value={stateDetails.type}
              onChange={(value) => handleOnchangeDetails("type", value)}
              name="type"
            >
              <Select.Option value="Món chính">Món chính</Select.Option>
              <Select.Option value="Món thêm">Món thêm</Select.Option>
              <Select.Option value="Đồ uống">Đồ uống</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Img"
            name="img"
            rules={[{ required: true, message: "Please input image!" }]}
          >
            <Upload onChange={handleOnchangeAvatar} maxCount={1}>
              <Button type="button">Select File</Button>
              {stateDetails?.img && (
                <img
                  src={stateDetails?.img}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="dish"
                />
              )}
            </Upload>
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {rowSelected ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default DishManagement;
