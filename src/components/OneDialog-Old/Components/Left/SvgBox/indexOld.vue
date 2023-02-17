<template>
  <svg class="svg-box" :class="svgClass"></svg>
</template>

<script setup>
import { hideChildrenNode, mathMidPoints, showChildrenNode, svgAddReduce, svgLogo } from './constant';
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
const inWidVal = ref(0);
const inHeiVal = ref(0);
// const rootX = ref(0);
// const rootY = ref(0);
let innerWidth, innerHeight, svg;
// const g = ref('');
const svgClass = ref('');
onMounted(() => {
  svgClass.value = `svg-${props.index}`;
});
watch(
  () => props.data,
  (val) => {
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
const midValue = 300;
let sameData = {
  name: '相同节点',
  children: [],
};
function init() {
  svg = d3.select(`.svg-${props.index}`);
  if (svg.select('.chart-g')) {
    svg.selectAll('.chart-g').remove();
  }
  const width = parseInt(svg.style('width'), 10);
  const height = parseInt(svg.style('height'), 10);
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  inWidVal.value = innerWidth;
  inHeiVal.value = innerHeight;
  // rootX.value = innerWidth / 2 - 10;
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
    sameData.children = props.data.children[1].children;
    renderSame(sameData);
    renderAll(data);
  }
}
// 画左右两边树状图
function render(data, position) {
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('class', 'chart-g');
  let root = d3.hierarchy(data);
  root = d3.tree().size([innerHeight / 2, innerWidth / 3])(root);
  root.x = 181.75;
  root.y = 0;
  const node = root.descendants(); // x: 181.75 y: 0
  const path = root.links();
  // console.log(node, path);
  const newCircles = []; // 连线两端点坐标列表
  function mathX(y) {
    // 计算点的x的实际坐标
    return position === 'right' ? innerWidth / 2 + y + midValue / 2 : innerWidth / 2 - y - midValue / 2;
  }
  // 画线
  g.selectAll('path')
    .data(path)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr('d', (d) => {
      const x1 = mathX(d.source.y);
      const y1 = d.source.x;
      const x2 = mathX(d.target.y);
      const y2 = d.target.x;
      console.log(d);
      const { x3, y3, x4, y4 } = mathMidPoints(
        x2,
        y2,
        x1,
        y1,
        16,
        nodeOption2.width(d.source.data.name),
        nodeOption2.width(d.target.data.name),
      ); // 计算短路径
      if (d.target.data.hide !== true) {
        newCircles.push({
          x: x4,
          y: y4,
        });
        newCircles.push({
          x: x3,
          y: y3,
        });
      }
      return `
        M${x3},${y3}
        ${x4},${y4}`;
    })
    .attr('opacity', (d) => {
      return d.target.data.hide === true ? 0 : 1;
    });
  // 画节点方块
  g.selectAll('rect')
    .data(node)
    .join('rect')
    .attr('width', (d) => nodeOption.height(d.data.name))
    .attr('height', nodeOption.width)
    .attr('fill', (d) => rectColor(d))
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 2)
    .attr('rx', 4)
    .attr('x', (d) =>
      position === 'right'
        ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
        : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2,
    )
    .attr('y', (d) => d.x - nodeOption.width / 2)
    .attr('opacity', (d) => {
      return d.data.hide === true || (d.depth === 0 && props.data.children.length === 2) ? 0 : 1;
    })
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
    .style('font-family', 'YouSheBiaoTiHei')
    .attr('opacity', (d) => {
      return d.data.hide === true || (d.depth === 0 && props.data.children.length === 2) ? 0 : 1;
    })
    .attr('fill', 'white');
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');

  // 画圈
  g.selectAll('circle')
    .data(newCircles)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 5)
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 1);

  // 画加按钮
  g.append('g')
    .attr('class', 'add')
    .selectAll('g')
    .data(node)
    .join('g')
    .html(svgAddReduce.add)
    .attr('transform', (d) => {
      function mathX(d, position) {
        return position === 'right'
          ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
          : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
      }
      return `translate(${mathX(d, position)}, ${d.x - nodeOption.width / 2 - 16})`;
    })
    .attr('opacity', (d) => (d.depth === 0 && props.data.children.length === 2 ? 0 : 1))
    .on('click', (e, d) => {
      showChildrenNode(d);
      init();
    })
    .attr('opacity', (d) => {
      return d.data.hide === true || (d.depth === 0 && props.data.children.length === 2) || !d.data.children ? 0 : 1;
    });
  // 画减按钮
  g.append('g')
    .attr('class', 'reduce')
    .selectAll('g')
    .data(node)
    .join('g')
    .html(svgAddReduce.reduce)
    .attr('transform', (d) => {
      function mathX(d, position) {
        return position === 'right'
          ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
          : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
      }
      return `translate(${mathX(d, position) + 16}, ${d.x - nodeOption.width / 2 - 16})`;
    })
    .attr('opacity', (d) => (d.depth === 0 && props.data.children.length === 2 ? 0 : 1))
    .on('click', (e, d) => {
      hideChildrenNode(d);
      init();
    })
    .attr('opacity', (d) => {
      return d.data.hide === true || (d.depth === 0 && props.data.children.length === 2) || !d.data.children ? 0 : 1;
    });
}
// 画根树状图
function renderAll(data) {
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('class', 'chart-g');
  let root = d3.hierarchy(data);
  // x:242.375 y: 0
  // (x: 80.79166666666667 y: 181.75)  (x: 242.375 y: 181.75) ( 403.95833333333337 y: 181.75)
  root = d3.tree().size([innerWidth / 4, innerHeight / 4])(root);
  root.x = 242.375;
  root.y = 30;
  // root.children[0].x = 80.79166666666667;
  // root.children[0].y = 181.75;
  console.log(root, 'ddddd');
  const node = root.descendants();
  const path = root.links();
  // console.log(node, path);
  // 画线
  g.selectAll('path')
    .data(path)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr(
      'd',
      // d3
      //   .linkVertical()
      //   .x((d) => d.x + (innerWidth * 3) / 8)
      //   .y((d) => d.y),
      (d) => {
        function mathX(x) {
          // 计算点的x的实际坐标
          return x + (innerWidth * 3) / 8;
        }
        const x1 = mathX(d.source.x);
        const y1 = d.source.y;
        const x2 = mathX(d.target.x);
        const y2 = d.target.y;
        return `
        M${x1},${y1}
        ${x2},${y2}`;
      },
    );
  // 画节点图标
  g.append('g')
    .attr('class', 'logo-svg')
    .selectAll('g')
    .data(node)
    .join('g')
    .html((d) => svgLogo(d))
    .attr('transform', (d) => {
      if (d.x === 403.95833333333337) {
        return `translate(${d.x + (innerWidth * 3) / 8}, ${d.y - nodeOption2.height})`;
      }
      return `translate(${d.x - nodeOption2.width(d.data.name) / 2 + (innerWidth * 3) / 8}, ${
        d.y - nodeOption2.height
      })`;
    });
  // // 画节点方块
  // g.selectAll('rect')
  //   .data(node)
  //   .join('rect')
  //   .attr('width', (d) => nodeOption.height(d.data.name))
  //   .attr('height', nodeOption.width)
  //   .attr('fill', (d) => rectColor(d))
  //   .attr('stroke', '#3B78F2')
  //   .attr('stroke-width', 2)
  //   .attr('x', (d) => d.x - nodeOption2.width(d.data.name) / 2 + (innerWidth * 3) / 8)
  //   .attr('y', (d) => d.y - nodeOption2.height / 2)
  //   .attr('class', 'rect');
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
    // .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .attr('text-anchor', 'middle') // 位置
    .attr('x', (d) => d.x + (innerWidth * 3) / 8)
    .attr('y', (d) => (d.children ? d.y - 40 : d.y + 66))
    .text((d) => d.data.name)
    .style('font-size', (d) => (d.children ? '24px' : '18px'))
    .style('font-weight', (d) => (d.children ? '800' : '400'))
    .attr('fill', 'white');
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');
}

