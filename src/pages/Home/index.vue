<template>
  <div class="content" :class="{ opacity: contentOpacity }">
    <CenterContent />
    <Left />
    <Right />
  </div>
  <OneDialog v-if="showOneDialog" />
</template>

<script setup>
import Left from './Left/index';
import Right from './Right/index';
import CenterContent from './Center/index';
import OneDialog from './OneDialog/index';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const state = useStore();
const contentOpacity = computed(() => {
  return state.getters.contentOpacity;
});
const showOneDialog = computed(() => {
  return state.getters.showOneDialog;
});
onMounted(() => {});
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  //background: url('./page_bg.jpg') left top no-repeat;
}
.opacity {
  opacity: 0.5;
  filter: blur(5px); // 模糊
}
</style>
