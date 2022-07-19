import themeConfig from '@/components/AppTheme/themeConfig';

function getThemeConfig() {
  const curTheme = window.localStorage.getItem('CUR_THEME') || 'default';
  return { ...themeConfig.default, ...(themeConfig[curTheme] || {}) };
}

export default getThemeConfig;
