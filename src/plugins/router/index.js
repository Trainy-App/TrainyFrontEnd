import { useAuthStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.state.isLogged

  // Redireciona para login se a rota requer autenticação e o usuário não está logado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
    return
  }

  // Redireciona para dashboard se o usuário está logado e tenta acessar páginas de guest
  if (to.meta.isGuest && isAuthenticated) {
    next({ path: '/' })
    return
  }

  next()
})

export default function (app) {
  app.use(router)
}

export { router }
