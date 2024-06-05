import React, { useEffect, useState } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([]);

  const getAllDishes = async () => {
    const res = DishAPI.Get_All();
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDishes();
        setDishData(data);
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
      if (res.status === "SUCCESS") {
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
      if (res.status === "SUCCESS") {
        handleCancel();
      }
    }
  };

  const handleDeleteDish = async () => {
    const res = await RestaurantAPI.Delete(rowSelected);
    if (res.status === "SUCCESS") {
      handleCancel();
    }
  };

  const handleOnchangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        const res = await DishAPI.Search(searchValue);
        if (res.status === "success") {
          setDishData([]);
        } else if (res.status === "error") {
          const data = getAllDishes();
          setDishData(Array.from(data));
          setLoading(false);
        } else {
          setDishData(Array.from(res));
          setLoading(false);
        }
      } catch (err) {
        setError("Đã có lỗi xảy ra");
      }
    };

    if (searchValue.trim() !== "") {
      handleSearch();
    } else {
      const data = getAllDishes();
      setDishData(Array.from(data));
    }
  }, [searchValue]);

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = dishData.filter((dish) => {
        const createdAt = moment(dish.createdAt);
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

  const columns = [
    { title: "Tên món", dataIndex: "name", key: "name" },
    { title: "Giá", dataIndex: "price", key: "price" },
    { title: "Đánh giá", dataIndex: "rate", key: "rate" },
    { title: "Loại", dataIndex: "type", key: "type" },
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