<template>
  <Globe>
    <PointSphere />
    <Force :data="forceData" :key="JSON.stringify(forceData)" />
  </Globe>
</template>
<script setup>
// import { computed, watch } from 'vue';
import { computed } from 'vue';
// import { useStore } from 'vuex';
import { deepClone } from '@/utils';
import Globe from './Globe';
import PointSphere from './PointSphere';
import Force from './Force';

// const store = useStore();

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
</script>
