import axios from "axios";
import { API_BASE_URL } from "../config/host-config";

const axiosConfig = {
  baseURL: API_BASE_URL,
  // timeout: 10000,
  withCredentials: false,
};

const instance = axios.create(axiosConfig);

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.warn("요청 실패", error);
    return Promise.reject(error);
  }
);

export default instance;
