import axios from '../Axios';

export const getKakaoApi = (params) => {
  return axios.get('/user/kakaoLogin', { params }).then((res) => res.data);
};

export const getNaverApi = (params) => {
  return axios.get('/user/naverLogin', { params }).then((res) => res.data);
};
