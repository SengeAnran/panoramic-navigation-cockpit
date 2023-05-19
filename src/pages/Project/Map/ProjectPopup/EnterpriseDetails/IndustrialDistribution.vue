<template>
  <div class="industry">
    <div class="title-name">产业分布雷达:</div>
    <VueChart :options="options" class="content-box" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getOption } from './option';
const props = defineProps({
  dataObj: {},
});
watch(
  () => props.dataObj,
  () => {
    options.value = getOption(props.dataObj.dataname, props.dataObj.value);
  },
  {
    deep: true,
  },
);
const options = ref({});
</script>

<style lang="scss" scoped>
.industry {
  width: 514px;
  .title-name {
    margin-bottom: 12px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .content-box {
    width: 100%;
    height: 200px;
    background: #ffffff;
  }
}
</style>
