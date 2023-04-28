<template>
  <div class="svg-show-box">
    <svg>
      <defs>
        <!--    filter定义SVG滤镜, <filter>标签使用必需的id属性来定义向图形应用哪个滤镜-->
        <filter id="dropShadow2">
          <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
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
          <feOffset dx="0" dy="0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
    <!--    动态class 防止获取冲突-->
    <svg class="svg-box" :class="svgClass"></svg>
  </div>
</template>

<script setup>
import * as _ from 'lodash';
import {
  animateY,
  animateX,
  hideAllChildren,
  hideChildrenNode,
  hideChildrenOnFirst,
  mathMidPoints,
  showChildrenNode,
  svgAddReduce,
  svgLogo,
  getTreeMax,
} from './constant';
import { defineProps, nextTick, onMounted, ref, watch, reactive, computed } from 'vue';
import * as d3 from 'd3';
import { useStore } from 'vuex';
import { changeToggle } from '@/api/atlas';
import { lookViewNode } from '@/components/OneDialog/Components/CenterContent/SvgBox/constant';
const state = useStore();
const nodeInfo = computed(() => {
  return state.getters.compereNodeInfo;
});
const viewNodeUrl = computed(() => {
  return state.getters.viewNodeUrl;
});
const nodes = reactive({
  left: '',
  right: '',
  center: '',
});
watch(
  () => viewNodeUrl.value,
  (val) => {
    if (val) {
      nextTick(() => {
        const nodeList = [];
        Object.keys(nodes).map((i) => {
          const node = lookViewNode(nodes[i], val);
          if (node) {
            nodeList.push(node);
          }
        });
        state.commit('atlasMap/SET_COMPERE_NODE_INFO', nodeList);
      });
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
  defaultWidth: {
    // 默认展示宽度
    type: Number,
    default: 2875,
  },
  defaultHeight: {
    // 默认展示高度
    type: Number,
    default: 750,
  },
  canClick: {
    // 能否点击节点切换页面（成果对比展示模式）
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['clickOne']);
const inWidVal = ref(0);
const inHeiVal = ref(0);
let innerWidth, // 内宽
  innerHeight, // 内高
  svg,
  treeHeight; // 树高
// props.defaultWidth = 1999, // 默认展示宽度
// props.defaultHeight = 750; // 默认展示高度
const svgClass = ref('');
onMounted(() => {
  svgClass.value = `svg-${props.index}`;
  mouseMove();
});
function mouseMove() {
  const showBox = document.querySelector('.svg-show-box');
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
const showData = ref(_.cloneDeep(props.data));
watch(
  () => props.data,
  (val) => {
    showData.value = _.cloneDeep(val);
    if (val.children) {
      nextTick(() => {
        init();
      });
    }
  },
  { immediate: true, deep: true },
);
watch(
  () => props.hideAll,
  (val) => {
    if (val) {
      nextTick(() => {
        showMain();
        init();
      });
    }
  },
  { immediate: true, deep: true },
);
const nodeIdList = computed(() => {
  return nodeInfo.value.map((i) => i.node_id);
});
watch(
  () => nodeIdList.value,
  (val) => {
    if (val && val.length > 0 && props.canClick) {
      addActive(val);
    }
  },
);
function showMain() {
  for (let i = 0; i < showData.value.children.length; i++) {
    hideAllChildren(showData.value.children[i]);
  }
}
// 节点背景颜色
function rectColor(d) {
  return d.position === 'center' || d.data.counterpart ? '#3B78F2' : '#142847';
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
  top: 70,
  right: 30,
  bottom: 33,
  left: 30,
};
const midValue = 300; // left 和right 相距距离
let sameData = {
  name: '相同节点',
  children: [],
};
// let multiple = 1,
//   heightMultiple = 1, // 屏高系数
//   widthMultiple = 1; // 屏宽系数
// 初始化
function init() {
  let multiple = 1,
    heightMultiple = 1, // 屏高系数
    widthMultiple = 1; // 屏宽系数
  treeHeight = d3.hierarchy(showData.value).height;
  const treeWidth = getTreeMax(showData.value.children);
  // if (treeHeight > 3) {
  //   heightMultiple = treeHeight / 2 + 2 / 2;
  // }
  if (treeHeight > 4) {
    heightMultiple = treeHeight / 3 + 2 / 2;
  }
  if (treeWidth > 10) {
    widthMultiple = treeWidth / 11;
  }

  multiple = Math.max(widthMultiple, heightMultiple);
  svg = d3.select(`.svg-${props.index}`);
  if (svg.select('.chart-g')) {
    svg.selectAll('.chart-g').remove();
  }
  let width = props.defaultWidth;
  let height = props.defaultHeight;
  if (multiple !== 1) {
    width = width * heightMultiple;
    height = height * widthMultiple;
  }
  svg.attr('width', width + 'px').attr('height', height + 'px');
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
  inWidVal.value = innerWidth;
  inHeiVal.value = innerHeight;
  // rootX.value = innerWidth / 2 - 10;

  if (state.getters.showFirstTime) {
    // 第一次展示最多展示七层
    const fristRoot = d3.hierarchy(showData.value);
    hideChildrenOnFirst(fristRoot, 5);
    if (multiple !== 1) {
      // 设置窗口展示位置
      // const left = ((multiple - 1) / 2) * (props.defaultWidth - margin.left - margin.right);
      const left = multiple > 1 ? (innerWidth + margin.left) / 2 - props.defaultWidth / 2 : 0;
      const top = multiple > 1 ? innerHeight / 4 - 400 : 0;
      document.querySelector('.svg-show-box').scrollTop = top; //通过scrollTop设置滚动到100位置
      document.querySelector('.svg-show-box').scrollLeft = left; //通过scrollTop设置滚动到200位置
    }
    state.commit('atlasMap/SET_SHOW_FIRST_TIME', false);
  }
  if (showData.value.children[0]) {
    const option = {
      data: showData.value.children[0], // 树状图数据，
      position: 'left', //  位置：left、right、bottom
      rootNode: {
        // 根节点固定初始坐标
        x: innerHeight / 4,
        y: 0,
      },
    };
    render(option);
  }
  if (showData.value.children[1]) {
    const option = {
      data: showData.value.children[1],
      position: 'right',
      rootNode: {
        x: innerHeight / 4,
        y: 0,
      },
    };
    // console.log('right');
    render(option);
    let data = {
      name: showData.value.name,
      children: [
        {
          name: showData.value.children[0].name,
        },
        {
          name: '相同节点',
        },
        {
          name: showData.value.children[1].name,
        },
      ],
    };
    if (showData.value.children[2] && showData.value.children[2].children) {
      sameData.children = showData.value.children[2].children;
      const optionSame = {
        data: showData.value.children[2],
        position: 'center',
        rootNode: {
          x: innerWidth / 4,
          y: 0,
        },
      };
      render(optionSame);
    }
    // renderSame(sameData);
    const optionRoot = {
      data: data,
      rootNode: {
        x: midValue / 2,
        y: multiple > 1 ? data.children[0].y - 200 : 30,
      },
    };
    renderRoot(optionRoot);
  }

  // addActive(nodeInfo.value.node_id); // 加当前节点效果
}
const gSvg = reactive({
  left: '',
  right: '',
  center: '',
});

/**
 * 画左右下树状图
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
  gSvg[position] = g; // 将不同朝向的树记录好
  let root = d3.hierarchy(data);
  // if (position === 'center') {
  //   let heightMultiple = 1,
  //     widthMultiple = 1;
  //   const treeHeight = data.height;
  //   const treeWidth = getTreeMax(data.children);
  //   console.log('treeHeight', treeHeight);
  //   if (treeHeight > 3) {
  //     heightMultiple = treeHeight / 2 + 2 / 2;
  //   }
  //   if (treeWidth > 9) {
  //     widthMultiple = treeWidth / 10;
  //   }
  //   console.log(heightMultiple, widthMultiple);
  // }
  const regionSize = {
    left: [(innerHeight * 2) / 3, innerWidth / 4], // f(w/2 - y, x)
    right: [(innerHeight * 2) / 3, innerWidth / 4], // f(w/2 + y, x)
    center: [innerWidth / 2, (innerHeight * 4) / 8], // f(x + w/4, y + h*3/8)
  };
  root = d3.tree().size(regionSize[position])(root);
  if (showData.value.children.length > 1) {
    root.x = rootNode.x; // 设置根节点初始位置
    root.y = rootNode.y;
  }
  const node = root.descendants(); // x: 181.75 y: 0
  nodes[position] = node;
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
          ? y + innerWidth / 4
          : position === 'right'
          ? innerWidth / 2 + y + midValue / 2
          : innerWidth / 2 - y - midValue / 2;
      }
      function mathY(x) {
        // 计算点的x的实际坐标
        return position === 'center' ? x + innerHeight / 4 : x;
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
              position,
            ); // 计算短路径
      if (position !== 'center' && !d.source.parent && showData.value.children.length === 2) {
        // 左右侧根节点
        x4 = x1;
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
    .attr('fill', (d) => rectColor({ ...d, position }))
    .attr('stroke', '#3B78F2')
    .attr('stroke-width', 2)
    .attr('rx', 4)
    .attr('x', (d) => {
      return position === 'center'
        ? d.x - nodeOption2.width(d.data.name) / 2 + innerWidth / 4
        : position === 'right'
        ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2 //
        : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
    })
    .attr('y', (d) =>
      position === 'center' ? d.y - nodeOption2.height / 2 + innerHeight / 4 : d.x - nodeOption.width / 2,
    )
    .attr('opacity', (d) => {
      return d.data.hide === true ||
        (position === 'center' ? d.depth === 0 : d.depth === 0 && showData.value.children.length >= 2)
        ? 0
        : 1;
    });
  // 文字
  g.selectAll('text')
    .data(node)
    .join('text')
    .on('click', (e, d) => {
      // console.log(e.target.__data__); // 点击的节点
      // // 节点为虚拟节点不进行响应
      // if (d.data.node_id.every((i) => i === '-1')) {
      //   return;
      // }
      if (props.canClick) {
        let info = [];
        // console.log(d.data.counterpart);
        if (d.data.counterpart) {
          if (position === 'left') {
            const nodeData = findNodeById('right', d.data.counterpart);
            if (nodeData) {
              info = [d.data, nodeData];
            } else {
              info = [d.data];
            }
          } else {
            const nodeData = findNodeById('left', d.data.counterpart);
            if (nodeData) {
              info = [nodeData, d.data];
            } else {
              info = [d.data];
            }
          }
        } else {
          info = [d.data];
        }
        state.commit('atlasMap/SET_COMPERE_NODE_INFO', info);
        // console.log(position, nodes[position]);
        const { url, video_url, scriptCollectName, scriptName } = d.data.meta || {};
        const data = { url, video_url, scriptCollectName, scriptName, topicPattern: 'TWIN' };
        // console.log(data);
        changeToggle(data);
        return;
      }
      let nodeNames = [];

      if (position === 'center') {
        nodeNames = d.data.node_name;
      }
      if (d.data.counterpart) {
        if (position === 'left') {
          nodeNames = [d.data.node_name];
          const nodeName = findNodeNameById('right', d.data.counterpart);
          if (nodeName) {
            nodeNames.push(nodeName);
          }
        } else {
          const nodeName = findNodeNameById('left', d.data.counterpart);
          if (nodeName) {
            nodeNames.push(nodeName);
          }
          nodeNames.push(d.data.node_name);
        }
      }
      // console.log('info', info);
      // if (info.length === 2) {
      //   info[0].children = [];
      //   info[1].children = [];
      // }
      emit('clickOne', { ...d, position, nodeNames });
    })
    .attr('text-anchor', 'middle') // 位置
    .attr('x', (d) =>
      position === 'center'
        ? d.x + innerWidth / 4
        : position === 'right'
        ? innerWidth / 2 + d.y + midValue / 2
        : innerWidth / 2 - d.y - midValue / 2,
    )
    .attr('y', (d) => (position === 'center' ? d.y + 6 + innerHeight / 4 : d.x + 6))
    .text((d) => d.data.name)
    .style('font-size', '18px')
    .style('font-family', 'YouSheBiaoTiHei')
    .attr('opacity', (d) => {
      return d.data.hide === true ||
        (position === 'center' ? d.depth === 0 : d.depth === 0 && showData.value.children.length >= 2)
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
        let positionX;
        if (showData.value && showData.value.children.length > 1 && d.depth === 0) {
          switch (position) {
            case 'center':
              positionX = d.x + innerWidth / 4 - 55;
              break;
            case 'left':
              positionX = innerWidth / 2 - midValue / 2 - 75;
              break;
            case 'right':
              positionX = innerWidth / 2 + midValue / 2 - 55;
              break;
          }
        } else {
          positionX =
            position === 'center'
              ? d.x - nodeOption2.width(d.data.name) / 2 + innerWidth / 4
              : position === 'right'
              ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
              : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
        }
        return positionX;
      }
      function mathY() {
        return position === 'center'
          ? d.y - nodeOption2.height / 2 + innerHeight / 4 - 16
          : d.x - nodeOption.width / 2 - 16;
      }
      return `translate(${mathX()}, ${mathY()})`;
    })
    .on('click', (e, d) => {
      // console.log(e.offsetX, e.offsetY);
      moveTo(e);
      showChildrenNode(d);
      init();
      nextTick(() => {
        addActive(nodeIdList.value);
      });
    })
    .attr('opacity', (d) => {
      // return d.data.hide === true || (d.depth === 0 && showData.value.children.length >= 2) || !d.data.children ? 0 : 1;
      return d.data.hide === true || !d.data.children ? 0 : 1;
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
        if (showData.value && showData.value.children.length > 1 && d.depth === 0) {
          switch (position) {
            case 'center':
              positionX = d.x + innerWidth / 4 - 55;
              break;
            case 'left':
              positionX = innerWidth / 2 - midValue / 2 - 75;
              break;
            case 'right':
              positionX = innerWidth / 2 + midValue / 2 - 55;
              break;
          }
        } else {
          positionX =
            position === 'center'
              ? d.x - nodeOption2.width(d.data.name) / 2 + innerWidth / 4
              : position === 'right'
              ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
              : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
        }
        return positionX;
        // return position === 'center'
        //   ? d.x - nodeOption2.width(d.data.name) / 2 + innerWidth / 4
        //   : position === 'right'
        //   ? innerWidth / 2 + d.y - nodeOption.height(d.data.name) / 2 + midValue / 2
        //   : innerWidth / 2 - (d.y + nodeOption.height(d.data.name) / 2) - midValue / 2;
      }
      function mathY() {
        return position === 'center'
          ? d.y - nodeOption2.height / 2 + innerHeight / 4 - 16
          : d.x - nodeOption.width / 2 - 16;
      }
      return `translate(${mathX() + 16}, ${mathY()})`;
    })
    .on('click', (e, d) => {
      moveTo(e);
      hideChildrenNode(d);
      init();
      nextTick(() => {
        addActive(nodeIdList.value);
      });
    })
    .attr('opacity', (d) => {
      return d.data.hide === true || !d.data.children ? 0 : 1;
    });
}
// 画布移动到某一位置
function moveTo(e) {
  const top = e.offsetY - props.defaultHeight / 2;
  const left = e.offsetX - props.defaultWidth / 2;
  const obj = document.querySelector('.svg-show-box');
  if (Math.abs(top) > 5) {
    animateY(obj, Math.ceil(top));
  }
  if (Math.abs(left) > 5) {
    animateX(obj, Math.ceil(left));
  }
}
// 画根树状图
function renderRoot(option) {
  const { data, rootNode } = option;
  const formula = innerWidth / 2 - (midValue * 1.6) / 2; // 公式
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('class', 'chart-g');
  let root = d3.hierarchy(data);
  // x:242.375 y: 0
  // (x: 80.79166666666667 y: 181.75)  (x: 242.375 y: 181.75) ( 403.95833333333337 y: 181.75)
  root = d3.tree().size([midValue * 1.6, innerHeight / 4])(root);
  root.x = rootNode.x * 1.6; // 242.375;
  root.y = root.children[0].y - 200;
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
    .attr('d', (d) => {
      function mathX(x) {
        // 计算点的x的实际坐标
        return x + formula;
      }
      const x1 = mathX(d.source.x);
      const y1 = d.source.y;
      const x2 = mathX(d.target.x);
      const y2 = d.target.y;
      return `
        M${x1},${y1}
        ${x2},${y2}`;
    });
  // 画节点图标
  g.append('g')
    .attr('class', 'logo-svg')
    .selectAll('g')
    .data(node)
    .join('g')
    .html((d) => svgLogo(d))
    .attr('transform', (d) => {
      // if (d.x === 403.95833333333337) {
      //   return `translate(${d.x + formula}, ${d.y - nodeOption2.height})`;
      // }
      // return `translate(${d.x - nodeOption2.width(d.data.name) / 2 + formula}, ${d.y - nodeOption2.height})`;
      return `translate(${d.x + formula - 30}, ${d.y - nodeOption2.height})`;
    });
  // 文字
  g.selectAll('text')
    .data(node)
    .join('text')
    .on('click', (d) => {
      // console.log(d.target.__data__); // 点击的节点
      // console.log('点击了,深度为：' + d.target.__data__.depth);
      if (d.target.__data__.depth) {
        console.log('需要展示啦！');
      }
    })
    // .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .attr('text-anchor', 'middle') // 位置
    .attr('x', (d) => d.x + formula)
    .attr('y', (d) => (d.children ? d.y - 40 : d.y + 66))
    .text((d) => d.data.name)
    .style('font-size', (d) => (d.children ? '24px' : '18px'))
    .style('font-weight', (d) => (d.children ? '800' : '400'))
    .attr('fill', 'white');
  // .attr('writing-mode', 'vertical-rl') // 文本竖过来
  // .attr('text-orientation', 'upright');
}
// 给当前显示元素加选中色;
function addActive(data) {
  // console.log('给当前显示元素加选中色');
  if (!gSvg.left && !gSvg.center && !gSvg.right) {
    console.log('没东西');
    return;
  }
  Object.keys(gSvg).map((i) => {
    const allRect = gSvg[i].selectAll('.rect-box');
    let activeIndex = [];
    allRect.nodes().forEach((i, index) => {
      if (data instanceof Array && data.findIndex((value) => value === i.__data__.data.node_id) !== -1) {
        activeIndex.push(index);
      }
    });
    const nodes = allRect.nodes();
    nodes.forEach((i) => {
      i.setAttribute('filter', '');
      i.setAttribute('stroke', '#3B78F2');
    });
    activeIndex.forEach((i) => {
      nodes[i].setAttribute('filter', 'url(#dropShadow2)');
      nodes[activeIndex].setAttribute('stroke', 'white');
    });
  });
}
function findNodeNameById(position, id) {
  const index = nodes[position].findIndex((i) => {
    return i.data.node_id == id;
  });
  if (index === -1) {
    return;
  }
  return nodes[position][index].data.node_name;
}
function findNodeById(position, id) {
  const index = nodes[position].findIndex((i) => {
    return i.data.node_id == id;
  });
  if (index === -1) {
    return;
  }
  return nodes[position][index].data;
}
</script>

<style lang="scss" scoped>
.svg-show-box {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  overflow: scroll;
  .svg-box {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>
<style lang="scss">
.rect {
  position: relative;
  //fill: pink !important;
}
.rect-box:hover {
  box-shadow: 0px 0px 20px 0px #1d4d8d;
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
