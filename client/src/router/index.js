import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.account.isAuthenticated) {
        next({name:from.name})
      } else next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.account.isAuthenticated) {
        next({name:from.name})
      } else next()
    }
  },
  {
    path: '/register/success',
    name: 'register-success',
    component: () => import('../views/RegisterSuccess.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.account.user && store.state.account.isAuthenticated) {
        next({name:"home"})
      } if (!store.state.account.user) {
        next({name:"home"})
      }
      if (store.state.account.user && store.state.account.isAuthenticated){
        next()
      }
      else next()
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
