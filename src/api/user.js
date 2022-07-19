import axios from '@/utils/axios';

// 用户信息
export const getUserInfo = () => {
  return axios.get('/open/index/base/user/me');
};

// 天气
export const getWeatherInfo = () => {
  return axios.get('/open/index/executor/api/wljt/tq/tqyb');
};
