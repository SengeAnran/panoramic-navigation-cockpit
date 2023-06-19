<template>
  <Marker :position="point" v-if="true" :markerOptions="{ offset: [0, -27] }">
    <template #icon>
      <MarkerIcon type="company" />
    </template>
    <!-- <template #popup>
      <ProjectPopup :point="item" />
    </template> -->
  </Marker>
</template>
<script setup>
import { shallowRef, onMounted } from 'vue';
import { center as turfCenter, getCoord } from '@turf/turf';
import Marker from '@/MMap/Marker';
// import ProjectPopup from '@/views/ProjectPopup';
import MarkerIcon from './MarkerIcon';

const props = defineProps({
  code: [String, Number],
});

const point = shallowRef({ lng: 0, lat: 0 });
onMounted(async () => {
  const filename = `${props.code}${props.full ? '_full' : ''}.json`;
  const data = await fetch(`/map/geojson/${filename}`)
    .then((res) => res.json())
    .catch(() => {
      console.log(filename);
    });
  const center = turfCenter(data);
  point.value = getCoord(center);
  console.log(data, getCoord(center));
});
</script>
