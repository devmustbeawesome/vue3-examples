import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '../views/HomeView.vue'
import TodoViewVue from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomeViewVue
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoViewVue
    }
  ]
})

export default router
