<!-- TabSwitch -->
<template>
  <div :class="['TabSwitch-root', { border, center, small }]">
    <div
      class="tab-item"
      :class="{ active: item.value === modelValue }"
      v-for="item in options"
      :key="item.value"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
/**
 * @name 标签页 TabSwitch
 * @param {Array} options 标签项
 * @param {Number, String} modelValue 标签选中值
 * @param {Boolean} border 是否展示边框
 * @param {Boolean} center 是否水平居中
 * @event update:modelValue 更新标签选中值
 */
defineProps({
  options: { type: Array, required: true },
  modelValue: { type: [Number, String] },
  border: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
});
defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.TabSwitch-root {
  position: relative;
  display: flex;
  align-items: center;
  .tab-item {
    cursor: pointer;
    font-size: 15px;
    color: var(--color);
    opacity: 0.2;
    transition: all 0.3s;
    margin-left: 10px;
    font-family: 'Source Han Serif CN';
    font-weight: bold;
    line-height: 1;

    &:first-child {
      margin-left: 0;
    }
    &.active {
      opacity: 1;
    }
  }

  &.center {
    justify-content: center;
  }

  &.border {
    .tab-item {
      padding: 8px 14px;
      border: 1px solid var(--color);
      border-right: none;
      margin: 0;
      background: rgba(255, 230, 129, 0.04);
      position: relative;

      &.active {
        border-color: var(--color);
      }

      &:first-child {
        border-radius: 19px 0 0 19px;
      }

      &:last-child {
        border-radius: 0 19px 19px 0;
        border-right: 1px solid var(--color);
      }

      &:not(:last-child) {
        &.active::after {
          content: '';
          display: inline-block;
          width: 1px;
          height: calc(100% + 2px);
          background-color: var(--background);
          position: absolute;
          top: -1px;
          right: -1px;
        }
      }
    }
    &.small {
      .tab-item {
        padding: 2px 14px;
        font-size: 12px;
      }
    }
  }
}
</style>
