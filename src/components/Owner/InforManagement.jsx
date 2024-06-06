import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Typography,
  Card,
  TimePicker,
} from "antd";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import { restaurants } from "../../data/fakeData";
import "../../styles/styles.css";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const InforManagement = () => {
  const [form] = Form.useForm();
  const [infoData, setInfoData] = useState(restaurants[0]);
  const [dates, setDates] = useState([]);

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearch = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
    }
  };

  const handleUpdate = (values) => {
    setInfoData({
      ...infoData,
      ...values,
      opening_hours:
        values.opening_hours.format("HH:mm") +
        " - " +
        values.closing_hours.format("HH:mm"),
    });
  };

  return (
    <div className="info-management-container">
      <Row
        className="button-container"
        gutter={[16, 16]}
        style={{ marginBottom: "32px" }}
      >
        <Col span={10}>
          <DatePicker
            placeholder="Từ ngày"
            onChange={(date) => handleDateChange([date, dates[1]])}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={10}>
          <DatePicker
            placeholder="Đến ngày"
            onChange={(date) => handleDateChange([dates[0], date])}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            style={{ width: "100%" }}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Card className="info-card">
        <Form
          form={form}
          onFinish={handleUpdate}
          initialValues={{
            ...infoData,
            opening_hours: moment(
              infoData.opening_hours.split(" - ")[0],
              "HH:mm"
            ),
            closing_hours: moment(
              infoData.opening_hours.split(" - ")[1],
              "HH:mm"
            ),
          }}
        >
          <Title
            level={2}
            style={{ color: "#ff69b4", marginTop: "0", marginBottom: "24px" }}
          >
            Thông tin nhà hàng
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label={
                  <Text strong style={{ color: "#ff69b4", fontSize: "18px" }}>
                    Tên nhà hàng:
                  </Text>
                }
                name="name"
              >
                <Input defaultValue={infoData.name} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <Text strong style={{ color: "#ff69b4", fontSize: "18px" }}>
                    Số điện thoại:
                  </Text>
                }
                name="phone"
              >
                <Input defaultValue={infoData.phone} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <Text strong style={{ color: "#ff69b4", fontSize: "18px" }}>
                    Địa chỉ:
                  </Text>
                }
                name="address"
              >
                <Input defaultValue={infoData.address} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <Text strong style={{ color: "#ff69b4", fontSize: "18px" }}>
                    Giờ mở cửa:
                  </Text>
                }
              >
                <Input.Group compact>
                  <Form.Item name="opening_hours" noStyle>
                    <TimePicker format="HH:mm" style={{ width: "50%" }} />
                  </Form.Item>
                  <Form.Item name="closing_hours" noStyle>
                    <TimePicker format="HH:mm" style={{ width: "50%" }} />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#ff69b4",
                  borderColor: "#ff69b4",
                  width: "150px",
                  fontSize: "18px",
                  height: "45px",
                }}
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default InforManagement;
