<template>
  <Empty />
</template>
<script setup>
import { inject, onUnmounted, onMounted, watch } from 'vue';
import { bbox } from '@turf/turf';
import { uid } from '@/utils/string';

const props = defineProps({
  data: null,
  bbox: null,
  linePaint: Object,
  fillPaint: Object,
  autoFitBound: Boolean,
});
const emit = defineEmits(['click']);

const comId = `polygon-layer-${uid()}`;

const sourceId = `${comId}-source`;
const fillLayerId = `${comId}-fill-layer`;
const lineLayerId = `${comId}-outline-layer`;

const emptyData = {
  type: 'FeatureCollection',
  features: [],
};

const mapPromise = inject('mapPromise');

async function render() {
  const map = await mapPromise;
  const data = props.data || emptyData;
  const source = map.getSource(sourceId);
  source.setData(data);
  if (props.autoFitBound) {
    const bound = props.bbox || bbox(data);
    try {
      map.fitBounds(bound, {
        padding: { top: 20, bottom: 20, left: 20, right: 20 },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

watch(() => props.data, render);

onMounted(async () => {
  const map = await mapPromise;
  map.addSource(sourceId, {
    type: 'geojson',
    data: emptyData,
  });
  map.addLayer({
    type: 'fill',
    id: fillLayerId,
    source: sourceId,
    paint: {
      'fill-color': '#000', // blue color fill
      'fill-opacity': 0.5,
      ...props.fillPaint,
    },
  });
  map.addLayer({
    type: 'line',
    id: lineLayerId,
    source: sourceId,
    paint: {
      'line-width': 1,
      'line-color': '#d2f5ff',
      ...props.linePaint,
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
  });
  map.on('click', fillLayerId, (e) => {
    if (e.features?.[0]?.properties) {
      emit('click', e.features?.[0]?.properties);
    }
    // console.log(e.features[0].properties);
    // new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(e.features[0].properties.name).addTo(map);
  });
  render();
});
onUnmounted(async () => {
  const map = await mapPromise;
  map.removeLayer(lineLayerId);
  map.removeLayer(fillLayerId);
  map.removeSource(sourceId);
});
</script>
