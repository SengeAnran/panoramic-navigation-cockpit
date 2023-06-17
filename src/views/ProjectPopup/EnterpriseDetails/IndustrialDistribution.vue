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
  dataObj: {
    type: Object,
    default: () => {
      return {
        dataname: [],
        value: [],
      };
    },
  },
});
const options = ref({});
watch(
  () => props.dataObj.value,
  (val) => {
    if (val.length > 0) {
      options.value = getOption(props.dataObj.dataname, props.dataObj.value);
    }
  },
  {
    deep: true,
  },
);
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
