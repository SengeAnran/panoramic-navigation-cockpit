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
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      >
        <div class="name">
          <div class="name-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(1);
const dataList = ref([
  {
    name: '教育',
  },
  {
    name: '医疗',
  },
  {
    name: '交通',
  },
  {
    name: '养老',
  },
  {
    name: '治安',
  },
  {
    name: '人社',
  },
  {
    name: '教育',
  },
  {
    name: '医疗',
  },
  {
    name: '交通',
  },
  {
    name: '养老',
  },
  {
    name: '治安',
  },
  {
    name: '人社',
  },
]);

// function posStyle(i) {
//   const position = [
//     {
//       marginLeft: '117px',
//       // top: '0',
//     },
//     {
//       marginLeft: '89px',
//       // top: '122px',
//     },
//     {
//       marginLeft: '78px',
//       // top: '244px',
//     },
//     {
//       marginLeft: '83px',
//       // top: '366px',
//     },
//     {
//       marginLeft: '104px',
//       // top: '488px',
//     },
//     {
//       marginLeft: '142px',
//       // top: '610px',
//     },
//   ];
//   const len = position.length;
//   let resPos = {
//     marginLeft: '143px',
//   };
//   if (i < len) {
//     resPos = position[i];
//   }
//
//   return resPos;
// }
const list = ref('');
// const itemHeight = 122;
// onMounted(() => {
//   setPosition();
//   list.value.addEventListener('scroll', function () {
//     setPosition();
//   });
// });
// function setPosition() {
//   // 设置元素滚动时的动态的位置
//   const listItem = list.value.children;
//   for (let i = 0; i < listItem.length; i++) {
//     const x = i * itemHeight - list.value.scrollTop;
//     const marginLeft = Math.abs(Math.pow(947 * 947 - Math.pow(x - 268.97, 2), 0.5) - 1025);
//     listItem[i].style.marginLeft = marginLeft + 'px';
//   }
// }
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
    height: 736px;
    width: 550px;
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
        //background: url('./img/bottom_icon.png') no-repeat center 235%;
        //background-size: 100%;
        .name {
          .name-text {
            color: #f9f9f9;
            background: linear-gradient(0deg, #b2d2ff 0%, #f9f9f9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .name-eglish {
          }
        }
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          left: -27px;
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
