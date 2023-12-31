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

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { config } = error;
    if (error?.code === "ECONNABORTED") {
      console.log("Time Out");
      return;
    }

    const erorrRes = error.response;
    if (erorrRes.status === 401) {
      // access token 만료 => 재발급 로직
    }
    //else if() {} 다른 에러 코드에 대한 분기 기술
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
