<template>
  <div class="dialog-right">
    <h3 class="theme-font-style">页面介绍</h3>
    <div class="show-box"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.dialog-right {
  position: absolute;
  right: 33px;
  top: 0;
  h3 {
    font-size: 50px;
    margin: 0;
    padding: 0;
    margin-bottom: 46px;
  }
  .show-box {
    width: 1440px;
    height: 810px;
    border-radius: 20px;
    border: 1px solid #547eff;
    box-shadow: 0px 0px 40px 0px #1d4d8d;
    background: #222f4e;
  }
}
</style>
