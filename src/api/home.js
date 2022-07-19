import axios from '@/utils/axios';
// 村落概况
// const path = process.env.VUE_APP_ENV === "production"? "" : "/api";
const path = '/open/index/executor/';

//【省级】共同富裕-增收共富
export function getIncome(params) {
  return axios({
    url: path + '/api/prosperity/income',
    method: 'get',
    params,
  });
}
//【省级】共同富裕-乡村新业态
export function getVillage(params) {
  return axios({
    url: path + '/api/prosperity/village',
    method: 'get',
    params,
  });
}
//【省级】数字应用
export function getApplication(params) {
  return axios({
    url: path + '/api/digital/application',
    method: 'get',
    params,
  });
}
//【省级】美丽风貌-美丽庭院
export function getCourtyard(params) {
  return axios({
    url: path + '/api/beauty/courtyard',
    method: 'get',
    params,
  });
}
//【省级】美丽风貌-三大革命
export function getRevolution(params) {
  return axios({
    url: path + '/api/beauty/revolution',
    method: 'get',
    params,
  });
}
// ************* 右侧
//【省级】未来乡村建设进度
export function getConstructionProgress(params) {
  return axios({
    url: path + '/api/constructionProgress',
    method: 'get',
    params,
  });
}
//【省级】未来乡村审核预警
export function getReviewEarlyWarning(params) {
  return axios({
    url: path + '/api/reviewEarlyWarning',
    method: 'get',
    params,
  });
}
//【省级】乡风人文-文化活动
export function getCulturalActivity(params) {
  return axios({
    url: path + '/api/culturalActivity',
    method: 'get',
    params,
  });
}
//【省级】乡村人文-一老一小
export function getOneSmall(params) {
  return axios({
    url: path + '/api/oneOld/oneSmall',
    method: 'get',
    params,
  });
}
// 村趣-人气活动
export function getPopularActivities(params) {
  return axios({
    url: path + '/api/popularActivities',
    method: 'get',
    params,
  });
}
// 二十四节气村数量
export function getVillageOverview(params) {
  return axios({
    url: path + '/api/villageOverview',
    method: 'get',
    params,
  });
}
// 农耕文化活动举办数量
export function getActivityNum(params) {
  return axios({
    url: path + '/api/activityNum',
    method: 'get',
    params,
  });
}

// 人气村品
export function getPopSelection(params) {
  return axios({
    url: path + '/api/cunpin',
    method: 'get',
    params,
  });
}
// 村景星级分类
export function getStarRating(params) {
  return axios({
    url: path + '/api/starRating',
    method: 'get',
    params,
  });
}
// 【省级】治理有效相关接口
export function getGovernance(params) {
  return axios({
    url: path + '/api/governanceIsEffective',
    method: 'get',
    params,
  });
}

//*********************************中间**********************************************//
// 【省级】治理有效相关接口
export function getPartyLeader(params) {
  return axios({
    url: path + '/api/partyLeader/pro',
    method: 'get',
    params,
  });
}

// 【省级】治理有效相关接口
export function getPro(params) {
  return axios({
    url: path + '/api/warn/pro',
    method: 'get',
    params,
  });
}










// --- 左三 醉美村景top10
export function getPrettiestView(params) {
  return axios({
    url: path + '/api/beautifulVillageView',
    method: 'get',
    params,
  });
}
// 农家乐经营一件事
export function getFarmhouseManagement(params) {
  return axios({
    url: path + '/farmhouseManagement',
    method: 'get',
    params
  });
}

// 农家乐数量分布
export function getAgritainmentDistribution(params) {
  return axios({
    url: path + '/agritainmentDistribution',
    method: 'get',
    params
  });
}

// 历史文化重点保护村类型
export function getHistoryCultureType(params) {
  return axios({
    url: path + '/historyCultureType',
    method: 'get',
    params
  });
}

// 历史文化重点保护村数量分布
export function getHistoryCultureDistribution(params) {
  return axios({
    url: path + '/historyCultureDistribution',
    method: 'get',
    params
  });
}

// 24节气村数量分布
export function getSolarTermDistribution(params) {
  return axios({
    url: path + '/solarTermDistribution',
    method: 'get',
    params
  });
}

// 农业文化遗产地数量分布
export function getAgriculturalHeritageDistribution(params) {
  return axios({
    url: path + '/agriculturalHeritageDistribution ',
    method: 'get',
    params
  });
}

//  历史文化村落保护项目数量分布
export function getProtectionItem(params) {
  return axios({
    url: path + '/protectionItem',
    method: 'get',
    params
  });
}

//  历史文化村落保护项目数量分布
export function getLocationDistribution(data) {
  return axios({
    url: path + '/locationDistribution',
    method: 'post',
    data
  });
}

//  （浙农游）（县级）查询位置分布带点位坐标
export function getConlocationDistribution(data) {
  return axios({
    url: path + '/conlocationDistribution',
    method: 'post',
    data
  });
}

// （市级以下）24节气村数量分布
export function getCitySolarTermDistribution(params) {
  return axios({
    url: path + '/citySolarTermDistribution',
    method: 'get',
    params
  });
}

// （市级以下）农业文化遗产地数量分布
export function getCityAgriculturalHeritage(params) {
  return axios({
    url: path + '/cityAgriculturalHeritage',
    method: 'get',
    params
  });
}

// （市级以下）历史文化重点保护村数量分布
export function getCityHistoryCulture(params) {
  return axios({
    url: path + '/cityHistoryCulture',
    method: 'get',
    params
  });
}

// （市级以下）农家乐数量分布
export function getCityAgritainment(params) {
  return axios({
    url: path + '/cityAgritainment',
    method: 'get',
    params
  });
}

// （市级以下）历史文化村落保护项目数量分布
export function getCityProtectionItem(params) {
  return axios({
    url: path + '/cityProtectionItem',
    method: 'get',
    params
  });
}

// （县级以下）24节气村数量分布
export function getConSolarTermDistribution(params) {
  return axios({
    url: path + '/conSolarTermDistribution',
    method: 'get',
    params
  });
}

// （县级以下）农业文化遗产地数量分布
export function getConAgriculturalHeritage(params) {
  return axios({
    url: path + '/conAgriculturalHeritage',
    method: 'get',
    params
  });
}

// （县级以下）历史文化重点保护村数量分布
export function getConHistoryCulture(params) {
  return axios({
    url: path + '/conHistoryCulture',
    method: 'get',
    params
  });
}

// （县级以下）农家乐数量分布
export function getConAgritainment(params) {
  return axios({
    url: path + '/conAgritainment',
    method: 'get',
    params
  });
}

// （县级以下）历史文化村落保护项目数量分布
export function getConProtectionItem(params) {
  return axios({
    url: path + '/conProtectionItem',
    method: 'get',
    params
  });
}

// --- 左二 历史文化村落保护
export function getHisInformation(params) {
  return axios({
    url: path + '/hisInformation',
    method: 'get',
    params
  });
}



// --- top  地图顶部统计数据
export function getTotalStatistic(params) {
  return axios({
    url: path + '/numquery',
    method: 'get',
    params
  });
}
