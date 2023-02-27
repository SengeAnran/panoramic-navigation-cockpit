<template>
  <div class="dialog-left">
    <h3 class="theme-font-style">{{ nodeInfo.node_name || nodeInfo.name }}</h3>
    <div class="show-box"></div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const state = useStore();
const nodeInfo = computed(() => {
  return state.getters.dialogInfo;
});
</script>

<style lang="scss" scoped>
.dialog-left {
  //position: absolute;
  //left: 50%;
  //top: 0;
  //transform: translateX(-50%);
  h3 {
    font-size: 50px;
    margin: 0;
    padding: 0;
    margin-bottom: 46px;
    &::before {
      content: '';
      display: inline-block;
      width: 80px;
      height: 40px;
      margin-right: 31px;
      background: url('./title_icon.png') no-repeat;
    }
  }
  .show-box {
    cursor: pointer;
    width: 1440px;
    height: 809px;
    border: 1px solid #547eff;
    box-shadow: 0px 0px 40px 0px #1d4d8d;
    background: #222f4e url('./bg.png') no-repeat left top;
    background-size: 100%;
  }
}
</style>
