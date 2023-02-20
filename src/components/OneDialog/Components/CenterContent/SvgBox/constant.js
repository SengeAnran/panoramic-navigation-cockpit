// 根树的svg图标
import * as d3 from 'd3';

export const svgLogo = `<g  data-name="图层 2">
    <g data-name="图层 1">
      <path class="cls-31" d="M14.17,61.84l-.08-38.78L40.72,8.14l.08,38.79Z"/>
      <path class="cls-32" d="M14.09,61.84.08,53.7,0,14.91l14,8.15Z"/>
      <path class="cls-33"
            d="M11,28.44,2.29,23.35l0-2.15L11,26.28Zm0,4.77L2.29,28.13l0-2.15L11,31.06Zm0,22.42L2.29,50.54l0-2.15L11,53.47ZM3.64,33.85l-1.36-.78V31.16l1.35.78ZM6.1,35.3l-1.36-.78v-1.9l1.36.78Zm2.46,1.4-1.35-.78,0-1.9,1.36.78ZM11,38.14l-1.35-.78,0-1.91,1.36.79Z"/>
      <path class="cls-34" d="M14.09,23.1,0,14.91,26.62,0l14,8.14Z"/>
      <path class="cls-31" d="M40,56.77v1.09c0,3.86,5.71,7,12.75,7s12.74-3.17,12.74-7V56.77Z"/>
      <path class="cls-34" d="M40,56.77c0,3.86,5.71,7,12.75,7s12.74-3.12,12.74-7-5.7-7-12.74-7S40,52.9,40,56.76Z"/>
      <path class="cls-32"
            d="M74.31,38.88a1.6,1.6,0,0,0-.79-1.38l-33-19.32a1.59,1.59,0,0,0-2.38,1.39l.08,24.6A1.54,1.54,0,0,0,39,45.54l10.68,6.25v4.5l3.36,2L53,53.75l19,11.07a1.58,1.58,0,0,0,2.16-.58,1.6,1.6,0,0,0,.21-.81Z"/>
      <path class="cls-34"
            d="M72.4,39.73a1.56,1.56,0,0,0-.8-1.37l-33-19.31a1.58,1.58,0,0,0-2.16.58,1.66,1.66,0,0,0-.21.81l0,24.62A1.57,1.57,0,0,0,37,46.43l12.22,7.12v2.51l3.36,2V55.52l17.44,10.2a1.6,1.6,0,0,0,2.16-.58,1.67,1.67,0,0,0,.21-.82Z"/>
      <path class="cls-33"
            d="M68.26,62.45,39,45.35a1.42,1.42,0,0,1-.7-1.22l-.06-20.56a1.41,1.41,0,0,1,1.42-1.42,1.38,1.38,0,0,1,.71.19l29.25,17.1a1.43,1.43,0,0,1,.73,1.23l.06,20.56A1.43,1.43,0,0,1,69,62.66,1.38,1.38,0,0,1,68.26,62.45Z"/>
      <path class="cls-32" d="M21.75,65.94l21.4,12.48V80L21.75,67.49V65.94Z"/>
      <path class="cls-31" d="M52.52,73l-9.37,5.39V80l9.37-5.47Z"/>
      <path class="cls-34" d="M52.52,73,31,60.74,21.75,66l21.4,12.44Z"/>
      <path class="cls-33" d="M48.43,72.32,31.62,62.74l-.72.51L47.63,73Z"/>
    </g>
  </g>`;
