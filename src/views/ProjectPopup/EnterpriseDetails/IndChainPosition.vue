<template>
  <VueChart :options="options" class="content-box" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { getForceOption } from './option';
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {
      return {
        data: [],
        categories: [],
        links: [],
      };
    },
  },
});
const options = ref({});
watch(
  () => props.dataObj.data,
  (val) => {
    if (val.length > 0) {
      options.value = getForceOption(props.dataObj);
    }
  },
);
if (props.dataObj.data?.length > 0) {
  options.value = getForceOption(props.dataObj);
}
</script>

<style lang="scss" scoped>
.content-box {
  width: 792px;
  height: 217px;
  background: #ffffff;
  box-shadow: 0 11px 28px 2px rgba(16, 38, 70, 0.5), 0 0 40px 0 #1d4d8d;
}
</style>
