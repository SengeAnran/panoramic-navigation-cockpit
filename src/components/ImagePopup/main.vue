<template>
  <div class="image-popup-wraper backdrop" @click="handleClose">
    <BaseIcon class="close-button" icon="icon-close" @click="handleClose" />
    <div class="image-popup-content" @click.stop>
      <div class="swiper-images-content swiper" v-if="srcs.length > 1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(src, index) in srcs" :key="index">
            <div class="slide-image">
              <img :src="src" />
            </div>
          </div>
        </div>
      </div>
      <img class="image" :src="srcs && srcs[0]" v-if="srcs.length === 1" />
    </div>
    <!-- Add Arrows -->
    <div id="image-prev" class="swiper-button-prev" @click.stop v-if="srcs.length > 1"></div>
    <div id="image-next" class="swiper-button-next" @click.stop v-if="srcs.length > 1"></div>
  </div>
</template>
<script>
import { ref, onMounted, nextTick, computed, onBeforeUnmount, defineComponent } from 'vue';
import eventHub from './eventHub.js';
import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper/swiper-bundle.esm'; //引入swiper依赖

export default defineComponent({
  emits: ['close'],
  setup(props) {
    // esc 事件监听
    function listenerEsc(e) {
      if (e.keyCode === 27) {
        eventHub.$emit('close');
      }
    }
    function handleClose() {
      eventHub.$emit('close');
    }

    const swiperOption = computed(() => {
      return {
        direction: 'horizontal', // vertical
        speed: 500, // 轮播速度
        grabCursor: true, // 鼠标time 变成手掌效果
        initialSlide: initialSlide.value || 0,
        loop: false,
        autoplay: false,
        navigation: {
          nextEl: '#image-next.swiper-button-next',
          prevEl: '#image-prev.swiper-button-prev',
        },
      };
    });

    const srcs = ref([]);
    const initialSlide = ref(0);

    function setData(data) {
      srcs.value = data.srcs;
      initialSlide.value = data.initialSlide;
    }

    onMounted(() => {
      nextTick(() => {
        document.addEventListener('keyup', listenerEsc);
        if (srcs.value && srcs.value.length > 1) {
          new Swiper('.swiper-images-content', swiperOption.value);
        }
      });
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keyup', listenerEsc);
    });

    return {
      props,
      srcs,
      setData,
      close,
      handleClose,
    };
  },
});
</script>
<style lang="scss" scoped>
.image-popup-wraper {
  width: 100%;
  height: 100%;
  z-index: 1111;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 100000;

  .close-button {
    position: absolute;
    top: 5%;
    right: 15%;
    font-size: 32px;
    color: #fff;
    cursor: pointer;
    z-index: 999;
  }

  .image-popup-content {
    width: 65%;
    max-height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    overflow-y: auto;

    // 滚动条样式
    &::-webkit-scrollbar {
      width: 0;
    }

    .swiper-images-content {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .swiper-wrapper {
        width: 100%;
        .swiper-slide {
          .slide-image {
            width: 100%;
            max-height: 100%;
            img {
              width: 100%;
            }
          }
        }
      }
    }

    .image {
      width: 100%;
      max-height: 100%;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #fff;

    &:focus {
      outline: none;
    }

    &::after {
      z-index: 1;
    }

    &::before {
      content: '';
      display: inline-block;
      width: 60px;
      height: 160px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }

    &.swiper-button-disabled {
      pointer-events: inherit;
    }
  }

  .swiper-button-next {
    right: 10%;
  }

  .swiper-button-prev {
    left: 10%;
  }
}
</style>
