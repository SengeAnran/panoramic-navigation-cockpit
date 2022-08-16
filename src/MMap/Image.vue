<template>
  <Empty />
</template>
<script setup>
import { inject, onUnmounted, onMounted, watch } from 'vue';

const props = defineProps({
  id: String,
  src: String,
});

const mapPromise = inject('mapPromise');

const defaultImage = { width: 1, height: 1, data: new Uint8Array([0, 0, 0, 0]) };

function addImage(map, image) {
  if (image) {
    return map.addImage(props.id, image);
  }
  image = new Image();
  image.src = props.src;
  image.onload = () => {
    map.addImage(props.id, image);
  };
}
function removeImage(map) {
  if (map.hasImage(props.id)) {
    map.removeImage(props.id);
  }
}
async function updateImage() {
  const map = await mapPromise;
  removeImage(map);
  addImage(map);
}
watch(() => props.src, updateImage);

onMounted(async () => {
  const map = await mapPromise;
  addImage(map, defaultImage);
  updateImage();
});
onUnmounted(async () => {
  const map = await mapPromise;
  removeImage(map);
});
</script>
