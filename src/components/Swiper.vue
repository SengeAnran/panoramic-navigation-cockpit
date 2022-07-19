<template>
  <div class="swiper-container">
    <div :class="defaultSwiperClasses.wrapperClass">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
  </div>
</template>
<script>
import Swiper from 'swiper';
// import "swiper/css/swiper.css";
export default {
  name: 'Swiper',
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: 3500,
        };
      },
    },
  },
  data() {
    return {
      swiper: null,
      defaultSwiperClasses: {
        wrapperClass: 'swiper-wrapper',
      },
    };
  },
  mounted() {
    this.$nextTick(this.mount);
  },
  methods: {
    mount() {
      if (!this.swiper) {
        let setClassName = false;
        for (const className in this.defaultSwiperClasses) {
          // if (this.defaultSwiperClasses.hasOwnProperty(className)) {
          if (this.options[className]) {
            setClassName = true;
            this.defaultSwiperClasses[className] = this.options[className];
          }
          // }
        }
        const mountInstance = () => {
          this.swiper = new Swiper(this.$el, this.options);
        };
        setClassName ? this.$nextTick(mountInstance) : mountInstance();
      }
    },
  },
  updated() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
      this.mount();
    }
  },
  beforeUnmount() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
};
</script>
<style scoped>
/*@import "../assets/css/swiper.css";*/
</style>
