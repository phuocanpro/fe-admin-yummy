import React, { useState, useEffect } from "react";
import { Table, Button, DatePicker, Row, Col, Typography, Card } from "antd";
import { orders, users, restaurants, orderItems } from "../../data/fakeData";
import { CheckOutlined, SearchOutlined, FileOutlined } from "@ant-design/icons";
import moment from "moment";
import "../../styles/styles.css";
import firebase from '@firebase/app'
import "firebase/firestore";
import "firebase/auth";
import RestaurantAPI from "../../API/RestaurantAPI";
import jsPDF from "jspdf";
import 'jspdf-autotable';


const { RangePicker } = DatePicker;
const { Text } = Typography;

const OrderManagement = () => {
  const [orderData, setOrderData] = useState([]);
  const [rowSelected, setRowSelected] = useState("");
  const [status, setStatus] = useState("");
  const [length4, setLength4] = useState("");
  const [length1, setLength1] = useState("");
  const [length2, setLength2] = useState("");
  const [length3, setLength3] = useState("");
  var db = firebase.firestore();

  const [infoData, setInfoData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    opening_hours: "",
    method: "",
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
      } catch (error) {
        console.log("err", error);
      }
    };
   
    fetchData();
    fetchProcess();
    fetchFinish();
    fetchDelivery();
    fetchWait();
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('wait').onSnapshot((snapshot) => {
      // Cứ mỗi lần có sự thay đổi, chúng ta sẽ fetch lại dữ liệu
      fetchWait();
      fetchProcess();
      fetchFinish();
      fetchDelivery();
      // Bạn cũng có thể cài đặt thông báo ở đây
    });
  
    // Nhớ cleanup listener khi component unmount
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    console.log(rowSelected);
  }, [rowSelected]);

  const updateOrderStatus = async (id, status) => {
    try {
      if (status === "") {

      } else {
        console.log("id",id.toString(), " ", status);

        id = id.toString();

        // Nhận doc trong collection 'wait' tương ứng với orderId
        const orderRef = db.collection('wait').doc(id);

        // Tiến hành update status= "Đang xử lý"
        return orderRef.update({
          status: status
        })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      }

    } catch (error) {
      console.error(`Failed to update order status: ${error}`);
    }
  };

  const fetchFinish = async () => {
    const data = await db.collection('wait').where('status', '==', 'Hoàn thành').where('res_id', '==', infoData.id).get();
    if (orderData){
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
        method: doc.data().method = 0 ? "Tiền mặt" : "Trực tuyến"
      })));
    }
    setLength4(data.docs.length);
    setStatus("");
  };

  const fetchWait = async () => {
    const data = await db.collection('wait').where('status', '==', 'Chưa xử lý').where('res_id', '==', infoData.id).get();
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
      method: doc.data().method = 0 ? "Tiền mặt" : "Trực tuyến"
    })));
    setLength1(data.docs.length);
    setStatus("Đang xử lý");
  };

  const fetchProcess = async () => {
    const data = await db.collection('wait').where('status', '==', 'Đang xử lý').where('res_id', '==', infoData.id).get();
    if (orderData){
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
        method: doc.data().method = 0 ? "Tiền mặt" : "Trực tuyến"
      })));
    }
    setLength2(data.docs.length);
    setStatus("Đang giao");
  };

  const fetchDelivery = async () => {
    const data = await db.collection('wait').where('status', '==', 'Đang giao').where('res_id', '==', infoData.id).get();
    if (orderData){
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
      method: doc.data().method = 0 ? "Tiền mặt" : "Trực tuyến"
    })));
    }
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
      method: doc.data().method == 0 ? "Tiền mặt" : "Trực tuyến"
    })));
    setLength3(data.docs.length);
    setStatus("Hoàn thành");
  };


  const [dates, setDates] = useState([]);

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    // if (dates.length === 2) {
    //   const [start, end] = dates;
    //   const filtered = orderData.filter((user) => {
    //     const createdAt = moment(user.created_at);
    //     return createdAt.isBetween(start, end, "days", "[]");
    //   });
    //   orderData(filtered);
    // }
  };

  const generatePDF = (record) => {
    const doc = new jsPDF();
  
    doc.text("Order Details", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [['Name', 'Address', 'Status', 'Total', 'Order ID']],
      body: [
        [record.customer.name, record.customer.address, record.status, record.total, record.order_id]
      ]
    });
  
    doc.text("Dishes", 20, doc.previousAutoTable.finalY + 10);
    const dishData = record.dishes.map(dish => [dish.name, dish.price, dish.quantity, dish.options]);
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 20,
      head: [['Dish Name', 'Price', 'Quantity', 'Options']],
      body: dishData
    });
  
    doc.save(`order_${record.order_id}.pdf`);
  };

  
  const columns = [
    { title: "ID", dataIndex: "order_id", key: "order_id", width: '5%' },
    {
      title: "Khách Hàng", dataIndex: "customer", key: "customer",
      render: (text, record) => (
        <div style={{ marginBottom: "5px" }}>
          <p>
            <strong>Tên khách hàng:</strong> {record.customer.name}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {record.customer.address}
          </p>
        </div>
      ),
      width: '35%'
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      width: '5%'
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      width: '5%'
    },
    {
      title: "Các món ăn",
      dataIndex: "dishes",
      key: "dishes",
      render: dishes => (
        <ul>
          {dishes.map((dish, index) => (


            <div key={index} style={{ marginBottom: "5px" }}>
              <p>
                <strong>Tên món:</strong> {dish.name}
              </p>
              <p>
                <strong>Giá:</strong> {dish.price}
              </p>
              <p>
                <strong>Số lượng:</strong> {dish.quantity}
              </p>
              <p>
                <strong>Ghi chú:</strong> {dish.options}
              </p>
              <br></br>
            </div>

          ))}
        </ul>
      ),
      width: '30%'
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <>
        <Button
          className="confirm-button"
          icon={<CheckOutlined />}
          onClick={() => updateOrderStatus(rowSelected, status)}
        >
          Xác nhận
        </Button>
        {record.status === "Đang giao" && (
          <Button
            className="pdf-button"
            icon={<FileOutlined />}
            onClick={() => generatePDF(record)}
            style={{ marginLeft: 8 }}
          >
            In PDF
          </Button>
        )}
      </>
      ),
      width: '10%'
    },
  ];

  return (
    <div className="owner-container1">
      <Row
        className="date-container"
        gutter={[16, 16]}
        style={{ marginBottom: "24px" }}
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
            onClick={handleSearchByDate}
            style={{ width: "100%" }}
            className="search-button"
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
        <Col span={6}>
          <Card
            className="status-card"
            onClick={() => fetchWait()}
          >
            <Text className="status-title">Chưa tiếp nhận</Text>
            <Text className="status-count">
              {length1 && `${length1} đơn hàng`}
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="status-card"
            onClick={() => fetchProcess()}
          >
            <Text className="status-title">Đang tiếp nhận</Text>
            <Text className="status-count">
              {length2 && `${length2} đơn hàng`}
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="status-card"
            onClick={() => fetchDelivery()}
          >
            <Text className="status-title">Đang giao</Text>
            <Text className="status-count">
              {length3 && `${length3} đơn hàng`}
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card" onClick={() => fetchFinish()}>
            <Text className="status-title">Đã hoàn thành</Text>
            <Text className="status-count">
            {length4 && `${length4} đơn hàng`}
            </Text>
          </Card>
        </Col>
      </Row>
      <Table dataSource={orderData} columns={columns} rowKey="id" onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            setRowSelected(record.id);
          },
        };
      }} />
    </div>
  );
};

export default OrderManagement;
