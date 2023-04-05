import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/uk',
    name: 'home',
    component: HomeView
  },
  {
    path: '/us',
    name: 'us',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsView.vue')
  },
  {
    path: '/uk/characters',
    name: 'characters',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CharactersView.vue')
  },
  {
    path: '/:catchAll(.*)', redirect: '/uk'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
