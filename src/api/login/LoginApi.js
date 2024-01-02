import axios from '../Axios';

export const getLoginApi = (params) => {
  return axios.post('/user/login', params).then((res) => res.data);
};
