<template>
  <svg class="svg-box" :class="svgClass"></svg>
</template>

<script setup>
import { defineProps, nextTick, onMounted, ref } from 'vue';
import * as d3 from 'd3';
import { rootSvg } from './constant';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
  },
});
let innerWidth, innerHeight, root;
const g = ref('');
const svgClass = ref('');
onMounted(() => {
  svgClass.value = `svg-${props.index}`;
  nextTick(() => {
    if (props.data && props.data.children) {
      init();
    }
  });
});
function init() {
  const svg = d3.select(`.svg-${props.index}`);
  const margin = {
    top: 50,
    right: 30,
    bottom: 50,
    left: 30,
  };
  const nodeOption = {
    width: (name) => {
      // 动态设置文本框宽度
      return name.length * 12;
    },
    height: 23,
  };
  const width = parseInt(svg.style('width'), 10);
  const height = parseInt(svg.style('height'), 10);
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  g.value = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  root = d3.hierarchy(props.data);
  console.log(root);
  root = d3.tree().size([innerWidth, innerHeight])(root);
  const node = root.descendants();
  const path = root.links();
  console.log(node, path);
  // 画线
  g.value
    .selectAll('path')
    .data(path)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr(
      'd',
      d3
        .linkVertical()
        .x((d) => d.x)
        .y((d) => d.y),
    );
  const imgUrl = require('../../img/bottom_icon.png');
  // 画节点方块
  g.value
    .selectAll('rect')
    .data(node)
    .join('rect')
    .attr('width', (d) => nodeOption.width(d.data.name))
    .attr('height', nodeOption.height)
    .attr('fill', '#142847')
    .attr('background-img', `url(${imgUrl})`)
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr('x', (d) => d.x - nodeOption.width(d.data.name) / 2)
    .attr('y', (d) => d.y)
    .attr('opacity', (d) => (d.depth === 0 ? 0 : 1))
    .attr('class', 'rect');
  // 画节点图标
  g.value
    .append('g')
    .attr('class', 'logo-svg')
    .selectAll('g')
    .data([node[0]])
    .join('g')
    .html(rootSvg)
    .attr('transform', (d) => {
      return `translate(${d.x - 10}, ${d.y - 10})`;
    });
  // 文字
  g.value
    .selectAll('text')
    .data(node)
    .join('text')
    .attr('text-anchor', 'middle') // 位置
    .attr('x', (d) => d.x)
    .attr('y', (d) => (d.depth === 0 ? d.y + 33 : d.y + 16))
    .text((d) => d.data.name)
    .style('font-size', '11px')
    .attr('fill', 'white');
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');
}
</script>

<style lang="scss" scoped>
.svg-box {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.rect {
  position: relative;
  //fill: pink !important;
}
</style>
<style>
.cls-m1 {
  opacity: 0.8;
}
.cls-m2 {
  fill: #99c9f2;
}
.cls-m3 {
  fill: #b8d9f6;
}
.cls-m4 {
  fill: #5ca8ea;
}
.cls-m5 {
  fill: #e0effb;
}
</style>
