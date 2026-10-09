import React, { useState, useEffect } from "react";
import "./filterstyle.css";

import { getAllTransactions  } from "../api/transactionApi";

export default function FilterCategory() {
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);

  const categories = [
    { id: 1, description: "All", image: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png" },
    { id: 2, description: "Bill", image: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png" },
    { id: 3, description: "Food", image: "https://cdn-icons-png.flaticon.com/128/1046/1046784.png" },
    { id: 4, description: "App", image: "https://cdn-icons-png.flaticon.com/128/888/888879.png" },
    { id: 5, description: "Medicine", image: "https://cdn-icons-png.flaticon.com/128/2966/2966486.png" },
    { id: 6, description: "Others", image: "https://cdn-icons-png.flaticon.com/128/565/565547.png" }
  ];


useEffect(() => {
  getAllTransactions()
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Failed to fetch transactions:", error);
    });
}, []);


  const filteredData = data.filter((item) => {
    const matchName = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const itemDate = new Date(item.date);

    if (Number.isNaN(itemDate.getTime())) {
      return false;
    }

    const monthLabel = itemDate.toLocaleString("default", {
      month: "short",
    });

    const yearLabel = itemDate.getFullYear().toString();

    

    const matchMonth =
      selectedMonth === "" || monthLabel === selectedMonth;

    const matchYear =
      selectedYear === "" || yearLabel === selectedYear;

    const matchCategory =
      selectedCategory === "" || item.category === selectedCategory;

    return matchName &&matchMonth && matchYear && matchCategory;
  });

  return (
    <div className="pageContainer">
    <div className="filterContainer">

      {/* TOP FILTERS */}
      <div className="topFilters">

        <div className="filterBox">
          <p>Name</p>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filterBox">
          <p>Month</p>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All</option>
            <option value="Jan">Jan</option>
            <option value="Feb">Feb</option>
            <option value="Mar">Mar</option>
            <option value="Apr">Apr</option>
            <option value="May">May</option>
            <option value="Jun">Jun</option>
            <option value="Jul">Jul</option>
            <option value="Aug">Aug</option>
            <option value="Sep">Sep</option>
            <option value="Oct">Oct</option>
            <option value="Nov">Nov</option>
            <option value="Dec">Dec</option>
          </select>
        </div>

        <div className="filterBox">
          <p>Year</p>
          <input
            type="text"
            placeholder="2026"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>

      </div>

      {/* CATEGORY */}
      <p>Category</p>

      <div className="filtercategoryRow">
        {categories.map((item) => (
          <div
            key={item.id}
            className={`filtercategoryCard ${
              selectedCategory === item.description ||
              (selectedCategory === "" && item.description === "All")
                ? "activeCategory"
                : ""
            }`}
            onClick={() =>
              setSelectedCategory(item.description === "All" ? "" : item.description)
            }
          >
            <img
              src={item.image}
              alt={item.description}
              className="filtercategoryImage"
            />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
</div>

<div className="resultsContainer">
      {filteredData.length === 0 ? (
        <p>No data found</p>
      ) : (
        filteredData.map((item) => (
        <div key={item.id} className="resultCard">
          <p><b>Category:</b> {item.category}</p>
          <p><b>Type:</b> {item.type}</p>
          <p><b>Amount:</b> {item.amount}</p>
          <p><b>Date:</b> {item.date}</p>
          <p><b>Name:</b> {item.name}</p>
        </div>
        ))
      )}
    </div>
    </div>
  );
}