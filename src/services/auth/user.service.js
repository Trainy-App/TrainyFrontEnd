import api from '@/plugins/axios'

class UserService {
  async updateProfile(data) {
    try {
      const formData = new FormData()

      // Adiciona os campos de texto
      formData.append('name', data.name)
      formData.append('email', data.email)

      // Adiciona a imagem se existir e for um arquivo
      if (data.profile_picture instanceof File) {
        formData.append('profile_picture', data.profile_picture)
      }

      const response = await api.patch('users/me/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async getProfile() {
    try {
      const response = await api.get('users/me/')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async changePassword(data) {
    try {
      const response = await api.patch('users/me/', {
        old_password: data.currentPassword,
        new_password: data.newPassword,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async updateNotifications(settings) {
    try {
      const response = await api.patch('users/me/', {
        notification_settings: settings,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async deleteAccount() {
    try {
      const response = await api.delete('users/me/')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

export default new UserService()
