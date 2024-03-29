import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useTokenStore } from '@/stores/mytoken'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/login/LoginView.vue"),
    },
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      // token身份认证
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'index',
          component: () => import("@/views/IndexView.vue")
        },
        {
          path: '/menus',
          name: 'menus',
          component: () => import("@/views/menu/MenuIndex.vue")
        },
        {
          path: '/menus/create',
          name: 'menu-create',
          component: () => import("@/views/menu/CreateOrEdit.vue")
        },
        {
          path: "/:xxx(.*)*",
          name: "ErrorPage",
          component: () => import("@/views/ErrorPage.vue"),
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
  ]
})

/*
  /aa/bb/cc/dd拆分成下面的数组
  /aa
  /aa/bb
  /aa/bb/cc
  /aa/bb/cc/dd
*/
router.beforeEach((to, from, next) => {
  const store = useTokenStore()
  if (to.matched.some(r => r.meta?.requiresAuth)) {
    if (!store.token?.access_token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router
