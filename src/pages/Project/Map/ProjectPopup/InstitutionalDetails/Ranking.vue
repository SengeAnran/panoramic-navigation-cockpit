<template>
  <div class="industry">
    <theme-table :columns="tableColumns" :height="450" :data-source="props.dataList" hasIndex> </theme-table>
  </div>
</template>

<script setup>
const props = defineProps({
  dataList: [],
});
const tableColumns = [
  // { label: '序号', dataIndex: 'rand', scopedSlots: 'rand', align: 'center' },
  { label: '领域名称', dataIndex: 'name', align: 'center' },
  { label: '排名', dataIndex: 'value', align: 'center' },
  { label: '创新指数', dataIndex: 'innovationIndex', align: 'center' },
];
// const dataList = ref([
//   {
//     name: '具体产业名称',
//     value: 20,
//   },
//   {
//     name: '具体产业名称',
//     value: 20,
//   },
//   {
//     name: '具体产业名称',
//     value: 20,
//   },
//   {
//     name: '具体产业名称',
//     value: 20,
//   },
//   {
//     name: '具体产业名称',
//     value: 20,
//   },
// ]);
</script>

<style lang="scss" scoped>
.industry {
  width: 578px;
}
</style>
