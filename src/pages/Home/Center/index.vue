<template>
  <div class="center-content">
    <div class="mask"></div>
    <!--    图谱-->
    <Atlas v-if="activeIndex === 0" />
    <Map v-if="activeIndex === 1" />
    <div class="change">
      <div
        class="change-item"
        v-for="(item, index) in pageType"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="changeActive(index)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Atlas from './components/Atlas/index';
import Map from './components/Map/index';
import { ref } from 'vue';
const pageType = ref(['图谱', '地图']);
const activeIndex = ref(1);
function changeActive(index) {
  activeIndex.value = index;
}
</script>

<style lang="scss" scoped>
.center-content {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  .mask {
    width: 100%;
    height: 100%;
    background: url('./img/mask.png') center no-repeat;
    pointer-events: none;
    //background-size: 100% 100%;
  }
  .change {
    z-index: 14;
    position: absolute;
    padding-top: 5px;
    //padding-left: 5px;
    left: 1270px;
    top: 82px;
    width: 202px;
    height: 41px;
    background: url('./img/change_bg.png') no-repeat;
    display: flex;
    justify-content: space-around;
    font-family: YouSheBiaoTiHei;
    .change-item {
      cursor: pointer;
      width: 92px;
      height: 30px;
      text-align: center;
      font-size: 24px;
      span {
        color: rgba(122, 190, 255, 0.4);
      }
    }
    .active {
      background: linear-gradient(90deg, rgba(78, 132, 186, 0.6) 0%, #6fa9e3 46%, rgba(78, 132, 186, 0.61) 99%);
      //opacity: 0.8;
      border-radius: 0px 4px 4px 0px;
      span {
        color: #ffffff;
        font-weight: 400;
        background: linear-gradient(0deg, #b2d2ff 0%, #ffffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  //.opacity {
  //  opacity: 0.1;
  //}
}
</style>
