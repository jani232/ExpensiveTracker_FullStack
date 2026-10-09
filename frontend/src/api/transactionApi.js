
import axios from "axios";

// Central location for all transaction API requests
const API = axios.create({
  baseURL: "http://localhost:8080/api/transactions",
});

// Get all transactions
export const getTransaction = () => {
  return API.get("");
};

// Create a new transaction
export const createTransaction = (transaction) => {
  return API.post("", transaction);
};

// Update an existing transaction
export const updateTransaction = (id, transaction) => {
  return API.put(`/${id}`, transaction);
};

// Delete a transaction
export const deleteTransaction = (id) => {
  return API.delete(`/${id}`);
};

// Get all transactions
export const getAllTransactions = () => API.get("");
