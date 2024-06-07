import React, { useState, useEffect } from "react";
import { Table, Button, DatePicker, Row, Col, Typography, Card } from "antd";
import { orders, users, restaurants, orderItems } from "../../data/fakeData";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import "../../styles/styles.css";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const OrderManagement = () => {
  const [orderData, setOrderData] = useState([]);
 
  const [dates, setDates] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    filterData();
  }, [statusFilter, dates]);

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    filterData();
  };

  const filterByStatus = (status) => {
    setStatusFilter(status);
  };

  const filterData = () => {
    let filtered = orderItems; 

    if (dates.length === 2) {
      const [start, end] = dates;
      filtered = filtered.filter((order) => {
        const createdAt = moment(
          orders.find((o) => o.id === order.order_id).createdAt
        );
        return createdAt.isBetween(start, end, "days", "[]");
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // setFilteredData(filtered);
  };

  const columns = [
    { title: "Order ID", dataIndex: "order_id", key: "order_id" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Options", dataIndex: "options", key: "options" },
    { title: "Payment", dataIndex: "payment", key: "payment" },
    {
      title: "Tổng tiền",
      dataIndex: "order_id",
      key: "total_amount",
      render: (order_id) =>
        orders.find((o) => o.id === order_id)?.total_amount || "N/A",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Button
          className="confirm-button"
          icon={<CheckOutlined />}
          onClick={() => console.log("Xác nhận đơn hàng", record)}
        >
          Xác nhận
        </Button>
      ),
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
          <Card className="status-card" onClick={() => filterByStatus("all")}>
            <Text className="status-title">Tất cả</Text>
            <Text className="status-count">{orderData.length} đơn hàng</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="status-card"
            onClick={() => filterByStatus("chưa giao")}
          >
            <Text className="status-title">Chưa giao</Text>
            <Text className="status-count">
              {orderData.filter((order) => order.status === "chưa giao").length}{" "}
              đơn hàng
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="status-card"
            onClick={() => filterByStatus("đang giao")}
          >
            <Text className="status-title">Đang giao</Text>
            <Text className="status-count">
              {orderData.filter((order) => order.status === "đang giao").length}{" "}
              đơn hàng
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="status-card"
            onClick={() => filterByStatus("đã giao")}
          >
            <Text className="status-title">Đã giao</Text>
            <Text className="status-count">
              {orderData.filter((order) => order.status === "đã giao").length}{" "}
              đơn hàng
            </Text>
          </Card>
        </Col>
      </Row>
      {/* <Table dataSource={filteredData} columns={columns} rowKey="order_id" /> */}
    </div>
  );
};

export default OrderManagement;
