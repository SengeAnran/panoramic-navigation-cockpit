<template>
  <div class="center-content">
    <div class="mask"></div>
    <div class="search"></div>
    <AppBottom />
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style lang="scss" scoped>
.center-content {
  width: 100%;
  height: 100%;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    background: url('./img/mask.png') center no-repeat;
    pointer-events: none;
    //background-size: 100% 100%;
  }
}
</style>
