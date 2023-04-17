<!-- page-layout -->
<template>
  <!--  centerFull-->
  <!--  <FitScreen displayType="centerFull" :pageSize="pageSize" />-->
  <FitScreen displayType="none" :pageSize="pageSize" />
  <AppTitle v-if="!hidePageTitle" style="z-index: 1" />
  <router-view v-if="!isLoading" />
  <AppBottom v-if="!hidePageTitle || !hideBottom" :class="{ opacity: bottomOpacity }" />
  <Search />
</template>

<script setup>
import Search from '@/views/Search';
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import appCfg from '@/config/appConfig';
import { useStore } from 'vuex';
import * as Types from '@/store/actionTypes';
import { ElLoading } from 'element-plus';
import 'element-plus/lib/components/loading/style/css';

const store = useStore();
const pageSize = { width: gs(appCfg.width), height: gs(appCfg.height) };
const curTheme = computed(() => store.state.theme.curTheme);
const isLoading = ref(false);
const bottomOpacity = computed(() => {
  return store.getters.bottomOpacity;
});
const hideBottom = computed(() => {
  return store.getters.hideBottom;
});
const hidePageTitle = computed(() => store.state.hidePageTitle);
// 刷新页面
function refreshPage() {
  const loadingInstance = ElLoading.service({
    target: '#app',
    background: 'rgba(0, 0, 0, 0)',
    customClass: 'backdrop',
  });
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    loadingInstance.close();
  }, 200);
}

// 更新主题
watch(curTheme, refreshPage);

onMounted(() => store.commit(Types.SET_INTERVAL_ID, true));

onUnmounted(() => store.commit(Types.SET_INTERVAL_ID, false));
</script>

<style scoped>
.opacity {
  opacity: 0.1;
}
</style>
