<template>
  <Empty />
</template>
<script setup>
import { inject, onMounted, onUnmounted, watch } from 'vue';
import OdLine from './OdLine';

const props = defineProps({
  data: Array,
});
const mapPromise = inject('mapPromise');

const odLine = new OdLine();
function render() {
  odLine.render(props.data);
}
watch(() => props.data, render);
onMounted(async () => {
  const map = await mapPromise;
  map.threeLayer.add(odLine);
  render();
});
onUnmounted(async () => {
  const map = await mapPromise;
  map.threeLayer.remove(odLine);
});
</script>
