
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/users",
});

export const registerUser = (user) => {
  return API.post("/register", user);
};

export const loginUser = (credentials) => {
  return API.post("/login", credentials);
};
