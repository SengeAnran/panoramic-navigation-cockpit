<template>
  <div class="svg-show-box-dialog">
    <svg>
      <defs>
        <!--    filter定义SVG滤镜, <filter>标签使用必需的id属性来定义向图形应用哪个滤镜-->
        <filter id="dropShadow">
          <!--    该滤镜对输入图像进行高斯模糊，属性stdDeviation中指定的数量定义了钟形。      stdDeviation 模糊程度-->
          <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
          <!--该滤镜基于转换矩阵对颜色进行变换。
          每一像素的颜色值 (一个表示为 [红，绿，蓝，透明度] 的矢量) 都经过矩阵乘法 (matrix multiplated) 计算出的新颜色。-->
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="
              0 0 0 1 0
              0 0 1 1 0
              1 1 1 1 1
              0 0 0 1 0"
          />
          <!--     feOffset 偏移量     -->
          <feOffset dx="0" dy="0" />
          <!--feMerge滤镜允许同时应用滤镜效果而不是按顺序应用滤镜效果。
          利用result存储别的滤镜的输出可以实现这一点，然后在一个 <feMergeNode>子元素中访问它。-->
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
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
  svgLogo,
} from './constant';
import { defineProps, nextTick, onMounted, ref, watch } from 'vue';
import * as d3 from 'd3';
import { useStore } from 'vuex';
import { getTreeMax, lookViewNode } from './constant';
import { computed } from 'vue';
import { changeToggle } from '@/api/atlas';
const state = useStore();
const nodeInfo = computed(() => {
  return state.getters.dialogInfo;
});
const viewNodeUrl = computed(() => {
  return state.getters.viewNodeUrl;
});
watch(
  () => viewNodeUrl.value,
  (val) => {
    if (val) {
      nextTick(() => {
        const node = lookViewNode(nodes.value, val);
        if (node) {
          state.commit('atlasMap/SET_DIALOG_INFO', node);
        }
      });
    }
  },
);
watch(
  () => nodeInfo.value.node_id,
  (val) => {
    if (val) {
      addActive(val);
    }
  },
);
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
  defaultWidth = 1735, // 默认展示宽度
  defaultHeight = 508; // 默认展示高度
