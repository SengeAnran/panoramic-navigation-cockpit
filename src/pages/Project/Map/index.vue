<template>
  <Map>
    <Image src="/b.jpg" :id="patternID" />
    <!-- <RaterLayer :tiles="tiles" :tileSize="512" :minzoom="0" :maxzoom="22" /> -->
    <RaterLayer :tiles="tiles" :tileSize="256" :maxzoom="16" />
    <Polygon :data="outData" autoFitBound :fillPaint="fillPaint" :linePaint="linePaint" />
    <ThreeLayer>
      <!-- <OdLine :data="odLines" v-if="show" /> -->
      <Wall :data="wallData" />
    </ThreeLayer>
    <Marker :position="[104, 33]" :options="{ offset: companyOffset }">
      <template #icon>
        <CompanyIcon />
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
// import OdLine from '@/MMap/ThreeLayer/OdLine';
import Wall from '@/MMap/ThreeLayer/Wall';
import CompanyIcon, { offset as companyOffset } from './Icon/Company';
import Legend from './Legend';
console.log(companyOffset);

const options = [
  { label: '项目分布', value: 'project' },
  { label: '参与单位', value: 'company' },
  { label: '示范地区', value: 'area' },
];
const selected = ref(['project', 'company']);
// const show = ref(true);
// function toggle() {
//   show.value = !show.value;
// }
const tiles = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}';

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
const patternID = 'pattern-alterman';
const linePaint = {};
const fillPaint = {
  'fill-opacity': 0.6,
  'fill-pattern': patternID,
};
</script>
