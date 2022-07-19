'use strict';
export default {
  // token
  getToken() {
    let val = localStorage.getItem('TOKEN');
    if (!val) {
      return val;
    } else {
      val = JSON.parse(decodeURIComponent(window.atob(val)));
      // 前端暂时不做过期处理
      // const currentTimeStamp = new Date().getTime();
      // if ((currentTimeStamp - val.time) > val.expire * 24 * 60 * 60 * 1000) {
      //   localStorage.removeItem('TOKEN');
      //   return null;
      // }
      return val.data;
    }
  },
  /**
   *
   * @param {String} value token值
   * @param {Number} expire 存储时间，单位：天，默认： 1
   */
  setToken(value, expire = 1) {
    const jsonStr = JSON.stringify({
      data: value,
      time: new Date().getTime(),
      expire: expire,
    });
    localStorage.setItem('TOKEN', window.btoa(encodeURIComponent(jsonStr)));
  },
  getOrgId() {
    return localStorage.getItem('ORG_ID');
  },
  setOrgId(value) {
    localStorage.setItem('ORG_ID', value);
  },
  // 清空登录信息，token和orgId - 用于退出登录 或者 token过期
  clearAll() {
    localStorage.clear();
  },
};
