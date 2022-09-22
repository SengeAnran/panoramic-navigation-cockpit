import axios from '@/utils/axios';

// 获取项目类型列表
export const getProjectTypeList = (data) => {
  return axios.request({
    method: 'GET',
    url: '/api/project/getProjectTypeList',
    data,
  });
};
