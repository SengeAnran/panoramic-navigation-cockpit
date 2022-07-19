<!-- PopupBox -->
<template>
  <teleport to="#app">
    <div class="PopupBox-root backdrop" @click.self="handleMaskClose">
      <div class="popup-modal-boby">
        <div class="name">{{ name }}</div>
        <div class="close-btn" @click="emit('close')"><img src="@/assets/img/close-btn.png" /></div>
        <div class="popup-boby" :style="popupBodyStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue';
/**
 * 全屏弹框 PopupBox
 * name 弹框标题
 * bodyStyle 弹框内容box的样式
 * maskClosable 是否点击mask时关闭弹框
 * width 弹框内容box的宽，会覆盖bodyStyle里的 width
 * height 弹框内容box的高，会覆盖bodyStyle里的 height
 * 注：宽、高不指定时，弹框的大小会根据内容撑开，
 * 但是为了防止根据数据渲染的不可预期性，建议指定合适的宽高
 */
const props = defineProps({
  name: { type: String, required: true },
  bodyStyle: { type: Object },
  maskClosable: { type: [Boolean, String], default: true },
  width: { type: [String, Number] },
  height: { type: [String, Number] },
});
const emit = defineEmits(['close']);

const popupBodyStyle = computed(() => {
  const bodyStyle = props.bodyStyle || {};
  if (props.width) {
    bodyStyle.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  if (props.height) {
    bodyStyle.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  return bodyStyle;
});
function handleMaskClose() {
  if (!props.maskClosable) return;
  emit('close');
}
</script>

<style lang="scss" scoped>
.PopupBox-root {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .popup-modal-boby {
    position: relative;
    flex-shrink: 0;
    max-width: 100%;
    max-height: 100%;
    animation: popupModalBoby 0.2s ease-in;
    border: 0.5px solid var(--popupBorder);
    box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.73),
      inset 2.939px -4.045px 35px 0px rgba(252, 218, 237, 0.2);
    padding: 40px 0;
    background: rgba(19, 38, 35, 0.8);
    border-radius: 6px;
    .name {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 31px;
      font-family: 'Source Han Serif CN';
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 30px;
      @include text-ellipsis;
    }
    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      width: 25px;
      height: 25px;
      display: flex;
      justify-items: center;
      align-items: center;
      img {
        width: 15px;
        height: 15px;
      }
    }
    .popup-boby {
      position: relative;
      padding: 0 40px;
      overflow: auto;
    }
  }
}
@keyframes popupModalBoby {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
