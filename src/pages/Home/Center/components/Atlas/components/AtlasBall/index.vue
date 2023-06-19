<template>
  <Globe>
    <PointSphere />
    <Force :data="forceData" @click="handleClick" :key="JSON.stringify(forceData)" />
  </Globe>
</template>
<script setup>
// import { computed, watch } from 'vue';
import { computed } from 'vue';
// import { useStore } from 'vuex';
import { deepClone } from '@/utils';
import { changeToggle } from '@/api/atlas';
import Globe from './Globe';
import PointSphere from './PointSphere';
import Force from './Force';

// const state = useStore();

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
  console.log(node);
  let { url, video_url, scriptCollectName, scriptName } = node.meta || {};
  // 兼容字符串格式数据
  url = Array.isArray(url) ? url : [url];
  video_url = Array.isArray(video_url) ? video_url : [video_url];
  scriptCollectName = Array.isArray(scriptCollectName) ? scriptCollectName : [scriptCollectName];
  scriptName = Array.isArray(scriptName) ? scriptName : [scriptName];

  url = url.filter((i) => i);
  video_url = video_url.filter((i) => i);
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
  const query = {
    node_id: node.node_id,
    node_name: node.node_name,
    system: node.system,
    sys_id: node.sys_id,
    name: node.name,
  };
  const openUrl = '/one-map?data=' + JSON.stringify(query);
  window.open(openUrl, '_blank');
}
</script>
