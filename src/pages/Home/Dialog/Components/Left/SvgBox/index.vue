<template>
  <div class="svg-show-box">
    <svg class="svg-box" :class="svgClass"></svg>
  </div>
</template>

<script setup>
import {
  animateY,
  animateX,
  hideChildrenNode,
  hideChildrenOnFirst,
  mathMidPoints,
  showChildrenNode,
  svgAddReduce,
  getRootInfo,
} from './constant';
import { defineProps, nextTick, onMounted, ref } from 'vue';
import * as d3 from 'd3';
import { useStore } from 'vuex';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
  },
  hideAll: {
    type: Boolean,
    default: false,
  },
});
const inWidVal = ref(0);
const inHeiVal = ref(0);
let innerWidth, // 内宽
  innerHeight, // 内高
  svg,
  treeHeight, // 树高
  defaultWidth = 979, // 默认展示宽度
  defaultHeight = 748; // 默认展示高度
const svgClass = ref('');
onMounted(() => {
  svgClass.value = `svg-${props.index}`;
  nextTick(() => {
    console.log(props.data);
    init();
  });
});
// watch(
//   () => props.data,
//   (val) => {
//     if (val.children) {
//       nextTick(() => {
//         init();
//       });
//     }
//   },
//   { immediate: true, deep: true },
// );
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
    // 动态设置文本框宽度（用于横向树设置）
    return name.length * 18 + 15;
  },
  height: 32,
};
const margin = {
  top: 180,
  right: 30,
  bottom: 33,
  left: 30,
};
const midValue = 300; // left 和right 相距距离
const state = useStore();
// 初始化
function init() {
  let multiple = 1; // 屏宽系数
  treeHeight = d3.hierarchy(props.data).height;
  // console.log('treeHeight', treeHeight);
  if (treeHeight > 5) {
    multiple = treeHeight / 6 + 2 / 6;
  }
  svg = d3.select(`.svg-${props.index}`);
  if (svg.select('.chart-g')) {
    svg.selectAll('.chart-g').remove();
  }
  let width = defaultWidth;
  let height = defaultHeight;
  // console.log('multiple', multiple);
  if (multiple !== 1) {
    width = width * multiple;
    height = height * multiple;
  }
  svg.attr('width', width + 'px').attr('height', height + 'px');
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  inWidVal.value = innerWidth;
  inHeiVal.value = innerHeight;
  // rootX.value = innerWidth / 2 - 10;

  if (state.getters.showFirstTime) {
    // 第一次展示最多展示5层
    const fristRoot = d3.hierarchy(props.data);
    hideChildrenOnFirst(fristRoot, 5);
    if (multiple !== 1) {
      // 设置窗口展示位置
      const left = ((multiple - 1) / 2) * (defaultWidth - margin.left - margin.right);
      const top = multiple > 1 ? (multiple * innerHeight) / 16 : 0;
      document.querySelector('.svg-show-box').scrollTop = top; //通过scrollTop设置滚动到100位置
      document.querySelector('.svg-show-box').scrollLeft = left; //通过scrollTop设置滚动到200位置
    }
    state.commit('atlasMap/SET_SHOW_FIRST_TIME', false);
  }
  const optionSame = {
    data: props.data,
    position: 'center',
    rootNode: {
      x: innerWidth / 6,
      y: 0,
    },
  };
  render(optionSame);
}

// 画左右两边树状图
/**
 * 画左右两边树状图
 * @param {Object} option {
 *   data: 树状图数据，
 *   position： 位置：left、right、bottom
 *   rootNode: { 根节点固定初始坐标
 *     x:
 *     y:
 *   }
 * }
 * @returns {Object}
 */
