import { defineStore } from 'pinia'
import { MusclesService } from '@/services'
import { reactive } from 'vue'

export const useMusclesStore = defineStore('muscles', () => {
  const state = reactive({
    muscles: [],
    error: false,
    isLoading: false,
  })

  const getMuscles = async () => {
    try {
      state.isLoading = true
      const muscles = await MusclesService.getMuscles()
      state.muscles = muscles
    } catch (error) {
      state.error = true
    } finally {
      state.isLoading = false
    }
  }

  return {
    state,
    getMuscles,
  }
})
