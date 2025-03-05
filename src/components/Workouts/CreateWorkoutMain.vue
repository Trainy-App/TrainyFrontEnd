<script setup>
import { Trash, Save, XCircle, BicepsFlexed } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import { useMusclesStore } from '@/stores'

const musclesStore = useMusclesStore()

const workout = ref({
  name: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  athlete: 5,
  divisions: [],
})

const muscles = ref(musclesStore.state.muscles)

const exercises = ref([
  { id: 1, name: 'Supino' },
  { id: 2, name: 'Rosca Direta' },
  { id: 3, name: 'Agachamento' },
  { id: 4, name: 'Remada' },
  { id: 5, name: 'Flexão' },
])

const addDivision = () => {
  workout.value.divisions.push({
    name: '',
    muscles: [],
    exercises: [],
    selectedExercise: null,
  })
}

const removeDivision = index => {
  workout.value.divisions.splice(index, 1)
}

const addExercise = divisionIndex => {
  const division = workout.value.divisions[divisionIndex]
  const selectedExercise = exercises.value.find(e => e.id === division.selectedExercise)
  if (selectedExercise && !division.exercises.some(ex => ex.id_exercise === selectedExercise.id)) {
    division.exercises.push({ id_exercise: selectedExercise.id, sets: 3, reps: 12 })
  }
  division.selectedExercise = null
}

const removeExercise = (divisionIndex, exerciseIndex) => {
  workout.value.divisions[divisionIndex].exercises.splice(exerciseIndex, 1)
}

const clearWorkout = () => {
  workout.value = {
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    athlete: 5,
    divisions: [],
  }
}

const isFormValid = computed(
  () => workout.value.name && workout.value.description && workout.value.divisions.length > 0,
)

onMounted(() => {
  musclesStore.getMuscles()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard
        title="Criar Novo Treino"
        class="border rounded-lg p-4 mb-4 bg-blue-lighten-5"
      >
        <VCardText class="d-flex flex-column gap-4">
          <VTextField
            v-model="workout.name"
            label="Nome do Treino"
            color="primary"
          />
          <VTextarea
            v-model="workout.description"
            label="Descrição do Treino"
            color="primary"
          />

          <VBtn
            color="primary"
            @click="addDivision"
            >Adicionar Divisão</VBtn
          >
        </VCardText>

        <VCardText
          v-for="(division, index) in workout.divisions"
          :key="index"
          class="border rounded-lg p-4 mb-4 bg-blue-lighten-5"
        >
          <div class="title-section">
            <VIcon :icon="BicepsFlexed" />
            <h4>Divisão: {{ index + 1 }}</h4>
          </div>
          <VTextField
            v-model="division.name"
            label="Nome da Divisão"
            color="primary"
          />

          <div class="title-section">
            <VIcon :icon="BicepsFlexed" />
            <h4>Músculos Trabalhados:</h4>
          </div>

          <VCombobox
            v-model="division.muscles"
            :items="musclesStore.state.muscles"
            item-title="name"
            item-value="id"
            multiple
            chips
            clearable
            color="primary"
            placeholder="Selecione os Musculos Da Divisão"
          />

          <VDivider
            class="my-5"
            color="primary"
          />

          <div class="title-section">
            <VIcon :icon="BicepsFlexed" />
            <h4>Adicionar Exercícios:</h4>
          </div>
          <VRow>
            <VCol cols="8">
              <VSelect
                label="Selecionar Exercício"
                v-model="division.selectedExercise"
                :items="exercises"
                item-title="name"
                item-value="id"
                clearable
                color="primary"
              />
            </VCol>
            <VCol cols="4">
              <VBtn
                color="primary"
                @click="addExercise(index)"
                :disabled="!division.selectedExercise"
              >
                Adicionar
              </VBtn>
            </VCol>
          </VRow>

          <div v-if="division.exercises.length" class="mt-5">
            <div class="title-section">
              <VIcon :icon="BicepsFlexed" />
              <h4>Exercícios Selecionados:</h4>
            </div>
            <VRow
              v-for="(exercise, exIndex) in division.exercises"
              :key="exIndex"
              class="align-center  border rounded-lg my-2"
            >
              <VCol cols="4">
                <span>{{ exercises.find(e => e.id === exercise.id_exercise)?.name }}</span>
              </VCol>
              <VCol cols="3">
                <VTextField
                  v-model="exercise.sets"
                  type="number"
                  label="Séries"
                  color="primary"
                />
              </VCol>
              <VCol cols="3">
                <VTextField
                  v-model="exercise.reps"
                  type="number"
                  label="Repetições"
                  color="primary"
                />
              </VCol>
              <VCol cols="2">
                <VBtn
                  color="red"
                  @click="removeExercise(index, exIndex)"
                >
                  <VIcon :icon="Trash" />
                  Remover
                </VBtn>
              </VCol>
            </VRow>
          </div>

          <VBtn
            color="red"
            class="mt-3"
            @click="removeDivision(index)"
          >
            <VIcon :icon="Trash" />
            Remover Divisão
          </VBtn>
        </VCardText>

        <VDivider color="primary" />

        <VCardText class="d-flex justify-space-between mt-5">
          <VBtn
            color="green"
            @click="console.log(workout)"
          >
            <VIcon :icon="Save" />
            Criar Treino
          </VBtn>

          <VBtn
            color="red"
            @click="clearWorkout"
          >
            <VIcon :icon="XCircle" />
            Limpar Treino
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #4169e1;
  padding: 0.5rem 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  margin: 10px 0;
}
</style>
