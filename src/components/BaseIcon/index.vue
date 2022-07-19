<!-- BaseIcon -->
<template>
  <i :class="`aliconfont ${icon}`"></i>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
});
</script>
