<!-- AppName -->
<template>
  <div class="AppName-root">
    <div class="name-box">
      <div class="first-name">{{ firstName }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const state = useStore();
const firstName = computed(() => {
  return state.getters.mainTitle;
});
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
    //line-height: 1;
    //font-family: 'Source Han Serif CN';
    //font-weight: 800;
    //color: rgb(255, 247, 165);
    //text-shadow: 0px 7px 18.24px rgba(0, 0, 0, 0.36);

    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    line-height: 106px;
    //text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);

    //background: linear-gradient(0deg, #b2d2ff 0%);
    -webkit-background-clip: text;
    .first-name {
      font-size: 56px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #f0f0f0;
      line-height: 106px;
      background: linear-gradient(0deg, #b2d2ff 0%, #f0f0f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      //text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
      text-shadow: none !important;
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
