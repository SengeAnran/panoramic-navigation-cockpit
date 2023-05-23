<template>
  <div class="force" ref="chart"></div>
</template>

<script setup>
// import Mock from 'mockjs';
import * as echarts from 'echarts';
import { getOption, getOption2 } from './option';
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
const props = defineProps({
  atlas: {},
});
watch(
  () => props.atlas,
  (val) => {
    if (val) {
      nextTick(() => {
        initData();
        initChart();
      });
    }
  },
);
// import { dataObj } from './data';
const myChart = ref();
const chart = ref('');
const optionData = ref({
  // firstLevelData: [
  //   {
  //     name: '项目名称',
  //   },
  // ],
  // secondLevelData: [
  //   {
  //     name: '系统名称1',
  //   },
  //   {
  //     name: '系统名称2',
  //   },
  //   {
  //     name: '系统名称3',
  //   },
  //   {
  //     name: '系统名称4',
  //   },
  //   {
  //     name: '系统名称5',
  //   },
  // ],
  // thirdLevelData: [
  //   {
  //     name: '企业名称1',
  //     Flag: true, //true-牵头单位
  //     Type: 'institution', //institution-机构,enterprise-企业
  //   },
  //   {
  //     name: '企业名称2',
  //     Flag: false, //true-牵头单位
  //     Type: 'enterprise', //institution-机构,enterprise-企业
  //   },
  //   {
  //     name: '企业名称3',
  //     Flag: true, //true-牵头单位
  //     Type: 'enterprise', //institution-机构,enterprise-企业
  //   },
  //   {
  //     name: '企业名称4',
  //     Flag: false, //true-牵头单位
  //     Type: 'institution', //institution-机构,enterprise-企业
  //   },
  //   {
  //     name: '企业名称5',
  //     Flag: true, //true-牵头单位
  //     Type: 'enterprise', //institution-机构,enterprise-企业
  //   },
  // ],
  // fourthLevelData: [
  //   {
  //     name: '人物名称1',
  //     Flag: true, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   {
  //     name: '人物名称2',
  //     Flag: false, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   {
  //     name: '人物名称3',
  //     Flag: true, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   {
  //     name: '人物名称4',
  //     Flag: false, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   {
  //     name: '人物名称5',
  //     Flag: true, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   {
  //     name: '人物名称6',
  //     Flag: false, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   {
  //     name: '人物名称7',
  //     Flag: true, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   {
  //     name: '人物名称8',
  //     Flag: false, //是否课题负责人
  //     Type: 'character', //institution-人物
  //   },
  //   // {
  //   //   name: '人物名称9',
  //   // },
  //   // {
  //   //   name: '人物名称10',
  //   // },
  //   // {
  //   //   name: '人物名称11',
  //   // },
  //   // {
  //   //   name: '人物名称12',
  //   // },
  //   // {
  //   //   name: '人物名称13',
  //   // },
  //   // {
  //   //   name: '人物名称14',
  //   // },
  //   // {
  //   //   name: '人物名称15',
  //   // },
  //   // {
  //   //   name: '人物名称16',
  //   // },
  //   // {
  //   //   name: '人物名称17',
  //   // },
  //   // {
  //   //   name: '人物名称18',
  //   // },
  //   // {
  //   //   name: '人物名称19',
  //   // },
  //   // {
  //   //   name: '人物名称20',
  //   // },
  //   // {
  //   //   name: '人物名称21',
  //   // },
  //   // {
  //   //   name: '人物名称22',
  //   // },
  //   // {
  //   //   name: '人物名称23',
  //   // },
  //   // {
  //   //   name: '人物名称24',
  //   // },
  //   // {
  //   //   name: '人物名称25',
  //   // },
  //   // {
  //   //   name: '人物名称26',
  //   // },
  //   // {
  //   //   name: '人物名称27',
  //   // },
  //   // {
  //   //   name: '人物名称28',
  //   // },
  //   // {
  //   //   name: '人物名称29',
  //   // },
  //   // {
  //   //   name: '人物名称30',
  //   // },
  //   // {
  //   //   name: '人物名称31',
  //   // },
  //   // {
  //   //   name: '人物名称32',
  //   // },
  // ],
  // links: [
  //   {
  //     source: '项目名称', //边的源节点名称
  //     target: '系统名称1', //边的目标节点名称
  //   },
  //   {
  //     source: '项目名称', //边的源节点名称
  //     target: '系统名称2', //边的目标节点名称
  //   },
  //   {
  //     source: '项目名称', //边的源节点名称
  //     target: '系统名称3', //边的目标节点名称
  //   },
  //   {
  //     source: '项目名称',
  //     target: '系统名称4',
  //   },
  //   {
  //     source: '项目名称',
  //     target: '系统名称5',
  //   },
  //   {
  //     source: '系统名称5',
  //     target: '企业名称1',
  //   },
  //   {
  //     source: '系统名称5',
  //     target: '企业名称4',
  //   },
  //   {
  //     source: '系统名称5',
  //     target: '企业名称3',
  //   },
  //   {
  //     source: '系统名称5',
  //     target: '企业名称5',
  //   },
  //   {
  //     source: '系统名称4',
  //     target: '企业名称1',
  //   },
  //   {
  //     source: '系统名称4',
  //     target: '企业名称4',
  //   },
  //   {
  //     source: '系统名称4',
  //     target: '企业名称3',
  //   },
  //   {
  //     source: '系统名称4',
  //     target: '企业名称5',
  //   },
  //   {
  //     source: '系统名称1',
  //     target: '企业名称2',
  //   },
  //   {
  //     source: '系统名称2',
  //     target: '企业名称2',
  //   },
  //   {
  //     source: '系统名称3',
  //     target: '企业名称2',
  //   },
  //   {
  //     source: '企业名称1',
  //     target: '人物名称1',
  //   },
  //   {
  //     source: '企业名称5',
  //     target: '人物名称1',
  //   },
  //   {
  //     source: '企业名称1',
  //     target: '人物名称2',
  //   },
  //   {
  //     source: '企业名称2',
  //     target: '人物名称2',
  //   },
  //   {
  //     source: '企业名称2',
  //     target: '人物名称3',
  //   },
  //   {
  //     source: '企业名称3',
  //     target: '人物名称4',
  //   },
  //   {
  //     source: '企业名称3',
  //     target: '人物名称5',
  //   },
  //   {
  //     source: '企业名称4',
  //     target: '人物名称6',
  //   },
  //   {
  //     source: '企业名称4',
  //     target: '人物名称7',
  //   },
  //   {
  //     source: '企业名称5',
  //     target: '人物名称8',
  //   },
  // ],
});
const emit = defineEmits(['showDetail']);
function initChart() {
  myChart.value = echarts.init(chart.value);
  myChart.value.setOption(getOption(optionData.value));
  let model1 = myChart.value.getModel().getSeriesByIndex(0).getData()._itemLayouts;

  // let data1  = myChart.value.getOption().series[0].data;
  let model2 = myChart.value.getModel().getSeriesByIndex(2).getData()._itemLayouts;
  let model3 = myChart.value.getModel().getSeriesByIndex(4).getData()._itemLayouts;
  let model4 = myChart.value.getModel().getSeriesByIndex(6).getData()._itemLayouts;
  model1.forEach((i, index) => {
    optionData.value.firstLevelData[index].value = isNaN(i[0]) ? [286, 205] : i; // 兼容中心点坐标为空情况
    optionData.value.firstLevelData[index].itemStyle = {
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
      value: 25,
    };
    optionData.value.firstLevelData[index].symbolSize = 48;
  });
  model2.forEach((i, index) => {
    optionData.value.secondLevelData[index].value = i;
    optionData.value.secondLevelData[index].itemStyle = {
      label: {
        show: true,
        position: 'inside',
        opacity: 1,
        color: '#fff',
        fontSize: 8,
      },
      borderWidth: 1,
      borderColor: '#fff',
      color: '#407FD1',
      value: 25,
    };
    optionData.value.secondLevelData[index].symbolSize = 36;
  });
  model3.forEach((i, index) => {
    const item = optionData.value.thirdLevelData[index];
    item.value = i;
    item.symbolSize = item.Flag ? 50 : 41;
    item.itemStyle = {
      label: {
        show: true,
        position: 'inside',
        opacity: 1,
        color: '#fff',
        fontSize: 8,
      },
      borderWidth: 1,
      borderColor: '#fff',
      color: '#84CC1C',
      value: 25,
    };
  });
  model4.forEach((i, index) => {
    const item = optionData.value.fourthLevelData[index];
    item.value = i;
    item.symbolSize = item.Flag ? 50 : 40;
    item.itemStyle = {
      label: {
        show: true,
        position: 'inside',
        opacity: 1,
        color: '#fff',
        fontSize: 8,
      },
      borderWidth: 1,
      borderColor: '#fff',
      color: '#E16975',
    };
  });
  myChart.value.clear();
  console.log('optionData.value', optionData.value);
  myChart.value.setOption(getOption2(optionData.value));

  // 如果是vue中，在获取完坐标之后如果要对数据进行处理，最好使用:
  //   [dom].getOption().series[0].data
  myChart.value.on('click', (params) => {
    if (params.componentSubType === 'graph' && params.dataType === 'node') {
      emit('showDetail', params);
    }
  });
}
onBeforeUnmount(() => {
  if (myChart.value) {
    myChart.value.dispose();
    myChart.value = null;
  }
});
// let data = Mock.mock(dataObj);
// data = initData(data);
function initData() {
  let { firstLevelData, secondLevelData, thirdLevelData, fourthLevelData, links } = props.atlas;
  firstLevelData = [
    {
      name: firstLevelData.name,
    },
  ];
  secondLevelData = secondLevelData.map((i) => {
    return { name: i };
  });
  thirdLevelData = thirdLevelData.map((i) => {
    return {
      // ...i,
      nodeId: i.id,
      flag: i.flag,
      type: i.type,
      name: i.name,
    };
  });
  fourthLevelData = fourthLevelData.map((i) => {
    return {
      ...i,
      nodeId: i.id,
      name: i.name,
      type: 'character',
      id: undefined,
    };
  });
  links = links.map((i) => {
    return {
      source: i.source,
      target: i.target,
    };
  });
  // links = links.splice(4, 20);
  // console.log('处理好的数据', firstLevelData, secondLevelData, thirdLevelData, fourthLevelData, links);
  optionData.value = { firstLevelData, secondLevelData, thirdLevelData, fourthLevelData, links };
}
</script>

<style scoped>
.force {
  width: 100%;
  height: 100%;
}
</style>
