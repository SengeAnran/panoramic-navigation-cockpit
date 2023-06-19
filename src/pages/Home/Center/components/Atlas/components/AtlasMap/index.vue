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
import * as _ from 'lodash';
import { ref } from 'vue';
// import {
//   getRootInfo,
//   getTreeRootId,
// } from '@/pages/Home/Center/components/Atlas/components/AtlasMap/ContrastSvgBox/constant';
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
  console.log(node);
  let nodeIds = [];
  if (node.depth && !node.data.counterpart && node.position !== 'center') {
    // 单系统结果展示
    console.log('需要单展示啦！', node.data.meta);
    let { url, video_url, scriptCollectName = '', scriptName = '' } = node.data.meta || {};
    nodeIds[0] = node.data.node_id;
    // 兼容字符串格式数据
    url = Array.isArray(url) ? url : [url];
    video_url = Array.isArray(video_url) ? video_url : [video_url];
    scriptCollectName = Array.isArray(scriptCollectName) ? scriptCollectName : [scriptCollectName];
    scriptName = Array.isArray(scriptName) ? scriptName : [scriptName];

    url = url.filter((i) => {
      if (i) {
        return i;
      }
    });
    video_url = video_url.filter((i) => {
      if (i) {
        return i;
      }
    });
    // console.log(scriptCollectName);
    scriptCollectName = scriptCollectName.filter((i) => {
      if (i) {
        return i;
      }
    });
    scriptName = scriptName.filter((i) => {
      if (i) {
        return i;
      }
    });
    const data = { url, video_url, scriptCollectName, scriptName, topicPattern: 'SINGLE' };
    await changeToggle(data);

    // // 打开新页面方式
    let nodeData = _.cloneDeep(node.data);
    nodeData = {
      node_id: nodeData.node_id,
      node_name: nodeData.node_name,
      system: nodeData.system,
      sys_id: nodeData.sys_id,
      name: nodeData.name,
    };
    const query = { ...nodeData };
    // console.log(query);
    const openUrl = '/one-map?data=' + JSON.stringify(query);
    window.open(openUrl, '_blank');
    // console.log(res);

    // 弹窗
    // state.commit('SET_CONTENT_OPACITY', true);
    // const rootId = getTreeRootId(node);
    // const sysTitle = getRootInfo(node);

    // state.commit('atlasMap/SET_DIALOG_INFO', { rootId, ...node.data });
    // state.commit('atlasMap/SET_DIALOG_SHOW_FIRST_TIME', true);
    // state.commit('SET_SHOW_ONE_DIALOG', true);
    // state.commit('SET_MAIN_TITLE', getRootInfo(node).name);

    return;
  }
  if (node.depth && (node.data.counterpart || node.position === 'center')) {
    // 对比系统结果展示
    console.log('需要对比展示啦！');
    const { url, video_url, scriptCollectName = [], scriptName = [] } = node.data.meta || {};
    if (Array.isArray(node.data.node_id)) {
      nodeIds = node.data.node_id;
    } else {
      nodeIds.push(node.data.node_id);
      nodeIds.push(String(node.data.counterpart));
    }

    const data = { url, video_url, scriptCollectName, scriptName, topicPattern: 'TWIN' };
    // console.log(data);
    await changeToggle(data);
    const compareSystrm = _.cloneDeep(state.getters.comparisonMapInfo);
    compareSystrm[0].children = [];
    compareSystrm[1].children = [];
    compareSystrm[0].node_id = nodeIds[0];
    compareSystrm[1].node_id = nodeIds[1];

    compareSystrm[0] = {
      node_id: compareSystrm[0].node_id,
      node_name: compareSystrm[0].node_name,
      system: compareSystrm[0].system,
      sys_id: compareSystrm[0].sys_id,
      name: compareSystrm[0].name,
    };
    compareSystrm[1] = {
      node_id: compareSystrm[1].node_id,
      node_name: compareSystrm[1].node_name,
      system: compareSystrm[1].system,
      sys_id: compareSystrm[1].sys_id,
      name: compareSystrm[1].name,
    };

    const params = { comparisonMapInfo: compareSystrm, nodeNames: node.nodeNames };
    // console.log(params);
    const openUrl = '/compare-map?data=' + JSON.stringify(params);
    // console.log(openUrl);
    window.open(openUrl, '_blank');
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
