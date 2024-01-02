import axios from "../Axios";

// 온라인 상담 등록
export const postCounselRegistApi = (params) => {
  return axios.post("/counsel/register", params).then((res) => res.data);
};

// 깊은 상담 등록
export const putDeepRegistApi = (params) => {
  return axios.put("counsel/detail", params).then((res) => res.data);
};

// 온라인 상담 목록 가져오기(변호사)
export const getCounselListApi = (params) => {
  return axios.get("/counsel", { params }).then((res) => res.data);
};
