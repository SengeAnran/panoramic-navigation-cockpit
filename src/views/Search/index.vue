<template>
  <div v-if="searchKeys && searchKeys.length > 0" class="search-keys" :class="{ opacity: contentOpacity }">
    <div class="key-item" v-for="(item, index) in searchKeys" :key="index">
      <div class="key-name theme-font-style">{{ item.name }}</div>
      <button @click="deleteKey(item)"></button>
    </div>
  </div>
  <div class="search" :class="{ opacity: contentOpacity }">
    <div class="voice" ref="voice"></div>
    <div>
      <div v-show="showSearch" @click="showSearchInput" class="search-input">
        <form ref="searchForm" id="searchForm" action="">
          <input type="text" v-model="searchkey" />
          <button type="submit"></button>
        </form>
      </div>
      <img v-show="!showSearch" src="./img/search_icon.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { record, stopRecord } from './record';
import * as d3 from 'd3';
import { onMounted, ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
const state = useStore();

const searchKeys = computed(() => {
  return state.getters.query;
});
const showSearch = ref(false);
const searchkey = ref('');
const voice = ref(null);
// const bottomOpacity = computed(() => {
//   return state.getters.bottomOpacity;
// });
const contentOpacity = computed(() => state.getters.contentOpacity);
onMounted(() => {
  const searchForm = d3.select('#searchForm');
  searchForm.on('submit', (e) => {
    e.preventDefault();
    const pushQuery = searchkey.value.trim();
    console.log(pushQuery);
    if (pushQuery !== '') {
      const data = {
        position: 'center',
        type: 'search',
        name: pushQuery,
      };
      state.commit('ADD_QUERY', data);
    }
    const query = state.getters.query;
    console.log(query);
    searchkey.value = '';
  });
  initVoice();
});
function initVoice() {
  nextTick(() => {
    const voiceNode = voice.value;
    voiceNode.addEventListener('mousedown', clickVoice);
    voiceNode.addEventListener('mouseup', () => {
      const res = stopRecord();
      if (res instanceof Array && res.length > 0) {
        // 识别结果加入检索标签
        res.forEach((i) => {
          const data = {
            position: '',
            type: 'voice',
            name: i,
          };
          state.commit('ADD_QUERY', data);
        });
      }
    });
  });
}
function showSearchInput() {
  showSearch.value = true;
}
function deleteKey(item) {
  state.commit('DELETE_ONE_QUERY', item);
}
function clickVoice() {
  console.log('按下');
  // showSearchInput();
  record();
}
</script>

<style lang="scss" scoped>
.search-keys {
  z-index: 13;
  position: absolute;
  top: 142px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 45px;
  min-width: 150px;
  //height: 40px;
  display: flex;
  flex-wrap: wrap;
  &::before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 33px;
    background: url('./img/left_icon.png') no-repeat;
  }
  &::after {
    display: inline-block;
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 33px;
    background: url('./img/right_icon.png') no-repeat;
  }
  .key-item {
    position: relative;
    min-width: 143px;
    height: 36px;
    margin: 3px 5.5px;
    line-height: 36px;
    font-size: 24px;
    background: linear-gradient(
      90deg,
      rgba(78, 132, 186, 0.6) 0%,
      rgba(111, 169, 227, 0.99) 46%,
      rgba(78, 132, 186, 0.11) 99%
    );
    border-radius: 4px;
    .key-name {
      padding-left: 20px;
      padding-right: 62px;
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 90%;
        height: 1px;
        background: linear-gradient(
          -90deg,
          rgba(31, 57, 86, 0.1) 0%,
          rgba(122, 191, 255, 0.97) 49%,
          rgba(34, 61, 93, 0.1) 100%
        );
      }
    }
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      //bottom: 0;
      top: -2px;
      left: 0;
      width: 10px;
      height: 41px;
      background: url('./img/content_left_icon.png') no-repeat;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: -2px;
      right: 0;
      width: 10px;
      height: 41px;
      background: url('./img/content_right_icon.png') no-repeat;
    }
    button {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      width: 36px;
      height: 36px;
      background: url('./img/close_icon.png') no-repeat;
      border: none;
      border-radius: 0px 4px 4px 0px;
    }
  }
}
.search {
  z-index: 13;
  position: absolute;
  top: 82px;
  left: 2369px;
  height: 41px;
  display: flex;
  img {
    cursor: pointer;
    float: left;
    width: 41px;
    height: 41px;
  }
  //background: url('./img/search_icon.png') no-repeat;
  //background-size: 100%;
  .search-input {
    position: relative;
    float: left;
    width: 273px;
    height: 41px;
    background: url('./img/search_input.png') no-repeat;
    input {
      position: absolute;
      top: 4px;
      height: 32px;
      width: 235px;
      background-color: rgba(119, 187, 249, 0);
      border: none;
      outline: none;
      text-indent: 10px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #f0f0f0;
    }
    button {
      cursor: pointer;
      position: absolute;
      right: 0;
      width: 41px;
      height: 41px;
      background-color: rgba(14, 26, 40, 0);
      border: none;
    }
    //border: 1px solid #77bbf9;
    //border-radius: 4px;
  }
  .voice {
    cursor: pointer;
    margin-right: 16px;
    float: left;
    //z-index: 13;
    //position: absolute;
    //top: 82px;
    //left: 2469px;
    height: 41px;
    width: 41px;
    background: url('./img/voice.png') left top no-repeat;
    background-size: 100% 100%;
  }
}

.opacity {
  opacity: 0.5;
  filter: blur(5px); // 模糊
}
</style>
