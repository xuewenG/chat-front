import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@render/views/login/Index.vue'
import Register from '@render/views/register/Index.vue'
import RegisterSuccess from '@render/views/register/Success.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/success',
    name: 'RegisterSuccess',
    component: RegisterSuccess,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
