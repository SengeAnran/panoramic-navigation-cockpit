<template>
  <Map>
    <!-- <RaterLayer :tiles="tiles" :tileSize="512" :minzoom="0" :maxzoom="22" /> -->
    <RaterLayer
      tiles="http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
      :tileSize="256"
      :maxzoom="16"
    />
    <OutPolygon :key="currentArea" :code="currentArea" />
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
import { shallowRef, onMounted, ref, computed } from 'vue';
import Map from '@/MMap/Map';
import RaterLayer from '@/MMap/RaterLayer';
import Marker from '@/MMap/Marker';
import OdLine from '@/MMap/ThreeLayer/OdLine';
import Legend from './Legend';
import OutPolygon from './OutPolygon';
import MarkerIcon from './MarkerIcon';
import SystemPopup from './SystemPopup';
import { getSystemList } from '@/api/atlas';

// console.log(odLines);
const currentArea = ref(100000);
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
onMounted(async () => {
  const data = await getSystemList();
  // console.log(data);
  systemPoints.value = data.map((d) => {
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
