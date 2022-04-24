import { createRouter, createWebHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { firstMenu } from '@/utils/mapMenusToRoutes';
import localCache from '@/utils/cache';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/login/login.vue')
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('@/pages/home/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/not-found/not-found.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) {
      return '/login';
    }
  }
  if (to.path === '/index') {
    return firstMenu.url;
  }
});
export default router;
