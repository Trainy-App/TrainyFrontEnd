import { WorkoutsService } from '@/services'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { cloneDeep } from 'lodash'

export const useWorkoutsStore = defineStore('workouts', () => {
  const state = reactive({
    workouts: [],
    error: false,
    isLoading: false,
  })

  const getWorkouts = async () => {
    try {
      state.isLoading = true
      const getData = await WorkoutsService.getWorkouts()
      state.workouts = getData
    } catch (error) {
      state.error = true
    } finally {
      state.isLoading = false
    }
  }

  const createWorkout = async workout => {
    try {
      state.isLoading = true
      console.log("workout create", workout)

      const rightWorkout = cloneDeep(workout)
      let filteredDivisions = []

      for (let i of rightWorkout.divisions) {
        let filterMuscles = []
        delete i['color']

        for (let j of i.exercises) {
          delete j['name'] 
        }

        for (let k of i.muscles) {
          filterMuscles.push(k.id) 
        }

        filteredDivisions.push({
          name: i.name,
          exercises: i.exercises,
          muscles: filterMuscles,
        })
      }
      rightWorkout.divisions = filteredDivisions

      console.log("preparedWorkout", rightWorkout)

      const response = await WorkoutsService.createWorkout(rightWorkout)
      state.workouts.push(response)
    } catch (error) {
      state.error = true
    } finally {
      state.isLoading = false
    }
  }

  return {
    state,
    getWorkouts,
    createWorkout,
  }
})
