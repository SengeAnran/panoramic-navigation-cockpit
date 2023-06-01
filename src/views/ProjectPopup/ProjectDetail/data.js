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
