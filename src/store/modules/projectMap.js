export default {
  namespaced: true,
  state: {
    projectInfo: {},
  },
  mutations: {
    SET_PROJECT_INFO(state, value) {
      state.projectInfo = value;
    },
  },
};
