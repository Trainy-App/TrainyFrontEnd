import { useAuthStore } from '@/stores'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
import router from './router'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

const accessToken = useStorage('access_token', null)

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  config => {
    if (accessToken.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      await authStore.logout() // Chama o logout do store
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default api
