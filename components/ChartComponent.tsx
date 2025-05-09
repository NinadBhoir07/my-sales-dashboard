
"use client";
import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { salesData } from "@/lib/mockData";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const ChartComponent = () => {
  const [chartType, setChartType] = useState("bar");
  const [threshold, setThreshold] = useState(0);
  const filteredData = salesData.filter(item => item.sales >= threshold);

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="sales"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return (
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        );
    }
  };

  return (
    <div className="w-full h-[400px]">
      <div className="mb-4 space-x-2">
        <button onClick={() => setChartType("bar")} className="px-4 py-2 bg-blue-500 text-white rounded">Bar</button>
        <button onClick={() => setChartType("line")} className="px-4 py-2 bg-green-500 text-white rounded">Line</button>
        <button onClick={() => setChartType("pie")} className="px-4 py-2 bg-purple-500 text-white rounded">Pie</button>
        <input
          type="number"
          placeholder="Sales threshold"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="px-2 py-1 border rounded ml-4"
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
