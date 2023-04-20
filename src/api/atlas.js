// 图谱
import axios from '@/utils/axios';

// 对比图谱
export const getCompareGraph = (data) => {
  return axios.request({
    method: 'post',
    url: '/api/graph/compare',
    data,
  });
};

// 关系图谱
export const getRelationGraph = (data) => {
  return axios.request({
    method: 'post',
    url: '/api/graph/relation',
    data,
  });
};
// 根据id获取节点
export const getNodeById = (data) => {
  return axios.request({
    method: 'post',
    url: `/api/graph/getNode/${data.id}`,
  });
};

// 获取系统地图点位
export const getSystemPoints = (data) => {
  return axios.post('/api/slot/getList', data);
};

// // 获取公司点位详情
// export const getSystemDetail = (id) => {
//   return axios.post('/api/slot/system', { id });
// };

export const getCompanyDetail = (id) => {
  return axios.post('/api/slot/company', { id });
};

// 获取示范系统地区列表
export const getSystemList = (data) => {
  return axios.post('/api/project/getSystemList', data);
};
// 获取示范系统地区详情
export const getSystemDetail = (id) => {
  return axios.get(`/api/project/getSystemDetails/${id}`);
};
// 根据关键词搜索所有相关系统
export const getSystemsTree = (data) => {
  return axios.post('/api/graph/systems', data);
};

// 切换显示模式
export const changeToggle = (data) => {
  return axios.request({
    method: 'post',
    url: '/api/graph/v2/toggle',
    data,
  });
};
