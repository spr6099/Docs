import axios from "axios";
export const baseUrl = "http://localhost:4500/api";

const API = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
