import React, { useEffect, useState } from "react";
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
import RestaurantAPI from "../../API/RestaurantAPI";


const { Title, Text } = Typography;


const InforManagement = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [infoData, setInfoData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    opening_hours: "",
  });


  const idUser = localStorage.getItem('userId');


  const getItem = async () => {
    const res = RestaurantAPI.Get_Item_Owner(idUser);
    return res;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItem();
          setInfoData(data);
          form.setFieldsValue(data);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    console.log(infoData);
    form.setFieldsValue(infoData);
  }, [form, infoData]);


  const handleUpdate = (values) => {
      setInfoData(values);
      const res = RestaurantAPI.Put(infoData);
    };


  return (
    <div className="info-management-container">
      <Card className="info-card">
        <Form
          form={form}
          onFinish={handleUpdate}
          initialValues={infoData}
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
                <Input defaultValue={infoData['name']} />
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
                <Input defaultValue={infoData['phone']} />
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
                <Input defaultValue={infoData['address']} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <Text strong style={{ color: "#ff69b4", fontSize: "18px" }}>
                    Giờ mở cửa:
                  </Text>
                }
                name="opening_hours"
              >
                <Input defaultValue={infoData['opening_hours']} />
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



