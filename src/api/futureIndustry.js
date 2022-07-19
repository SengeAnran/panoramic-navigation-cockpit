import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

/**
 * 产业
 */

export const leftApi = {
  /** 土地流转 */
  getLandTransfer: () => {
    return axios.get(buildUrl('/api/cy/getLandTransfer'));
  },
  /** 2021年总收入 */
  getHomestaysIncomes: () => {
    return axios.get(buildUrl('/api/cy/getHomestaysIncomes'));
  },
  /** 变化趋势 */
  getAnnualHomestayIncome: () => {
    return axios.get(buildUrl('/api/cy/getAnnualHomestayIncome'));
  },
  /** 民宿统计值 */
  getHomestayTotal: () => {
    return axios.get(buildUrl('/api/cy/getHomestayTotal'));
  },
  /** 民宿列表 */
  getHomestayList: () => {
    return axios.get(buildUrl('/api/cy/getHomestayList'));
  },
};

export const rightApi = {
  /** 集体经济 */
  getDevelopmentTendency: () => {
    return axios.get(buildUrl('/api/getDevelopmentTendency'));
  },
  /** 村民收入 */
  getLastFiveIncome: () => {
    return axios.get(buildUrl('/api/getLastFiveIncome'));
  },
};

// 地图
export const mapApi = {
  // 图标类别
  getTypeList: (params) => {
    return axios.get('/open/index/executor/api/wlsc/sclb/tblb', { params });
  },
  // 查询点位列表
  getListOfType: (params) => {
    return axios.get('/open/index/executor/api/wlsc/jkdw/cxdw', { params });
  },
  // 查询设备信息
  getDeviceInfo: (params) => {
    return axios.get('/open/index/executor/api/wlsc/jksb/sbxx', { params });
  },
};
