import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/frontpage.vue'
import LoginView from '../views/LogInView.vue'
import SignupView from '../views/SignUpView.vue' // Ensure this path is correct

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/loginView',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  }
  // Add other routes here
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
