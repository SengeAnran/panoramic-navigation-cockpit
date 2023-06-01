<template>
  <div className="hot-words">
    <div className="title-name">领域相关度分析：</div>
    <VueChart :options="options" class="bar-chart" />
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { getForceOption } from './option';
import { getChordData } from '@/api/project';

const props = defineProps({
  fieldNames: [],
});
const options = ref();
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
  const res = await getChordData(data);
  const datas = res.nodes.map((i) => {
    return {
      name: i.name,
    };
  });
  options.value = getForceOption(datas, res.links);
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
  background: white;
}
</style>
