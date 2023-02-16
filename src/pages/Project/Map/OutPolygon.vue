<template>
  <Image src="/b.jpg" :id="patternID" />
  <PolygonByCode @dblclick="handleClick" :code="code" full autoFitBound :fillPaint="fillPaint" :linePaint="linePaint" />
  <Wall :data="wallData" />
</template>
<script setup>
import { shallowRef, onMounted } from 'vue';
import Image from '@/MMap/Image';
import PolygonByCode from '@/MMap/PolygonByCode';
import Wall from '@/MMap/ThreeLayer/Wall';

const props = defineProps({
  code: [String, Number],
});
const emit = defineEmits(['click']);
function handleClick(properties) {
  emit('dblclick', properties);
}

const wallData = shallowRef();
onMounted(async () => {
  const filename = `${props.code}.json`;
  const data = await fetch(`/map/geojson/${filename}`).then((res) => res.json());
  wallData.value = data;
});
const patternID = 'pattern-alterman';
const linePaint = {};
const fillPaint = {
  'fill-opacity': 0.6,
  'fill-pattern': patternID,
};
</script>
