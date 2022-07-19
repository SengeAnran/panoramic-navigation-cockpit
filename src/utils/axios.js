import axios from 'axios';
import config from '@/config/appConfig';
import storage from '@/utils/storage';
import md5 from 'crypto-js/md5';

const appKey = '315d557e298f';
const appSecret = 'ad8e576436c14592b6563c7601ad3f00';

const baseURL = config.apiHost;

const option = {
  baseURL: baseURL,
};

// 创建 axios 实例
const service = axios.create(option);

// http request 拦截器
service.interceptors.request.use(
  (config) => {
    // 全局设置token
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    // 全局设置orgId参数
    const orgId = storage.getOrgId();
    const method = config.method.toLocaleLowerCase();
    if (method === 'get') {
      const params = { ...(config.params || {}), orgId };
      // const params = { ...(config.params || {}), orgId, area: '330521003208' };
      config.params = params;
    } else {
      const data = { ...(config.data || {}), orgId };
      // const data = { ...(config.data || {}), orgId, area: '330521003208' };
      config.data = data;
    }
    // 签名
    const timestamp = Number(new Date());
    const signParams = `appKey=${appKey}&appSecret=${appSecret}&timestamp=${timestamp}`;
    const sign = md5(signParams).toString();
    config.headers.appKey = appKey;
    config.headers.timestamp = timestamp;
    config.headers.sign = sign;
    return config;
  },
  (err) => Promise.reject(err),
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 判断处理结果是文件类型时，不对结果集处理，直接返回
    if (res instanceof Blob) {
      return response;
    }
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (!res.success) {
      return Promise.reject(new Error((res && res.message) || '未知异常！'));
    } else {
      return res.data;
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
