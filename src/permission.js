import router from './router/index';
import config from './config/appConfig';

const whiteList = []; // no redirect whitelist

router.beforeEach(async (to) => {
  // 不验证登录
  if (!config.isLogin) return;
  // 在白名单路由内
  if (whiteList.includes(to.path)) return;
});
