const defaultOptions = {
  direction: 'horizontal', // vertical
  speed: 500, // 轮播速度
  grabCursor: true, // 鼠标time 变成手掌效果
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    stopOnLastSlide: false,
  },
  on: {
    init: function () {
      requestAnimationFrame(() => {
        const swiper = this;
        if (swiper.wrapperEl) {
          swiper.mouseoverListener = function () {
            swiper.autoplay.stop();
          };
          swiper.mouseoutListener = function () {
            swiper.autoplay.start();
          };
          swiper.wrapperEl.addEventListener('mouseenter', swiper.mouseoverListener);
          swiper.wrapperEl.addEventListener('mouseleave', swiper.mouseoutListener);
        }
      });
    },
    beforeDestroy: function () {
      const swiper = this;
      if (swiper.wrapperEl) {
        swiper.wrapperEl.removeEventListener('mouseenter', swiper.mouseoverListener);
        swiper.wrapperEl.removeEventListener('mouseleave', swiper.mouseoutListener);
      }
    },
  },
};

// 自定义滚动轮播
export const getMeTransition = (d = 150) => {
  return {
    progress: function () {
      const loopedSlides = this.loopedSlides;
      for (let i = 0; i < this.slides.length; i++) {
        var slide = this.slides.eq(i);
        var slideProgress = this.slides[i].progress;
        let modify = 1;
        if (Math.abs(slideProgress) > 1) {
          modify = (Math.abs(slideProgress) - 1) * 0.15 + 1;
        }
        const translate = slideProgress * modify * d + 'px';
        const scale = 1 - Math.abs(slideProgress) / loopedSlides;
        const opacity = 1 - Math.abs(slideProgress) / loopedSlides;
        const zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
        const showSideIndex = parseInt(loopedSlides / 2);
        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
        slide.css('zIndex', zIndex);
        slide.css('opacity', opacity);
        if (Math.abs(slideProgress) > showSideIndex) {
          slide.css('opacity', 0);
        }
      }
    },
    setTransition: function (swiper, transition) {
      for (var i = 0; i < this.slides.length; i++) {
        var slide = this.slides.eq(i);
        slide.transition(transition);
      }
    },
  };
};

export default defaultOptions;
