import { LoginService } from '@/services'
import UserService from '@/services/auth/user.service'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
// import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const state = useStorage('user', {
    user: {
      username: '',
      name: '',
      email: '',
      profile_picture: null,
    },
    isLogged: false,
    error: false,
    errorMessage: '',
    isLoading: false,
  })

  // Usando useStorage para os tokens
  const accessToken = useStorage('access_token', null)
  const refreshToken = useStorage('refresh_token', null)

  const clearError = () => {
    state.value.error = false
    state.value.errorMessage = ''
  }

  async function setToken(username, password) {
    try {
      clearError()
      state.value.isLoading = true

      if (!username || !password) {
        state.value.error = true
        state.value.errorMessage = 'Usuário e senha são obrigatórios'
        return
      }

      const response = await LoginService.login({ username, password })

      if (response.access && response.refresh) {
        state.value.user = {
          username,
          ...response,
        }
        state.value.isLogged = true

        // Salva os tokens usando useStorage
        accessToken.value = response.access
        refreshToken.value = response.refresh
      } else {
        state.value.error = true
        state.value.errorMessage = 'Erro ao fazer login. Tente novamente.'
        console.error('Tokens não recebidos na resposta:', response)
      }
    } catch (error) {
      state.value.error = true
      if (error.response?.status === 401) {
        state.value.errorMessage = 'Usuário ou senha inválidos'
      } else {
        state.value.errorMessage = 'Erro ao fazer login. Tente novamente.'
      }
      console.error('Erro no login:', error.response?.data || error)
    } finally {
      state.value.isLoading = false
    }
  }

  async function regiter(data) {
    try {
      clearError()
      state.value.isLoading = true

      // Validação dos campos
      const requiredFields = {
        name: 'Nome completo',
        username: 'Nome de usuário',
        email: 'Email',
        password: 'Senha',
      }

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!data[field]) {
          state.value.error = true
          state.value.errorMessage = `${label} é obrigatório`
          return
        }
      }

      const response = await LoginService.register(data)

      if (response.access && response.refresh) {
        state.value.user = {
          username: data.username,
          name: data.name,
          email: data.email,
          profile_picture: response.profile_picture || null,
        }
        state.value.isLogged = true

        // Salva os tokens usando useStorage
        accessToken.value = response.access
        refreshToken.value = response.refresh
      } else {
        state.value.error = true
        state.value.errorMessage = 'Erro ao criar conta. Tente novamente.'
        console.error('Tokens não recebidos na resposta:', response)
      }
    } catch (error) {
      state.value.error = true
      if (error.response?.data) {
        // Tratamento de erros específicos do backend
        const errorData = error.response.data
        if (errorData.username) {
          state.value.errorMessage = 'Este nome de usuário já está em uso'
        } else if (errorData.email) {
          state.value.errorMessage = 'Este email já está cadastrado'
        } else if (errorData.profile_picture) {
          state.value.errorMessage = 'Erro ao fazer upload da imagem. Verifique o formato e tamanho.'
        } else {
          state.value.errorMessage = 'Erro ao criar conta. Tente novamente.'
        }
      } else {
        state.value.errorMessage = 'Erro ao criar conta. Tente novamente.'
      }
      console.error('Erro no registro:', error.response?.data || error)
    } finally {
      state.value.isLoading = false
    }
  }

  async function logout() {
    state.value.isLoading = true
    state.value.user = {
      username: '',
      name: '',
      email: '',
      profile_picture: null,
    }
    state.value.isLogged = false
    clearError()

    // Limpa os tokens
    accessToken.value = null
    refreshToken.value = null

    state.value.isLoading = false
  }

  async function loadProfile() {
    try {
      clearError()
      state.value.isLoading = true
      const response = await UserService.getProfile()
      state.value.user = {
        ...state.value.user,
        ...response,
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    } finally {
      state.value.isLoading = false
    }
  }

  async function updateProfile(data) {
    try {
      clearError()
      state.value.isLoading = true
      const response = await UserService.updateProfile(data)
      state.value.user = {
        ...state.value.user,
        ...response,
      }
      return response
    } catch (error) {
      state.value.error = true
      if (error.email) {
        state.value.errorMessage = 'Este email já está em uso'
      } else if (error.profile_picture) {
        state.value.errorMessage = 'Erro ao fazer upload da imagem. Verifique o formato e tamanho.'
      } else {
        state.value.errorMessage = 'Erro ao atualizar perfil. Tente novamente.'
      }
      throw error
    } finally {
      state.value.isLoading = false
    }
  }

  return {
    setToken,
    logout,
    state,
    regiter,
    clearError,
    loadProfile,
    updateProfile,
  }
})
