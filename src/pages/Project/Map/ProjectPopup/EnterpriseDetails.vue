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
          <div class="self-info">
            <div class="left">
              <div class="header-logo">
                <img src="./header.png" alt="" />
              </div>
              <div class="info">
                <div class="name">
                  <span class="theme-font-style">王雅雅</span>
                  <div class="tip">教授</div>
                </div>
                <div class="blue-text">单位/学校</div>
                <div class="white-text">专业技术职务</div>
              </div>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>
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
          background: url('./back.png') no-repeat;
          background-size: 100% 100%;
        }
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
      .detail-info {
        .self-info {
          display: flex;
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
                display: flex;
                span {
                  font-size: 30px;
                  font-family: YouSheBiaoTiHei;
                  font-weight: 400;
                  color: #b2d2ff;
                }
                .tip {
                }
              }
            }
          }
        }
      }
      .delimiter {
        margin: 0px 10px;
        width: 1px;
        flex: none;
        height: auto;
        align-self: stretch;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #42c2d9 50%, rgba(255, 255, 255, 0) 100%);
      }
    }
  }
}
</style>
