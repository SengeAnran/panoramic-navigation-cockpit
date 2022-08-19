<template>
  <div class="system-popup">{{ point.name }}</div>
</template>
<script setup>
import { onBeforeUnmount, onMounted } from 'vue';

const props = defineProps({
  point: Object,
});

onMounted(() => {
  console.log('onMounted', props.point);
});
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
});
</script>
<style lang="scss" scoped>
.system-popup {
  color: #000;
}
</style>
