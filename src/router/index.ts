import { createRouter, createWebHashHistory } from 'vue-router'

// GitHub Pages는 SPA fallback(404 → index.html)을 지원하지 않으므로
// 반드시 Hash 모드(createWebHashHistory) 사용.
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
    return { top: 0 }
  },
})

export default router
