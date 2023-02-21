<template>
  <div class="left-title sys-title">{{ sysTitles[0] }}</div>
  <div class="right-title sys-title">{{ sysTitles[1] }}</div>
  <div class="left-node-name node-name">节点名称</div>
  <div class="right-node-name node-name">节点名称</div>
  <div class="content">
    <ContrastSvgBox
      v-if="showSvgBox"
      :data="contrastData"
      :index="8888"
      :defaultWidth="1735"
      canClick
      :defaultHeight="1080"
    />
    <div class="title"></div>
    <div class="close" @click="close"></div>
  </div>
</template>

<script setup>
import ContrastSvgBox from '@/pages/Home/Center/components/Atlas/components/AtlasMap/ContrastSvgBox';
import { getGraphCompare } from '@/api/search';
import { initNodeTree } from '@/pages/Home/Center/components/Atlas/constants';
import { onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { changeToggle } from '@/api/atlas';
// import router from '@/router';
const sysTitles = ref([]);
const state = useStore();
const route = useRoute();
const showSvgBox = ref(false);
// const comparisonMapInfo =  computed(() => {
//   return state.getters.comparisonMapInfo;
// });
const comparisonMapInfo = ref(JSON.parse(route.query.data || ''));
console.log('comparisonMapInfo', comparisonMapInfo);
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
  sysTitles.value = [comparisonMapInfo.value[0].system, comparisonMapInfo.value[1].system];
  const data = {
    system: [comparisonMapInfo.value[0].sys_id, comparisonMapInfo.value[1].sys_id],
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
  const data = { topicPattern: 'ORDINARY' };
  changeToggle(data);
  window.close();
}
</script>

<style lang="scss" scoped>
.sys-title {
  position: absolute;
  top: -4px;
  transform: translateX(-50%);
  font-size: 56px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  color: #f0f0f0;
  line-height: 106px;
  background: linear-gradient(0deg, #b2d2ff 0%, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  //text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  text-shadow: none !important;
}
.left-title {
  left: 19.5%;
}
.right-title {
  left: 80%;
}
.node-name {
  position: absolute;
  top: 152px;

  transform: translateX(-50%);
  font-size: 48px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  color: #f0f0f0;
  line-height: 106px;
  background: linear-gradient(0deg, #b2d2ff 0%, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  //text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  text-shadow: none !important;
}
.left-node-name {
  left: 1727px;
}
.right-node-name {
  left: 6369px;
}

.content {
  width: 1735px;
  height: 1080px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  .title {
    position: absolute;
    top: 23px;
    left: 59px;
    width: 1076px;
    height: 107px;
    background: url('../img/center_title.png') no-repeat;
    background-size: 100% 100%;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 70px;
    right: 61px;
    width: 64px;
    height: 66px;
    background: url('../img/close.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
