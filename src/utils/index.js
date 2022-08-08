/**
 * 设置nulldata状态
 * @param rootEle 父节点
 */
export function setNulldata(rootEle) {
  rootEle.innerHTML = '';
  const div = document.createElement('div');
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  const img = document.createElement('img');
  img.src = require('@/assets/img/nulldata.png');
  div.appendChild(img);
  rootEle.appendChild(div);
}

/**
 * 获取范围内的随机整数
 * @param {*} minNum 最小值
 * @param {*} maxNum 最大值
 * @returns 整数
 */
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

/**
 * 获取str中的?参数
 * @param {*} str 链接参数
 * @returns {}
 */
export function getQueryString(str = location.search) {
  if (!str) {
    return {};
  }
  if (str.includes('?')) {
    const arr = str.split('?');
    str = arr[arr.length - 1];
  }
  if (str.startsWith('?')) {
    str = str.substr(1);
  }
  const qsArr = str.split('&');
  return qsArr.reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    if (typeof value !== 'undefined') {
      pre[key] = value;
    }
    return pre;
  }, {});
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
