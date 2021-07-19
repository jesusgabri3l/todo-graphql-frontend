import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/user/Profile.vue'),
    beforeEnter: (to, from, next) => { 
      if(store.state.user.isLogged && store.state.user.id){
        next()
      }else{
        next('/')
      }
    } 
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
    beforeEnter: (to, from, next) => { 
      if(store.state.user.isLogged && store.state.user.id){
        next('/')
      }else{
        next()
      }
    } 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
