<!-- TitleOther -->
<template>
  <div class="TitleOther-root TitleOther-right-root">
    <div class="app-item">
      <img src="./btn_zjxc.png" alt="" />
      <!--      <span>浙江乡村大脑</span>-->
    </div>
  </div>
  <div class="TitleOther-root">
    <div class="app-item">
      <img src="./btn_szzzcs.png" alt="" />
      <!--      <img src="./TitleOther-icon-1.png" class="icon" />-->
      <!--      <span>数智资源超市</span>-->
    </div>
    <div class="app-item">
      <img src="./btn_xtgl.png" alt="" />
      <!--      <img src="./TitleOther-icon-1.png" class="icon" />-->
      <!--      <span>管理系统</span>-->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.TitleOther-root {
  position: absolute;
  height: 32px;
  top: 39px;
  right: 90px;
  display: flex;
  align-items: center;
  &.TitleOther-right-root {
    left: 90px;
    right: initial;
  }
  .app-item {
    position: relative;
    flex-shrink: 0;
    border-radius: 16px;
    height: 32px;
    padding: 0 20.5px;
    font-size: 23px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 32px;
    margin-left: 18px;
    cursor: pointer;
    user-select: none;
    transition: color 0.3s;
    //background-color: rgba(68, 87, 103, 0.02);
    //box-shadow: inset 0px -7px 34px 0px rgba(44, 202, 92, 0.3);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    //&::before {
    //  position: absolute;
    //  top: -2px;
    //  left: 0;
    //  content: ' ';
    //  width: 27px;
    //  height: 34px;
    //  //background-image: url('./border-bg.png');
    //}
    //&::after {
    //  position: absolute;
    //  top: -2px;
    //  right: 0;
    //  content: ' ';
    //  width: 27px;
    //  height: 34px;
    //  //background-image: url('./border-bg.png');
    //  transform: rotateY(180deg);
    //}
    &:first-child {
      margin-left: 0;
      //background: ;
    }
    &.disabled-item {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }
}
</style>
