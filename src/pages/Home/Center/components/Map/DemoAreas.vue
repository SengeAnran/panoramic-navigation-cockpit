<template>
  <Image src="/c.jpg" :id="patternID" />
  <PolygonByCode v-for="item in codes" :key="item" :code="item" :fillPaint="fillPaint" :linePaint="linePaint" />
</template>
<script setup>
// import { shallowRef, onMounted } from 'vue';
import Image from '@/MMap/Image';
import PolygonByCode from '@/MMap/PolygonByCode';

defineProps({
  codes: Array,
});

const patternID = 'pattern-demo-area';
const linePaint = {};
const fillPaint = {
  'fill-opacity': 0.6,
  'fill-pattern': patternID,
};
</script>
