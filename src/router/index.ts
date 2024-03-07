import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '../views/HomeView.vue'
import TodoViewVue from '@/views/TodoView.vue'
import TheTestViewVue from '@/views/TheTest.vue'
import FetchCommits from '@/views/FetchCommits.vue'
import GridExample from '@/views/GridExample.vue'

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
    },
    {
      path: '/test',
      name: 'test',
      component: TheTestViewVue
    },
    {
      path: '/fetch-commits',
      name: 'fetch-commits',
      component: FetchCommits
    },
    {
      path: '/grid-example',
      name: 'grid-example',
      component: GridExample
    }
  ]
})

export default router
