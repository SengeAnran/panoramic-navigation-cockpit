<template>
  <div class="system-popup">
    <h4 class="title">{{ point?.name }}</h4>
    <div class="company-list">
      <div class="company" v-for="item in detail?.companies" :key="item">
        {{ item }}
      </div>
    </div>
    <div class="label-list" v-if="detail?.labels">
      <div class="label" v-for="item in detail?.labels" :key="item.parentLabel">
        {{ item.parentLabel }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, shallowRef } from 'vue';
import { getSystemDetail } from '@/api/atlas';

const props = defineProps({
  point: Object,
});
// const emit = defineEmits(['']);

const detail = shallowRef();
onMounted(async () => {
  const data = await getSystemDetail(props.point.id);
  detail.value = data;
  // console.log(props.point);
  // console.log(data);
});
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
    margin-bottom: 12px;
    margin-top: 12px;
    padding-left: 18px;
    list-style: none;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    .company {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 32px;
    }
  }
  .label-list {
    .label {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #46e9fe;
    }
  }
}
</style>
