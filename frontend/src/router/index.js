import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/indexView.vue'
import DashboardView from '../views/dashboardView.vue'
import AboutView from '../views/aboutView.vue'
import FaqView from '../views/faqView.vue'
import ContactView from '../views/contactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router
