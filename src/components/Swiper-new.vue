<template>
  <div class="swiper-container" ref="el">
    <div :class="state.defaultSwiperClasses.wrapperClass">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import Swiper from 'swiper';
import { reactive } from 'vue-demi';
import { onMounted, nextTick, onUpdated, onBeforeUnmount, ref } from 'vue';
// import "swiper/css/swiper.css";
const props = defineProps({
  options: {
    type: Object,
    default() {
      return {
        autoplay: 3500,
      };
    },
  },
});
const state = reactive({
  swiper: null,
  defaultSwiperClasses: {
    wrapperClass: 'swiper-wrapper',
  },
});
onMounted(() => {
  nextTick(mount())
});
const el = ref('');
function mount() {
  if (!state.swiper) {
    let setClassName = false;
    for (const className in state.defaultSwiperClasses) {
      // if (this.defaultSwiperClasses.hasOwnProperty(className)) {
      if (this.options[className]) {
        setClassName = true;
        state.defaultSwiperClasses[className] = props.options[className];
      }
      // }
    }

    const mountInstance = function() {
      state.swiper = new Swiper(el, props.options);
    };
    setClassName ? nextTick(mountInstance) : mountInstance();
  }
}
onUpdated(() => {
  if (state.swiper) {
    state.swiper.destroy();
    delete state.swiper;
    mount();
  }
});
onBeforeUnmount(() => {
  if (this.swiper) {
    state.swiper.destroy();
    delete state.swiper;
  }
});
</script>
<style scoped>
/*a{ background: #0e1a28 no-repeat}*/
/*@import "../assets/css/swiper.css";*/
</style>
