import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import WatchView from '../views/WatchView.vue';
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/product",
      name: "Produkter",
      component: ProductView
    },
    {
      path: "/productinfo/:id",
      name: "Hejdå",
      component: WatchView
    },
    {
     path: "/login",
      name: "login",
      component: LoginView
    },
  ]
})

export default router
