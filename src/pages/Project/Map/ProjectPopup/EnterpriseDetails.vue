<template>
  <div class="company-popup">
    <div class="content">
      <h3 class="project-name">企业详情</h3>
      <div class="delimiter" />
      <div class="body"></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.company-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 860px;
  height: 852px;
  background: #091c35;
  border: 1px solid #46e9fe;
  border-radius: 10px;
  padding: 12px;
  .content {
    background: rgba(0, 21, 46, 0.8);
    box-shadow: inset 0px 0px 40px 0px #1d4d8d;
    border-radius: 10px;
    padding: 20px;
    padding-right: 50px;
    .project-name {
      font-size: 30px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #b2d2ff;
      line-height: 58px;
      text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
      margin: 0;
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
    .delimiter {
      height: 1px;
      margin: 10px 0;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #42c2d9 50%, rgba(255, 255, 255, 0) 100%);
    }
    .center-section {
      display: flex;
      margin: 16px 0;
      .item-box {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #00d8ff;
        display: flex;
        align-items: center;
        &:first-child {
          margin-right: 48px;
        }
        img {
          margin-right: 6px;
        }
      }
    }
    .body {
      display: flex;
      align-items: flex-start;
      .delimiter {
        margin: 0px 10px;
        width: 1px;
        flex: none;
        height: auto;
        align-self: stretch;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #42c2d9 50%, rgba(255, 255, 255, 0) 100%);
      }
      .companies {
        width: 572px;
        height: 410px;
        background: rgba(0, 21, 46, 0.8);
        box-shadow: 0px 11px 28px 2px rgba(16, 38, 70, 0.5), 0px 0px 40px 0px #1d4d8d;
      }
      .companies,
      .areas {
        flex: auto;
        .title {
          margin: 0;
          line-height: 1.5;
          text-align: center;
          font-size: 20px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          color: #b2d2ff;
          text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
          background: linear-gradient(
            90deg,
            rgba(78, 132, 186, 0) 0%,
            rgba(111, 169, 227, 0.99) 46%,
            rgba(78, 132, 186, 0.01) 99%
          );
        }
        .list {
          margin-top: 12px;
          max-height: 188px;
          overflow: auto;
          .item {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            line-height: 32px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
