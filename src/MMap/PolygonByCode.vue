<template>
  <Polygon @click="handleClick" :data="outData" :fillPaint="fillPaint" :linePaint="linePaint" />
</template>
<script setup>
import { shallowRef, onMounted } from 'vue';
import Polygon from './Polygon';

const props = defineProps({
  code: [String, Number],
  full: Boolean,
  fillPaint: Object,
  linePaint: Object,
});
const emit = defineEmits(['click']);
function handleClick(properties) {
  emit('click', properties);
}
const outData = shallowRef();
onMounted(async () => {
  const filename = `${props.code}${props.full ? '_full' : ''}.json`;
  const data = await fetch(`/map/geojson/${filename}`)
    .then((res) => res.json())
    .catch(() => undefined);
  outData.value = data;
});
</script>
