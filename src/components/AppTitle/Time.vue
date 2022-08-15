<template>
  <div class="time">
    <div class="hour">{{ time.hour }}</div>
    <div class="right">
      <div class="date">{{ time.date }}</div>
      <div class="week">{{ time.week }}</div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive } from 'vue';

const moment = require('moment');
const time = reactive({
  hour: '',
  date: '',
  week: '',
});
let timer;
onMounted(() => {
  timer = setInterval(() => {
    init();
  }, 1000);
});
function init() {
  moment.locale('zh-cn');
  time.hour = moment().format('HH:mm:ss');
  time.date = moment().format('YYYY-MM-DD');
  time.week = moment().format('dddd');
}
onBeforeMount(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  position: absolute;
  left: 3575px;
  top: 33px;
  color: #abbacb;
  .hour {
    width: 133px;
    font-size: 33px;
    font-family: DIN;
    font-weight: 500;
  }
  .right {
    font-size: 13px;
    margin-left: 18px;
    margin-top: 7px;
    .week {
      font-family: Source Han Sans CN;
    }
  }
}
</style>
