import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { LoginService } from '@/services'
import VueJwtDecode from 'vue-jwt-decode'
// import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const state = useStorage('user', {
    user: {},
    isLogged: false,
    error: false,
    isLoading: false,
  })

  async function setToken(username, password) {
    let data
    try {
      state.value.isLoading = true
      const token = await LoginService.login({ username, password })
      console.log(token)
      
      if (token.access) {
        state.value.user = token
        state.value.isLogged = true
        state.value.error = false
      } else {
        state.value.error = true
      }
    } catch (error) {
      state.value.error = true
    } finally {
      state.value.isLoading = false
    }
  }

  async function logout() {
    state.value.isLoading = true
    state.value.user = {}
    state.value.isLogged = false
    state.value.type = ''
    state.value.isLoading = false
    localStorage.clear()
    // router.push('/')
  }

  return {
    setToken,
    logout,
    state,
  }
})
