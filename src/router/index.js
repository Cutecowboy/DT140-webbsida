import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import WatchView from '../views/WatchView.vue';
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CreateView from "../views/CreateView.vue";
import EditView from '../views/EditView.vue';
import CategoryView from '@/views/CategoryView.vue';
import AdminView from '@/views/AdminView.vue';
import SearchView from '../views/SearchView.vue';
import BookedView from '../views/BookedView.vue';
import AboutView from '../views/AboutView.vue';


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
      name: "Produkt",
      component: WatchView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/register",
      name: "Registrera",
      component: RegisterView
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
    },
    {
      path: "/category",
      name: "Kategori",
      component: CategoryView
    },
    {
      path: "/admin",
      name: "Admin",
      component: AdminView
    },
    {
      path: "/search",
      name: "Sök",
      component: SearchView
    },
    {
      path: "/bookings",
      name: "Bokningar",
      component: BookedView
    },
    {
      path: "/about",
      name: "Om oss",
      component: AboutView
    }
  ]
})

export default router
