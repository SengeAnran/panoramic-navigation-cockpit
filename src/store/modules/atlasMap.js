export default {
  namespaced: true,
  state: {
    showFirstTime: true, // 第一次展示
    dialogShowFirstTime: true, // 第一次展示
    dialogInfo: {}, // 弹窗信息
    compereNodeInfo: [], // 对比弹窗选中节点信息；
    comparisonMapInfo: [], // 对比图展示窗口信息
    viewNodeUrl: '', // 点击浏览的url
  },
  mutations: {
    SET_SHOW_FIRST_TIME(state, value) {
      state.showFirstTime = value;
    },
    SET_DIALOG_SHOW_FIRST_TIME(state, value) {
      state.dialogShowFirstTime = value;
    },
    SET_DIALOG_INFO(state, value) {
      state.dialogInfo = value || {};
    },
    SET_COMPERE_NODE_INFO(state, value) {
      state.compereNodeInfo = value || [];
    },
    SET_COMPARISON_MAP_INFO(state, value) {
      state.comparisonMapInfo = value || [];
    },
    SET_VIEW_NODE_URL(state, data) {
      state.viewNodeUrl = data;
    },
    RESET_VIEW_NODE_URL(state) {
      state.viewNodeUrl = '';
    },
  },
  getters: {},
};
