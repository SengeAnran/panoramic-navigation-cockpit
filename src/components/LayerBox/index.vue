<!-- LayerBox -->
<template>
  <div class="LayerBox-root" :class="{ right: !!right, [curTheme]: true }">
    <div class="border-box">
      <template v-if="curTheme === 'default'">
        <div class="line-1" />
        <div class="line-2" />
        <div class="rect-1"></div>
      </template>
      <template v-else-if="curTheme === 'blue'">
        <div class="blue-line-1" />
      </template>
    </div>
    <div class="title-box">
      <div class="blue-name-bg" v-if="isBlue && !!right"></div>
      <div class="icon-box">
        <BaseIcon class="title-icon" :icon="icon" />
      </div>
      <span class="name">{{ name }}</span>
      <div class="blue-name-bg" v-if="isBlue && !right"></div>
    </div>
    <div class="body-box">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  icon: { type: String, default: 'icon-zuzhijianshe' },
  name: { type: String, required: true },
  right: { type: Boolean, default: false },
});
provide('layerBoxRight', props.right);
const store = useStore();
const curTheme = computed(() => store.state.theme.curTheme);
const isBlue = computed(() => store.state.theme.curTheme === 'blue');
</script>

<style lang="scss" scoped>
.LayerBox-root {
  position: relative;
  width: 410px;
  min-height: 100px;
  margin-bottom: 40px;
  padding-bottom: 10px;
  &.right {
    .border-box {
      transform: rotateY(180deg);
    }
    .title-box {
      padding-left: 0;
      padding-right: 4px;
      justify-content: flex-end;
      .title-icon {
        background: var(--layerTitleRightColor);
        background-clip: text;
        color: transparent;
      }
      .name {
        background: var(--layerTitleRightColor);
        background-clip: text;
        color: transparent;
      }
    }
    .body-box {
      margin-left: auto;
      margin-right: 20px;
    }
  }
  &.blue {
    .border-box {
      background: url('./bg-1-blue.png');
      background-position: 0 14px;
      background-repeat: no-repeat;
    }
    &.right .title-box {
      .blue-name-bg {
        margin-left: auto;
        margin-right: 12px;
        transform: rotateY(180deg);
      }
    }
  }
  .border-box {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('./bg-1.png');
    background-position: 0 4px;
    background-repeat: no-repeat;
    .line-1 {
      position: absolute;
      top: 37px;
      left: 5px;
      width: 0.5px;
      height: 50%;
      max-height: 388px;
      background-image: linear-gradient(
        to bottom,
        rgba(167, 255, 212, 0.5),
        rgba(46, 255, 154, 0.3),
        rgba(46, 255, 154, 0)
      );
    }
    .line-2 {
      position: absolute;
      top: 37px;
      left: 9px;
      width: 0.5px;
      height: 85%;
      max-height: 504px;
      background-image: linear-gradient(
        to bottom,
        rgba(46, 255, 154, 0.3),
        rgba(46, 255, 154, 0.3),
        rgba(46, 255, 154, 0)
      );
    }
    .rect-1 {
      position: absolute;
      top: 37px;
      left: 5px;
      width: 29px;
      height: calc(100% - 37px);
      background: #2ef27c;
      opacity: 0.05;
    }
    .blue-line-1 {
      position: absolute;
      top: 48px;
      left: 9px;
      width: 0.5px;
      height: calc(100% - 8px);
      background-image: linear-gradient(to bottom, #70bdff, rgba(59, 164, 255, 0.3));
    }
  }
  .title-box {
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 4px;
    .icon-box {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      .title-icon {
        background: var(--layerTitleColor);
        background-clip: text;
        color: transparent;
        font-size: 28px;
      }
      .icon {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .name {
      font-size: 25px;
      font-family: 'MiSans-Semibold';
      margin-left: 6px;
      background: var(--layerTitleColor);
      background-clip: text;
      color: transparent;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .blue-name-bg {
      margin-top: 8px;
      flex: 1;
      height: 26px;
      background: url('./name-blue.png');
      background-position: right;
      background-repeat: no-repeat;
      margin-left: 12px;
    }
  }
  .body-box {
    position: relative;
    margin-top: 18px;
    margin-left: 20px;
  }
}
</style>
