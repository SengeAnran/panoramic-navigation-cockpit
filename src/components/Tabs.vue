<template>
  <div class="tabs">
    <span
      class="tab"
      :class="{ active: item.value === modelValue }"
      @click="handleClick(item)"
      v-for="item in list"
      :key="item.label"
    >
      {{ item.label }}
    </span>
  </div>
</template>
<script setup>
defineProps({
  list: { type: Array, default: () => [] },
  modelValue: { type: [Number, String] },
});
const emit = defineEmits(['update:modelValue', 'change']);
function handleClick(item) {
  emit('update:modelValue', item.value);
  emit('change', item.value);
}
</script>
<style lang="scss" scoped>
.tabs {
  margin: 0 auto;
  text-align: center;
  .tab {
    padding: 0 12px;
    height: 18px;
    line-height: 16px;
    background: rgba(253, 237, 185, 0.1);
    border: 1px solid #ffe480;
    font-size: 12px;
    font-family: Source Han Serif CN;
    font-weight: bold;
    color: #fffbd8;
    opacity: 0.5;
    border-right-style: none;
    transition: opacity 0.2s;
    display: inline-block;
    cursor: pointer;
    &:first-child {
      border-radius: 9px 0 0 9px;
    }
    &:last-child {
      border-right-style: solid;
      border-radius: 0 9px 9px 0;
    }
    &.active {
      opacity: 1;
      border-right-style: solid;
      background: rgba(253, 237, 185, 0.2);
    }
  }
  .tab.active + .tab {
    border-left-style: none;
  }
}
</style>
