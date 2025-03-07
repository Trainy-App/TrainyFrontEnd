import api from '@/plugins/axios'

class WorkoutsService {
  async getWorkouts() {
    try {
      const response = await api.get('trainy/workouts/')
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

    async createWorkout(workout) {
        try {
        const response = await api.post('trainy/workouts/', workout)
        return response.data
        } catch (error) {
        console.error(error)
        return error.response.data
        }
    }
}

export default new WorkoutsService()
