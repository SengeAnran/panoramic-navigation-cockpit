<!-- AppTitle -->
<template>
  <div class="AppTitle-root">
    <!--    <AppName />-->
    <TitleOther />
  </div>
  <!--  <AppList />-->
</template>

<script setup>
// import AppList from './AppList';
import TitleOther from './TitleOther';
// import AppName from './AppName';
</script>

<style lang="scss" scoped>
.AppTitle-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 126px;
  background: url('./AppTitle-bg02.png') 0 0 no-repeat;
  //background-size: ;
  z-index: 9;
  display: flex;
  justify-content: center;
}
</style>
