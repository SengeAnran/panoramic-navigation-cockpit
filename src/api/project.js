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
// 人才详情
export const getProjectDetails = (data) => {
  return axios.post('/api/project/details', data);
};
// 获取研究热词
export const getResearchWords = (data) => {
  return axios.post('/api/project/researchWords', data);
};

// 获取二级领域前沿分析
export const getFieldTrend = (data) => {
  return axios.post('/api/project/fieldTrend', data);
};
// 获取二级领域相关度分析
export const getChordData = (data) => {
  return axios.post('/api/project/chordData', data);
};
// 企业详情

// 获取二级领域相关度分析
export const getEnterprise = (orgId) => {
  return axios.get(`/api/project/getEnterprise/${orgId}`);
};
