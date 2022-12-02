import axios from 'axios';
import config from '@/config/appConfig';
// import storage from '@/utils/storage';
// import md5 from 'crypto-js/md5';
//
// const appKey = '315d557e298f';
// const appSecret = 'ad8e576436c14592b6563c7601ad3f00';

const baseURL = config.voiceApiHost;

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
    const res = response;
    // 判断处理结果是文件类型时，不对结果集处理，直接返回
    if (res instanceof Blob) {
      return response;
    }
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (res.status_code !== 200000) {
      return Promise.reject(new Error((res && res.message) || '未知异常！'));
    } else {
      return res.result;
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled');
      return null;
    }
    return Promise.reject(error);
  },
);

export default service;
