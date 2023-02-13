<template>
  <div class="project-popup">
    <div class="content">
      <h3 class="project-name">{{ point?._?.projectName }}</h3>
      <div class="delimiter" />
      <div class="body">
        <div class="companies">
          <h3 class="title">参与单位</h3>
          <div class="list">
            <div class="item" v-for="item in point?._?.companies" :key="item.companyName">
              {{ item.companyName }}
            </div>
          </div>
        </div>
        <div class="delimiter" />
        <div class="areas">
          <h3 class="title">示范地区</h3>
          <div class="list">
            <div class="item" v-for="item in point?._?.areas" :key="item.areaId">
              {{ getName(item.areaId) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
defineProps({
  point: null,
});
const areaMap = ref();
onMounted(async () => {
  const { data } = await axios.get('/map/flat.json');
  areaMap.value = data;
});
function getName(code) {
  return areaMap.value?.[code]?.name || code;
}
</script>
<style lang="scss" scoped>
.project-popup {
  border: 1px solid #46e9fe;
  border-radius: 10px;
  padding: 12px;
  .content {
    background: rgba(0, 21, 46, 0.8);
    box-shadow: inset 0px 0px 40px 0px #1d4d8d;
    border-radius: 10px;
    padding: 20px;
    padding-right: 50px;
    .project-name {
      font-size: 30px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #b2d2ff;
      line-height: 58px;
      text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
      margin: 0;
      white-space: nowrap;
      padding-left: 12px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        width: 3px;
        height: 22px;
        background: #46e9fe;
      }
    }
    .delimiter {
      height: 1px;
      margin: 10px 0;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #42c2d9 50%, rgba(255, 255, 255, 0) 100%);
    }
    .body {
      display: flex;
      align-items: flex-start;
      .delimiter {
        margin: 0px 10px;
        width: 1px;
        flex: none;
        height: auto;
        align-self: stretch;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #42c2d9 50%, rgba(255, 255, 255, 0) 100%);
      }
      .companies,
      .areas {
        flex: auto;
        .title {
          margin: 0;
          line-height: 1.5;
          text-align: center;
          font-size: 20px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          color: #b2d2ff;
          text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
          background: linear-gradient(
            90deg,
            rgba(78, 132, 186, 0) 0%,
            rgba(111, 169, 227, 0.99) 46%,
            rgba(78, 132, 186, 0.01) 99%
          );
        }
        .list {
          margin-top: 12px;
          max-height: 188px;
          overflow: auto;
          .item {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            line-height: 32px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
