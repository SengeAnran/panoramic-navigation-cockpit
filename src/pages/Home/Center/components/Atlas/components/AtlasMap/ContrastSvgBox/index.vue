<template>
  <svg class="svg-box" :class="svgClass"></svg>
</template>

<script setup>
import { defineProps, nextTick, onMounted, ref, watch } from 'vue';
import * as d3 from 'd3';
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
});
watch(
  () => props.data,
  (val) => {
    console.log('变啦');
    console.log(val);
    if (val.children && val.children.length > 0) {
      console.log('可以画啦');
      nextTick(() => {
        init();
      });
    }
    // init();
  },
  { immediate: true, deep: true },
);
function init() {
  console.log('画啦');
  const svg = d3.select(`.svg-${props.index}`);
  if (svg.select('g')) {
    svg.select('g').remove();
  }
  const margin = {
    top: 40,
    right: 30,
    bottom: 33,
    left: 30,
  };
  const nodeOption = {
    width: (name) => {
      // 动态设置文本框宽度
      return name.length * 18 + 15;
    },
    height: 32,
  };
  const width = parseInt(svg.style('width'), 10);
  const height = parseInt(svg.style('height'), 10);
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  g.value = svg.append('g').attr('transform', `translate(${margin.top},${margin.left})`);
  root = d3.hierarchy(props.data);
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
        .linkHorizontal()
        .x((d) => d.x)
        .y((d) => d.y),
    );
  // 节点背景颜色
  function rectColor(d) {
    console.log(d);
    return d.data.same ? '#3B78F2' : '#142847';
  }
  // 画节点方块
  g.value
    .selectAll('rect')
    .data(node)
    .join('rect')
    .attr('width', (d) => nodeOption.width(d.data.name))
    .attr('height', nodeOption.height)
    .attr('fill', (d) => rectColor(d))
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 2)
    .attr('x', (d) => d.x - nodeOption.width(d.data.name) / 2)
    .attr('y', (d) => d.y)
    .attr('class', 'rect');

  // 文字
  g.value
    .selectAll('text')
    .data(node)
    .join('text')
    .on('click', (d) => {
      console.log(d.target.__data__); // 点击的节点
      console.log('点击了,深度为：' + d.target.__data__.depth);
      if (d.target.__data__.depth) {
        console.log('需要展示啦！');
      }
    })
    .attr('text-anchor', 'middle') // 位置
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y + 23)
    .text((d) => d.data.name)
    .style('font-size', '18px')
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
