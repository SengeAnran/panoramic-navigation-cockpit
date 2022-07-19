<template>
  <div class="title-wrapper">
    <div class="line"></div>
    <div class="text">{{ title }}</div>
    <div class="line"></div>
    <div class="more" @click="more()" v-if="!!more">{{ moreText }}>></div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  more: { type: Function },
  moreText: { type: String, default: '详情' },
});
</script>

<style lang="scss" scoped>
.title-wrapper {
  position: relative;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: Source Han Serif CN;
  font-weight: bold;
  color: #ffe681;
  line-height: 29px;
  background: linear-gradient(0deg, #74faab 27.9541015625%, #b6fef5 79.2236328125%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  .line {
    height: 1px;
    width: 30px;
    background: linear-gradient(0deg, #74faab 27.9541015625%, #b6fef5 79.2236328125%);
  }

  .text {
    margin: 0 10px;
  }
  .more {
    position: absolute;
    right: 0;
    cursor: pointer;
    font-family: 'Source Han Serif CN';
    font-weight: bold;
    color: #53ebff;
    background: linear-gradient(0deg, #fffbd8 0%, #f6c866 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
