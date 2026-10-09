import React, { useState, useEffect } from "react";
import { getExpenses } from "../api/expenseApi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import "./style.css";

export default function Home() {
  const [data, setData] = useState([]);

useEffect(() => {
  getExpenses()
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching expenses:", error);
    });
}, []);


  const income = data
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expense = data
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + Math.abs(Number(item.amount)), 0);

  const balance = income - expense;


  const pieData = [
    { name: "Balance", value: balance, color: "#f9a825" },
    { name: "Expense", value: expense, color: "#F44336" },
  ];


// Start with an empty object
const monthlyData = {};

// Example data:
// [
//   { type: "Income", price: 5000, date: "2026-01-15" },
//   { type: "Expense", price: 2000, date: "2026-01-20" },
//   { type: "Income", price: 3000, date: "2026-02-10" }
// ]

data.forEach((item) => {

  // Convert the date string into a Date object
  const date = new Date(item.date);

  // For "2026-01-15"
  // monthKey becomes "2026-0"
  // (0 means January)
  const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

  // Create a display label
  // "Jan 2026"
  const monthLabel = date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  // Check whether this month already exists
  if (!monthlyData[monthKey]) {

    // FIRST ITERATION
    // item = { Income, 5000, Jan 15 }

    monthlyData[monthKey] = {
      month: monthLabel,
      sortDate: new Date(date.getFullYear(), date.getMonth(), 1),
      income: 0,
      expense: 0,
    };

    /*
    monthlyData now becomes:

    {
      "2026-0": {
        month: "Jan 2026",
        sortDate: Jan 1 2026,
        income: 0,
        expense: 0
      }
    }
    */
  }

  // If transaction is income
  if (item.type === "Income") {

    monthlyData[monthKey].income += Number(item.amount);

    /*
    After adding first income (5000):

    {
      "2026-0": {
        month: "Jan 2026",
        income: 5000,
        expense: 0
      }
    }
    */

  } else {

    // If transaction is expense
    monthlyData[monthKey].expense += Math.abs(Number(item.amount));

    /*
    Second iteration:
    item = { Expense, 2000, Jan 20 }

    monthKey already exists,
    so we don't create a new month.

    After adding expense:

    {
      "2026-0": {
        month: "Jan 2026",
        income: 5000,
        expense: 2000
      }
    }
    */
  }

  /*
  Third iteration:
  item = { Income, 3000, Feb 10 }

  monthKey = "2026-1"

  Since February doesn't exist yet,
  create a new month:

  {
    "2026-0": {
      month: "Jan 2026",
      income: 5000,
      expense: 2000
    },

    "2026-1": {
      month: "Feb 2026",
      income: 0,
      expense: 0
    }
  }

  Then add the income:

  {
    "2026-0": {
      month: "Jan 2026",
      income: 5000,
      expense: 2000
    },

    "2026-1": {
      month: "Feb 2026",
      income: 3000,
      expense: 0
    }
  }
  */

});

const chartData = Object.values(monthlyData).sort(
  (a, b) => a.sortDate - b.sortDate
);

console.log("Data:", data);
console.log("Chart Data:", chartData);


  return (
<div className="dashboardModern">

  {/* TOP SECTION: Summary + Pie Chart */}
  <div className="chartGrid">

    {/* LEFT: Summary */}
    <div className="summery">
      <div className="summeryCard1">
        <h3>Monthly Income</h3>
        <p>Rs. {income}</p>
      </div>

      <div className="summeryCard2">
        <h3>Expense</h3>
        <p>Rs. {expense}</p>
      </div>

      <div className="summeryCard3">
        <h3>Balance</h3>
        <p>Rs. {balance}</p>
      </div>
    </div>

    {/* RIGHT: Pie Chart */}
    <div className="pieChartBox">
      <div className="chartTitle">Balance vs Expense</div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>

  {/* BOTTOM: Bar Chart */}
  <div className="barChartBox">
    <div className="chartTitle">Income vs Expense Monthly Trend</div>

    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="income" fill="#4CAF50" name="Income" />
        <Bar dataKey="expense" fill="#F44336" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>



  );
}