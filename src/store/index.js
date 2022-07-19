import { createStore, createLogger } from 'vuex';
import * as Types from './actionTypes';
import { getUserInfo } from '@/api/user';
import storage from '@/utils/storage';
import theme from './modules/theme';
import map from './modules/map';

export default createStore({
  state: {
    intervalId: 0, // 定时器 id
    interval: 0,
    intervalTime: 5000, // 自动切换间隔时间
    userInfo: {},
    orgId: storage.getOrgId() || '', // 数据权限id
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
    SET_USER_INFO(state, payload) {
      state.userInfo = payload || {};
    },
    SET_ORG_ID(state, payload) {
      storage.setOrgId(payload);
      state.orgId = payload;
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
  },
  modules: { theme, map },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  getters: {
    intervalTime: (state) => state.intervalTime,
  },
});
