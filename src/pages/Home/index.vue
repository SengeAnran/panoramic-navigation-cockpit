<template>
  <div class="content" :class="{ opacity: contentOpacity }">
    <CenterContent />
    <Left />
    <Right />
  </div>
  <OneDialog v-if="showOneDialog" />
</template>

<script setup>
// import { MyWebSocket } from '@/utils/MyWebSocket';
import Left from './Left/index';
import Right from './Right/index';
import CenterContent from './Center/index';
// import { computed, onMounted, ref, watch } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
// import Socket from '@/utils/Soket';
const state = useStore();
const contentOpacity = computed(() => {
  return state.getters.contentOpacity;
});
const showOneDialog = computed(() => {
  return state.getters.showOneDialog;
});
// onMounted(() => {});
// watch(
//   () => showOneDialog.value,
//   () => {
//     if (showOneDialog.value) {
//       initStocket();
//     } else if (stocket.value) {
//       stocket.value.destroySocket();
//     }
//   },
// );
// const stocket = ref('');
// function initStocket() {
//   const { protocol, host } = location;
//   const url = `${protocol === 'http:' ? 'ws' : 'wss'}://${host}/socket/api/ws`;
//   // stocket.value = MyWebSocket('ws://172.16.24.1:8088/api/ws', resData);
//   // stocket.value = MyWebSocket(url, resData);
//   stocket.value = new Socket(url);
//   setTimeout(() => {
//     stocket.value.emit('socket-broadcast', { id: 123, url: '12344' });
//   }, 1000);
//   stocket.value.on('notifyUrl', (res) => {
//     console.log(res, res.url);
//   });
// }
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
  filter: blur(25px); // 模糊
}
</style>
