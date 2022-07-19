<template>
  <div class="ImgInfo_Root list-content">
    <div class="list-item" v-for="(item, index) in list" :key="index">
<!--      <img class="img" :src="require(`@/assets/img/icons/icon-${item.icon}.png`)" alt="" />-->
      <div class="text-box" :style="{ fontSize: labelSize + 'px' }">
        {{ item.label }}
        <div class="num" :style="{ color: valueColor, fontSize: valueSize + 'px' }">
          <RollNum :number="item.num" />
          <span :style="{ fontSize: unitSize + 'px' }">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @name 图标-指标展示 LabelInfo
 * @param {String, Number} label 文字内容
 * @param {String} icon 图标
 * @param {Number} num 数值
 * @param {String} unit 单位
 * @param {String} color 值 颜色
 * @param {Number} labelSize label字体大小
 * @param {Number} valueSize 数值字体大小
 * @param {Number} unitSize 单位字体大小
 */
import getThemeConfig from '@/utils/getThemeConfig';
import { computed } from 'vue';

const curThemeConfig = getThemeConfig();

const props = defineProps({
  list: { type: Array, default: () => [] },
  color: { type: String },
  labelSize: { type: Number, default: 14 },
  valueSize: { type: Number, default: 20 },
  unitSize: { type: Number, default: 14 },
});

const valueColor = computed(() => {
  return props.color || curThemeConfig.value.futureOutLookColor;
});
</script>

<style lang="scss" scoped>
.ImgInfo_Root {
  font-size: 14px;
  font-family: MiSans-Normal;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .list-item {
    height: 34px;
    font-size: 14px;
    font-family: MiSans-Normal;
    font-weight: 400;
    color: #fffffe;
    display: flex;
    flex: 0 0 46%;
    align-items: center;
    margin: 10px 0;
    .img {
      width: 36px;
      height: 36px;
      vertical-align: middle;
    }
    .text-box {
      margin-left: 15px;
      white-space: nowrap;
      .num {
        margin-top: 6px;
        font-size: 24px;
        font-family: MiSans-Medium;
        font-weight: 500;
      }
    }
  }
}
</style>
