<template>
  <div class="content" :class="{ opacity: contentOpacity }">
    <CenterContent />
    <Left />
    <Right />
  </div>
  <OneDialog v-if="showOneDialog" />
</template>

<script setup>
import { MyWebSocket } from '@/utils/MyWebSocket';
import Left from './Left/index';
import Right from './Right/index';
import CenterContent from './Center/index';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
const state = useStore();
const contentOpacity = computed(() => {
  return state.getters.contentOpacity;
});
const showOneDialog = computed(() => {
  return state.getters.showOneDialog;
});
onMounted(() => {});
watch(
  () => showOneDialog.value,
  () => {
    if (showOneDialog.value) {
      initStocket();
    }
  },
);
const stocket = ref('');
function initStocket() {
  stocket.value = MyWebSocket('ws://172.16.24.1:8088/api/ws', resData);
  setTimeout(() => {
    stocket.value.sendMsg({ id: 123, url: '12344' });
  }, 1000);
}
function resData(data) {
  console.log(data);
}
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
