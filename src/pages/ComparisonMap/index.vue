<template>
  <div class="page">
    <!--    <left />-->
    <div class="center">
      <centerContent />
    </div>
    <!--    <right></right>-->
  </div>
</template>

<script setup>
import centerContent from './Center';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import Socket from '@/utils/Soket';
import { useStore } from 'vuex';
const state = useStore();

onBeforeMount(() => {
  document.body.style.width = '';
  document.body.style.height = '';
  document.body.style.transform = '';
});
const stocket = ref('');
onMounted(() => {
  initStocket();
});
onBeforeUnmount(() => {
  if (stocket.value) {
    stocket.value.destroySocket();
  }
});

const urlList = computed(() => {
  const list = [];
  state.getters.compereNodeInfo.forEach((i) => {
    if (i.meta && i.meta.url) {
      i.meta.url.forEach((item) => {
        if (item && list.findIndex((j) => j === item) === -1) {
          list.push(item);
        }
      });
    }
  });
  // console.log(list);
  return list;
});
function initStocket() {
  const { protocol, host } = location;
  const url = `${protocol === 'http:' ? 'ws' : 'wss'}://${host}/socket/api/ws`;
  // stocket.value = MyWebSocket('ws://172.16.24.1:8088/api/ws', resData);
  // stocket.value = MyWebSocket(url, resData);
  stocket.value = new Socket(url);
  setTimeout(() => {
    stocket.value.emit('socket-broadcast', { id: 123, url: '12344' });
  }, 1000);
  stocket.value.on('notifyUrl', (res) => {
    if (res && res.url && urlList.value.some((i) => i === res.url)) {
      state.commit('atlasMap/SET_VIEW_NODE_URL', res.url);
    }
  });
}
</script>

<style lang="scss" scoped>
.page {
  width: 7678px;
  height: 1080px;
  position: relative;
  //display: flex;
  //justify-content: space-around;
  background: url('./img/bg_03.png') no-repeat;
  background-size: 100% 100%;
  .center {
    //overflow: hidden;
    //background-color: #242b46;
    position: relative;
  }
}
</style>
