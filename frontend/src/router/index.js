import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue';
import ItemView from '../views/ItemView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserView from '../views/UserView.vue';
import UserSettings from '../views/UserSettings.vue';
import UserOrders from '../views/UserOrders.vue';
import AdminView from '../views/AdminView.vue';
import AdminAddCategory from '../views/AdminAddCategory.vue';
import AdminAddItems from '../views/AdminAddItems.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category/:categoryId',
    component: CategoryView
  },
  {
    path: '/items/:itemId',
    component: ItemView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/user',
    component: UserView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'settings',
        component: UserSettings
      },
      {
        path: 'orders',
        component: UserOrders
      }
    ]
  },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true, admin: true },
    children: [
      {
        path: 'addcategory',
        component: AdminAddCategory
      },
      {
        path: 'additems',
        component: AdminAddItems
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  store.dispatch('Validate');

  if (to.matched.some((record) => record.meta.admin)) {
    if (store.getters.isAdmin) {
      next();
      return;
    }
    next("/");
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  }

  next();
});

export default router;
