<template>
  <div class="hot-words">
    <div class="title-name">研究热词：</div>
    <div class="list" ref="list">
      <div class="list-item" v-for="(item, index) in dataList" :key="index" ref="listItem">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import * as d3 from 'd3';
import { getResearchWords } from '@/api/project';
import { useStore } from 'vuex';
const store = useStore();
const popId = computed(() => {
  return store.getters.popId;
});
watch(
  () => popId.value,
  (val) => {
    if (val) {
      nextTick(() => {
        getData();
      });
    }
  },
);

const dataList = ref(
  [],
  // [...new Array(15).keys()].map((i, index) => {
  //   return {
  //     name: '词' + index,
  //     value: Math.random() * 15,
  //   };
  // }),
);
const list = ref('');
async function getData() {
  const data = {
    id: popId.value,
  };
  const res = await getResearchWords(data);
  if (res && Array.isArray(res)) {
    dataList.value = res
      .map((i) => {
        return {
          name: i.name,
          value: Math.random() * 15,
        };
      })
      .slice(0, 50);
  }

  nextTick(() => {
    setWordOption();
  });
}
getData();
// 设置热词的位置，大小，透明度
function setWordOption() {
  // 设置元素滚动时的动态的位置
  const sortList = dataList.value.sort((a, b) => a.value - b.value);
  if (!sortList[0]) return;
  const maxValue = sortList[0]?.value;
  const minValue = sortList[sortList.length - 1].value;
  // console.log(sortList, maxValue, minValue);
  // 比例尺
  const fontSizeScale = d3.scaleLinear().domain([minValue, maxValue]).range([12, 28]);
  const opacityScale = d3.scaleLinear().domain([minValue, maxValue]).range([0.2, 1]);
  const listItem = list.value.children;
  for (let i = 0; i < listItem.length; i++) {
    const fontSize = fontSizeScale(dataList.value[i].value);
    const opacity = opacityScale(dataList.value[i].value);
    const left = Math.random() * 224;
    const top = Math.random() * 138;
    if (dataList.value[i].value === maxValue) {
      // 最大词居中
      listItem[i].style.left = '125px';
      listItem[i].style.top = '82px';
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
.title-name {
  margin-bottom: 12px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.list {
  position: relative;
  background-color: rgba(15, 50, 91, 0.3);
  width: 254px;
  height: 168px;
  overflow: hidden;
  .list-item {
    line-height: 1;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    width: max-content;
    font-family: PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
}
</style>
