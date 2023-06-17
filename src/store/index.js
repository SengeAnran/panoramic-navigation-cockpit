import { createStore, createLogger } from 'vuex';
import * as Types from './actionTypes';
import { getUserInfo, userLogin } from '@/api/user';
import storage from '@/utils/storage';
import theme from './modules/theme';
import map from './modules/map';
import atlasMap from './modules/atlasMap';
import projectMap from './modules/projectMap';
import mapPop from './modules/mapPop';
const defaultMainTitle = '物联网与智慧城市多层级多主题成果展示平台';
export default createStore({
  state: {
    query: [], // 检索词
    intervalId: 0, // 定时器 id
    interval: 0,
    intervalTime: 5000, // 自动切换间隔时间
    userInfo: {},
    orgId: storage.getOrgId() || '', // 数据权限id
    bottomOpacity: false, // 底部透明设置
    hideBottom: false, // 隐藏底部
    contentOpacity: false, // 主体内容透明设置
    mainTitle: defaultMainTitle, // 页面标题
    showOneDialog: false, // 显示单系统弹窗
    hidePageTitle: false,
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
    // 隐藏底部
    SET_HIDE_BOTTOM(state, payload) {
      state.hideBottom = payload;
    },
    // 内容透明设置
    SET_CONTENT_OPACITY(state, payload) {
      state.contentOpacity = payload;
    },
    // 显示单系统弹窗
    SET_SHOW_ONE_DIALOG(state, payload) {
      state.showOneDialog = payload;
    },
    // 检索词数据结构
    // {
    //   position: item.position, // 位置
    //     type: item.type, // 类型
    //   name: item.name, // 名称
    // }
    // 添加检索词
    ADD_QUERY(state, data) {
      if (state.query.findIndex((i) => i.name === data.name && i.type === data.type) === -1) {
        // 避免重复检索词
        state.query = [...state.query, data];
      }
    },
    // 删除其中一个检索词
    DELETE_ONE_QUERY(state, data) {
      const index = state.query.findIndex((i) => i === data);
      if (index !== -1) {
        const newQuery = [...state.query];
        newQuery.splice(index, 1);
        state.query = newQuery;
      }
    },
    // 清空检索词
    DELETE_ALL_QUERY(state) {
      state.query = [];
    },
    SET_HIDE_PAGE_TITLE(state, data) {
      state.hidePageTitle = data;
    },
  },
  actions: {
    // getUserInfo({ commit }) {
    //   return new Promise((resolve) => {
    //     getUserInfo().then((res) => {
    //       commit('SET_USER_INFO', res || {});
    //       resolve();
    //     });
    //   });
    // },
    async getUserInfo({ commit }) {
      const res = await getUserInfo();
      commit('SET_USER_INFO', res || {});
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
  modules: { theme, map, atlasMap, projectMap, mapPop },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  getters: {
    viewNodeUrl: (state) => state.atlasMap.viewNodeUrl,
    intervalTime: (state) => state.intervalTime,
    bottomOpacity: (state) => state.bottomOpacity,
    hideBottom: (state) => state.hideBottom,
    contentOpacity: (state) => state.contentOpacity,
    showOneDialog: (state) => state.showOneDialog,
    query: (state) => state.query,
    showFirstTime: (state) => state.atlasMap.showFirstTime,
    dialogShowFirstTime: (state) => state.atlasMap.dialogShowFirstTime,
    dialogInfo: (state) => state.atlasMap.dialogInfo,
    compereNodeInfo: (state) => state.atlasMap.compereNodeInfo,
    comparisonMapInfo: (state) => state.atlasMap.comparisonMapInfo,
    mainTitle: (state) => state.mainTitle,
    projectInfo: (state) => state.projectMap.projectInfo,
    popId: (state) => state.mapPop.id,
  },
});
