<template>
  <VueChart :options="options" class="content-box" />
</template>

<script setup>
import { ref } from 'vue';
import { getHotWordOption } from './option';
const options = ref(getHotWordOption());
</script>

<style lang="scss" scoped>
.content-box {
  width: 792px;
  height: 217px;
  background: #ffffff;
  box-shadow: 0 11px 28px 2px rgba(16, 38, 70, 0.5), 0 0 40px 0 #1d4d8d;
}
</style>
