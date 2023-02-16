<template>
  <Polygon
    @click="handleClick"
    @dblclick="handleDblClick"
    :data="outData"
    :fillPaint="fillPaint"
    :linePaint="linePaint"
  />
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
const emit = defineEmits(['click', 'dblclick']);
function handleClick(properties) {
  emit('click', properties);
}
function handleDblClick(properties) {
  emit('dblclick', properties);
}
const outData = shallowRef();
onMounted(async () => {
  const filename = `${props.code}${props.full ? '_full' : ''}.json`;
  const data = await fetch(`/map/geojson/${filename}`)
    .then((res) => res.json())
    .catch(() => {
      console.log(filename);
    });
  outData.value = data;
});
</script>
