<template>
  <div class="dialog">
    <div class="close" @click="closeDialog()"></div>
    <Left />
    <CenterContent />
    <Right />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Left from './Components/Left';
import CenterContent from './Components/Center';
import Right from './Components/Right';

const state = useStore();
function closeDialog() {
  state.commit('SET_CONTENT_OPACITY', false);
  state.commit('RESET_MAIN_TITLE');
}
</script>

<style lang="scss" scoped>
.dialog {
  z-index: 14;
  position: absolute;
  top: 128px;
  left: 0;
  width: 100%;
  height: 952px;
  padding: 0 228px 95px;
  .close {
    cursor: pointer;
    position: absolute;
    right: 226px;
    top: -67px;
    width: 64px;
    height: 67px;
    background: url('./img/close_bg.png') no-repeat;
  }
}
</style>
