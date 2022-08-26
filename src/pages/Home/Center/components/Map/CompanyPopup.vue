<template>
  <div class="system-popup">
    <h4 class="title">{{ point.name }}</h4>
    <ul class="company-list">
      <li class="company" v-for="item in devCompany" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
  point: Object,
});

const devCompany = ref([
  '上海奇点网络有限公司',
  '北京奇点网络有限公司',
  '杭州奇点网络有限公司',
  '深圳奇点网络有限公司',
]);
</script>
<style lang="scss" scoped>
.system-popup {
  background: rgb(0, 21, 46, 0.8);
  box-shadow: inset 0px 0px 40px 0px rgb(29, 77, 141);
  border-radius: 10px;
  padding: 20px;
  .title {
    margin: 0;
    font-size: 30px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #b2d2ff;
    text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
    &::before {
      content: ' ';
      width: 3px;
      height: 22px;
      background: #46e9fe;
      display: inline-block;
      margin-right: 14px;
    }
  }

  .company-list {
    margin-bottom: 0;
    padding-left: 24px;
    list-style: none;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    .company {
      line-height: 1.7;
    }
  }
}
</style>
