<template>
  <div class="company-popup">
    <div class="content" v-loading="loading">
      <div class="title">
        <h3 class="project-name theme-font-style">机构详情</h3>
        <div v-if="!props.hideBack" class="back theme-font-style" @click="$emit('closeView')">返回</div>
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
            <div class="item-text">
              <div class="white-text wrap three-line" :title="detailData.detail">
                {{ detailData.detail }}
              </div>
            </div>
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
          <ResearchFieldRank v-if="activeIndex === 0" />
          <!--          <IndChainPosition v-if="activeIndex === 1" />-->
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
// import IndChainPosition from './IndChainPosition';
import ResearchFieldRank from './ResearchFieldRank';
import { useStore } from 'vuex';
import { getSchoolInfo } from '@/api/project';
const headerImg = require('../header2.png');
const props = defineProps({
  hideBack: {
    type: Boolean,
    default: false,
  },
});
const store = useStore();
const emit = defineEmits(['closeView']);
// const btns = ['研究领域排名', '研究领域图谱'];
const btns = ['研究领域排名'];
const activeIndex = ref(0);
const popId = computed(() => {
  return store.getters.popId;
});
const loading = ref(true);
const detailData = ref({});
watch(
  () => popId.value,
  (val) => {
    if (val) {
      getData();
    }
  },
);
function getData() {
  loading.value = true;
  getSchoolInfo(popId.value).then((res) => {
    detailData.value = res;
    loading.value = false;
  });
}
getData();
function show(index) {
  activeIndex.value = index;
}
function showProject(item) {
  if (item.id) {
    store.commit('projectMap/SET_PROJECT_INFO', { projectId: item.id });
    emit('closeView');
  }
}
onBeforeUnmount(() => {
  store.commit('projectMap/SET_PROJECT_INFO', { projectId: undefined });
});
</script>
<style lang="scss" scoped>
.three-line {
  line-break: anywhere;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
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
          width: calc(100% - 149px);
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
        & .wrap {
          white-space: pre-wrap !important;
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
