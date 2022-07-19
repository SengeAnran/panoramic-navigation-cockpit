/**
 * @name 图片预览
 * @param {Array, String} srcs 图片数据，可为数组或者 单个图片地址
 * @param {Boolean} initialSlide 多张图片轮播时，默认展示的图片下标
 * @example showImagePopup({ srcs: [url1, url2], [initialSlide: 1]})
 */
import ImagePopup from './main';
import { createApp } from 'vue';
import eventHub from './eventHub.js';
export default function showImagePopup({ srcs, initialSlide } = {}) {
  srcs = Array.isArray(srcs) ? srcs : [srcs];
  if (!srcs.some((item) => item)) {
    return;
  }
  const VueImagePopup = createApp(ImagePopup);
  const parent = document.createElement('div');
  let vm = VueImagePopup.mount(parent);
  let el = vm.$el;
  vm.setData({ srcs, initialSlide });
  document.body.appendChild(el);
  const removeEl = () => {
    if (el) {
      document.body.removeChild(el);
      el = null;
      vm = null;
    }
  };
  eventHub.$on('close', () => {
    removeEl();
  });
  eventHub.$off('close', () => {
    removeEl();
  });
}
