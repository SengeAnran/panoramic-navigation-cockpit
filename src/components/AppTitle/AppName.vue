<!-- AppName -->
<template>
  <div class="AppName-root">
    <div class="name-box">
      <div class="first-name">{{ firstName }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const firstName = ref('浙里·未来乡村');
</script>

<style lang="scss" scoped>
.AppName-root {
  position: absolute;
  height: 92px;
  display: flex;
  align-items: center;
  background-size: 50px 30px, 50px 30px;
  background-position: 0 center, 100% center;
  background-repeat: no-repeat, no-repeat;
  padding: 0 76px;
  .name-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    line-height: 1;
    font-family: 'Source Han Serif CN';
    font-weight: 800;
    color: rgb(255, 247, 165);
    text-shadow: 0px 7px 18.24px rgba(0, 0, 0, 0.36);
    .first-name {
      font-size: 42px;
      letter-spacing: 8px;
    }
    .second-name-box {
      margin-left: 15px;
      font-size: 20px;
      letter-spacing: 2px;
      .second-name {
        border-bottom: 1px solid #fff7a5;
        line-height: 1.4;
      }
      .second-name:last-child {
        border-color: transparent;
      }
    }
  }
}
</style>
