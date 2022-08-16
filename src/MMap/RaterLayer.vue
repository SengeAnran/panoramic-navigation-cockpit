<template>
  <Empty />
</template>
<script setup>
import { inject, onUnmounted, onMounted } from 'vue';
import { uid } from '@/utils/string';

const props = defineProps({
  tiles: [String, Array],
  minzoom: { type: Number, default: 0 },
  maxzoom: Number,
  tileSize: Number,
});

const comId = `rater-layer-${uid()}`;
const layerId = `${comId}-layer`;
const sourceId = `${comId}-source`;
const mapPromise = inject('mapPromise');

onMounted(async () => {
  const map = await mapPromise;

  const tiles = Array.isArray(props.tiles) ? props.tiles : [props.tiles];
  map.addSource(sourceId, {
    type: 'raster',
    tiles,
    minzoom: props.minzoom,
    maxzoom: props.maxzoom,
    tileSize: props.tileSize,
  });
  map.addLayer({
    id: layerId,
    type: 'raster',
    source: sourceId,
    paint: {
      'raster-saturation': 0,
      'raster-hue-rotate': 0,
      'raster-brightness-min': 0,
      'raster-brightness-max': 1,
      'raster-contrast': 0,
    },
  });
});

onUnmounted(async () => {
  const map = await mapPromise;
  map.removeLayer(layerId);
  map.removeSource(sourceId);
});
</script>
