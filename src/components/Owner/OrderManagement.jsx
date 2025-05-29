import React, { useState, useEffect } from "react";
import { Table, Button, DatePicker, Row, Col, Typography, Card } from "antd";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import firebase from '@firebase/app';
import "firebase/firestore";
import RestaurantAPI from "../../API/RestaurantAPI";

const { Text } = Typography;

const OrderManagement = () => {
  const [status, setStatus] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [rowSelected, setRowSelected] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [length1, setLength1] = useState("");
  const [length2, setLength2] = useState("");
  const [length3, setLength3] = useState("");
  const [length4, setLength4] = useState("");
  const [infoData, setInfoData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    opening_hours: "",
    method: "",
  });
  const db = firebase.firestore();
  const idUser = localStorage.getItem('userId');

  const getItem = async () => {
    const res = await RestaurantAPI.Get_Item_Owner(idUser);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItem();
        setInfoData(data);
      } catch (error) {
        console.log("err", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!infoData.id) return; // chỉ fetch khi có id res
    fetchWait();
    fetchProcess();
    fetchFinish();
    fetchDelivery();

    const unsubscribe = db.collection('wait').onSnapshot(() => {
      fetchWait();
      fetchProcess();
      fetchFinish();
      fetchDelivery();
    });

    return () => unsubscribe();
  }, [infoData.id]);

  // Hàm chuyển trạng thái tiếp theo
  const nextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'Chưa xử lý': return 'Đang xử lý';
      case 'Đang xử lý': return 'Đang giao';
      case 'Đang giao': return 'Hoàn thành';
      default: return '';
    }
  };

  const updateOrderStatus = async (id, status) => {
    if (!id || !status) return;

    try {
      setLoadingUpdate(true);
      const orderRef = db.collection('wait').doc(id.toString());
      await orderRef.update({ status });

      // Reload lại dữ liệu theo trạng thái mới
      switch (status) {
        case 'Chưa xử lý':
          await fetchWait();
          break;
        case 'Đang xử lý':
          await fetchProcess();
          break;
        case 'Đang giao':
          await fetchDelivery();
          break;
        case 'Hoàn thành':
          await fetchFinish();
          break;
        default:
          await fetchWait();
      }

      setRowSelected("");
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const fetchFinish = async () => {
    if (!infoData.id) return;
    const data = await db.collection('wait')
      .where('status', '==', 'Hoàn thành')
      .where('res_id', '==', infoData.id)
      .get();

    setOrderData(data.docs.map(doc => ({
      id: doc.id,
      customer: {
        name: doc.data().customer.name,
        address: doc.data().customer.address,
      },
      status: doc.data().status,
      total: doc.data().total,
      order_id: doc.data().order_id,
      dishes: doc.data().dishes.map(dish => ({
        name: dish.name,
        options: dish.options,
        price: dish.price,
        quantity: dish.quantity
      })),
      method: doc.data().method === 0 ? "Tiền mặt" : "Trực tuyến"
    })));
    setLength4(data.docs.length);
  };

  const fetchWait = async () => {
    if (!infoData.id) return;
    const data = await db.collection('wait')
      .where('status', '==', 'Chưa xử lý')
      .where('res_id', '==', infoData.id)
      .get();

    setOrderData(data.docs.map(doc => ({
      id: doc.id,
      customer: {
        name: doc.data().customer.name,
        address: doc.data().customer.address,
      },
      status: doc.data().status,
      total: doc.data().total,
      order_id: doc.data().order_id,
      dishes: doc.data().dishes.map(dish => ({
        name: dish.name,
        options: dish.options,
        price: dish.price,
        quantity: dish.quantity
      })),
      method: doc.data().method === 0 ? "Tiền mặt" : "Trực tuyến"
    })));
    setLength1(data.docs.length);
  };

  const fetchProcess = async () => {
    if (!infoData.id) return;
    const data = await db.collection('wait')
      .where('status', '==', 'Đang xử lý')
      .where('res_id', '==', infoData.id)
      .get();

    setOrderData(data.docs.map(doc => ({
      id: doc.id,
      customer: {
        name: doc.data().customer.name,
        address: doc.data().customer.address,
      },
      status: doc.data().status,
      total: doc.data().total,
      order_id: doc.data().order_id,
      dishes: doc.data().dishes.map(dish => ({
        name: dish.name,
        options: dish.options,
        price: dish.price,
        quantity: dish.quantity
      })),
      method: doc.data().method === 0 ? "Tiền mặt" : "Trực tuyến"
    })));
    setLength2(data.docs.length);
  };

  const fetchDelivery = async () => {
    if (!infoData.id) return;
    const data = await db.collection('wait')
      .where('status', '==', 'Đang giao')
      .where('res_id', '==', infoData.id)
      .get();

    setOrderData(data.docs.map(doc => ({
      id: doc.id,
      customer: {
        name: doc.data().customer.name,
        address: doc.data().customer.address,
      },
      status: doc.data().status,
      total: doc.data().total,
      order_id: doc.data().order_id,
      dishes: doc.data().dishes.map(dish => ({
        name: dish.name,
        options: dish.options,
        price: dish.price,
        quantity: dish.quantity
      })),
      method: doc.data().method === 0 ? "Tiền mặt" : "Trực tuyến"
    })));
    setLength3(data.docs.length);
  };

  const columns = [
    { title: "ID", dataIndex: "order_id", key: "order_id", width: '5%' },
    {
      title: "Khách Hàng", dataIndex: "customer", key: "customer",
      render: (text, record) => (
        <div style={{ marginBottom: "5px" }}>
          <p><strong>Tên khách hàng:</strong> {record.customer.name}</p>
          <p><strong>Địa chỉ:</strong> {record.customer.address}</p>
        </div>
      ),
      width: '35%'
    },
    {
      title: "Tổng Tiền", dataIndex: "total", key: "total", width: '5%'
    },
    {
      title: "Phương thức", dataIndex: "method", key: "method", width: '5%'
    },
    {
      title: "Các món ăn", dataIndex: "dishes", key: "dishes",
      render: dishes => (
        <ul>
          {dishes.map((dish, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              <p><strong>Tên món:</strong> {dish.name}</p>
              <p><strong>Giá:</strong> {dish.price}</p>
              <p><strong>Số lượng:</strong> {dish.quantity}</p>
              <p><strong>Ghi chú:</strong> {dish.options}</p>
              <br />
            </div>
          ))}
        </ul>
      ),
      width: '30%'
    },
    {
      title: "Hành động", key: "actions",
      render: (text, record) => (
        <Button
          className="confirm-button"
          icon={<CheckOutlined />}
          loading={loadingUpdate && rowSelected === record.id}
          onClick={() => {
            const next = nextStatus(record.status);
            if (!next) return;
            setStatus(next);
            setRowSelected(record.id);
            updateOrderStatus(record.id, next);
          }}
        >
          Xác nhận
        </Button>
      ),
      width: '10%'
    },
  ];

  return (
    <div className="owner-container1">
      <Row className="date-container" gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        {/* DatePicker và Search button (giữ nguyên nếu không thay đổi) */}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
        <Col span={6}>
          <Card className="status-card" onClick={() => fetchWait()}>
            <Text className="status-title">Chưa tiếp nhận</Text>
            <Text className="status-count">{length1 && `${length1} đơn hàng`}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card" onClick={() => fetchProcess()}>
            <Text className="status-title">Đang tiếp nhận</Text>
            <Text className="status-count">{length2 && `${length2} đơn hàng`}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card" onClick={() => fetchDelivery()}>
            <Text className="status-title">Đang giao</Text>
            <Text className="status-count">{length3 && `${length3} đơn hàng`}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card" onClick={() => fetchFinish()}>
            <Text className="status-title">Đã hoàn thành</Text>
            <Text className="status-count">{length4 && `${length4} đơn hàng`}</Text>
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={orderData}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => setRowSelected(record.id),
        })}
      />
    </div>
  );
};

export default OrderManagement;
