import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Row, Col } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { users } from "../../data/fakeData";
import "../../styles/styles.css";
import Chart from "./chart/Chart";
import { PieChart } from "recharts";
import ChartAPI from "../../API/ChartAPI";
export const ChartManagement = () => {
  let date = new Date().toJSON().slice(0, 10);
  const [chart, setChart] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [registerCount, setRegisterCount] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const revenueResponse = await ChartAPI.Get_revenueByMonth();
      console.log("Revenue Response:", revenueResponse);
      setRevenueData(revenueResponse);

      const orderResponse = await ChartAPI.Get_totalOrderByWeekday();
      console.log("Order Response:", orderResponse);
      setOrderData(orderResponse);

      const ratingResponse = await ChartAPI.Get_totalRating();
      console.log("Rating Response:", ratingResponse);
      setRatingData(ratingResponse);

      const registerResponse = await ChartAPI.countRegister();
      console.log("Register Response:", registerResponse);
      setRegisterCount(registerResponse);

      // Khi tất cả dữ liệu đã được lấy, bạn cũng có thể in ra toàn bộ chart data
      setChart([
        ...revenueResponse,
        ...orderResponse,
        ...ratingResponse,
        ...registerResponse,
      ]);
      console.log("Chart Data:", chart);
    };

    fetchChartData();
    // setChart([...revenueData, ...orderData, ...ratingData, ...registerCount])
  }, []);
  const chartData = [
    { name: "Jan", Sales: 0 },
    { name: "Feb", Sales: 0 },
    { name: "Mar", Sales: 0 },
    { name: "Apr", Sales: 0 },
    { name: "May", Sales: 0 },
    { name: "Jun", Sales: 0 },
    { name: "Jul", Sales: 0 },
    { name: "Aug", Sales: 0 },
    { name: "Sep", Sales: 0 },
    { name: "Oct", Sales: 0 },
    { name: "Nov", Sales: 0 },
    { name: "Dec", Sales: 0 },
  ];
  const chartData1 = [
    { name: "Monday", Sale: 0 },
    { name: "Tuesday", Sale: 0 },
    { name: "Wednesday", Sale: 0 },
    { name: "Thursday", Sale: 0 },
    { name: "Friday", Sale: 0 },
    { name: "Saturday", Sale: 0 },
    { name: "Sunday", Sale: 0 },
  ];
  const chartData2 = [
    { name: "One", St: 0 },
    { name: "Two", St: 0 },
    { name: "Three", St: 0 },
    { name: "Four", St: 0 },
    { name: "Five", St: 0 },
  ];
  for (let index = 0; index < chartData2.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (chart[i]["name"] === index + 1) {
        // Changed from index + 1 to index
        chartData2[index]["St"] = chart[i]["count"];
      }
    }
  }
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  for (let index = 0; index < chartData.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      // Chuyển đổi số tháng từ API thành tên tháng
      let monthFromAPI = monthNames[chart[i]["name1"] - 1];
      if (monthFromAPI === monthNames[index]) {
        chartData[index]["Sales"] = chart[i]["total"];
      }
    }
  }
  for (let index = 0; index < chartData1.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (dayNames.indexOf(chart[i]["name"]) === index) {
        chartData1[index]["Sale"] = chart[i]["total"];
      }
    }
  }

  return (
    <div style={{ flex: 4 }}>
      {chartData && (
        <Chart data={chartData} title="Doanh Thu" grid dataKey="Sales" />
      )}
      {chartData1 && (
        <Chart data={chartData1} title="Đơn Hàng" grid dataKey="Sale" />
      )}
      {chartData2 && (
        <Chart data={chartData2} title="Đánh Giá" grid dataKey="St" pie />
      )}
      {registerCount && (
        <Chart data={registerCount} title="Đăng Kí" grid dataKey="Se" pie />
      )}
    </div>
  );
};

export default ChartManagement;
