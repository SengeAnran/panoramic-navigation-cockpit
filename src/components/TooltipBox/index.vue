<!-- 提示框，需要传入鼠标信息 -->
<template>
  <teleport to="#app">
    <div class="TooltipBox-root" ref="tbRef" :style="comStyle">
      <div class="close-btn" @click="emit('close')"><img src="@/assets/img/close-btn.png" /></div>
      <slot></slot>
    </div>
  </teleport>
</template>

<script setup>
import { computed, ref } from 'vue';
import appCfg from '@/config/appConfig';
const pageSize = { width: gs(appCfg.width), height: gs(appCfg.height) };

/**
 * 二级弹框，位置随鼠标信息变化 TooltipBox
 * event 鼠标信息，主要是用来获取鼠标位置，用于弹框位置定位
 * style? 弹框样式
 */
const props = defineProps({
  event: { type: Object, required: true },
  style: { type: [String, Object] },
});
const emit = defineEmits(['close']);
// 弹框自身
const tbRef = ref(null);
const comStyle = computed(() => {
  // 弹框默认位置
  const defalutBoxPosition = { top: '100px', left: '40px', position: 'absolute' };
  const propEvent = props.event || { pageX: 0, pageY: 0 };
  const left = propEvent.pageX || propEvent.x;
  const top = propEvent.pageY || propEvent.y;
  let selfWidth = 0; // 弹框宽
  let selfHeight = 0; // 弹框高
  let offsetLeft = 0; // 宽度补偿
  let offsetTop = 20; // 高度补偿
  if (tbRef.value) {
    const computedStyle = window.getComputedStyle(tbRef.value);
    selfWidth = parseInt(computedStyle.getPropertyValue('width'));
    selfHeight = parseInt(computedStyle.getPropertyValue('height'));
  }
  // 弹框超出页面高度，弹框出现在鼠标点击上方（默认在下方）
  if (top + selfHeight + offsetTop > pageSize.height) {
    offsetTop = -selfHeight - offsetTop;
  }
  // 弹框水平位置，默认是弹框中心，弹框距离页面左边距离不够，贴着页面左侧40px的位置
  if (left - 40 < selfWidth / 2) {
    offsetLeft = selfWidth / 2 - (left - 40);
  }
  // 弹框水平位置，默认是弹框中心，弹框超出页面宽度，贴着页面右侧40px的位置
  if (pageSize.width - left - 40 < selfWidth / 2) {
    offsetLeft = -(selfWidth / 2 - (pageSize.width - left - 40));
  }
  defalutBoxPosition.left = `${left - selfWidth / 2 + offsetLeft}px`;
  defalutBoxPosition.top = `${top + offsetTop}px`;
  const propStyle = props.style;
  if (!propStyle) return defalutBoxPosition;
  if (typeof propStyle === 'object') {
    return { ...propStyle, ...defalutBoxPosition };
  }
  return defalutBoxPosition;
});
</script>

<style lang="scss" scoped>
.TooltipBox-root {
  position: absolute;
  padding: 25px 40px;
  border: 1px solid rgba(254, 222, 140, 0.5);
  border-radius: 10px;
  box-shadow: 0px 0px 20px 5px rgba(4, 12, 27, 0.2);
  background-color: #1b2024;
  z-index: 9999;
  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    justify-items: center;
    align-items: center;
    img {
      width: 13px;
      height: 13px;
    }
  }
}
</style>
