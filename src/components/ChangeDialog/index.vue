<template>
  <div class="change-dialog">
    <div class="pages">
      <div
        class="item"
        v-for="(item, index) in pages"
        :key="index"
        :style="{ background: `url(${item.imgUrl}) no-repeat` }"
        @click="selectOnePage(item)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pages = ref([
  {
    name: '',
    path: '',
    imgUrl: require('./img/btn_img_01.png'),
  },
  {
    name: '',
    path: '',
    imgUrl: require('./img/btn_img_02.png'),
  },
]);
function selectOnePage(item) {
  console.log(item);
}
</script>

<style lang="scss" scoped>
.change-dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .pages {
    position: absolute;
    bottom: 123px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    .item {
      width: 667px;
      height: 335px;
    }
  }
}
</style>
