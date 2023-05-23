<template>
  <div class="industry">
    <theme-table class="table-content" :columns="tableColumns" :data-source="dataList" height="450">
      <template v-slot:index="{ scope }">
        {{ scope.$index + 1 }}
      </template>
    </theme-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableColumns = [
  { label: '序号', dataIndex: 'index', scopedSlots: 'index', align: 'center' },
  { label: '领域名称', dataIndex: 'name', align: 'center' },
  { label: '排名', dataIndex: 'value', align: 'center' },
  { label: '创新指数', dataIndex: 'value', align: 'center' },
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
  width: 578px;
}
</style>
