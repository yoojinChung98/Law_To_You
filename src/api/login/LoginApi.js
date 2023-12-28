import axios from "../Axios";

export const getLoginApi = (params) => {
  return axios.get("/user/login", { params }).then((res) => res.data);
};
