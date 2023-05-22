<template>
  <div class="company-popup">
    <div class="content">
      <div class="title">
        <h3 class="project-name theme-font-style">企业详情</h3>
        <div class="back theme-font-style" @click="$emit('closeView')">返回</div>
      </div>
      <div class="delimiter" />
      <div class="body">
        <div class="detail-info">
          <div class="header-logo">
            <img :src="detailData.logoUrl ? detailData.logoUrl : headerImg" alt="" />
          </div>
          <div class="info">
            <div class="name">
              <span class="theme-font-style">{{ detailData.name }}</span>
            </div>
            <div class="item-text">
              <div class="white-text">科技创新活跃度:</div>
              <LabelInfo class="text-num" :num="(detailData.innovationIndex || 0) - 0" :valueSize="33" />
            </div>
            <!--            <div class="flex tips">-->
            <!--              <div v-for="(item, index) in tipList" :key="index" class="tip blue-text">{{ item }}</div>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="item-text">
          <div class="white-text">参与项目:</div>
          <div
            v-for="item in detailData.addProjects"
            :key="item.name"
            class="blue-text can-click"
            @click="showProject(item)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="delimiter" />
        <section class="industry-sec">
          <IndustryRanking :dataList="rankData" />
          <IndustrialDistribution :dataObj="distributionData" />
        </section>
        <div class="delimiter" />
        <section class="tow-chart">
          <div class="btns">
            <div
              class="btn"
              v-for="(item, index) in btns"
              :key="index"
              :class="{ active: activeIndex === index }"
              @click="show(index)"
            >
              {{ item }}
            </div>
          </div>
          <IndChainPosition v-if="activeIndex === 0" :dataObj="positionData" />
          <!--          <TechLayout v-if="activeIndex === 1" />-->
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import IndustryRanking from './IndustryRanking';
import IndustrialDistribution from './IndustrialDistribution';
import IndChainPosition from './IndChainPosition';
import { useStore } from 'vuex';
import { getEnterprise, getTndustryInfo } from '@/api/project';
import * as d3 from 'd3';
const headerImg = require('../header.png');
const store = useStore();
const emit = defineEmits(['closeView']);
const popId = computed(() => {
  return store.getters.popId;
});
const detailData = ref({});
const rankData = ref([]);
const distributionData = ref([]);
const positionData = ref({});
watch(
  () => popId.value,
  (val) => {
    if (val) {
      getData();
    }
  },
);

function getData() {
  getEnterprise(popId.value).then((res) => {
    detailData.value = res;
  });
  getTndustryInfo(popId.value).then((res) => {
    rankData.value = res.industryRank.map((i) => {
      return {
        name: i.chanye,
        value: i.quanguo,
      };
    });
    distributionData.value.dataname = res.industryRadarChart.map((i) => i.chanye);
    distributionData.value.value = res.industryRadarChart.map((i) => i.count);
    positionData.value = initForceData(res.industrialChain);
    console.log(positionData.value);
    // detailData.value = res;
  });
}

/**
 * 初始化力导图数据
 * @param data
 * return {data, categories, links}
 */

function initForceData(data) {
  const obj = {
    name: '产业',
    trueName: '产业',
    category: '产业',
    id: '99999',
    children: [],
    symbolSize: 100, //图形大小
  };
  obj.children = data || [];
  // obj.children.forEach((i) => {
  //   i.children = [];
  // });
  const categories = data.map((i) => {
    return {
      name: i.name,
    };
  });
  data.forEach((i) => treeAddType(i, i.name));
  const root = d3.hierarchy(obj);
  const nodesData = root.descendants().map((i) => {
    return {
      // id: i.data.id - 0,'
      draggable: true, // 是否可以拖拽，默认false
      name: i.data.id,
      trueName: i.data.name,
      category: i.data.category,
      number: i.data.id,
      symbolSize: 50, //图形大小
    };
  });
  // 节点去重根据id（name属性）
  const sameArr = [];
  nodesData.forEach((i, index) => {
    const indexNum = nodesData.findIndex((j, jndex) => {
      return j.name === i.name && jndex > index;
    });
    if (indexNum !== -1) {
      // console.log(nodesData[indexNum], nodesData[index], indexNum, index);
      sameArr.unshift(indexNum);
    }
  });
  // console.log(' sameArr', sameArr);
  sameArr.forEach((i) => {
    nodesData.splice(i, 1);
  });
  const links = root.links().map((i) => {
    return {
      source: i.source.data.id,
      target: i.target.data.id,
    };
    // return {
    //   source: i.source.data.name,
    //   target: i.target.data.name,
    // };
  });
  return { data: nodesData, categories, links };
}

