<template>
  <teleport :to="markerEle" v-if="slots.icon"><slot name="icon" /></teleport>
  <teleport :to="popupEle" v-if="slots.popup"><slot name="popup" /></teleport>
</template>
<script setup>
import mapboxgl from 'mapbox-gl';
import { inject, onMounted, onUnmounted, useSlots } from 'vue';

const props = defineProps({
  position: Array,
  options: Object,
});
const mapPromise = inject('mapPromise');

const slots = useSlots();
console.log(slots);

const markerEle = slots.icon ? document.createElement('div') : undefined;
const popupEle = slots.popup ? document.createElement('div') : undefined;
const marker = new mapboxgl.Marker({ ...props.options, element: markerEle });
let popup;

if (slots.popup) {
  popup = new mapboxgl.Popup().setDOMContent(popupEle);
  marker.setPopup(popup);
}
onMounted(async () => {
  const map = await mapPromise;
  marker
    .setLngLat(props.position) // ab
    .addTo(map);
  // new mapboxgl.Marker().setLngLat(props.position).addTo(map);
});
onUnmounted(() => {
  marker.remove();
  popup?.remove();
});
</script>
<style lang="scss" scoped></style>
