<template>
  <div class="atlas">
    <AtlasBall />
    <AtlasMap />
    <div class="search-results"></div>
  </div>
</template>

<script setup>
import AtlasBall from './components/AtlasBall/index';
import AtlasMap from './components/AtlasMap/index';
</script>

<style lang="scss" scoped>
.atlas {
  position: absolute;
  top: 0;
  left: 920px;
  width: 1999px;
  height: 100%;
  background: pink;
}
</style>
