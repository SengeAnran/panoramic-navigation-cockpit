import axios from 'axios';
import config from '@/config/appConfig';

const baseURL = config.mapHost;

const option = {
  baseURL: baseURL,
};

// 创建 axios 实例
const service = axios.create(option);

// http request 拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err),
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (!res) {
      return Promise.reject(new Error((res && res.message) || '未知异常！'));
    } else {
      return res;
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      return null;
    }
    return Promise.reject(error);
  },
);

export default service;
