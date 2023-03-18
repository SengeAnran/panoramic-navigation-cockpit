<template>
  <div class="dialog-center">
    <h3 class="theme-font-style">系统图谱</h3>
    <div class="show-box">
      <SvgBox :data="systemList" :index="7777" />
    </div>
  </div>
</template>

<script setup>
import SvgBox from './SvgBox';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {
  // changeToggle,
  getNodeById,
} from '@/api/atlas';
import { initNodeTree } from '@/pages/Home/Center/components/Atlas/constants';
const state = useStore();
const systemList = ref({});
const nodeInfo = computed(() => {
  return state.getters.dialogInfo;
});
onMounted(() => {
  getNodeData();
});
function getNodeData() {
  const data = {
    id: nodeInfo.value.rootId,
  };
  getNodeById(data).then((res) => {
    res && initNodeTree(res, true);
    systemList.value = res;
    // 从地图跳转无节点数据
    // if (!nodeInfo.value.name && !nodeInfo.value.node_id) {
    //   let { url, video_url } = res.children[0]?.meta || {};
    //   // 兼容字符串格式数据
    //   if (!(url instanceof Array)) {
    //     url = [url];
    //   }
    //   if (!(video_url instanceof Array)) {
    //     video_url = [video_url];
    //   }
    //   const data = { url, video_url, topicPattern: 'SINGLE' };
    //   if (url) {
    //     changeToggle(data);
    //   }
    //   if (res?.children[0]) {
    //     state.commit('atlasMap/SET_DIALOG_INFO', res.children[0]);
    //   }
    // }
  });
}
</script>

<style lang="scss" scoped>
.dialog-center {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  h3 {
    font-size: 50px;
    margin: 0;
    padding: 0;
    margin-bottom: 46px;
  }
  .show-box {
    cursor: pointer;
    width: 1735px;
    height: 749px;
    //border-radius: 20px;
    //border: 1px solid #547eff;
    //box-shadow: 0px 0px 40px 0px #1d4d8d;
    //background: #222f4e;
  }
}
</style>
