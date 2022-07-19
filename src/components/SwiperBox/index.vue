<template>
  <div class="swiper-box-wrapper">
    <div v-if="swiperData.length" class="swiper-list-container swiper" ref="swiperRef">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in swiperData" :key="index">
          <slot :data="item" />
        </div>
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next" :id="`task-next-${uidRandom}`"></div>
      <div class="swiper-button-prev" :id="`task-prev-${uidRandom}`"></div>
    </div>
    <!-- <NullData v-else class="swiper-list-wrapper" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper/swiper-bundle.esm'; //引入swiper依赖
import swiperDefaultOption from '@/utils/swiperDefaultOption';
import { uid } from 'uid';

const swiperRef = ref(undefined);
let swiper;
const uidRandom = ref(uid());
const props = defineProps({
  swiperData: { type: Array, required: true },
  swiperOptions: { type: Object },
});

const options = computed(() => {
  return {
    ...swiperDefaultOption,
    navigation: {
      nextEl: `#task-next-${uidRandom.value}.swiper-button-next`,
      prevEl: `#task-prev-${uidRandom.value}.swiper-button-prev`,
    },
    speed: 500,
    ...props.swiperOptions,
  };
});

onMounted(() => {
  swiper = new Swiper(swiperRef.value, options.value);
});
onUnmounted(() => {
  if (swiper) {
    swiper.destroy();
    swiper = undefined;
  }
});
</script>

<style lang="scss" scoped>
.swiper-box-wrapper {
  position: relative;
  width: 100%;
  min-height: 60px;
  overflow: hidden;
  .swiper-wrapper {
    width: 100%;
    .swiper-slide {
      width: 100%;
      padding: 0 20px;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    width: 0;
    height: 0;
    border: 7px solid transparent;
    background-image: none;
    color: transparent;

    &.swiper-button-next {
      right: -7px;
      border-left: 5px solid var(--background);
    }

    &.swiper-button-prev {
      left: -7px;
      border-right: 5px solid var(--background);
    }
  }
}
</style>
