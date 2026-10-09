import axios from "axios";
//Instead of writing Axios requests everywhere in your React components, we keep them here.

const API = axios.create({
    baseURL: "http://localhost:8080/api/"
});

export const getTransaction = () => {
    return API.get("");
};

export const createExpense = (expense) => {
    return API.post("", expense);
};

export const updateExpense = (id, expense) => {
    return API.put(`/${id}`, expense);
};

export const deleteExpense = (id) => {
    return API.delete(`/${id}`);
};