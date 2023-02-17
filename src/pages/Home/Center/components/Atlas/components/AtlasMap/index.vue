<template>
  <div class="atlas-map">
    <div class="btns theme-font-style">
      <div class="btn" @click="showAllTree()">全部展开</div>
      <div class="btn" @click="showMain()">全部收起</div>
    </div>
    <ContrastSvgBox :data="props.data" :index="9999" :hideAll="hideAll" @clickOne="clickOne" />
  </div>
</template>

<script setup>
import ContrastSvgBox from './ContrastSvgBox/index';
import { ref } from 'vue';
import {
  getRootInfo,
  getTreeRootId,
} from '@/pages/Home/Center/components/Atlas/components/AtlasMap/ContrastSvgBox/constant';
import { useStore } from 'vuex';
import { changeToggle } from '@/api/atlas';
// import { useRouter } from 'vue-router';
// const router = useRouter();
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
const state = useStore();
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
// 点击节点
async function clickOne(node) {
  // console.log(node);
  if (node.depth && !node.data.counterpart && node.position !== 'center') {
    // 单系统结果展示
    console.log('需要单展示啦！');
    const { url, video_url } = node.data.meta || {};
    const data = { url, video_url, topicPattern: 'SINGLE' };
    const res = await changeToggle(data);
    console.log(res);
    state.commit('SET_CONTENT_OPACITY', true);
    const rootId = getTreeRootId(node);
    console.log(rootId, node.data);
    state.commit('atlasMap/SET_DIALOG_INFO', { rootId, ...node.data });
    state.commit('atlasMap/SET_DIALOG_SHOW_FIRST_TIME', true);
    state.commit('SET_SHOW_ONE_DIALOG', true);
    state.commit('SET_MAIN_TITLE', getRootInfo(node).name);
    return;
  }
  if (node.depth && (node.data.counterpart || node.position === 'center')) {
    // 对比系统结果展示
    console.log('需要对比展示啦！');
    const { url, video_url } = node.data.meta || {};
    const data = { url, video_url, topicPattern: 'TWIN' };
    console.log(data);
    await changeToggle(data);
    window.open('/compare-map', '_blank');
    // router.push({ name: 'compareMap' });
  }
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
