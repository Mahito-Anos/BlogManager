import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostView from '../views/PostView.vue'
import ProfileView from '../views/ProfileView.vue'
import PostDetailView from '../views/PostDetailView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  {
    path: '/post',
    name: 'Post',
    component: PostView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('currentUser')
  if (to.meta.requiresAuth && !isAuthenticated) {
    alert('Bạn cần đăng nhập để tiếp tục!')
    next('/login')
  } else {
    next()
  }
})

export default router
