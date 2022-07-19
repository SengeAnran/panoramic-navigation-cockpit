import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

export const leftApi = {
  /** 班子架构 */
  getPartyorganizationstructure: (params) => {
    return axios.get(buildUrl('/api/getPartyorganizationstructure'), { params });
  },
  /** 班子架构/村干部个人信息 */
  getVillagecadres: () => {
    return axios.get(buildUrl('/api/getVillagecadres'));
  },
  /** 包网入户 */
  getNetworkaccess: () => {
    return axios.get(buildUrl('/api/getNetworkaccess'));
  },
  /** 强村项目 */
  getbuildingstrongvillageproject: () => {
    return axios.get(buildUrl('/api/getbuildingstrongvillageproject'));
  },
  /** 群众评价 */
  getMassevaluation: () => {
    return axios.get(buildUrl('/api/getMassevaluation'));
  },
  /** 幸福阵地 */
  getHappyposition: () => {
    return axios.get(buildUrl('/api/getHappyposition'));
  },
  /** 组织生活 */
  getOrganizationallife: () => {
    return axios.get(buildUrl('/api/getOrganizationallife'));
  },
  /** 局长帮扶 */
  getDirectorshelppopup: () => {
    return axios.get(buildUrl('/api/getDirectorshelppopup'));
  },
  /** 联村走访 */
  getLiancunvisit: () => {
    return axios.get(buildUrl('/api/getLiancunvisit'));
  },
  /** 阵地满意度 */
  getPositionsatisfaction: () => {
    return axios.get(buildUrl('/api/getPositionsatisfaction'));
  },
};

export default {
  partyAge() {
    return axios.get('/open/index/executor/api/getOverviewofPartymembers');
  },
  year() {
    return axios.get('/open/index/executor/api/getPartyAge');
  },
  volunteer() {
    return axios.get('/open/index/executor/api/getVolunteer');
  },
  tinyWish() {
    return axios.get('/open/index/executor/api/getTinyWish');
  },
  partyPoint() {
    return axios.get('/open/index/executor/api/getPartyPoint');
  },
  partyAnalysis(params) {
    return axios.get('/open/index/executor/api/getPartyAnalysis', { params });
  },
  developmentTendency() {
    return axios.get('/open/index/executor/api/getDevelopmentTendency');
  },
  lastFiveIncome() {
    return axios.get('/open/index/executor/api/getLastFiveIncome');
  },
  developmentEvaluation() {
    return axios.get('/open/index/executor/api/getDevelopmentEvaluation');
  },
  happinessIndex(params) {
    return axios.get('/open/index/executor/api/getHappinessIndex', { params });
  },
  threeService(params) {
    return axios.get('/open/index/executor/api/getThreeService', {
      params,
    });
  },
  happinessFund(params) {
    return axios.get('/open/index/executor/api/getHappinessFund', {
      params,
    });
  },
};
// 党员点位
// export const getPartyMemberPoint = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getPartyMemberPoint', { params });
// };

// // 联户详情
// export const getUnionDetailList = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getUnionDetailList', { params });
// };

// // 组织架构
// export const getOrgData = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getOrgData', { params });
// };

// // 三会一课
// export const getShykData = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getShykData', { params });
// };

// // 党员结构
// export const getPartyMemberStruct = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getPartyMemberStruct', { params });
// };

// // 主题党日
// export const getThemeParty = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getThemeParty', { params });
// };

// // 党员积分
// export const getPartyScore = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getPartyScore', { params });
// };

// // 党员积分-弹窗
// export const getPartyScoreList = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getPartyScoreList', { params });
// };

// // 先进事迹
// export const getMeritoriousDeeds = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getMeritoriousDeeds', { params });
// };

// // 党性体检
// export const getPartyExam = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getPartyExam', { params });
// };

// // 党性体检-弹窗
// export const getPartyExamList = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getPartyExamList', { params });
// };

// // 联户帮扶
// export const getUnionHelp = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getUnionHelp', { params });
// };

// // 民主评议
// export const getReview = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getReview', { params });
// };

// // 党员资料
// export const getPartyMemberDetail = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getPartyMemberDetail', { params });
// };

// // 先锋指数
// export const getVanguardInfo = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getVanguardInfo', { params });
// };

// // 联户数据
// export const getUnionData = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getUnionData', { params });
// };

// // 近期联户
// export const getRecentUnion = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getRecentUnion', { params });
// };

// // 办事趋势
// export const getEventTrend = (params) => {
//   return axios.get('/open/index/executor/api/djyl/getEventTrend', { params });
// };
