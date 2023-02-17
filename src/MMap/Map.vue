<template>
  <div class="map-container" ref="mapRef"><slot /></div>
</template>
<script setup>
import { onMounted, shallowRef, provide, onUnmounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import { defer } from '@/utils/promise';
import ThreeLayer from './ThreeLayer/ThreeLayer';

import 'mapbox-gl/dist/mapbox-gl.css';
const mapDefer = defer();
const mapRef = shallowRef();

provide('mapPromise', mapDefer.promise);
defineExpose({ mapPromise: mapDefer.promise });
const threeLayer = new ThreeLayer();

mapboxgl.accessToken = 'pk.eyJ1IjoiYWx0ZXJtYW4iLCJhIjoiY2pxZzl1d3lxMDhubDQ0cDJyMzN2YWJraiJ9.e1QzONvlILHn_zt1jsjnlw';
onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapRef.value,
    center: [104.90022521913897, 33.46359626751],
    zoom: 4,
    pitch: 45,
    bearing: 0,
    hash: false,
    style: {
      version: 8,
      name: 'alterman.gl',
      sources: {},
      layers: [],
    },
  });
  window.map = map;
  map.on('load', () => {
    map.threeLayer = threeLayer;
    mapDefer.resolve(map);
    setTimeout(() => {
      map.addLayer(threeLayer);
    }, 200);
    // new mapboxgl.Marker().setLngLat([118.327367586576, 29.2026987827415]).addTo(map);
  });
});

onUnmounted(async () => {
  const map = await mapDefer.promise;
  map.removeLayer(threeLayer.id);
  map.remove();
});
</script>
<style lang="scss" scoped>
.map-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translateX(-50%);
  &::after {
    position: absolute;
    content: '';
    background: url('./map-mask.png');
    background-size: 110% 110%;
    background-position: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0.95;
  }
}
</style>
