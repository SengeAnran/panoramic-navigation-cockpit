<template>
  <slot />
</template>
<script setup>
import { provide, inject, onUnmounted, onMounted } from 'vue';
import ThreeLayer from './ThreeLayer';

const threeLayer = new ThreeLayer();

const mapPromise = inject('mapPromise');
provide('threeLayer', threeLayer);

onMounted(async () => {
  const map = await mapPromise;
  map.addLayer(threeLayer);
});
onUnmounted(async () => {
  const map = await mapPromise;
  map.removeLayer(threeLayer.id);
});
</script>
