<template>
  <div class="content" :class="{ opacity: contentOpacity }">
    <Map />
    <Left />
    <Right />
  </div>
</template>
<script setup>
import Map from './Map';
import Left from './Left';
import Right from './Right';
import { computed } from 'vue';
import { useStore } from 'vuex';
const state = useStore();
const contentOpacity = computed(() => {
  return state.getters.contentOpacity;
});
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
}
.opacity {
  opacity: 0.5;
  filter: blur(5px); // 模糊
}
</style>
