<!-- PanelBox -->
<template>
  <div :class="`PanelBox-root ${direction}`">
    <slot></slot>
  </div>
</template>

<script setup>
/**
 * direction 方向，可选[left, right]
 */
defineProps({ direction: { type: String, default: 'left' } });
</script>

<style lang="scss" scoped>
.PanelBox-root {
  position: absolute;
  overflow-y: auto;
  top: 116px;
  max-height: 905px;
  overflow-x: hidden;
  &.left {
    left: 92px;
  }
  &.right {
    right: 92px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
