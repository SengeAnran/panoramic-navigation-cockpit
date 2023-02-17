<template>
  <Globe>
    <PointSphere />
    <Force :data="forceData" @click="handleClick" :key="JSON.stringify(forceData)" />
  </Globe>
</template>
<script setup>
// import { computed, watch } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { deepClone } from '@/utils';
import { changeToggle } from '@/api/atlas';
import Globe from './Globe';
import PointSphere from './PointSphere';
import Force from './Force';

const state = useStore();

const props = defineProps({
  data: null,
});
const forceData = computed(() => {
  if (!Array.isArray(props.data)) {
    return null;
  }
  if (props.data.every((d) => !d.check)) {
    return deepClone(props.data);
  }
  return deepClone(props.data?.filter((d) => d.check));
});
async function handleClick(node) {
  // console.log(node);
  console.log('需要单展示啦！');
  const { url, video_url } = node.meta || {};
  const data = { url, video_url, topicPattern: 'SINGLE' };
  const res = await changeToggle(data);
  console.log(res);
  state.commit('SET_CONTENT_OPACITY', true);
  // const rootId = getTreeRootId(node);
  // console.log(rootId, node.data);
  state.commit('atlasMap/SET_DIALOG_INFO', { rootId: node.sys_id, ...node.data });
  state.commit('atlasMap/SET_DIALOG_SHOW_FIRST_TIME', true);
  state.commit('SET_SHOW_ONE_DIALOG', true);
  state.commit('SET_MAIN_TITLE', node.system);
}
</script>
