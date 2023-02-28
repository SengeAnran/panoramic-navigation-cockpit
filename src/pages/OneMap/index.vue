<template>
  <div class="content">
    <div class="left"></div>
    <div class="right"></div>
    <Title />
    <div class="center">
      <div class="close" @click="closeDialog()"></div>
      <LeftContent />
      <CenterContent />
      <Right />
    </div>
  </div>
</template>

<script setup>
import CenterContent from './Components/CenterContent';
import LeftContent from './Components/LeftContent';
import Right from './Components/Right';
import Title from './Components/Title';
import { changeToggle } from '@/api/atlas';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Socket from '@/utils/Soket';
import { useStore } from 'vuex';
const state = useStore();

function closeDialog() {
  const data = { topicPattern: 'ORDINARY' };
  changeToggle(data);
  window.close();
}
const stocket = ref('');
onMounted(() => {
  initStocket();
});
onBeforeUnmount(() => {
  if (stocket.value) {
    stocket.value.destroySocket();
  }
});

// const urlList = computed(() => {
//   const list = [];
//   state.getters.compereNodeInfo.forEach((i) => {
//     if (i.meta && i.meta.url) {
//       i.meta.url.forEach((item) => {
//         if (item && list.findIndex((j) => j === item) === -1) {
//           list.push(item);
//         }
//       });
//     }
//   });
//   // console.log(list);
//   return list;
// });
function initStocket() {
  const { protocol, host } = location;
  const url = `${protocol === 'http:' ? 'ws' : 'wss'}://${host}/socket/api/ws`;
  stocket.value = new Socket(url);
  setTimeout(() => {
    stocket.value.emit('socket-broadcast', { id: 123, url: '12344' });
  }, 1000);
  stocket.value.on('notifyUrl', (res) => {
    if (res && res.url && res.url !== state.getters.dialogInfo.meta.url) {
      // console.log(res.url);
      state.commit('atlasMap/SET_VIEW_NODE_URL', res.url);
    }
  });
}
</script>

<style lang="scss" scoped>
.content {
  width: 7678px;
  height: 1080px;
  position: relative;
  background: url('./img/bg.png') no-repeat;
  background-size: 100% 100%;
  .left {
    position: absolute;
    left: 0;
    width: 1500px;
    height: 1080px;
    background: url('./img/result_bg.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .right {
    position: absolute;
    right: 0;
    width: 1500px;
    height: 1080px;
    background: url('./img/result_bg.jpg') no-repeat;
    background-size: 100% 100%;
  }
}
.center {
  z-index: 14;
  position: absolute;
  top: 128px;
  left: 50%;
  transform: translateX(-50%);
  width: 4680px;
  height: 1080px;
  //width: 100%;
  //height: 952px;
  padding: 0 32px 95px;
  .close {
    cursor: pointer;
    position: absolute;
    right: 226px;
    top: -67px;
    width: 64px;
    height: 67px;
    background: url('./img/close_bg.png') no-repeat;
  }
}
</style>
