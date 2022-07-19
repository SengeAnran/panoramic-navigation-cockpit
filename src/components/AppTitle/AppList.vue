<!-- AppList -->
<template>
  <div class="AppList-root" :class="{ [curTheme]: true }">
    <div
      class="app-item"
      v-for="item in list"
      :class="{ active: item.path === activeApp, 'disabled-item': item.disabled }"
      :key="item.path"
      @click="() => !item.disabled && $router.push(item.path)"
    >
      <span class="name">{{ item.name }}</span>
      <img v-if="item.path === activeApp" src="./AppList-active-bg.png" class="active-bg" />
    </div>
  </div>
</template>

<script setup>
import appList from '@/router/app-list';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const list = appList.map((it) => ({ name: it.meta?.title || it.name, path: it.path, disabled: it.meta?.disabled }));
const route = useRoute();
const activeApp = computed(() => route.path);
const store = useStore();
const curTheme = computed(() => store.state.theme.curTheme);
</script>

<style lang="scss" scoped>
.AppList-root {
  position: absolute;
  left: 0;
  bottom: 56px;
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding-left: 37px;
  &::-webkit-scrollbar {
    display: none;
  }
  .app-item {
    position: relative;
    flex-shrink: 0;
    border-radius: 36px;
    padding: 20px 5px;
    margin-left: 26px;
    border: 1px solid rgb(196, 252, 254);
    background-image: linear-gradient(90deg, rgba(33, 68, 57, 0.8) 0%, rgba(62, 130, 124, 0.8) 100%);
    cursor: pointer;
    user-select: none;
    transition: color 0.3s;
    width: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
    .name {
      font-size: 18px;
      font-family: 'Source Han Serif CN';
      color: rgb(255, 255, 255);
      font-weight: bold;
      writing-mode: tb-rl;
    }
    .active-bg {
      position: absolute;
      bottom: -3px;
    }
    &:first-child {
      margin-left: 0;
    }
    &.active {
      cursor: not-allowed;
      border-color: rgb(255, 254, 222);
      background-image: linear-gradient(90deg, rgba(98, 106, 69, 0.8) 0%, rgba(57, 62, 56, 0.8) 100%);
      box-shadow: 0 0 5px rgba(255, 237, 31, 0.4);
      .name {
        background: linear-gradient(to bottom, #fffede 20%, #fffefc);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    &.disabled-item {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
