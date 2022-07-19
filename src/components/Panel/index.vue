<template>
  <div class="panel">
    <panel-title :titleName="props.titleName" :hideMore="props.hideMore" :titleType="props.titleType">
      <slot name="paging"></slot>
    </panel-title>
    <slot></slot>
  </div>
</template>

<script setup>
import PanelTitle from '../PanelTitle/index';
const props = defineProps({
  titleName: {
    type: String,
  },
  hideMore: {
    type: Boolean,
    default: false,
  },
  titleType: {
    type: String,
    default: 'common',
  },
});
</script>

<style scoped>
.panel {
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  margin-top: 10px;
  margin-bottom: 16px;
}
</style>
