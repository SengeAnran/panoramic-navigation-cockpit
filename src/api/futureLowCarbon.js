import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

/**
 * 低碳
 */

export const leftApi = {
  /** 垃圾分类精准率/垃圾分类参与率 */
  ljfljzl: () => {
    return axios.get(buildUrl('/api/sthj/ljfl/ljfljzl'));
  },
  /** 当前易腐垃圾信息 */
  yfljxx: () => {
    return axios.get(buildUrl('/api/sthj/ljfl/yfljxx'));
  },
  /** 有光伏户数 */
  ygf: () => {
    return axios.get(buildUrl('/api/xczl/ygf'));
  },
  /** 用电量分布 */
  ydlfb: () => {
    return axios.get(buildUrl('/api/xczl/ydlfb'));
  },
};

export const rightApi = {
  /** 指标 */
  sswscll: () => {
    return axios.get(buildUrl('/api/sthj/hjjc/sswscll'));
  },
  /** 本周污水处理趋 */
  bywsclqs: () => {
    return axios.get(buildUrl('/api/sthj/hjjc/bywsclqs'));
  },
  /** 五类环境指标趋势 */
  bywlhjzbqs: () => {
    return axios.get(buildUrl('/api/sthj/hjjc/bywlhjzbqs'));
  },
  /** 厕所位置/类型/服务人数 */
  gettoiletserviceinformation: () => {
    return axios.get(buildUrl('/api/gettoiletserviceinformation'));
  },
};

// 地图
export const mapApi = {};