/**
 * 给树节点加类型
 * @param node
 * @param type
 */
function treeAddType(node, type) {
  node.category = type;
  if (node.children && node.children.length > 0) {
    node.children.forEach((i) => {
      treeAddType(i, type);
    });
  }
}
getData();
// const tipList = ref(['高新技术企业', '高新技术企业', '高新技术企业', '高新技术企业']);
// const btns = ['产业链定位', '技术创新布局'];
const btns = ['产业链定位'];
const activeIndex = ref(0);
function show(index) {
  activeIndex.value = index;
}
function showProject(item) {
  if (item.id) {
    store.commit('projectMap/SET_PROJECT_INFO', { projectId: item.id });
    emit('closeView');
  }
}
</script>
<style lang="scss" scoped>
.can-click {
  cursor: pointer;
}
.blue-text {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #00d8ff;
}
.flex {
  display: flex;
}
.white-text {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
}
.company-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 860px;
  //height: 852px;
  background: #091c35;
  border: 1px solid #46e9fe;
  border-radius: 10px;
  //padding: 12px;
  .content {
    background: rgba(0, 21, 46, 0.8);
    box-shadow: inset 0px 0px 40px 0px #1d4d8d;
    border-radius: 10px;
    padding: 20px;
    padding-right: 50px;
    .title {
      display: flex;
      .project-name {
        font-size: 30px;
        line-height: 58px;
        margin: 0 23px 0 0;
        white-space: nowrap;
        padding-left: 12px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -50%);
          width: 3px;
          height: 22px;
          background: #46e9fe;
        }
      }
      .back {
        cursor: pointer;
        position: relative;
        padding-left: 21px;
        font-size: 18px;
        line-height: 58px;
        &:before {
          position: absolute;
          left: 3px;
          top: 22px;
          content: '';
          display: block;
          width: 17px;
          height: 16px;
          background: url('../back.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .delimiter {
      height: 1px;
      margin: 10px 0;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #42c2d9 50%, rgba(255, 255, 255, 0) 100%);
    }
    .body {
      .delimiter {
        margin: 16px 0;
      }
      .detail-info {
        display: flex;
        margin-top: 24px;
        .header-logo {
          width: 144px;
          height: 144px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .info {
          margin-left: 15px;
          margin-top: 16px;
          .name {
            display: flex;
            span {
              font-size: 30px;
              font-family: YouSheBiaoTiHei;
              font-weight: 400;
              color: #b2d2ff;
            }
          }
          .tips {
            margin-top: 24px;
          }
          .tips .tip {
            margin-right: 16px;
            padding: 1px 16px;
            background: rgba(0, 216, 255, 0.2);
            border-radius: 4px;
            margin-top: 0;
          }
        }
      }
      .item-text {
        display: flex;
        flex-wrap: wrap;
        margin-top: 24px;
        align-items: baseline;
        &:nth-of-type(2) {
          margin-top: 15px;
        }
        .text-num {
          &::v-deep .RollNum-root {
            line-height: 1;
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            color: #f9f9f9 !important;
            background: linear-gradient(0deg, #b2d2ff 0%, #f9f9f9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        & div:first-child {
          margin-right: 12px;
          white-space: nowrap;
        }
        .blue-text {
          margin-right: 24px;
        }
      }
      .industry-sec {
        display: flex;
        justify-content: space-between;
      }
      .tow-chart {
        .btns {
          display: flex;
          margin-bottom: 16px;
          .btn {
            cursor: pointer;
            margin-right: 8px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            height: 32px;
            line-height: 32px;
            border-radius: 16px;
            border: 1px solid #00d8ff;
            color: #00d8ff;
            padding: 0 15px;
            &.active {
              background: #00d8ff;
              color: #061830;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
