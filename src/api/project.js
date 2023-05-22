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

// 获取高新技术企业基本信息
export const getEnterprise = (orgId) => {
  return axios.get(`/api/project/getEnterprise/${orgId}`);
};
// 获取项目企业的产业信息
export const getTndustryInfo = (id) => {
  return axios.get(`/api/project/industry/${id}`);
};

//机构详情
// 获取学校信息详情
export const getSchoolInfo = (orgId) => {
  return axios.get(`/api/project/getSchool/${orgId}`);
};

// 获取学校的一级领域信息
export const getSchoolFirstLevel = (id) => {
  return axios.get(`/api/project/getSchoolFirstLevel/${id}`);
};
// 获取项目企业的子领域分数
export const getProjectFraction = (orgId, fieldParentId) => {
  return axios.get(`/api/project/getProjectFraction/${orgId}/${fieldParentId}`);
};
