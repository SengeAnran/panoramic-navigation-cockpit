import { useStore } from 'vuex';
import { computed } from 'vue';
import themeConfig from '@/components/AppTheme/themeConfig';

/** 获取当前主题配置 */
function getThemeConfig() {
  const store = useStore();
  const curTheme = computed(() => store.state.theme.curTheme);
  const curThemeConfig = computed(() => ({ ...themeConfig.default, ...(themeConfig[curTheme.value] || {}) }));
  return curThemeConfig;
}

export default getThemeConfig;
