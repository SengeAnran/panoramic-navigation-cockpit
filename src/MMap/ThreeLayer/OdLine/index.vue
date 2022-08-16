<template>
  <Empty />
</template>
<script setup>
import { inject, onMounted, onUnmounted, watch } from 'vue';
import OdLine from './OdLine';

const props = defineProps({
  data: Array,
});
const threeLayer = inject('threeLayer');

const odLine = new OdLine();
function render() {
  odLine.render(props.data);
}
watch(() => props.data, render);
onMounted(() => {
  threeLayer.add(odLine);
  render();
});
onUnmounted(() => {
  threeLayer.remove(odLine);
});
</script>
