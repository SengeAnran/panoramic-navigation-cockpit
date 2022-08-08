<template>
  <div class="atlas-map">
    <div class="btns theme-font-style">
      <div class="btn" @click="showAllTree()">全部展开</div>
      <div class="btn" @click="showMain()">全部收起</div>
    </div>
    <ContrastSvgBox :data="props.data" :index="9999" :hideAll="hideAll" />
  </div>
</template>

<script setup>
import ContrastSvgBox from './ContrastSvgBox/index';
import { ref } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(['showAll']);
const hideAll = ref(false);
function showMain() {
  hideAll.value = true;
  setTimeout(() => {
    hideAll.value = false;
  });
}
function showAllTree() {
  emits('showAll');
  hideAll.value = false;
}
</script>

<style lang="scss" scoped>
.atlas-map {
  cursor: pointer;
  position: absolute;
  top: 146px;
  //background-color: gold;
  width: 100%;
  height: 800px;
  //overflow: scroll;
  .btns {
    position: absolute;
    right: 0;
    display: flex;
    .btn {
      width: 160px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      margin: 0 10px;
      background: url('./img/btn_bg.png') no-repeat;
      background-size: 100%;
      font-size: 24px;
    }
  }
}
</style>
