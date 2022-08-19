<template>
  <Map>
    <Image src="/b.jpg" :id="patternID" />
    <!-- <RaterLayer :tiles="tiles" :tileSize="512" :minzoom="0" :maxzoom="22" /> -->
    <RaterLayer
      tiles="http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
      :tileSize="256"
      :maxzoom="16"
    />
    <Polygon :data="outData" autoFitBound :fillPaint="fillPaint" :linePaint="linePaint" />
    <ThreeLayer>
      <OdLine :data="odLines" v-if="false" />
      <Wall :data="wallData" />
    </ThreeLayer>
    <Marker
      :position="item.position"
      :markerOptions="{ offset: [0, -27] }"
      :popupOptions="{ className: 'opacity-popup', maxWidth: 'none', anchor: 'left', closeButton: false }"
      v-for="item in systemPoints"
      :key="item.id"
    >
      <template #icon>
        <MarkerIcon />
      </template>
      <template #popup>
        <SystemPopup :point="item" />
      </template>
    </Marker>
  </Map>
  <Legend :options="options" v-model="selected"></Legend>
</template>
<script setup>
import { shallowRef, onMounted, ref } from 'vue';
import Map from '@/MMap/Map';
import Image from '@/MMap/Image';
import RaterLayer from '@/MMap/RaterLayer';
import Polygon from '@/MMap/Polygon';
import Marker from '@/MMap/Marker';
import ThreeLayer from '@/MMap/ThreeLayer';
import OdLine from '@/MMap/ThreeLayer/OdLine';
import Wall from '@/MMap/ThreeLayer/Wall';
import Legend from './Legend';
import MarkerIcon from './MarkerIcon';
import SystemPopup from './SystemPopup';
import { odLines } from './mock';
import { getSystemPoints } from '@/api/atlas';

const patternID = 'pattern-alterman';
const linePaint = {};
const fillPaint = {
  'fill-opacity': 0.6,
  'fill-pattern': patternID,
};

const options = [
  { label: '系统点位', value: 'system' },
  { label: '公司点位', value: 'company' },
];
const selected = ref(['system', 'company']);

const systemPoints = shallowRef([]);

onMounted(async () => {
  const data = await getSystemPoints();
  systemPoints.value = data.map((d) => ({
    ...d,
    position: [+d.lon, +d.lat],
  }));
});

const outData = shallowRef();
onMounted(async () => {
  const data = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json').then((res) => res.json());
  outData.value = data;
});
const wallData = shallowRef();
onMounted(async () => {
  const data = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000.json').then((res) => res.json());
  wallData.value = data;
});
</script>
