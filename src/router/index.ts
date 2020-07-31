import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Select from '../views/Select.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Select',
    component: Select
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
