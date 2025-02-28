import api from '@/plugins/axios'

export class LoginService {
  static async login(data) {
    const response = await api.post('auth/login/', data)
    return response.data
  }

  static async register(data) {
    const formData = new FormData()

    // Adiciona os campos de texto
    formData.append('username', data.username)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)

    // Adiciona a imagem se existir
    if (data.profile_picture) {
      formData.append('profile_picture', data.profile_picture)
    }

    const response = await api.post('auth/register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}