// 画相同节点树状图
function renderSame(data) {
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('class', 'chart-g');
  let root = d3.hierarchy(data);
  root = d3.tree().size([innerWidth / 3, (innerHeight * 3) / 4])(root);
  // x: 323.1666666666667 y: 0
  root.x = 323.1666666666667;
  root.y = 0;
  const node = root.descendants();
  const path = root.links();
  // console.log(node, path);
  const newCircles = []; // 连线两端点坐标列表
  // 画线
  g.selectAll('path')
    .data(path)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', '#7CA3EF')
    .attr('stroke-width', 1)
    .attr(
      'd',
      // d3
      //   .linkVertical()
      //   .x((d) => d.x + innerWidth / 3)
      //   .y((d) => d.y + innerHeight / 4),
      (d) => {
        function mathX(x) {
          // 计算点的x的实际坐标
          return x + innerWidth / 3;
        }
        function mathY(y) {
          // 计算点的x的实际坐标
          return y + innerHeight / 4;
        }
        const x1 = mathX(d.source.x);
        const y1 = mathY(d.source.y);
        const x2 = mathX(d.target.x);
        const y2 = mathY(d.target.y);
        const { x3, y3, x4, y4 } = mathMidPoints(x2, y2, x1, y1, 16); // 计算短路径
        if (d.target.data.hide !== true) {
          newCircles.push({
            x: x4,
            y: y4,
          });
          newCircles.push({
            x: x3,
            y: y3,
          });
        }
        return `
        M${x3},${y3}
        ${x4},${y4}`;
      },
    )
    .attr('opacity', (d) => {
      return d.target.data.hide === true ? 0 : 1;
    });

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
    .attr('rx', 4)
    // .attr('ry', 4)
    .attr('class', 'rect')
    .attr('opacity', (d) => {
      return d.data.hide === true || d.depth === 0 ? 0 : 1;
    });
  // 文字
  console.log(node);
  g.selectAll('text')
    .data(node)
    .join('text')
    .on('click', (d) => {
      console.log(d);
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
    .style('font-family', 'YouSheBiaoTiHei')
    .attr('fill', 'white')
    .attr('opacity', (d) => {
      return d.data.hide === true || d.depth === 0 ? 0 : 1;
    });
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');
  // 画圈
  g.selectAll('circle')
    .data(newCircles)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 5)
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 1);
  // 画加按钮
  g.append('g')
    .attr('class', 'add')
    .selectAll('g')
    .data(node)
    .join('g')
    .html(svgAddReduce.add)
    .attr('transform', (d) => {
      return `translate(${d.x - nodeOption2.width(d.data.name) / 2 + innerWidth / 3}, ${
        d.y - nodeOption2.height / 2 + innerHeight / 4 - 16
      })`;
    })
    // .attr('opacity', (d) => (d.depth === 0 && props.data.children.length === 2 ? 0 : 1))
    .on('click', (e, d) => {
      showChildrenNode(d);
      init();
    })
    .attr('opacity', (d) => {
      return d.data.hide === true || d.depth === 0 || !d.data.children ? 0 : 1;
    });
  // 画减按钮
  g.append('g')
    .attr('class', 'reduce')
    .selectAll('g')
    .data(node)
    .join('g')
    .html(svgAddReduce.reduce)
    .attr('transform', (d) => {
      return `translate(${d.x - nodeOption2.width(d.data.name) / 2 + innerWidth / 3 + 16}, ${
        d.y - nodeOption2.height / 2 + innerHeight / 4 - 16
      })`;
    })
    .attr('opacity', (d) => (d.depth === 0 && props.data.children.length === 2 ? 0 : 1))
    .on('click', (e, d) => {
      hideChildrenNode(d);
      init();
    })
    .attr('opacity', (d) => {
      return d.data.hide === true || d.depth === 0 || !d.data.children ? 0 : 1;
    });
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
.cls-1 {
  fill: #b8d9f6;
}
.cls-2 {
  fill: #99c9f2;
}
.cls-3 {
  fill: #e0effb;
}
.cls-4 {
  fill: #5ca8ea;
}
.cls-5 {
  fill: #fff;
}
</style>
<!--相同节点-->
<style>
.cls-21 {
  fill: #b8d9f6;
}
.cls-22 {
  fill: #5ca8ea;
}
.cls-23 {
  fill: #99c9f2;
}
.cls-24 {
  fill: #e0effb;
}
</style>
<!--系统-->
<style>
.cls-31 {
  fill: #99c9f2;
}
.cls-32 {
  fill: #b8d9f6;
}
.cls-33 {
  fill: #5ca8ea;
}
.cls-34 {
  fill: #e0effb;
}
</style>
