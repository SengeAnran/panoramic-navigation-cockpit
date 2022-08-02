<template>
  <svg class="svg-box"></svg>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import * as d3 from 'd3';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
let innerWidth, innerHeight;
onMounted(() => {
  init();
});
function init() {
  console.log(props.data);
  const svg = d3.select('.svg-box');
  console.log(svg);
  const margin = {
    top: 40,
    right: 30,
    bottom: 30,
    left: 30,
  };
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  console.log(width, height);
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  console.log(innerWidth, innerHeight);
}
</script>

<style lang="scss" scoped>
.svg-box {
  width: 100%;
  height: 100%;
}
</style>
