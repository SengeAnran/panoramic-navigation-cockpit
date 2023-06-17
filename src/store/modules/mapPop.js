export default {
  namespaced: true,
  state: {
    id: undefined, // 弹窗详情id
  },
  mutations: {
    SET_ID(state, value) {
      state.id = value;
    },
  },
};
