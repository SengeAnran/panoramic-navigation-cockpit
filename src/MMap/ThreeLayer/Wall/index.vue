<template>
  <Empty />
</template>
<script setup>
import { inject, onMounted, onUnmounted, watch } from 'vue';
import Wall from './Wall';

const props = defineProps({
  data: Object,
});
const threeLayer = inject('threeLayer');

const wall = new Wall();
function render() {
  wall.render(props.data);
}
watch(() => props.data, render);
onMounted(() => {
  threeLayer.add(wall);
  render();
});
onUnmounted(() => {
  threeLayer.remove(wall);
});
</script>
