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
import ChartAPI from "../../API/ChartAPI";
import Chart from './chart/Chart';
import { PieChart } from "recharts";
export const ChartManagement = () => {
    let date = new Date().toJSON().slice(0, 10);
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fakeData = [
      { MONTH: 1, TOTAL_COST: 100 },
      { MONTH: 2, TOTAL_COST: 200 },
      { MONTH: 3, TOTAL_COST: 300 },
      { MONTH: 5, TOTAL_COST: 200 },
      { MONTH: 7, TOTAL_COST: 300 },
      { MONTH: 11, TOTAL_COST: 100 },
      { MONTH: 12, TOTAL_COST: 300 },
    ];
    const fakeData3 = [
        { Start: 1, TOTAL: 100 },
        { Start: 2, TOTAL: 200 },
        {Start: 3, TOTAL: 300 },
        { Start: 4, TOTAL: 200 },
        { Start: 5, TOTAL: 300 },
      ];
    const fakeData2 = [
        { value: 1, value1: 400 },
        { value: 2, value1: 300 },
    ];
    const COLORS = ['#0088FE', '#00C49F'];
    const fakeData1 = [
        { DAY: 1, SALE: 100 }, // Monday
        { DAY: 2, SALE: 200 }, // Tuesday
        { DAY: 4, SALE: 300 }, // Wednesday
        { DAY: 5, SALE: 200 }, // Thursday
      ];
    setChart([...fakeData, ...fakeData1, ...fakeData2, ...fakeData3]);
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
    { name: "one", St: 0 },
    { name: "two", St: 0 },
    { name: "Three", St: 0 },
    { name: "Four", St: 0 },
    { name: "Five", St: 0 },
    ];
  const chartData3 = [
    { name: "Khách đăng kí", Se: 0 },
    { name: "Chủ đăng kí", Se: 0 },
    ];
  for (let index = 0; index < chartData.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (chart[i]["MONTH"] === index + 1) {
        chartData[index]["Sales"] = chart[i]["TOTAL_COST"];
      }
    }
  }
  for (let index = 0; index < chartData1.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (chart[i]["DAY"] === index) { // Changed from index + 1 to index
        chartData1[index]["Sale"] = chart[i]["SALE"];
      }
    }
  }
  for (let index = 0; index < chartData3.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (chart[i]["value"] === index+1) { // Changed from index + 1 to index
        chartData3[index]["Se"] = chart[i]["value1"];
      }
    }
  }
  for (let index = 0; index < chartData2.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (chart[i]["Start"] === index+1) { // Changed from index + 1 to index
        chartData2[index]["St"] = chart[i]["TOTAL"];
      }
    }
  }



  return (
    <div style={{ flex: 4 }}>
        <Chart data={chartData} title="Doanh Thu" grid dataKey="Sales" />
        <Chart data={chartData1} title="Đơn Hàng" grid dataKey="Sale" />
        <Chart data={chartData3} title="Đăng Kí "  dataKey="Se" grid pie />
        <Chart data={chartData2} title="Đánh Giá "  dataKey="St" grid pie />
    </div>
  )
};

export default ChartManagement;