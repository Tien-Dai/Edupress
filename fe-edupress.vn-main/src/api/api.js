import axios from "axios";

export const api = axios.create({
  baseURL: "https://edupress-be.onrender.com",
  headers: { "Content-Type": "application/json" },
});


const getAccessToken = () => localStorage.getItem("accessToken");

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);