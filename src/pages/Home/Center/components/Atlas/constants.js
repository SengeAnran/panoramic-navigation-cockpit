import * as d3 from 'd3';
// 对接口数据初始化得到树(暂时不用)
export function getInitTree(data) {
  // console.log(data);
  return data.map((item) => {
    // 数据预处理（数据清理）
    let nodeDataList = item.group
      .filter((item) => item.relation_type === 'sub')
      .sort((a, b) => b.nodeA_id - b.nodeA_id);
    const nodeOne = [
      {
        nodeA_id: null,
        nodeB_id: 1,
        relation_type: 'sub',
        nodeA_name: '',
        nodeB_name: item.system,
      },
      {
        nodeA_id: 1,
        nodeB_id: nodeDataList[0].nodeA_id,
        relation_type: 'sub',
        nodeA_name: item.system,
        nodeB_name: nodeDataList[0].nodeA_name,
      },
    ];
    nodeDataList.splice(0, 0, ...nodeOne);
    nodeDataList = nodeDataList.map((item) => {
      return {
        name: item.nodeB_name,
        ...item,
      };
    });
    // console.log(nodeDataList);
    // 数据转换树结构
    const res = d3
      .stratify()
      .id(function (d) {
        return d.nodeB_id;
      })
      .parentId(function (d) {
        return d.nodeA_id;
      })(nodeDataList);
    // tree.children = tree
    // console.log(res);
    return res;
  });
}
// 相同节点树节点节点名称预处理
function getName(name) {
  let nodeName = name;
  nodeName = JSON.parse(nodeName)
    .map((i) => {
      return i.length > 5 ? i.slice(0, 4) + '..' : i;
    })
    .join('-');
  return nodeName;
}
// 对接口数据初始化树属性
export function initNodeTree(arr, noCheck, center = false) {
  function allChildren(node) {
    node.name = center ? getName(node.node_name) : node.node_name || '';
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        // node.children[i].name = node.children[i].node_name;
        allChildren(node.children[i]);
      }
    }
    return;
  }
  // if (typeof arr === '')
  if (Array.isArray(arr)) {
    // 传入数据为数组数据
    arr.forEach((item) => {
      allChildren(item);
      if (!noCheck) {
        item.check = false;
      }
    });
  } else {
    // 传入数据为树形对象
    allChildren(arr);
  }
  return;
}
