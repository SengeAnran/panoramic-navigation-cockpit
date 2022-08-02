<template>
  <div class="atlas">
    <AtlasBall />
    <AtlasMap />
    <div class="search-results">
      <div class="btn" @click="showRes()"></div>
      <div class="search-results-box" v-if="showSearchRes">
        <div class="atlas-switch">
          <div class="type-name theme-font-style">{{ atlasType }}</div>
          <div v-if="atlasType !== '关系图谱'" @click="changeAtlas('关系图谱')" class="icon-top icon"></div>
          <div v-else class="icon-bottom icon" @click="changeAtlas('对比图谱')"></div>
        </div>
        <div class="atlas-items">
          <div class="box">
            <div class="atlas-item" v-for="(item, index) in systemList" :key="index">
              <svg class="svg-box"></svg>
              <div class="system-name theme-font-style">{{ item.system }}</div>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AtlasBall from './components/AtlasBall/index';
import AtlasMap from './components/AtlasMap/index';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { getRelationGraph } from '@/api/atlas';
const state = useStore();
const showSearchRes = ref(false);
watch(
  () => showSearchRes.value,
  function (nVal) {
    state.commit('SET_BOTTOM_OPACITY', nVal);
  },
);
const atlasType = ref('关系图谱');
const systemList = ref([]);
function changeAtlas(typeName) {
  atlasType.value = typeName;
}
async function showRes() {
  showSearchRes.value = !showSearchRes.value;
  if (showSearchRes.value) {
    const res = await getRelationGraph();
    systemList.value = res;

    console.log(res);
  }
}
</script>

<style lang="scss" scoped>
.atlas {
  z-index: 13;
  position: absolute;
  top: 0;
  left: 920px;
  width: 1999px;
  height: 100%;
  //background: pink;
  .search-results {
    position: absolute;
    bottom: 43px;
    left: 93px;
    .btn {
      margin-bottom: 25px;
      cursor: pointer;
      width: 106px;
      height: 43px;
      background: url('./img/btn_bg.png') no-repeat;
      background-size: 100%;
    }
    .search-results-box {
      z-index: 13;
      display: flex;
      .atlas-switch {
        position: relative;
        width: 378px;
        height: 254px;
        background: url('./img/atlas_item_bg.png');
        background-size: 100%;
        .type-name {
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 254px;
          font-size: 40px;
        }
        .icon {
          position: absolute;
          left: 50%;
          cursor: pointer;
          width: 25px;
          height: 14px;
          background: url('./img/bottom_icon.png') no-repeat;
        }
        .icon-top {
          top: 21px;
          transform: translateX(-50%) rotate(180deg);
        }
        .icon-bottom {
          bottom: 22px;
          transform: translateX(-50%);
        }
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -53px;
          display: inline-block;
          width: 3px;
          height: 86px;
          background: #90e1fd;
          opacity: 0.37;
        }
      }
      .atlas-items {
        //background-color: pink;
        width: 1416px;
        overflow-x: scroll;
        overflow-y: scroll;
        margin-left: 112px;
        .box {
          width: fit-content;
          display: flex;
          .atlas-item {
            position: relative;
            width: 378px;
            height: 254px;
            background: url('./img/atlas_item_bg.png');
            background-size: 100%;
            margin-right: 22px;
            .system-name {
              position: absolute;
              top: 30px;
              left: 41px;
              font-size: 24.3px;
            }
            input {
              position: absolute;
              top: 30px;
              right: 52px;
              width: 24px;
              height: 24px;
              background: #111833;
              border: 1px solid #7ca3ef;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
