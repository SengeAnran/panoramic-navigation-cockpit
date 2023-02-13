<template>
  <teleport :to="markerEle" v-if="slots.icon"><slot name="icon" /></teleport>
  <teleport :to="popupEle" v-if="slots.popup && (!openAsync || showPopup)"><slot name="popup" /></teleport>
</template>
<script setup>
import mapboxgl from 'mapbox-gl';
import { inject, onMounted, onUnmounted, useSlots, ref } from 'vue';

const props = defineProps({
  position: Array,
  markerOptions: Object,
  popupOptions: Object,
  openAsync: { type: Boolean, default: true },
});
const emit = defineEmits(['openPopup', 'closePopup']);
const mapPromise = inject('mapPromise');

const slots = useSlots();
// console.log(slots);

const markerEle = slots.icon ? document.createElement('div') : undefined;
const popupEle = slots.popup ? document.createElement('div') : undefined;
const marker = new mapboxgl.Marker({ ...props.markerOptions, element: markerEle });
let popup;
let showPopup = ref(false);

if (slots.popup) {
  popup = new mapboxgl.Popup(props.popupOptions).setDOMContent(popupEle);
  popup.on('open', () => {
    emit('openPopup');
    showPopup.value = true;
  });
  popup.on('close', () => {
    emit('closePopup');
    showPopup.value = false;
  });
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
  emit('closePopup');
  marker.remove();
  popup?.remove();
});
</script>
<style lang="scss">
.mapboxgl-popup {
  max-width: none !important;
  .mapboxgl-popup-content {
    background: none;
    box-shadow: none;
    padding: 0;
  }
  .mapboxgl-popup-close-button {
    top: -50px;
  }
}
</style>
