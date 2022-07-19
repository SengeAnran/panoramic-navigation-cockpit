export default {
  namespaced: true,
  state: {
    areaId: null,
    areaName: '',
    areaLevel: 'province',
  },
  mutations: {
    setAreaId(state, value) {
      state.areaId = value;
    },
    setAreaName(state, value) {
      console.log('改变了名字', value);
      state.areaName = value;
    },
    setAreaLevel(state, value) {
      state.areaLevel = value;
    },
  },
  getters: {
    mapAreaId(state) {
      if (state.areaLevel === 'city') {
        return Number(state.areaId) / 100;
      } else if (state.areaLevel === 'province') {
        return 33;
      } else {
        // return Number(state.areaId);
        return null;
      }
    },
    mapAreaName(state) {
      console.log(state.areaLevel);
      if (state.areaLevel === 'districts') {
        return state.areaName;
      } else {
        return '';
      }
    },
  },
};
