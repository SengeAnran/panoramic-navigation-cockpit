import { createStore, createLogger } from 'vuex';
import * as Types from './actionTypes';
import { getUserInfo, userLogin } from '@/api/user';
import storage from '@/utils/storage';
import theme from './modules/theme';
import map from './modules/map';
import atlasMap from './modules/atlasMap';
const defaultMainTitle = '全景导览驾驶舱';
export default createStore({
  state: {
    query: [], // 检索词
    intervalId: 0, // 定时器 id
    interval: 0,
    intervalTime: 5000, // 自动切换间隔时间
    userInfo: {},
    orgId: storage.getOrgId() || '', // 数据权限id
    bottomOpacity: false, // 底部透明设置
    contentOpacity: false, // 主体内容透明设置
    mainTitle: defaultMainTitle, // 页面标题
  },
  mutations: {
    [Types.SET_INTERVAL_ID](state, msg) {
      if (msg) {
        state.intervalId = setInterval(() => {
          state.interval++;
        }, 1000);
      } else {
        state.interval = 0;
        clearInterval(state.intervalId);
      }
    },
    // 设置页面标题
    SET_MAIN_TITLE(state, payload) {
      state.mainTitle = payload || {};
    },
    // 重置页面标题
    RESET_MAIN_TITLE(state) {
      state.mainTitle = defaultMainTitle;
    },
    // 用户信息
    SET_USER_INFO(state, payload) {
      state.userInfo = payload || {};
    },
    SET_ORG_ID(state, payload) {
      storage.setOrgId(payload);
      state.orgId = payload;
    },
    // 底部透明设置
    SET_BOTTOM_OPACITY(state, payload) {
      state.bottomOpacity = payload;
    },
    // 底部透明设置
    SET_CONTENT_OPACITY(state, payload) {
      state.contentOpacity = payload;
    },
    // 添加检索词
    ADD_QUERY(state, data) {
      if (state.query.findIndex((i) => i === data) === -1) {
        state.query.push(data);
      }
    },
    // 删除其中一个检索词
    DELETE_ONE_QUERY(state, data) {
      const index = state.query.findIndex((i) => i === data);
      if (index !== -1) {
        state.query.splice(index, 1);
      }
    },
    // 清空检索词
    DELETE_ALL_QUERY(state) {
      state.query = [];
    },
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve) => {
        getUserInfo().then((res) => {
          commit('SET_USER_INFO', res || {});
          resolve();
        });
      });
    },
    login(data) {
      return new Promise((resolve) => {
        userLogin(data).then((res) => {
          storage.setToken(res.token);
        });
        resolve();
      });
    },
  },
  modules: { theme, map, atlasMap },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  getters: {
    intervalTime: (state) => state.intervalTime,
    bottomOpacity: (state) => state.bottomOpacity,
    contentOpacity: (state) => state.contentOpacity,
    query: (state) => state.query,
    showFirstTime: (state) => state.atlasMap.showFirstTime,
    dialogInfo: (state) => state.atlasMap.dialogInfo,
    mainTitle: (state) => state.mainTitle,
  },
});
