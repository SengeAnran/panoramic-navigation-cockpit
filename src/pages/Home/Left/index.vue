<template>
  <div class="left-content">
    <div class="title">
      <h3 class="theme-font-style">业务导览</h3>
      <div class="eglish-name">BUSINESS GUIDE</div>
      <div class="list-btn">
        <div class="icon"></div>
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="(item, index) in dataList" :key="index">
        <img :src="item.imgUrl" alt="" />
        <div class="name">
          <div class="name-text theme-font-style">{{ item.name }}</div>
          <div class="name-eglish">{{ item.eglishName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dataList = ref([
  {
    name: '教育',
    eglishName: 'education'.toUpperCase(),
    imgUrl: require('./img/icon_jy_active.png'),
    activeImgUrl: require('./img/icon_jy_active.png'),
  },
]);
</script>

<style lang="scss" scoped>
.left-content {
  z-index: 10;
  background: url('./img/bg_img_left.png') no-repeat;
  position: absolute;
  left: 280px;
  width: 640px;
  height: 100%;
  .title {
    position: absolute;
    left: 145px;
    top: 97px;
    h3 {
      font-size: 50px;
      margin: 0;
      padding: 0;
    }
    .eglish-name {
      font-size: 15px;
      font-family: DIN-BlackItalic;
      font-weight: 400;
      color: #7684be;
    }
    .list-btn {
      cursor: pointer;
      position: absolute;
      left: 205px;
      top: 20px;
      width: 24px;
      height: 24px;
      border: 1px solid #78abdb;
      border-radius: 4px;
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-top: 8px solid white;
        border-left: 6.5px solid rgba(255, 255, 255, 0);
        border-right: 6.5px solid rgba(255, 255, 255, 0);
      }
    }
  }
  .list {
    position: absolute;
    top: 250px;
    .list-item {
      width: 340px;
      height: 134px;
      display: flex;
      justify-content: space-between;
      background: url('./img/bottom_icon.png') no-repeat center 190%;
      background-size: 100%;
      img {
        width: 81px;
        height: 79px;
      }
      .name {
        .name-text {
          font-size: 44px;
          float: right;
        }
        .name-eglish {
          font-size: 18px;
          font-family: DIN-BoldItalicAlt;
          font-weight: 400;
          color: #7987c1;
          line-height: 58px;
        }
      }
    }
  }
}
</style>
