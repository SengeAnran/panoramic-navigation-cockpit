<!-- App -->
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Socket from '@/utils/Soket';
const state = useStore();
const showOneDialog = computed(() => {
  return state.getters.showOneDialog;
});
const stocket = ref('');
watch(
  () => showOneDialog.value,
  () => {
    if (showOneDialog.value) {
      initStocket();
    } else if (stocket.value) {
      stocket.value.destroySocket();
    }
  },
);
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
    if (res && res.url && res.url !== state.getters.dialogInfo.meta.url) {
      state.commit('atlasMap/SET_VIEW_NODE_URL', res.url);
    }
  });
  stocket.value.on('notifyXpath', (res) => {
    if (res && res.url && res.url !== state.getters.dialogInfo.meta.url) {
      state.commit('atlasMap/SET_VIEW_NODE_URL', res.url);
    }
  });
}
</script>
