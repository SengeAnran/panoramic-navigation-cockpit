<template>
  <Map>
    <!-- <RaterLayer :tiles="tiles" :tileSize="512" :minzoom="0" :maxzoom="22" /> -->
    <RaterLayer :tiles="tiles" :tileSize="256" :maxzoom="16" />
    <Polygon :data="outData" autoFitBound :linePaint="linePaint" />
    <ThreeLayer>
      <OdLine :data="odLines" v-if="false" />
    </ThreeLayer>
    <Marker :position="[104.90022521913897, 33.46359626751]" :options="{ offset: [0, -27] }">
      <template #icon>
        <MarkerIcon />
      </template>
      <template #popup>
        <div class="marker-icon">hello popup</div>
      </template>
    </Marker>
  </Map>
</template>
<script setup>
import { shallowRef, onMounted } from 'vue';
import Map from './Map';
import RaterLayer from './RaterLayer';
import Polygon from './Polygon';
import Marker from './Marker';
import ThreeLayer from './ThreeLayer';
import OdLine from './ThreeLayer/OdLine';
import MarkerIcon from './MarkerIcon';
import { odLines } from './mock';

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
const linePaint = {};
</script>
