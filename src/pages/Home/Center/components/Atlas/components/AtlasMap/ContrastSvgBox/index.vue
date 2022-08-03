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
let innerWidth, innerHeight, svg;
// const g = ref('');
const svgClass = ref('');
onMounted(() => {
  svgClass.value = `svg-${props.index}`;
});
watch(
  () => props.data,
  (val) => {
    console.log('变啦');
    console.log(val);
    if (val.children) {
      nextTick(() => {
        init();
      });
    }
    // init();
  },
  { immediate: true, deep: true },
);
// 节点背景颜色
function rectColor(d) {
  return d.data.same ? '#3B78F2' : '#142847';
}
const nodeOption = {
  height: (name) => {
    // 动态设置文本框宽度
    return name.length * 18 + 15;
  },
  width: 32,
};
const nodeOption2 = {
  width: (name) => {
    // 动态设置文本框宽度
    return name.length * 18 + 15;
  },
  height: 32,
};
const margin = {
  top: 40,
  right: 30,
  bottom: 33,
  left: 30,
};
const midValue = 322;
function init() {
  svg = d3.select(`.svg-${props.index}`);
  if (svg.select('g')) {
    svg.selectAll('g').remove();
  }
  const width = parseInt(svg.style('width'), 10);
  const height = parseInt(svg.style('height'), 10);
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  if (props.data.children[0]) {
    render(props.data.children[0], 'left');
  }
  if (props.data.children[1]) {
    render(props.data.children[1], 'right');
    let data = {
      name: props.data.name,
      children: [
        {
          name: props.data.children[0].name,
        },
        {
          name: '相同节点',
        },
        {
          name: props.data.children[1].name,
        },
      ],
    };
    let sameData = {
      name: '相同节点',
      children: props.data.children[1].children,
    };
    renderSame(sameData);
    renderAll(data);
  }
}
function render(data, position) {
  const g = svg.append('g').attr('transform', `translate(${margin.top},${margin.left})`);
  let root = d3.hierarchy(data);
  root = d3.tree().size([innerHeight / 2, innerWidth / 3])(root);
  const node = root.descendants();
  const path = root.links();
  console.log(node, path);
  // 画线
  g.selectAll('path')
    .data(path)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr(
      'd',
      d3
        .linkVertical()
        .x((d) => (position === 'right' ? innerWidth / 2 + d.y + midValue / 2 : innerWidth / 2 - d.y - midValue / 2))
        .y((d) => d.x),
    );
  // 画节点方块
  g.selectAll('rect')
    .data(node)
    .join('rect')
    .attr('width', (d) => nodeOption.height(d.data.name))
    .attr('height', nodeOption.width)
    .attr('fill', (d) => rectColor(d))
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 2)
    .attr('x', (d) =>
      position === 'right'
        ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
        : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2,
    )
    .attr('y', (d) => d.x - nodeOption.width / 2)
    .attr('opacity', (d) => (d.depth === 0 && props.data.children.length === 2 ? 0 : 1))
    .attr('class', 'rect');
  // 文字
  g.selectAll('text')
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
    .attr('x', (d) =>
      position === 'right' ? innerWidth / 2 + d.y + midValue / 2 : innerWidth / 2 - d.y - midValue / 2,
    )
    .attr('y', (d) => d.x + 6)
    .text((d) => d.data.name)
    .style('font-size', '18px')
    .attr('opacity', (d) => (d.depth === 0 && props.data.children.length === 2 ? 0 : 1))
    .attr('fill', 'white');
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');
  console.log(g);
}
function renderAll(data) {
  const g = svg.append('g').attr('transform', `translate(${margin.top},${margin.left})`);
  let root = d3.hierarchy(data);
  root = d3.tree().size([innerWidth / 4, innerHeight / 4])(root);
  const node = root.descendants();
  const path = root.links();
  console.log(node, path);
  // 画线
  g.selectAll('path')
    .data(path)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr(
      'd',
      d3
        .linkVertical()
        .x((d) => d.x + (innerWidth * 3) / 8)
        .y((d) => d.y),
    );
  // 画节点方块
  g.selectAll('rect')
    .data(node)
    .join('rect')
    .attr('width', (d) => nodeOption.height(d.data.name))
    .attr('height', nodeOption.width)
    .attr('fill', (d) => rectColor(d))
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 2)
    .attr('x', (d) => d.x - nodeOption2.width(d.data.name) / 2 + (innerWidth * 3) / 8)
    .attr('y', (d) => d.y - nodeOption2.height / 2)
    .attr('class', 'rect');
  // 文字
  g.selectAll('text')
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
    .attr('x', (d) => d.x + (innerWidth * 3) / 8)
    .attr('y', (d) => d.y + 6)
    .text((d) => d.data.name)
    .style('font-size', '18px')
    .attr('fill', 'white');
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');
  console.log(g);
}
function renderSame(data) {
  const g = svg.append('g').attr('transform', `translate(${margin.top},${margin.left})`);
  let root = d3.hierarchy(data);
  root = d3.tree().size([innerWidth / 3, (innerHeight * 3) / 4])(root);
  const node = root.descendants();
  const path = root.links();
  console.log(node, path);
  // 画线
  g.selectAll('path')
    .data(path)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr(
      'd',
      d3
        .linkVertical()
        .x((d) => d.x + innerWidth / 3)
        .y((d) => d.y + innerHeight / 4),
    );
  // 画节点方块
  g.selectAll('rect')
    .data(node)
    .join('rect')
    .attr('width', (d) => nodeOption.height(d.data.name))
    .attr('height', nodeOption.width)
    .attr('fill', (d) => rectColor(d))
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 2)
    .attr('x', (d) => d.x - nodeOption2.width(d.data.name) / 2 + innerWidth / 3)
    .attr('y', (d) => d.y - nodeOption2.height / 2 + innerHeight / 4)
    .attr('class', 'rect')
    .attr('opacity', (d) => (d.depth === 0 ? 0 : 1));
  // 文字
  g.selectAll('text')
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
    .attr('x', (d) => d.x + innerWidth / 3)
    .attr('y', (d) => d.y + 6 + innerHeight / 4)
    .text((d) => d.data.name)
    .style('font-size', '18px')
    .attr('opacity', (d) => (d.depth === 0 ? 0 : 1))
    .attr('fill', 'white');
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');
  console.log(g);
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
