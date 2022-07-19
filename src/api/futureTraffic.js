import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

// 未来交通 - 快递站点
export const getExpressStation = (params) => {
  return axios.get(buildUrl('/api/getExpressSite'), { params });
};

// 未来交通 - 智慧出行
export const getIntelligentTravel = (params) => {
  return axios.get(buildUrl('/api/getIntelligenceTravel'), { params });
};

// 未来交通 - 智慧引导
export const getIntelligentGuide = (params) => {
  return axios.get(buildUrl('/api/getIntelligenceGuide'), { params });
};

// 未来交通 - 违停抓拍
export const getIllegalParkingMonitor = (params) => {
  return axios.get(buildUrl('/api/getLllegalStop'), { params });
};

// 未来交通 - 路口监控
export const getCrossroadsMonitor = (params) => {
  return axios.get(buildUrl('/api/getMonitorList'), { params });
};
