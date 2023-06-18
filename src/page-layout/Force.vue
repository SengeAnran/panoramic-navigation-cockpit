<template>
  <div class="force" ref="chart"></div>
</template>

<script setup>
// import Mock from 'mockjs';
import * as echarts from 'echarts';
import { optionDatas } from './data';
import { getOption, getOption2 } from './option';
import { onBeforeUnmount, ref, onMounted } from 'vue';
// import { dataObj } from './data';
const myChart = ref();
const chart = ref('');
const optionData = ref(optionDatas);
const emit = defineEmits(['showDetail']);
onMounted(() => {
  initChart();
  // initData();
});
function initChart() {
  myChart.value = echarts.init(chart.value);
  myChart.value.setOption(getOption(optionData.value));
  let model1 = myChart.value.getModel().getSeriesByIndex(0).getData()._itemLayouts;

  let model2 = myChart.value.getModel().getSeriesByIndex(2).getData()._itemLayouts;
  let model3 = myChart.value.getModel().getSeriesByIndex(4).getData()._itemLayouts;
  model1.forEach((i, index) => {
    const node = optionData.value.firstLevelData[index];
    node.value = isNaN(i[0]) ? [286, 205] : i; // 兼容中心点坐标为空情况
    node.symbolSize = 100;
    node.itemStyle = {
      borderWidth: 1,
      borderColor: '#fff',
      color: '#E89D42',
      // value: 25,
    };
    node.label = {
      show: true,
      position: 'inside',
      opacity: 1,
      color: '#fff',
      fontSize: 24,
    };
  });
  model2.forEach((i, index) => {
    const node = optionData.value.secondLevelData[index];
    node.value = i;
    node.itemStyle = {
      borderWidth: 1,
      borderColor: '#fff',
      color: '#407FD1',
      value: 25,
    };
    node.label = {
      show: true,
      position: 'inside',
      opacity: 1,
      color: '#fff',
      fontSize: 22,
    };
    node.symbolSize = 70;
  });
  model3.forEach((i, index) => {
    const item = optionData.value.thirdLevelData[index];
    item.value = i;
    item.symbolSize = 50;
    item.itemStyle = {
      label: {
        show: true,
        position: 'inside',
        opacity: 1,
        color: '#fff',
        fontSize: 22,
      },
      borderWidth: 1,
      borderColor: '#fff',
      color: '#84CC1C',
      value: 25,
    };
    item.label = {
      show: true,
      position: 'inside',
      opacity: 1,
      color: '#fff',
      fontSize: 22,
    };
  });
  myChart.value.clear();
  // console.log(optionData.value);
  myChart.value.setOption(getOption2(optionData.value));
  //
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
// function initData() {
//   let { firstLevelData, secondLevelData, thirdLevelData, links } = props.atlas;
//   thirdLevelData = thirdLevelData.map((i) => {
//     return {
//       // ...i,
//       nodeId: i.id,
//       flag: i.flag,
//       type: i.type,
//       name: i.name,
//     };
//   });
/*  // fourthLevelData = fourthLevelData.map((i) => {*/
/*  //   return {*/
/*  //     ...i,*/
/*  //     nodeId: i.id,*/
/*  //     name: i.unitName + i.name,*/
/*  //     trueName: i.name,*/
/*  //     type: 'character',*/
/*  //     id: undefined,*/
/*  //   };*/
/*  // });*/
/*  links = links.map((i) => {*/
//     return {
//       source: i.source,
//       target: i.target,
//     };
//   });
//   // links = links.splice(4, 20);
//   console.log('处理好的数据', firstLevelData, secondLevelData, thirdLevelData, links);
//   optionData.value = { firstLevelData, secondLevelData, thirdLevelData, links };
// }
</script>

<style scoped>
.force {
  width: 100%;
  height: 100%;
}
</style>
