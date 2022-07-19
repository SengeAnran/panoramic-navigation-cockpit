<template>
  <AMap isFeatures isShowLocation isShowDistrict isShowBuild>
    <component :is="currentMap" />
  </AMap>
</template>
<script>
import { useRoute } from 'vue-router';
import AMap from '@/components/center-amap';
import { ref, markRaw, watchEffect } from 'vue';
import NotFount from '@/views/not-fount';

export default {
  setup() {
    const currentMap = ref(null);
    const route = useRoute();
    watchEffect(async () => {
      const mapConfig = route.meta?.map;
      if (typeof mapConfig === 'undefined') {
        currentMap.value = null;
        return;
      }
      if (typeof mapConfig === 'string') {
        const mapCom = await import(/* webpackInclude: /center-map\/index\.vue$/ */ '@/pages' + mapConfig).catch(
          () => ({
            default: NotFount,
          }),
        );
        currentMap.value = markRaw(mapCom.default);
      }
    });

    return {
      currentMap,
    };
  },
  components: {
    AMap,
  },
};
</script>
