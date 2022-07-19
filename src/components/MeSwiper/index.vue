<!-- MeSwiper -->
<template>
  <div class="swiper" ref="root">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, onUpdated, ref } from 'vue';
import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper/swiper-bundle.esm'; //引入swiper依赖
import swiperDefaultOption from '@/utils/swiperDefaultOption';

const props = defineProps({ options: { type: Object, default: () => ({}) } });

let swiper;
const root = ref(undefined);
const propsOptionsOn = typeof props.options.on === 'object' ? props.options.on : {};
const optionOn = { ...swiperDefaultOption.on, ...propsOptionsOn };
const options = { ...swiperDefaultOption, speed: 500, ...props.options, on: optionOn };

function initSwiper() {
  swiper = new Swiper(root.value, options);
  // 当只有一个元素且loop模式的时候，删除复制的dom且禁用swiper
  if (swiper.loopedSlides === 1) {
    // 删除复制出来的dom
    const duplicateNode = root.value.querySelector('div.swiper-wrapper').querySelectorAll('div.swiper-slide-duplicate');
    duplicateNode.forEach((element) => {
      element.remove();
    });
    swiper.update();
    swiper.disable();
  }
}

onMounted(() => nextTick(initSwiper));

onUpdated(() => {
  if (swiper) swiper.destroy();
  nextTick(initSwiper);
});
onUnmounted(() => {
  if (swiper) {
    swiper.destroy();
    swiper = undefined;
  }
});
</script>
