<template>
  <Empty />
</template>
<script setup>
import { onMounted, onUnmounted, inject } from 'vue';
import Force from './Force';

const globePromise = inject('globePromise');

const force = new Force();

onMounted(async () => {
  const globe = await globePromise;
  globe.add(force);
});
onUnmounted(async () => {
  const globe = await globePromise;
  globe.remove(force);
});
</script>
