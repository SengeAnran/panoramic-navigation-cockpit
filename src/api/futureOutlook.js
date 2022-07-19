import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

export const rightApi = {
  /** 未来风貌-农民建房-农名建房统计 */
  jftj: () => {
    return axios.get(buildUrl('/api/fm/nmjf/jftj'));
  },
  /** 未来风貌-农民建房-产权证办理 */
  cqzbl: () => {
    return axios.get(buildUrl('/api/fm/nmjf/cqzbl'));
  },
  /** 未来风貌-美丽庭院-庭院列表 */
  mltylb: () => {
    return axios.get(buildUrl('/api/fm/mlty/mltylb'));
  },
  /** 未来风貌-美丽庭院-庭院统计 */
  mltytj: () => {
    return axios.get(buildUrl('/api/fm/mlty/mltytj'));
  },
};

// 未来风貌-村庄规划
export default {
  villagePlan(params) {
    return axios.get('/open/index/executor/api/fm/czgh/czgh', { params });
  },
  protect(params) {
    return axios.get('/open/index/executor/api/fm/lswhclbh/clbh', { params });
  },
};

// // 未来风貌-历史文化村落保护
// export const getHistoryVillage = (params) => {
//   return axios.get('/open/index/executor/api/wlfm/lswhclbh/clbh', { params });
// };

// // 未来风貌-农民建房-产权证办理
// export const getApply = (params) => {
//   return axios.get('/open/index/executor/api/wlfm/nmjf/jftj', { params });
// };

// // 未来风貌-农民建房-农名建房统计
// export const getBuild = (params) => {
//   return axios.get('/open/index/executor/api/wlfm/nmjf/cqzbl', { params });
// };

// // 未来风貌-美丽庭院
// export const getYard = (params) => {
//   return axios.get('/open/index/executor/api/wlfm/mlty/mltytj', { params });
// };

// export const mapApi = {
//   // 地图打点-类别列表
//   getTypeList() {
//     return axios.get('/open/index/executor/api/wlfm/dtdd/lblb');
//   },
//   // 地图打点
//   getListOfType: (params) => {
//     return axios.get('/open/index/executor/api/wlfm/dtdd/dwxx', { params });
//   },
// };
