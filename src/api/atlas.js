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
