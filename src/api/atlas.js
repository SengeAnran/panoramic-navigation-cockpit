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

// 获取系统地图点位
export const getSystemPoints = (data) => {
  return axios.post('/api/slot/getList', data);
};

// 获取公司点位详情
export const getSystemDetail = (id) => {
  return axios.post('/api/slot/system', { id });
};
