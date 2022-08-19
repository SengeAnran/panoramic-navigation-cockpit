<template>
  <teleport to="body">
    <div class="map-legend">
      <slot />
      <div
        class="legend-item"
        v-for="item in options"
        :key="uid(item)"
        :class="{ selected: selected(item) }"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </teleport>
</template>
<script setup>
const props = defineProps({
  modelValue: Array,
  options: Array,
});

const emit = defineEmits(['change', 'update:modelValue']);

function uid(item) {
  return item.value || item.label;
}
function selected(item) {
  return props.modelValue.includes(uid(item));
}
function handleClick(item) {
  const selected = [...props.modelValue];
  const id = uid(item);
  const index = selected.indexOf(id);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(id);
  }
  emit('change', selected);
  emit('update:modelValue', selected);
}
</script>
<style lang="scss" scoped>
.map-legend {
  position: absolute;
  left: 32%;
  bottom: 11%;
  user-select: none;
  .legend-item {
    display: flex;
    align-items: center;
    padding-left: 12px;
    width: 150px;
    height: 48px;
    border: 1px solid #295778;
    background: linear-gradient(90deg, rgba(1, 99, 235, 0) 0%, rgba(41, 87, 120, 0.63) 63%, #164475 100%);
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    margin-top: 12px;
    cursor: pointer;

    &::before {
      content: '';
      width: 20px;
      height: 20px;
      border: 1px solid #90e1fd;
      border-radius: 4px;
      margin-right: 15px;
      padding: 3px;
      box-sizing: border-box;
      background-clip: content-box;
    }
    &:nth-child(1)::before {
      border-color: #46e9fe;
    }
    &:nth-child(2)::before {
      border-color: #ffa400;
    }
    &.selected:nth-child(1)::before {
      background-color: #46e9fe;
    }
    &.selected:nth-child(2)::before {
      background-color: #ffa400;
    }
  }
}
</style>
