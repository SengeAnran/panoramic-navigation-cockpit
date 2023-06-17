export function getOption(dataname, value1) {
  // const dataname = [
  //   '高端装备制造产业',
  //   '新材料产业',
  //   '生物产业',
  //   '产业分布雷达',
  //   '新一代信息技术产业',
  //   '新能源汽车产业',
  //   '数字创意产业',
  //   '节能环保产业',
  // ];
  // // const datamax = [100, 100, 100, 100, 100, 100,100,100,100];
  // const value1 = [89, 93, 60, 59, 85, 91, 70, 65];
  // const num = 72;
  const max = Math.max(...value1);
  const indicator = [];
  for (let i = 0; i < dataname.length; i++) {
    indicator.push({
      name: dataname[i],
      max: max,
    });
  }
  const option = {
    backgroundColor: 'white',
    tooltip: {
      //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
      confine: true,
      enterable: true, //鼠标是否可以移动到tooltip区域内
      // formatter: function (name) {
      //   // const i = dataname.indexOf(name);
      //   console.log(name);
      //   return `{name|${name}}`;
      //   // return `{name1|${value1[i]}}\n{name3|${name}}`;
      // },
    },
    // title: {
    //   text: [`{span|${num}}`].join(''),
    //   bottom: 'center',
    //   left: 'center',
    //   textStyle: {
    //     rich: {
    //       span: {
    //         fontSize: 120,
    //         color: '#fff',
    //       },
    //     },
    //   },
    // },
    radar: {
      center: ['50%', '50%'],
      radius: '65%', // 表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
      splitArea: {
        //坐标轴在 grid 区域中的分隔区域，默认不显示。
        areaStyle: {
          color: ['#C3D6F6'],
        },
      },
      axisLine: {
        // 坐标轴轴线相关设置。
        show: true,
        lineStyle: {
          color: '#fff',
          // color: ['#EAEFFC'],
        },
      },
      splitLine: {
        // 坐标轴在 grid 区域中的分隔线。
        show: false,
        lineStyle: {
          color: '#ccc',
        },
      },
      name: {
        // show: true, // 是否显示工艺等文字
        // formatter: function (name) {
        //   // const i = dataname.indexOf(name);
        //   return `{name|${name}}`;
        //   // return `{name1|${value1[i]}}\n{name3|${name}}`;
        // },
        textStyle: {
          color: '#050303',
          fontSize: 12,
        },
        lineHeight: 13,
        // rich: {
        //   name: {
        //     color: '#050303',
        //     fontSize: 12,
        //     align: 'center',
        //   },
        //   // name2: {
        //   //     color: '#DFB48F',
        //   //     align: 'center',
        //   // },
        //   // name3: {
        //   //     color: '#606266',
        //   //     align: 'center',
        //   // },
        // },
      },
      indicator: indicator,
    },

    series: [
      {
        name: '产业分布雷达',
        type: 'radar',
        symbol: 'none',
        areaStyle: { normal: { color: '#7691F7' } },
        lineStyle: { width: 1, color: '#5188F4' },
        data: [value1],
      },
    ],
  };
  return option;
}

