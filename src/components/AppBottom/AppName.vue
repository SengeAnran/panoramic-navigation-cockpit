<!-- AppName -->
<template>
  <div class="AppName-root">
    <div class="name-box">
      <div class="first-name" @click="changeShow()">{{ firstName }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const firstName = ref('切换');
function changeShow() {
  console.log('切换');
}
</script>

<style lang="scss" scoped>
.AppName-root {
  position: absolute;
  height: 117px;
  background-size: 50px 30px, 50px 30px;
  background-position: 0 center, 100% center;
  background-repeat: no-repeat, no-repeat;
  padding: 30px 76px;
  .name-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    line-height: 106px;
    -webkit-background-clip: text;
    .first-name {
      font-size: 44px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #f0f0f0;
      line-height: 106px;
      //text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);

      background: linear-gradient(0deg, #b2d2ff 0%, #f0f0f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
