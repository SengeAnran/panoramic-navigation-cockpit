import axios from '@/utils/axios';

// 用户信息
export const getUserInfo = () => {
  return axios.get('/api/user/getUserDetail');
};
// 登录
export const userLogin = (data) => {
  console.log(data);
  return axios.request({
    method: 'POST',
    url: '/api/user/login',
    data,
  });
};

// 天气
export const getWeatherInfo = () => {
  return axios.get('/open/index/executor/api/wljt/tq/tqyb');
};
