<template>
<div ref="title" :class="`secondary-title ${titleType}`">
  <div class="titles">
    <div class="title-item" v-for="(item, index) in props.titleNameList" :key="index" :class="{active: index === activeIndex}" @click="changeTitle(index)">{{item}}</div>
  </div>
  <span>{{ props.titleName }}</span>
  <div class="paging">
    <slot></slot>
  </div>
</div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  titleNameList: {
    type: Array,
    default: () => {},
  },
  titleType: {
    type: String,
    default: 'common',
  },
  autoChange: { // 自动切换 标题
    type: Boolean,
    default: false,
  },
  autoChangeTime: { // 自动切换 时间
    type: Number,
  },
  watchBox: {
    type: Object,
    default: () => {},
  },
});
const activeIndex = ref(0);
const title = ref('');
const watchBox = ref('');

let inter = ref('');

const emit = defineEmits(['changeTitle']);

function changeTitle(index) {
  activeIndex.value = index;
  emit('changeTitle', index)
}

onMounted(() => {
  if (props.autoChange) {
    nextTick(() => {
      watchBox.value = title.value.parentNode.querySelector('.watchBox');
      init();
      changeData();
    });
  }
});
function init() {
  watchBox.value.addEventListener('mouseover', function() {
    clearInterval(inter.value);
  });
  watchBox.value.addEventListener('mouseout', function() {
    changeData();
  });
}
const store = useStore();
const changeData = () => {
  inter.value = setInterval(function() {
    changeTitle((activeIndex.value + 1) % props.titleNameList?.length)
  }, props.autoChangeTime || store.getters.intervalTime);
};
onBeforeUnmount(() => {
  if (props.autoChange) {
    clearInterval(inter.value);
  }
});
</script>

<style lang="scss" scoped>
.secondary-title {
  position: relative;
  height: 37px;
  width: 509px;
  background: url("./title_bg.png") no-repeat;
  text-indent: 31px;
  .titles {
    display: flex;
    .title-item {
      position: relative;
      cursor: pointer;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-style: italic;
      color: #B7FDFD;
      line-height: 26px;
      padding-right: 5px;
      background: linear-gradient(0deg, #79C0F6 1.513671875%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.45;
      &::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: -6px;
        width: 33px;
        height: 37px;
        background: url("./icon_points.png") no-repeat;
      }

      &.active {
        opacity: 1;
      }
    }
  }
  .paging {
    position: absolute;
    top: 5px;
    right: 36px;
  }
  &.small {
    height: 23px;
    width: 235px;
    background: url("./small_title_bg.png") no-repeat;
    span {
      line-height: 23px;
      font-size: 16px;
    }
  }
  &.big {
    height: 23px;
    width: 753px;
    background: url("./title_bg_big.png") no-repeat;
    span {
      line-height: 23px;
      font-size: 16px;
    }
  }
}
</style>
