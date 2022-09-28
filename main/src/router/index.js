import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue'),
      meta: {
        title: '登录页面',
      },
    },
  ],
})

export default router
