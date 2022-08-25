<template>
  <div class="right-content">
    <div class="title">
      <h3 class="theme-font-style">高频词导览</h3>
      <div class="eglish-name">{{ 'High frequency word Guide'.toUpperCase() }}</div>
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
        <div class="name">
          <div class="name-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
      type: 'heightWord',
      name: i.label,
      checked: false,
    };
  });
  nextTick(() => {
    setPosition();
  });
}
// 选中导览词
function selectKey(item) {
  item.checked = true;
  const data = {
    position: item.position,
    type: item.type,
    name: item.name,
  };
  state.commit('ADD_QUERY', data);
}
watch(
  () => state.getters.query,
  (val) => {
    chengeCheckedActive(val);
  },
  {
    deep: true,
    immediate: true,
  },
);
// 检索词状态选中状态更新
function chengeCheckedActive(val) {
  dataList.value.forEach((item) => {
    item.checked = false;
  });
  val.forEach((item) => {
    // if (item.name)
    const index = dataList.value.findIndex((item2) => {
      return item2.name === item.name && item2.position === item.position && item.type === item2.type;
    });
    if (index !== -1) {
      dataList.value[index].checked = true;
    }
  });
}
const list = ref('');
const itemHeight = 99.5;
onMounted(() => {
  getDataList();
  list.value.addEventListener('scroll', function () {
    setPosition();
  });
});
function setPosition() {
  // 设置元素滚动时的动态的位置
  const listItem = list.value.children;
  for (let i = 0; i < listItem.length; i++) {
    // 圆的方程式：（x-240.97）^(2)+(y+856)^(2) = 947^(2)
    const x = i * itemHeight - list.value.scrollTop;
    if (x < -122) {
      continue;
    } else if (x > 832) {
      break;
    }
    let marginLeft = Math.abs(Math.pow(947 * 947 - Math.pow(x - 240.97, 2), 0.5) - 854);
    marginLeft = x > 652.309 ? -marginLeft : marginLeft;
    listItem[i].style.marginLeft = marginLeft + 'px';
  }
}
</script>

<style lang="scss" scoped>
.right-content {
  //background-color: pink;
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
    //.option-list {
    //  z-index: 3;
    //  position: absolute;
    //  top: 61px;
    //  width: 230px;
    //  background: #0f203c;
    //  border: 1px solid #6c99c7;
    //  box-shadow: 0px 0px 24px 0px rgba(64, 87, 125, 0.78);
    //  opacity: 0.8;
    //  border-radius: 10px;
    //  //border-image: linear-gradient(-49deg, #6c99c7, #ffffff) 10 10;
    //  .option-item {
    //    cursor: pointer;
    //    position: relative;
    //    height: 54px;
    //    text-align: center;
    //    line-height: 54px;
    //    font-size: 24px;
    //    font-family: Source Han Sans CN;
    //    font-weight: 400;
    //    color: #ffffff;
    //    opacity: 0.8;
    //  }
    //  .option-item:nth-child(n + 1)::before {
    //    position: absolute;
    //    left: 0;
    //    display: inline-block;
    //    content: '';
    //    height: 1px;
    //    width: 228px;
    //    background: linear-gradient(
    //      -90deg,
    //      rgba(31, 57, 86, 0.1) 0%,
    //      rgba(122, 191, 255, 0.97) 49%,
    //      rgba(34, 61, 93, 0.1) 100%
    //    );
    //  }
    //}
  }
  .list {
    position: absolute;
    top: 250px;
    height: 756px;
    //width: 550px;
    margin-left: 72px;
    padding-left: 40px;
    overflow-y: scroll;
    overflow-x: hidden;
    .list-item {
      //background-color: pink;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      //min-width: 242px;
      width: max-content;
      padding-right: 29px;
      height: 56px;
      line-height: 56px;
      margin-bottom: 43.5px;
      padding-left: 44px;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 3px;
        top: 29px;
        width: 35px;
        height: 1px;
        background: url('./img/line_icon.png') no-repeat;
      }
      //transition: all linear 500ms;
      .name {
        .name-text {
          font-family: YouSheBiaoTiHei;
          color: #4f79a0;
          font-weight: 400;
          font-size: 36px;
          //text-align: center;
          //text-indent: 44px;
        }
      }

      &.active {
        background: url('./img/bottom_icon.png') no-repeat center;
        background-size: 100% 56px;
        .name {
          .name-text {
            color: #f9f9f9;
            background: linear-gradient(0deg, #b2d2ff 0%, #f9f9f9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          left: -26px;
          top: 29px;
          width: 55px;
          height: 55px;
          background: url('./img/point_icon.png') no-repeat;
        }
      }
    }
  }
}
</style>
