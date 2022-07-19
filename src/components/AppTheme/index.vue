<!-- AppTheme -->
<template>
  <div class="AppTheme-root" v-show="false" ref="themeEle">
    <div class="theme-btn" @click="open = !open">
      <BaseIcon class="pifu" icon="icon-pifu" />
    </div>
    <MeSelect v-model:visible="open" :options="themeList" :modelValue="curTheme" @change="handleSetTheme" />
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import themeConfig from './themeConfig';

const themeEle = ref(undefined);
const open = ref(false);
const store = useStore();
const themeList = computed(() => store.state.theme.list);
const curTheme = computed(() => store.state.theme.curTheme);

function handleSetTheme({ key }) {
  store.commit('theme/SET_CUR_THEME', key);
  open.value = false;
}
function getStyleVar(key, value) {
  return `--${key}: ${value};`;
}
function setStyle(styleBody) {
  const meStyle = document.getElementById('__AppTheme_var_style');
  if (!meStyle) {
    // 创建style标签
    const style = document.createElement('style');
    // 设置style属性
    style.type = 'text/css';
    style.id = '__AppTheme_var_style';
    // 将 样式写入style内
    style.innerHTML = styleBody;
    // 将style样式存放到head标签
    document.getElementsByTagName('head')[0].appendChild(style);
  } else {
    meStyle.innerHTML = styleBody;
  }
}

function updateStyleVar() {
  const options = { ...themeConfig['default'], ...(themeConfig[curTheme.value] || {}) };
  const keys = Object.keys(options);
  let styleBody = ':root {';
  keys.forEach((key) => {
    if (typeof options[key] === 'string') {
      styleBody += getStyleVar(key, options[key]);
    }
  });
  styleBody += '}';
  setStyle(styleBody);
}

watchEffect(updateStyleVar);
</script>

<style lang="scss" scoped>
.AppTheme-root {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .theme-btn {
    width: 26px;
    height: 26px;
    border: 1px solid var(--popupBorder);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    .pifu {
      font-size: 16px;
      background: var(--appTitleIconlineBackground);
      background-clip: text;
      color: transparent;
    }
  }
}
</style>
