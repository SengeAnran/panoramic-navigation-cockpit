<template>
  <div class="atlas-map">
    <div class="btns theme-font-style">
      <div class="btn">全部展开</div>
      <div class="btn">全部收起</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.atlas-map {
  position: absolute;
  top: 146px;
  //background-color: gold;
  width: 100%;
  height: 800px;
  .btns {
    position: absolute;
    right: 0;
    display: flex;
    .btn {
      width: 160px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      margin: 0 10px;
      background: url('./img/btn_bg.png') no-repeat;
      background-size: 100%;
      font-size: 24px;
    }
  }
}
</style>