function render(option) {
  const { data, position } = option;
  console.log(data);
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('class', 'chart-g');
  let root = d3.hierarchy(data);
  const regionSize = {
    left: [innerHeight / 2, innerWidth / 3], // f(w/2 - y, x)
    right: [innerHeight / 2, innerWidth / 3], // f(w/2 + y, x)
    center: [innerWidth, innerHeight], // f(x + w/3, y + h/4)
  };
  root = d3.tree().size(regionSize[position])(root);
  // root.x = rootNode.x; // 设置根节点初始位置
  // root.y = rootNode.y;
  const node = root.descendants(); // x: 181.75 y: 0
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
    .attr('d', (d) => {
      function mathX(y) {
        // 左右会左右旋转
        // 计算点的x的实际坐标
        return position === 'center'
          ? y
          : position === 'right'
          ? innerWidth / 2 + y + midValue / 2
          : innerWidth / 2 - y - midValue / 2;
      }
      function mathY(x) {
        // 计算点的x的实际坐标
        return position === 'center' ? x : x;
      }
      let x1, x2, y1, y2;
      if (position !== 'center') {
        x1 = mathX(d.source.y);
        y1 = mathY(d.source.x);
        x2 = mathX(d.target.y);
        y2 = mathY(d.target.x);
      } else {
        x1 = mathX(d.source.x);
        y1 = mathY(d.source.y);
        x2 = mathX(d.target.x);
        y2 = mathY(d.target.y);
      }
      let { x3, y3, x4, y4 } =
        position === 'center'
          ? mathMidPoints(x2, y2, x1, y1, 16)
          : mathMidPoints(
              x2,
              y2,
              x1,
              y1,
              16,
              nodeOption2.width(d.source.data.name),
              nodeOption2.width(d.target.data.name),
            ); // 计算短路径
      if (position === 'right' && !d.source.parent) {
        x3 = x1;
      }
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
    .attr('class', 'rect-box')
    .attr('width', (d) => nodeOption.height(d.data.name))
    .attr('height', nodeOption.width)
    .attr('fill', (d) => rectColor(d))
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 2)
    .attr('rx', 4)
    .attr('x', (d) => {
      return position === 'center'
        ? d.x - nodeOption2.width(d.data.name) / 2
        : position === 'right'
        ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2 //
        : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
    })
    .attr('y', (d) => (position === 'center' ? d.y - nodeOption2.height / 2 : d.x - nodeOption.width / 2))
    .attr('opacity', (d) => {
      return d.data.hide === true ||
        (position === 'center' ? d.depth === 0 : d.depth === 0 && props.data.children.length === 2)
        ? 0
        : 1;
    });
  // 文字
  g.selectAll('text')
    .data(node)
    .join('text')
    .on('click', (e, d) => {
      // console.log(e.target.__data__); // 点击的节点
      console.log(d);
      console.log('点击了,深度为：' + d.depth);
      if (d.depth && !d.data.same) {
        console.log('需要单展示啦！');
        state.commit('SET_CONTENT_OPACITY', true);
        state.commit('atlasMap/SET_DIALOG_INFO', d.data);
        state.commit('SET_MAIN_TITLE', getRootInfo(d).name);
      }
    })
    .attr('text-anchor', 'middle') // 位置
    .attr('x', (d) =>
      position === 'center'
        ? d.x
        : position === 'right'
        ? innerWidth / 2 + d.y + midValue / 2
        : innerWidth / 2 - d.y - midValue / 2,
    )
    .attr('y', (d) => (position === 'center' ? d.y + 6 : d.x + 6))
    .text((d) => d.data.name)
    .style('font-size', '18px')
    .style('font-family', 'YouSheBiaoTiHei')
    .attr('opacity', (d) => {
      return d.data.hide === true ||
        (position === 'center' ? d.depth === 0 : d.depth === 0 && props.data.children.length === 2)
        ? 0
        : 1;
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
      function mathX() {
        return position === 'center'
          ? d.x - nodeOption2.width(d.data.name) / 2
          : position === 'right'
          ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
          : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
      }
      function mathY() {
        return position === 'center' ? d.y - nodeOption2.height / 2 - 16 : d.x - nodeOption.width / 2 - 16;
      }
      return `translate(${mathX()}, ${mathY()})`;
    })
    .on('click', (e, d) => {
      // console.log(e.offsetX, e.offsetY);
      moveTo(e);
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
      function mathX() {
        return position === 'center'
          ? d.x - nodeOption2.width(d.data.name) / 2
          : position === 'right'
          ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
          : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
      }
      function mathY() {
        return position === 'center' ? d.y - nodeOption2.height / 2 - 16 : d.x - nodeOption.width / 2 - 16;
      }
      return `translate(${mathX() + 16}, ${mathY()})`;
    })
    .on('click', (e, d) => {
      moveTo(e);
      hideChildrenNode(d);
      init();
    })
    .attr('opacity', (d) => {
      return d.data.hide === true || (d.depth === 0 && props.data.children.length === 2) || !d.data.children ? 0 : 1;
    });
}
// 画布移动到某一位置
function moveTo(e) {
  const top = e.offsetY - defaultHeight / 2;
  const left = e.offsetX - defaultWidth / 2;
  const obj = document.querySelector('.svg-show-box');
  if (e.offsetY - defaultHeight / 2 - e.target.scrollTop > 5) {
    animateY(obj, top > 0 ? Math.ceil(top) : 0);
  }
  if (e.offsetX - defaultWidth / 2 - e.target.scrollLeft > 5) {
    animateX(obj, left > 0 ? Math.ceil(left) : 0);
  }
}
// // 画根树状图
// function renderRoot(option) {
//   const { data, rootNode } = option;
//   const formula = innerWidth / 2 - (midValue * 1.6) / 2;
//   const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('class', 'chart-g');
//   let root = d3.hierarchy(data);
//   // x:242.375 y: 0
//   // (x: 80.79166666666667 y: 181.75)  (x: 242.375 y: 181.75) ( 403.95833333333337 y: 181.75)
//   root = d3.tree().size([midValue * 1.6, innerHeight / 4])(root);
//   root.x = rootNode.x * 1.6; // 242.375;
//   root.y = rootNode.y;
//   const node = root.descendants();
//   const path = root.links();
//   // console.log(node, path);
//   // 画线
//   g.selectAll('path')
//     .data(path)
//     .join('path')
//     .attr('fill', 'none')
//     .attr('stroke', '#7CA3EF')
//     .attr('stroke-width', 1)
//     .attr('d', (d) => {
//       function mathX(x) {
//         // 计算点的x的实际坐标
//         return x + formula;
//       }
//       const x1 = mathX(d.source.x);
//       const y1 = d.source.y;
//       const x2 = mathX(d.target.x);
//       const y2 = d.target.y;
//       return `
//         M${x1},${y1}
//         ${x2},${y2}`;
//     });
//   // 画节点图标
//   g.append('g')
//     .attr('class', 'logo-svg')
//     .selectAll('g')
//     .data(node)
//     .join('g')
//     .html((d) => svgLogo(d))
//     .attr('transform', (d) => {
//       if (d.x === 403.95833333333337) {
//         return `translate(${d.x + formula}, ${d.y - nodeOption2.height})`;
//       }
//       return `translate(${d.x - nodeOption2.width(d.data.name) / 2 + formula}, ${d.y - nodeOption2.height})`;
//     });
//   // 文字
//   g.selectAll('text')
//     .data(node)
//     .join('text')
//     .on('click', (d) => {
//       console.log(d.target.__data__); // 点击的节点
//       console.log('点击了,深度为：' + d.target.__data__.depth);
//       if (d.target.__data__.depth) {
//         console.log('需要展示啦！');
//       }
//     })
//     // .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
//     .attr('text-anchor', 'middle') // 位置
//     .attr('x', (d) => d.x + formula)
//     .attr('y', (d) => (d.children ? d.y - 40 : d.y + 66))
//     .text((d) => d.data.name)
//     .style('font-size', (d) => (d.children ? '24px' : '18px'))
//     .style('font-weight', (d) => (d.children ? '800' : '400'))
//     .attr('fill', 'white');
//   // .attr('writing-mode', 'vertical-rl') // 文本竖过来
//   // .attr('text-orientation', 'upright');
// }
</script>

<style lang="scss" scoped>
.svg-show-box {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .svg-box {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>
<style lang="scss">
.rect-box:hover {
  //box-shadow: 0px 0px 20px 0px #1d4d8d;
}
</style>
<!--<style>-->
<!--.cls-1 {-->
<!--  fill: #b8d9f6;-->
<!--}-->
<!--.cls-2 {-->
<!--  fill: #99c9f2;-->
<!--}-->
<!--.cls-3 {-->
<!--  fill: #e0effb;-->
<!--}-->
<!--.cls-4 {-->
<!--  fill: #5ca8ea;-->
<!--}-->
<!--.cls-5 {-->
<!--  fill: #fff;-->
<!--}-->
<!--</style>-->
<!--&lt;!&ndash;相同节点&ndash;&gt;-->
<!--<style>-->
<!--.cls-21 {-->
<!--  fill: #b8d9f6;-->
<!--}-->
<!--.cls-22 {-->
<!--  fill: #5ca8ea;-->
<!--}-->
<!--.cls-23 {-->
<!--  fill: #99c9f2;-->
<!--}-->
<!--.cls-24 {-->
<!--  fill: #e0effb;-->
<!--}-->
<!--</style>-->
<!--&lt;!&ndash;系统&ndash;&gt;-->
<!--<style>-->
<!--.cls-31 {-->
<!--  fill: #99c9f2;-->
<!--}-->
<!--.cls-32 {-->
<!--  fill: #b8d9f6;-->
<!--}-->
<!--.cls-33 {-->
<!--  fill: #5ca8ea;-->
<!--}-->
<!--.cls-34 {-->
<!--  fill: #e0effb;-->
<!--}-->
<!--</style>-->
