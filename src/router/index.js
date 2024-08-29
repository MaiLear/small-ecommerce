import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpCustomerView from '@/views/SignUpCustomerView.vue'
import LoginCustomerView from '@/views/LoginCustomerView.vue'
import ProductView from '@/views/ProductView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpCustomerView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginCustomerView
    },

    {
      path: '/shop',
      name: 'shop',
      component: ()=> import('@/views/ShopView.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    }
  
  ]
})

export default router
