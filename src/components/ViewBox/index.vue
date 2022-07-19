<!-- ViewBox -->
<template>
  <div class="ViewBox-root" :class="{ right: layerBoxRight }">
    <div class="title-bg"></div>
    <div class="title-box">
      <div class="left-box">
        <span class="name">
          {{ name }}
          <slot name="name"></slot>
        </span>
      </div>
      <div class="right-box">
        <slot name="right"></slot>
        <div class="more" @click="more()" v-if="!!more">{{ moreText }}>></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const layerBoxRight = inject('layerBoxRight', () => false);

defineProps({
  name: { type: String, required: true },
  more: { type: Function },
  moreText: { type: String, default: '详情' },
});
</script>

<style lang="scss" scoped>
.ViewBox-root {
  position: relative;
  padding: 0 14px 20px 14px;
  width: 365px;
  border: 1px solid;
  border-image: linear-gradient(to right, rgba(45, 181, 64, 0.5), rgba(113, 255, 102, 0.5)) 10;
  background-color: rgba(19, 38, 35, 0.8);
  box-shadow: inset 0px 0px 35px 0px rgba(252, 218, 237, 0.2);
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
  .title-bg {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 360px;
    height: 65px;
    background: url('./name-bg.png') 0 0 no-repeat;
    pointer-events: none;
  }
  .title-box {
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-left: 12px;
    .left-box,
    .right-box {
      display: flex;
      align-items: center;
    }
    .name {
      font-size: 20px;
      font-family: 'Source Han Serif CN';
      font-weight: bold;
      color: #ffffff;
    }
    .more {
      cursor: pointer;
      margin-left: 10px;
      font-family: 'Source Han Serif CN';
      font-weight: bold;
      color: #53ebff;
      background: linear-gradient(0deg, #fffbd8 0%, #f6c866 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
