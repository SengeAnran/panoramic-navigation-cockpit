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

// 对接口数据初始化树属性
export function initNodeTree(arr) {
  function allChildren(node) {
    node.name = node.node_name;
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        // node.children[i].name = node.children[i].node_name;
        allChildren(node.children[i]);
      }
    }
    return;
  }
  arr.forEach((item) => {
    allChildren(item);
    item.check = false;
  });
  return;
}
