<template>
  <Empty />
</template>
<script setup>
// import { getSystemsTree } from '@/api/atlas';
import { defer } from '@/utils/promise';
import { onMounted, inject, onBeforeUnmount } from 'vue';
import Force from './Force';

const props = defineProps({ data: null });
const emit = defineEmits(['click']);
const globePromise = inject('globePromise');
const forDefer = defer();

onMounted(async () => {
  const globe = await globePromise;
  // const data = await getSystemsTree(props.params);
  // console.log(props.data);
  const force = new Force(props.data);
  force.on('click', (item) => {
    emit('click', item);
  });
  globe.add(force);
  forDefer.resolve(force);
});
onBeforeUnmount(async () => {
  // const globe = await globePromise;
  const force = await forDefer.promise;
  force.remove();
});
</script>
