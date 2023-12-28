import axios from "../Axios";

export const postUserJoinApi = (params) => {
  return axios.post("/user/join", params).then((res) => res.data);
};

export const postLawyerJoinApi = (params) => {
  return axios.post("/lawyer/join", params).then((res) => res.data);
};

export const getIdDuplicateApi = (params) => {
  return axios.get("/user/checkId", { params }).then((res) => res.data);
};

export const getNickDuplicateApi = (params) => {
  return axios.get("/user/checkName", { params }).then((res) => res.data);
};

export const getEmailDuplicateApi = (params) => {
  return axios.get("/user/email", { params }).then((res) => res.data);
};

export const postMailSendApi = (params) => {
  return axios.post("/user/mailSend", params).then((res) => res.data);
};

export const postMailAuthCheckApi = (params) => {
  return axios.post("/user/mailauthCheck", params).then((res) => res.data);
};
