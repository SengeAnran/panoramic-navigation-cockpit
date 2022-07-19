import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

// 未来文化-村史馆
export const getHistoryPlace = () => {
  return axios.get(buildUrl('/api/wh/xcjj/csg'));
};

// 未来文化-文明家庭
export const getFamilyData = () => {
  return axios.get(buildUrl('/api/wh/wmjt/sltj'));
};

// 未来文化-农家书屋
export const getBookData = () => {
  return axios.get(buildUrl('/api/wh/njsw/sltj'));
};

// 未来文化-农家书屋列表
export const getBookList = () => {
  return axios.get(buildUrl('/api/wh/njsw/swlb'));
};

// 未来文化-文化旅游
export const getTravelData = (params) => {
  return axios.get(buildUrl('/api/wh/whly'), { params });
};

// 未来文化-历史文保
export const getProtectData = (params) => {
  return axios.get(buildUrl('/api/wh/lswb'), { params });
};
