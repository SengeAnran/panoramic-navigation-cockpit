<template>
  <div class="marker-icon" :class="type"></div>
</template>
<script setup>
defineProps({
  type: { type: String, default: 'system' },
  size: { type: String, default: 'medium' },
});
</script>
<style lang="scss" scoped>
.marker-icon {
  width: 27px;
  height: 76px;
  background-size: 100% 100%;
  background-image: url('./blue.png');
  cursor: pointer;
  &.system {
    background-image: url('./blue.png');
  }
  &.company {
    background-image: url('./orange.png');
  }
}
</style>
