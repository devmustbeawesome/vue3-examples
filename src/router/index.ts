import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '@/views/HomeView.vue'
import TodoViewVue from '@/views/TodoView.vue'
import TheTestViewVue from '@/views/TheTest.vue'
import FetchCommitsViewVue from '@/views/FetchCommits.vue'
import GridExampleViewVue from '@/views/GridExample.vue'
import TreeBuildingViewVue from '@/views/TreeBuilding.vue'
import SettingCharacteristicsViewVue from '@/views/SettingCharacteristics.vue'

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
      component: FetchCommitsViewVue
    },
    {
      path: '/grid-example',
      name: 'grid-example',
      component: GridExampleViewVue
    },
    {
      path: '/tree',
      name: 'tree',
      component: TreeBuildingViewVue
    },
    {
      path: '/setting-characteristics',
      name: 'setting-characteristics',
      component: SettingCharacteristicsViewVue
    }
  ]
})

export default router
