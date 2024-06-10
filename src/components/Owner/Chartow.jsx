import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Row, Col } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../../styles/styles.css";
import { PieChart } from "recharts";
import ChartAPI from "../../API/ChartAPI";
import Chart from "../Admin/chart/Chart";
export const Chartow = () => {
    let date = new Date().toJSON().slice(0, 10);
  const [chart, setChart] = useState([]);
  const [revenueByMonthByOwer, setrevenueByMonthByOwer] = useState([]);
  const [totalOrderByWeekdayByOwner, settotalOrderByWeekdayByOwner] = useState([]);
  const [totalRatingByOwner, settotalRatingByOwner] = useState([]);
  const idUser = localStorage.getItem('userId');

  useEffect(() => {
    const fetchChartData = async () => {
        const revenueResponse = await ChartAPI.revenueByMonthByOwer(idUser);
        console.log("Revenue Response:", revenueResponse);
        setrevenueByMonthByOwer(revenueResponse);
    
        const orderResponse = await ChartAPI.totalOrderByWeekdayByOwner(idUser);
        console.log("Order Response:", orderResponse);
        settotalOrderByWeekdayByOwner(orderResponse);
    
        const ratingResponse = await ChartAPI.totalRatingByOwner(idUser);
        console.log("Rating Response:", ratingResponse);
        settotalRatingByOwner(ratingResponse);

    
        // Khi tất cả dữ liệu đã được lấy, bạn cũng có thể in ra toàn bộ chart data
        setChart([...revenueResponse, ...orderResponse, ...ratingResponse])
        console.log("Chart Data:", chart); };
    
    fetchChartData();
    // setChart([...revenueData, ...revenueByMonthByOwer, ...totalOrderByWeekdayByOwner, ...totalRatingByOwner])
  }, []);
  
//   const chartData = [
//     { name: "Jan", tt: 0 },
//     { name: "Feb", tt: 0 },
//     { name: "Mar", tt: 0 },
//     { name: "Apr", tt: 0 },
//     { name: "May", tt: 0 },
//     { name: "Jun", tt: 0 },
//     { name: "Jul", tt: 0 },
//     { name: "Aug", tt: 0 },
//     { name: "Sep", tt: 0 },
//     { name: "Oct", tt: 0 },
//     { name: "Nov", tt: 0 },
//     { name: "Dec", tt: 0 },
//   ];
//   const chartData1 = [
//   { name: "Monday", Sale: 0 },
//   { name: "Tuesday", Sale: 0 },
//   { name: "Wednesday", Sale: 0 },
//   { name: "Thursday", Sale: 0 },
//   { name: "Friday", Sale: 0 },
//   { name: "Saturday", Sale: 0 },
//   { name: "Sunday", Sale: 0 },
//   ];
//   const chartData2 = [
//     { name: "One", St: 0 },
//     { name: "Two", St: 0 },
//     { name: "Three", St: 0 },
//     { name: "Four", St: 0 },
//     { name: "Five", St: 0 },
//     ];
//     for (let index = 0; index < chartData2.length; index++) {
//         for (let i = 0; i < chart.length; i++) {
//           if (chart[i]["name"] === index+1) { // Changed from index + 1 to index
//             chartData2[index]["St"] = chart[i]["count"];
//           }
//         }
//       }
//   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
//   for (let index = 0; index < chartData.length; index++) {
//     for (let i = 0; i < chart.length; i++) {
//         if (dayNames.indexOf(chart[i]["name2"]) === index+1) {
//           chartData1[index]["Sale"] = chart[i]["total"];
//         }
//       }
//   }
//   for (let index = 0; index < chartData.length; index++) {
//     for (let i = 0; i < chart.length; i++) {
//       if (dayNames.indexOf(chart[i]["name2"]) === index) {
//         chartData[index][""] = chart[i]["total"];
//         console.log(chartData);
//       }
//     }
//   }

  
  return (
    <div style={{ flex: 3 }}>
    {revenueByMonthByOwer&& <Chart data={revenueByMonthByOwer} title="Doanh Thu" grid dataKey="total" />}
    {totalOrderByWeekdayByOwner && <Chart data={totalOrderByWeekdayByOwner} title="Đơn Hàng" grid dataKey="total" />}
    {totalRatingByOwner && <Chart data={totalRatingByOwner} title="Đánh Giá" grid dataKey="count" pie />}
    </div>
  );
};

export default Chartow;