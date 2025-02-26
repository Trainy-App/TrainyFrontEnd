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
}

export default new LoginService();
