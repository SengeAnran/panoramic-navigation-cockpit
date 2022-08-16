<template>
  <div class="stage" ref="canvasRef"><slot /></div>
</template>
<script setup>
import { onMounted, onUnmounted, shallowRef, provide } from 'vue';
import { defer } from '@/utils/promise';
import Globe from './Globe';

const canvasRef = shallowRef();
const globeDefer = defer();

provide('globePromise', globeDefer.promise);

onMounted(() => {
  const globe = new Globe(canvasRef.value);
  globeDefer.resolve(globe);
});
onUnmounted(async () => {
  const globe = await globeDefer.promise;
  globe.destroy();
});
</script>
<style lang="scss" scoped>
.stage {
  position: absolute;
  top: 0;
  left: 50%;
  width: 3840px;
  height: 1080px;
  transform: translateX(-50%);
}
</style>
