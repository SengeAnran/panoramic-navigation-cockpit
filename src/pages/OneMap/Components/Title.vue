<template>
  <div class="title">
    <div class="title-name">{{ sysName }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute();
console.log(route.query.data);
const query = JSON.parse(route.query.data);
const state = useStore();
state.commit('atlasMap/SET_DIALOG_INFO', query);
const sysName = ref(query.system || '');
</script>

<style lang="scss" scoped>
.title {
  height: 118px;
  background: url('./AppTitle-bg.png') center 0 no-repeat;
  .title-name {
    text-align: center;
    font-size: 56px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #f0f0f0;
    line-height: 106px;
    background: linear-gradient(0deg, #b2d2ff 0%, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    //text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
    text-shadow: none !important;
  }
}
</style>
