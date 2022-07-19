<template>
  <div :class="slideClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperSlider',
  data() {
    return {
      slideClass: 'swiper-slide',
    };
  },
  mounted() {
    if (this.$parent.options.slideClass) {
      this.slideClass = this.$parent.options.slideClass;
      // console.log(this.slideClass);
    }
  },
};
</script>
