import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}
/**
 * 邻里
 */

export const leftApi = {
  /** 第三季度走访情况 */
  getHelpSituation: () => {
    return axios.get(buildUrl('/api/ll/getHelpSituation'));
  },
  /** 重点关注人群 */
  getImportantPeople: () => {
    return axios.get(buildUrl('/api/ll/getImportantPeople'));
  },
  /** 五类老人 */
  getElderlyCare: () => {
    return axios.get(buildUrl('/api/ll/getElderlyCare'));
  },
  /** 养老服务 */
  getOldSexAnalysis: () => {
    return axios.get(buildUrl('/api/ll/getOldSexAnalysis'));
  },
  /** 人员清单 */
  getOldPeopleList: () => {
    return axios.get(buildUrl('/api/ll/getOldPeople'));
  },
};
// 15分钟幸福生活圈
export const getCircleData = (params) => {
  return axios.get('/open/index/executor/api/ll/xfshq', { params });
};

// 礼堂预约
export const getHallBooking = (params) => {
  return axios.get('/open/index/executor/api/ll/ltyy', { params });
};

// 预约列表
export const getBookingList = (params) => {
  return axios.get('/open/index/executor/api/ll/yylb', { params });
};
