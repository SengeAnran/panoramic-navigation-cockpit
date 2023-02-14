<template>
  <Globe>
    <PointSphere />
    <Force :params="forceParam" :key="JSON.stringify(forceParam)" />
  </Globe>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Globe from './Globe';
import PointSphere from './PointSphere';
import Force from './Force';
const store = useStore();

const forceParam = computed(() => {
  const query = store.getters.query?.length ? store.getters.query : [];
  return {
    keys: query.map((d) => d.name),
  };
});
</script>
