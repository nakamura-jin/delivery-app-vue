import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import Done from '../views/auth/Done.vue'
import Top from '../views/Top.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/done',
    name: 'Done',
    component: Done
  },
  {
    path: '/top',
    name: 'Top',
    component: Top
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
