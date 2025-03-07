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
      const data = await ExerciciesService.getExercicies()
      console.log(data)
      state.exercicies = data || []
    } catch (error) {
      console.error('Erro ao carregar exercícios:', error)
    }
  }

  const filterExercicies = muscleIds => {

    let muscleIdsArray = []

    for (const item of muscleIds) {
      muscleIdsArray.push(item.id)
    }
    const filteredEx = []

    for (const i of state.exercicies) {
      for (const j of i.muscle) {
        if (muscleIdsArray.includes(j)) {
          filteredEx.push(i)
        }
      }
    }



    return filteredEx
  }

  return {
    state,
    getExercicies,
    filterExercicies,
  }
})


