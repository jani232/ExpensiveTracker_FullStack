
import React, { useState, useEffect } from "react";
import { getTransaction } from "../api/transactionApi";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch transactions from Spring Boot
  useEffect(() => {
    getTransaction()
      .then((response) => {
        setData(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions. Please check the backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Calculate income
  const income = data
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  // Calculate expenses
  const expense = data
    .filter((item) => item.type === "Expense")
    .reduce(
      (total, item) => total + Math.abs(Number(item.amount || 0)),
      0
    );

  // Calculate remaining balance
  const balance = income - expense;

  // Pie chart data
  const pieData = [
    { name: "Balance", value: Math.max(balance, 0), color: "#f9a825" },
    { name: "Expense", value: expense, color: "#F44336" },
  ];

  // Prepare monthly income and expense data
  const monthlyData = {};

  data.forEach((item) => {
    // Ignore records with missing or invalid dates
    if (
      !item.date ||
      Number.isNaN(new Date(item.date).getTime())
    ) {
      return;
    }

    const date = new Date(item.date);

    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    const monthLabel = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    // Create a monthly record if it doesn't exist
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthLabel,
        sortDate: new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        ),
        income: 0,
        expense: 0,
      };
    }

    // Add amounts to the correct category
    if (item.type === "Income") {
      monthlyData[monthKey].income += Number(item.amount || 0);
    } else if (item.type === "Expense") {
      monthlyData[monthKey].expense += Math.abs(
        Number(item.amount || 0)
      );
    }
  });

  // Sort months chronologically
  const chartData = Object.values(monthlyData).sort(
    (a, b) => a.sortDate - b.sortDate
  );

  if (loading) {
    return <div className="dashboardModern">Loading transactions...</div>;
  }

  if (error) {
    return <div className="dashboardModern">{error}</div>;
  }

  return (
    <div className="dashboardModern">

      {/* TOP SECTION: Summary + Pie Chart */}
      <div className="chartGrid">

        {/* LEFT: Summary */}
        <div className="summery">

          <div className="summeryCard1">
            <h3>Total Income</h3>
            <p>
              Rs. {income.toLocaleString("en-LK")}
            </p>
          </div>

          <div className="summeryCard2">
            <h3>Total Expenses</h3>
            <p>
              Rs. {expense.toLocaleString("en-LK")}
            </p>
          </div>

          <div className="summeryCard3">
            <h3>Balance</h3>
            <p>
              Rs. {balance.toLocaleString("en-LK")}
            </p>
          </div>

        </div>

        {/* RIGHT: Pie Chart */}
        <div className="pieChartBox">
          <div className="chartTitle">Balance vs Expense</div>

          {income === 0 && expense === 0 ? (
            <p>No income or expense data to display.</p>
          ) : (
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
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

      {/* BOTTOM: Monthly Bar Chart */}
      <div className="barChartBox">
        <div className="chartTitle">
          Income vs Expense Monthly Trend
        </div>

        {chartData.length === 0 ? (
          <p>No transactions with valid dates to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="income"
                fill="#4CAF50"
                name="Income"
              />

              <Bar
                dataKey="expense"
                fill="#F44336"
                name="Expense"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
