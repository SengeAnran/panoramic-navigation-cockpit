<template>
  <div class="page">
    <ContrastSvgBox v-if="showSvgBox" :data="contrastData" :index="8888" :defaultWidth="3840" :defaultHeight="1080" />
    <div class="title"></div>
    <div class="close" @click="close"></div>
  </div>
</template>

<script setup>
import ContrastSvgBox from '@/pages/Home/Center/components/Atlas/components/AtlasMap/ContrastSvgBox';
import { getGraphCompare } from '@/api/search';
import { initNodeTree } from '@/pages/Home/Center/components/Atlas/constants';
import { computed, onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
const state = useStore();
const showSvgBox = ref(false);
const comparisonMapInfo = computed(() => {
  return state.getters.comparisonMapInfo;
});
const contrastData = reactive({
  name: '公积金',
  children: [],
});
onBeforeMount(() => {
  init();
});
async function init() {
  state.commit('atlasMap/SET_SHOW_FIRST_TIME', true);
  state.commit('SET_HIDE_PAGE_TITLE', true);
  console.log(comparisonMapInfo.value);
  const data = {
    systemA: comparisonMapInfo.value[0].name,
    systemB: comparisonMapInfo.value[1].name,
  };
  const res = await getGraphCompare(data);
  initNodeTree(res.systemANodes, true);
  initNodeTree(res.systemBNodes, true);
  initNodeTree(res.commonNodes, true);
  const systemA = {
    name: res.systemANodes[0].system || comparisonMapInfo.value[0].name,
    children: res.systemANodes,
  };
  const systemB = {
    name: res.systemBNodes[0].system || comparisonMapInfo.value[1].name,
    children: res.systemBNodes,
  };
  const sameNode = {
    name: '相同节点',
    children: [res.commonNodes],
  };
  contrastData.children = [systemA, systemB, sameNode];
  showSvgBox.value = true;
}
onBeforeUnmount(() => {
  state.commit('SET_HIDE_PAGE_TITLE', false);
});
function close() {
  router.back();
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    position: absolute;
    top: 23px;
    width: 1076px;
    height: 107px;
    background: url('../img/center_title.png') no-repeat;
    background-size: 100% 100%;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 70px;
    right: 100px;
    width: 64px;
    height: 66px;
    background: url('../img/close.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
