<template>
  <div class="hot-words">
    <div class="title-name">领域前沿分析：</div>
    <VueChart :options="options" class="bar-chart" />
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { drawLineChart } from './option';
import { getFieldTrend } from '@/api/project';
const props = defineProps({
  fieldNames: [],
});
const dataObj = ref([]);
// const options = ref(drawLineChart(dataList1, dataList2, dataList3));
const options = ref({});
watch(
  () => props.fieldNames,
  () => {
    nextTick(() => {
      getData();
    });
  },
);
async function getData() {
  const data = {
    fieldNames: props.fieldNames,
  };
  // const { property1, property2 } = await getFieldTrend(data);
  const res = await getFieldTrend(data);
  props.fieldNames.forEach((i, index) => {
    dataObj.value[index] = res.data[i].map((j) => {
      return {
        name: j.year,
        data1: j.yearCount - 0,
      };
    });
  });
  options.value = drawLineChart(dataObj.value, props.fieldNames);
  // dataList1.value = res;
  console.log(dataObj.value);
}
getData();
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
