function roundDatas(num) {
  const datas = [];
  for (let i = 0; i < num; i++) {
    datas.push({
      name: 'circle' + i,
    });
  }
  return datas;
}
export function getOption(data) {
  const { firstLevelData = [], secondLevelData = [], thirdLevelData = [] } = data;
  const option = {
    animationDurationUpdate: 1500,
    roam: true, //鼠标缩放及平移
    focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
    series: [
      {
        type: 'graph',
        tooltip: {},
        ribbonType: true,
        layout: 'circular', //'circular' 采用环形布局 'force' 采用力引导布局
        hoverAnimation: true,
        layoutAnimation: true,
        width: '0%',
        height: '0%',
        // circular: { //环形布局相关配置
        //   rotateLabel: true, //是否旋转标签，默认不旋转
        // },// 节点标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。

        symbolSize: 48,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inside',
              opacity: 1,
              color: '#fff',
              fontSize: 9,
            },
            borderWidth: 1,
            borderColor: '#fff',
            color: '#E89D42',
          },
          emphasis: {},
        },
        data: firstLevelData,
      },
      {
        type: 'graph',
        tooltip: {},
        // ribbonType: true,
        layout: 'circular',
        hoverAnimation: true,
        layoutAnimation: true,
        width: '25%',
        height: '25%',
        circular: {
          rotateLabel: true,
        },
        symbolSize: 1,
        data: roundDatas(300),
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            color: '#407FD1',
          },
          emphasis: {
            label: {
              show: false,
            },
          },
        },
      },
      {
        type: 'graph',
        tooltip: {},
        ribbonType: true,
        layout: 'circular',
        width: '25%',
        height: '25%',
        symbolSize: 36,
        startAngle: 0,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inside',
              opacity: 1,
              color: '#fff',
              fontSize: 8,
            },
            border: 'none',
            borderWidth: 1,
            borderColor: '#fff',
            color: '#407FD1',
            symbolSize: 36,
            value: 25,
          },
        },
        data: secondLevelData,
      },
      {
        type: 'graph',
        tooltip: {},
        // ribbonType: true,
        layout: 'circular',
        hoverAnimation: true,
        layoutAnimation: true,
        width: '85%',
        height: '85%',
        circular: {
          rotateLabel: true,
        },
        symbolSize: 1,
        data: roundDatas(300),
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            color: '#84CC1C',
          },
          emphasis: {
            label: {
              show: false,
            },
          },
        },
      },
      {
        type: 'graph',
        tooltip: {},
        ribbonType: true,
        layout: 'circular',
        width: '85%',
        height: '85%',
        symbolSize: 41,
        startAngle: 0,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inside',
              opacity: 1,
              color: '#fff',
              fontSize: 9,
            },
            border: 'none',
            borderWidth: 1,
            borderColor: '#fff',
            color: '#84CC1C',
            value: 25,
          },
        },
        data: thirdLevelData,
      },
      // {
      //   type: 'graph',
      //   tooltip: {},
      //   ribbonType: true,
      //   layout: 'circular',
      //   hoverAnimation: false,
      //   width: '85%',
      //   height: '85%',
      //   circular: {
      //     rotateLabel: true,
      //   },
      //   symbolSize: 1,
      //   data: roundDatas(300),
      //   itemStyle: {
      //     normal: {
      //       label: {
      //         show: false,
      //       },
      //       color: '#E16975',
      //     },
      //     emphasis: {
      //       label: {
      //         show: false,
      //       },
      //     },
      //   },
      // },
    ],
  };
  console.log('option', option);
  return option;
}
export function getOption2(data) {
  const { firstLevelData = [], secondLevelData = [], thirdLevelData = [], links = [] } = data;
  const option = {
    //使用直角坐标需要xAxis和yAxis
    xAxis: {
      // show: true,
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      minorTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      // show: true,
      type: 'value',
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      minorTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    //直角坐标系中的绘图网格
    grid: {
      top: '1%',
      bottom: '0%',
      left: '0%',
      right: '13%',
    },
    // //提示框样式
    // tooltip: {
    //   formatter: '{b}'//字符串模板：{c}:数据值
    // },
    series: [
      {
        type: 'graph',
        layout: 'none', //图的布局（none不采用任何布局）
        focusNodeAdjacency: true, // 鼠标悬浮到某节点，则此节点以及其所有邻接节点高亮
        roam: true, // 鼠标缩放和平移漫游
        symbolSize: [50, 50], //节点标记大小
        coordinateSystem: 'cartesian2d', //指定该系列使用的坐标系（直角坐标系需要添加xAxis和yAxis坐标）
        lineStyle: {
          //关系边的公用线条样式
          normal: {
            width: 3,
            shadowColor: 'none',
            color: '#FFFF00',
            type: 'solid',
          },
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: (params) => {
                // 兼容第4层节点重名情况
                return params.data.trueName || params.data.name;
              },
              position: 'inside',
              opacity: 1,
              color: '#fff',
              fontSize: 9,
            },
            borderWidth: 1,
            borderColor: '#fff',
            // color: '#E89D42',
          },
          emphasis: {},
        },
        label: {
          //图形上的文本标签
          show: true, //是否显示图形上的文本标签
        },
        //节点集合（节点的name不能重复）
        data: [...firstLevelData, ...secondLevelData, ...thirdLevelData],
        //线集合
        links: links,
      },
      {
        type: 'graph',
        // coordinateSystem: 'cartesian2d',
        tooltip: {},
        // ribbonType: true,
        layout: 'circular',
        hoverAnimation: true,
        layoutAnimation: true,
        width: '25%',
        height: '25%',
        circular: {
          rotateLabel: true,
        },
        symbolSize: 1,
        data: roundDatas(100),
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            color: '#407FD1',
          },
          emphasis: {
            label: {
              show: false,
            },
          },
        },
      },
      // {
      //   type: 'graph',
      //   // coordinateSystem: 'cartesian2d',
      //   tooltip: {},
      //   // ribbonType: true,
      //   layout: 'circular',
      //   hoverAnimation: true,
      //   layoutAnimation: true,
      //   width: '55%',
      //   height: '55%',
      //   circular: {
      //     rotateLabel: true,
      //   },
      //   symbolSize: 1,
      //   data: roundDatas(200),
      //   itemStyle: {
      //     normal: {
      //       label: {
      //         show: false,
      //       },
      //       color: '#84CC1C',
      //     },
      //     emphasis: {
      //       label: {
      //         show: false,
      //       },
      //     },
      //   },
      // },
      {
        type: 'graph',
        // coordinateSystem: 'cartesian2d',
        tooltip: {},
        ribbonType: true,
        layout: 'circular',
        hoverAnimation: false,
        width: '85%',
        height: '85%',
        circular: {
          rotateLabel: true,
        },
        symbolSize: 1,
        data: roundDatas(300),
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            color: '#84CC1C',
          },
          emphasis: {
            label: {
              show: false,
            },
          },
        },
      },
    ],
  };
  return option;
}
export function getOption3(dataObj) {
  const { nodes = [], links = [] } = dataObj;
  // console.log(dataObj);
  // const data = [
  //   {
  //     id: '0',
  //     name: 'Myriel',
  //     symbolSize: 19.12381,
  //     value: 28.685715,
  //     category: 0,
  //   },
  //   {
  //     id: '1',
  //     name: 'Napoleon',
  //     symbolSize: 2.6666666666666665,
  //     value: 4,
  //     category: 0,
  //   },
  //   {
  //     id: '2',
  //     name: 'MlleBaptistine',
  //     symbolSize: 6.323809333333333,
  //     value: 9.485714,
  //     category: 1,
  //   },
  // ];
  // const links = [
  //   {
  //     source: '1',
  //     target: '0',
  //   },
  //   {
  //     source: '2',
  //     target: '0',
  //   },
  // ];
  const categories = [
    {
      name: '类目0',
      itemStyle: {
        color: '#6481da',
      },
    },
    {
      name: '类目1',
      itemStyle: {
        color: '#46a779',
      },
    },
    {
      name: '类目2',
      itemStyle: {
        color: '#fac961',
      },
    },
    {
      name: '类目3',
      itemStyle: {
        color: '#da6868',
      },
    },
    {
      name: '类目4',
      itemStyle: {
        color: '#77c3e0',
      },
    },
    {
      name: '类目5',
      itemStyle: {
        color: '#607eda',
      },
    },
    {
      name: '类目6',
      itemStyle: {
        color: '#43a677',
      },
    },
    {
      name: '类目7',
      itemStyle: {
        color: '#efc05c',
      },
    },
    {
      name: '类目8',
      itemStyle: {
        color: '#da6868',
      },
    },
    {
      name: '类目9',
      itemStyle: {
        color: '#77c0dc',
      },
    },
    {
      name: '类目10',
    },
  ];
  const option = {
    // title: {
    //   // text: 'Les Miserables',
    //   subtext: 'Default layout',
    //   top: 'bottom',
    //   left: 'right',
    // },
    tooltip: {
      show: false,
    },
    legend: [
      {
        data: ['类目0', '类目1', '类目2', '类目3', '类目4', '类目5', '类目6', '类目7', '类目8', '类目9', '类目10'],
        show: false,
      },
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        roam: true,
        draggable: true,
        data: nodes,
        links: links,

        categories: categories,
        force: {
          repulsion: 1000,
        },
      },
    ],
  };
  return option;
}
