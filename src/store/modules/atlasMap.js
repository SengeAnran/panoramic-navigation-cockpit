export default {
  namespaced: true,
  state: {
    showFirstTime: true, // 第一次展示
    dialogShowFirstTime: true, // 第一次展示
    dialogInfo: {}, // 弹窗信息
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
  },
  getters: {},
};
