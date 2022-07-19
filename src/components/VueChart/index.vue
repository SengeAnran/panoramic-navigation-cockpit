<template>
  <div class="echarts-wrapper" ref="vueEcharts"></div>
</template>

<script setup>
/**
 * @name 图表容器 VueChart
 * @param {Object} options 图表配置项
 */
import { ref, watch, onBeforeUnmount, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);

const props = defineProps({
  options: {
    type: Object,
    required: true,
    default() {
      return {};
    },
  },
});

const chart = ref(undefined);
const vueEcharts = ref(null);
const minScreenWidth = ref(1280);
const resizeFrame = ref(undefined);
const currentScreenWidth = ref(0);
const currentScreenHeight = ref(0);
const listenScreenHeight = ref(true);

function initChart() {
  if (chart.value) {
    return;
  }
  chart.value = echarts.init(vueEcharts.value);
}

function renderChart() {
  unwarp(chart.value).clear();
  unwarp(chart.value).setOption(props.options);
}

function addResizeListener() {
  window.addEventListener('resize', frameTest, false);
}

onMounted(() => {
  nextTick(() => {
    initChart();
    renderChart();
    addResizeListener();
  });
});

function frameTest() {
  if (resizeFrame.value) {
    window.cancelAnimationFrame(resizeFrame.value);
  }
  resizeFrame.value = window.requestAnimationFrame(resizeChart);
}

function resizeChart() {
  if (chart.value) {
    const nowScreenWidth = document.body.clientWidth;
    const nowScreenHeight = document.body.clientHeight;
    if (nowScreenWidth >= minScreenWidth.value && nowScreenWidth !== currentScreenWidth.value) {
      unwarp(chart.value).resize();
      currentScreenWidth.value = nowScreenWidth;
      currentScreenHeight.value = nowScreenHeight;
      return;
    }
    if (listenScreenHeight.value && nowScreenHeight !== currentScreenHeight.value) {
      unwarp(chart.value).resize();
      currentScreenWidth.value = nowScreenWidth;
      currentScreenHeight.value = nowScreenHeight;
    }
  }
  resizeFrame.value = undefined;
}

watch(
  () => props.options,
  () => {
    renderChart();
  },
  { deep: true },
);

onBeforeUnmount(() => {
  if (chart.value) {
    unwarp(chart.value).dispose();
    chart.value = undefined;
  }
  if (resizeFrame.value) {
    window.cancelAnimationFrame(resizeFrame.value);
    resizeFrame.value = undefined;
  }
  window.removeEventListener('resize', frameTest);
});
</script>

<style lang="scss" scoped>
.echarts-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
