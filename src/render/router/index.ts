import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@render/views/login/Index.vue'
import Register from '@render/views/register/Index.vue'
import RegisterSuccess from '@render/views/register/Success.vue'
import Main from '@render/views/main/Index.vue'
import Screen from '@render/views/screen/Index.vue'

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
  {
    path: '/main',
    name: 'Main',
    component: Main,
  },
  {
    path: '/screen',
    name: 'Screen',
    component: Screen,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
