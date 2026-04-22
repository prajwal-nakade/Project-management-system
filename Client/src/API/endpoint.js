import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const signup = async (payload) => {
  const res = await api.post("/register", payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await api.post("/login", payload);
  return res.data;
};
