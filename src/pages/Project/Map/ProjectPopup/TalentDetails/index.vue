<template>
  <div class="company-popup">
    <div class="content">
      <div class="title">
        <h3 class="project-name theme-font-style">人才详情</h3>
        <div class="back theme-font-style" @click="$emit('closeView')">返回</div>
      </div>
      <div class="delimiter" />
      <div class="body">
        <div class="detail-info">
          <div class="self-info">
            <div class="left">
              <div class="header-logo">
                <img src="../header.png" alt="" />
              </div>
              <div class="info">
                <div class="name">
                  <span class="theme-font-style">王雅雅</span>
                  <div class="tip blue-text">教授</div>
                </div>
                <div class="blue-text">单位/学校</div>
                <div class="white-text">专业技术职务</div>
              </div>
            </div>
            <div class="right">
              <table>
                <thead>
                  <tr>
                    <td>相关论文</td>
                    <td>相关专利</td>
                    <td>相关项目</td>
                    <td>获奖情况</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><LabelInfo :num="999" unit="篇" :valueSize="18" /></td>
                    <td><LabelInfo :num="999" unit="个" :valueSize="18" /></td>
                    <td><LabelInfo :num="999" unit="个" :valueSize="18" /></td>
                    <td><LabelInfo :num="999" unit="个" :valueSize="18" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="item-text">
            <div class="white-text">科技创新活跃度:</div>
            <LabelInfo class="text-num" :num="99.9" :valueSize="33" />
          </div>
          <div class="item-text">
            <div class="white-text">参与项目:</div>
            <div class="blue-text can-click" @click="showProject">项目名称可能会很长最起码预留20字</div>
            <div class="blue-text can-click" @click="showProject">项目名称可能会很长最起码预留20字</div>
          </div>
          <div class="item-text">
            <div class="white-text">人物背景:</div>
            <div class="white-text">
              这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字这是一段背景介绍文字。
            </div>
          </div>
        </div>
        <div class="delimiter" />
        <div class="lists">
          <theme-table class="table-content" :columns="tableColumns1" :data-source="dataList1" height="160">
          </theme-table>
          <theme-table class="table-content" :columns="tableColumns2" :data-source="dataList1" height="160">
          </theme-table>
          <theme-table class="table-content" :columns="tableColumns3" :data-source="dataList1" height="160">
          </theme-table>
        </div>
        <div class="delimiter" />
        <div class="chart-list">
          <HotWords />
          <FrontiersField />
          <DomainRelevance />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import HotWords from './HotWords';
import FrontiersField from './FrontiersField';
import DomainRelevance from './DomainRelevance';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const emit = defineEmits(['closeView']);
const tableColumns1 = [
  { label: '一级领域', dataIndex: 'name' },
  { label: '排名', dataIndex: 'value' },
];
const tableColumns2 = [
  { label: '二级领域', dataIndex: 'name' },
  { label: '排名', dataIndex: 'value' },
];
const tableColumns3 = [
  { label: '三级领域', dataIndex: 'name' },
  { label: '排名', dataIndex: 'value' },
];
const dataList1 = ref([
  {
    name: '领域名称',
    value: 20,
  },
  {
    name: '领域名称',
    value: 20,
  },
  {
    name: '领域名称',
    value: 20,
  },
  {
    name: '领域名称',
    value: 20,
  },
  {
    name: '领域名称',
    value: 20,
  },
]);
function showProject() {
  store.commit('project/SET_PROJECT_INFO', { projectId: 1 });
  emit('closeView');
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
      .detail-info {
        margin-bottom: 20px;
        .self-info {
          display: flex;
          justify-content: space-between;
          .left {
            display: flex;
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
              .name {
                margin-top: 16px;
                display: flex;
                span {
                  font-size: 30px;
                  font-family: YouSheBiaoTiHei;
                  font-weight: 400;
                  color: #b2d2ff;
                }
                .tip {
                  margin-left: 15px;
                  padding: 1px 16px;
                  background: rgba(0, 216, 255, 0.2);
                  border-radius: 4px;
                  margin-top: 0;
                }
              }
              .blue-text,
              .white-text {
                margin-top: 24px;
              }
            }
          }
          .right {
            table {
              border-spacing: 0px;
              thead {
                height: 48px;
                background: rgba(0, 216, 255, 0.2);
                tr > td {
                  font-size: 16px;
                  border: 0;
                  padding: 0 14px;
                }
              }
              tbody {
                border-spacing: 1px;
                tr {
                  td {
                    height: 56px;
                    border: 1px solid rgba(0, 216, 255, 0.2);
                    &:nth-child(n + 2) {
                      border-left: 0;
                    }
                    div {
                      justify-content: space-around;
                    }
                  }
                }
              }
            }
          }
        }
        .item-text {
          display: flex;
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
          .blue-text {
            margin-right: 24px;
          }
          & div:first-child {
            margin-right: 12px;
            white-space: nowrap;
          }
        }
      }
      .lists {
        display: flex;
        justify-content: space-between;
        .table-content {
          width: 254px;
        }
      }
      .chart-list {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
