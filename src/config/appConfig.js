let baseUrl = process.env.BASE_URL;
if (baseUrl.length && baseUrl[baseUrl.length - 1] === '/') {
  baseUrl = baseUrl.slice(0, baseUrl.length - 1);
}
const prodConfig = {
  prodOrDev: 'prod', // 正式环境
  apiHost: '/apiProxyCockpit', // 接口代理
  mapHost: 'https://xfsqxcx.deqing.gov.cn/arcgis',
  userHost: '/userProxy', // 用户模块代理
  width: 3840,
  height: 1080,
  isLogin: true,
  tdtUrl: 'https://t{s}.tianditu.gov.cn/',
  tdtSubdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  tdtToken: '46b650cc309be209b6bed442e8bc443a',
  cesium: {
    debugShowFramesPerSecond: false,
  },
  baseUrl,
};

const devConfig = {
  prodOrDev: 'dev', // 开发环境
  // apiHost: 'http://172.16.24.139:12003/apiProxyCockpit/open/index/executor', // 接口代理
  apiHost: '/apiProxy', // 接口代理
  userHost: 'http://172.16.24.139:7000/',
  mapHost: 'https://xfsqxcx.deqing.gov.cn/arcgis',
  width: 3840, // 大屏分辨率-宽
  height: 1080, // 大屏分辨率-高
  isLogin: true, // 是否需要验证登录
  tdtUrl: 'https://t{s}.tianditu.gov.cn/',
  tdtSubdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  tdtToken: '46b650cc309be209b6bed442e8bc443a',
  cesium: {
    debugShowFramesPerSecond: true,
  },
  baseUrl,
};

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default config;
