<template>
  <div class="select-root">
    <div class="key-item" v-for="item in selected" :key="item.node_id">
      <div class="key-name theme-font-style">{{ item.node_name }}</div>
      <button @click="handleClick(item)"></button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const emit = defineEmits('reduceItem');
const props = defineProps({
  data: Array,
});
const selected = computed(() => {
  return props.data?.filter((d) => d.check);
});
function handleClick(item) {
  item.check = !item.check;
  emit('reduceItem');
}
</script>
<style lang="scss" scoped>
.select-root {
  position: absolute;
  left: 50%;
  bottom: 110%;
  display: flex;
  flex-wrap: wrap;
  transform: translate(-50%, 0%);
  width: 80%;
  justify-content: center;
  .key-item {
    position: relative;
    min-width: 143px;
    height: 36px;
    margin: 3px 5.5px;
    line-height: 36px;
    font-size: 24px;
    background: linear-gradient(
      90deg,
      rgba(78, 132, 186, 0.6) 0%,
      rgba(111, 169, 227, 0.99) 46%,
      rgba(78, 132, 186, 0.11) 99%
    );
    border-radius: 4px;
    .key-name {
      padding-left: 20px;
      padding-right: 62px;
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 90%;
        height: 1px;
        background: linear-gradient(
          -90deg,
          rgba(31, 57, 86, 0.1) 0%,
          rgba(122, 191, 255, 0.97) 49%,
          rgba(34, 61, 93, 0.1) 100%
        );
      }
    }
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      //bottom: 0;
      top: -2px;
      left: 0;
      width: 10px;
      height: 41px;
      background: url('./img/content_left_icon.png') no-repeat;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: -2px;
      right: 0;
      width: 10px;
      height: 41px;
      background: url('./img/content_right_icon.png') no-repeat;
    }
    button {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      width: 36px;
      height: 36px;
      background: url('./img/close_icon.png') no-repeat;
      border: none;
      border-radius: 0px 4px 4px 0px;
    }
  }
}
</style>
