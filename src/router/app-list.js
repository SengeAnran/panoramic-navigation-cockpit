export default [
  {
    path: '/home',
    name: '首页',
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/Home'),
  },
  {
    path: '/project',
    name: '项目地图',
    component: () => import('@/pages/Project'),
  },
  {
    path: '/compareMap',
    name: '对比图谱',
    component: () => import('@/pages/ComparisonMap/Center'),
  },
];
