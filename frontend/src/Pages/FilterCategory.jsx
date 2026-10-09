import React, { useState, useEffect } from "react";
import "./filterstyle.css";

import {
  getAllTransactions,
  deleteTransaction,
  updateTransaction
} from "../api/transactionApi";

export default function FilterCategory() {
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);

  // Update form state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    type: "",
    name: "",
    category: "",
    amount: ""
  });

  const categories = [
    {
      id: 1,
      description: "All",
      image: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png"
    },
    {
      id: 2,
      description: "Bill",
      image: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png"
    },
    {
      id: 3,
      description: "Food",
      image: "https://cdn-icons-png.flaticon.com/128/1046/1046784.png"
    },
    {
      id: 4,
      description: "App",
      image: "https://cdn-icons-png.flaticon.com/128/888/888879.png"
    },
    {
      id: 5,
      description: "Medicine",
      image: "https://cdn-icons-png.flaticon.com/128/2966/2966486.png"
    },
    {
      id: 6,
      description: "Others",
      image: "https://cdn-icons-png.flaticon.com/128/565/565547.png"
    }
  ];

  // Fetch transactions from the backend
  useEffect(() => {
    getAllTransactions()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch transactions:", error);
      });
  }, []);

  // Filter transactions
  const filteredData = data.filter((item) => {
    const matchName = (item.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!item.date) {
      return false;
    }

    const itemDate = new Date(item.date);

    if (Number.isNaN(itemDate.getTime())) {
      return false;
    }

    const monthLabel = itemDate.toLocaleString("en-US", {
      month: "short"
    });

    const yearLabel = itemDate.getFullYear().toString();

    const matchMonth =
      selectedMonth === "" || monthLabel === selectedMonth;

    const matchYear =
      selectedYear === "" || yearLabel === selectedYear;

    const matchCategory =
      selectedCategory === "" ||
      item.category === selectedCategory;

    return matchName && matchMonth && matchYear && matchCategory;
  });

  // Delete a transaction
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTransaction(id);

      setData((previousData) =>
        previousData.filter((item) => item.id !== id)
      );

      // Close the edit form if this transaction was being edited
      if (editingId === id) {
        setEditingId(null);
      }

      alert("Transaction deleted successfully!");
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  // Open the edit form with the selected transaction
  const handleUpdate = (item) => {
    setEditingId(item.id);

    setEditForm({
      date: item.date ?? "",
      type: item.type ?? "",
      name: item.name ?? "",
      category: item.category ?? "",
      amount: item.amount ?? ""
    });
  };

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // Save updated transaction to the backend
  const handleSaveUpdate = async (e) => {
    e.preventDefault();

    if (editingId === null) {
      return;
    }

    const updatedTransaction = {
      date: editForm.date,
      type: editForm.type,
      name: editForm.name.trim(),
      category: editForm.category,
      amount: Number(editForm.amount)
    };

    if (
      !updatedTransaction.name ||
      !updatedTransaction.date ||
      !updatedTransaction.type ||
      !updatedTransaction.category ||
      !Number.isFinite(updatedTransaction.amount) ||
      updatedTransaction.amount <= 0
    ) {
      alert("Please enter valid transaction details.");
      return;
    }

    try {
      const response = await updateTransaction(
        editingId,
        updatedTransaction
      );

      // Use the response if the backend returns the updated transaction.
      // Otherwise, update the local list using the submitted values.
      const savedTransaction = response.data ?? {
        ...updatedTransaction,
        id: editingId
      };

      setData((previousData) =>
        previousData.map((item) =>
          item.id === editingId
            ? { ...item, ...savedTransaction }
            : item
        )
      );

      setEditingId(null);

      alert("Transaction updated successfully!");
    } catch (error) {
      console.error(
        "Failed to update transaction:",
        error.response?.data ?? error
      );

      alert(
        "Failed to update transaction. Check the browser console and Spring Boot logs."
      );
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="pageContainer">
      <div className="filterContainer">
        {/* Search, month and year filters */}
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
              inputMode="numeric"
              placeholder="2026"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </div>
        </div>

        {/* Category filters */}
        <p>Category</p>

        <div className="filtercategoryRow">
          {categories.map((item) => (
            <div
              key={item.id}
              className={`filtercategoryCard ${
                selectedCategory === item.description ||
                (selectedCategory === "" &&
                  item.description === "All")
                  ? "activeCategory"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  item.description === "All"
                    ? ""
                    : item.description
                )
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

      {/* Transaction results */}
      <div className="resultsContainer">
        {filteredData.length === 0 ? (
          <p>No data found</p>
        ) : (
          filteredData.map((item) => (
            <div key={item.id} className="resultCard">
              <p>
                <b>Date:</b> {item.date}
              </p>

              <p>
                <b>Type:</b> {item.type}
              </p>

              <p>
                <b>Name:</b> {item.name}
              </p>

              <p>
                <b>Category:</b> {item.category}
              </p>

              <p>
                <b>Amount:</b> {item.amount}
              </p>

              <div className="actionButtons">
                <button
                  type="button"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit form */}
      {editingId !== null && (
        <form
          onSubmit={handleSaveUpdate}
          className="editForm"
        >
          <h3>Update Transaction</h3>

          <label htmlFor="edit-date">Date</label>
          <input
            id="edit-date"
            type="date"
            name="date"
            value={editForm.date}
            onChange={handleEditChange}
            required
          />

          <label htmlFor="edit-type">Type</label>
          <select
            id="edit-type"
            name="type"
            value={editForm.type}
            onChange={handleEditChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <label htmlFor="edit-name">Name</label>
          <input
            id="edit-name"
            type="text"
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            required
          />

          <label htmlFor="edit-category">Category</label>
          <select
            id="edit-category"
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Bill">Bill</option>
            <option value="Food">Food</option>
            <option value="App">App</option>
            <option value="Medicine">Medicine</option>
            <option value="Others">Others</option>
          </select>

          <label htmlFor="edit-amount">Amount</label>
          <input
            id="edit-amount"
            type="number"
            name="amount"
            value={editForm.amount}
            onChange={handleEditChange}
            min="0.01"
            step="0.01"
            required
          />

          <div className="actionButtons">
            <button type="submit">
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}