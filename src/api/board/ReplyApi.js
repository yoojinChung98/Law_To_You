import axios from "../Axios";

// 댓글 목록
export const getReplyListApi = (params) => {
  return axios.get("/reply/list", { params }).then((res) => res.data);
};

// 댓글 등록
export const postReplyApi = (params) => {
  return axios.post("/reply/register", params).then((res) => res.data);
};

// 댓글 삭제
export const deleteReplyApi = (params) => {
  return axios.delete("/reply", params).then((res) => res.data);
};
