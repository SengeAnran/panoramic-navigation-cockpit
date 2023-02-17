<template>
  <div class="atlas">
    <AtlasBall v-if="atlasType === '关系图谱'" />
    <AtlasMap v-else @showAll="showAll" :data="contrastData" />
    <div class="search-results">
      <div class="btn" @click="showRes()"></div>
      <div class="mask"></div>
      <div class="search-results-box" v-if="showSearchRes">
        <div class="atlas-switch">
          <div class="type-name theme-font-style">{{ atlasType }}</div>
          <div v-if="atlasType !== '关系图谱'" @click="changeAtlas('关系图谱')" class="icon-top icon"></div>
          <div v-else class="icon-bottom icon" @click="changeAtlas('对比图谱')"></div>
        </div>
        <div v-if="systemListSmall.length > 3" class="left-btn btn" @click="moveRight()"></div>
        <div v-if="systemListSmall.length > 3" class="right-btn btn" @click="moveLeft()"></div>
        <div class="atlas-items" ref="atlasItems">
          <div class="box">
            <div class="atlas-item" v-for="(item, index) in systemListSmall" :key="index">
              <SvgBox :data="item" :index="index" />
              <div class="system-name theme-font-style">{{ item.name }}</div>
              <input type="checkbox" v-model="item.check" @change="checkOne(item, index, true)" />
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
import SvgBox from './components/SvgBox/index';
import { ref, watch, reactive } from 'vue';
import { useStore } from 'vuex';
import { deepClone } from '@/utils';
import {
  animateX,
  delChildrenOnFirst,
} from '@/pages/Home/Center/components/Atlas/components/AtlasMap/ContrastSvgBox/constant';
import { initNodeTree } from './constants';
import { getGraphCompare, getGraphSystems } from '@/api/search';
// import router from '@/router';
const state = useStore();
const showSearchRes = ref(false);
watch(
  () => showSearchRes.value,
  function (nVal) {
    state.commit('SET_BOTTOM_OPACITY', nVal);
  },
);

const atlasType = ref('关系图谱');
// const systemList = ref([]);
const systemList = ref([]);
const systemListSmall = ref([]);
const contrastData = reactive({
  // 中间图谱展示数据
  name: ' ',
  children: [],
});
watch(
  () => systemList.value,
  (val) => {
    if (val.length > 0) {
      getSystemListSmall();
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
watch(
  () => state.getters.query,
  function (val) {
    console.log('ssss', val);
    getDataList();
  },
  {
    deep: true,
    immediate: true,
  },
);
// 获取检索结果
async function getDataList() {
  const data = {
    query: state.getters.query.map((i) => {
      return {
        theme: i.type,
        word: i.name,
      };
    }),
    mode: 'specific',
  };
  const res = await getGraphSystems(data);
  initNodeTree(res);
  systemList.value = res;
}
function getSystemListSmall() {
  contrastData.children = [];
  systemListSmall.value = [];
  for (let i = 0; i < systemList.value.length; i++) {
    const tree = deepClone(systemList.value[i]);
    delChildrenOnFirst(tree, 3);
    systemListSmall.value.push(tree);
  }
  moveStart();
}
function showAll() {
  checkOne('', '', true);
}
function changeAtlas(typeName) {
  atlasType.value = typeName;
  contrastData.children = [];
  systemListSmall.value.forEach((i) => {
    i.check = false;
  });
}
function showRes() {
  showSearchRes.value = !showSearchRes.value;
}
async function checkOne(item, index, click) {
  // 控制对比图谱只能选择两个进行对比
  if (
    atlasType.value === '对比图谱' &&
    systemListSmall.value.filter((i) => i.check).length > 2 &&
    (index || index === 0)
  ) {
    systemListSmall.value[index].check = false;
    return;
  }
  if (atlasType.value === '对比图谱') {
    // 对比图谱添加数据
    contrastData.children = [];
    if (systemListSmall.value.filter((i) => i.check).length === 2) {
      // 选择两个从接口获取数据
      const checkList = systemListSmall.value.filter((i) => i.check);
      state.commit('atlasMap/SET_COMPARISON_MAP_INFO', checkList);
      // router.push('/compareMap');
      const data = {
        systemA: checkList[0].name,
        systemB: checkList[1].name,
      };
      const res = await getGraphCompare(data);
      initNodeTree(res.systemANodes, true);
      initNodeTree(res.systemBNodes, true);
      initNodeTree(res.commonNodes, true, true);
      const systemA = {
        name: res.systemANodes[0].system || checkList[0].name,
        children: res.systemANodes,
      };
      const systemB = {
        name: res.systemBNodes[0].system || checkList[1].name,
        children: res.systemBNodes,
      };
      const sameNode = {
        name: '相同节点',
        children: [res.commonNodes],
      };
      contrastData.children = [systemA, systemB, sameNode];
    } else {
      // 单个使用已有的数据展示
      systemListSmall.value.forEach((item, index) => {
        if (item.check) {
          contrastData.children.push(deepClone(systemList.value[index]));
        }
      });
    }
    if (click) {
      state.commit('atlasMap/SET_SHOW_FIRST_TIME', true);
    }
  } else {
    console.log('关系图谱处理');
  }
}
const atlasItems = ref('');
let itemIndex = 0;
function moveStart() {
  itemIndex = 0;
  setTimeout(() => {
    atlasItems.value.scrollLeft = 0;
  });
}
function moveLeft() {
  // itemIndex = (itemIndex + 1) % (systemListSmall.value.length - 2);
  itemIndex = itemIndex + 1;
  if (itemIndex === systemListSmall.value.length - 2) {
    itemIndex = systemListSmall.value.length - 3;
  }
  animateX(atlasItems.value, itemIndex * 400);
}
function moveRight() {
  itemIndex--;
  if (itemIndex < 0) {
    // itemIndex = systemListSmall.value.length - 3;
    itemIndex = 0;
  }
  animateX(atlasItems.value, itemIndex * 400);
}
</script>

<style lang="scss" scoped>
.atlas {
  z-index: 13;
  position: absolute;
  top: 0;
  left: 920px;
  width: 1999px;
  //height: 100%;
  height: 961px;
  //background: pink;
  .search-results {
    position: absolute;
    bottom: -70px;
    left: 93px;
    .btn {
      position: absolute;
      top: -78px;
      //margin-bottom: 25px;
      cursor: pointer;
      width: 106px;
      height: 43px;
      background: url('./img/btn_bg.png') no-repeat;
      background-size: 100%;
    }
    .mask {
      position: absolute;
      width: calc(100% + 54px);
      height: 100%;
      background-color: #0e1b28;
      filter: blur(10px);
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
        //&::after {
        //  content: '';
        //  position: absolute;
        //  top: 50%;
        //  transform: translateY(-50%);
        //  right: -53px;
        //  display: inline-block;
        //  width: 3px;
        //  height: 86px;
        //  background: #90e1fd;
        //  opacity: 0.37;
        //}
      }
      .btn {
        position: absolute;
        top: 6px;
        width: 41px;
        height: 248px;
      }
      .left-btn {
        left: 435px;
        background: url('./img/left_btn.png') no-repeat;
      }
      .right-btn {
        right: -45px;
        background: url('./img/right_btn.png') no-repeat;
      }
      .atlas-items {
        //background-color: pink;
        position: relative;
        width: 1184px;
        overflow-x: scroll;
        overflow-y: hidden;
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
