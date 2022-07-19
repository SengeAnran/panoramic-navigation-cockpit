export default {
  namespaced: true,
  state: {
    list: [
      { name: '默认', key: 'default' },
      { name: '蓝色', key: 'blue' },
    ],
    curTheme: window.localStorage.getItem('CUR_THEME') || 'default',
  },
  mutations: {
    SET_CUR_THEME(state, theme = 'default') {
      window.localStorage.setItem('CUR_THEME', theme);
      state.curTheme = theme;
    },
  },
};