// 加减svg图
export const svgAddReduce = {
  add: `<path fill-rule="evenodd"  stroke="rgb(59, 120, 242)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter" fill="rgb(3, 21, 44)"
 d="M2.500,0.500 L10.500,0.500 C11.605,0.500 12.500,1.395 12.500,2.500 L12.500,10.500 C12.500,11.605 11.605,12.500 10.500,12.500 L2.500,12.500 C1.396,12.500 0.500,11.605 0.500,10.500 L0.500,2.500 C0.500,1.395 1.396,0.500 2.500,0.500 Z"/>
<path fill-rule="evenodd"  fill="rgb(59, 120, 242)"
 d="M3.500,6.000 L9.500,6.000 C9.776,6.000 10.000,6.224 10.000,6.500 C10.000,6.776 9.776,7.000 9.500,7.000 L3.500,7.000 C3.224,7.000 3.000,6.776 3.000,6.500 C3.000,6.224 3.224,6.000 3.500,6.000 Z"/>
<path fill-rule="evenodd"  fill="rgb(59, 120, 242)"
 d="M6.500,3.000 C6.776,3.000 7.000,3.224 7.000,3.500 L7.000,9.500 C7.000,9.776 6.776,10.000 6.500,10.000 C6.224,10.000 6.000,9.776 6.000,9.500 L6.000,3.500 C6.000,3.224 6.224,3.000 6.500,3.000 Z"/>`,
  reduce: `<path fill-rule="evenodd"  stroke="rgb(59, 120, 242)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter" fill="rgb(3, 21, 44)"
 d="M2.500,0.500 L10.500,0.500 C11.605,0.500 12.500,1.395 12.500,2.500 L12.500,10.500 C12.500,11.605 11.605,12.500 10.500,12.500 L2.500,12.500 C1.395,12.500 0.500,11.605 0.500,10.500 L0.500,2.500 C0.500,1.395 1.395,0.500 2.500,0.500 Z"/>
<path fill-rule="evenodd"  fill="rgb(59, 120, 242)"
 d="M4.000,6.000 L9.000,6.000 C9.276,6.000 9.500,6.224 9.500,6.500 C9.500,6.776 9.276,7.000 9.000,7.000 L4.000,7.000 C3.724,7.000 3.500,6.776 3.500,6.500 C3.500,6.224 3.724,6.000 4.000,6.000 Z"/>`,
};
// 计算节点间链接线点位
export function mathMidPoints(x1, y1, x2, y2, h, sw, tw) {
  let x3, y3, x4, y4;
  if (y2 === y1 || Math.abs(y2 - y1) < 0.001) {
    y3 = y1;
    y4 = y1;
    const min = Math.min(x1, x2);
    const max = Math.max(x1, x2);
    if (x1 - x2 >= 0) {
      // x3 = min + sw / 2;
      // x4 = max - tw / 2;
    }
    x3 = min + sw / 2;
    x4 = max - tw / 2;
  } else {
    // x3 = ((x2 - x1) * h) / (y1 - y2) + x1;
    // y3 = y1 - h;
    // x4 = x2 - x3 + x1;
    // y4 = y2 + h;
    if (y2 - y1 <= 0) {
      y3 = y1 - h;
      // x4 = x2 - x3 + x1;
      // x3 = ((x2 - x1) * h) / (y1 - y2) + x1;
      x4 = x2;
      x3 = x1;
      y4 = y2 + h;
    } else {
      y3 = y1 + h;
      // x4 = x2 - (h * (x2 - x1)) / (y2 - y1);
      x4 = x2;
      // x3 = x1 + (x2 - x4);
      x3 = x1;
      y4 = y2 - h;
    }
  }
  return { x3, y3, x4, y4 };
}
// 隐藏所有节点
export function hideAllChildren(node) {
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      node.children[i].hide = true;
      hideAllChildren(node.children[i]);
    }
  }
  return;
}
// 隐藏所有后代节点
export function hideChildrenNode(node) {
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      node.children[i].data.hide = true;
      hideChildrenNode(node.children[i]);
    }
  }
  return;
}
// 展示所有子节点
export function showChildrenNode(node) {
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      node.children[i].data.hide = false;
    }
  }
  return;
}
// 第一次加载树形图时最多展示depth层（多的隐藏）
export function hideChildrenOnFirst(node, depth) {
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].depth > depth) {
        node.children[i].data.hide = true;
      }
      hideChildrenOnFirst(node.children[i], depth);
    }
  }
  return;
}
// 展示列表树的初始化，只显示5层多的去除
// 第一次加载树形图时最多展示depth层（多的隐藏）
export function delChildrenOnFirst(node, depth) {
  const height = 0;
  function goChildren(node, height) {
    height++;
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (height === depth) {
          node.children = [];
          return;
        }
        goChildren(node.children[i], height);
      }
    }
    return;
  }
  goChildren(node, height);
  return node;
}
export function getRootInfo(node) {
  console.log(node);
  let currentNode = node;
  while (currentNode.parent !== null) {
    currentNode = currentNode.parent;
  }
  return currentNode.data;
}
export const mainTreeLocation = {
  root: {
    x: '',
    y: '',
  },
  left: {
    x: 181.75,
    y: 0,
  },
  center: {
    x: 323.1666666666667,
    y: 0,
  },
  right: {
    x: 181.75,
    y: 0,
  },
};
export function animateX(obj, target, recall) {
  // obj 对象 ，target目标位置， recall ？ 回调函数
  //  当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多定时器
  // 解决方案就是 让我们元素只有一个定时器执行
  clearInterval(obj.timer);
  const targetValue = target > 0 ? target : 0; //  兼容实际距离中轴左右侧
  let proValue;
  obj.timer = setInterval(function () {
    // 给不同的对象指定不同的定时器
    if (obj.scrollLeft === targetValue) {
      recall && recall(); // 有回调则执行
      clearInterval(obj.timer); // 停止动画，
    }
    const step =
      targetValue - obj.scrollLeft >= 0
        ? Math.ceil((targetValue - obj.scrollLeft) / 10)
        : Math.floor((targetValue - obj.scrollLeft) / 10);
    // 兼容正走倒走
    obj.scrollLeft = Math.floor(obj.scrollLeft + step);
    if (obj.scrollLeft === proValue) {
      recall && recall(); // 有回调则执行
      clearInterval(obj.timer); // 停止动画，
    }
    proValue = obj.scrollLeft;
    // console.log(obj.scrollLeft, targetValue);
  }, 30);
}
export function animateY(obj, target, recall) {
  // obj 对象 ，target目标位置， recall ？ 回调函数
  //  当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多定时器
  // 解决方案就是 让我们元素只有一个定时器执行
  clearInterval(obj.timer2);
  let proValue;
  const targetValue = target > 0 ? target : 0; //  兼容左右侧
  obj.timer2 = setInterval(function () {
    // 给不同的对象指定不同的定时器
    if (obj.scrollTop === targetValue) {
      recall && recall(); // 有回调则执行
      clearInterval(obj.timer2); // 停止动画，
    }
    const step =
      targetValue - obj.scrollTop >= 0
        ? Math.ceil((targetValue - obj.scrollTop) / 10)
        : Math.floor((targetValue - obj.scrollTop) / 10);
    // 兼容正走倒走
    obj.scrollTop = Math.floor(obj.scrollTop + step);
    if (obj.scrollTop === proValue) {
      // 不能移动了
      recall && recall(); // 有回调则执行
      clearInterval(obj.timer2); // 停止动画，
    }
    proValue = obj.scrollTop;
    // console.log(obj.scrollTop, targetValue);
    // console.log()
  }, 30);
}
// 获取树的最大宽度
export function getTreeMax(data) {
  const num = [];
  const tree = d3.hierarchy(data);
  num.push(tree.count().value);
  return Math.max(...num);
}

// 获取树的最大宽度
export function lookViewNode(data, url) {
  console.log('lookViewNode', data, url);
  return lookNodeByUrl(data, url);
}
// 第一次加载树形图时最多展示depth层（多的隐藏）
export function lookNodeByUrl(nodes, url) {
  let res;
  nodes.forEach((i) => {
    let urlArr = [];
    if (i.data.meta && i.data.meta.url) {
      if (!(i.data.meta.url instanceof Array)) {
        urlArr = [i.data.meta.url];
      } else {
        urlArr = i.data.meta.url;
      }
      // console.log(urlArr);
      urlArr.forEach((item) => {
        if (item === url) {
          res = i.data;
        }
      });
    }
  });

  return res;
}
