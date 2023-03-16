<template>
  <div class="left-content">
    <div class="mask"></div>
    <div class="title">
      <h3 class="theme-font-style">{{ seletType.name }}</h3>
      <div class="eglish-name">{{ seletType.eglishName }}</div>
      <div class="list-btn" @click="showOption = !showOption">
        <div class="icon"></div>
      </div>
      <div class="option-list" v-if="showOption">
        <div class="option-item" v-for="(item, index) in optionType" :key="index" @click="changeType(index)">
          {{ item.name }}
        </div>
      </div>
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
        <img v-if="item.checked" :src="item.activeImgUrl" alt="" />
        <img v-else :src="item.imgUrl" alt="" />
        <div class="name">
          <div class="name-text">{{ item.name }}</div>
          <div class="name-eglish" v-text="item.eglishName.toUpperCase()"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import * as d3 from 'd3';
import { ref, reactive, onMounted, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import { getDirectoryList } from '@/api/search';
const state = useStore();
const seletType = reactive({
  name: '',
  eglishName: '',
});
const showOption = ref(false);
const optionType = ref([
  // {
  //   name: '业务导览',
  //   eglishName: 'BUSINESS GUIDE',
  // },
  // {
  //   name: '技术导览',
  //   eglishName: 'technology GUIDE'.toUpperCase(),
  // },
  // {
  //   name: '地域导览',
  //   eglishName: 'region GUIDE'.toUpperCase(),
  // },
]);
// 改变导览类型
function changeType(index) {
  seletType.name = optionType.value[index].name;
  seletType.eglishName = optionType.value[index].eglishName;
  showOption.value = false;
  getDataList();
}
onMounted(() => {
  getDataList();
  getDataAll();
  list.value.addEventListener('scroll', function () {
    setPosition();
  });
});
function getType() {
  getDirectoryList({}).then((res) => {
    if (res && res.length > 0) {
      optionType.value = res.map((i) => {
        return {
          name: i.name,
          eglishName: '',
        };
      });
      seletType.name = optionType.value[0].name;
      seletType.eglishName = optionType.value[0].eglishName;
      getDataList();
    }
  });
}
getType();
// const activeIndex = ref(-2);
const dataList = ref([
  // {
  //   name: '教育',
  //   eglishName: 'education'.toUpperCase(),
  //   imgUrl: require('./img/icon_jy.png'),
  //   activeImgUrl: require('./img/icon_jy_active.png'),
  // },
]);
// 一次性获取列表数据
async function getDataAll() {
  const res = await getDirectoryList();
  console.log(res);
}
// 获取列表数据
async function getDataList() {
  let res;
  const data = {
    dimNames: [seletType.name],
  };
  res = await getDirectoryList(data);
  dataList.value = res[0].map((i) => {
    return {
      name: i.name,
      checked: false,
      position: 'left',
      type: seletType.name,
      eglishName: ''.toUpperCase(),
      imgUrl: require('./img/icon_jy.png'),
      activeImgUrl: require('./img/icon_jy_active.png'),
    };
  });
  nextTick(() => {
    setPosition();
    chengeCheckedActive(state.getters.query);
  });
}

// 选中导览词
function selectKey(item) {
  // activeIndex.value = index;
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
const itemHeight = 122;
function setPosition() {
  // 设置元素滚动时的动态的位置
  // 圆的方程式：（x-268.97）^(2)+(y-1025)^(2) = 947^(2)
  const listItem = list.value.children;
  for (let i = 0; i < listItem.length; i++) {
    const x = i * itemHeight - list.value.scrollTop;
    // 优化视野外的list不用设置计算
    if (x < -122) {
      continue;
    } else if (x > 732) {
      break;
    }
    const marginLeft = Math.abs(Math.pow(947 * 947 - Math.pow(x - 268.97, 2), 0.5) - 1025);
    listItem[i].style.marginLeft = marginLeft + 'px';
  }
}
</script>

<style lang="scss" scoped>
.left-content {
  z-index: 10;
  background: url('./img/bg_img_left.png') no-repeat;
  position: absolute;
  top: 0;
  left: 280px;
  width: 640px;
  height: 100%;
  .title {
    position: absolute;
    left: 145px;
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
    .option-list {
      z-index: 3;
      position: absolute;
      top: 61px;
      width: 230px;
      background: #0f203c;
      border: 1px solid #6c99c7;
      box-shadow: 0px 0px 24px 0px rgba(64, 87, 125, 0.78);
      opacity: 0.8;
      border-radius: 10px;
      //border-image: linear-gradient(-49deg, #6c99c7, #ffffff) 10 10;
      .option-item {
        cursor: pointer;
        position: relative;
        height: 54px;
        text-align: center;
        line-height: 54px;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.8;
      }
      .option-item:nth-child(n + 1)::before {
        position: absolute;
        left: 0;
        display: inline-block;
        content: '';
        height: 1px;
        width: 228px;
        background: linear-gradient(
          -90deg,
          rgba(31, 57, 86, 0.1) 0%,
          rgba(122, 191, 255, 0.97) 49%,
          rgba(34, 61, 93, 0.1) 100%
        );
      }
    }
  }
  .list {
    position: absolute;
    top: 250px;
    height: 752px;
    width: 569px;
    //overflow: hidden;
    overflow-y: scroll;
    overflow-x: hidden;
    .list-item {
      cursor: pointer;
      position: relative;
      //position: absolute;
      padding-right: 10px;
      width: 340px;
      height: 122px;
      display: flex;
      justify-content: space-between;

      //transition: all linear 500ms;
      img {
        width: 81px;
        height: 79px;
      }
      .name {
        padding-top: 2px;
        .name-text {
          font-family: YouSheBiaoTiHei;
          color: #7987c1;
          font-weight: 400;
          font-size: 44px;
          text-align: right;
        }
        .name-eglish {
          font-size: 18px;
          font-family: DIN-BoldItalicAlt;
          font-weight: 400;
          color: #7987c1;
          font-style: italic;
          //line-height: 58px;
        }
      }

      &.active {
        background: url('./img/bottom_icon.png') no-repeat center 235%;
        background-size: 100%;
        .name {
          .name-text {
            color: #f9f9f9;
            background: linear-gradient(0deg, #b2d2ff 0%, #f9f9f9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 48px;
          }
          .name-eglish {
          }
        }
        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          right: -27px;
          top: 18px;
          width: 8px;
          height: 8px;
          background: #4be8f5;
          border-radius: 8px;
          border: 3px solid #1b2131;
          box-shadow: 0 0 5px 5px #3b76b1;
        }
      }
    }
  }
}
</style>
