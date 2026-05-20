import axios from "axios";

const api = axios.create({
  baseURL: "project-management-system-vvva.vercel.app",
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
