import api from '@/plugins/axios'

class LoginService {
  async login(data) {
    try {
      const response = await api.post('token/', data)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  async register(data) {
    try {
      // Criar um objeto FormData para enviar o arquivo
      const formData = new FormData()

      // Adicionar os campos de texto
      formData.append('username', data.username)
      formData.append('password', data.password)
      formData.append('email', data.email)
      formData.append('name', data.name)

      // Adicionar o arquivo de imagem se existir
      if (data.profile_picture) {
        formData.append('profile_picture', data.profile_picture)
      }

      const response = await api.post('users/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default new LoginService()