export function getForceOption(dataObj) {
  const { categories, data, links } = dataObj;
  categories.push({
    name: '产业',
  });

  // const categories = [
  //   {
  //     name: '学生',
  //   },
  //   {
  //     name: '运维',
  //   },
  //   {
  //     name: '测试',
  //     // itemStyle: {
  //     //   // 可配置颜色
  //     //   normal: {
  //     //     // color: 'blue',
  //     //     color: 'red',
  //     //     borderType: 'solid', // 图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
  //     //     borderColor: 'rgba(205, 149, 12, 0.4)', // 设置图形边框为淡金色,透明度为0.4
  //     //     borderWidth: 2, // 图形的描边线宽。为 0 时无描边。
  //     //     opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
  //     //   },
  //     // },
  //   },
  //   {
  //     name: '应用',
  //   },
  //   {
  //     name: '实施',
  //   },
  //   {
  //     name: '开发',
  //   },
  // ];
  // const data = [
  //   {
  //     name: '王小二',
  //     draggable: true, // 是否可以拖拽，默认false
  //     category: 0, // 这是种类，运维1测试2应用3实施4开发5
  //     number: 10, // 这是编号 非必须，目的仅为方便编写line
  //     symbolSize: 45, //图形大小
  //     showNum: 25, //节点需要显示的额外内容
  //   },
  //   {
  //     name: '运维1',
  //     number: 1,
  //     category: 1,
  //     draggable: true,
  //     symbolSize: 40,
  //     showNum: 35,
  //   },
  //   {
  //     name: '测试1',
  //     number: 2,
  //     category: 2,
  //     draggable: true,
  //     symbolSize: 45,
  //     showNum: 35,
  //   },
  //   {
  //     name: '应用1',
  //     number: 3,
  //     category: 3,
  //     draggable: true,
  //     symbolSize: 45,
  //     showNum: 35,
  //   },
  //   {
  //     name: '实施1',
  //     number: 4,
  //     category: 4,
  //     draggable: true,
  //     symbolSize: 45,
  //     showNum: 35,
  //   },
  //   {
  //     name: '开发1',
  //     number: 5,
  //     category: 5,
  //     draggable: true,
  //     symbolSize: 45,
  //     showNum: 35,
  //   },
  //   {
  //     name: 'JS',
  //     number: 6,
  //     category: 5,
  //     draggable: true,
  //     symbolSize: 35,
  //     showNum: 35,
  //   },
  //   {
  //     name: 'php',
  //     number: 7,
  //     category: 5,
  //     draggable: true,
  //     symbolSize: 20,
  //     showNum: 35,
  //   },
  //   {
  //     name: 'java',
  //     number: 8,
  //     category: 5,
  //     draggable: true,
  //     symbolSize: 45,
  //     showNum: 35,
  //   },
  // ];
  // const links = [
  //   // {
  //   //   source: '王小二', // 可以用name 可以用number，但name不能重名
  //   //   target: '运维1',
  //   // },
  //   {
  //     source: 0,
  //     target: 2,
  //   },
  //   {
  //     source: 0,
  //     target: 3,
  //   },
  //   {
  //     source: 0,
  //     target: 4,
  //   },
  //   {
  //     source: 0,
  //     target: 5,
  //   },
  //   {
  //     source: 5,
  //     target: 6,
  //   },
  //   {
  //     source: 6,
  //     target: 7,
  //   },
  //   {
  //     source: 6,
  //     target: 8,
  //   },
  // ];

  const option = {
    title: {
      text: '产业链定位',
      show: false,
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    legend: {
      x: 'center',
      show: true,
      data: categories.map((i) => i.name), // 此处不显示根节点学生
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        // symbolSize: function (size) {
        //   console.log(size);
        //   return size;
        // },
        // symbolSize: 50,
        focusNodeAdjacency: true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
        roam: true,
        categories: categories, // 节点分类的类目，可选
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
            formatter: function (node) {
              return node.data.trueName;
            },
          },
        },
        force: {
          repulsion: 1000,
        },
        tooltip: {
          formatter: function (node) {
            // 区分连线和节点，节点上额外显示其他数字
            if (!node.value) {
              return node.data.trueName;
            } else {
              return node.data.name + ':' + node.data.showNum;
            }
          },
        },
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0.3,
          },
        },
        data: data,
        links: links,
      },
    ],
  };
  return option;
}
export function getHotWordOption() {
  let datas = [
    {
      name: '雨伞',
      value: 30,
    },
    {
      name: '晴天',
      value: 28,
    },
    {
      name: '电话',
      value: 24,
    },
    {
      name: '手机',
      value: 23,
    },
    {
      name: '下雨',
      value: 22,
    },
    {
      name: '暴雨',
      value: 21,
    },
    {
      name: '多云',
      value: 20,
    },
    {
      name: '雨衣',
      value: 29,
    },
    {
      name: '屋檐',
      value: 28,
    },
    {
      name: '大风',
      value: 27,
    },
    {
      name: '台风',
      value: 26,
    },
    {
      name: '下雪',
      value: 25,
    },
    {
      name: '打雷',
      value: 24,
    },
    {
      name: '小雨',
      value: 30,
    },
    {
      name: '中雨',
      value: 18,
    },
    {
      name: '大雨',
      value: 14,
    },
    {
      name: '雷阵雨',
      value: 13,
    },
    {
      name: '下雪',
      value: 12,
    },
    {
      name: '小雪',
      value: 11,
    },
    {
      name: '中雪',
      value: 10,
    },
    {
      name: '大雪',
      value: 9,
    },
    {
      name: '暴雪',
      value: 8,
    },
    {
      name: '东风',
      value: 7,
    },
    {
      name: '南风',
      value: 6,
    },
    {
      name: '西北风',
      value: 5,
    },
    {
      name: '北风',
      value: 4,
    },
    {
      name: '闪电',
      value: 3,
    },
  ];
  datas = datas.map((i) => {
    return {
      ...i,
      textStyle: {
        color:
          'rgb(' +
          [
            Math.round(Math.random() * 200 + 55),
            Math.round(Math.random() * 200 + 55),
            Math.round(Math.random() * 200 + 55),
          ].join(',') +
          ')',
      },
    };
  });
  console.log(datas);
  const option = {
    tooltip: {
      show: true,
      position: 'top',
      textStyle: {
        fontSize: 30,
      },
    },
    series: [
      {
        type: 'wordCloud',
        // 网格大小，各项之间间距
        gridSize: 60,
        // 形状 circle 圆，cardioid  心， diamond 菱形，
        // triangle-forward 、triangle 三角，star五角星
        shape: 'circle',
        // 字体大小范围
        sizeRange: [20, 50],
        // 文字旋转角度范围
        rotationRange: [0, 0],
        // 旋转步值
        // rotationStep: 90,
        // 自定义图形
        // maskImage: maskImage,
        left: 'center',
        top: 'center',
        right: null,
        bottom: null,
        // 画布宽
        width: '90%',
        // 画布高
        height: '80%',
        // 是否渲染超出画布的文字
        drawOutOfBound: false,
        textStyle: {
          normal: {},
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#2ac',
          },
        },
        data: datas,
      },
    ],
  };
  return option;
}
