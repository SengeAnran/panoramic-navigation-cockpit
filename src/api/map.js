import axios from '@/utils/axios-for-map';
import axios2 from '@/utils/axios';
import config from '@/config/appConfig';

const BASE_URL = '/open/index/executor';

function buildUrl(path) {
  return BASE_URL + path;
}

const basicUrl = config.mapHost;
const serveUrl = {
  卫星影像:
    '/arcgisrest/XCZL_zhenjiedaoyingxiang-20220223-arcgisrest/bfba6bb4-f61c-47ba-9d04-751399cd18ca/tile/{TileMatrix}/{TileRow}/{TileCol}',
  空间规划:
    '/arcgisrest/tudiliyongguihua-20200110-arcgisrest/bfba6bb4-f61c-47ba-9d04-751399cd18ca/0/query?where=xzqmc%3d%27五四村%27&f=geojson&outFields=*',
  空间现状:
    '/arcgisrest/XCZL_tudiliyongxianzhuang-20200319-arcgisrest/bfba6bb4-f61c-47ba-9d04-751399cd18ca/0/query?where=QSDWMC%3d%27五四村%27&f=geojson&outFields=*',
  网格化管理: config.baseUrl + '/geojson/wusicun-wangge.json',
};

export function getServerUrlByName(name, isLocal) {
  if (serveUrl[name]) {
    const urlPre = isLocal ? '' : basicUrl;
    return urlPre + serveUrl[name];
  }
  return undefined;
}

export function getPlanRendererInfo() {
  return axios.get('/arcgisrest/tudiliyongguihua-20200110-arcgisrest/bfba6bb4-f61c-47ba-9d04-751399cd18ca/0?f=json');
}

export function getStatusRendererInfo() {
  return axios.get(
    '/arcgisrest/XCZL_tudiliyongxianzhuang-20200319-arcgisrest/bfba6bb4-f61c-47ba-9d04-751399cd18ca/0?f=json',
  );
}

// 地图-查询全部人员信息
export const getWusiPeopleList = (params) => {
  return axios2.get(buildUrl('/api/getWusiPeopleList'), { params });
};

// 地图-根据re_id查询房屋人员信息
export const getReidPeopleList = (params) => {
  return axios2.get(buildUrl('/api/getReidPeopleList'), { params });
};

// 地图-根据re_id请求村民一生事
export const getVillagersLifeEvt = (params) => {
  return axios2.get(buildUrl('/api/getVillagersLifeEvt'), { params });
};

// 党员点位
export const getPartyMemberPoint = (params) => {
  return axios2.get(buildUrl('/api/getPartyMemberPoint'), { params });
};

// 旅游景点
export const getScenicPoint = (params) => {
  return axios2.get(buildUrl('/api/getScenicPoint'), { params });
};

// 土地流转
export const getMassifPoint = (params) => {
  return axios2.get(buildUrl('/api/getMassifPoint'), { params });
};

// 乡村民宿
export const getHotelPoint = (params) => {
  return axios2.get(buildUrl('/api/getHotelPoint'), { params });
};

// 农业企业
export const getAgriculturalenterpriselocation = (params) => {
  return axios2.get(buildUrl('/api/getAgriculturalenterpriselocation'), { params });
};

// 水利防汛
export const getSlfx = (params) => {
  return axios2.get(buildUrl('/api/zh/slfx'), { params });
};

// 水利防汛
export const getDwxx = (params) => {
  return axios2.get(buildUrl('/api/fm/dtdd/dwxx'), { params });
};

// 文化地图打点
// 类型 1最美家庭 2文明家庭 3景点 4农家乐
export const getDtdd = (params) => {
  return axios2.get(buildUrl('/api/wh/dtdd'), { params });
};

// 慢病管理
export const getChangeManagement = (params) => {
  return axios2.get(buildUrl('/api/getChangeManagement'), { params });
};

// 公共厕所
export const getCommonTopJump = (params) => {
  return axios2.get(buildUrl('/api/getCommonTopJump'), { params });
};

// 污水处理点位
export const getWscldw = (params) => {
  return axios2.get(buildUrl('/api/sthj/hjjcdw/wscldw'), { params });
};

// 垃圾分类收集站
export const getLjfl = (params) => {
  return axios2.get(buildUrl('/api/sthj/ljfldw/ljfl'), { params });
};

// 用电量
export const getYdlfx = (params) => {
  return axios2.get(buildUrl('/api/dt/ydlfx'), { params });
};

// 公交站点
export const getGjzd = (params) => {
  return axios2.get(buildUrl('/api/jt/gjzd'), { params });
};

// 共享自行车站点
export const getGxzxczd = (params) => {
  return axios2.get(buildUrl('/api/jt/gxzxczd'), { params });
};

// 快递站点
export const getKdzd = (params) => {
  return axios2.get(buildUrl('/api/jt/kdzd'), { params });
};

// 停车场 公交线路
export const getTrafficPoint = (params) => {
  return axios2.get(buildUrl('/api/getTrafficPoint'), { params });
};

// 遥感监控
export const getYgjk = (params) => {
  return axios2.get(buildUrl('/api/zl/ygjk'), { params });
};

// 遥感监控-详情
export const getYgjkxq = (params) => {
  return axios2.get(buildUrl('/api/zl/ygjkxq'), { params });
};
