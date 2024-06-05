import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
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
import moment from "moment";
import { restaurants } from "../../data/fakeData";
import "../../styles/styles.css";

const { RangePicker } = DatePicker;

const InforManagement = () => {
  const [infoData, setInfoData] = useState(restaurants);
  const [filteredData, setFilteredData] = useState(restaurants);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(null);
  const [dates, setDates] = useState([]);

  const handleAddOrUpdateInfo = (values) => {
    const formattedValues = {
      ...values,
      opening_hours: [
        values.opening_hours[0].format("HH:mm"),
        values.opening_hours[1].format("HH:mm"),
      ].join(" - "),
    };

    if (currentInfo) {
      setInfoData(
        infoData.map((info) =>
          info.id === currentInfo.id ? { ...info, ...formattedValues } : info
        )
      );
    } else {
      setInfoData([
        ...infoData,
        { ...formattedValues, id: infoData.length + 1 },
      ]);
    }
    setFilteredData(infoData);
    setIsModalVisible(false);
  };

  const handleDeleteInfo = (id) => {
    setInfoData(infoData.filter((info) => info.id !== id));
    setFilteredData(infoData.filter((info) => info.id !== id));
  };

  const showModal = (info) => {
    setCurrentInfo(info);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentInfo(null);
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearch = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = infoData.filter((info) => {
        const createdAt = moment(info.createdAt);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(infoData);
    }
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Giờ mở cửa",
      dataIndex: "opening_hours",
      key: "opening_hours",
      render: (text) =>
        text
          .split(" - ")
          .map((time) => moment(time, "HH:mm").format("HH:mm"))
          .join(" - "),
    },
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
            onClick={() => handleDeleteInfo(record.id)}
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
            Thêm thông tin
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
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      <Modal
        title={currentInfo ? "Sửa thông tin" : "Thêm thông tin"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={currentInfo} onFinish={handleAddOrUpdateInfo}>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="opening_hours"
            label="Giờ mở cửa"
            rules={[{ required: true, message: "Vui lòng nhập giờ mở cửa" }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {currentInfo ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default InforManagement;
