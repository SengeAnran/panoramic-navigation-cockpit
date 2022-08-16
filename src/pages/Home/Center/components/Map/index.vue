<template>
  <Map>
    <Image src="/b.jpg" :id="patternID" />
    <!-- <RaterLayer :tiles="tiles" :tileSize="512" :minzoom="0" :maxzoom="22" /> -->
    <RaterLayer :tiles="tiles" :tileSize="256" :maxzoom="16" />
    <Polygon :data="outData" autoFitBound :fillPaint="fillPaint" :linePaint="linePaint" />
    <ThreeLayer>
      <OdLine :data="odLines" v-if="show" />
    </ThreeLayer>
    <Marker :position="[104, 33]" :options="{ offset: [0, -27] }">
      <template #icon>
        <MarkerIcon />
      </template>
      <template #popup>
        <div class="marker-icon">hello popup</div>
      </template>
    </Marker>
  </Map>
  <Legend :options="options" v-model="selected">
    <!-- <button @click="toggle">aaaa</button> -->
  </Legend>
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
import Legend from './Legend';
import MarkerIcon from './MarkerIcon';
import { odLines } from './mock';

const options = [
  { label: '系统点位', value: 'system' },
  { label: '公司点位', value: 'company' },
];
const selected = ref(['system', 'company']);
const show = ref(true);
// function toggle() {
//   show.value = !show.value;
// }
const tiles = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}';
// const tiles = [
//   'https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWx0ZXJtYW4iLCJhIjoiY2pxZzl1d3lxMDhubDQ0cDJyMzN2YWJraiJ9.e1QzONvlILHn_zt1jsjnlw',
//   'https://b.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWx0ZXJtYW4iLCJhIjoiY2pxZzl1d3lxMDhubDQ0cDJyMzN2YWJraiJ9.e1QzONvlILHn_zt1jsjnlw',
// ];

const outData = shallowRef();
onMounted(async () => {
  const data = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json').then((res) => res.json());
  outData.value = data;
});
const patternID = 'pattern-alterman';
const linePaint = {};
const fillPaint = {
  'fill-opacity': 0.6,
  'fill-pattern': patternID,
};
</script>
