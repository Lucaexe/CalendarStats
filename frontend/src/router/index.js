import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/indexView.vue'
import TestView from '../views/testView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    }
  ]
})

export default router
