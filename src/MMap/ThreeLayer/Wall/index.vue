<template>
  <Empty />
</template>
<script setup>
import { inject, onMounted, onUnmounted, watch } from 'vue';
import Wall from './Wall';

const props = defineProps({
  data: Object,
});
// const threeLayer = inject('threeLayer');
const mapPromise = inject('mapPromise');

const wall = new Wall();
function render() {
  wall.render(props.data);
}
watch(() => props.data, render);
onMounted(async () => {
  const map = await mapPromise;
  map.threeLayer.add(wall);
  render();
});
onUnmounted(async () => {
  const map = await mapPromise;
  map.threeLayer.remove(wall);
});
</script>
