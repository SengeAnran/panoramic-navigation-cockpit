// 智慧
import axios from '@/utils/axios';

//  村民一身事
export const getVillagersLife = (params) => {
  return axios.get('/open/index/executor/api/zh/getVillagersLife', { params });
};

// 降雨量统计
export const getRainList = (params) => {
  return axios.get('/open/index/executor/api/sthj/slfx/jyltj', { params });
};

// 降雨量统计
export const getWaterList = (params) => {
  return axios.get('/open/index/executor/api/sthj/slfx/czmc', { params });
};
// // 帮扶关爱-表格
// export const getHelpTable = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/bfga/bflb', { params });
// };

// // 帮扶关爱-残疾户/低保户
// export const getHelpList = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/bfga/rylxlb', { params });
// };

// // 惠民惠农-tab
// export const getFarmerTab = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/hmhn/jetj', { params });
// };

// // 惠民惠农-季度
// export const getFarmerBar = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/hmhn/jdtj', { params });
// };

// // 惠民惠农-饼图
// export const getFarmerPie = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/hmhn/lxsltj', { params });
// };

// // 惠民惠农-弹窗
// export const getFarmerPopup = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/hmhn/bzxmlb', { params });
// };

// // 智慧养老-数据统计
// export const getWisdomData = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/zhyl/sjtj', { params });
// };

// // 智慧养老-人员清单
// export const getWisdomTable = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/zhyl/ryqd', { params });
// };

// // 最多跑一次-table
// export const getRunTable = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/zdpyc/sjlb', { params });
// };

// // 地图点位-数据列表
// export const getMapList = (params) => {
//   return axios.get('/open/index/executor/api/wlfw/dtdw/sjlb', { params });
// };
