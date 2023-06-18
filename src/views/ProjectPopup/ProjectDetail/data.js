export const dataObj = {
  projectId: '项目id',
  projectName: '项目名称',
  LeadUnit: '牵头单位名称',
  LeadName: '负责人',
  Areas: ['地区1', '地区2'],
  Atlas: {
    FirstLevelData: {
      Name: '项目名称',
    },
    SecondLevelData: ['课题名称1', '课题名称2'],
    ThirdLevelData: [
      {
        Id: '单位Id',
        Name: '单位名称',
        Flag: true, //true-牵头单位
        Type: 'institution', //institution-机构,enterprise-企业
      },
    ],
    FourthLevelData: [
      {
        Id: '人才id',
        UnitName: '单位名称',
        Name: '人才名称1',
        Flag: true, //是否课题负责人
      },
    ],
    links: [
      {
        Source: '项目名称', //边的源节点名称
        Target: '课题名称1', //边的目标节点名称
      },
      {
        Source: '项目名称', //边的源节点名称
        Target: '课题名称2', //边的目标节点名称
      },
      {
        Source: '课题名称1', //边的源节点名称
        Target: '单位/机构名称1', //边的目标节点名称
      },
      {
        Source: '课题名称2', //边的源节点名称
        Target: '单位/机构名称2', //边的目标节点名称
      },
      {
        Source: '单位/机构名称1', //边的源节点名称
        Target: '人才名称1', //边的目标节点名称
      },
      {
        Source: '单位/机构名称1', //边的源节点名称
        Target: '人才名称2', //边的目标节点名称
      },
    ],
  },
};
export const optionData = {
  firstLevelData: [
    {
      name: '产业链',
    },
  ],
  secondLevelData: [
    {
      name: '感',
    },
    {
      name: '联',
    },
    {
      name: '知',
    },
    {
      name: '用',
    },
    {
      name: '融',
    },
  ],
  thirdLevelData: [
    { name: '物联网智能感知终端终端平台系统与应用验证', nodeId: 1801 },
    { name: '物联网终端评测平台关键技术研究及标准化', nodeId: 1802 },
    { name: '应用驱动的异质物联网系统互联平台架构关键技术研究及验证', nodeId: 1803 },
    { name: '物联网智能开放服务运行支撑系统', nodeId: 1804 },
    { name: '城市多尺度综合感知技术与体系', nodeId: 1805 },
    { name: '城市空间采集、建模与虚实融合动态仿真系统', nodeId: 1806 },
    { name: '城市多规数据融合与动态认知平台关键技术研究与示范', nodeId: 1807 },
    { name: '智慧城市的群体态势辨识与服务计算的基础理论及关键技术研究', nodeId: 1808 },
    { name: '城市地下基础设施运行综合监测关键技术研究与示范', nodeId: 1809 },
  ],
  links: [
    { source: '产业链', target: '感' },
    { source: '产业链', target: '联' },
    { source: '产业链', target: '知' },
    { source: '产业链', target: '用' },
    { source: '产业链', target: '融' },
    { source: '物联网智能感知终端终端平台系统与应用验证', target: '感' },
    { source: '物联网智能感知终端终端平台系统与应用验证', target: '知' },
    { source: '物联网智能感知终端终端平台系统与应用验证', target: '用' },
    { source: '物联网终端评测平台关键技术研究及标准化', target: '感' },
    { source: '物联网终端评测平台关键技术研究及标准化', target: '用' },
    { source: '应用驱动的异质物联网系统互联平台架构关键技术研究及验证', target: '联' },
    { source: '应用驱动的异质物联网系统互联平台架构关键技术研究及验证', target: '用' },
    { source: '应用驱动的异质物联网系统互联平台架构关键技术研究及验证', target: '融' },
    { source: '物联网智能开放服务运行支撑系统', target: '感' },
    { source: '物联网智能开放服务运行支撑系统', target: '融' },
    { source: '城市多尺度综合感知技术与体系', target: '知' },
    { source: '城市多尺度综合感知技术与体系', target: '用' },
    { source: '城市空间采集、建模与虚实融合动态仿真系统', target: '知' },
    { source: '城市空间采集、建模与虚实融合动态仿真系统', target: '用' },
    { source: '城市空间采集、建模与虚实融合动态仿真系统', target: '融' },
    { source: '城市多规数据融合与动态认知平台关键技术研究与示范', target: '知' },
    { source: '城市多规数据融合与动态认知平台关键技术研究与示范', target: '用' },
    { source: '城市多规数据融合与动态认知平台关键技术研究与示范', target: '融' },
    { source: '智慧城市的群体态势辨识与服务计算的基础理论及关键技术研究', target: '知' },
    { source: '智慧城市的群体态势辨识与服务计算的基础理论及关键技术研究', target: '用' },
    { source: '智慧城市的群体态势辨识与服务计算的基础理论及关键技术研究', target: '融' },
    { source: '城市地下基础设施运行综合监测关键技术研究与示范', target: '感' },
    { source: '城市地下基础设施运行综合监测关键技术研究与示范', target: '知' },
    { source: '城市地下基础设施运行综合监测关键技术研究与示范', target: '用' },
  ],
};
