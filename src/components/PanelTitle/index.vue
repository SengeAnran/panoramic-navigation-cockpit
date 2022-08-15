<template>
  <div class="panel-title" :class="`${props.titleType}`">
    <span>{{ props.titleName }}</span>
    <div class="paging">
      <slot></slot>
    </div>

    <div v-if="!hideMore" class="more" @click="$emit('clickMore')">
      <img src="./more.png" alt="" />
    </div>
  </div>
</template>

<script setup>
/**
 * @name 一级标题 PanelTitle
 * @param {String} titleType 标题大小类型，可选[common, big]
 * @param {String} titleName 标题内容
 * @param {Boolean} hideMore 是否隐藏更多按钮
 */
const props = defineProps({
  titleName: {
    type: String,
  },
  titleType: {
    type: String,
    default: 'common',
  },
  hideMore: {
    type: Boolean,
    default: false,
  },
  // titleWidth: {
  //   type: String,
  //   default: '527px',
  // },
});
</script>

<style lang="scss" scoped>
.panel-title {
  position: relative;
  height: 43px;
  width: 527px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fefefe;
  text-indent: 21px;
  background: url('./title_bg.png') no-repeat;
  &.big {
    width: 770px;
    background: url('./title_bg_big.png') no-repeat;
    span {
      top: -2px;
      left: 27px;
    }
    .more {
      top: -7px;
    }
  }
  span {
    text-indent: 0;
    position: absolute;
    font-size: 24px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #b7fdfd;
    line-height: 32px;

    background: linear-gradient(0deg, #79c0f6 1.513671875%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    &::before {
      content: '';
      position: absolute;
      width: 47px;
      height: 47px;
      background: url('./point.png') center no-repeat;
      left: -38px;
      top: -8px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 47px;
      height: 47px;
      background: url('./point.png') center no-repeat;
      right: -38px;
      top: -8px;
    }
  }
  .paging {
    position: absolute;
    top: 2px;
    right: 10px;
  }
  .more {
    //background-color: pink;
    position: absolute;
    cursor: pointer;
    width: 59px;
    height: 44px;
    right: 2px;
    top: -5px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
