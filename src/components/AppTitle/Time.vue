<template>
  <div class="time">
    <div class="hour">{{ time.hour }}</div>
    <div class="right"></div>
  </div>
</template>

<script setup>
// import { onMounted, reactive } from 'vue';
//
// const moment = require('moment');
// const time = reactive({
//   hour: '',
//   date: '',
//   week: '',
// });
// let timer;
// onMounted(() => {
//   timer = setInterval(() => {});
// });
// function init() {
//   time.hour = moment().format('hh:mm:ss');
//   time.date = moment().format('MM:DD:YYYY');
//   time.week = moment().format('MM:DD:YYYY');
// }
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  position: absolute;
  left: 3575px;
  top: 33px;
  color: #ffffff;
  .hour {
    font-size: 33px;
    font-family: DIN;
    font-weight: 500;
  }
  .right {
  }
}
</style>
