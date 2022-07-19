import axios from '@/utils/axios';
const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

/**
 * 治理
 */

export const leftApi = {
  /** 村情民意-事件统计 */
  cqmy: () => {
    return axios.get(buildUrl('/api/zl/cqmy'));
  },
  /** 村情民意 - 事件类型分析 */
  lxfx: () => {
    return axios.get(buildUrl('/api/zl/lxfx'));
  },
  /** 清廉乡村 - 收入支出明细 */
  srzcmx: (params) => {
    return axios.get(buildUrl('/api/xczl/srzcmx'), { params });
  },
  /** 村情民意 - 事件处理流程 */
  sjcllc: (params) => {
    return axios.get(buildUrl('/api/xczl/sjcllc'), { params });
  },
  /** 清廉乡村 - 阳光理财收入支出占比明细 */
  yglcsrzczbmx: (params) => {
    return axios.get(buildUrl('/api/xczl/yglcsrzczbmx'), { params });
  },
  /**  清廉乡村 - 监督一点通 */
  jdydt: (params) => {
    return axios.get(buildUrl('/api/xczl/jdydt'), { params });
  },
  // 获取近三个月
  getTreeMonth: (params) => {
    return axios.get(buildUrl('/api/zl/getTreeMonth'), { params });
  },
  // 获取趋势的type
  getFiveDrop: (params) => {
    return axios.get(buildUrl('/api/zl/getFiveDrop'), { params });
  },
  /**  村情民意 - 五类环境相关事件趋势 */
  getFiveTrend: (params) => {
    return axios.get(buildUrl('/api/zl/getFiveTrend'), { params });
  },
  /**  村情民意 - 亲清直通码 */
  getQrCode: (params) => {
    return axios.get(buildUrl('/api/zl/getQrCode'), { params });
  },
  /** 遥感监测 */
  getYgjkCount: (params) => {
    return axios.get(buildUrl('/api/zl/getYgjkCount'), { params });
  },
};

export const rightApi = {
  /** 普法宣传 */
  getPublicizeData: () => {
    return axios.get(buildUrl('/api/xczl/dxal'));
  },
  /** 共享法庭联系人名单 */
  getConnectorData: () => {
    return axios.get(buildUrl('/api/xczl/gxftlxrmd'));
  },
  /** 失信人员名单 */
  getDishonestData: () => {
    return axios.get(buildUrl('/api/xczl/sxrymd'));
  },
  /** 链接图片 */
  rightPic: () => {
    return axios.get(buildUrl('/api/zl/rightPic'));
  },
};

// 地图
export const mapApi = {
  // 图标类别
  getTypeList: (params) => {
    return axios.get('/open/index/executor/api/wlsc/sclb/tblb', { params });
  },
  // 查询点位列表
  getListOfType: (params) => {
    return axios.get('/open/index/executor/api/wlsc/jkdw/cxdw', { params });
  },
  // 查询设备信息
  getDeviceInfo: (params) => {
    return axios.get('/open/index/executor/api/wlsc/jksb/sbxx', { params });
  },
};
