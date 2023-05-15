import axios from '@/utils/axios';

// 获取项目类型列表
export const getProjectTypeList = (data) => {
  return axios.request({
    method: 'GET',
    url: '/api/project/getProjectTypeList',
    data,
  });
};

export const getProjectList = (data) => {
  return axios.post('/api/project/getProjectList', data);
};
export const getProjectDetail = (id) => {
  return axios.get(`/api/project/getProjectDetails/${id}`);
};

// 获取项目以及图谱信息
export const getProjectGraphBall = (id) => {
  return axios.get(`/api/project/getProjectGraphBall/${id}`);
};
