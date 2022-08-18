<!-- AppTitle -->
<template>
  <div class="AppTitle-root">
    <AppName />
  </div>
</template>

<script setup>
import AppName from './AppName';
</script>

<style lang="scss" scoped>
.AppTitle-root {
  pointer-events: none;
  position: absolute;
  z-index: 8;
  display: flex;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 118px;
  background: url('./AppBottom-bg.png') center 0 no-repeat;
  //background-size: ;
}
</style>
