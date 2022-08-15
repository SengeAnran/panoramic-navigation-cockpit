<template>
  <div :class="`secondary-title ${titleType}`">
    <span>{{ props.titleName }}</span>
    <div class="paging">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  titleName: {
    type: String,
  },
  titleWidth: {
    type: String,
    default: '509px',
  },
  titleType: {
    type: String,
    default: 'common',
  },
});
</script>

<style lang="scss" scoped>
.secondary-title {
  position: relative;
  height: 37px;
  width: 509px;
  background: url('./title_bg.png') no-repeat;
  text-indent: 31px;
  span {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-style: italic;
    color: #b7fdfd;
    line-height: 37px;
    padding-right: 5px;

    background: linear-gradient(0deg, #79c0f6 1.513671875%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .paging {
    position: absolute;
    top: 5px;
    right: 36px;
  }
  &.small {
    height: 23px;
    width: 235px;
    background: url('./small_title_bg.png') no-repeat;
    span {
      line-height: 23px;
      font-size: 16px;
    }
  }
}
</style>
