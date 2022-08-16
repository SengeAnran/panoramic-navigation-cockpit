<template>
  <Empty />
</template>
<script setup>
import { onMounted, onUnmounted, inject } from 'vue';
import Sphere from './Sphere';

const globePromise = inject('globePromise');

const sphere = new Sphere();

onMounted(async () => {
  const globe = await globePromise;
  globe.add(sphere);
});
onUnmounted(async () => {
  const globe = await globePromise;
  globe.remove(sphere);
});
</script>
