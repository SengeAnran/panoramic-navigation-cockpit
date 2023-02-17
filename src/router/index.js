import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import appList from './app-list';
import PageLayout from '@/page-layout';
import ComparisonMap from '@/pages/ComparisonMap';
const routes = [
  {
    path: '/',
    name: 'APP',
    component: PageLayout,
    children: appList,
    redirect: { name: appList[0]?.name },
  },
  {
    path: '/compare-map',
    name: 'compareMap',
    component: ComparisonMap,
  },
  {
    path: '/test-components',
    name: '测试组件',
    component: () => import('@/pages/TestComponents'),
    meta: { unnav: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
