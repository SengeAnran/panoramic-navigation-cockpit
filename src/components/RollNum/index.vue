<template>
  <span class="RollNum-root">
    <span class="num-1" ref="rollMask"></span>
    <span class="num-2" ref="rollNum"></span>
  </span>
</template>
<script setup>
/**
 * @name 数字滚动器 RollNum
 * @param {Number} number 数值
 * @param {Number} fixed 小数点位数0/2
 */
import * as d3 from 'd3';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
const props = defineProps({
  number: { type: Number, default: 0 },
  fixed: { type: [Number, String], default: 'auto' },
  autoChangeTime: {
    type: Number,
    default: 0,
  },
});

onMounted(() => {
  initRollNum();
  update(props.number);
  if (props.autoChangeTime) {
    initAuto();
  }
});

const inter = ref(null);
const rollNum = ref(null);
const rollMask = ref(null);
const container = ref(undefined);
const mask = ref(undefined);
function initAuto() {
  inter.value = setInterval(function () {
    update(props.number, 0);
  }, props.autoChangeTime);
}
function initRollNum() {
  container.value = d3.select(rollNum.value);
  mask.value = d3.select(rollMask.value);
}

function getFixedBit(value) {
  const str = String(value);
  const spStr = str.split('.');
  const length = (spStr[1] || '').length;
  return length;
}

function update(_newValue, _oldVal) {
  const newValue = isNaN(_newValue) ? 0 : _newValue;
  const oldVal = isNaN(_oldVal) ? 0 : _oldVal;
  let fixedBit = props.fixed;
  if (fixedBit === 'auto') {
    fixedBit = getFixedBit(newValue);
  }
  mask.value.text(d3.format(`,.${fixedBit}f`)(newValue));
  container.value
    .datum({ value: oldVal || 0 })
    .transition()
    .duration(2000)
    .tween('d', (d) => {
      const i = d3.interpolate(d.value, newValue); // 取插值
      return (t) => {
        container.value.text(d3.format(`,.${fixedBit}f`)(i(t)));
      };
    });
}

watch(
  () => props.number,
  (val, oldVal) => {
    if (typeof val === 'number') {
      update(val, oldVal);
    }
  },
);
onBeforeUnmount(() => {
  if (props.autoChangeTime) {
    clearInterval(inter.value);
  }
});
</script>

<style lang="scss" scoped>
.RollNum-root {
  position: relative;
  display: inline-flex;
  align-items: center;

  .num-1 {
    position: relative;
    display: inline-block;
    opacity: 0;
    font-family: 'DIN Alternate';
  }
  .num-2 {
    position: absolute;
    font-family: 'DIN Alternate';
    background: inherit;
  }
}
</style>
