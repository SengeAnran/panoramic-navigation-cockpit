<template>
  <div class="marker-icon" :class="color"></div>
</template>
<script setup>
defineProps({
  color: { type: String },
  size: { type: String, default: 'medium' },
});
</script>
<style lang="scss" scoped>
.marker-icon {
  width: 27px;
  height: 76px;
  background-image: url('./blue.png');
  background-size: 100% 100%;
  cursor: pointer;
  &.orange {
    background-image: url('./orange.png');
  }
}
</style>
