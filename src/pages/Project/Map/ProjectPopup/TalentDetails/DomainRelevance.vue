<template>
  <div className="hot-words">
    <div className="title-name">领域相关度分析：</div>
    <VueChart :options="options" class="bar-chart" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { getForceOption } from './option';
import { useStore } from 'vuex';
import { getChordData } from '@/api/project';
const store = useStore();
const popId = computed(() => {
  return store.getters.popId;
});
watch(
  () => popId.value,
  (val) => {
    if (val) {
      getData();
    }
  },
);
async function getData() {
  const data = {
    id: popId.value,
  };
  const res = await getChordData(data);
  console.log(res);
}
getData();
const options = ref(getForceOption());
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
