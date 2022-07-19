<template>
  <div :class="`LabelInfo-root ${direction}`">
    <div
      v-if="label"
      class="label"
      :style="{
        fontSize: labelSize + 'px',
      }"
    >
      {{ label }}
    </div>
    <div class="value" :style="{ color: valueColor, fontSize: valueSize + 'px' }">
      <div v-if="num !== undefined">
        <RollNum :number="num" :autoChangeTime="autoChangeTime" class="num" />
        <span
          class="unit"
          :style="{
            fontSize: (unitSize || valueSize * 0.7) + 'px',
          }"
          >{{ unit }}</span
        >
      </div>
      <div v-else>
        {{ value }}
      </div>
      <div :class="`increase ${change}` " v-if="smallNum !== undefined && smallNum !== null">
        <RollNum :number="smallNum" class="small-num" />
        <span
          class="small-unit"
        >{{ smallUnit }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @name 指标展示 LabelInfo
 * @param {String} direction 文字位置，可选[top, top-left, bottom, left]
 * @param {String, Number} label 文字内容
 * @param {Number} num 数值
 * @param {String} unit 单位
 * @param {Number} smallNum 数值
 * @param {String} smallUnit 单位
 * @param {String} change 数值变化 可选[reduce, add]
 * @param {String} value num 不传，则显示value值，value一般为文字内容，可选
 * @param {String} color 值 颜色
 * @param {Number} unitSize 单位字体大小
 */
import getThemeConfig from '@/utils/getThemeConfig';
import { computed } from 'vue';

const curThemeConfig = getThemeConfig();

const props = defineProps({
  direction: { type: String, default: 'left' },
  label: { type: [String, Number], required: true },
  num: { type: Number, required: false },
  autoChangeTime: { type: Number, default: 0 },
  unit: { type: String, required: false },
  smallNum: { type: Number, required: false },
  smallUnit: { type: String, required: false },
  change: { type: String, default: 'add' },
  value: { type: String, required: false },
  color: { type: String, default: '#FFFEFE' },
  labelSize: { type: Number, default: 14 },
  valueSize: { type: Number, default: 22 },
  unitSize: { type: Number },
});

const valueColor = computed(() => {
  return props.color || curThemeConfig.value.color;
});
</script>

<style lang="scss" scoped>
.LabelInfo-root {
  .label {
    font-size: 14px;
    font-family: 'MiSans-Normal';
    font-weight: 400;
    color: #C0D8F5;
    text-align: center;
  }
  .value {
    display: flex;
    flex-wrap: nowrap;
    font-weight: bold;
    font-size: 22px;
    font-family: 'MiSans-Medium';
    .unit {
      font-size: 12px;
      margin-left: 2px;
      font-family: 'MiSans-Normal';
    }
    .increase {
      align-self: flex-end;
      margin-left: 8px;
      font-size: 16px;
      font-family: DINPro;
      font-weight: 500;
      color: #FFFEFE;
      background: linear-gradient(0deg, rgba(232, 25, 25, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      .small-num {
        //font-size: 12px;
        //margin-left: 2px;
        color: #FFFEFE;
        background: linear-gradient(0deg, rgba(232, 25, 25, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

      }
      &.add {
        position: relative;
        background: linear-gradient(0deg, rgba(232, 25, 25, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        .small-num {
          //font-size: 12px;
          //margin-left: 2px;
          color: #FFFEFE;
          background: linear-gradient(0deg, rgba(232, 25, 25, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: -12px;
          display: block;
          width: 15px;
          height: 18px;
          background: url("./icon_add.png") no-repeat;
        }
      }
      &.reduce {
        position: relative;
        background: linear-gradient(0deg, rgba(30, 145, 63, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        .small-num {
          //font-size: 12px;
          //margin-left: 2px;
          color: #FFFEFE;
          background: linear-gradient(0deg, rgba(30, 145, 63, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: -12px;
          display: block;
          width: 15px;
          height: 18px;
          background: url("./icon_reduce.png") no-repeat;
        }
      }
      .small-unit {

      }
    }
  }

  &.top {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  &.top-left {
    display: inline-flex;
    flex-direction: column;
    .label {
      text-align: left;
    }
  }

  &.left {
    display: flex;
    align-items: center;
    .label {
      display: inline-block;
      margin-right: 7px;
    }
    .value {
      //display: inline-block;
    }
  }
  &.bottom {
    display: flex;
    flex-direction: column-reverse;
    //text-align: center;
    .label {
      text-align: left;
    }
  }
}
</style>
