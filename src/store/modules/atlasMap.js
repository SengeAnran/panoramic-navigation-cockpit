export default {
  namespaced: true,
  state: {
    showFirstTime: true,
    areaId: null,
  },
  mutations: {
    SET_SHOW_FIRST_TIME(state, value) {
      state.showFirstTime = value;
    },
  },
  getters: {},
};
