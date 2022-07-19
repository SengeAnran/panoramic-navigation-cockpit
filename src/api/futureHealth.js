import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}
// 医疗健康-签约人员年龄分布
export const getAgeData = () => {
  return axios.get(buildUrl('/api/jk/qyryryfb'));
};
// 医疗健康-家庭医生签约情况
export const getDoctorData = () => {
  return axios.get(buildUrl('/api/getFamilyDoctor'));
};
// 医疗健康-医疗服务
export const getMedicalHealth = () => {
  return axios.get(buildUrl('/api/getMedicalHealth'));
};

// 疫情防控-总览
export const getTotalData = () => {
  return axios.get(buildUrl('/api/xczl/yqfk/lms'));
};

// 疫情防控-红黄码名单
export const getHealthCodeData = (params) => {
  return axios.get(buildUrl('/api/xczl/yqfk/ycmmd'), { params });
};

// 疫情防控-新冠疫苗接种情况
export const getVaccineData = () => {
  return axios.get(buildUrl('/api/xczl/ymjz/jzz'));
};

// 慢病管理
export const getFreeMedicine = () => {
  return axios.get(buildUrl('/api/getFreeMedicine'));
};

// 预警动态
export const getChangeManagement = (params) => {
  return axios.get(buildUrl('/api/getChangeManagement'), { params });
};

// // 慢病管理-慢病趋势
// export const getTrendData = (params) => {
//   return axios.get('/open/index/executor/api/wljk/mbgl/mbqs', { params });
// };

// // 慢病管理-慢病管理者
// export const getManageInfo = (params) => {
//   return axios.get('/open/index/executor/api/wljk/mbgl/mbglz', { params });
// };

// // 疫情防控-接种统计
// export const getVaccinateStat = (params) => {
//   return axios.get('/open/index/executor/api/wljk/yqfk/jztj', { params });
// };

// // 疫情防控-健康码统计
// export const getCodeStat = (params) => {
//   return axios.get('/open/index/executor/api/wljk/yqfk/jkmtj', { params });
// };

// // 疫情防控-红黄码人员
// export const getPeopleStat = (params) => {
//   return axios.get('/open/index/executor/api/wljk/yqfk/hhmry', { params });
// };

// // 智慧医疗-统计数据
// export const getMedicalStat = (params) => {
//   return axios.get('/open/index/executor/api/wljk/zhyl/tjsj', { params });
// };

// // 地图打点-慢病人员信息列表
// export const getMbryxx = (params) => {
//   return axios.get('/open/index/executor/api/wljk/dtdd/mbryxx', { params });
// };

// // 地图打点-根据id查询人员信息
// export const getDtddById = (params) => {
//   return axios.get('/open/index/executor/api/wljk/dtdd/byId', { params });
// };
