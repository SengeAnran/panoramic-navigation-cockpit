import axios from '@/utils/axios';

// // 用户信息
// export const getUserInfo = () => {
//   return axios.get('/api/user/getUserDetail');
// };
// 获取业务导览列表
export const getBusinessDirectory = (data) => {
  return axios.request({
    method: 'POST',
    url: '/api/businessDirectory/getList',
    data,
  });
};

// 获取地域导览列表
export const getAreaDirectory = (data) => {
  return axios.request({
    method: 'POST',
    url: '/api/areaDirectory/getList',
    data,
  });
};

// 获取技术导览列表
export const getTechnicalDirectory = (data) => {
  return axios.request({
    method: 'POST',
    url: '/api/technicalDirectory/getList',
    data,
  });
};

// 获取高频词列表
export const getHighFrequencyWords = (data) => {
  return axios.request({
    method: 'POST',
    url: '/api/highFrequencyWords/getList',
    data,
  });
};
