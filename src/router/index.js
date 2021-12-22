import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import ShopItems from '../components/ShopItems.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: ShopItems
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "register" */ '../views/Profil.vue')
  },
  {
    path: '/personalShop',
    name: 'PersonalShop',
    component: () => import(/* webpackChunkName: "personalShop" */ '../components/PersonalShop.vue')
  },
  {
    path: '/panier',
    name: 'Panier',
    component: () => import(/* webpackChunkName: "panier" */ '../views/Panier.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
