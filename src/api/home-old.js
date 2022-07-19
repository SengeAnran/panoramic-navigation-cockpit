import axios from '@/utils/axios';

// 首页-未来乡村简介
export const getBrief = (params) => {
  return axios.get('/open/index/executor/api/getbriefintroduction', { params });
};

// 首页-户籍人口
export const getLocalpopulation = (params) => {
  return axios.get('/open/index/executor/api/getLocalpopulation', { params });
};

// 首页-年龄分布
export const getAgeData = (params) => {
  return axios.get('/open/index/executor/api/getagedistribution', { params });
};

// 首页-性别分布
export const getSexData = (params) => {
  return axios.get('/open/index/executor/api/getGenderdistribution', { params });
};

// 首页-荣誉
export const getHonorData = (params) => {
  return axios.get('/open/index/executor/api/getVillagehonor', { params });
};

// 首页-健康码
export const getHealthCodeData = (params) => {
  return axios.get('/open/index/executor/api/xczl/yqfk/lms', { params });
};

// 首页-健康码名单
export const getRedYellowPeople = (params) => {
  return axios.get('/open/index/executor/api/xczl/yqfk/ycmmd', { params });
};

// 基层治理
export const getManageData = (params) => {
  return axios.get('/open/index/executor/api/getGrassrootsgovernance', { params });
};

// todo：气象灾害 - 无数据来源 - 不对接
export const getWeatherData = (params) => {
  return axios.get('/open/index/executor/api/getWeatherwarning', { params });
};

// 首页-慢病管理
export const getSlowData = (params) => {
  return axios.get('/open/index/executor/api/getChronicdiseasemanagement', { params });
};
