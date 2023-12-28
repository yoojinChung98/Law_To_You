import axios from "../Axios";

// 자유게시판 글 목록 불러오기
export const getFreeListApi = (params) => {
  return axios.get("/freeboard", { params }).then((res) => res.data);
};

// 자유게시판 글 검색
export const getFreeSearchApi = (params) => {
  return axios.get("/freeboard/search", { params }).then((res) => res.data);
};

// 자유게시판 글 작성 등록
export const postFreeWriteApi = (params) => {
  return axios.post("/freeboard/register", params).then((res) => res.data);
};

// 자유게시판 글 수정
export const putFreeModifyApi = (params) => {
  return axios.put("/freeboard/modify", params).then((res) => res.data);
};

// 자유게시판 상세 글 불러오기
export const getFreeDetailApi = (params) => {
  return axios.get("/freeboard/content", { params }).then((res) => res.data);
};

// 자유게시판 글 삭제
export const deleteFreeDeleteApi = () => {};
