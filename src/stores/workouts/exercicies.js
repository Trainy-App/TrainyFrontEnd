import { defineStore } from 'pinia'
import { ExerciciesService } from '@/services'
import { reactive } from 'vue'

export const useExerciciesStore = defineStore('exercicies', () => {
  const state = reactive({
    exercicies: [],
    error: false,
    isLoading: false,
  })

  const getExercicies = async () => {
    try {
        const data = await ExerciciesService.getExercicies();
        console.log(data);
        state.exercicies = data || [];
    } catch (error) {
        console.error('Erro ao carregar exercícios:', error);
    }
};

  return {
    state,
    getExercicies,
  }
})
