<template>
  <Map ref="mapRef">
    <RaterLayer
      tiles="http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
      :tileSize="256"
      :maxzoom="16"
    />
    <OutPolygon :key="currentArea" :code="currentArea" @dblclick="handleClick" />
    <OdLine :data="odLines" />
    <template v-if="showCompany">
      <Marker
        v-for="(item, index) in companyPoints"
        :key="index"
        :position="[item.lng, item.lat]"
        :markerOptions="{ offset: [0, -27] }"
      >
        <template #icon>
          <MarkerIcon type="company" />
        </template>
      </Marker>
    </template>
    <template v-if="showSystem">
      <Marker
        v-for="item in systemPoints"
        :key="item.id"
        :position="[item.lng, item.lat]"
        @openPopup="handleOpen(item)"
        @closePopup="handleClose(item)"
        :markerOptions="{ offset: [0, -27] }"
        :popupOptions="{ className: 'opacity-popup', maxWidth: 'none', anchor: 'left', closeButton: false }"
      >
        <template #icon>
          <MarkerIcon type="system" />
        </template>
        <template #popup>
          <SystemPopup :point="item._" />
        </template>
      </Marker>
    </template>
  </Map>
  <Legend :options="options" v-model="selected"></Legend>
</template>
<script setup>
import { shallowRef, onMounted, ref, computed, onBeforeUnmount, watchEffect } from 'vue';
import { useStore } from 'vuex';
import Map from '@/MMap/Map';
import RaterLayer from '@/MMap/RaterLayer';
import Marker from '@/MMap/Marker';
import OdLine from '@/MMap/ThreeLayer/OdLine';
import Legend from './Legend';
import OutPolygon from './OutPolygon';
import MarkerIcon from './MarkerIcon';
import SystemPopup from './SystemPopup';
import { getSystemList } from '@/api/atlas';
import areaProps from './flat.json';

// console.log(odLines);
const store = useStore();
const mapRef = ref();
const currentArea = ref(100000);
// const currentAreaDetail = computed(() => {
//   return areaProps[currentArea.value];
// });

function handleClick(item) {
  console.log('handleClick click');
  const props = areaProps[item.adcode];
  if (props.level > 2) {
    return;
  }
  currentArea.value = item.adcode;
}
function back() {
  const props = areaProps[currentArea.value];
  currentArea.value = props.parent.adcode || 100000;
}
onMounted(async () => {
  const map = await mapRef.value.mapPromise;
  map.on('contextmenu', back);
});
onBeforeUnmount(async () => {
  const map = await mapRef.value.mapPromise;
  map.off('contextmenu', back);
});
const options = [
  { label: '系统点位', value: 'system' },
  { label: '公司点位', value: 'company' },
];
const selected = ref(['system', 'company']);
const showSystem = computed(() => selected.value?.includes('system'));
const showCompany = computed(() => selected.value?.includes('company'));
const systemPoints = shallowRef();
const companyPoints = shallowRef();
const odLines = shallowRef();
function handleOpen(item) {
  odLines.value = [];
  const detail = item._;
  const area = detail.areas[0];
  if (!area) {
    return;
  }
  const start = [+area.longitude, +area.latitude];
  const lines = detail.companies.map((company) => {
    return [start, [+company.longitude, +company.latitude]];
  });
  odLines.value = lines;
}
function handleClose() {
  odLines.value = undefined;
}
watchEffect(async () => {
  systemPoints.value = undefined;
  companyPoints.value = undefined;
  odLines.value = undefined;
  const query = store.getters.query?.length ? store.getters.query : [];
  // console.log(query);
  const businessGuide = query.filter((d) => d.type === 'field').map((d) => d.name);
  const hotWords = query.filter((d) => d.type === 'heightWord').map((d) => d.name);
  const keyWords = query.filter((d) => d.type === 'search').map((d) => d.name);
  let queryDims = [];
  query
    .filter((d) => d.type !== 'search' && d.type !== 'heightWord' && d.type !== 'field')
    .forEach((d) => {
      const index = queryDims.findIndex((j) => j.dimension === d.type);
      if (index === -1) {
        queryDims.push({
          top: d.type,
          seconds: [d.name],
        });
      } else {
        queryDims[index].seconds.push(d.name);
      }
    });
  const params = {
    areaCode: currentArea.value === 100000 ? [] : [currentArea.value],
    businessGuide: businessGuide.length ? businessGuide[0] : '',
    hotWords: hotWords.length ? hotWords : [],
    keys: keyWords.length ? keyWords : [],
    queryDims: queryDims,
  };
  const data = await getSystemList(params);
  console.log(data);
  systemPoints.value = data
    .filter((d) => d.areas?.length)
    .map((d) => {
      const system = d.areas[0];
      return {
        lng: +system.longitude,
        lat: +system.latitude,
        _: d,
      };
    });
  companyPoints.value = data
    .map((d) => d.companies)
    .flat()
    .map((d) => ({
      ...d,
      lng: +d.longitude,
      lat: +d.latitude,
    }));
});
</script>
