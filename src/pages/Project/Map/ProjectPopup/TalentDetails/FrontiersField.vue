<template>
  <div class="hot-words">
    <div class="title-name">领域前沿分析：</div>
    <VueChart :options="options" class="bar-chart" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { drawLineChart, dataList2, dataList1, dataList3 } from './option';
const options = ref(drawLineChart(dataList1, dataList2, dataList3));
</script>

<style lang="scss" scoped>
.title-name {
  margin-bottom: 12px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.bar-chart {
  width: 254px;
  height: 168px;
}
</style>