const svgClass = ref('');
onMounted(() => {
  svgClass.value = `svg-${props.index}`;
  mouseMove();
});
function mouseMove() {
  const showBox = document.querySelector('.svg-show-box-dialog');
  showBox.addEventListener('mousedown', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    let ox = showBox.scrollLeft;
    let oy = showBox.scrollTop;
    let timer = null; // 节流阀
    showBox.onmousemove = (e) => {
      if (timer) return;
      timer = setTimeout(() => {
        showBox.scrollLeft = ox - (e.pageX - x);
        showBox.scrollTop = oy - (e.pageY - y);
        timer = null;
      }, 16);
    };
    showBox.addEventListener('mouseup', () => {
      showBox.onmousemove = null;
    });
  });
}
watch(
  () => props.data,
  (val) => {
    if (val && val.name) {
      nextTick(() => {
        init();
      });
    }
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
    // 动态设置文本框宽度（用于横向树设置）
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
const midValue = 300; // left 和right 相距距离

const gSvg = ref('');
const nodes = ref({});
// 初始化
function init() {
  let multiple = 1,
    heightMultiple = 1, // 屏高系数
    widthMultiple = 1; // 屏宽系数
  treeHeight = d3.hierarchy(props.data).height;
  const treeWidth = getTreeMax(props.data);
  if (treeHeight > 4) {
    heightMultiple = treeHeight / 4;
  }
  if (treeWidth > 5) {
    widthMultiple = treeWidth / 5;
  }
  multiple = Math.max(widthMultiple, heightMultiple);
  svg = d3.select(`.svg-${props.index}`);
  if (svg.select('.chart-g')) {
    svg.selectAll('.chart-g').remove();
  }
  let width = defaultWidth;
  let height = defaultHeight;
  if (heightMultiple !== 1 || widthMultiple !== 1) {
    width = width * widthMultiple;
    height = height * heightMultiple;
  }
  svg.attr('width', width + 'px').attr('height', height + 'px');
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  inWidVal.value = innerWidth;
  inHeiVal.value = innerHeight;

  if (state.getters.dialogShowFirstTime) {
    // 第一次展示最多展示3层
    const fristRoot = d3.hierarchy(props.data);
    hideChildrenOnFirst(fristRoot, 3);
    if (multiple !== 1) {
      // 设置窗口展示位置
      const left = widthMultiple > 1 ? (innerWidth + margin.left) / 2 - defaultWidth / 2 : 0;
      const top = 0;
      console.log(multiple, left, top);
      document.querySelector('.svg-show-box-dialog').scrollTop = top; //通过scrollTop设置滚动到100位置
      document.querySelector('.svg-show-box-dialog').scrollLeft = left; //通过scrollTop设置滚动到200位置
      console.dir(document.querySelector('.svg-show-box-dialog'));
    }
    state.commit('atlasMap/SET_DIALOG_SHOW_FIRST_TIME', false);
  }
  const optionSame = {
    data: props.data,
    position: 'center',
    rootNode: {
      x: innerWidth / 2,
      y: 0,
    },
  };
  render(optionSame);
  addActive(nodeInfo.value.node_id); // 加当前节点效果
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
  const { data, position, rootNode } = option;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('class', 'chart-g');
  gSvg.value = g;
  let root = d3.hierarchy(data);
  const regionSize = {
    left: [innerHeight / 2, innerWidth / 3], // f(w/2 - y, x)
    right: [innerHeight / 2, innerWidth / 3], // f(w/2 + y, x)
    center: [innerWidth, innerHeight], // f(x + w/3, y + h/4)
  };
  root = d3.tree().size(regionSize[position])(root);
  root.x = rootNode.x; // 设置根节点初始位置
  // root.y = rootNode.y;
  const node = root.descendants(); // x: 181.75 y: 0
  nodes.value = node;
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
        console.log('需要单展示啦！');
        let { url, video_url, scriptCollectName = '', scriptName = '' } = d.data.meta || {};
        // 兼容字符串格式数据
        if (!(url instanceof Array)) {
          url = [url];
        }
        if (!(video_url instanceof Array)) {
          video_url = [video_url];
        }
        if (!(scriptCollectName instanceof Array)) {
          scriptCollectName = [scriptCollectName];
        }
        if (!(scriptName instanceof Array)) {
          scriptName = [scriptName];
        }
        const data = { url, video_url, scriptCollectName, scriptName, topicPattern: 'SINGLE' };
        if (url) {
          changeToggle(data);
        }
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
    .attr('y', (d) => (position === 'center' ? (d.depth === 0 ? d.y + 70 : d.y + 6) : d.x + 6))
    .text((d) => d.data.name)
    .style('font-size', (d) => (d.depth === 0 ? '20px' : '18px'))
    .style('font-family', (d) => (d.depth === 0 ? 'Source Han Sans CN' : 'YouSheBiaoTiHei'))
    .attr('opacity', (d) => {
      return d.data.hide === true ? 0 : 1;
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
        let positionX;
        if (d.depth === 0) {
          switch (position) {
            case 'center':
              positionX = d.x - 80;
              break;
            case 'left':
              positionX = innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2 - 50;
              break;
            case 'right':
              positionX = innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2 - 30;
              break;
          }
        } else {
          positionX =
            position === 'center'
              ? d.x - nodeOption2.width(d.data.name) / 2
              : position === 'right'
              ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
              : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
        }
        return positionX;
        // return position === 'center'
        //   ? d.x - nodeOption2.width(d.data.name) / 2
        //   : position === 'right'
        //   ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
        //   : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
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
        let positionX;
        if (d.depth === 0) {
          switch (position) {
            case 'center':
              positionX = d.x - 80;
              break;
            case 'left':
              positionX = innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2 - 50;
              break;
            case 'right':
              positionX = innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2 - 30;
              break;
          }
        } else {
          positionX =
            position === 'center'
              ? d.x - nodeOption2.width(d.data.name) / 2
              : position === 'right'
              ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
              : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
        }
        return positionX;
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
  // 画节点图标
  g.append('g')
    .attr('class', 'logo-svg-dialog')
    .selectAll('g')
    .data([node[0]])
    .join('g')
    .html(svgLogo)
    .attr('transform', (d) => {
      return `translate(${d.x - 30}, ${d.y - 30})`;
    });
}
// 画布移动到某一位置
function moveTo(e) {
  const top = e.offsetY - defaultHeight / 2;
  const left = e.offsetX - defaultWidth / 2;
  const obj = document.querySelector('.svg-show-box-dialog');
  if (Math.abs(top) > 5) {
    animateY(obj, Math.ceil(top));
  }
  if (Math.abs(left) > 5) {
    animateX(obj, Math.ceil(left));
  }
}
// 给当前显示元素加选中色;
function addActive(data) {
  if (!gSvg.value) {
    return;
  }
  const allRect = gSvg.value.selectAll('.rect-box');
  let activeIndex;
  allRect.nodes().forEach((i, index) => {
    if (i.__data__.data.node_id === data) {
      activeIndex = index;
    }
  });
  const nodes = allRect.nodes();
  nodes.forEach((i) => {
    i.setAttribute('filter', '');
    i.setAttribute('stroke', '#3B78F2');
  });
  if (activeIndex || activeIndex === 0) {
    nodes[activeIndex].setAttribute('filter', 'url(#dropShadow)');
    nodes[activeIndex].setAttribute('stroke', 'white');
    // nodes[activeIndex].setAttribute('stroke', 'white');
  }
}
</script>

<style lang="scss" scoped>
.svg-show-box-dialog {
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
