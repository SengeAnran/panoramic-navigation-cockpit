<template>
  <div class="force" ref="chart"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { getOption, getOption2 } from './option';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
const myChart = ref();
const chart = ref('');
const optionData = reactive({
  FirstLevelData: [
    {
      name: '项目名称',
    },
  ],
  SecondLevelData: [
    {
      name: '系统名称1',
    },
    {
      name: '系统名称2',
    },
    {
      name: '系统名称3',
    },
    {
      name: '系统名称4',
    },
    {
      name: '系统名称5',
    },
  ],
  ThirdLevelData: [
    {
      name: '企业名称1',
    },
    {
      name: '企业名称2',
    },
    {
      name: '企业名称3',
    },
    {
      name: '企业名称4',
    },
    {
      name: '企业名称5',
    },
  ],
  FourthLevelData: [
    {
      name: '人物名称1',
    },
    {
      name: '人物名称2',
      itemStyle: {},
    },
    {
      name: '人物名称3',
    },
    {
      name: '人物名称4',
    },
    {
      name: '人物名称5',
    },
    {
      name: '人物名称6',
    },
    {
      name: '人物名称7',
    },
    {
      name: '人物名称8',
    },
  ],
  links: [
    {
      source: '项目名称', //边的源节点名称
      target: '系统名称1', //边的目标节点名称
    },
    {
      source: '项目名称', //边的源节点名称
      target: '系统名称2', //边的目标节点名称
    },
    {
      source: '项目名称', //边的源节点名称
      target: '系统名称3', //边的目标节点名称
    },
    {
      source: '项目名称',
      target: '系统名称4',
    },
    {
      source: '项目名称',
      target: '系统名称5',
    },
    {
      source: '系统名称5',
      target: '企业名称1',
    },
    {
      source: '系统名称5',
      target: '企业名称4',
    },
    {
      source: '系统名称5',
      target: '企业名称3',
    },
    {
      source: '系统名称5',
      target: '企业名称5',
    },
    {
      source: '系统名称4',
      target: '企业名称1',
    },
    {
      source: '系统名称4',
      target: '企业名称4',
    },
    {
      source: '系统名称4',
      target: '企业名称3',
    },
    {
      source: '系统名称4',
      target: '企业名称5',
    },
    {
      source: '系统名称1',
      target: '企业名称2',
    },
    {
      source: '系统名称2',
      target: '企业名称2',
    },
    {
      source: '系统名称3',
      target: '企业名称2',
    },
    {
      source: '企业名称1',
      target: '人物名称1',
    },
    {
      source: '企业名称5',
      target: '人物名称1',
    },
    {
      source: '企业名称1',
      target: '人物名称2',
    },
    {
      source: '企业名称2',
      target: '人物名称2',
    },
    {
      source: '企业名称2',
      target: '人物名称3',
    },
    {
      source: '企业名称3',
      target: '人物名称4',
    },
    {
      source: '企业名称3',
      target: '人物名称5',
    },
    {
      source: '企业名称4',
      target: '人物名称6',
    },
    {
      source: '企业名称4',
      target: '人物名称7',
    },
    {
      source: '企业名称5',
      target: '人物名称8',
    },
  ],
});
const emit = defineEmits(['showDetail']);
function initChart() {
  myChart.value = echarts.init(chart.value);
  myChart.value.setOption(getOption(optionData));
  let model1 = myChart.value.getModel().getSeriesByIndex(0).getData()._itemLayouts;

  // let data1  = myChart.value.getOption().series[0].data;
  let model2 = myChart.value.getModel().getSeriesByIndex(2).getData()._itemLayouts;
  let model3 = myChart.value.getModel().getSeriesByIndex(4).getData()._itemLayouts;
  let model4 = myChart.value.getModel().getSeriesByIndex(6).getData()._itemLayouts;
  model1.forEach((i, index) => {
    optionData.FirstLevelData[index].value = i;
    optionData.FirstLevelData[index].itemStyle = {
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
    optionData.FirstLevelData[index].symbolSize = 48;
  });
  model2.forEach((i, index) => {
    optionData.SecondLevelData[index].value = i;
    optionData.SecondLevelData[index].itemStyle = {
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
    optionData.SecondLevelData[index].symbolSize = 36;
  });
  model3.forEach((i, index) => {
    optionData.ThirdLevelData[index].value = i;
    optionData.ThirdLevelData[index].itemStyle = {
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
    optionData.ThirdLevelData[index].symbolSize = 41;
  });
  model4.forEach((i, index) => {
    optionData.FourthLevelData[index].value = i;
    optionData.FourthLevelData[index].itemStyle = {
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
    optionData.FourthLevelData[index].symbolSize = 40;
  });
  myChart.value.clear();
  myChart.value.setOption(getOption2(optionData));

  // 如果是vue中，在获取完坐标之后如果要对数据进行处理，最好使用:
  //   [dom].getOption().series[0].data
  myChart.value.on('click', (params) => {
    if (params.componentSubType === 'graph' && params.dataType === 'node') {
      emit('showDetail', params);
    }
  });
}
onMounted(() => {
  initChart();
});
onBeforeUnmount(() => {
  if (myChart.value) {
    myChart.value.dispose();
    myChart.value = null;
  }
});
</script>

<style scoped>
.force {
  width: 100%;
  height: 100%;
}
</style>
