<template>
  <div class="force" ref="chart"></div>
</template>

<script setup>
// import Mock from 'mockjs';
import * as echarts from 'echarts';
// import { optionDatas } from './data';
import { getOption3 } from './option';
import { onBeforeUnmount, ref, onMounted } from 'vue';
import { data } from '@/page-layout/data2';
// import { dataObj } from './data';
const myChart = ref();
const chart = ref('');
const optionData = ref(data);
const point = [350, 700, 1050, 1400, 1750];
// const emit = defineEmits(['showDetail']);
onMounted(() => {
  initData();
});
function initData() {
  optionData.value.mainNodes = optionData.value.mainNodes.map((i, index) => {
    return {
      ...i,
      x: point[index],
      y: 400,
      symbolSize: 100,
      value: 100,
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 30,
          },
          formatter: function (node) {
            return node.data.name;
          },
        },
      },
    };
  });
  optionData.value.nodes = optionData.value.nodes.map((i, index) => {
    let x, y;
    if (index < 24) {
      y = 280 - Math.random() * 160;
      x = 30 + index * 80;
    } else {
      y = 680 - Math.random() * 160;
      x = 30 + (index - 24) * 80;
    }
    return {
      ...i,
      symbolSize: 50,
      value: 25,
      x: x,
      y: y,
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 15,
          },
          formatter: function (node) {
            return node.data.id;
          },
        },
      },
    };
  });
  optionData.value.mainLinks = optionData.value.mainLinks.map((i) => {
    return {
      ...i,
      lineStyle: {
        color: '#ffd800',
        width: 5,
      },
    };
  });
  optionData.value.links = optionData.value.links.map((i) => {
    return {
      ...i,
      lineStyle: {
        color: '#fff',
        width: 2.5,
      },
    };
  });
  optionData.value.nodes = [...optionData.value.mainNodes, ...optionData.value.nodes];
  optionData.value.links = [...optionData.value.mainLinks, ...optionData.value.links];
  console.log(optionData.value);
  initChart();
}
function initChart() {
  myChart.value = echarts.init(chart.value);
  console.log(getOption3(optionData.value));
  myChart.value.setOption(getOption3(optionData.value));
}
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
