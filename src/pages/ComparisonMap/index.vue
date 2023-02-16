<template>
  <div class="page">
    <div class="center">
      <centerContent />
    </div>
  </div>
</template>

<script setup>
import centerContent from './Center';
import { onBeforeMount } from 'vue';
onBeforeMount(() => {
  document.body.style.width = '';
  document.body.style.height = '';
  document.body.style.transform = '';
});
</script>

<style lang="scss" scoped>
.page {
  width: 7678px;
  height: 1080px;
  display: flex;
  justify-content: space-around;
  background: url('./img/bg.png') no-repeat;
  .center {
    overflow: hidden;
    background-color: #242b46;
  }
}
</style>
