import router from './router/index';
import config from './config/appConfig';
import storage from '@/utils/storage';
import { userLogin } from '@/api/user';

const whiteList = []; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log(to, from);
  // 不验证登录
  if (!config.isLogin) {
    next();
    return;
  }
  // 在白名单路由内
  if (whiteList.includes(to.path)) {
    next();
    return;
  }
  console.log('token', storage.getToken());
  if (!storage.getToken()) {
    try {
      const data = {
        username: 'admin',
        password: '123456',
      };
      const res = await userLogin(data);
      if (res && res.token) {
        storage.setToken(res.token);
      }
    } catch (err) {
      console.log(err);
    }
  }
  next();
});
