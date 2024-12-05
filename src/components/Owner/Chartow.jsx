import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import ChartAPI from "../../API/ChartAPI";
import Chart from "../Admin/chart/Chart";
export const Chartow = () => {
  const [chart, setChart] = useState([]);
  const [revenueByMonthByOwer, setrevenueByMonthByOwer] = useState([]);
  const [totalOrderByWeekdayByOwner, settotalOrderByWeekdayByOwner] = useState(
    []
  );
  const [totalRatingByOwner, settotalRatingByOwner] = useState([]);
  const [dishAmount, setDishAmount] = useState([]);

  const idUser = localStorage.getItem("userId");

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

      const dishResponse = await ChartAPI.dishAmount(idUser);
      console.log("Dish Response:", dishResponse);
      setDishAmount(dishResponse);

      // Khi tất cả dữ liệu đã được lấy, bạn cũng có thể in ra toàn bộ chart data
      setChart([
        ...revenueResponse,
        ...orderResponse,
        ...ratingResponse,
        ...dishResponse,
      ]);
      console.log("Chart Data:", chart);
    };

    fetchChartData();
  }, []);

  const chartData = [
    { name: "Jan", tt: 0 },
    { name: "Feb", tt: 0 },
    { name: "Mar", tt: 0 },
    { name: "Apr", tt: 0 },
    { name: "May", tt: 0 },
    { name: "Jun", tt: 0 },
    { name: "Jul", tt: 0 },
    { name: "Aug", tt: 0 },
    { name: "Sep", tt: 0 },
    { name: "Oct", tt: 0 },
    { name: "Nov", tt: 0 },
    { name: "Dec", tt: 0 },
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

  for (let index = 0; index < chartData1.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (dayNames.indexOf(chart[i]["name"]) === index) {
        chartData1[index]["Sale"] = chart[i]["total"];
      }
    }
  }
  for (let index = 0; index < chartData.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      // Chuyển đổi số tháng từ API thành tên tháng
      let monthFromAPI = monthNames[chart[i]["name2"] - 1];
      if (monthFromAPI === monthNames[index]) {
        chartData[index]["Sales"] = chart[i]["total"];
      }
    }
  }

  const chartData2 = [
    { name: "Một sao", St: 0 },
    { name: "Hai sao", St: 0 },
    { name: "Ba sao", St: 0 },
    { name: "Bốn sao", St: 0 },
    { name: "Năm sao", St: 0 },
  ];
  for (let index = 0; index < chartData2.length; index++) {
    for (let i = 0; i < chart.length; i++) {
      if (chart[i]["name"] === index + 1) {
        // Changed from index + 1 to index
        chartData2[index]["St"] = chart[i]["count"];
      }
    }
  }
  console.log("chartData2:", chartData2);

  const chartData4 = dishAmount.map((dish, index) => {
    return {
      name: dish.name,
      St: parseInt(dish.total_quantity),
    };
  });

  console.log("Chart Data 4:", chartData4);

  return (
    <div style={{ flex: 3 }}>
      {chartData && (
        <Chart data={chartData} title="Doanh Thu" grid dataKey="Sales" />
      )}
      {chartData1 && (
        <Chart data={chartData1} title="Đơn Hàng" grid dataKey="Sale" />
      )}
      {chartData2 && (
        <Chart data={chartData2} title="Đánh Giá" grid dataKey="St" pie />
      )}
      {chartData4 && (
        <Chart data={chartData4} title="Món ăn" grid dataKey="St" pie />
      )}
    </div>
  );
};

export default Chartow;
