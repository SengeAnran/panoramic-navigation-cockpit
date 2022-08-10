<template>
  <div class="atlas">
    <AtlasBall v-if="atlasType === '关系图谱'" />
    <AtlasMap v-else @showAll="showAll" :data="contrastData" />
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
import { ref, watch, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getRelationGraph } from '@/api/atlas';
import { deepClone } from '@/utils';
import { delChildrenOnFirst } from '@/pages/Home/Center/components/Atlas/components/AtlasMap/ContrastSvgBox/constant';
const state = useStore();
const showSearchRes = ref(false);
watch(
  () => showSearchRes.value,
  function (nVal) {
    state.commit('SET_BOTTOM_OPACITY', nVal);
  },
);
const atlasType = ref('关系图谱');
const systemList = ref([
  {
    name: '系统名称1',
    check: false,
    children: [
      {
        name: '节点名称1',
        children: [
          {
            same: true,
            name: '节点名称21',
          },
          {
            same: false,
            name: '节点名称22',
          },
          {
            same: true,
            name: '节点名称23',
            children: [
              {
                same: false,
                name: '节点名称31',
                children: [
                  {
                    same: false,
                    name: '节点名称42',
                  },
                ],
              },
            ],
          },
          {
            same: false,
            name: '节点名称24',
          },
        ],
      },
    ],
  },
  {
    name: '系统名称2',
    check: false,
    children: [
      {
        same: true,
        name: '节点名称1',
        children: [
          {
            same: false,
            name: '节点名称21',
          },
          {
            same: true,
            name: '节点名称22',
          },
          {
            same: false,
            name: '节点名称23',
            children: [
              {
                same: true,
                name: '节点名称31',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: '系统名称3',
    check: false,
    same: true,
    children: [
      {
        name: '节点名称1',
        same: true,
        children: [
          {
            name: '节点名称21',
            same: true,
          },
          {
            name: '节点名称22',
            same: true,
          },
          {
            name: '节点名称23',
            same: true,
            children: [
              {
                name: '节点名称31',
                same: true,
                children: [
                  {
                    name: '节点名称42',
                    same: true,
                    children: [
                      {
                        name: '节点名称52',
                        same: true,
                        // children: [
                        //   {
                        //     name: '节点名称52',
                        //     children: [
                        //       {
                        //         name: '节点名称52',
                        //         // children: [
                        //         //   {
                        //         //     name: '节点名称52',
                        //         //     children: [
                        //         //       {
                        //         //         name: '节点名称52',
                        //         //         children: [
                        //         //           {
                        //         //             name: '节点名称52',
                        //         //           },
                        //         //         ],
                        //         //       },
                        //         //     ],
                        //         //   },
                        //         // ],
                        //       },
                        //     ],
                        //   },
                        // ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: '节点名称24',
            same: true,
          },
        ],
      },
    ],
  },
]);
const systemListSmall = ref([]);
const contrastData = reactive({
  name: '公积金',
  children: [],
});
// const contrastDataClone = reactive({
//   name: '公积金',
//   children: [],
// });
onMounted(() => {
  getSystemListSmall();
});
function getSystemListSmall() {
  for (let i = 0; i < systemList.value.length; i++) {
    const tree = deepClone(systemList.value[i]);
    delChildrenOnFirst(tree, 5);
    systemListSmall.value.push(tree);
  }
  console.log(systemListSmall.value);
}
function showAll() {
  console.log('展示全部');
  checkOne();
}
function changeAtlas(typeName) {
  atlasType.value = typeName;
  contrastData.children = [];
  systemListSmall.value.forEach((i) => {
    i.check = false;
  });
}
async function showRes() {
  showSearchRes.value = !showSearchRes.value;
  if (showSearchRes.value) {
    const res = await getRelationGraph();
    // systemList.value = res;
    console.log(res);
  }
}
function checkOne(item, index, click) {
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
    contrastData.children = [];
    systemListSmall.value.forEach((item, index) => {
      if (item.check) {
        contrastData.children.push(deepClone(systemList.value[index]));
      }
    });
    if (click) {
      state.commit('atlasMap/SET_SHOW_FIRST_TIME', true);
    }
  } else {
    console.log('关系图谱处理');
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
