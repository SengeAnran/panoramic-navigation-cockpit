<!-- AppName -->
<template>
  <div class="AppTitle-root" v-if="!hideBottom">
    <div class="first-name" @click="changeShow()">{{ firstName }}</div>
  </div>
  <ChangeDialog v-if="showChangeDialog" @change="handleChange" />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ChangeDialog from './ChangeDialog';
let showChangeDialog = ref(false);
const state = useStore();

const firstName = ref('切换');
const hideBottom = computed(() => {
  return state.getters.hideBottom;
});
function changeShow() {
  showChangeDialog.value = !showChangeDialog.value;
  state.commit('SET_CONTENT_OPACITY', showChangeDialog.value);
}
function handleChange() {
  showChangeDialog.value = false;
  state.commit('SET_CONTENT_OPACITY', showChangeDialog.value);
}
</script>

<style lang="scss" scoped>
.AppTitle-root {
  pointer-events: none;
  position: absolute;
  z-index: 8;
  display: flex;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 118px;
  background: url('./AppBottom-bg.png') center 0 no-repeat;
  //background-size: ;
  .first-name {
    cursor: pointer;
    margin-top: 30px;
    pointer-events: stroke;
    font-size: 44px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #f0f0f0;
    line-height: 106px;
    //text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
    background: linear-gradient(0deg, #b2d2ff 0%, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
