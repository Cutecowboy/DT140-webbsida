import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import WatchView from '../views/WatchView.vue';
import LoginView from "../views/LoginView.vue";
import CreateView from "../views/CreateView.vue";
import EditView from '../views/EditView.vue';


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
    {
      path: "/skapa",
      name: "Skapa",
      component: CreateView
    },
    {
      path: "/editProduct/:id",
      name: "Redigera",
      component: EditView
    }
  ]
})

export default router
