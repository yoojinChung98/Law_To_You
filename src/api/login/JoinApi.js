import axios from '../Axios';

// 회원가입(사용자)
export const postUserJoinApi = (params) => {
  return axios.post('/user/join', params).then((res) => res.data);
};

// 회원가입(변호사)
export const postLawyerJoinApi = (params) => {
  return axios.post('/lawyer/join', params).then((res) => res.data);
};

// 아이디 중복확인
export const getIdDuplicateApi = (params) => {
  return axios.get('/user/checkId', { params }).then((res) => res.data);
};

// 닉네임 중복확인
export const getNickDuplicateApi = (params) => {
  return axios.get('/user/checkName', { params }).then((res) => res.data);
};

// 이메일 중복확인
export const getEmailDuplicateApi = (params) => {
  return axios.get('/user/email', { params }).then((res) => res.data);
};

// 이메일 인증번호 요청
export const postMailSendApi = (params) => {
  return axios.post('/user/mailSend', params).then((res) => res.data);
};

// 이메일 인증번호 확인
export const postMailAuthCheckApi = (params) => {
  return axios.post('/user/mailauthCheck', params).then((res) => res.data);
};
