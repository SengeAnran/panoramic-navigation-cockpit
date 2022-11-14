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

export const getSystemPoints = () => {
  return axios.post('/api/slot/getList');
};

// 切换显示模式
export const changeToggle = (data) => {
  return axios.request({
    method: 'post',
    url: '/api/graph/toggle',
    data,
  });
};
