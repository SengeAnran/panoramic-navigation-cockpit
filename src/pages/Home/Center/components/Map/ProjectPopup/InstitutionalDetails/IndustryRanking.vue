<template>
  <div class="industry">
    <div class="title-name">产业排名:</div>
    <theme-table class="table-content" :columns="tableColumns" :data-source="dataList" height="207"> </theme-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableColumns = [
  { label: '产业名称', dataIndex: 'name' },
  { label: '排名', dataIndex: 'value' },
];
const dataList = ref([
  {
    name: '具体产业名称',
    value: 20,
  },
  {
    name: '具体产业名称',
    value: 20,
  },
  {
    name: '具体产业名称',
    value: 20,
  },
  {
    name: '具体产业名称',
    value: 20,
  },
  {
    name: '具体产业名称',
    value: 20,
  },
]);
</script>

<style lang="scss" scoped>
.industry {
  width: 254px;
  .title-name {
    margin-bottom: 12px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
