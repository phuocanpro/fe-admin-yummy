import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart, Bar,
} from "recharts";
import "./chart.css";

export default function Chart({ title, data, dataKey, grid, pie }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        {pie ? (
          <PieChart width={800} height={400}>
          <Pie
            dataKey={dataKey}
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={85}
            fill="#8884d8"
            label
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
        </PieChart>
        ) : (
            <BarChart data={data}>
            <XAxis dataKey="name" stroke="#5550bd" />
            <Bar dataKey={dataKey} fill="#5550bd" barSize={20} />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}