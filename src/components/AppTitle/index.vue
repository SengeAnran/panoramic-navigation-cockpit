<!-- AppTitle -->
<template>
  <div class="AppTitle-root">
    <AppName />
    <!--    <TitleOther />-->
    <!--    <Time />-->
  </div>
  <!--  <AppList />-->
</template>

<script setup>
// import AppList from './AppList';
// import TitleOther from './TitleOther';
import AppName from './AppName';
// import Time from './Time';
</script>

<style lang="scss" scoped>
.AppTitle-root {
  position: absolute;
  z-index: 9;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 118px;
  background: url('./AppTitle-bg.png') center 0 no-repeat;
  //background-size: ;
}
</style>
