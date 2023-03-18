<template>
  <div class="right-content">
    <div class="title">
      <h3 class="theme-font-style">热词词云</h3>
      <div class="eglish-name">{{ 'Hot words'.toUpperCase() }}</div>
    </div>
    <div class="list" ref="list">
      <div
        class="list-item"
        v-for="(item, index) in dataList"
        :key="index"
        ref="listItem"
        :class="{ active: item.checked }"
        @click="selectKey(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import * as d3 from 'd3';
import { ref, onMounted, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import { getHighFrequencyWords } from '@/api/search';
const state = useStore();
const dataList = ref([]);
async function getDataList() {
  const res = await getHighFrequencyWords();
  dataList.value = res.map((i) => {
    return {
      position: 'right',
      type: 'hotWord',
      name: i,
      value: Math.random() * 15,
      checked: false,
    };
  });
  nextTick(() => {
    setWordOption();
  });
}
// // 选中导览词
// function selectKey(item) {
//   item.checked = true;
//   const data = {
//     position: item.position,
//     type: item.type,
//     name: item.name,
//   };
//   state.commit('ADD_QUERY', data);
// }
watch(
  () => state.getters.query,
  (val) => {
    console.log('更新了导览词', val);
    // chengeCheckedActive(val);
  },
  {
    deep: true,
    immediate: true,
  },
);
// // 检索词状态选中状态更新
// function chengeCheckedActive(val) {
//   dataList.value.forEach((item) => {
//     item.checked = false;
//   });
//   val.forEach((item) => {
//     // if (item.name)
//     const index = dataList.value.findIndex((item2) => {
//       return item2.name === item.name && item2.position === item.position && item.type === item2.type;
//     });
//     if (index !== -1) {
//       dataList.value[index].checked = true;
//     }
//   });
// }
const list = ref('');
onMounted(() => {
  getDataList();
});
// 设置热词的位置，大小，透明度
function setWordOption() {
  // 设置元素滚动时的动态的位置
  const sortList = dataList.value.sort((a, b) => {
    a.value - b.value;
  });
  const maxValue = sortList[0].value;
  const minValue = sortList[sortList.length - 1].value;
  // 比例尺
  const fontSizeScale = d3.scaleLinear().domain([minValue, maxValue]).range([20, 48]);
  const opacityScale = d3.scaleLinear().domain([minValue, maxValue]).range([0.2, 1]);
  const listItem = list.value.children;
  for (let i = 0; i < listItem.length; i++) {
    const fontSize = fontSizeScale(dataList.value[i].value);
    const opacity = opacityScale(dataList.value[i].value);
    const left = Math.random() * 200;
    const top = Math.random() * 400;
    if (dataList.value[i].value === maxValue) {
      // 最大词居中
      listItem[i].style.left = '200px';
      listItem[i].style.top = '200px';
      listItem[i].style.transform = 'translateX(-50%)';
    } else {
      listItem[i].style.left = left + 'px';
      listItem[i].style.top = top + 'px';
    }
    listItem[i].style.fontSize = fontSize + 'px';
    listItem[i].style.opacity = opacity;
  }
}
</script>

<style lang="scss" scoped>
.right-content {
  background: url('./img/bg_img_right.png') 0 6px no-repeat;
  position: absolute;
  top: 0;
  right: 280px;
  width: 641px;
  height: 100%;
  z-index: 13;
  .title {
    position: absolute;
    left: 227px;
    top: 97px;
    h3 {
      font-size: 50px;
      margin: 0;
      padding: 0;
    }
    .eglish-name {
      font-size: 15px;
      font-family: DIN-BlackItalic;
      font-style: italic;
      font-weight: 400;
      color: #7684be;
    }
    .list-btn {
      cursor: pointer;
      position: absolute;
      left: 205px;
      top: 20px;
      width: 24px;
      height: 24px;
      border: 1px solid #78abdb;
      border-radius: 4px;
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-top: 8px solid white;
        border-left: 6.5px solid rgba(255, 255, 255, 0);
        border-right: 6.5px solid rgba(255, 255, 255, 0);
      }
    }
  }
  .list {
    background-color: pink;
    position: absolute;
    top: 250px;
    height: 450px;
    margin-left: 209px;
    margin-top: 100px;
    .list-item {
      box-sizing: border-box;
      cursor: pointer;
      position: absolute;
      width: max-content;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
}
</style>
