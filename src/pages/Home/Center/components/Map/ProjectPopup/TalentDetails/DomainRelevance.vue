<template>
  <div className="hot-words">
    <div className="title-name">领域相关度分析：</div>
    <VueChart :options="options" class="bar-chart" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getForceOption } from './option';

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
