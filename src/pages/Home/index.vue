<template>
  <div class="content">
    <Left />
    <CenterContent />
    <Right />
  </div>
</template>

<script setup>
import Left from './Left/index';
import Right from './Right/index';
import CenterContent from './Center/index';
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  //background: url('./page_bg.jpg') left top no-repeat;
}
</style>
